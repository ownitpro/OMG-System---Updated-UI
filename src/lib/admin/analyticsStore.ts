// Analytics store for tracking client page views and activity

export type PageView = {
  id: string;
  clientId: string;
  clientName: string;
  page: string;
  pagePath: string;
  timestamp: string;
  sessionId: string;
  duration?: number; // seconds spent on page
};

export type PageStats = {
  page: string;
  pagePath: string;
  views: number;
  uniqueVisitors: number;
  avgDuration: number;
  percentage: number;
};

export type ClientActivity = {
  clientId: string;
  clientName: string;
  lastActive: string;
  totalPageViews: number;
  topPages: { page: string; views: number }[];
  sessionsThisMonth: number;
};

export type DateFilter = "7d" | "30d" | "90d" | "1y" | "all";

const KEY = "omg_analytics";

// Generate mock data for demonstration
function generateMockData(): PageView[] {
  const clients = [
    { id: "client_001", name: "John Doe" },
    { id: "client_002", name: "Jane Smith" },
    { id: "client_003", name: "Bob Johnson" },
    { id: "client_004", name: "Alice Williams" },
    { id: "client_005", name: "Charlie Brown" },
    { id: "client_006", name: "Diana Martinez" },
    { id: "client_007", name: "Edward Chen" },
    { id: "client_008", name: "Fiona O'Brien" },
    { id: "client_009", name: "George Kim" },
    { id: "client_010", name: "Hannah Lee" },
  ];

  const pages = [
    { page: "Dashboard", path: "/portal/client" },
    { page: "OMG-CRM", path: "/portal/client/omg-crm" },
    { page: "SecureVault Docs", path: "/portal/client/securevault-docs" },
    { page: "OMG-Leads", path: "/portal/client/omg-leads" },
    { page: "OMG-IQ", path: "/portal/client/omg-iq" },
    { page: "OMG AI Mastery", path: "/portal/client/omg-ai-mastery" },
    { page: "TimeGuard AI", path: "/portal/client/timeguard-ai" },
    { page: "Automations", path: "/portal/client/automations" },
    { page: "Strategy Session", path: "/portal/client/strategy-session" },
    { page: "Custom Solutions", path: "/portal/client/custom-solutions" },
    { page: "Ads Management", path: "/portal/client/ads-management" },
    { page: "Branding & Creative", path: "/portal/client/branding-creative" },
    { page: "Content Development", path: "/portal/client/content-development" },
    { page: "Real Estate", path: "/portal/client/industry-focused/real-estate" },
    { page: "Property Management", path: "/portal/client/industry-focused/property-management" },
    { page: "Contractors", path: "/portal/client/industry-focused/contractors" },
    { page: "Accounting", path: "/portal/client/industry-focused/accounting" },
  ];

  // Weight pages differently for realistic distribution
  const pageWeights: { [key: string]: number } = {
    Dashboard: 25,
    "OMG-CRM": 18,
    "SecureVault Docs": 15,
    "OMG-Leads": 12,
    "OMG-IQ": 10,
    Automations: 8,
    "Ads Management": 5,
    "OMG AI Mastery": 4,
    "Real Estate": 3,
  };

  const views: PageView[] = [];
  const now = new Date();

  // Generate views for the last 365 days
  for (let daysAgo = 0; daysAgo < 365; daysAgo++) {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    // More views on recent days
    const baseViews = daysAgo < 30 ? 15 : daysAgo < 90 ? 10 : 5;
    const viewCount = Math.floor(baseViews + Math.random() * 10);

    for (let i = 0; i < viewCount; i++) {
      const client = clients[Math.floor(Math.random() * clients.length)];

      // Weighted page selection
      const random = Math.random() * 100;
      let cumulative = 0;
      let selectedPage = pages[0];
      for (const p of pages) {
        cumulative += pageWeights[p.page] || 2;
        if (random <= cumulative) {
          selectedPage = p;
          break;
        }
      }

      const hour = Math.floor(Math.random() * 12) + 8; // 8 AM - 8 PM
      const minute = Math.floor(Math.random() * 60);
      date.setHours(hour, minute, 0, 0);

      views.push({
        id: `pv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        clientId: client.id,
        clientName: client.name,
        page: selectedPage.page,
        pagePath: selectedPage.path,
        timestamp: date.toISOString(),
        sessionId: `sess_${client.id}_${date.toDateString().replace(/\s/g, "")}`,
        duration: Math.floor(30 + Math.random() * 300), // 30s - 5min
      });
    }
  }

  return views.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function readPageViews(): PageView[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    // Initialize with mock data if empty
    const mockData = generateMockData();
    localStorage.setItem(KEY, JSON.stringify(mockData));
    return mockData;
  } catch {
    return [];
  }
}

export function writePageViews(views: PageView[]) {
  localStorage.setItem(KEY, JSON.stringify(views));
  window.dispatchEvent(new Event("omg-analytics-updated"));
}

export function recordPageView(
  clientId: string,
  clientName: string,
  page: string,
  pagePath: string,
  sessionId: string
) {
  const views = readPageViews();
  const newView: PageView = {
    id: `pv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    clientId,
    clientName,
    page,
    pagePath,
    timestamp: new Date().toISOString(),
    sessionId,
  };
  views.unshift(newView);
  writePageViews(views);
  return newView;
}

export function updatePageDuration(viewId: string, duration: number) {
  const views = readPageViews();
  const updated = views.map((v) =>
    v.id === viewId ? { ...v, duration } : v
  );
  writePageViews(updated);
}

function filterByDate(views: PageView[], filter: DateFilter): PageView[] {
  if (filter === "all") return views;

  const now = new Date();
  const cutoff = new Date();

  switch (filter) {
    case "7d":
      cutoff.setDate(now.getDate() - 7);
      break;
    case "30d":
      cutoff.setDate(now.getDate() - 30);
      break;
    case "90d":
      cutoff.setDate(now.getDate() - 90);
      break;
    case "1y":
      cutoff.setFullYear(now.getFullYear() - 1);
      break;
  }

  return views.filter((v) => new Date(v.timestamp) >= cutoff);
}

export function getPageStats(filter: DateFilter = "30d"): PageStats[] {
  const views = filterByDate(readPageViews(), filter);
  const totalViews = views.length;

  // Group by page
  const pageMap: { [key: string]: { views: PageView[]; uniqueClients: Set<string> } } = {};

  for (const view of views) {
    if (!pageMap[view.page]) {
      pageMap[view.page] = { views: [], uniqueClients: new Set() };
    }
    pageMap[view.page].views.push(view);
    pageMap[view.page].uniqueClients.add(view.clientId);
  }

  const stats: PageStats[] = Object.entries(pageMap)
    .map(([page, data]) => {
      const pagePath = data.views[0]?.pagePath || "";
      const avgDuration =
        data.views.reduce((sum, v) => sum + (v.duration || 0), 0) / data.views.length;

      return {
        page,
        pagePath,
        views: data.views.length,
        uniqueVisitors: data.uniqueClients.size,
        avgDuration: Math.round(avgDuration),
        percentage: totalViews > 0 ? Math.round((data.views.length / totalViews) * 100) : 0,
      };
    })
    .sort((a, b) => b.views - a.views);

  return stats;
}

export function getClientActivity(filter: DateFilter = "30d"): ClientActivity[] {
  const views = filterByDate(readPageViews(), filter);

  // Group by client
  const clientMap: {
    [key: string]: {
      name: string;
      views: PageView[];
      sessions: Set<string>;
      pageViews: { [page: string]: number };
    };
  } = {};

  for (const view of views) {
    if (!clientMap[view.clientId]) {
      clientMap[view.clientId] = {
        name: view.clientName,
        views: [],
        sessions: new Set(),
        pageViews: {},
      };
    }
    clientMap[view.clientId].views.push(view);
    clientMap[view.clientId].sessions.add(view.sessionId);
    clientMap[view.clientId].pageViews[view.page] =
      (clientMap[view.clientId].pageViews[view.page] || 0) + 1;
  }

  return Object.entries(clientMap)
    .map(([clientId, data]) => {
      const sortedViews = data.views.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      const topPages = Object.entries(data.pageViews)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      return {
        clientId,
        clientName: data.name,
        lastActive: sortedViews[0]?.timestamp || "",
        totalPageViews: data.views.length,
        topPages,
        sessionsThisMonth: data.sessions.size,
      };
    })
    .sort((a, b) => b.totalPageViews - a.totalPageViews);
}

export function getRecentActivity(limit: number = 20): PageView[] {
  return readPageViews().slice(0, limit);
}

export function getAnalyticsSummary(filter: DateFilter = "30d") {
  const views = filterByDate(readPageViews(), filter);
  const uniqueClients = new Set(views.map((v) => v.clientId));
  const uniqueSessions = new Set(views.map((v) => v.sessionId));
  const avgDuration =
    views.reduce((sum, v) => sum + (v.duration || 0), 0) / (views.length || 1);

  // Calculate views per day for trend
  const now = new Date();
  const daysAgo7 = new Date(now);
  daysAgo7.setDate(now.getDate() - 7);
  const daysAgo14 = new Date(now);
  daysAgo14.setDate(now.getDate() - 14);

  const viewsLast7Days = views.filter((v) => new Date(v.timestamp) >= daysAgo7).length;
  const viewsPrev7Days = views.filter(
    (v) => new Date(v.timestamp) >= daysAgo14 && new Date(v.timestamp) < daysAgo7
  ).length;

  const trend = viewsPrev7Days > 0
    ? Math.round(((viewsLast7Days - viewsPrev7Days) / viewsPrev7Days) * 100)
    : 0;

  return {
    totalViews: views.length,
    uniqueVisitors: uniqueClients.size,
    totalSessions: uniqueSessions.size,
    avgSessionDuration: Math.round(avgDuration),
    viewsLast7Days,
    trend,
  };
}

export function getViewsByDay(filter: DateFilter = "30d"): { date: string; views: number }[] {
  const views = filterByDate(readPageViews(), filter);
  const byDay: { [key: string]: number } = {};

  for (const view of views) {
    const date = view.timestamp.split("T")[0];
    byDay[date] = (byDay[date] || 0) + 1;
  }

  return Object.entries(byDay)
    .map(([date, views]) => ({ date, views }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Reset analytics data (for testing)
export function resetAnalytics() {
  const mockData = generateMockData();
  localStorage.setItem(KEY, JSON.stringify(mockData));
  window.dispatchEvent(new Event("omg-analytics-updated"));
}
