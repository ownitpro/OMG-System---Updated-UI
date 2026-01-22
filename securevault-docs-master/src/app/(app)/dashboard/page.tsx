'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAccountAccess } from '@/hooks/useAccountAccess';
import { useNotificationCheck } from '@/hooks/useNotificationCheck';
import {
  FileText,
  Users,
  Upload,
  Share2,
  TrendingUp,
  Activity,
  Clock,
  FolderOpen,
  ArrowUpRight,
  Sparkles,
  Zap,
  Shield,
  Sun,
  Moon,
  Plus,
  Settings

} from 'lucide-react';

import { getPlanLimits, type Plan } from '@/lib/plan-limits';
import { HardDrive } from 'lucide-react';

// Dynamic imports to avoid Turbopack HMR issues
const UploadActivityChart = dynamic(
  () => import('@/components/DashboardCharts').then((mod) => mod.UploadActivityChart),
  { ssr: false, loading: () => <div className="h-[300px] animate-pulse bg-gray-200 dark:bg-slate-700 rounded-xl" /> }
);

const StorageUsageChart = dynamic(
  () => import('@/components/dashboard/StorageUsageChart'),
  { ssr: false, loading: () => <div className="h-[300px] animate-pulse bg-gray-200 dark:bg-slate-700 rounded-xl" /> }
);

const ExpirationWidget = dynamic(
  () => import('@/components/dashboard/ExpirationWidget'),
  { ssr: false, loading: () => <div className="h-[300px] animate-pulse bg-gray-200 dark:bg-slate-700 rounded-xl" /> }
);



interface DashboardStats {
  totalDocuments: number;
  totalPortals: number;
  totalShares: number;
  totalStorage: number;
  documentsThisMonth: number;
  portalsThisMonth: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

interface Document {
  id: string;
  name: string;
  createdAt: string;
  size?: number;
  sizeBytes?: number | string; // PostgreSQL returns BIGINT as string
  mimeType: string;
}

// Animated counter component
function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
}

// Dark mode toggle component
function DarkModeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-16 h-8 rounded-full p-1 transition-all duration-500 ease-in-out ${
        isDark
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
          : 'bg-gradient-to-r from-amber-400 to-orange-400'
      }`}
      aria-label="Toggle dark mode"
    >
      {/* Background stars/clouds */}
      <div className={`absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-100"></div>
        <div className="absolute top-2 left-8 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200"></div>
      </div>

      {/* Toggle circle */}
      <div
        className={`relative w-6 h-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out flex items-center justify-center ${
          isDark
            ? 'translate-x-8 bg-slate-800'
            : 'translate-x-0 bg-white'
        }`}
      >
        <Sun className={`w-4 h-4 text-amber-500 absolute transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
        <Moon className={`w-4 h-4 text-indigo-300 absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
      </div>
    </button>
  );
}

// Helper to validate org ID format
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DEMO_ORG_REGEX = /^org_demo(_\w+)?$/;
const isValidOrgId = (id: string | undefined): boolean => {
  if (!id) return false;
  return UUID_REGEX.test(id) || DEMO_ORG_REGEX.test(id);
};

