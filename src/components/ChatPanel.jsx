"use client";
import { useEffect, useState, useRef, useContext } from "react";
import "././_styles/chat_panel.css";
import { ChatContext, useChat } from '@/context/ChatContext';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ChatPanel = ({ tabs = [], activeTab = 0, onSearch, onTabChange, onRefresh }) => {
  const { messages, unreadCounts, markAsRead } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCoachIndex, setSelectedCoachIndex] = useState(null);
  const [tabMessages, setTabMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);
  const { sendMessage } = useChat();
  const router = useRouter();

  const currentTab = tabs[activeTab];
  const selectedCoach = selectedCoachIndex !== null ? currentTab.coaches[selectedCoachIndex] : null;
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

  // Format time to display (e.g., "2 hours ago", "Just now")
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return messageTime.toLocaleDateString();
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

    // Get the last message for this coach
    const lastMessage = messages[chatKey] && messages[chatKey].length > 0
      ? messages[chatKey][messages[chatKey].length - 1]
      : null;

    return {
      ...coach,
      unread: unreadCounts[chatKey] || 0,
      lastMessageText: lastMessage ? lastMessage.message : coach.lastMessage,
      lastMessageTime: lastMessage ? formatTime(lastMessage.created_at) : coach.time
    };
  });

  // When sending a message - include message type
  const handleSend = async () => {
    if (newMessage.trim() && selectedCoach) {
      await sendMessage(selectedCoach.id, newMessage, currentTab.message_type);
      setNewMessage("");
    }
  }

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-message-start">
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
                                onClick={() => setSelectedCoachIndex(index)}
                              >
                                <a
                                  href="#!"
                                  className="d-flex justify-content-between"
                                >
                                  <div className="d-flex flex-row">
                                    <img
                                      src={coach.img}
                                      alt="avatar"
                                      className="d-flex align-self-center me-2"
                                      width="60"
                                    />
                                    <div className="pt-1" style={{ flex: 1 }}>
                                      <div className="d-flex justify-content-between align-items-center user-name-adding">
                                        <p className="fw-bold mb-0">
                                          {coach.name}
                                        </p>
                                   
                                      </div>
                                      <p className="small text-muted text-truncate mb-0" style={{ maxWidth: '200px' }}>
                                        {coach.lastMessageText}
                                      </p>
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
                    {!selectedCoach ? (
                      <div className="start-chat-with-coach">
                        <div className="start-chat-add">
                          <img
                            className="alert-icon"
                            src="/coachsparkle/assets/images/alrt-icon.png"
                            alt="alert"
                            width="60"
                          />
                          <div>
                            <p>
                              <b>{currentTab.bannerTitle}</b>
                            </p>
                            <p>{currentTab.bannerDescription}</p>
                          </div>
                        </div>
                        <a className="report-btn-add">Report</a>
                      </div>
                    ) : isLoading ? (
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
                                      {isOwnMessage ? 'You' : msg.sender?.first_name || 'Coach'}
                                    </span>
                                    <span className="message-time">
                                      {formatTime(msg.created_at)}
                                    </span>
                                  </div>
                                  <div className="message-content">
                                    {msg.message}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center p-4">
                              No messages yet. Start a conversation!
                            </div>
                          )}
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
                              disabled={!selectedCoach}
                            />
                          </div>

                          <button
                            className="send-message-button"
                            onClick={handleSend}
                            disabled={!selectedCoach || !newMessage.trim()}
                          >
                            Send Message <i className="bi bi-arrow-right"></i>
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