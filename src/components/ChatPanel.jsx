"use client";
import { useEffect, useState, useRef, useContext } from "react";
import "././_styles/chat_panel.css";
import { ChatContext, useChat } from '@/context/ChatContext';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import { formatMessageDate, formatTime } from "@/lib/commonFunction";

const ChatPanel = ({ tabs = [], activeTab = 0, selectedCoachId, onSearch, onTabChange, onCoachSelect, onRefresh }) => {
  const { messages, unreadCounts, markAsRead } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCoachIndex, setSelectedCoachIndex] = useState(null);
  const [tabMessages, setTabMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false); // Add this state for sending
  const [searchTerm, setSearchTerm] = useState("");

  // Report modal states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportMessage, setReportMessage] = useState({ text: "", type: "" });

  const messagesEndRef = useRef(null);
  const { sendMessage } = useChat();
  const router = useRouter();

  const currentTab = tabs[activeTab];
  const selectedCoach = selectedCoachIndex !== null ? currentTab.coaches[selectedCoachIndex] : null;
  // console.log('currentTab', currentTab)
  const token = Cookies.get('token');

  // Get current user from localStorage
  const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  };

  // Generate a unique key for this chat with message type
  const getChatKey = () => {
    const user = getCurrentUser();
    if (!user || !selectedCoach) return null;
    const userIds = [user.id, selectedCoach.id].sort((a, b) => a - b);
    return `${userIds[0]}-${userIds[1]}-${currentTab.message_type}`;
  };


  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle coach selection
  const handleCoachSelection = (coach, index) => {
    setSelectedCoachIndex(index);
    if (onCoachSelect) {
      onCoachSelect(coach.id);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Debounce the search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      if (onSearch) {
        onSearch(activeTab, value);
      }
    }, 500);
  };

  // Report functionality
  const openReportModal = () => {
    setReportReason("");
    setReportMessage({ text: "", type: "" });
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setReportReason("");
    setReportMessage({ text: "", type: "" });
  };

  const handleReportSubmit = async () => {
    if (!reportReason.trim()) {
      setReportMessage({
        text: "Please enter a reason for reporting",
        type: "error"
      });
      return;
    }

    if (!selectedCoach) {
      setReportMessage({
        text: "No coach selected",
        type: "error"
      });
      return;
    }

    setIsSubmittingReport(true);
    setReportMessage({ text: "", type: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatreport`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          reported_against_id: selectedCoach.id,
          reported_against_type: selectedCoach.user_type,
          reason: reportReason.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setReportMessage({
          text: "Report submitted successfully!",
          type: "success"
        });

        // Close modal after success
        setTimeout(() => {
          closeReportModal();
        }, 2000);
      } else {
        setReportMessage({
          text: data.message || "Failed to submit report",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setReportMessage({
        text: "An error occurred while submitting the report",
        type: "error"
      });
    } finally {
      setIsSubmittingReport(false);
    }
  };

  // Select coach from URL parameter
  useEffect(() => {
    if (selectedCoachId && currentTab.coaches.length > 0) {
      const index = currentTab.coaches.findIndex(coach => coach.id === selectedCoachId);
      if (index !== -1) {
        setSelectedCoachIndex(index);
      }
    }
  }, [selectedCoachId, currentTab.coaches]);

  // Fetch messages when coach is selected
  useEffect(() => {
    if (!selectedCoach) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const MsgRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/getMessages`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiver_id: selectedCoach.id,
            message_type: currentTab.message_type
          }),
        });

        const response = await MsgRes.json();
        if (response.success) {
          setTabMessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // Mark messages as read in context
    const chatKey = getChatKey();
    if (chatKey) {
      markAsRead(chatKey, selectedCoach.id, currentTab.message_type);
    }
  }, [selectedCoach, currentTab.message_type]);

  // Update tab messages when context messages change - FILTER BY TYPE
  useEffect(() => {
    const chatKey = getChatKey();
    if (chatKey && messages[chatKey]) {
      // Only show messages for the current message type
      const filteredMessages = messages[chatKey].filter(
        msg => msg.message_type === currentTab.message_type
      );

      // Merge with API messages
      const allMessages = [...tabMessages];
      filteredMessages.forEach(rtMessage => {
        if (!allMessages.some(msg => msg.id === rtMessage.id)) {
          allMessages.push(rtMessage);
        }
      });

      // Sort by creation time
      allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setTabMessages(allMessages);
    }
  }, [messages, selectedCoach, currentTab.message_type]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [tabMessages]);

  // Update unread counts in the coaches list - FILTER BY TYPE
  const updatedCoaches = currentTab.coaches.map(coach => {
    const user = getCurrentUser();

    if (!user) return coach;

    // Create type-specific chat key for unread counts 
    const chatKey = `${Math.min(user.id, coach.id)}-${Math.max(user.id, coach.id)}-${currentTab.message_type}`;
    // chatKey = coachId-LoggedInUserId-message_type = 160-164-1

    // Get the last message for this coach
    const lastMessage = messages[chatKey] && messages[chatKey].length > 0
      ? messages[chatKey][messages[chatKey].length - 1]
      : null;
    // console.log('ccccccc', lastMessage)

    return {
      ...coach,
      unread: unreadCounts[chatKey] || 0,
      lastMessageText: lastMessage ? lastMessage.message : coach.lastMessage,
      lastMessageTime: lastMessage ? formatTime(lastMessage.created_at) : formatTime(coach.time)
      //  lastMessageTime: lastMessage ? 'aaa' : 'bbb'
    };
  });

  // When sending a message - include message type
  // const handleSend = async () => {
  //   if (newMessage.trim() && selectedCoach) {
  //     await sendMessage(selectedCoach.id, newMessage, currentTab.message_type);
  //     setNewMessage("");
  //   }
  // }

  const handleSend = async () => {
    if (newMessage.trim() && selectedCoach && !isSending) {
      setIsSending(true); // Disable button
      try {
        await sendMessage(selectedCoach.id, newMessage, currentTab.message_type);
        setNewMessage(""); // Clear input after successful send
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsSending(false); // Re-enable button whether success or failure
      }
    }
  }



  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSending) {
      handleSend();
    }
  };

  const processMessageHTML = (html) => {
    if (!html) return '';

    // Check if the content starts with <h6> (case insensitive, with optional attributes)
    if (html.trim().toLowerCase().startsWith('<h6')) {
      // Extract content from the first h6 tag only
      const match = html.match(/<h6[^>]*>(.*?)<\/h6>/i);
      if (match && match[1]) {
        return match[1]; // Return only the content inside the first h6
      }
    }

    // Return original HTML if it doesn't start with h6
    return html;
  };

  // console.log('currentTab', currentTab)

  return (
    <div className="chat-message-start">
      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div className="modal-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid #eee',
              paddingBottom: '10px'
            }}>
              <h3 style={{ margin: 0 }}>Report Coach</h3>
              <button
                onClick={closeReportModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
                disabled={isSubmittingReport}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {selectedCoach && (
                <p style={{ marginBottom: '15px' }}>
                  Reporting: <strong>{selectedCoach.name}</strong>
                </p>
              )}

              <div className="form-group">
                <label htmlFor="reportReason" style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  Reason for reporting *
                </label>
                <textarea
                  id="reportReason"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Please describe the issue you're experiencing..."
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  disabled={isSubmittingReport}
                />
              </div>

              {reportMessage.text && (
                <div
                  className={`alert ${reportMessage.type === 'success' ? 'alert-success' : 'alert-error'}`}
                  style={{
                    padding: '10px',
                    marginTop: '15px',
                    borderRadius: '4px',
                    backgroundColor: reportMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: reportMessage.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${reportMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                  }}
                >
                  {reportMessage.text}
                </div>
              )}
            </div>

            <div className="modal-footer" style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              marginTop: '20px',
              borderTop: '1px solid #eee',
              paddingTop: '10px'
            }}>
              <button
                onClick={closeReportModal}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer'
                }}
                disabled={isSubmittingReport}
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                disabled={!reportReason.trim() || isSubmittingReport}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  background: !reportReason.trim() || isSubmittingReport ? '#ccc' : '#dc3545',
                  color: 'white',
                  cursor: !reportReason.trim() || isSubmittingReport ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmittingReport ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </div>
        </div>
      )}


      <ul className="tab">
        {tabs.map((tab, idx) => (
          <li className="item-nav" key={idx}>
            <button
              className={`link-nav ${idx === activeTab ? "active" : ""}`}
              onClick={() => onTabChange(idx)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="row">
        <div className="col-md-12 left-col-add">
          <div className="card" id="chat3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Messages</h5>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onRefresh()}
                disabled={currentTab.isLoading}
              >
                {currentTab.isLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            <div className="card-body">
              <div className="row both-chat-start">
                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 left-side-message">
                  <div className="p-1">
                    <div className="input-group rounded mb-3">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>

                    <div className="coach-chat-list">
                      {currentTab.isLoading ? (
                        <div className="text-center p-3">Loading coaches...</div>
                      ) : (
                        <ul className="list-unstyled mb-0">
                          {updatedCoaches.length > 0 ? (
                            updatedCoaches.map((coach, index) => (
                              <li
                                key={coach.id}
                                className={`border-bottom coach-item ${selectedCoachIndex === index ? "active-chat" : ""}`}
                                onClick={() => handleCoachSelection(coach, index)}
                              >
                                <a className="d-flex justify-content-between">
                                  <div className="d-flex flex-row msg_left_text_add">
                                    <img
                                      src={coach.img}
                                      alt="avatar"
                                      className="d-flex align-self-center me-2"
                                      width="60"
                                      onClick={(e) => {
                                        if (coach.user_type === 3) {
                                          e.stopPropagation(); // prevent <li> click
                                          router.push(`/coach-detail/${coach.id}`);
                                        }
                                      }}
                                    />
                                    {coach.is_online ? (
                                      <p className="add-point"></p>
                                    ) : null}

                                    <div className="pt-1" style={{ flex: 1 }}>
                                      <div className="d-flex justify-content-between align-items-center user-name-adding">
                                        <p className="fw-bold mb-0">
                                          {coach.name}
                                        </p>
                                      </div>

                                      {/* <p className="small text-muted text-truncate mb-0" style={{ maxWidth: '200px' }}>
                                        {coach.lastMessageText}
                                      </p> */}

                                      <p className="small text-muted text-truncate mb-0" style={{ maxWidth: '200px' }}
                                        // dangerouslySetInnerHTML={{ __html: coach.lastMessageText }} 
                                        dangerouslySetInnerHTML={{ __html: processMessageHTML(coach.lastMessageText) }}
                                      />

                                    </div>
                                  </div>
                                  <div className="pt-1 time-zone-add">
                                    <p className="small text-muted mb-0 time-add">
                                      {coach.lastMessageTime}
                                    </p>
                                    {/* Only show unread count if not the active chat */}
                                    {coach.unread > 0 && selectedCoachIndex !== index && (
                                      <span className="badge bg-primary rounded-pill float-end">
                                        {coach.unread}
                                      </span>
                                    )}
                                  </div>
                                </a>
                              </li>
                            ))
                          ) : (
                            <li className="text-center p-3">No coaches found</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-7 col-xl-8 right-side-message">
                  <div className="chat-show-right-side">

                    <div className="start-chat-with-coach">
                      <div className="start-chat-add">
                        <img
                          className="alert-icon"
                          src="/coachsparkle/assets/images/alrt-icon.png"
                          alt="alert"
                          width="60"
                          data-tooltip-id="alert-tooltip"
                          data-tooltip-content={currentTab.bannerDescription}
                          style={{ cursor: 'pointer' }}
                        />
                        <div>
                          <p><b>{currentTab.bannerTitle}</b></p>
                          <p>{currentTab.bannerDescription}</p>
                          {/* <Tooltip
                              id="alert-tooltip"
                              place="top"
                              variant="dark"
                              className="custom-tooltip"
                              classNameArrow="custom-tooltip-arrow"
                            /> */}
                        </div>
                      </div>

                      {selectedCoach && (
                        <a
                          className="report-btn-add"
                          onClick={openReportModal}
                          style={{ cursor: 'pointer' }}
                        >
                          Report
                        </a>
                      )}


                    </div>

                    {isLoading ? (
                      <div className="text-center p-4">Loading messages...</div>
                    ) : (
                      <>
                        <div className="messages-container">
                          {tabMessages.length > 0 ? (
                            tabMessages.map((msg, i) => {
                              const user = getCurrentUser();
                              const isOwnMessage = user && msg.sender_id === user.id;

                              return (
                                <div key={i} className={`message-item ${isOwnMessage ? 'own-message' : 'other-message'}`}>
                                  <div className="message-header">
                                    <span className="message-sender">
                                      {isOwnMessage ? 'You' : msg.sender?.first_name || 'User'}
                                    </span>
                                    <span className="message-time">
                                      {/* {msg.created_at} */}
                                      {formatTime(msg.created_at)}
                                    </span>
                                  </div>


                                  {msg.message_type === 1 &&
                                    <div className="message-content">
                                      {msg.message}
                                    </div>}

                                  {msg.message_type === 2 && (
                                    <div className="message-content hi-text-tell coaching-request-message">
                                      {msg.document && <Link href={msg.document} target="_blank"><img
                                        src="/coachsparkle/assets/images/folder-icon.png"
                                        alt="file"
                                        width={30}
                                      /></Link>}
                                      <p className="click-to-view">
                                        {msg.message}
                                        <br />
                                        {msg.document && `You sent a coaching request on ${formatMessageDate(msg.created_at)}`}
                                      </p>
                                    </div>
                                  )}

                                  {msg.message_type === 3 && (
                                    <>
                                      {msg.document && <Link href={msg.document} target="_blank"><img
                                        src="/coachsparkle/images/google-meet.png"
                                        alt="file"
                                        className="session-img"
                                      /></Link>}
                                      <div className="message-content hi-text-tell session-info" dangerouslySetInnerHTML={{ __html: msg.message }} />
                                    </>

                                  )}
                                </div>
                              );
                            })
                          ) : null}
                          <div ref={messagesEndRef} />
                        </div>

                        <div className="message-input-container mt-3">
                          <div className="text-send-message">
                            <span className="plus-add-value">+</span>
                            <i className="bi bi-emoji-smile"></i>
                            <input
                              type="text"
                              className="form-control-lg"
                              placeholder="Type a message"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={handleKeyPress}
                              disabled={!selectedCoach || isSending}
                            />
                          </div>

                          <button
                            className={`send-message-button ${(!selectedCoach || !newMessage.trim() || isSending) ? 'send-message-button-new-disabled' : ''}`}
                            onClick={handleSend}
                            disabled={!selectedCoach || !newMessage.trim() || isSending}
                          >
                            {isSending ? 'Sending...' : 'Send Message'} <i className="bi bi-arrow-right"></i>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;