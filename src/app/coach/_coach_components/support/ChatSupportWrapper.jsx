'use client';
import '../../_styles/chat_support.css';
import { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import Pusher from 'pusher-js';
import ChatSupport from './ChatSupport';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { FRONTEND_BASE_URL } from "@/utiles/config";

export default function ChatSupportWrapper({ user }) {
  const [pusher, setPusher] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!user?.user_id) return;

    const initializePusher = async () => {
      await fetchMessages();

      try {
        const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
          authEndpoint: `${FRONTEND_BASE_URL}/api/broadcasting/auth`,
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        setPusher(pusherInstance);

        const channelName = `private-adminchat.1_${user.user_id}`;
        const userChannel = pusherInstance.subscribe(channelName);

        userChannel.bind('pusher:subscription_succeeded', () => {
          console.log('Pusher subscription succeeded for admin coach');
        });

        userChannel.bind('pusher:subscription_error', (error) => {
          console.error('Pusher subscription error:', error);
        });

        // Listen for incoming messages
        userChannel.bind('AdminMessageSent', (data) => {
          console.log('✅ Received message via Pusher:', data);
          setMessages((prev) => [...prev, data.message]);

        });

      } catch (error) {
        console.error('Error initializing Pusher:', error);
      }
    };

    initializePusher();

    return () => {
      if (pusher) {
        pusher.disconnect();
      }
    };
  }, [user]);


  // 4️⃣ Fetch messages from database (initial load)
  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getCoachMessages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  };

  return (
    <>
      <SmsOutlinedIcon className='mui-icons support-icon-coach' onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
        }} />

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 70,
            right: 20,
            zIndex: 1000,
          }}
        >
          <ChatSupport
            token={token}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      )}
    </>
  );
}
