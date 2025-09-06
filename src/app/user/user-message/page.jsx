"use client";
import ChatPanel from "@/components/ChatPanel";
import "../_styles/dashboard.css";

export default function UserMessage() {
  const tabs = [
    {
      key: "general",
      label: "General Inquiries",
      bannerTitle: "You have initiated a conversation with Coach",
      bannerDescription: `Your message has been sent! The coach will get back to you shortly — typically within 24–48 hours. You’ll be notified as soon as they respond. In the meantime, feel free to explore other coaches or update your inquiry details if needed.`,
      coaches: [
        { id: 72, name: "John Duo", img: "/coachsparkle/assets/images/top-nav.png", lastMessage: "Hi", time: "17:36", unread: 5, },
        { id: 103, name: "Smith Coach", img: "/coachsparkle/assets/images/top-nav.png", lastMessage: "Hello", time: "18:40", unread: 3, },
      ],
    },

    // {
    //   key: "requests",
    //   label: "Coaching Requests (103)",
    //   bannerTitle: "Start a Conversation with Matched Coach",
    //   bannerDescription:
    //     "Your coaching request has been shared with qualified coaches who match your needs. Coaches will respond to your coaching needs or you can initiate a message to them. ",
    //   coaches: [
    //     {
    //       name: "Coach Name AI",
    //       img: "/coachsparkle/assets/images/top-nav.png",
    //       lastMessage: "Hi",
    //       time: "17:36",
    //       unread: 5,
    //       isAI: true,
    //     },
    //     {
    //       name: "Coach Name3 AI",
    //       img: "/coachsparkle/assets/images/top-nav.png",
    //       lastMessage: "Hi",
    //       time: "17:36",
    //       unread: 5,
    //       isAI: true,
    //     },
    //   ],
    //   initialMessages: [
    //     {
    //       sender: "You",
    //       time: "2 hour ago",
    //       type: "coaching-request",
    //       data: {
    //         title: "Click to view Coaching Request",
    //         icon: "📁",
    //         subtitle: "You sent a coaching request on 25 Jun, 6.40pm"
    //       },
    //     },
    //     {
    //       sender: "Sarah Lee",
    //       time: "35 minutes ago",
    //       text: "Hi Emma, I received your coaching request and this is something that I can offer you.",
    //     },
    //   ],
    // },
    // {
    //   key: "active",
    //   label: "Active Coaching (02)",
    //   bannerTitle: "Start a Conversation with your current Coach",
    //   bannerDescription:
    //     "This space is for you to engage directly with your coach. Use it to discuss session goals, share resources, provide encouragement, or clarify next steps. Keep communication respectful, focused, and aligned with your coaching objectives.",
    //   coaches: [
    //     {
    //       name: "Coach Name 1",
    //       img: "/coachsparkle/assets/images/top-nav.png",
    //       lastMessage: "Hi",
    //       time: "17:36",
    //       unread: 5,
    //     },
    //   ],
    //   initialMessages: [
    //     {
    //       sender: "You",
    //       time: "3 days, 2 hour ago",
    //       type: "session-info",
    //       data: {
    //         title: "Confidence Jump Start Package",
    //         date: "Thursday, July 18 · 9:30am - 10:00am",
    //       },
    //       text: "Hi. Am I able to change the schedule for the upcoming session?",
    //     },
    //     {
    //       sender: "Sarah Lee",
    //       time: "35 minutes ago",
    //       text: "Hi",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="main-panel">
      <h3>Message Board</h3>
      <div className="content-panel">
        <ChatPanel
          tabs={tabs}
        />
      </div>
    </div>
  );
}
