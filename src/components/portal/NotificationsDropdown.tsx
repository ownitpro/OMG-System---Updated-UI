"use client";

import { useState, useRef, useEffect } from "react";
import { BellIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
};

// Mock notifications - replace with API call later
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Feature Available",
    message: "OMG IQ analytics dashboard is now live!",
    time: "2 hours ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Document Uploaded",
    message: "Your contract has been securely stored.",
    time: "5 hours ago",
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "Subscription Reminder",
    message: "Your trial ends in 7 days. Upgrade now!",
    time: "1 day ago",
    read: true,
    type: "warning",
  },
];

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-[#47BD79]/20 border-[#47BD79]/30";
      case "warning":
        return "bg-amber-500/20 border-amber-500/30";
      default:
        return "bg-blue-500/20 border-blue-500/30";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-xl border border-white/20 bg-white/5 p-2 hover:bg-white/10 transition-colors relative"
        aria-label="Notifications"
      >
        <BellIcon className="w-5 h-5 text-white/70" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#47BD79] rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{unreadCount}</span>
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#1e293b] backdrop-blur-xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[#47BD79] hover:text-[#5fcd8f] transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <BellIcon className="w-8 h-8 text-white/30 mx-auto mb-2" />
                <p className="text-sm text-white/50">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${
                    !notification.read ? "bg-white/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        notification.read ? "bg-white/20" : "bg-[#47BD79]"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-medium text-white truncate">
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                              title="Mark as read"
                            >
                              <CheckIcon className="w-3.5 h-3.5 text-white/50" />
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                            title="Remove"
                          >
                            <XMarkIcon className="w-3.5 h-3.5 text-white/50" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-white/40 mt-1 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-white/10 px-4 py-2">
              <button className="w-full text-center text-xs text-white/50 hover:text-white/70 transition-colors py-1">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
