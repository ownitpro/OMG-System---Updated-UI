"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CalculatorIcon,
  CheckCircleIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

function AnimatedNumber({ value, prefix = "", suffix = "", className = "" }: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 500;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  icon: Icon,
  suffix = "",
  prefix = "",
  helpText
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  suffix?: string;
  prefix?: string;
  helpText?: string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm font-medium text-white/80">
          <Icon className="w-5 h-5 mr-2 text-emerald-400" />
          {label}
        </label>
        <div className="px-3 py-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
          <span className="text-lg font-bold text-emerald-400">
            {prefix}{value.toLocaleString()}{suffix}
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg shadow-emerald-500/50 border-2 border-emerald-400 pointer-events-none transition-all duration-300"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-white/40">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
      {helpText && (
        <p className="text-xs text-white/50 italic">{helpText}</p>
      )}
    </div>
  );
}

export default function ROICalculatorPage() {
  const [employees, setEmployees] = useState(10);
  const [avgHourlyRate, setAvgHourlyRate] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [manualTaskCost, setManualTaskCost] = useState(200);

  // Calculations
  const weeklyTimeSavings = hoursPerWeek * employees;
  const weeklyCostSavings = weeklyTimeSavings * avgHourlyRate;
  const monthlyCostSavings = weeklyCostSavings * 4;
  const yearlyCostSavings = monthlyCostSavings * 12;

  const monthlyManualCosts = manualTaskCost * employees * 4;
  const yearlyManualCosts = monthlyManualCosts * 12;

  const totalMonthlySavings = monthlyCostSavings + monthlyManualCosts;
  const totalYearlySavings = yearlyCostSavings + yearlyManualCosts;

  // OMG System pricing tiers
  const monthlyOMGCost = employees <= 5 ? 49 : employees <= 20 ? 99 : employees <= 50 ? 199 : 299;
  const yearlyOMGCost = monthlyOMGCost * 12;

  const netMonthlySavings = totalMonthlySavings - monthlyOMGCost;
  const netYearlySavings = totalYearlySavings - yearlyOMGCost;
  const roi = Math.max(0, Math.round((netYearlySavings / yearlyOMGCost) * 100));

  const monthlyTimeSaved = weeklyTimeSavings * 4;
  const yearlyTimeSaved = weeklyTimeSavings * 52;

  // Determine ROI level for visual feedback
  const roiLevel = roi >= 500 ? "exceptional" : roi >= 200 ? "excellent" : roi >= 100 ? "great" : roi >= 50 ? "good" : "building";
  const roiColors = {
    exceptional: "from-emerald-400 via-teal-400 to-cyan-400",
    excellent: "from-emerald-400 to-teal-500",
    great: "from-teal-400 to-cyan-500",
    good: "from-cyan-400 to-blue-500",
    building: "from-blue-400 to-indigo-500"
  };

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/case-snapshots"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Case Snapshots
          </Link>

          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <CalculatorIcon className="w-4 h-4" />
              Free ROI Calculator
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Calculate Your{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                ROI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Discover how much time and money your business can save with OMGsystems intelligent automation
            </p>
          </div>

          {/* Main Calculator Grid */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Input Section - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-24">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Your Business</h2>
                    <p className="text-sm text-white/50">Adjust the values below</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <Slider
                    value={employees}
                    onChange={setEmployees}
                    min={1}
                    max={100}
                    label="Team Size"
                    icon={UserGroupIcon}
                    suffix=" employees"
                  />

                  <Slider
                    value={avgHourlyRate}
                    onChange={setAvgHourlyRate}
                    min={15}
                    max={150}
                    step={5}
                    label="Average Hourly Rate"
                    icon={CurrencyDollarIcon}
                    prefix="$"
                    suffix="/hr"
                  />

                  <Slider
                    value={hoursPerWeek}
                    onChange={setHoursPerWeek}
                    min={1}
                    max={20}
                    step={0.5}
                    label="Manual Task Hours"
                    icon={ClockIcon}
                    suffix=" hrs/week"
                    helpText="Per employee, spent on repetitive tasks"
                  />

                  <Slider
                    value={manualTaskCost}
                    onChange={setManualTaskCost}
                    min={0}
                    max={500}
                    step={10}
                    label="Manual Process Costs"
                    icon={BanknotesIcon}
                    prefix="$"
                    suffix="/week"
                    helpText="Paper, printing, storage, errors, delays, etc."
                  />
                </div>

                {/* Quick Presets */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-white/40 mb-3">Quick presets:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Small Team", e: 5, h: 50, w: 3, m: 100 },
                      { label: "Growing Biz", e: 20, h: 55, w: 5, m: 200 },
                      { label: "Enterprise", e: 50, h: 65, w: 8, m: 350 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setEmployees(preset.e);
                          setAvgHourlyRate(preset.h);
                          setHoursPerWeek(preset.w);
                          setManualTaskCost(preset.m);
                        }}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-emerald-500/30 transition-all"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Main ROI Card */}
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${roiColors[roiLevel]} p-[1px]`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-[calc(1.5rem-1px)] p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-medium text-white/60">First Year ROI</span>
                      </div>
                      <div className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${roiColors[roiLevel]} bg-clip-text text-transparent`}>
                        <AnimatedNumber value={roi} suffix="%" />
                      </div>
                      <p className="mt-2 text-white/50 text-sm">
                        {roiLevel === "exceptional" && "Exceptional returns - you're leaving money on the table!"}
                        {roiLevel === "excellent" && "Excellent returns on your automation investment"}
                        {roiLevel === "great" && "Great ROI - automation will pay for itself quickly"}
                        {roiLevel === "good" && "Good starting point - ROI improves with scale"}
                        {roiLevel === "building" && "Building momentum - consider increasing automation scope"}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 relative">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-white/10"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${Math.min(roi / 5, 100) * 3.52} 352`}
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ChartBarIcon className="w-10 h-10 text-emerald-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Time Saved */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                    <ClockIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-sm text-white/50 mb-1">Monthly Time Saved</p>
                  <p className="text-3xl font-bold text-white">
                    <AnimatedNumber value={monthlyTimeSaved} suffix=" hrs" />
                  </p>
                  <p className="text-xs text-emerald-400 mt-2">
                    {yearlyTimeSaved.toLocaleString()} hours/year
                  </p>
                </div>

                {/* Cost Savings */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-teal-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
                    <BanknotesIcon className="w-5 h-5 text-teal-400" />
                  </div>
                  <p className="text-sm text-white/50 mb-1">Monthly Savings</p>
                  <p className="text-3xl font-bold text-white">
                    $<AnimatedNumber value={totalMonthlySavings} />
                  </p>
                  <p className="text-xs text-teal-400 mt-2">
                    ${totalYearlySavings.toLocaleString()}/year
                  </p>
                </div>

                {/* Net Benefit */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                    <CurrencyDollarIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-sm text-white/50 mb-1">Net Monthly Benefit</p>
                  <p className={`text-3xl font-bold ${netMonthlySavings >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {netMonthlySavings >= 0 ? '+' : ''}$<AnimatedNumber value={Math.abs(netMonthlySavings)} />
                  </p>
                  <p className="text-xs text-cyan-400 mt-2">
                    After ${monthlyOMGCost}/mo subscription
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                <div className="px-8 py-6 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CalculatorIcon className="w-5 h-5 text-emerald-400" />
                    Detailed Breakdown
                  </h3>
                </div>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Monthly */}
                    <div>
                      <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Monthly</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Labor cost savings</span>
                          <span className="text-lg font-semibold text-emerald-400">+${monthlyCostSavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Process cost savings</span>
                          <span className="text-lg font-semibold text-emerald-400">+${monthlyManualCosts.toLocaleString()}</span>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Total gross savings</span>
                          <span className="text-lg font-semibold text-white">${totalMonthlySavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">OMG System cost</span>
                          <span className="text-lg font-semibold text-white/50">-${monthlyOMGCost}</span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Net monthly savings</span>
                          <span className={`text-2xl font-bold ${netMonthlySavings >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            ${netMonthlySavings.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Yearly */}
                    <div>
                      <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">First Year</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Labor cost savings</span>
                          <span className="text-lg font-semibold text-emerald-400">+${yearlyCostSavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Process cost savings</span>
                          <span className="text-lg font-semibold text-emerald-400">+${yearlyManualCosts.toLocaleString()}</span>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Total gross savings</span>
                          <span className="text-lg font-semibold text-white">${totalYearlySavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">OMG System cost</span>
                          <span className="text-lg font-semibold text-white/50">-${yearlyOMGCost.toLocaleString()}</span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Net annual benefit</span>
                          <span className={`text-2xl font-bold ${netYearlySavings >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            ${netYearlySavings.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What You Get */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <RocketLaunchIcon className="w-5 h-5 text-emerald-400" />
                  What&apos;s Included in OMGsystems
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Intelligent workflow automation",
                    "Document management & e-signatures",
                    "CRM & lead management",
                    "AI-powered content creation",
                    "Industry-specific templates",
                    "Dedicated support team",
                    "Unlimited integrations",
                    "Real-time analytics dashboard"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="relative px-8 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses saving time and money with OMGsystems automation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg shadow-black/20"
                  >
                    <RocketLaunchIcon className="w-5 h-5" />
                    Start Free Trial
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                  >
                    Talk to an Expert
                  </Link>
                </div>
                <p className="mt-6 text-sm text-white/60">
                  No credit card required &bull; 14-day free trial &bull; Cancel anytime
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/30 max-w-3xl mx-auto">
              * This calculator provides estimates based on the information you provide. Actual results may vary.
              ROI calculations are for illustrative purposes only and do not constitute a guarantee of specific savings.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
