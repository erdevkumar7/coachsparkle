"use client";
import { useState } from "react";
import "././_styles/chat_panel.css";

const ChatPanel = ({ coaches = [], initialMessages = [], onSendMessage }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      const msg = {
        sender: "You",
        time: "Just now",
        text: newMessage,
      };
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
      onSendMessage?.(msg); // optional external handler
    }
  };

  return (
    <div className="container chat-message-start">
      <div className="row">
        <div className="col-md-12 left-col-add">
          <div className="card" id="chat3">
            <div className="card-body">
              <div className="row both-chat-start">
                {/* Sidebar */}
                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 left-side-message">
                  <div className="p-1">
                    <div className="input-group rounded mb-3">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search or start a new chat"
                      />
                    </div>
                    <ul className="list-unstyled mb-0">
                      {coaches.map((coach, index) => (
                        <li key={index} className="p-2 border-bottom">
                          <a href="#!" className="d-flex justify-content-between">
                            <div className="d-flex flex-row">
                              <img
                                src={coach.img}
                                alt="avatar"
                                className="d-flex align-self-center me-3"
                                width="60"
                              />
                              <div className="pt-1">
                                <p className="fw-bold mb-0">{coach.name}</p>
                                <p className="small text-muted">
                                  User Name: <span>{coach.lastMessage}</span>
                                </p>
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="small text-muted mb-1 time-add">{coach.time}</p>
                              {coach.unread > 0 && (
                                <span className="badge rounded-pill float-end">
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

                {/* Chat Window */}
                <div className="col-md-6 col-lg-7 col-xl-8 right-side-message">
                  <div className="chat-show-right-side">
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
                            <b>Start a Conversation with Coach</b>
                          </p>
                          <p>
                            Hi [Coach's Name], excited to connect! I’m looking for
                            guidance on [specific area]. My biggest challenge is
                            [briefly describe challenge]. How do you typically work
                            with new clients, and which of your coaching packages might
                            help?
                          </p>
                        </div>
                      </div>
                      <a className="report-btn-add">Report</a>
                    </div>

                    {messages.map((msg, i) => (
                      <div className="user-name-text" key={i}>
                        <p className="first-text-tell">{msg.sender}</p>
                        <span>{msg.time}</span>
                        <div className="hi-text-tell">
                          <p className="hi-enter-text">{msg.text}</p>
                        </div>
                      </div>
                    ))}

                    <div className="text-send-message">
                      <span className="plus-add-value">+</span>
                      <i className="bi bi-emoji-smile"></i>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Type a message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </div>

                    <button className="send-message-button" onClick={handleSend}>
                      Send Message <i className="bi bi-arrow-right"></i>
                    </button>
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

