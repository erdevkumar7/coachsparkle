// components/CoachChatPanel.jsx
"use client";
import { useEffect, useState, useRef, useContext } from "react";
import { CoachChatContext, useCoachChat } from '@/context/CoachChatContext';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// const CoachChatPanel = ({tabs = [], activeTab = 0, onSearch, onTabChange, onRefresh}) => {
//   const { messages, unreadCounts, markAsRead, sendMessage, fetchUserConversations, fetchMessages } = useCoachChat();
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedUserIndex, setSelectedUserIndex] = useState(null);
//   const [tabMessages, setTabMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [conversations, setConversations] = useState([]);
//   const messagesEndRef = useRef(null);
//   const token = Cookies.get('token');

//   const currentTab = tabs[activeTab];
//   const selectedUser = selectedUserIndex !== null ? conversations[selectedUserIndex] : null;

//   // Get current user from localStorage
//   const getCurrentUser = () => {
//     if (typeof window !== 'undefined') {
//       const userStr = localStorage.getItem('user');
//       return userStr ? JSON.parse(userStr) : null;
//     }
//     return null;
//   };

//   // Generate a unique key for this chat
//   const getChatKey = () => {
//     const user = getCurrentUser();
//     if (!user || !selectedUser) return null;
//     const userIds = [user.id, selectedUser.id].sort((a, b) => a - b);
//     return `${userIds[0]}-${userIds[1]}.${currentTab.message_type}`;
//   };

//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Fetch user conversations
//   useEffect(() => {
//     const loadConversations = async () => {
//       setIsLoading(true);
//       const data = await fetchUserConversations(currentTab.message_type, searchTerm);
//       setConversations(data);
//       setIsLoading(false);
//     };

//     loadConversations();
//   }, [currentTab.message_type, searchTerm]);

//   // Fetch messages when user is selected
//   useEffect(() => {
//     if (!selectedUser) return;

//     const loadMessages = async () => {
//       setIsLoading(true);
//       const data = await fetchMessages(selectedUser.id, currentTab.message_type);
//       setTabMessages(data);
      
//       // Mark messages as read
//       const chatKey = getChatKey();
//       if (chatKey && typeof markAsRead === 'function') {
//         markAsRead(chatKey, selectedUser.id);
//       }
      
//       setIsLoading(false);
//     };

//     loadMessages();
//   }, [selectedUser, currentTab.message_type]);

//   // Update tab messages when context messages change
//   useEffect(() => {
//     const chatKey = getChatKey();
//     if (chatKey && messages[chatKey]) {
//       // Merge API messages with real-time messages
//       const allMessages = [...tabMessages];

//       messages[chatKey].forEach(rtMessage => {
//         if (!allMessages.some(msg => msg.id === rtMessage.id)) {
//           allMessages.push(rtMessage);
//         }
//       });

//       // Sort by creation time
//       allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
//       setTabMessages(allMessages);
//     }
//   }, [messages, selectedUser, currentTab.message_type]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [tabMessages]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
    
//     // Debounce the search
//     clearTimeout(window.searchTimeout);
//     window.searchTimeout = setTimeout(() => {
//       if (onSearch) {
//         onSearch(activeTab, value);
//       }
//     }, 500);
//   };

//   // When sending a message
//   const handleSend = async () => {
//     if (newMessage.trim() && selectedUser) {
//       await sendMessage(selectedUser.id, newMessage, currentTab.message_type);
//       setNewMessage("");
//     }
//   }

//   // Handle enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   return (
//     <div className="chat-message-start">
//       <ul className="tab">
//         {tabs.map((tab, idx) => (
//           <li className="item-nav" key={idx}>
//             <button
//               className={`link-nav ${idx === activeTab ? "active" : ""}`}
//               onClick={() => onTabChange(idx)}
//             >
//               {tab.label}
//             </button>
//           </li>
//         ))}
//       </ul>

//       <div className="row">
//         <div className="col-md-12 left-col-add">
//           <div className="card" id="chat3">
//             <div className="card-header d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Messages</h5>
//               <button 
//                 className="btn btn-sm btn-outline-primary"
//                 onClick={() => onRefresh()}
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Loading...' : 'Refresh'}
//               </button>
//             </div>
//             <div className="card-body">
//               <div className="row both-chat-start">
//                 <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 left-side-message">
//                   <div className="p-1">
//                     <div className="input-group rounded mb-3">
//                       <input
//                         type="search"
//                         className="form-control rounded"
//                         placeholder="Search users by name"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                       />
//                     </div>

//                     <div className="coach-chat-list">
//                       {isLoading ? (
//                         <div className="text-center p-3">Loading users...</div>
//                       ) : (
//                         <ul className="list-unstyled mb-0">
//                           {conversations.length > 0 ? (
//                             conversations.map((user, index) => {
//                               const chatKey = `${Math.min(user.id, user.id)}-${Math.max(user.id, user.id)}.${currentTab.message_type}`;
//                               const unread = unreadCounts[chatKey] || 0;
                              
