"use client";

import { useState } from 'react';
import Link from 'next/link';
import { XMarkIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

type TeamSize = 'small' | 'medium' | 'large' | 'enterprise' | null;
type TeamGoal = 'automation' | 'content' | 'efficiency' | 'customer-support' | null;
type Industry = 'agency' | 'ecommerce' | 'saas' | 'services' | 'other' | null;
type Timeline = 'immediately' | 'next-30-days' | 'planning-phase' | null;

export default function TeamEnrollmentPage() {
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
        let recommendation = 'team';
        if (teamSize === 'enterprise' || timeline === 'planning-phase') {
            recommendation = 'custom';
        }

        localStorage.setItem('teamEnrollmentQuizResults', JSON.stringify({
            teamSize,
            teamGoal,
            industry,
            timeline,
            recommendation,
            completedAt: new Date().toISOString()
        }));

        if (recommendation === 'custom') {
            window.location.href = '/contact-sales?source=team-quiz';
        } else {
            window.location.href = 'https://buy.stripe.com/team-bootcamp-link';
        }
    };

    const canProceed = () => {
        if (step === 1) return teamSize !== null;
        if (step === 2) return teamGoal !== null;
        if (step === 3) return industry !== null;
        if (step === 4) return timeline !== null;
        return false;
    };

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-40 pb-20">
            {/* Background effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative w-full max-w-4xl">
                {/* Close Button */}
                <Link
                    href="/app/login"
                    className="absolute -top-4 right-0 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                >
                    <XMarkIcon className="w-6 h-6 text-white" />
                </Link>

                {/* Progress Bar */}
                <div className="bg-slate-900/50 backdrop-blur-xl rounded-t-3xl border-x border-t border-emerald-500/30 pt-10 px-10 pb-8">
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

                {/* Content */}
                <div className="bg-slate-900/50 backdrop-blur-xl rounded-b-3xl border border-emerald-500/30 p-12 shadow-2xl shadow-emerald-500/10">

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="space-y-10">
                            <div className="text-center">
                                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                                    How many team members?
                                </h1>
                                <p className="text-xl text-white/60">
                                    Select the size of the team you want to transform with AI
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { id: 'small', label: 'Small Team', desc: '1-5 members' },
                                    { id: 'medium', label: 'Growing Team', desc: '6-15 members' },
                                    { id: 'large', label: 'Large Department', desc: '16-50 members' },
                                    { id: 'enterprise', label: 'Enterprise', desc: '50+ members' },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setTeamSize(option.id as TeamSize)}
                                        className={`p-8 rounded-2xl border-2 text-left transition-all ${teamSize === option.id
                                            ? 'bg-emerald-500/20 border-emerald-500 shadow-xl shadow-emerald-500/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-2xl font-bold text-white">{option.label}</h3>
                                            {teamSize === option.id && (
                                                <CheckCircleIcon className="w-7 h-7 text-emerald-400 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-white/60 text-lg">{option.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-10">
                            <div className="text-center">
                                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                                    What's the primary objective?
                                </h1>
                                <p className="text-xl text-white/60">
                                    Choose the area where AI will have the biggest impact
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { id: 'automation', label: 'Automate Workflows', desc: 'Reduce manual tasks and bottlenecks' },
                                    { id: 'content', label: 'Scalable Content', desc: 'Marketing, social, and assets' },
                                    { id: 'efficiency', label: 'Team Efficiency', desc: 'Faster project delivery and communication' },
                                    { id: 'customer-support', label: 'Customer Experience', desc: 'AI-driven support and interaction' },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setTeamGoal(option.id as TeamGoal)}
                                        className={`p-8 rounded-2xl border-2 text-left transition-all ${teamGoal === option.id
                                            ? 'bg-emerald-500/20 border-emerald-500 shadow-xl shadow-emerald-500/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-2xl font-bold text-white">{option.label}</h3>
                                            {teamGoal === option.id && (
                                                <CheckCircleIcon className="w-7 h-7 text-emerald-400 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-white/60 text-lg">{option.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="space-y-10">
                            <div className="text-center">
                                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                                    What's your industry?
                                </h1>
                                <p className="text-xl text-white/60">
                                    We'll tailor the examples to your field
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { id: 'agency', label: 'Marketing Agency' },
                                    { id: 'ecommerce', label: 'E-commerce' },
                                    { id: 'saas', label: 'Software/SaaS' },
                                    { id: 'services', label: 'Professional Services' },
                                    { id: 'other', label: 'Other' },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setIndustry(option.id as Industry)}
                                        className={`p-8 rounded-2xl border-2 text-left transition-all ${industry === option.id
                                            ? 'bg-emerald-500/20 border-emerald-500 shadow-xl shadow-emerald-500/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-2xl font-bold text-white">{option.label}</h3>
                                            {industry === option.id && (
                                                <CheckCircleIcon className="w-7 h-7 text-emerald-400 flex-shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4 */}
                    {step === 4 && (
                        <div className="space-y-10">
                            <div className="text-center">
                                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                                    Implementation timeline?
                                </h1>
                                <p className="text-xl text-white/60">
                                    How fast do you need to see results?
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { id: 'immediately', label: 'ASAP / Immediately', desc: 'Ready to start the 2-week transformation', badge: '$2,997' },
                                    { id: 'next-30-days', label: 'Within the next 30 days', desc: 'Planning for next month', badge: '$2,997' },
                                    { id: 'planning-phase', label: 'Currently researching', desc: 'Need more info and custom consult', badge: 'Consult' },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setTimeline(option.id as Timeline)}
                                        className={`w-full p-8 rounded-2xl border-2 text-left transition-all ${timeline === option.id
                                            ? 'bg-emerald-500/20 border-emerald-500 shadow-xl shadow-emerald-500/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <h3 className="text-2xl font-bold text-white">{option.label}</h3>
                                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${option.badge === 'Consult' ? 'bg-purple-500/20 text-purple-400' :
                                                        'bg-emerald-500/20 text-emerald-400'
                                                        }`}>
                                                        {option.badge}
                                                    </span>
                                                </div>
                                                <p className="text-white/60 text-lg">{option.desc}</p>
                                            </div>
                                            {timeline === option.id && (
                                                <CheckCircleIcon className="w-7 h-7 text-emerald-400 flex-shrink-0 ml-4" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-16 pt-10 border-t border-white/10">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white font-semibold"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                            <span>Back</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold hover:from-emerald-600 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/30 text-lg"
                        >
                            <span>{step === totalSteps ? 'Complete & Book' : 'Next'}</span>
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
