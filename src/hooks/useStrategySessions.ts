import useSWR from "swr";
import { useState } from "react";

// Types matching API response
export type SessionStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW";

export interface StrategySession {
  id: string;
  title: string;
  description: string | null;
  scheduledAt: string;
  durationMinutes: number;
  status: SessionStatus;
  meetingLink: string | null;
  notes: string | null;
  recordingUrl: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSessionInput {
  title: string;
  description?: string;
  scheduledAt: string;
  durationMinutes?: number;
  meetingLink?: string;
  notes?: string;
}

export interface UpdateSessionInput {
  title?: string;
  description?: string;
  scheduledAt?: string;
  durationMinutes?: number;
  status?: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  meetingLink?: string;
  notes?: string;
}

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  const text = await res.text();

  if (!text) {
    throw new Error("Empty response from server");
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
  }

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch");
  }

  return data.data;
};

export function useStrategySessions(upcoming?: boolean) {
  const url = upcoming
    ? "/api/client/sessions?upcoming=true"
    : "/api/client/sessions";

  const { data, error, isLoading, mutate } = useSWR<{ sessions: StrategySession[] }>(
    url,
    fetcher
  );

  // Create session
  const createSession = async (input: CreateSessionInput): Promise<StrategySession> => {
    const res = await fetch("/api/client/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create session");
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data.session;
  };

  // Update session
  const updateSession = async (id: string, updates: UpdateSessionInput): Promise<StrategySession> => {
    const res = await fetch(`/api/client/sessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to update session");
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data.session;
  };

  // Cancel session
  const cancelSession = async (id: string): Promise<void> => {
    const res = await fetch(`/api/client/sessions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to cancel session");
    }

    await mutate(); // Refresh the list
  };

  // Separate upcoming and past sessions
  const allSessions = data?.sessions ?? [];
  const now = new Date();

  const upcomingSessions = allSessions.filter(
    (s) => new Date(s.scheduledAt) >= now && s.status !== "CANCELLED"
  );

  const pastSessions = allSessions.filter(
    (s) => new Date(s.scheduledAt) < now || s.status === "COMPLETED"
  );

  // Calculate stats
  const stats = {
    upcoming: upcomingSessions.length,
    completed: pastSessions.filter((s) => s.status === "COMPLETED").length,
    totalHours: allSessions
      .filter((s) => s.status === "COMPLETED")
      .reduce((acc, s) => acc + s.durationMinutes / 60, 0),
  };

  return {
    sessions: allSessions,
    upcomingSessions,
    pastSessions,
    stats,
    isLoading,
    error,
    refetch: mutate,
    createSession,
    updateSession,
    cancelSession,
  };
}

// Hook for booking modal state
export function useBookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const open = (date?: Date) => {
    if (date) setSelectedDate(date);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return {
    isOpen,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    open,
    close,
  };
}

// Hook for notes modal state
export function useNotesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<StrategySession | null>(null);

  const open = (s: StrategySession) => {
    setSession(s);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSession(null);
  };

  return {
    isOpen,
    session,
    open,
    close,
  };
}
