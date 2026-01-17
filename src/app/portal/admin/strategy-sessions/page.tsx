"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon, CalendarDaysIcon, LinkIcon, CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Toast } from "@/components/Toast";

interface User {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
}

interface StrategySession {
  id: string;
  title: string;
  description: string | null;
  scheduledAt: string;
  durationMinutes: number;
  status: string;
  meetingLink: string | null;
  notes: string | null;
  recordingUrl: string | null;
  user: User;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminStrategySessionsPage() {
  const [sessions, setSessions] = useState<StrategySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSession, setEditingSession] = useState<StrategySession | null>(null);
  const [editForm, setEditForm] = useState({
    meetingLink: "",
    notes: "",
    status: "SCHEDULED",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    description?: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/admin/sessions");
      if (!res.ok) throw new Error("Failed to fetch sessions");
      const data = await res.json();
      setSessions(data.sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      alert("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (session: StrategySession) => {
    setEditingSession(session);
    setEditForm({
      meetingLink: session.meetingLink || "",
      notes: session.notes || "",
      status: session.status,
    });
  };

  const handleSave = async () => {
    if (!editingSession) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/sessions/${editingSession.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Failed to update session");

      await fetchSessions();
      setEditingSession(null);
      setToast({
        message: "Session updated successfully!",
        description: "Client has been notified via email.",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating session:", error);
      setToast({
        message: "Failed to update session",
        description: "Please try again or contact support.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this session?")) return;

    try {
      const res = await fetch(`/api/admin/sessions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete session");

      await fetchSessions();
      setToast({
        message: "Session deleted successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting session:", error);
      setToast({
        message: "Failed to delete session",
        description: "Please try again or contact support.",
        type: "error",
      });
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      SCHEDULED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      COMPLETED: "bg-green-500/20 text-green-400 border-green-500/30",
      CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
      RESCHEDULED: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      NO_SHOW: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };

    return (
      <span
        className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${
          styles[status as keyof typeof styles] || styles.SCHEDULED
        }`}
      >
        {status}
      </span>
    );
  };

  const upcomingSessions = sessions.filter(
    (s) => new Date(s.scheduledAt) >= new Date() && s.status === "SCHEDULED"
  );

  const pastSessions = sessions.filter(
    (s) => new Date(s.scheduledAt) < new Date() || s.status !== "SCHEDULED"
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading sessions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/portal/admin"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Admin Portal</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Strategy Sessions Management</h1>
          <p className="text-white/60">Manage client strategy sessions and add meeting links</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDaysIcon className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-white/60">Upcoming</span>
            </div>
            <div className="text-3xl font-bold text-white">{upcomingSessions.length}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
              <span className="text-sm text-white/60">Past/Completed</span>
            </div>
            <div className="text-3xl font-bold text-white">{pastSessions.length}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <LinkIcon className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-white/60">With Meeting Links</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {sessions.filter((s) => s.meetingLink).length}
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-white/60">No upcoming sessions</p>
              </div>
            ) : (
              upcomingSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  formatDateTime={formatDateTime}
                  getStatusBadge={getStatusBadge}
                />
              ))
            )}
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Past Sessions</h2>
          <div className="space-y-4">
            {pastSessions.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-white/60">No past sessions</p>
              </div>
            ) : (
              pastSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  formatDateTime={formatDateTime}
                  getStatusBadge={getStatusBadge}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Edit Session</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Meeting Link
                </label>
                <input
                  type="url"
                  value={editForm.meetingLink}
                  onChange={(e) => setEditForm({ ...editForm, meetingLink: e.target.value })}
                  placeholder="https://meet.google.com/abc-defg-hij"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-[#47BD79]/50 focus:outline-none focus:ring-1 focus:ring-[#47BD79]/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Notes</label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  placeholder="Session notes..."
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-[#47BD79]/50 focus:outline-none focus:ring-1 focus:ring-[#47BD79]/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-white focus:border-[#47BD79]/50 focus:outline-none focus:ring-1 focus:ring-[#47BD79]/50"
                >
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="RESCHEDULED">Rescheduled</option>
                  <option value="NO_SHOW">No Show</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingSession(null)}
                className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          description={toast.description}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

function SessionCard({
  session,
  onEdit,
  onDelete,
  formatDateTime,
  getStatusBadge,
}: {
  session: StrategySession;
  onEdit: (session: StrategySession) => void;
  onDelete: (id: string) => void;
  formatDateTime: (date: string) => string;
  getStatusBadge: (status: string) => JSX.Element;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{session.title}</h3>
          <p className="text-sm text-white/60 mb-2">{session.description}</p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>📅 {formatDateTime(session.scheduledAt)}</span>
            <span>⏱️ {session.durationMinutes} min</span>
          </div>
        </div>
        <div>{getStatusBadge(session.status)}</div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-white/60 mb-1">Client:</div>
        <div className="text-white">
          {session.user.name || "No name"} ({session.user.email})
          {session.user.company && <span className="text-white/60"> • {session.user.company}</span>}
        </div>
      </div>

      {session.meetingLink && (
        <div className="mb-4">
          <div className="text-sm text-white/60 mb-1">Meeting Link:</div>
          <a
            href={session.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#47BD79] hover:text-[#3da968] text-sm break-all"
          >
            {session.meetingLink}
          </a>
        </div>
      )}

      {!session.meetingLink && (
        <div className="mb-4 flex items-center gap-2 text-sm text-yellow-400">
          <XCircleIcon className="w-4 h-4" />
          <span>No meeting link added yet</span>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(session)}
          className="flex items-center gap-2 rounded-xl bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/30 transition-colors"
        >
          <PencilIcon className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(session.id)}
          className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30 transition-colors"
        >
          <TrashIcon className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
