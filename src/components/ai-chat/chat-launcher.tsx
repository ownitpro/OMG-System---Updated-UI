"use client";

import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChatWindow } from "./chat-window";

export function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const pathname = usePathname();

  // Hide chat on admin and portal routes
  const isHidden = pathname.startsWith('/admin') || pathname.startsWith('/portal');

  useEffect(() => {
    // Check for unread messages in localStorage
    const unreadCount = localStorage.getItem('chat-unread-count');
    setHasUnread(parseInt(unreadCount || '0') > 0);
  }, []);

  if (isHidden) {
    return null;
  }

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
    localStorage.setItem('chat-unread-count', '0');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNewMessage = () => {
    if (!isOpen) {
      setHasUnread(true);
      const currentCount = parseInt(localStorage.getItem('chat-unread-count') || '0');
      localStorage.setItem('chat-unread-count', (currentCount + 1).toString());
    }
  };

  return (
    <>
      {/* Floating Chat Launcher */}
      <div className="fixed bottom-6 right-6 z-40 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
        <button
          onClick={handleOpen}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open AI Chat"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
          
          {/* Unread indicator */}
          {hasUnread && (
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-xs text-white font-bold">!</span>
            </div>
          )}
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              Questions? Ask OMGsystems AI
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          onClose={handleClose}
          onNewMessage={handleNewMessage}
        />
      )}
    </>
  );
}
