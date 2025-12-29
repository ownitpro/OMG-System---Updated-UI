"use client";

import * as React from "react";
import Link from "next/link";
import {
  type Client,
  type ClientSortKey,
  type SortDirection,
  type ClientTag,
  type ClientNote,
  type ClientActivity,
  readClients,
  getClientStats,
  filterClients,
  sortClients,
  bulkUpdateClientStatus,
  updateClientStatus,
  exportClientsToCSV,
  downloadCSV,
  getRelativeTime,
  readTags,
  getTagsByIds,
  addTagToClient,
  removeTagFromClient,
  addClientNote,
  deleteClientNote,
  recordEmailSent,
} from "@/lib/admin/clientStore";
import {
  UsersIcon,
  CheckCircleIcon,
  UserPlusIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  Bars3Icon,
  Bars2Icon,
  ArrowDownTrayIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  ShoppingBagIcon,
  CheckIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  TagIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid, TagIcon as TagIconSolid } from "@heroicons/react/24/solid";

// ============================================
// Types
// ============================================

type StatusFilter = Client["status"] | "all";
type PlanFilter = Client["plan"] | "all";

// ============================================
// Constants
// ============================================

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "churned", label: "Churned" },
];

const PLAN_OPTIONS: { value: PlanFilter; label: string }[] = [
  { value: "all", label: "All Plans" },
  { value: "free", label: "Free" },
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

const SORT_OPTIONS: { value: ClientSortKey; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "createdAt", label: "Joined" },
  { value: "totalSpent", label: "Total Spent" },
  { value: "ordersCount", label: "Orders" },
  { value: "lastActiveAt", label: "Last Active" },
];

const PLAN_COLORS: Record<Client["plan"], string> = {
  free: "#94A3B8",
  starter: "#3B82F6",
  pro: "#A855F7",
  enterprise: "#F59E0B",
};

const STATUS_COLORS: Record<Client["status"], string> = {
  active: "#47BD79",
  inactive: "#F59E0B",
  churned: "#EF4444",
};

// ============================================
// Sub-Components
// ============================================

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-white/50">{label}</div>
          {sub && <div className="text-[10px] text-white/40">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = [
    "#47BD79",
    "#3B82F6",
    "#A855F7",
    "#F59E0B",
    "#EC4899",
    "#06B6D4",
    "#8B5CF6",
    "#F97316",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  const sizeClasses = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";

  return (
    <div
      className={`${sizeClasses} rounded-xl flex items-center justify-center font-semibold text-white`}
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  );
}

function PlanBadge({ plan }: { plan: Client["plan"] }) {
  const color = PLAN_COLORS[plan];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {plan}
    </span>
  );
}

