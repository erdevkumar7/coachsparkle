// "use client";
// import { useEffect, useRef, useState } from "react";

// export default function ChatSupport({ token, messages, setMessages }) {
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   // Auto scroll
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);


//   // FETCH MESSAGES
//   const fetchMessages = async () => {
//     try {
//       const res = await fetch(
//         "https://coachsparkle-backend.votivereact.in/api/getCoachMessages",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       if (data.messages) setMessages(data.messages);
//     } catch (error) {
//       console.log("Error fetching messages", error);
//     }
//   };

//   // SEND MESSAGE
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     try {
//       const res = await fetch(
//         "https://coachsparkle-backend.votivereact.in/api/coachSendMessage",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ message: input }),
//         }
//       );

//       setInput("");
//     } catch (error) {
//       console.log("Error sending message", error);
//     }
//   };

//   return (
//     <div className="chat-support">
//       <div className="chat-header d-flex">
//         <div className="chat-container">

//           <div className="chat-header">
//             <img src="https://i.pravatar.cc/40" alt="Support" />
//             <div>
//               <div className="name">Admin Support</div>
//               <div className="status">online</div>
//             </div>
//           </div>

//           <div className="chat-messages">
//             {messages?.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`message ${msg.sender_type === "coach" ? "user" : "support"
//                   }`}
//               >
//                 <div className="bubble">
//                   {msg.message}
//                   <div className="time">
//                     {new Date(msg.created_at).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div ref={messagesEndRef} />
//           </div>

//           <div className="chat-footer">
//             <input
//               type="text"
//               placeholder="Type Message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />

//             <button onClick={sendMessage}>
//               <svg width="24" height="24" fill="currentColor">
//                 <path d="M3.4,20.3l17.2-8.6c.5-.3.5-1,0-1.3L3.4,1.8c-.5-.3-1.1.1-1.1.7v5.2c0,.3.2.6.5.7l10.1,4.6-10.1,4.6c-.3.1-.5.4-.5.7v5.2C2.3,20.2,2.9,20.6,3.4,20.3z" />
//               </svg>
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { useEffect, useRef, useState } from "react";

export default function ChatSupport({ token, messages, setMessages }) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false); // ⬅ disable button while sending
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || sending) return; // ⬅ prevent double send

    setSending(true); // ⬅ disable send button

    try {
      setInput("");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachSendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      // setInput("");
    } catch (error) {
      setInput(input);
      console.log("Send message error:", error);
    }

    setSending(false); // ⬅ enable button back
  };

  // ⬅ handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      setInput("");
    }
  };

  return (
    <div className="chat-support">
      <div className="chat-header d-flex">
        <div className="chat-container">

          <div className="chat-header">
            {/* <img src="https://i.pravatar.cc/40" alt="Support" /> */}
            <img src={`${FRONTEND_BASE_URL}/images/favicon.png`} alt="Logo" />
            <div>
              <div className="name">Admin Support</div>
              {/* <div className="status">online</div> */}
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender_type === "coach" ? "user" : "support"
                  }`}
              >
                <div className="bubble">
                  {msg.message}
                  <div className="time">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type message..."
            />

            <button
              onClick={sendMessage}
              disabled={sending}
              style={{
                opacity: sending ? 0.5 : 1,
                cursor: sending ? "not-allowed" : "pointer",
              }}
            >
              {sending ?
                <div className="spinner-border spinner-border-sm"></div> :
                <svg width="24" height="24" fill="currentColor">
                  <path d="M3.4,20.3l17.2-8.6c.5-.3.5-1,0-1.3L3.4,1.8c-.5-.3-1.1.1-1.1.7v5.2c0,.3.2.6.5.7l10.1,4.6-10.1,4.6c-.3.1-.5.4-.5.7v5.2C2.3,20.2,2.9,20.6,3.4,20.3z" />
                </svg>}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