export default function DashboardPage() {
  const { activeOrg, isPersonalVault } = useOrganization();
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const router = useRouter();
  const { canAccessClientPortal } = useAccountAccess();



  // Validate activeOrg ID - if corrupted, treat as null
  const validatedOrgId = isValidOrgId(activeOrg?.id) ? activeOrg?.id : undefined;

  // Check for urgent notifications on dashboard load (expiring/due today)
  useNotificationCheck(user?.id);
  const [stats, setStats] = useState<DashboardStats>({
    totalDocuments: 0,
    totalPortals: 0,
    totalShares: 0,
    totalStorage: 0,
    documentsThisMonth: 0,
    portalsThisMonth: 0,
    recentActivity: []
  });
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Time period filter for charts
  type TimePeriod = 'day' | 'week' | 'month' | 'year';
  const [chartPeriod, setChartPeriod] = useState<TimePeriod>('week');

  const dashboardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Track if data has been loaded to prevent re-fetching on tab visibility change
  const hasLoadedRef = useRef(false);
  const lastOrgIdRef = useRef<string | null>(null);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    const initAnimations = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;

      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      }

      // Animate stat cards with stagger
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.2
          }
        );
      }

      // Animate charts
      if (chartsRef.current) {
        gsap.fromTo(
          chartsRef.current.children,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.5
          }
        );
      }

      // Animate activity section
      if (activityRef.current) {
        gsap.fromTo(
          activityRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.7 }
        );
      }

      // Animate quick actions
      if (actionsRef.current) {
        gsap.fromTo(
          actionsRef.current.querySelectorAll('.quick-action'),
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            delay: 1.1
          }
        );
      }
    };

    initAnimations();
  }, [mounted, loading]);

  useEffect(() => {
    // If no activeOrg, stop loading and show empty state
    if (!activeOrg) {
      setLoading(false);
      return;
    }

    // Skip fetch if we have a placeholder/error vault ID (happens when personal vault fetch fails)
    if (validatedOrgId === 'error-no-vault') {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch documents
        const vaultParam = isPersonalVault
          ? `personalVaultId=${validatedOrgId}`
          : `organizationId=${validatedOrgId}`;

        const docsRes = await fetch(`/api/documents?${vaultParam}`);
        if (docsRes.ok) {
          const docsData = await docsRes.json();
          const docs = docsData.documents || [];
          setDocuments(docs);

          // Calculate total storage
          // Note: PostgreSQL returns BIGINT as string, so we need to parse it
          const totalStorage = docs.reduce((sum: number, doc: Document) => {
            const sizeValue = doc.sizeBytes ?? doc.size ?? 0;
            const size = typeof sizeValue === 'string' ? parseInt(sizeValue, 10) : sizeValue;
            return sum + (isNaN(size) ? 0 : size);
          }, 0);

          // Calculate this month's documents
          const now = new Date();
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const documentsThisMonth = docs.filter((doc: Document) =>
            new Date(doc.createdAt) >= firstDayOfMonth
          ).length;

          setStats(prev => ({
            ...prev,
            totalDocuments: docs.length,
            totalStorage,
            documentsThisMonth,
            recentActivity: docs.slice(0, 5).map((doc: Document) => ({
              id: doc.id,
              type: 'document',
              description: `Uploaded ${doc.name}`,
              timestamp: doc.createdAt
            }))
          }));
        }

        // Fetch portals - only for business accounts
        if (canAccessClientPortal) {
          const portalsEndpoint = `/api/org/${validatedOrgId}/portals`;

          const portalsRes = await fetch(portalsEndpoint);
          if (portalsRes.ok) {
            const portalsData = await portalsRes.json();
            const portals = portalsData.portals || [];

            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const portalsThisMonth = portals.filter((portal: any) =>
              new Date(portal.createdAt) >= firstDayOfMonth
            ).length;

            setStats(prev => ({
              ...prev,
              totalPortals: portals.length,
              portalsThisMonth
            }));
          }
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Set up real-time polling for portal stats (every 30 seconds)
    let pollInterval: NodeJS.Timeout | null = null;
    if (canAccessClientPortal) {
      pollInterval = setInterval(async () => {
        try {
          const portalsRes = await fetch(`/api/org/${validatedOrgId}/portals`);
          if (portalsRes.ok) {
            const portalsData = await portalsRes.json();
            const portals = portalsData.portals || [];
            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const portalsThisMonth = portals.filter((portal: any) =>
              new Date(portal.createdAt) >= firstDayOfMonth
            ).length;

            setStats(prev => ({
              ...prev,
              totalPortals: portals.length,
              portalsThisMonth
            }));
          }
        } catch (error) {
          console.error('Error polling portal stats:', error);
        }
      }, 30000); // Poll every 30 seconds
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [activeOrg, isPersonalVault, canAccessClientPortal]);

  // Generate upload activity data - recalculates when documents or period change
  const uploadActivityData = useMemo(() => {
    const data: Array<{ label: string; uploads: number }> = [];
    const now = new Date();

    switch (chartPeriod) {
      case 'day': {
        // Last 24 hours, hourly intervals
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(now);
          hour.setHours(hour.getHours() - i, 0, 0, 0);
          const hourEnd = new Date(hour);
          hourEnd.setHours(hour.getHours() + 1);

          const count = documents.filter(doc => {
            const docDate = new Date(doc.createdAt);
            return docDate >= hour && docDate < hourEnd;
          }).length;

          data.push({
            label: hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            uploads: count
          });
        }
        break;
      }
      case 'week': {
        // Last 7 days (default behavior)
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          const dayEnd = new Date(dayStart);
          dayEnd.setDate(dayEnd.getDate() + 1);

          const count = documents.filter(doc => {
            const docDate = new Date(doc.createdAt);
            return docDate >= dayStart && docDate < dayEnd;
          }).length;

          data.push({ label: dayNames[date.getDay()] || 'Unknown', uploads: count });
        }
        break;
      }
      case 'month': {
        // Last 30 days
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          const dayEnd = new Date(dayStart);
          dayEnd.setDate(dayEnd.getDate() + 1);

          const count = documents.filter(doc => {
            const docDate = new Date(doc.createdAt);
            return docDate >= dayStart && docDate < dayEnd;
          }).length;

          data.push({
            label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            uploads: count
          });
        }
        break;
      }
      case 'year': {
        // Last 12 months
        for (let i = 11; i >= 0; i--) {
          const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59);

          const count = documents.filter(doc => {
            const docDate = new Date(doc.createdAt);
            return docDate >= monthDate && docDate <= monthEnd;
          }).length;

          data.push({
            label: monthDate.toLocaleDateString('en-US', { month: 'short' }),
            uploads: count
          });
        }
        break;
      }
    }

    return data;
  }, [documents, chartPeriod]);

  // Generate storage usage data - recalculates when documents or period change
  const storageUsageData = useMemo(() => {
    const data: Array<{ label: string; storageGb: number }> = [];
    const now = new Date();

    const calculateStorageUpTo = (endDate: Date) => {
      return documents
        .filter(doc => new Date(doc.createdAt) <= endDate)
        .reduce((sum, doc) => {
          const sizeValue = doc.sizeBytes ?? doc.size ?? 0;
          const size = typeof sizeValue === 'string' ? parseInt(sizeValue, 10) : sizeValue;
          return sum + (isNaN(size) ? 0 : size);
        }, 0);
    };

    switch (chartPeriod) {
      case 'day': {
        // Last 24 hours, hourly snapshots
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(now);
          hour.setHours(hour.getHours() - i, 59, 59, 999);

          const totalBytes = calculateStorageUpTo(hour);

          data.push({
            label: new Date(hour).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            storageGb: totalBytes / (1024 * 1024 * 1024)
          });
        }
        break;
      }
      case 'week': {
        // Last 7 days (default behavior)
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 6; i >= 0; i--) {
          const targetDate = new Date(now);
          targetDate.setDate(targetDate.getDate() - i);
          targetDate.setHours(23, 59, 59, 999);

          const totalBytes = calculateStorageUpTo(targetDate);

          data.push({
            label: dayNames[targetDate.getDay()] || 'Unknown',
            storageGb: totalBytes / (1024 * 1024 * 1024)
          });
        }
        break;
      }
      case 'month': {
        // Last 30 days
        for (let i = 29; i >= 0; i--) {
          const targetDate = new Date(now);
          targetDate.setDate(targetDate.getDate() - i);
          targetDate.setHours(23, 59, 59, 999);

          const totalBytes = calculateStorageUpTo(targetDate);

          data.push({
            label: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            storageGb: totalBytes / (1024 * 1024 * 1024)
          });
        }
        break;
      }
      case 'year': {
        // Last 12 months
        for (let i = 11; i >= 0; i--) {
          const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);

          const totalBytes = calculateStorageUpTo(monthEnd);

          data.push({
            label: monthEnd.toLocaleDateString('en-US', { month: 'short' }),
            storageGb: totalBytes / (1024 * 1024 * 1024)
          });
        }
        break;
      }
    }

    return data;
  }, [documents, chartPeriod]);

  // Get plan storage limit
  const userPlan = (user?.plan as Plan) || 'free';
  const planLimits = getPlanLimits(userPlan);
  const storageLimitGb = planLimits.storageGb;
  const storageUsedGb = stats.totalStorage / (1024 * 1024 * 1024);
  const storagePercentage = Math.min((storageUsedGb / storageLimitGb) * 100, 100);

  // Get storage bar color based on usage
  const getStorageBarColor = (percentage: number) => {
    if (percentage >= 90) return 'from-red-500 to-red-400';
    if (percentage >= 75) return 'from-orange-500 to-amber-400';
    return 'from-cyan-500 to-teal-400';
  };

  // Format storage display
  const formatStorageDisplay = (bytes: number, limitGb: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) {
      return `${gb.toFixed(2)} GB / ${limitGb} GB`;
    }
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(0)} MB / ${limitGb} GB`;
  };

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0 || isNaN(bytes)) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Get greeting
  const getGreeting = () => {
    return 'Welcome';
  };

  // Theme classes
  const theme = {
    card: isDarkMode
      ? 'bg-slate-800 border-slate-700'
      : 'bg-white border-gray-200',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    hover: isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50',
    badge: isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-500',
  };

  // Get period label for chart subtitles
  const getPeriodLabel = () => {
    switch (chartPeriod) {
      case 'day': return 'Last 24 hours';
      case 'week': return 'Last 7 days';
      case 'month': return 'Last 30 days';
      case 'year': return 'Last 12 months';
    }
  };

  // Period filter button group component
  const PeriodFilterButtons = () => (
    <div className={`flex gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
      {(['day', 'week', 'month', 'year'] as const).map((period) => (
        <button
          key={period}
          onClick={() => setChartPeriod(period)}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-md sm:rounded-lg transition-all ${
            chartPeriod === period
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm'
              : isDarkMode
                ? 'text-slate-300 hover:bg-slate-600'
                : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          {period.charAt(0).toUpperCase() + period.slice(1)}
        </button>
      ))}
    </div>
  );

  const firstName = user?.name?.split(' ')[0] || (user?.email ? user.email.split('@')[0] : 'User');
  const planName = userPlan.charAt(0).toUpperCase() + userPlan.slice(1).replace('_', ' ');


  if (loading) {
    return (
      <div className="relative min-h-[400px] flex items-center justify-center rounded-3xl overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <div className={`w-20 h-20 border-4 ${isDarkMode ? 'border-teal-accent/20 border-t-teal-accent' : 'border-teal-dark/10 border-t-teal-dark'} rounded-full animate-spin`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className={`w-8 h-8 ${isDarkMode ? 'text-teal-accent' : 'text-teal-dark'} animate-pulse`} />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xl font-black text-navy tracking-tight font-display">Initializing Vault</p>
            <p className="text-sm text-slate font-medium font-outfit">Securing your workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show setup message if no organization is configured for business accounts
  if (!activeOrg && !isPersonalVault) {
    return (
      <div className="relative min-h-[500px] flex items-center justify-center rounded-3xl overflow-hidden">
        <div className="relative z-10 glass-card p-10 sm:p-16 border-white/40 max-w-xl text-center shadow-2xl">
          <div className="inline-flex p-5 bg-gradient-to-br from-teal-mid to-teal-dark rounded-3xl shadow-xl shadow-teal-mid/20 mb-8">
            <FolderOpen className="w-10 h-10 text-cream" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight mb-4 font-display">Welcome to SecureVault</h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed">
            Your workspace is ready, but you need an organization to start collaborating. Create your first one to unlock business features.
          </p>
          <a
            href="/settings"
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold rounded-full hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 transition-all text-lg"
          >
            Create Your Organization
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={dashboardRef} className="relative min-h-[calc(100vh-120px)] rounded-3xl overflow-hidden font-sans">


      <div className="relative z-10 space-y-6 sm:space-y-10 px-4 sm:px-0">
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 transition-all">
          <div className="space-y-2 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 dark:bg-teal-500/20 border border-white/30 dark:border-teal-400/20 text-white dark:text-teal-300 text-xs font-bold tracking-wider uppercase">
              <Activity className="w-3 h-3" />
              Live Dashboard
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]">
              Hello, <span className="bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)' }}>
                {firstName}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-readable-muted text-shadow-md font-bold max-w-2xl leading-relaxed transition-colors duration-500 font-outfit">
              Welcome back to your secure vault. Here's a snapshot of your {isPersonalVault ? 'personal' : 'organization'} activity and storage.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start md:self-end">
            <div className="glass-card px-4 py-2 border-white/40 flex items-center gap-3 bg-white/10">
              <div className="w-3 h-3 rounded-full bg-teal-bright animate-pulse"></div>
              <span className="text-sm font-semibold text-readable-light text-shadow-sm uppercase tracking-wide">
                {planName} Plan
              </span>
            </div>
          </div>
        </div>

        {/* Global Statistics Cards */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card group p-6 sm:p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-teal-dark rounded-2xl shadow-lg shadow-teal-dark/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-cream" />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-widest font-display">Documents</span>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white dark:text-white text-shadow-md mt-1 font-display">
                  <AnimatedCounter value={stats.totalDocuments} />
                </p>
              </div>
            </div>
            <p className="text-sm text-navy dark:text-slate-200 text-shadow-sm font-semibold leading-tight font-outfit">Total files securely stored across all vaults</p>
          </div>

          <div className="glass-card group p-6 sm:p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-teal-mid rounded-2xl shadow-lg shadow-teal-mid/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-cream" />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-widest font-display">Portals</span>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white dark:text-white text-shadow-md mt-1 font-display">
                  <AnimatedCounter value={stats.totalPortals} />
                </p>
              </div>
            </div>
            <p className="text-sm text-navy dark:text-slate-200 text-shadow-sm font-semibold leading-tight font-outfit">Client collaboration portals currently active</p>
          </div>

          <div className="glass-card group p-6 sm:p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-teal-light rounded-2xl shadow-lg shadow-teal-light/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-cream" />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-widest font-display">Shares</span>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white dark:text-white text-shadow-md mt-1 font-display">
                  <AnimatedCounter value={stats.totalShares} />
                </p>
              </div>
            </div>
            <p className="text-sm text-navy dark:text-slate-200 text-shadow-sm font-semibold leading-tight font-outfit">Secure document links shared with recipients</p>
          </div>

          <div className="glass-card group p-6 sm:p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-teal-accent rounded-2xl shadow-lg shadow-teal-accent/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <HardDrive className="w-6 h-6 sm:w-8 sm:h-8 text-cream" />
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 px-2 py-0.5 rounded-full bg-teal-dark/10 dark:bg-teal-500/20 border border-teal-dark/10 dark:border-teal-400/20 text-teal-dark dark:text-teal-300 text-[10px] font-black uppercase tracking-tighter">
                  {storagePercentage.toFixed(0)}% Used
                </div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy dark:text-white mt-1 font-display">
                  {formatBytes(stats.totalStorage)}
                </p>
              </div>
            </div>
            <div className="mt-2 h-2.5 bg-cream-dark rounded-full overflow-hidden border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-teal-mid to-teal-bright rounded-full shadow-sm transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(storagePercentage, 4)}%` }}
              ></div>
            </div>
          </div>
        </div>


        {/* Charts & Activities Row */}
        <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Activity Chart */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-10 border-white/40 dark:border-white/10 hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl shadow-xl shadow-blue-500/20">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-readable-light text-shadow-md tracking-tight font-display">Upload Activity</h2>
                  <p className="text-readable-muted text-shadow-sm font-semibold font-outfit">{getPeriodLabel()}</p>
                </div>
              </div>
              <PeriodFilterButtons />
            </div>
            <div className="w-full min-h-[300px] flex items-center justify-center">
              <UploadActivityChart data={uploadActivityData} isDarkMode={isDarkMode} />
            </div>
          </div>

          {/* Quick Actions & Expiration Widget */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Actions */}
            <div className="glass-card p-6 sm:p-8 border-white/40 dark:border-white/10 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl shadow-lg shadow-orange-500/20">
                  <Zap className="w-6 h-6 text-cream" />
                </div>
                <h2 className="text-xl font-bold text-readable-light text-shadow-md tracking-tight font-display">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="/documents"
                  className="group p-5 bg-white/20 border border-white/20 rounded-2xl hover:bg-teal-mid hover:border-teal-mid transition-all duration-300 flex flex-col items-center gap-3 text-center"
                >
                  <Upload className="w-6 h-6 text-readable-light group-hover:text-cream transition-colors" />
                  <span className="text-sm font-bold text-readable-light text-shadow-sm group-hover:text-cream font-outfit">Upload</span>
                </a>
                <a
                  href="/documents?tab=shares"
                  className="group p-5 bg-white/20 border border-white/20 rounded-2xl hover:bg-teal-mid hover:border-teal-mid transition-all duration-300 flex flex-col items-center gap-3 text-center"
                >
                  <Share2 className="w-6 h-6 text-teal-dark group-hover:text-cream transition-colors" />
                  <span className="text-sm font-bold text-navy group-hover:text-cream font-outfit relative z-10">Share</span>
                </a>
                {canAccessClientPortal && (
                  <a
                    href="/portals/new"
                    className="group p-5 bg-white/20 border border-white/20 rounded-2xl hover:bg-teal-mid hover:border-teal-mid transition-all duration-300 flex flex-col items-center gap-3 text-center"
                  >
                    <Plus className="w-6 h-6 text-teal-dark group-hover:text-cream transition-colors" />
                    <span className="text-sm font-bold text-navy group-hover:text-cream font-outfit">Portal</span>
                  </a>
                )}
                <a
                  href="/settings/profile"
                  className="group p-5 bg-white/20 border border-white/20 rounded-2xl hover:bg-teal-mid hover:border-teal-mid transition-all duration-300 flex flex-col items-center gap-3 text-center"
                >
                  <Settings className="w-6 h-6 text-teal-dark group-hover:text-cream transition-colors" />
                  <span className="text-sm font-bold text-navy group-hover:text-cream font-outfit">Settings</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Expiration Widget - Full Width */}
        <div className="glass-card p-6 sm:p-10 border-white/40 dark:border-white/10">
           <ExpirationWidget
              personalVaultId={isPersonalVault ? validatedOrgId : undefined}
              organizationId={!isPersonalVault ? validatedOrgId : undefined}
              className="h-full w-full"
              maxItems={5}
            />
        </div>


        {/* Recent Activity Section */}
        <div ref={activityRef} className="glass-card p-6 sm:p-10 border-white/40 dark:border-white/10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-gradient-to-br from-violet-600 to-purple-400 rounded-2xl shadow-xl shadow-purple-500/20">
                <Clock className="w-6 h-6 text-cream" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-readable-light text-shadow-md tracking-tight font-display">Recent Activity</h2>
                <p className="text-readable-muted text-shadow-sm font-semibold font-outfit">Tracking your latest workspace events</p>
              </div>

            </div>
            <a href="/documents" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white/20 transition-all group">
              View History <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {stats.recentActivity.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="group relative flex items-center gap-5 p-5 bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="p-3 bg-blue-500/10 dark:bg-blue-400/10 rounded-xl group-hover:bg-blue-500 transition-colors duration-300">
                    <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                      <span className="text-[10px] sm:text-xs font-medium text-blue-500 dark:text-blue-400 uppercase tracking-widest font-black">
                        Success
                      </span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-white/20 dark:border-white/10 rounded-3xl">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-readable-light text-shadow-md">Secure History Empty</h3>
              <p className="text-readable-muted text-shadow-sm mt-2 max-w-sm mx-auto">Upload your first document to begin tracking activity in your secure vault.</p>
              <button
                onClick={() => router.push('/documents')}
                className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-500/30"
              >
                Start Uploading
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

