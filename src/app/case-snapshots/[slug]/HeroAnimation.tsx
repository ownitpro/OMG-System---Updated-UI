"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

const ACTIVITY_TEMPLATES: Record<string, string[]> = {
    'Property Management': [
        'Owner statement generated',
        'Maintenance ticket #429 closed',
        'Rent payment processed',
        'Lease renewal sent'
    ],
    'Contractors': [
        'Quote #1024 approved',
        'Material cost updated',
        'Lead score: 95/100',
        'Project timeline optimized'
    ],
    'Real Estate': [
        'Showing booked: 123 Main St',
        'New lead captured via SMS',
        'Open house feedback logged',
        'Offer document generated'
    ],
    'Accounting': [
        'Tax return filed',
        'Client document received',
        'Monthly reconciliation done',
        'Payroll processed'
    ],
    'Cleaning': [
        'Route optimized: Team A',
        'Service rating: 5 stars',
        'Invoice auto-generated',
        'Supply inventory updated'
    ],
    'Healthcare': [
        'Patient intake completed',
        'Insurance verification done',
        'Appointment reminder sent',
        'Lab results processed'
    ]
};

const DEFAULT_ACTIVITIES = [
    'System optimization complete',
    'Data sync successful',
    'Workflow triggered',
    'Report generated'
];

export default function HeroAnimation({ title, industry }: { title: string, industry: string }) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Get relevant activities or fall back to defaults
    const activities = ACTIVITY_TEMPLATES[industry] || DEFAULT_ACTIVITIES;
    const successMessage = activities[0] || 'Optimization Complete';

    return (
        <div className="w-full h-full bg-slate-900 overflow-hidden relative font-sans select-none">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Play/Pause Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <button
                        onClick={() => setIsPlaying(true)}
                        className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/50 transition-all">
                            <PlayIcon className="w-10 h-10 text-white ml-1" />
                        </div>
                        <div className="text-white font-medium text-sm">Watch Content Creation in Action</div>
                        <div className="text-slate-400 text-xs">See how AI generates your content</div>
                    </button>
                </div>
            )}

            {/* Dashboard Container */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-x-8 inset-y-8 bg-slate-800/80 rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col backdrop-blur-sm"
                    >
                        {/* Pause Button */}
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-700/80 border border-white/20 flex items-center justify-center hover:bg-slate-600/80 transition-all"
                        >
                            <PauseIcon className="w-5 h-5 text-white" />
                        </button>

                        {/* Dashboard Header */}
                        <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-slate-800/50">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                            </div>
                            <div className="h-2 w-32 bg-white/10 rounded-full" />
                            <div className="flex-1" />
                            <div className="h-8 w-8 rounded-full bg-blue-500/20" />
                        </div>

                        {/* Dashboard Content */}
                        <div className="flex-1 flex overflow-hidden">
                            {/* Sidebar */}
                            <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-3 bg-slate-900/30 hidden sm:flex">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="h-8 rounded-lg bg-white/5 flex items-center px-2"
                                    >
                                        <div className="w-4 h-4 rounded-sm bg-indigo-500/40 mr-3" />
                                        <div className="h-2 w-20 bg-white/10 rounded-full" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Main Area */}
                            <div className="flex-1 p-6 relative">

                                {/* Header Stats Row */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {[1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 1 + i * 0.1 }}
                                            className="h-24 rounded-xl bg-slate-700/30 border border-white/5 p-4 relative overflow-hidden"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 mb-2" />
                                            <div className="h-2 w-16 bg-white/20 rounded-full mb-1" />
                                            <motion.div
                                                className="h-6 w-12 bg-white/10 rounded-md mt-2"
                                                animate={{ width: ["0%", "60%", "40%", "80%"] }}
                                                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Main Chart Area */}
                                <div className="flex gap-6 h-64">
                                    {/* Bar Chart */}
                                    <div className="flex-1 bg-slate-700/20 rounded-xl border border-white/5 p-6 flex items-end gap-2 sm:gap-4 justify-between relative overflow-hidden">
                                        {/* Chart Grid Lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-20">
                                            <div className="w-full h-px bg-white" />
                                            <div className="w-full h-px bg-white" />
                                            <div className="w-full h-px bg-white" />
                                            <div className="w-full h-px bg-white" />
                                        </div>

                                        {/* Bars */}
                                        {[40, 70, 50, 90, 65, 85, 45].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm opacity-80"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: 1.5 + i * 0.1,
                                                    ease: "backOut",
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    repeatDelay: 2
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Side Panel / Activity Stream */}
                                    <div className="w-64 bg-slate-700/20 rounded-xl border border-white/5 p-4 hidden md:flex flex-col gap-3">
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Live Activity</div>
                                        {activities.slice(0, 4).map((activity, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 2 + i * 0.2 }}
                                                className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                <div className="flex-1">
                                                    <div className="text-[10px] text-slate-300 truncate">{activity}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Popups / Notifications */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    transition={{ delay: 3, type: "spring" }}
                                    className="absolute top-1/4 right-1/4 bg-white text-slate-900 p-4 rounded-xl shadow-xl z-20 flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">✓</div>
                                    <div>
                                        <div className="font-bold text-sm">Success</div>
                                        <div className="text-xs text-slate-500">{successMessage}</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0, opacity: 0, x: -20 }}
                                    animate={{ scale: 1, opacity: 1, x: 0 }}
                                    transition={{ delay: 3.5, type: "spring" }}
                                    className="absolute bottom-1/3 left-1/3 bg-blue-600 text-white p-3 rounded-xl shadow-xl z-20 flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    <div className="font-bold text-sm">Processing...</div>
                                </motion.div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
