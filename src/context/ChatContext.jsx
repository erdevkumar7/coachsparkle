"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';
import { FRONTEND_BASE_URL } from '@/utiles/config';

export const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children, user }) => {
    const [pusher, setPusher] = useState(null);
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState({});
    const [unreadCounts, setUnreadCounts] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const token = Cookies.get('token');


    // Function to handle new messages (both received and sent)
    const handleNewMessage = (message) => {
        const chatKey = `${Math.min(message.sender_id, message.receiver_id)}-${Math.max(message.sender_id, message.receiver_id)}`;

        // Update messages state
        setMessages(prev => {
            const existingMessages = prev[chatKey] || [];
            // Check if message already exists to avoid duplicates
            if (!existingMessages.some(msg => msg.id === message.id)) {
                return {
                    ...prev,
                    [chatKey]: [...existingMessages, message]
                };
            }
            return prev;
        });

        // Update unread counts if message is not from current user
        if (message.sender_id !== user.user_id) {
            setUnreadCounts(prev => ({
                ...prev,
                [chatKey]: (prev[chatKey] || 0) + 1
            }));
        }
    };

    // Function to send message (with optimistic update)
    // Update the sendMessage function in your ChatContext
    const sendMessage = async (receiverId, messageText, messageType = 1) => {
        try {
            // Create optimistic message (immediate UI update)
            const optimisticMessage = {
                id: Date.now(), // temporary ID
                sender_id: user.user_id, // CURRENT user is sender
                receiver_id: receiverId, // Receiver user
                message: messageText,
                message_type: messageType, // Add message type
                is_read: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Update UI immediately
            handleNewMessage(optimisticMessage);

            // Send to server
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    receiver_id: receiverId,
                    message: messageText,
                    message_type: messageType // Include message type
                })
            });

            const result = await response.json();

            if (result.success) {
                return result;
            } else {
                console.error('Failed to send message:', result);
                // You might want to remove the optimistic message here if it fails
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    const markAsRead = (chatKey, coachId) => {
        setUnreadCounts(prev => ({
            ...prev,
            [chatKey]: 0
        }));

        // You might also want to make an API call to mark messages as read
        // fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/markAsRead`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   },
        //   body: JSON.stringify({ coach_id: coachId })
        // });
    };


    useEffect(() => {
        if (!user?.user_id) return;

        const initializePusher = async () => {
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

                // Subscribe to CURRENT user's channel to receive messages
                const channelName = `private-chat.${user.user_id}`;
                console.log('Subscribing to my own channel:', channelName);

                const userChannel = pusherInstance.subscribe(channelName);

                userChannel.bind('pusher:subscription_succeeded', () => {
                    console.log('Pusher subscription succeeded');
                    setIsConnected(true);
                });

                userChannel.bind('pusher:subscription_error', (error) => {
                    console.error('Pusher subscription error:', error);
                    setIsConnected(false);
                });

                // Listen for incoming messages (messages sent TO current user)
                userChannel.bind('MessageSent', (data) => {
                    console.log('✅ Received message via Pusher:', data);
                    handleNewMessage(data.message);
                });

                setChannel(userChannel);

            } catch (error) {
                console.error('Error initializing Pusher:', error);
                setIsConnected(false);
            }
        };

        initializePusher();

        return () => {
            if (pusher) {
                pusher.disconnect();
                setIsConnected(false);
            }
        };
    }, [user]);

    const value = {
        pusher,
        channel,
        messages,
        unreadCounts,
        setMessages,
        isConnected,
        markAsRead,
        sendMessage, // Expose the sendMessage function
        handleNewMessage // Expose for optimistic updates
    };


    // console.log('pusher', value)
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};