"use client";
import { useState } from "react";
import "././_styles/chat_panel.css";

const ChatPanel = ({ tabs = [], onSendMessage }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [tabMessages, setTabMessages] = useState(
    tabs.map((tab) => tab.initialMessages || [])
  );

  const handleSend = () => {
    if (newMessage.trim()) {
      const msg = {
        sender: "You",
        time: "Just now",
        text: newMessage,
      };

      const updatedMessages = [...tabMessages];
      updatedMessages[activeTab] = [...updatedMessages[activeTab], msg];
      setTabMessages(updatedMessages);
      setNewMessage("");

      onSendMessage?.(tabs[activeTab].key, msg);
    }
  };

  const currentTab = tabs[activeTab];

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
                    <ul className="list-unstyled mb-0">
                      {currentTab.coaches.map((coach, index) => (
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
                          <p><b>{currentTab.bannerTitle}</b></p>
                          <p>{currentTab.bannerDescription}</p>
                        </div>
                      </div>
                      <a className="report-btn-add">Report</a>
                    </div>

                    {tabMessages[activeTab]?.map((msg, i) => (
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
                        className=" form-control-lg"
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
