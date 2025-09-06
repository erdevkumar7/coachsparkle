"use client";
import { useEffect, useState, useRef, useContext } from "react";
import "././_styles/chat_panel.css";
import axios from "axios";
import { ChatContext, useChat } from '@/context/ChatContext';
import Cookies from "js-cookie";


const ChatPanel = ({
  tabs = [],
  showCreatePackageButtonTabs = ["Coaching Requests", "Active Coaching"],
}) => {
  const { messages, unreadCounts, markAsRead, chatAPI } = useContext(ChatContext);
  const [activeTab, setActiveTab] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCoachIndex, setSelectedCoachIndex] = useState(null);
  const [tabMessages, setTabMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { sendMessage } = useChat();

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

  // Generate a unique key for this chat
  const getChatKey = () => {
    const user = getCurrentUser();
    if (!user || !selectedCoach) return null;
    const userIds = [user.id, selectedCoach.id].sort((a, b) => a - b);
    return `${userIds[0]}-${userIds[1]}`;
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages when coach is selected
  useEffect(() => {
    if (!selectedCoach) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        // const response = await chatAPI.getMessages(selectedCoach.id);
        const MsgRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/getMessages`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ receiver_id: selectedCoach.id }),
        });


        const response = await MsgRes.json();

        console.log('response', response)
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
      // markAsRead(chatKey, selectedCoach.id);
    }
  }, [selectedCoach]);

  // Update tab messages when context messages change
  useEffect(() => {
    const chatKey = getChatKey();
    if (chatKey && messages[chatKey]) {
      // Merge API messages with real-time messages
      const allMessages = [...tabMessages];

      messages[chatKey].forEach(rtMessage => {
        if (!allMessages.some(msg => msg.id === rtMessage.id)) {
          allMessages.push(rtMessage);
        }
      });

      // Sort by creation time
      allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setTabMessages(allMessages);
    }
  }, [messages, selectedCoach]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [tabMessages]);

  // Update unread counts in the coaches list
  const updatedCoaches = currentTab.coaches.map(coach => {
    const user = getCurrentUser();
    if (!user) return coach;

    const chatKey = `${Math.min(user.id, coach.id)}-${Math.max(user.id, coach.id)}`;
    return {
      ...coach,
      unread: unreadCounts[chatKey] || 0
    };
  });

  // Send new message
  // const handleSend = async () => {
  //   if (newMessage.trim() && selectedCoach) {
  //     try {
  //       const response = await chatAPI.sendMessage(selectedCoach.id, newMessage);

  //       if (response.success) {
  //         setNewMessage("");
  //         // The real-time event will handle adding the message to the UI
  //       }
  //     } catch (error) {
  //       console.error("Error sending message:", error);
  //     }
  //   }
  // };

  // When sending a message
  const handleSend = async () => {
    if (newMessage.trim() && selectedCoach) {
      await sendMessage(selectedCoach.id, newMessage);
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
              onClick={() => setActiveTab(idx)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="row">
        <div className="col-md-12 left-col-add">
          <div className="card" id="chat3">
            <h5>Messages</h5>
            <div className="card-body">
              <div className="row both-chat-start">
                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 left-side-message">
                  <div className="p-1">
                    <div className="input-group rounded mb-3">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search or start a new chat"
                      />
                    </div>

                    <div className="coach-chat-list">
                      <ul className="list-unstyled mb-0">
                        {updatedCoaches.map((coach, index) => (
                          <li
                            key={index}
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
                                  className="d-flex align-self-center me-3"
                                  width="60"
                                />
                                <div className="pt-1">
                                  <p className="fw-bold mb-0 d-flex align-items-center gap-1">
                                    {coach.name}
                                    {coach.isAI && (
                                      <span className="ai-label">AI</span>
                                    )}
                                  </p>
                                  <p className="small text-muted">
                                    {coach.lastMessage}
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1 time-add">
                                  {coach.time}
                                </p>
                                {coach.unread > 0 && (
                                  <span className="badge bg-primary rounded-pill float-end">
                                    {coach.unread}
                                  </span>
                                )}
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
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
                        <div className="messages-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                          {tabMessages.map((msg, i) => {
                            const user = getCurrentUser();
                            const isOwnMessage = user && msg.sender_id === user.id;

                            return (
                              <div key={i} className={`message-item ${isOwnMessage ? 'own-message' : 'other-message'}`}>
                                <div className="message-header">
                                  <span className="message-sender">
                                    {isOwnMessage ? 'You' : msg.sender?.first_name || 'Unknown'}
                                  </span>
                                  <span className="message-time">
                                    {new Date(msg.created_at).toLocaleTimeString()}
                                  </span>
                                </div>
                                <div className="message-content">
                                  {msg.message}
                                </div>
                              </div>
                            );
                          })}
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
            {showCreatePackageButtonTabs.includes(currentTab.label) && (
              <div className="text-end mt-3">
                <button className="custom-btn shadow-sm">
                  Create Custom Coaching Package{" "}
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;