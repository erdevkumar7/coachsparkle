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

    // Function to handle new messages with type filtering
    const handleNewMessage = (message, messageType) => {
        const chatKey = `${Math.min(message.sender_id, message.receiver_id)}-${Math.max(message.sender_id, message.receiver_id)}-${messageType}`;

        // Only process if message type matches
        if (message.message_type === messageType) {
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
        }
    };

    // Function to send message
    const sendMessage = async (receiverId, messageText, messageType = 1) => {
        try {
            // Create optimistic message
            const optimisticMessage = {
                id: Date.now(),
                sender_id: user.user_id,
                receiver_id: receiverId,
                message: messageText,
                message_type: messageType,
                is_read: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Update UI immediately with the correct type
            handleNewMessage(optimisticMessage, messageType);

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
                    message_type: messageType
                })
            });

            const result = await response.json();
            return result;

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const markAsRead = (chatKey, coachId, messageType) => {
        const typeSpecificKey = `${chatKey}-${messageType}`;
        setUnreadCounts(prev => ({
            ...prev,
            [typeSpecificKey]: 0
        }));
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

                const channelName = `private-chat.${user.user_id}`;
                const userChannel = pusherInstance.subscribe(channelName);

                userChannel.bind('pusher:subscription_succeeded', () => {
                    console.log('Pusher subscription succeeded');
                    setIsConnected(true);
                });

                userChannel.bind('pusher:subscription_error', (error) => {
                    console.error('Pusher subscription error:', error);
                    setIsConnected(false);
                });

                // Listen for incoming messages
                userChannel.bind('MessageSent', (data) => {
                    console.log('✅ Received message via Pusher:', data);
                    // The message type will be handled in the component that uses this message
                    // We just store it and let components filter by type
                    const message = data.message;
                    const chatKey = `${Math.min(message.sender_id, message.receiver_id)}-${Math.max(message.sender_id, message.receiver_id)}-${message.message_type}`;
                    
                    setMessages(prev => {
                        const existingMessages = prev[chatKey] || [];
                        if (!existingMessages.some(msg => msg.id === message.id)) {
                            return {
                                ...prev,
                                [chatKey]: [...existingMessages, message]
                            };
                        }
                        return prev;
                    });

                    if (message.sender_id !== user.user_id) {
                        setUnreadCounts(prev => ({
                            ...prev,
                            [chatKey]: (prev[chatKey] || 0) + 1
                        }));
                    }
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
        sendMessage,
        handleNewMessage
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};