function StatusPill({ status }: { status: Client["status"] }) {
  const color = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
      style={{ backgroundColor: `${color}20`, color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {status}
    </span>
  );
}

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-[#47BD79]/50 cursor-pointer"
      title={label}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-[#1e293b]">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function ActionsMenu({
  client,
  onQuickView,
  onStatusChange,
  onEmailClient,
}: {
  client: Client;
  onQuickView: () => void;
  onStatusChange: (status: Client["status"]) => void;
  onEmailClient: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all"
      >
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-white/10 bg-[#1e293b] shadow-xl z-50 py-1 overflow-hidden">
          <button
            onClick={() => {
              onQuickView();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all"
          >
            <EyeIcon className="w-4 h-4 text-[#3B82F6]" />
            Quick View
          </button>
          <button
            onClick={() => {
              onEmailClient();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all"
          >
            <EnvelopeIcon className="w-4 h-4 text-[#47BD79]" />
            Send Email
          </button>
          <Link
            href={`/portal/admin/orders?client=${client.id}`}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all"
          >
            <ShoppingBagIcon className="w-4 h-4 text-[#A855F7]" />
            View Orders
          </Link>
          <div className="border-t border-white/10 my-1" />
          {client.status !== "active" && (
            <button
              onClick={() => {
                onStatusChange("active");
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all"
            >
              <CheckIcon className="w-4 h-4 text-[#47BD79]" />
              Mark Active
            </button>
          )}
          {client.status !== "inactive" && (
            <button
              onClick={() => {
                onStatusChange("inactive");
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all"
            >
              <XCircleIcon className="w-4 h-4 text-[#F59E0B]" />
              Mark Inactive
            </button>
          )}
          {client.status !== "churned" && (
            <button
              onClick={() => {
                onStatusChange("churned");
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all"
            >
              <ExclamationTriangleIcon className="w-4 h-4 text-[#EF4444]" />
              Mark Churned
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Activity Timeline Icons
type ActivityType = "note_added" | "status_changed" | "email_sent" | "order_placed" | "tag_added" | "tag_removed" | "plan_changed";
type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const ACTIVITY_ICONS: Record<ActivityType, { icon: IconComponent; color: string }> = {
  note_added: { icon: ChatBubbleLeftIcon, color: "#3B82F6" },
  status_changed: { icon: CheckCircleIcon, color: "#47BD79" },
  email_sent: { icon: EnvelopeIcon, color: "#A855F7" },
  order_placed: { icon: ShoppingBagIcon, color: "#F59E0B" },
  tag_added: { icon: TagIcon, color: "#EC4899" },
  tag_removed: { icon: TagIcon, color: "#6B7280" },
  plan_changed: { icon: ChartBarIcon, color: "#06B6D4" },
};

function ClientDrawer({
  client,
  onClose,
  onStatusChange,
  onEmailClient,
  onClientUpdate,
}: {
  client: Client;
  onClose: () => void;
  onStatusChange: (status: Client["status"]) => void;
  onEmailClient: () => void;
  onClientUpdate: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<"info" | "notes" | "activity">("info");
  const [allTags, setAllTags] = React.useState<ClientTag[]>([]);
  const [newNote, setNewNote] = React.useState("");
  const [showTagPicker, setShowTagPicker] = React.useState(false);

  // Load tags
  React.useEffect(() => {
    setAllTags(readTags());
  }, []);

  // Get client's tags
  const clientTags = React.useMemo(() => {
    return getTagsByIds(client.tags || []);
  }, [client.tags]);

  // Available tags (not already assigned)
  const availableTags = React.useMemo(() => {
    const clientTagIds = client.tags || [];
    return allTags.filter((t) => !clientTagIds.includes(t.id));
  }, [allTags, client.tags]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    addClientNote(client.id, newNote.trim());
    setNewNote("");
    onClientUpdate();
  };

  const handleDeleteNote = (noteId: string) => {
    deleteClientNote(client.id, noteId);
    onClientUpdate();
  };

  const handleAddTag = (tagId: string) => {
    addTagToClient(client.id, tagId);
    setShowTagPicker(false);
    onClientUpdate();
  };

  const handleRemoveTag = (tagId: string) => {
    removeTagFromClient(client.id, tagId);
    onClientUpdate();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#0f172a] border-l border-white/10 z-50 overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-[#0f172a]/95 backdrop-blur-sm border-b border-white/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar name={client.name} />
              <div>
                <div className="font-semibold text-white">{client.name}</div>
                <div className="text-xs text-white/50">{client.email}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Tags Display */}
          <div className="flex flex-wrap items-center gap-2">
            {clientTags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium group"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                <TagIconSolid className="w-3 h-3" />
                {tag.name}
                <button
                  onClick={() => handleRemoveTag(tag.id)}
                  className="ml-0.5 opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded-full p-0.5 transition-all"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
            <div className="relative">
              <button
                onClick={() => setShowTagPicker(!showTagPicker)}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-white/30 px-2 py-0.5 text-xs text-white/50 hover:text-white hover:border-white/50 transition-all"
              >
                <PlusIcon className="w-3 h-3" />
                Add Tag
              </button>
              {showTagPicker && availableTags.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-xl border border-white/10 bg-[#1e293b] shadow-xl z-50 py-1 max-h-48 overflow-y-auto">
                  {availableTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleAddTag(tag.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-white/10 transition-all"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      {tag.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-white/10 -mx-4 px-4">
            {[
              { id: "info", label: "Info", icon: UsersIcon },
              { id: "notes", label: "Notes", icon: ChatBubbleLeftIcon, count: client.notes?.length },
              { id: "activity", label: "Activity", icon: ClockIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-[#47BD79] text-[#47BD79]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Info Tab */}
          {activeTab === "info" && (
            <>
              {/* Status & Plan */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/50 mb-1">Plan</div>
                    <PlanBadge plan={client.plan} />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">Status</div>
                    <StatusPill status={client.status} />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Statistics
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {client.ordersCount}
                    </div>
                    <div className="text-xs text-white/50">Total Orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#47BD79]">
                      ${(client.totalSpent / 100).toFixed(0)}
                    </div>
                    <div className="text-xs text-white/50">Total Spent</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-white/50">Joined</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {getRelativeTime(client.lastActiveAt)}
                    </div>
                    <div className="text-xs text-white/50">Last Active</div>
                  </div>
                </div>
              </div>

              {/* Company */}
              {client.company && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Company
                  </div>
                  <div className="text-white">{client.company}</div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Quick Actions
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={onEmailClient}
                    className="flex items-center gap-1.5 rounded-lg bg-[#47BD79]/20 border border-[#47BD79]/30 px-3 py-1.5 text-xs font-medium text-[#47BD79] hover:bg-[#47BD79]/30 transition-all"
                  >
                    <EnvelopeIcon className="w-3.5 h-3.5" />
                    Send Email
                  </button>
                  {client.status !== "active" && (
                    <button
                      onClick={() => onStatusChange("active")}
                      className="flex items-center gap-1.5 rounded-lg bg-[#3B82F6]/20 border border-[#3B82F6]/30 px-3 py-1.5 text-xs font-medium text-[#3B82F6] hover:bg-[#3B82F6]/30 transition-all"
                    >
                      <CheckIcon className="w-3.5 h-3.5" />
                      Mark Active
                    </button>
                  )}
                  {client.status !== "inactive" && (
                    <button
                      onClick={() => onStatusChange("inactive")}
                      className="flex items-center gap-1.5 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]/30 px-3 py-1.5 text-xs font-medium text-[#F59E0B] hover:bg-[#F59E0B]/30 transition-all"
                    >
                      <XCircleIcon className="w-3.5 h-3.5" />
                      Mark Inactive
                    </button>
                  )}
                  {client.status !== "churned" && (
                    <button
                      onClick={() => onStatusChange("churned")}
                      className="flex items-center gap-1.5 rounded-lg bg-[#EF4444]/20 border border-[#EF4444]/30 px-3 py-1.5 text-xs font-medium text-[#EF4444] hover:bg-[#EF4444]/30 transition-all"
                    >
                      <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                      Mark Churned
                    </button>
                  )}
                </div>
              </div>

              {/* View All Orders Link */}
              <Link
                href={`/portal/admin/orders?client=${client.id}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-all"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                View All Orders
              </Link>
            </>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <>
              {/* Add Note */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Add Note
                </div>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write a note about this client..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="flex items-center gap-1.5 rounded-lg bg-[#47BD79] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3da968] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                    Add Note
                  </button>
                </div>
              </div>

              {/* Notes List */}
              <div className="space-y-3">
                {(client.notes || []).length === 0 ? (
                  <div className="text-center py-8 text-white/40 text-sm">
                    No notes yet. Add your first note above.
                  </div>
                ) : (
                  (client.notes || []).map((note) => (
                    <div
                      key={note.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <span className="font-medium text-white/70">{note.createdBy}</span>
                          <span>•</span>
                          <span>{getRelativeTime(note.createdAt)}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-white whitespace-pre-wrap">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-1">
              {(client.activity || []).length === 0 ? (
                <div className="text-center py-8 text-white/40 text-sm">
                  No activity recorded yet.
                </div>
              ) : (
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

                  {(client.activity || []).map((activity, index) => {
                    const activityType = activity.type as ActivityType;
                    const { icon: Icon, color } = ACTIVITY_ICONS[activityType] || {
                      icon: ClockIcon,
                      color: "#6B7280",
                    };
                    return (
                      <div key={activity.id} className="relative flex gap-4 pb-4">
                        {/* Icon */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="text-sm text-white">{activity.description}</div>
                          <div className="text-xs text-white/40 mt-0.5">
                            {getRelativeTime(activity.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

// Email Modal Component
function EmailModal({
  client,
  onClose,
  onSend,
}: {
  client: Client;
  onClose: () => void;
  onSend: (subject: string, body: string) => void;
}) {
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return;
    setSending(true);
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSend(subject, body);
    setSending(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <EnvelopeIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <div>
              <div className="font-semibold text-white">Send Email</div>
              <div className="text-xs text-white/50">To: {client.email}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5">
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 resize-none"
              rows={6}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!subject.trim() || !body.trim() || sending}
            className="flex items-center gap-2 rounded-lg bg-[#47BD79] px-4 py-2 text-sm font-medium text-white hover:bg-[#3da968] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-4 h-4" />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

function ExportDropdown({
  onExportAll,
  onExportFiltered,
  onExportSelected,
  selectedCount,
}: {
  onExportAll: () => void;
  onExportFiltered: () => void;
  onExportSelected: () => void;
  selectedCount: number;
}) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10 transition-all"
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
        Export
        <ChevronDownIcon className="w-3 h-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-white/10 bg-[#1e293b] shadow-xl z-50 py-1 overflow-hidden">
          <button
            onClick={() => {
              onExportAll();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-white/10 transition-all"
          >
            Export All
          </button>
          <button
            onClick={() => {
              onExportFiltered();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-white/10 transition-all"
          >
            Export Filtered
          </button>
          {selectedCount > 0 && (
            <button
              onClick={() => {
                onExportSelected();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-white/10 transition-all"
            >
              Export Selected ({selectedCount})
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function ClientsTable() {
  // Data State
  const [clients, setClients] = React.useState<Client[]>([]);
  const [stats, setStats] = React.useState(getClientStats());

  // Filter State
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [planFilter, setPlanFilter] = React.useState<PlanFilter>("all");
  const [sortKey, setSortKey] = React.useState<ClientSortKey>("lastActiveAt");
  const [sortDir, setSortDir] = React.useState<SortDirection>("desc");

  // UI State
  const [compact, setCompact] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [drawerClient, setDrawerClient] = React.useState<Client | null>(null);
  const [emailClient, setEmailClient] = React.useState<Client | null>(null);

  // Load data
  React.useEffect(() => {
    const loadData = () => {
      setClients(readClients());
      setStats(getClientStats());
    };
    loadData();

    window.addEventListener("omg-clients-updated", loadData);
    return () => window.removeEventListener("omg-clients-updated", loadData);
  }, []);

  // Filter and sort clients
  const filteredClients = React.useMemo(() => {
    const filtered = filterClients(clients, {
      search,
      status: statusFilter,
      plan: planFilter,
    });
    return sortClients(filtered, sortKey, sortDir);
  }, [clients, search, statusFilter, planFilter, sortKey, sortDir]);

  // Selection handlers
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(filteredClients.map((c) => c.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  // Bulk action handlers
  const handleBulkStatus = (status: Client["status"]) => {
    bulkUpdateClientStatus(Array.from(selectedIds), status);
    clearSelection();
  };

  // Single client status change
  const handleStatusChange = (clientId: string, status: Client["status"]) => {
    updateClientStatus(clientId, status);
    if (drawerClient?.id === clientId) {
      setDrawerClient({ ...drawerClient, status });
    }
  };

  // Export handlers
  const handleExportAll = () => {
    const csv = exportClientsToCSV(clients);
    downloadCSV(csv, `clients-all-${new Date().toISOString().split("T")[0]}.csv`);
  };

  const handleExportFiltered = () => {
    const csv = exportClientsToCSV(filteredClients);
    downloadCSV(csv, `clients-filtered-${new Date().toISOString().split("T")[0]}.csv`);
  };

  const handleExportSelected = () => {
    const selected = clients.filter((c) => selectedIds.has(c.id));
    const csv = exportClientsToCSV(selected);
    downloadCSV(csv, `clients-selected-${new Date().toISOString().split("T")[0]}.csv`);
  };

  // Email handler
  const handleSendEmail = (clientId: string, subject: string, body: string) => {
    recordEmailSent(clientId, subject);
    setEmailClient(null);
    // In production, this would call an API to send the email
    // For now, we just record the activity
  };

  // Refresh drawer client data
  const handleClientUpdate = () => {
    if (drawerClient) {
      const updated = readClients().find((c) => c.id === drawerClient.id);
      if (updated) {
        setDrawerClient(updated);
      }
    }
  };

  const hasFilters = search || statusFilter !== "all" || planFilter !== "all";

  return (
    <div className="space-y-4">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          label="Total Clients"
          value={stats.total}
          icon={UsersIcon}
          color="#3B82F6"
        />
        <StatCard
          label="Active"
          value={stats.active}
          icon={CheckCircleIcon}
          color="#47BD79"
        />
        <StatCard
          label="New This Month"
          value={stats.newThisMonth}
          icon={UserPlusIcon}
          color="#A855F7"
        />
        <StatCard
          label="Total Revenue"
          value={`$${(stats.totalRevenueCents / 100).toLocaleString()}`}
          icon={CurrencyDollarIcon}
          color="#47BD79"
        />
        <StatCard
          label="Avg Order"
          value={`$${(stats.avgOrderValueCents / 100).toFixed(0)}`}
          icon={ChartBarIcon}
          color="#3B82F6"
        />
        <StatCard
          label="Churn Rate"
          value={`${stats.churnRate}%`}
          icon={ArrowTrendingDownIcon}
          color="#EF4444"
        />
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-white/40" />
            <Dropdown
              label="Status"
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={(v) => setStatusFilter(v as StatusFilter)}
            />
            <Dropdown
              label="Plan"
              value={planFilter}
              options={PLAN_OPTIONS}
              onChange={(v) => setPlanFilter(v as PlanFilter)}
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowsUpDownIcon className="w-4 h-4 text-white/40" />
            <Dropdown
              label="Sort"
              value={sortKey}
              options={SORT_OPTIONS}
              onChange={(v) => setSortKey(v as ClientSortKey)}
            />
            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs text-white hover:bg-white/10 transition-all"
              title={sortDir === "asc" ? "Ascending" : "Descending"}
            >
              {sortDir === "asc" ? "↑" : "↓"}
            </button>
          </div>

          {/* Density Toggle */}
          <button
            onClick={() => setCompact(!compact)}
            className={`p-2 rounded-lg border transition-all ${
              compact
                ? "border-[#47BD79]/50 bg-[#47BD79]/20 text-[#47BD79]"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
            title={compact ? "Comfortable view" : "Compact view"}
          >
            {compact ? (
              <Bars2Icon className="w-4 h-4" />
            ) : (
              <Bars3Icon className="w-4 h-4" />
            )}
          </button>

          {/* Export */}
          <ExportDropdown
            onExportAll={handleExportAll}
            onExportFiltered={handleExportFiltered}
            onExportSelected={handleExportSelected}
            selectedCount={selectedIds.size}
          />

          {/* Clear Filters */}
          {hasFilters && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setPlanFilter("all");
              }}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <XMarkIcon className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 p-3 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedIds.size === filteredClients.length}
              onChange={(e) =>
                e.target.checked ? selectAll() : clearSelection()
              }
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#47BD79] focus:ring-[#47BD79]/50"
            />
            <span className="text-sm font-medium text-white">
              {selectedIds.size} selected
            </span>
          </div>

          <div className="h-5 w-px bg-white/20" />

          <button
            onClick={() => handleBulkStatus("active")}
            className="flex items-center gap-1.5 rounded-lg bg-[#47BD79] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3da968] transition-all"
          >
            <CheckIcon className="w-3.5 h-3.5" />
            Activate
          </button>
          <button
            onClick={() => handleBulkStatus("inactive")}
            className="flex items-center gap-1.5 rounded-lg bg-[#F59E0B] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#d97706] transition-all"
          >
            <XCircleIcon className="w-3.5 h-3.5" />
            Deactivate
          </button>
          <button
            onClick={() => handleBulkStatus("churned")}
            className="flex items-center gap-1.5 rounded-lg bg-[#EF4444] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#dc2626] transition-all"
          >
            <ExclamationTriangleIcon className="w-3.5 h-3.5" />
            Mark Churned
          </button>
          <button
            onClick={handleExportSelected}
            className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-all"
          >
            <ArrowDownTrayIcon className="w-3.5 h-3.5" />
            Export
          </button>

          <div className="flex-1" />

          <button
            onClick={clearSelection}
            className="text-xs text-white/60 hover:text-white transition-all"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 backdrop-blur-sm">
              <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                <th className="px-3 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredClients.length > 0 &&
                      selectedIds.size === filteredClients.length
                    }
                    onChange={(e) =>
                      e.target.checked ? selectAll() : clearSelection()
                    }
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#47BD79] focus:ring-[#47BD79]/50"
                  />
                </th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Orders</th>
                <th className="px-4 py-3 text-left">Spent</th>
                <th className="px-4 py-3 text-left">Last Active</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredClients.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-12 text-center text-white/50"
                    colSpan={8}
                  >
                    {hasFilters
                      ? "No clients match your filters."
                      : "No clients found."}
                  </td>
                </tr>
              ) : (
                filteredClients.map((c) => (
                  <tr
                    key={c.id}
                    className={`group transition-colors hover:bg-white/5 ${
                      selectedIds.has(c.id) ? "bg-[#47BD79]/5" : ""
                    } ${compact ? "text-xs" : ""}`}
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(c.id)}
                        onChange={() => toggleSelect(c.id)}
                        className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#47BD79] focus:ring-[#47BD79]/50"
                      />
                    </td>
                    <td className={compact ? "px-4 py-2" : "px-4 py-3"}>
                      <div className="flex items-center gap-3">
                        <Avatar name={c.name} size={compact ? "sm" : "md"} />
                        <div>
                          <div className="font-medium text-white">{c.name}</div>
                          <div className="text-xs text-white/50">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={compact ? "px-4 py-2" : "px-4 py-3"}>
                      <PlanBadge plan={c.plan} />
                    </td>
                    <td className={compact ? "px-4 py-2" : "px-4 py-3"}>
                      <StatusPill status={c.status} />
                    </td>
                    <td className={compact ? "px-4 py-2" : "px-4 py-3"}>
                      <span className="text-white">{c.ordersCount}</span>
                    </td>
                    <td className={compact ? "px-4 py-2" : "px-4 py-3"}>
                      <span className="text-[#47BD79] font-medium">
                        ${(c.totalSpent / 100).toLocaleString()}
                      </span>
                    </td>
                    <td className={compact ? "px-4 py-2" : "px-4 py-3"}>
                      <span className="text-white/60">
                        {getRelativeTime(c.lastActiveAt)}
                      </span>
                    </td>
                    <td className={compact ? "px-3 py-2" : "px-3 py-3"}>
                      <ActionsMenu
                        client={c}
                        onQuickView={() => setDrawerClient(c)}
                        onStatusChange={(status) =>
                          handleStatusChange(c.id, status)
                        }
                        onEmailClient={() => setEmailClient(c)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-white/40">
          <span>
            Showing {filteredClients.length} of {clients.length} clients
          </span>
          <span>Mock Data</span>
        </div>
      </div>

      {/* Client Drawer */}
      {drawerClient && (
        <ClientDrawer
          client={drawerClient}
          onClose={() => setDrawerClient(null)}
          onStatusChange={(status) => {
            handleStatusChange(drawerClient.id, status);
          }}
          onEmailClient={() => setEmailClient(drawerClient)}
          onClientUpdate={handleClientUpdate}
        />
      )}

      {/* Email Modal */}
      {emailClient && (
        <EmailModal
          client={emailClient}
          onClose={() => setEmailClient(null)}
          onSend={(subject, body) => handleSendEmail(emailClient.id, subject, body)}
        />
      )}
    </div>
  );
}
