"use client";
import ChatPanel from "@/components/ChatPanel";
import '../_styles/dashboard.css';

export default function UserMessage() {
  const coaches = [
    {
      name: "Coach Name 1",
      img: "/coachsparkle/assets/images/top-nav.png",
      lastMessage: "Hi",
      time: "17:36",
      unread: 5,
    },
    {
      name: "Coach Name 2",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
      lastMessage: "Hello",
      time: "15:21",
      unread: 2,
    },
    {
      name: "Coach Name 3",
      img: "/coachsparkle/assets/images/top-nav.png",
      lastMessage: "Hello",
      time: "15:21",
    },
    {
      name: "Coach Name 4",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
      lastMessage: "Hello",
      time: "15:21",
    },
    {
      name: "Coach Name 5",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
      lastMessage: "Hello",
      time: "15:21",
    },
    {
      name: "Coach Name 6",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
      lastMessage: "Hello",
      time: "15:21",
    },
    {
      name: "Coach Name 7",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp",
      lastMessage: "Hello",
      time: "15:21",
    },
    {
      name: "Coach Name 8",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp",
      lastMessage: "Hello",
      time: "15:21",
    },
    {
      name: "Coach Name 9",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp",
      lastMessage: "Hello",
      time: "15:21",
    },
    {
      name: "Coach Name 10",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      lastMessage: "Hello",
      time: "15:21",
    },
  ];

  const initialMessages = [
    {
      sender: "Robin Jacks",
      time: "3 days ago",
      text: "Hi. Can you tell me what you are looking for with the mentorship?",
    },
    {
      sender: "Emma Rose",
      time: "35 mins ago",
      text: "Hi",
    },
  ];

  const handleSendMessage = (message) => {
    console.log("New message sent:", message);
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <ChatPanel
          coaches={coaches}
          initialMessages={initialMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
