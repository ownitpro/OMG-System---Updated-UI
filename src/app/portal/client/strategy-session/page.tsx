"use client";

import { useState } from "react";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useStrategySessions, useBookingModal, useNotesModal, StrategySession, CreateSessionInput } from "@/hooks/useStrategySessions";
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  VideoCameraIcon,
  UserIcon,
  PlusIcon,
  ArrowRightIcon,
  XMarkIcon,
  DocumentTextIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { formatDateTime, formatDuration, SESSION_STATUS } from "@/lib/client/formatters";

// Generate available slots for the current week
function getAvailableSlotsThisWeek() {
  const slots = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  for (let i = 0; i < 5; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    slots.push({
      day: days[i],
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      fullDate: date,
      slots: Math.floor(Math.random() * 5) + 1, // Mock: 1-5 slots
    });
  }

  return slots;
}

// Session colors based on index
const SESSION_COLORS = ["#47BD79", "#3B82F6", "#A855F7", "#F59E0B", "#EC4899"];

export default function StrategySessionPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const {
    upcomingSessions,
    pastSessions,
    stats,
    isLoading,
    error,
    createSession,
  } = useStrategySessions();

  const bookingModal = useBookingModal();
  const notesModal = useNotesModal();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "10:00",
    duration: 60,
  });

  const lockedCount = Object.values(entitlements).filter(
    (s) => s === "locked"
  ).length;

  const availableSlots = getAvailableSlotsThisWeek();

  // Handle booking form submission
  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scheduledAt = new Date(`${bookingForm.date}T${bookingForm.time}:00`).toISOString();

      const input: CreateSessionInput = {
        title: bookingForm.title,
        description: bookingForm.description || undefined,
        scheduledAt,
        durationMinutes: bookingForm.duration,
      };

      await createSession(input);
      bookingModal.close();
      setBookingForm({
        title: "",
        description: "",
        date: "",
        time: "10:00",
        duration: 60,
      });
    } catch (err) {
      console.error("Failed to book session:", err);
      alert("Failed to book session. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle slot click - open booking modal with date prefilled
  const handleSlotClick = (slot: { fullDate: Date }) => {
    const dateStr = slot.fullDate.toISOString().split("T")[0];
    setBookingForm((prev) => ({ ...prev, date: dateStr }));
    bookingModal.open(slot.fullDate);
  };

  // Handle Join button - open meeting link
  const handleJoin = (session: StrategySession) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, "_blank");
    } else {
      alert("Meeting link not available yet. Please check back closer to the session time.");
    }
  };

  // Handle View Notes
  const handleViewNotes = (session: StrategySession) => {
    notesModal.open(session);
  };

  // Handle Download Recording
  const handleDownloadRecording = (session: StrategySession) => {
    if (session.recordingUrl) {
      window.open(session.recordingUrl, "_blank");
    } else {
      alert("Recording not available for this session.");
    }
  };

  // Get session color
  const getSessionColor = (index: number) => SESSION_COLORS[index % SESSION_COLORS.length];

  // Fallback data for when API returns empty
  const displayUpcoming = upcomingSessions.length > 0 ? upcomingSessions : [];
  const displayPast = pastSessions.length > 0 ? pastSessions : [];

  return (
    <PortalShellV2 role="client" title="Strategy Session" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <CalendarDaysIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Strategy Session</h1>
              <p className="text-sm text-white/60">
                Book and manage your strategy sessions with our team.
              </p>
            </div>
          </div>

          <button
            onClick={() => bookingModal.open()}
            className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Book Session
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CalendarDaysIcon className="w-4 h-4" />
              Upcoming
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">
              {isLoading ? "..." : stats.upcoming}
            </div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircleIcon className="w-4 h-4" />
              Completed
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">
              {isLoading ? "..." : stats.completed}
            </div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ClockIcon className="w-4 h-4" />
              Hours This Year
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">
              {isLoading ? "..." : stats.totalHours.toFixed(1)}
            </div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <UserIcon className="w-4 h-4" />
              Advisors
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">3</div>
          </div>
        </div>

        {/* Available Slots */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="w-5 h-5 text-[#47BD79]" />
              <div className="text-lg font-semibold text-white">Available This Week</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {availableSlots.map((slot) => (
              <button
                key={slot.day}
                onClick={() => handleSlotClick(slot)}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:border-[#47BD79]/50 hover:bg-[#47BD79]/10 transition-all group cursor-pointer"
              >
                <div className="text-sm font-medium text-white/60">{slot.day}</div>
                <div className="text-lg font-semibold text-white mt-1">{slot.date}</div>
                <div className="mt-2 text-xs text-[#47BD79]">{slot.slots} slots</div>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#47BD79] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-white/60">Loading sessions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center">
            <p className="text-red-400">Failed to load sessions. Please refresh the page.</p>
          </div>
        )}

        {/* Upcoming Sessions */}
        {!isLoading && (
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="text-lg font-semibold text-white">Upcoming Sessions</div>
            </div>

            <div className="divide-y divide-white/10">
              {displayUpcoming.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <CalendarDaysIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60">No upcoming sessions</p>
                  <button
                    onClick={() => bookingModal.open()}
                    className="mt-3 text-[#47BD79] hover:underline text-sm"
                  >
                    Book your first session
                  </button>
                </div>
              ) : (
                displayUpcoming.map((session, index) => {
                  const color = getSessionColor(index);
                  const statusInfo = SESSION_STATUS[session.status as keyof typeof SESSION_STATUS] || SESSION_STATUS.SCHEDULED;

                  return (
                    <div
                      key={session.id}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <VideoCameraIcon className="w-5 h-5" style={{ color }} />
                        </div>
                        <div>
                          <div className="font-medium text-white">{session.title}</div>
                          <div className="flex items-center gap-3 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <UserIcon className="w-3 h-3" />
                              OMG Advisor
                            </span>
                            <span>|</span>
                            <span>{formatDateTime(session.scheduledAt)}</span>
                            <span>|</span>
                            <span>{formatDuration(session.durationMinutes)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
                          style={{ backgroundColor: `${color}20`, color }}
                        >
                          {session.status === "SCHEDULED" && <CheckCircleIcon className="w-3.5 h-3.5" />}
                          {statusInfo.label}
                        </span>
                        <button
                          onClick={() => handleJoin(session)}
                          className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                        >
                          Join
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Past Sessions */}
        {!isLoading && (
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="text-lg font-semibold text-white">Past Sessions</div>
            </div>

            <div className="divide-y divide-white/10">
              {displayPast.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <CheckCircleIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60">No past sessions yet</p>
                </div>
              ) : (
                displayPast.map((session, index) => {
                  const color = getSessionColor(index + 2);

                  return (
                    <div
                      key={session.id}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <CheckCircleIcon className="w-5 h-5" style={{ color }} />
                        </div>
                        <div>
                          <div className="font-medium text-white">{session.title}</div>
                          <div className="text-sm text-white/60">
                            {formatDateTime(session.scheduledAt)} • {formatDuration(session.durationMinutes)}
                          </div>
                          {session.notes && (
                            <div className="mt-1 text-xs text-white/50 line-clamp-1">
                              {session.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {session.recordingUrl && (
                          <button
                            onClick={() => handleDownloadRecording(session)}
                            className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                          >
                            <PlayIcon className="w-3.5 h-3.5" />
                            Recording
                          </button>
                        )}
                        <button
                          onClick={() => handleViewNotes(session)}
                          className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-colors"
                        >
                          View Notes
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => bookingModal.open()}
              className="rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              Schedule New Session
            </button>
            <button
              onClick={() => {
                const sessionsWithNotes = [...upcomingSessions, ...pastSessions].filter(s => s.notes);
                if (sessionsWithNotes.length > 0) {
                  notesModal.open(sessionsWithNotes[0]);
                } else {
                  alert("No session notes available yet.");
                }
              }}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View All Notes
            </button>
            <button
              onClick={() => {
                const sessionsWithRecordings = [...upcomingSessions, ...pastSessions].filter(s => s.recordingUrl);
                if (sessionsWithRecordings.length > 0) {
                  window.open(sessionsWithRecordings[0].recordingUrl!, "_blank");
                } else {
                  alert("No recordings available yet.");
                }
              }}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Download Recordings
            </button>
            <a
              href="/solutions/strategy-session"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Book Session Modal */}
      {bookingModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={bookingModal.close}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
            <button
              onClick={bookingModal.close}
              className="absolute right-4 top-4 text-white/60 hover:text-white"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                <CalendarDaysIcon className="w-5 h-5 text-[#47BD79]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Book Strategy Session</h2>
                <p className="text-sm text-white/60">Schedule a session with our team</p>
              </div>
            </div>

            <form onSubmit={handleBookSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">
                  Session Title *
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.title}
                  onChange={(e) => setBookingForm({ ...bookingForm, title: e.target.value })}
                  placeholder="e.g., Q1 Marketing Strategy Review"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-[#47BD79]/50 focus:outline-none focus:ring-1 focus:ring-[#47BD79]/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">
                  Description
                </label>
                <textarea
                  value={bookingForm.description}
                  onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
                  placeholder="What would you like to discuss?"
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-[#47BD79]/50 focus:outline-none focus:ring-1 focus:ring-[#47BD79]/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-[#47BD79]/50 focus:outline-none focus:ring-1 focus:ring-[#47BD79]/50 [color-scheme:dark]"
                    style={{
                      colorScheme: 'dark'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Time *
                  </label>
                  <select
                    required
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-white focus:border-[#47BD79]/50 focus:outline-none focus:ring-1 focus:ring-[#47BD79]/50 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.6)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.25rem'
                    }}
                  >
                    <option value="09:00" className="bg-slate-800 text-white">9:00 AM</option>
                    <option value="09:30" className="bg-slate-800 text-white">9:30 AM</option>
                    <option value="10:00" className="bg-slate-800 text-white">10:00 AM</option>
                    <option value="10:30" className="bg-slate-800 text-white">10:30 AM</option>
                    <option value="11:00" className="bg-slate-800 text-white">11:00 AM</option>
                    <option value="11:30" className="bg-slate-800 text-white">11:30 AM</option>
                    <option value="12:00" className="bg-slate-800 text-white">12:00 PM</option>
                    <option value="12:30" className="bg-slate-800 text-white">12:30 PM</option>
                    <option value="13:00" className="bg-slate-800 text-white">1:00 PM</option>
                    <option value="13:30" className="bg-slate-800 text-white">1:30 PM</option>
                    <option value="14:00" className="bg-slate-800 text-white">2:00 PM</option>
                    <option value="14:30" className="bg-slate-800 text-white">2:30 PM</option>
                    <option value="15:00" className="bg-slate-800 text-white">3:00 PM</option>
                    <option value="15:30" className="bg-slate-800 text-white">3:30 PM</option>
                    <option value="16:00" className="bg-slate-800 text-white">4:00 PM</option>
                    <option value="16:30" className="bg-slate-800 text-white">4:30 PM</option>
                    <option value="17:00" className="bg-slate-800 text-white">5:00 PM</option>
                    <option value="17:30" className="bg-slate-800 text-white">5:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">
                  Duration
                </label>
                <select
                  value={bookingForm.duration}
                  onChange={(e) => setBookingForm({ ...bookingForm, duration: parseInt(e.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-white focus:border-[#47BD79]/50 focus:outline-none focus:ring-1 focus:ring-[#47BD79]/50 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.6)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.25rem'
                  }}
                >
                  <option value={30} className="bg-slate-800 text-white">30 minutes</option>
                  <option value={60} className="bg-slate-800 text-white">1 hour</option>
                  <option value={90} className="bg-slate-800 text-white">1.5 hours</option>
                  <option value={120} className="bg-slate-800 text-white">2 hours</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={bookingModal.close}
                  className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Booking..." : "Book Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Notes Modal */}
      {notesModal.isOpen && notesModal.session && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={notesModal.close}
          />
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
            <button
              onClick={notesModal.close}
              className="absolute right-4 top-4 text-white/60 hover:text-white"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-[#A855F7]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{notesModal.session.title}</h2>
                <p className="text-sm text-white/60">
                  {formatDateTime(notesModal.session.scheduledAt)} • {formatDuration(notesModal.session.durationMinutes)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {notesModal.session.description && (
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-1">Description</h3>
                  <p className="text-white">{notesModal.session.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-white/60 mb-1">Session Notes</h3>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white whitespace-pre-wrap">
                    {notesModal.session.notes || "No notes available for this session."}
                  </p>
                </div>
              </div>

              {notesModal.session.recordingUrl && (
                <button
                  onClick={() => window.open(notesModal.session!.recordingUrl!, "_blank")}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <PlayIcon className="w-4 h-4" />
                  Watch Recording
                </button>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={notesModal.close}
                className="w-full rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalShellV2>
  );
}
