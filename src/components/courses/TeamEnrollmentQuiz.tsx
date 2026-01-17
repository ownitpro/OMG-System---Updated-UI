"use client";

import React, { useState } from 'react';
import { XMarkIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface TeamEnrollmentQuizProps {
    isOpen: boolean;
    onClose: () => void;
}

type TeamSize = 'small' | 'medium' | 'large' | 'enterprise' | null;
type TeamGoal = 'automation' | 'content' | 'efficiency' | 'customer-support' | null;
type Industry = 'agency' | 'ecommerce' | 'saas' | 'services' | 'other' | null;
type Timeline = 'immediately' | 'next-30-days' | 'planning-phase' | null;

export default function TeamEnrollmentQuiz({ isOpen, onClose }: TeamEnrollmentQuizProps) {
    const [step, setStep] = useState(1);
    const [teamSize, setTeamSize] = useState<TeamSize>(null);
    const [teamGoal, setTeamGoal] = useState<TeamGoal>(null);
    const [industry, setIndustry] = useState<Industry>(null);
    const [timeline, setTimeline] = useState<Timeline>(null);

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleComplete = () => {
        // Determine recommendation - for teams it's usually the Team Bootcamp
        let recommendation = 'team';

        if (teamSize === 'enterprise' || timeline === 'planning-phase') {
            recommendation = 'custom';
        }

        // Store results
        localStorage.setItem('teamEnrollmentQuizResults', JSON.stringify({
            teamSize,
            teamGoal,
            industry,
            timeline,
            recommendation,
            completedAt: new Date().toISOString()
        }));

        // Redirect
        if (recommendation === 'custom') {
            window.location.href = '/contact-sales?source=team-quiz';
        } else {
            // Redirect to Team Bootcamp Stripe checkout
            window.location.href = 'https://buy.stripe.com/team-bootcamp-link'; // Replace with actual Stripe link
        }
    };

    const canProceed = () => {
        if (step === 1) return teamSize !== null;
        if (step === 2) return teamGoal !== null;
        if (step === 3) return industry !== null;
        if (step === 4) return timeline !== null;
        return false;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 max-h-[90vh] overflow-y-auto">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                >
                    <XMarkIcon className="w-6 h-6 text-white" />
                </button>

                <div className="sticky top-0 bg-slate-900 pt-6 px-6 pb-4 border-b border-white/10 z-10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-white/60 font-medium">Step {step} of {totalSteps}</span>
                        <span className="text-sm text-emerald-400 font-semibold">{Math.round((step / totalSteps) * 100)}% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500 ease-out"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    {/* Step 1: Team Size */}
                    {step === 1 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                    How many team members?
                                </h2>
                                <p className="text-lg text-white/60">
                                    Select the size of the team you want to transform with AI
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { id: 'small', label: 'Small Team', desc: '1-5 members' },
                                    { id: 'medium', label: 'Growing Team', desc: '6-15 members' },
                                    { id: 'large', label: 'Large Department', desc: '16-50 members' },
                                    { id: 'enterprise', label: 'Enterprise', desc: '50+ members' },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setTeamSize(option.id as TeamSize)}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all ${teamSize === option.id
                                                ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/30'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">{option.label}</h3>
                                            {teamSize === option.id && (
                                                <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-white/60">{option.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Team Goal */}
                    {step === 2 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                    What's the primary objective?
                                </h2>
                                <p className="text-lg text-white/60">
                                    Choose the area where AI will have the biggest impact
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { id: 'automation', label: 'Automate Workflows', desc: 'Reduce manual tasks and bottlenecks' },
                                    { id: 'content', label: 'Scalable Content', desc: 'Marketing, social, and assets' },
                                    { id: 'efficiency', label: 'Team Efficiency', desc: 'Faster project delivery and communication' },
                                    { id: 'customer-support', label: 'Customer Experience', desc: 'AI-driven support and interaction' },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setTeamGoal(option.id as TeamGoal)}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all ${teamGoal === option.id
                                                ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/30'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">{option.label}</h3>
                                            {teamGoal === option.id && (
                                                <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-white/60">{option.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Industry */}
                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                    What's your industry?
                                </h2>
                                <p className="text-lg text-white/60">
                                    We'll tailor the examples to your field
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { id: 'agency', label: 'Marketing/Creative Agency' },
                                    { id: 'ecommerce', label: 'E-commerce / Retail' },
                                    { id: 'saas', label: 'Software / SaaS' },
                                    { id: 'services', label: 'Professional Services' },
                                    { id: 'other', label: 'Other' },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setIndustry(option.id as Industry)}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all ${industry === option.id
                                                ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/30'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">{option.label}</h3>
                                            {industry === option.id && (
                                                <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Timeline */}
                    {step === 4 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                    Desired implementation timeline?
                                </h2>
                                <p className="text-lg text-white/60">
                                    How fast do you need to see results?
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { id: 'immediately', label: 'ASAP / Immediately', desc: 'Ready to start the 2-week transformation' },
                                    { id: 'next-30-days', label: 'Within the next 30 days', desc: 'Planning for next month' },
                                    { id: 'planning-phase', label: 'Currently researching', desc: 'Need more info and custom consult' },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setTimeline(option.id as Timeline)}
                                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${timeline === option.id
                                                ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/30'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">{option.label}</h3>
                                                <p className="text-white/60">{option.desc}</p>
                                            </div>
                                            {timeline === option.id && (
                                                <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ArrowLeftIcon className="w-5 h-5 text-white" />
                            <span className="text-white font-semibold">Back</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold hover:from-emerald-600 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/30 disabled:shadow-none"
                        >
                            <span>{step === totalSteps ? 'Complete & Book' : 'Next'}</span>
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
