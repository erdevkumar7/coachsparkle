"use client";
import { useEffect, useState } from "react";
import ChatPanel from "@/components/ChatPanel";
import "../../_styles/dashboard.css";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { FRONTEND_BASE_URL } from "@/utiles/config";

export default function UserMessage() {
  const params = useParams();
  const router = useRouter();
  const type = parseInt(params?.type) || 1;

  // Validate message type - only allow 1, 2, or 3
  const validType = [1, 2, 3].includes(type) ? type : 1;

  // Redirect if invalid type
  useEffect(() => {
    if (![1, 2, 3].includes(type)) {
      router.replace('/user/user-message/1');
    }
  }, [type, router]);

  const [tabs, setTabs] = useState([
    {
      key: "general",
      label: "General Inquiries (0)",
      message_type: 1,
      bannerTitle: "You have initiated a conversation with Coach",
      bannerDescription: `Your message has been sent! The coach will get back to you shortly — typically within 24–48 hours. You’ll be notified as soon as they respond. In the meantime, feel free to explore other coaches or update your inquiry details if needed.`,
      coaches: [],
      isLoading: true,
    },
    {
      key: "requests",
      label: "Coaching Requests (0)",
      message_type: 2,
      bannerTitle: "Start a Conversation with Matched Coach",
      bannerDescription:
        "Your coaching request has been shared with qualified coaches who match your needs. Coaches will respond to your coaching needs or you can initiate a message to them. ",
      coaches: [],
      isLoading: true,
    },
    {
      key: "active",
      label: "Active Coaching (0)",
      message_type: 3,
      bannerTitle: "Start a Conversation with your current Coach",
      bannerDescription:
        "This space is for you to engage directly with your coach. Use it to discuss session goals, share resources, provide encouragement, or clarify next steps. Keep communication respectful, focused, and aligned with your coaching objectives.",
      coaches: [],
      isLoading: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState(validType - 1);

  // Set active tab based on URL parameter
  useEffect(() => {
    if ([1, 2, 3].includes(type)) {
      setActiveTab(type - 1);
    }
  }, [type]);

  // Fetch coaches based on active tab and search
  const fetchCoaches = async (tabIndex, searchTerm = "") => {
    // Safety check for valid tab index
    if (tabIndex < 0 || tabIndex >= tabs.length) {
      console.error("Invalid tab index:", tabIndex);
      return;
    }

    const token = Cookies.get('token');
    const currentTab = tabs[tabIndex];

    try {
      // Update loading state
      const updatedTabs = [...tabs];
      updatedTabs[tabIndex].isLoading = true;
      setTabs(updatedTabs);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generalCoachChatList`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: searchTerm,
          message_type: currentTab.message_type
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Update coaches list for this tab
        const updatedTabs = [...tabs];
        updatedTabs[tabIndex].coaches = result.data.map(coach => ({
          id: coach.id,
          name: coach.name,
          img: coach.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`,
          lastMessage: coach.last_message,
          time: coach.last_message_time,
          unread: coach.unread_count,
        }));

        // Update count in label    
        if (tabIndex === 0) {
          updatedTabs[tabIndex].label = `General Inquiries (${result.data.length})`;
        } else if (tabIndex === 1) {
          updatedTabs[tabIndex].label = `Coaching Requests (${result.data.length})`;
        } else if (tabIndex === 2) {
          updatedTabs[tabIndex].label = `Active Coaching (${result.data.length})`;
        }

        updatedTabs[tabIndex].isLoading = false;
        setTabs(updatedTabs);
      }
    } catch (error) {
      console.error("Error fetching coaches:", error);
      const updatedTabs = [...tabs];
      updatedTabs[tabIndex].isLoading = false;
      setTabs(updatedTabs);
    }
  };

  // Load initial data
  useEffect(() => {
    // Only fetch coaches for valid tabs
    if ([1, 2, 3].includes(type)) {
      // Fetch coaches for all tabs initially
      tabs.forEach((_, index) => {
        fetchCoaches(index);
      });
    }
  }, []);

  // Handle tab change
  const handleTabChange = (index) => {
    // Safety check for valid index
    if (index >= 0 && index < tabs.length) {
      setActiveTab(index);
      // Update URL without page reload
      const newUrl = `/coachsparkle/user/user-message/${index + 1}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  // Show loading or error if invalid type
  if (![1, 2, 3].includes(type)) {
    return (
      <div className="main-panel">
        <h3>Message Board</h3>
        <div className="content-panel">
          <div className="alert alert-warning">
            Invalid message type. Redirecting to General Inquiries...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-panel">
      <h3>Message Board</h3>
      <div className="content-panel chat-msg-inner-panel">
        <ChatPanel
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onSearch={(tabIndex, searchTerm) => fetchCoaches(tabIndex, searchTerm)}
          onRefresh={() => fetchCoaches(activeTab)}
        />
      </div>
    </div>
  );
}