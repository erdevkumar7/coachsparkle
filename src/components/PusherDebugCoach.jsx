"use client";

import { useCoachChat } from "@/context/CoachChatContext";


export const PusherDebugCoach = () => {
    const { isConnected, connectionError, pusher, channel } = useCoachChat();
    
    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: isConnected ? 'green' : 'red',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 1000
        }}>
            <div>Pusher Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
            {connectionError && <div>Error: {connectionError}</div>}
            <div>Pusher: {pusher ? 'Initialized' : 'Not Initialized'}</div>
            <div>Channel: {channel ? 'Subscribed' : 'Not Subscribed'}</div>
        </div>
    );
};