"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import Cookies from "js-cookie";

const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children, user }) => {    
    const [pusher, setPusher] = useState(null);
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState({});
    const [unreadCounts, setUnreadCounts] = useState({});
    const token = Cookies.get('token');

    console.log('pusher', pusher)

    useEffect(() => {
        if (!user?.id) return;

        // Initialize Pusher
        const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
            authEndpoint: '/api/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });

        setPusher(pusherInstance);

        // Subscribe to user's private channel
        const userChannel = pusherInstance.subscribe(`private-chat.${user.id}`);
        setChannel(userChannel);

        // Listen for new messages
        userChannel.bind('MessageSent', (data) => {
            const message = data.message;
            const chatKey = `${message.sender_id}-${message.receiver_id}`;

            // Update messages
            setMessages(prev => {
                const existingMessages = prev[chatKey] || [];
                return {
                    ...prev,
                    [chatKey]: [...existingMessages, message]
                };
            });

            // Update unread counts if message is not from current user
            if (message.sender_id !== user.id) {
                setUnreadCounts(prev => ({
                    ...prev,
                    [chatKey]: (prev[chatKey] || 0) + 1
                }));
            }
        });

        return () => {
            if (pusherInstance) {
                pusherInstance.unsubscribe(`private-chat.3`);
                pusherInstance.disconnect();
            }
        };
    }, [user]);

    const markAsRead = (chatKey) => {
        setUnreadCounts(prev => ({
            ...prev,
            [chatKey]: 0
        }));
    };

    const value = {
        pusher,
        channel,
        messages,
        unreadCounts,
        markAsRead,
        setMessages
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};