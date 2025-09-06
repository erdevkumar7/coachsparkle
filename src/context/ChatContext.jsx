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
    console.log('user', user)
    // const [pusher, setPusher] = useState(null);
    // const [channel, setChannel] = useState(null);
    // const [messages, setMessages] = useState({});
    // const [unreadCounts, setUnreadCounts] = useState({});
    // const [isConnected, setIsConnected] = useState(false);
    // const token = Cookies.get('token');

    // // API call functions without external helper
    // const makeApiCall = async (url, options = {}) => {

    //     const defaultOptions = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },
    //     };

    //     try {
    //         const response = await fetch(url, {
    //             ...defaultOptions,
    //             ...options,
    //             headers: {
    //                 ...defaultOptions.headers,
    //                 ...options.headers,
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error(`API error: ${response.status}`);
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         console.error('API call failed:', error);
    //         throw error;
    //     }
    // };

    // const chatAPI = {
    //     sendMessage: (receiverId, message) => {
    //         return makeApiCall(`${process.env.NEXT_PUBLIC_API_URL}/chat/send`, {
    //             method: 'POST',
    //             body: JSON.stringify({ receiver_id: receiverId, message }),
    //         });
    //     },

    //     getMessages: (receiverId) => {
    //         return makeApiCall(`${process.env.NEXT_PUBLIC_API_URL}/chat/getMessages`, {
    //             method: 'POST',
    //             body: JSON.stringify({ receiver_id: receiverId }),
    //         });
    //     },

    //     markAsRead: (senderId) => {
    //         return makeApiCall(`${process.env.NEXT_PUBLIC_API_URL}/chat/markAsRead`, {
    //             method: 'POST',
    //             body: JSON.stringify({ sender_id: senderId }),
    //         });
    //     }
    // };

    // // useEffect(() => {
    // //     // console.log('ChatProvider useEffect triggered', { userId: user?.id });
    // //     if (!user?.user_id) return;
    // //     const initializePusher = async () => {
    // //         console.log('Initializing Pusher with key:', process.env.NEXT_PUBLIC_PUSHER_APP_KEY);
    // //         try {
    // //             // Initialize Pusher
    // //             const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    // //                 cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    // //                 authEndpoint: `${FRONTEND_BASE_URL}/api/broadcasting/auth`,
    // //                 auth: {
    // //                     headers: {
    // //                         Authorization: `Bearer ${token}`,
    // //                     },
    // //                 },
    // //             });


    // //             setPusher(pusherInstance);

    // //             // Subscribe to user's private channel
    // //             const userChannel = pusherInstance.subscribe(`private-chat.101`);

    // //             userChannel.bind('pusher:subscription_succeeded', () => {
    // //                 setIsConnected(true);
    // //                 console.log('Pusher connected successfully');
    // //             });

    // //             userChannel.bind('pusher:subscription_error', (error) => {
    // //                 console.error('Pusher subscription error:', error);
    // //                 setIsConnected(false);
    // //             });


    // //             // Listen for new messages
    // //             userChannel.bind('MessageSent', (data) => {
    // //                 console.log('Message received from Pusher:', data);
    // //                 const message = data.message;
    // //                 const chatKey = `${Math.min(message.sender_id, message.receiver_id)}-${Math.max(message.sender_id, message.receiver_id)}`;

    // //                 // Update messages
    // //                 setMessages(prev => {
    // //                     const existingMessages = prev[chatKey] || [];
    // //                     // Check if message already exists to avoid duplicates
    // //                     if (!existingMessages.some(msg => msg.id === message.id)) {
    // //                         return {
    // //                             ...prev,
    // //                             [chatKey]: [...existingMessages, message]
    // //                         };
    // //                     }
    // //                     return prev;
    // //                 });

    // //                 // Update unread counts if message is not from current user
    // //                 if (message.sender_id !== user.user_id) {
    // //                     setUnreadCounts(prev => ({
    // //                         ...prev,
    // //                         [chatKey]: (prev[chatKey] || 0) + 1
    // //                     }));
    // //                 }
    // //             });


    // //             setChannel(userChannel);

    // //         } catch (error) {
    // //             console.error('Error initializing Pusher:', error);
    // //             setIsConnected(false);
    // //         }
    // //     };

    // //     initializePusher();

    // //     return () => {
    // //         if (pusher) {
    // //             pusher.unsubscribe(`private-chat.${user.id}`);
    // //             pusher.disconnect();
    // //             setIsConnected(false);
    // //         }
    // //     };
    // // }, [user]);


    // useEffect(() => {
    //     if (!user?.user_id) return;

    //     const initializePusher = async () => {
    //         try {
    //             console.log('Initializing Pusher with key:', process.env.NEXT_PUBLIC_PUSHER_APP_KEY);

    //             const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    //                 cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    //                 authEndpoint: `${FRONTEND_BASE_URL}/api/broadcasting/auth`,
    //                 auth: {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 },
    //             });

    //             // Add connection event listeners
    //             pusherInstance.connection.bind('state_change', (states) => {
    //                 console.log('Pusher connection state changed:', states);
    //             });

    //             pusherInstance.connection.bind('connected', () => {
    //                 console.log('Pusher connected successfully');
    //             });

    //             pusherInstance.connection.bind('error', (error) => {
    //                 console.error('Pusher connection error:', error);
    //             });

    //             setPusher(pusherInstance);

    //             // Subscribe to user's private channel
    //             const channelName = `private-chat.${user.user_id}`;
    //             console.log('Subscribing to channel:', channelName);

    //             const userChannel = pusherInstance.subscribe(channelName);

    //             userChannel.bind('pusher:subscription_succeeded', () => {
    //                 console.log('Pusher subscription succeeded for channel:', channelName);
    //                 setIsConnected(true);
    //             });

    //             userChannel.bind('pusher:subscription_error', (error) => {
    //                 console.error('Pusher subscription error:', error);
    //                 setIsConnected(false);
    //             });


    //             // Listen for new messages - ADD DEBUGGING HERE
    //             console.log('Binding to MessageSent event');
    //             userChannel.bind('MessageSent', (data) => {
    //                 console.log('✅ Message received from Pusher:', data);
    //                 const message = data.message;
    //                 console.log('Message data:', message);

    //                 const chatKey = `${Math.min(message.sender_id, message.receiver_id)}-${Math.max(message.sender_id, message.receiver_id)}`;
    //                 console.log('Chat key:', chatKey);

    //                 // Update messages
    //                 setMessages(prev => {
    //                     const existingMessages = prev[chatKey] || [];
    //                     if (!existingMessages.some(msg => msg.id === message.id)) {
    //                         console.log('Adding new message to state');
    //                         return {
    //                             ...prev,
    //                             [chatKey]: [...existingMessages, message]
    //                         };
    //                     }
    //                     console.log('Message already exists, skipping');
    //                     return prev;
    //                 });

    //                 // Update unread counts
    //                 if (message.sender_id !== user.user_id) {
    //                     console.log('Updating unread count');
    //                     setUnreadCounts(prev => ({
    //                         ...prev,
    //                         [chatKey]: (prev[chatKey] || 0) + 1
    //                     }));
    //                 }
    //             });

    //             // Also bind to generic events for debugging
    //             userChannel.bind('pusher:cache_miss', () => {
    //                 console.log('Pusher cache miss - waiting for event');
    //             });

    //             setChannel(userChannel);

    //         } catch (error) {
    //             console.error('Error initializing Pusher:', error);
    //             setIsConnected(false);
    //         }
    //     };

    //     initializePusher();

    //     return () => {
    //         if (pusher) {
    //             pusher.unsubscribe(`private-chat.${user.user_id}`);
    //             pusher.disconnect();
    //             setIsConnected(false);
    //         }
    //     };
    // }, [user]);

    // const markAsRead = async (chatKey, senderId) => {
    //     setUnreadCounts(prev => ({
    //         ...prev,
    //         [chatKey]: 0
    //     }));

    //     // Optionally call API to mark messages as read on server
    //     if (senderId) {
    //         try {
    //             await chatAPI.markAsRead(senderId);
    //         } catch (error) {
    //             console.error('Error marking messages as read:', error);
    //         }
    //     }
    // };

    // const value = {
    //     pusher,
    //     channel,
    //     messages,
    //     unreadCounts,
    //     markAsRead,
    //     setMessages,
    //     isConnected,
    //     chatAPI // Expose the API functions if needed elsewhere
    // };


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
    const sendMessage = async (receiverId, messageText) => {
        try {
            // Create optimistic message (immediate UI update)
            const optimisticMessage = {
                id: Date.now(), // temporary ID
                sender_id: user.user_id, // CURRENT user is sender
                receiver_id: receiverId, // Receiver user
                message: messageText,
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
                    message: messageText
                })
            });

            const result = await response.json();

            if (result.success) {
                // The receiver will get the real message via Pusher
                // The sender's UI was already updated optimistically
                return result;
            } else {
                // Handle error - remove optimistic message
                console.error('Failed to send message:', result);
                // You might want to remove the optimistic message here
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
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
        sendMessage, // Expose the sendMessage function
        handleNewMessage // Expose for optimistic updates
    };


    console.log('pusher', value)
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};