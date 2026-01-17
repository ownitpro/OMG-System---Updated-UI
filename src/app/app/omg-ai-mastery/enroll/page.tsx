"use client";

import { useState } from 'react';
import Link from 'next/link';
import { XMarkIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

type UserType = 'individual' | 'business' | 'team-leader' | 'enterprise' | null;
type Challenge = 'getting-started' | 'too-many-tools' | 'train-team' | 'custom-solution' | null;
type Timeline = 'start-now' | 'team-training' | 'custom' | null;
type Goal = 'learn-skills' | 'implement-business' | 'both' | null;

export default function EnrollmentPage() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);
  const [challenge, setChallenge] = useState<Challenge>(null);
  const [timeline, setTimeline] = useState<Timeline>(null);
  const [goal, setGoal] = useState<Goal>(null);

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
    let recommendation = 'individual';

    if (userType === 'team-leader' || userType === 'business' || challenge === 'train-team') {
      recommendation = 'team';
    }

    if (challenge === 'custom-solution' || userType === 'enterprise') {
      recommendation = 'custom';
    }

    localStorage.setItem('enrollmentQuizResults', JSON.stringify({
      userType,
      challenge,
      timeline,
      goal,
      recommendation,
      completedAt: new Date().toISOString()
    }));

    if (recommendation === 'team') {
      window.location.href = 'https://buy.stripe.com/team-bootcamp-link';
    } else if (recommendation === 'custom') {
      window.location.href = '/contact-sales?source=ai-mastery-quiz';
    } else {
      window.location.href = 'https://buy.stripe.com/individual-course-link';
    }
  };

  const canProceed = () => {
    if (step === 1) return userType !== null;
    if (step === 2) return challenge !== null;
    if (step === 3) return timeline !== null;
    if (step === 4) return goal !== null;
    return false;
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-40 pb-20">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-t-3xl border-x border-t border-blue-500/30 pt-10 px-10 pb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/60 font-medium">Step {step} of {totalSteps}</span>
            <span className="text-sm text-blue-400 font-semibold">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-b-3xl border border-blue-500/30 p-12 shadow-2xl shadow-blue-500/10">

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-10">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  I'm enrolling as:
                </h1>
                <p className="text-xl text-white/60">
                  Help us personalize your learning experience
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { id: 'individual', label: 'Individual Professional', desc: 'Learning for myself' },
                  { id: 'business', label: 'Business Owner', desc: 'Implementing in my company' },
                  { id: 'team-leader', label: 'Team Leader', desc: 'Training my team' },
                  { id: 'enterprise', label: 'Enterprise Decision-Maker', desc: 'Large-scale implementation' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setUserType(option.id as UserType)}
                    className={`p-8 rounded-2xl border-2 text-left transition-all ${userType === option.id
                        ? 'bg-blue-500/20 border-blue-500 shadow-xl shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-white">{option.label}</h3>
                      {userType === option.id && (
                        <CheckCircleIcon className="w-7 h-7 text-blue-400 flex-shrink-0" />
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
                  My biggest challenge with AI is:
                </h1>
                <p className="text-xl text-white/60">
                  What's holding you back right now?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { id: 'getting-started', label: "Don't know where to start", desc: 'Need foundational guidance' },
                  { id: 'too-many-tools', label: 'Too many tools, need focus', desc: 'Overwhelmed by options' },
                  { id: 'train-team', label: 'Need to train my team', desc: 'Team adoption is key' },
                  { id: 'custom-solution', label: 'Want custom solutions', desc: 'Need tailored approach' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setChallenge(option.id as Challenge)}
                    className={`p-8 rounded-2xl border-2 text-left transition-all ${challenge === option.id
                        ? 'bg-blue-500/20 border-blue-500 shadow-xl shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-white">{option.label}</h3>
                      {challenge === option.id && (
                        <CheckCircleIcon className="w-7 h-7 text-blue-400 flex-shrink-0" />
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
                  My timeline to implement:
                </h1>
                <p className="text-xl text-white/60">
                  When do you want to get started?
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { id: 'start-now', label: 'Start learning now', desc: 'Individual course - Begin immediately', badge: '$297' },
                  { id: 'team-training', label: 'Need team training', desc: 'Team bootcamp - 2-week program', badge: '$2,997' },
                  { id: 'custom', label: 'Custom solution needed', desc: 'Talk to our team about your needs', badge: 'Custom' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTimeline(option.id as Timeline)}
                    className={`w-full p-8 rounded-2xl border-2 text-left transition-all ${timeline === option.id
                        ? 'bg-blue-500/20 border-blue-500 shadow-xl shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-2xl font-bold text-white">{option.label}</h3>
                          <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${option.badge === 'Custom' ? 'bg-purple-500/20 text-purple-400' :
                              option.badge === '$297' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-emerald-500/20 text-emerald-400'
                            }`}>
                            {option.badge}
                          </span>
                        </div>
                        <p className="text-white/60 text-lg">{option.desc}</p>
                      </div>
                      {timeline === option.id && (
                        <CheckCircleIcon className="w-7 h-7 text-blue-400 flex-shrink-0 ml-4" />
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
                  What's your primary goal?
                </h1>
                <p className="text-xl text-white/60">
                  What do you want to achieve with AI?
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { id: 'learn-skills', label: 'Learn AI skills', desc: 'Master AI tools and techniques' },
                  { id: 'implement-business', label: 'Implement in my business', desc: 'Drive real business results' },
                  { id: 'both', label: 'Both learning and implementation', desc: 'Comprehensive transformation' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setGoal(option.id as Goal)}
                    className={`w-full p-8 rounded-2xl border-2 text-left transition-all ${goal === option.id
                        ? 'bg-blue-500/20 border-blue-500 shadow-xl shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{option.label}</h3>
                        <p className="text-white/60 text-lg">{option.desc}</p>
                      </div>
                      {goal === option.id && (
                        <CheckCircleIcon className="w-7 h-7 text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Show Recommendation */}
              {goal && (
                <div className="mt-10 p-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30">
                  <h3 className="text-2xl font-bold text-white mb-4">Your Recommended Path:</h3>
                  {(userType === 'individual' || timeline === 'start-now') && (
                    <div>
                      <p className="text-blue-400 font-bold text-3xl mb-3">3-Day Personal Course - $297</p>
                      <p className="text-white/70 text-lg">Perfect for individual professionals looking to master AI skills at their own pace.</p>
                    </div>
                  )}
                  {(userType === 'team-leader' || timeline === 'team-training' || challenge === 'train-team') && (
                    <div>
                      <p className="text-emerald-400 font-bold text-3xl mb-3">2-Week Team Bootcamp - $2,997</p>
                      <p className="text-white/70 text-lg">Comprehensive team training with live sessions, custom workflows, and implementation support.</p>
                    </div>
                  )}
                  {(userType === 'enterprise' || challenge === 'custom-solution' || timeline === 'custom') && (
                    <div>
                      <p className="text-purple-400 font-bold text-3xl mb-3">Custom Enterprise Solution</p>
                      <p className="text-white/70 text-lg">Let's discuss a tailored AI implementation for your organization.</p>
                    </div>
                  )}
                </div>
              )}
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
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold hover:from-blue-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 text-lg"
            >
              <span>{step === totalSteps ? 'Complete & Enroll' : 'Next'}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
