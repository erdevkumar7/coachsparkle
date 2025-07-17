"use client";
import ChatPanel from "@/components/ChatPanel";
import '../_styles/dashboard.css';

export default function UserMessage() {
  const tabs = [
    {
      key: "general",
      label: "General Inquiries (02)",
      bannerTitle: "You have initiated a conversation with Coach",
      bannerDescription:
        "Your message has been sent! The coach will get back to you shortly — typically within 24–48 hours...",
      coaches: [
        { name: "Coach Name 1", img: "/coachsparkle/assets/images/top-nav.png", lastMessage: "Hi", time: "17:36", unread: 5 },
        { name: "Coach Name 2", img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp", lastMessage: "Hi", time: "17:36", unread: 5 },
      ],
      initialMessages: [
        { sender: "Emma Rose", time: "3 days, 2 hour ago", text: "Hi. Can you tell me whether you provide coaching to employees who are going to get retrenched?" },
      ],
    },
    {
      key: "requests",
      label: "Coaching Requests (103)",
      bannerTitle: "Start a Conversation with Matched Coach",
      bannerDescription:
        "Your coaching request has been shared with qualified coaches who match your needs...",
      coaches: [
        { name: "Coach Name AI", img: "/coachsparkle/assets/images/top-nav.png", lastMessage: "Hi", time: "17:36", unread: 5 },
        { name: "Coach Name3 AI", img: "/coachsparkle/assets/images/top-nav.png", lastMessage: "Hi", time: "17:36", unread: 5 },
      ],
      initialMessages: [
        { sender: "You", time: "2 hour ago", text: "Click to view Coaching Request" },
      ],
    },
    {
      key: "active",
      label: "Active Coaching (02)",
      bannerTitle: "Start a Conversation with your current Coach",
      bannerDescription:
        "This space is for you to engage directly with your coach. Use it to discuss session goals...",
      coaches: [
        { name: "Coach Name 1", img: "/coachsparkle/assets/images/top-nav.png", lastMessage: "Hi", time: "17:36", unread: 5 },
      ],
      initialMessages: [
        {
          sender: "You",
          time: "3 days, 2 hour ago",
          text: "Hi. Am I able to change the schedule for the upcoming session?",
        },
      ],
    },
  ];

  const handleSendMessage = (tabKey, message) => {
    console.log(`New message sent in tab: ${tabKey}`, message);
  };

  return (
    <div className="main-panel">
      <h3>Message Board</h3>
      <div className="content-panel">
        <ChatPanel tabs={tabs} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}