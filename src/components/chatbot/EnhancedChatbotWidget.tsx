"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    url: string;
    type: string;
    priority: string;
  }>;
  confidence?: number;
  fallback?: boolean;
  shouldEscalate?: boolean;
  escalationType?: string;
  responseTime?: number;
  interactionId?: string;
  clarifying?: boolean;
  suggestedQuestions?: string[];
  context?: {
    industry?: string;
    topic?: string;
    conversationLength: number;
  };
}

interface EnhancedChatResponse {
  answer: string;
  sources?: Array<{
    title: string;
    url: string;
    type: string;
    priority: string;
  }>;
  confidence?: number;
  fallback?: boolean;
  shouldEscalate?: boolean;
  escalationType?: string;
  responseTime?: number;
  interactionId?: string;
  clarifying?: boolean;
  suggestedQuestions?: string[];
  context?: {
    industry?: string;
    topic?: string;
    conversationLength: number;
  };
}

const SUGGESTED_QUESTIONS = [
  "What automations do you offer for property management?",
  "How secure is my data with OMGsystems?",
  "What industries do you serve?",
  "Tell me about your CRM app.",
  "How can I automate lead capture?",
  "What's your pricing?",
  "Can I see a demo?"
];

export default function EnhancedChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [conversationContext, setConversationContext] = useState<{
    industry?: string;
    topic?: string;
    clarifying?: boolean;
  }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(uuidv4());

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const sendMessage = async (question?: string) => {
    const currentInput = question || input.trim();
    if (!currentInput) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: currentInput,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot/enhanced", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: currentInput, 
          history: messages.slice(-5), // Send last 5 messages for context
          sessionId: sessionIdRef.current,
          context: conversationContext
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data: EnhancedChatResponse = await response.json();

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
        sources: data.sources,
        confidence: data.confidence,
        fallback: data.fallback,
        shouldEscalate: data.shouldEscalate,
        escalationType: data.escalationType,
        responseTime: data.responseTime,
        interactionId: data.interactionId,
        clarifying: data.clarifying,
        suggestedQuestions: data.suggestedQuestions,
        context: data.context
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update conversation context
      if (data.context) {
        setConversationContext({
          industry: data.context.industry,
          topic: data.context.topic,
          clarifying: data.clarifying
        });
      }
      
      if (!isOpen) {
        setHasUnread(true);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date(),
          fallback: true,
          shouldEscalate: true,
          escalationType: 'error'
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
      default: // low_confidence or general fallback
        return [
          { label: 'Contact Sales', href: '/contact?type=sales', color: 'bg-blue-600 hover:bg-blue-700' },
          { label: 'Book Demo', href: '/demo/crm', color: 'bg-green-600 hover:bg-green-700' }
        ];
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setConversationContext({});
    sessionIdRef.current = uuidv4();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="relative bg-lime-500 text-white p-4 rounded-full shadow-lg hover:bg-lime-600 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H16.5m-1.5 2.25 3.375-3.375A1.5 1.5 0 0 0 18 6.375V4.5a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 4.5v15.75c0 1.241.949 2.25 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-1.5-1.5-3.375 3.375M9 15h3v2.25H9V15Z" />
        </svg>
        {hasUnread && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-0 right-0 mb-16 w-80 md:w-96 h-[600px] bg-white shadow-xl rounded-lg flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">OMGsystems AI Assistant</h3>
              {conversationContext.industry && (
                <p className="text-xs text-blue-100">
                  Context: {conversationContext.industry} • {messages.length} messages
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {messages.length > 0 && (
                <button
                  onClick={clearConversation}
                  className="text-white hover:text-gray-200 focus:outline-none"
                  title="Clear conversation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
              <button onClick={toggleChat} className="text-white hover:text-gray-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {messages.length === 0 && !isLoading && (
              <div className="text-center text-gray-500 mt-10">
                <p className="mb-4">Hi there! How can I help you today?</p>
                <div className="grid grid-cols-1 gap-2">
                  {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-2 rounded-lg text-left transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg shadow-sm ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>

                  {/* Clarifying indicator */}
                  {message.clarifying && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs text-orange-600 font-medium mb-2">💡 I need clarification:</p>
                    </div>
                  )}

                  {/* Suggested Questions */}
                  {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-gray-300">
                      <p className="text-xs font-semibold mb-2">Quick questions:</p>
                      <div className="space-y-1">
                        {message.suggestedQuestions.slice(0, 3).map((question, index) => (
                          <button
                            key={index}
                            onClick={() => sendMessage(question)}
                            className="block w-full text-xs text-blue-600 hover:text-blue-800 hover:underline text-left"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs font-semibold mb-1">Sources:</p>
                      {message.sources.map((source, index) => (
                        <Link
                          key={index}
                          href={source.url}
                          className="block text-xs text-blue-200 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.title} ({source.type})
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
              <div className="flex justify-start mb-4">
                <div className="max-w-[85%] p-3 rounded-lg shadow-sm bg-gray-100 text-gray-800">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
