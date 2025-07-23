'use client';

import { useState } from 'react';
import ChatSupport from './ChatSupport';

export default function ChatSupportWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <i
        className="bi bi-chat-dots support-icon"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      ></i>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 70,
            right: 20,
            zIndex: 1000,
          }}
        >
          <ChatSupport />
        </div>
      )}
    </>
  );
}
