'use client';

import { useEffect, useState } from 'react';

type DashboardGlobeProps = {
  orgId?: string;
  vertical?: string;
  isPersonal?: boolean;
  metrics: {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  activityData?: {
    region: string;
    count: number;
    color: string;
  }[];
};

export function DashboardGlobe({ 
  orgId, 
  vertical, 
  isPersonal = false,
  metrics,
  activityData = []
}: DashboardGlobeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default activity data if none provided
  const defaultActivity = activityData.length > 0 ? activityData : [
    { region: 'North America', count: 45, color: 'emerald' },
    { region: 'Europe', count: 23, color: 'blue' },
    { region: 'Asia Pacific', count: 18, color: 'indigo' },
    { region: 'Other', count: 14, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Globe Visualization Area */}
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#3b82f6]/10 via-black/40 to-[#3b82f6]/5 p-8 overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3b82f6] blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#3b82f6] blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Globe SVG Representation */}
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              {/* Globe circle */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Grid lines */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#3b82f6]/30" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#3b82f6]/30" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#3b82f6]/30" />
                
                {/* Latitude lines */}
                <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-[#3b82f6]/30" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" className="text-[#3b82f6]/30" />
                
                {/* Activity points */}
                {mounted && defaultActivity.map((activity, idx) => {
                  const angle = (idx * 90) * (Math.PI / 180);
                  const radius = 60 + (idx % 2) * 15;
                  const x = 100 + Math.cos(angle) * radius;
                  const y = 100 + Math.sin(angle) * radius;
                  
                  return (
                    <g key={idx}>
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={4 + (activity.count / 10)} 
                        fill="#3b82f6"
                        className="animate-pulse"
                        style={{ animationDelay: `${idx * 200}ms` }}
                      />
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={8 + (activity.count / 10)} 
                        fill="#3b82f6"
                        opacity="0.2"
                        className="animate-ping"
                        style={{ animationDelay: `${idx * 200}ms` }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Activity Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {defaultActivity.map((activity, idx) => {
              const colorClasses = [
                'bg-[#3b82f6]',
                'bg-[#3b82f6]', 
                'bg-[#3b82f6]', 
                'bg-[#3b82f6]'
              ];
              const colorClass = colorClasses[idx % colorClasses.length];
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colorClass} animate-pulse`} style={{ animationDelay: `${idx * 200}ms` }}></div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-white">{activity.region}</div>
                    <div className="text-xs text-white/60">{activity.count} active</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:shadow-lg transition-all hover:border-[#3b82f6]/30 group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-xs uppercase tracking-wide text-white/60">
                {metric.label}
              </div>
              {metric.trend && (
                <div className={`text-xs ${
                  metric.trend === 'up' ? 'text-[#3b82f6]' : 
                  metric.trend === 'down' ? 'text-red-500' : 
                  'text-white/60'
                }`}>
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                </div>
              )}
            </div>
            <div className="text-3xl font-bold mb-1 text-white group-hover:text-[#3b82f6] transition-colors">
              {metric.value}
            </div>
            {metric.change && (
              <div className="text-xs text-white/60">
                {metric.change}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Real-time Activity Feed */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Real-time Activity</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse"></div>
            <span className="text-xs text-white/60">Live</span>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { action: 'Document uploaded', location: 'Toronto, CA', time: '2m ago' },
            { action: 'OCR processing', location: 'New York, US', time: '5m ago' },
            { action: 'Share link accessed', location: 'London, UK', time: '8m ago' },
            { action: 'Portal created', location: 'Vancouver, CA', time: '12m ago' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-black/20 hover:bg-black/30 transition">
              <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{activity.action}</div>
                <div className="text-xs text-white/60">{activity.location} • {activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

