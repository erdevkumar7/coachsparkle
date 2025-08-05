import ChatPanel from "@/components/ChatPanel";

export default function Messages() {
  const tabs = [
    {
      key: "general",
      label: "General Inquiries (02)",
      bannerTitle: "Start a Conversation with User",
      bannerDescription: `You’ve received a new inquiry from a potential client! Someone is interested in your coaching services and has sent a message to learn more.
${(<br />)}👉 Take a moment to review and reply to start the conversation.`,
      coaches: [
        {
          name: "User Name 1",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
        },
        {
          name: "User Name 2",
          img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
        },
        {
          name: "User Name 3",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
        },
        {
          name: "Emma Rose",
          img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
        },
        {
          name: "Coach Name 1",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
        },
        {
          name: "Coach Name 2",
          img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
          lastMessage: "Hi",
          time: "17:36",
        },
        {
          name: "Coach Name 3",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
        },
        {
          name: "User Name 4",
          img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
        },
      ],
      initialMessages: [
        {
          sender: "Emma Rose",
          time: "3 days, 2 hour ago",
          text: "Hi. Can you tell me whether you provide coaching to employees who are going to get retrenched?",
        },
        { sender: "You", time: "35 minutes ago", text: "Hi" },
      ],
    },
    {
      key: "requests",
      label: "Coaching Requests (103)",
      bannerTitle: "Start a Conversation with User",
      bannerDescription: `Great news! Someone is looking for a coach like you. You've just been matched by AI or with a new coaching request that fits your services and expertise.
${(
  <br />
)}👉 Respond now to express interest or start a conversation. Your quick reply can make all the difference`,
      coaches: [
        {
          name: "User Name 1",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
          isAI: true,
        },
        {
          name: "User Name 2",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
          isAI: true,
        },
        {
          name: "User Name 3",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
          isAI: true,
        },
        {
          name: "User Name 4",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
        },
      ],
      initialMessages: [
        {
          sender: "Emma Rose",
          time: "2 hour ago",
          type: "coaching-request",
          data: {
            title: "Click to view Coaching Request",
            icon: "📁",
          },
        },
        { sender: "You", type: "text", time: "35 minutes ago", text: "Hi" },
      ],
    },
    {
      key: "active",
      label: "Active Coaching (02)",
      bannerTitle: "Start a Conversation with your current Coac",
      bannerDescription:
        "This space is for you to engage directly with your coachee. Use it to discuss session goals, share resources, provide encouragement, or clarify next steps. Keep communication respectful, focused, and aligned with your coaching objectives.",
      coaches: [
        {
          name: "User Name 1",
          img: "/coachsparkle/assets/images/top-nav.png",
          lastMessage: "Hi",
          time: "17:36",
          unread: 5,
        },
      ],
      initialMessages: [
        {
          sender: "Emma Rose",
          time: "1 hour ago",
          type: "session-info",
          data: {
            title: "Confidence Jump Start Package",
            date: "Thursday, July 18 · 9:30am - 10:00am",
          },
          text: "Hi. Am I able to change the schedule for the upcoming session?",
        },

        {
          sender: "You",
          time: "3 days, 2 hour ago",
          text: "Hi. Am I able to change the schedule for the upcoming session?",
        },
      ],
    },
  ];

  return (
    <div className="main-panel">
      <h3 className="message-board-text">Message Board</h3>
      <div className="content-panel">
        <ChatPanel
          tabs={tabs}
          showCreatePackageButtonTabs={[
            "General Inquiries (02)",
            "Coaching Requests (103)",
          ]}
        />
      </div>
    </div>
  );
}
