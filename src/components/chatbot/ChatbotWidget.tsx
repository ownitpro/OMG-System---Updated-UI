"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  confidence?: number;
  fallback?: boolean;
  shouldEscalate?: boolean;
  escalationType?: string;
  responseTime?: number;
  interactionId?: string;
}

interface ChatResponse {
  answer: string;
  sources?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  confidence?: number;
  fallback?: boolean;
  shouldEscalate?: boolean;
  escalationType?: string;
  responseTime?: number;
  interactionId?: string;
}

const SUGGESTED_QUESTIONS = [
  "What automations do you offer for property management?",
  "How secure is my data with OMGsystems?",
  "What industries do you serve?",
  "How can I book a demo?",
  "What is LeadFlow Engine?",
  "Tell me about your pricing"
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm the OMGsystems AI assistant. I can help you learn about our automation solutions, industries we serve, and answer questions about our platform. What would you like to know?",
        timestamp: new Date()
      }]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const sendMessage = async (content?: string) => {
    const messageContent = content || input.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageContent,
          history: messages.slice(-5) // Send last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
        sources: data.sources,
        confidence: data.confidence,
        fallback: data.fallback,
        shouldEscalate: data.shouldEscalate,
        escalationType: data.escalationType,
        responseTime: data.responseTime,
        interactionId: data.interactionId
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment or contact our support team directly.",
        timestamp: new Date(),
        fallback: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEscalationActions = (escalationType?: string) => {
    switch (escalationType) {
      case 'pricing':
        return [
          { label: 'Schedule Demo', href: '/demo/crm', color: 'bg-blue-600 hover:bg-blue-700' },
          { label: 'Get Quote', href: '/contact?type=pricing', color: 'bg-green-600 hover:bg-green-700' }
        ];
      case 'internal':
      case 'admin':
        return [
          { label: 'Contact Support', href: '/contact?type=support', color: 'bg-blue-600 hover:bg-blue-700' },
          { label: 'Login to Account', href: '/login', color: 'bg-gray-600 hover:bg-gray-700' }
        ];
      case 'concern':
        return [
          { label: 'Contact Support', href: '/contact?type=concern', color: 'bg-red-600 hover:bg-red-700' },
          { label: 'Schedule Call', href: '/contact?type=call', color: 'bg-blue-600 hover:bg-blue-700' }
        ];
      default:
        return [
          { label: 'Contact Sales', href: '/contact?type=sales', color: 'bg-blue-600 hover:bg-blue-700' },
          { label: 'Book Demo', href: '/demo/crm', color: 'bg-green-600 hover:bg-green-700' }
        ];
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 relative"
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        
        {/* Unread indicator */}
        {hasUnread && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">OMGsystems AI</h3>
                <p className="text-xs text-blue-100">Online now</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-blue-100 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs text-gray-600 mb-1">Sources:</p>
                      {message.sources.slice(0, 2).map((source, index) => (
                        <Link
                          key={index}
                          href={source.url}
                          className="text-xs text-blue-600 hover:text-blue-800 block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          • {source.title}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Escalation Action Buttons */}
                  {message.shouldEscalate && message.escalationType && (
                    <div className="mt-3 pt-2 border-t border-gray-300">
                      <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {getEscalationActions(message.escalationType).map((action, index) => (
                          <Link
                            key={index}
                            href={action.href}
                            className={`inline-flex items-center px-3 py-1.5 text-xs font-medium text-white rounded-md transition-colors ${action.color}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {action.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                      {/* Confidence indicator */}
                      {message.confidence !== undefined && (
                        <div className="mt-1 text-xs text-gray-500">
                          {message.confidence > 0.7 ? "✓ High confidence" : 
                           message.confidence > 0.4 ? "~ Medium confidence" : "? Low confidence"}
                        </div>
                      )}
                      
                      {/* Response time indicator */}
                      {message.responseTime && (
                        <div className="mt-1 text-xs text-gray-400">
                          {message.responseTime < 1000 ? 
                            `⚡ ${message.responseTime}ms` : 
                            `⏱️ ${(message.responseTime / 1000).toFixed(1)}s`
                          }
                        </div>
                      )}
                      
                      <div className="text-xs opacity-70 mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Try asking:</p>
              <div className="space-y-1">
                {SUGGESTED_QUESTIONS.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(question)}
                    className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about OMGsystems..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* Quick actions */}
            <div className="flex justify-center space-x-4 mt-2">
              <Link
                href="/contact"
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Contact Support
              </Link>
              <Link
                href="/demo/crm"
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