//                               return (
//                                 <li
//                                   key={user.id}
//                                   className={`border-bottom coach-item ${selectedUserIndex === index ? "active-chat" : ""}`}
//                                   onClick={() => setSelectedUserIndex(index)}
//                                 >
//                                   <a
//                                     href="#!"
//                                     className="d-flex justify-content-between"
//                                   >
//                                     <div className="d-flex flex-row">
//                                       <img
//                                         src={user.img || "/coachsparkle/assets/images/top-nav.png"}
//                                         alt="avatar"
//                                         className="d-flex align-self-center me-3"
//                                         width="60"
//                                       />
//                                       <div className="pt-1">
//                                         <p className="fw-bold mb-0">
//                                           {user.name}
//                                         </p>
//                                         <p className="small text-muted">
//                                           {user.last_message}
//                                         </p>
//                                       </div>
//                                     </div>
//                                     <div className="pt-1">
//                                       <p className="small text-muted mb-1 time-add">
//                                         {user.last_message_time}
//                                       </p>
//                                       {unread > 0 && (
//                                         <span className="badge bg-primary rounded-pill float-end">
//                                           {unread}
//                                         </span>
//                                       )}
//                                     </div>
//                                   </a>
//                                 </li>
//                               );
//                             })
//                           ) : (
//                             <li className="text-center p-3">No users found</li>
//                           )}
//                         </ul>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-md-6 col-lg-7 col-xl-8 right-side-message">
//                   <div className="chat-show-right-side">
//                     {!selectedUser ? (
//                       <div className="start-chat-with-user">
//                         <div className="start-chat-add">
//                           <img
//                             className="alert-icon"
//                             src="/coachsparkle/assets/images/alrt-icon.png"
//                             alt="alert"
//                             width="60"
//                           />
//                           <div>
//                             <p>
//                               <b>{currentTab.bannerTitle}</b>
//                             </p>
//                             <p>{currentTab.bannerDescription}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ) : isLoading ? (
//                       <div className="text-center p-4">Loading messages...</div>
//                     ) : (
//                       <>
//                         <div className="messages-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                           {tabMessages.length > 0 ? (
//                             tabMessages.map((msg, i) => {
//                               const user = getCurrentUser();
//                               const isOwnMessage = user && msg.sender_id === user.id;

//                               return (
//                                 <div key={i} className={`message-item ${isOwnMessage ? 'own-message' : 'other-message'}`}>
//                                   <div className="message-header">
//                                     <span className="message-sender">
//                                       {isOwnMessage ? 'You' : msg.sender?.first_name || 'User'}
//                                     </span>
//                                     <span className="message-time">
//                                       {new Date(msg.created_at).toLocaleTimeString()}
//                                     </span>
//                                   </div>
//                                   <div className="message-content">
//                                     {msg.message}
//                                   </div>
//                                 </div>
//                               );
//                             })
//                           ) : (
//                             <div className="text-center p-4">
//                               No messages yet. Start a conversation!
//                             </div>
//                           )}
//                           <div ref={messagesEndRef} />
//                         </div>

//                         <div className="message-input-container mt-3">
//                           <div className="text-send-message">
//                             <span className="plus-add-value">+</span>
//                             <i className="bi bi-emoji-smile"></i>
//                             <input
//                               type="text"
//                               className="form-control-lg"
//                               placeholder="Type a message"
//                               value={newMessage}
//                               onChange={(e) => setNewMessage(e.target.value)}
//                               onKeyPress={handleKeyPress}
//                               disabled={!selectedUser}
//                             />
//                           </div>

//                           <button
//                             className="send-message-button"
//                             onClick={handleSend}
//                             disabled={!selectedUser || !newMessage.trim()}
//                           >
//                             Send Message <i className="bi bi-arrow-right"></i>
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>          
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoachChatPanel;




const CoachChatPanel = ({tabs = [], activeTab = 0, onSearch, onTabChange, onRefresh}) => {
  const { messages, unreadCounts, markAsRead } = useContext(CoachChatContext);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCoachIndex, setSelectedCoachIndex] = useState(null);
  const [tabMessages, setTabMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);
  const { sendMessage } = useCoachChat();
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
      markAsRead(chatKey, selectedCoach.id);
    }
  }, [selectedCoach, currentTab.message_type]);

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

  // When sending a message
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
                                      className="d-flex align-self-center me-3"
                                      width="60"
                                    />
                                    <div className="pt-1">
                                      <p className="fw-bold mb-0">
                                        {coach.name}
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
                        <div className="messages-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                                      {new Date(msg.created_at).toLocaleTimeString()}
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

export default CoachChatPanel;
