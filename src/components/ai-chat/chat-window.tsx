"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
// import { ChatBrain } from "./chat-brain";
// import { QuickReplies } from "./quick-replies";
// import { LeadCapture } from "./lead-capture";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  onClose: () => void;
  onNewMessage: () => void;
}

export function ChatWindow({ onClose, onNewMessage }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check analytics consent (only on client side)
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('omg_consent');
      setHasAnalyticsConsent(consent === 'accepted');
    }

    // Add simple welcome message without ChatBrain for now
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: 'Hello! I\'m OMGsystems AI. How can I help you today?',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simple AI response for now
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Thank you for your message! I\'m here to help with any questions about OMGsystems.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      onNewMessage();

      // Track analytics if consent given
      if (hasAnalyticsConsent) {
        // Simple analytics tracking
        console.log('Chat question asked:', input.trim());
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm having trouble right now. Please try again or book a call for immediate assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = async (reply: string) => {
    setInput(reply);
    await handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col sm:bottom-24 sm:right-6 md:bottom-32 md:right-8 lg:bottom-24 lg:right-6 max-h-[calc(100vh-8rem)]" data-testid="chat-window">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
        <div>
          <h3 className="font-semibold">OMGsystems AI</h3>
          <p className="text-xs text-blue-100">Ask me anything about our platform</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-blue-700 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <QuickReplies onReply={handleQuickReply} context={chatBrain.getContext()} />
        </div>
      )}

      {/* Lead Capture */}
      {showLeadCapture && (
        <div className="px-4 pb-2">
          <LeadCapture onClose={() => setShowLeadCapture(false)} />
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {hasAnalyticsConsent ? 'Analytics enabled' : 'Analytics disabled - responses stored locally only'}
        </p>
      </div>
    </div>
  );
}
