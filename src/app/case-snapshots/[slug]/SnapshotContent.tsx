"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ArrowTrendingUpIcon,
    BoltIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
import type { SnapshotItem } from '../snapshots';
import HeroAnimation from './HeroAnimation';

export default function SnapshotContent({ snap }: { snap: SnapshotItem }) {
    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <main className="min-h-screen bg-slate-950 relative overflow-hidden font-sans">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0f1e] to-slate-950" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 pt-32">
                {/* Back Button Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <Link
                        href="/case-snapshots"
                        className="group inline-flex items-center text-sm font-bold text-slate-300 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:border-emerald-500/30"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform text-emerald-400" />
                        Back to Snapshots
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">

                        {/* Left Column: Main Content */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-12"
                        >

                            {/* Header Group */}
                            <motion.header variants={itemVariants} className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    {snap.industry}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                                    <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                                        {snap.title}
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                                    {snap.subtitle}
                                </p>
                            </motion.header>

                            <motion.div
                                variants={itemVariants}
                                className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 aspect-video relative group bg-slate-900"
                            >
                                <HeroAnimation title={snap.title} industry={snap.industry} />
                            </motion.div>

                            {/* Challenge Section */}
                            <motion.section
                                variants={itemVariants}
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                <div className="relative rounded-2xl bg-slate-900/50 border border-white/10 p-8 backdrop-blur-sm">
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                            <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
                                            <p className="text-lg text-slate-300 leading-relaxed">
                                                {snap.challenge}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Solution Section */}
                            <motion.section variants={itemVariants} className="relative">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">How We Solved It</span>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {snap.solution.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            whileHover={{ y: -4, backgroundColor: "rgba(6, 78, 59, 0.2)" }}
                                            className="group p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 transition-all"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 flex-shrink-0">
                                                    <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                                                </div>
                                                <p className="text-slate-200 font-medium leading-relaxed">
                                                    {item}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Content Footer / CTA */}
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-10">
                                    <BoltIcon className="w-64 h-64 -rotate-12" />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <h3 className="text-3xl font-black">Ready to scale like this?</h3>
                                    <p className="text-lg text-blue-100 max-w-xl mx-auto">
                                        Join hundreds of businesses automating their growth with OMGsystems.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                        <Link
                                            href="/signup"
                                            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                                        >
                                            Start Free Trial
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="px-8 py-4 bg-blue-700/50 border border-blue-400/30 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                        >
                                            Book Demo
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>

                        {/* Right Column: Sticky Sidebar - Animated Entrance */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="lg:sticky lg:top-24 space-y-8"
                        >

                            {/* Key Metric Card */}
                            <motion.div
                                whileHover={{ scale: 1.02, rotate: 1 }}
                                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-8 shadow-2xl cursor-default"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16" />

                                <div className="relative z-10">
                                    <div className="text-emerald-400 font-bold tracking-wider text-sm mb-2 uppercase">Key Achievement</div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-6xl font-black text-white tracking-tighter">
                                            {snap.metricValue}
                                        </span>
                                    </div>
                                    <div className="text-slate-400 font-medium border-t border-white/10 pt-4 mt-4">
                                        {snap.metricLabel}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Results List */}
                            <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-8 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <ArrowTrendingUpIcon className="w-6 h-6 text-blue-400" />
                                    <h3 className="text-xl font-bold text-white">Impact Analysis</h3>
                                </div>
                                <ul className="space-y-6">
                                    {snap.results.map((result, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + (idx * 0.1) }}
                                            className="flex gap-4"
                                        >
                                            <div className="flex-col items-center gap-1 hidden sm:flex">
                                                <div className="w-px h-full bg-slate-800" />
                                            </div>
                                            <div>
                                                <p className="text-slate-300 leading-relaxed font-medium">
                                                    {result}
                                                </p>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies Used */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="rounded-3xl bg-slate-900/30 border border-white/5 p-6"
                            >
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Powered By</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['AI Automation', 'Smart Workflows', 'Real-time Analytics', 'Cloud Sync'].map((tag) => (
                                        <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/5 text-xs font-medium text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
