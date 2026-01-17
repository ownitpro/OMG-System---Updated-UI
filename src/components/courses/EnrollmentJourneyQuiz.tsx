"use client";

import React, { useState } from 'react';
import { XMarkIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface EnrollmentJourneyQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserType = 'individual' | 'business' | 'team-leader' | 'enterprise' | null;
type Challenge = 'getting-started' | 'too-many-tools' | 'train-team' | 'custom-solution' | null;
type Timeline = 'start-now' | 'team-training' | 'custom' | null;
type Goal = 'learn-skills' | 'implement-business' | 'both' | null;

export default function EnrollmentJourneyQuiz({ isOpen, onClose }: EnrollmentJourneyQuizProps) {
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
      // Final step - redirect based on answers
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Determine which course to recommend
    let recommendation = 'individual'; // Default

    if (userType === 'team-leader' || userType === 'business' || challenge === 'train-team') {
      recommendation = 'team';
    }

    if (challenge === 'custom-solution' || userType === 'enterprise') {
      recommendation = 'custom';
    }

    // Store quiz results in localStorage for analytics
    localStorage.setItem('enrollmentQuizResults', JSON.stringify({
      userType,
      challenge,
      timeline,
      goal,
      recommendation,
      completedAt: new Date().toISOString()
    }));

    // Redirect based on recommendation
    if (recommendation === 'team') {
      // Redirect to Team Bootcamp Stripe checkout
      window.location.href = 'https://buy.stripe.com/team-bootcamp-link'; // Replace with actual Stripe link
    } else if (recommendation === 'custom') {
      // Redirect to contact/sales for custom solution
      window.location.href = '/contact-sales?source=ai-mastery-quiz';
    } else {
      // Redirect to Individual Course Stripe checkout
      window.location.href = 'https://buy.stripe.com/individual-course-link'; // Replace with actual Stripe link
    }
  };

  const canProceed = () => {
    if (step === 1) return userType !== null;
    if (step === 2) return challenge !== null;
    if (step === 3) return timeline !== null;
    if (step === 4) return goal !== null;
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>

        {/* Progress Bar */}
        <div className="sticky top-0 bg-slate-900 pt-6 px-6 pb-4 border-b border-white/10 z-10">
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
        <div className="p-8 md:p-12">

          {/* Step 1: User Type */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  I'm enrolling as:
                </h2>
                <p className="text-lg text-white/60">
                  Help us personalize your learning experience
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: 'individual', label: 'Individual Professional', desc: 'Learning for myself' },
                  { id: 'business', label: 'Business Owner', desc: 'Implementing in my company' },
                  { id: 'team-leader', label: 'Team Leader', desc: 'Training my team' },
                  { id: 'enterprise', label: 'Enterprise Decision-Maker', desc: 'Large-scale implementation' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setUserType(option.id as UserType)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      userType === option.id
                        ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{option.label}</h3>
                      {userType === option.id && (
                        <CheckCircleIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-white/60">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Challenge */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  My biggest challenge with AI is:
                </h2>
                <p className="text-lg text-white/60">
                  What's holding you back right now?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: 'getting-started', label: "Don't know where to start", desc: 'Need foundational guidance' },
                  { id: 'too-many-tools', label: 'Too many tools, need focus', desc: 'Overwhelmed by options' },
                  { id: 'train-team', label: 'Need to train my team', desc: 'Team adoption is key' },
                  { id: 'custom-solution', label: 'Want custom solutions', desc: 'Need tailored approach' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setChallenge(option.id as Challenge)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      challenge === option.id
                        ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{option.label}</h3>
                      {challenge === option.id && (
                        <CheckCircleIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-white/60">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  My timeline to implement:
                </h2>
                <p className="text-lg text-white/60">
                  When do you want to get started?
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'start-now', label: 'Start learning now', desc: 'Individual course - Begin immediately', badge: '$297' },
                  { id: 'team-training', label: 'Need team training', desc: 'Team bootcamp - 2-week program', badge: '$2,997' },
                  { id: 'custom', label: 'Custom solution needed', desc: 'Talk to our team about your needs', badge: 'Custom' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTimeline(option.id as Timeline)}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                      timeline === option.id
                        ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{option.label}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            option.badge === 'Custom' ? 'bg-purple-500/20 text-purple-400' :
                            option.badge === '$297' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {option.badge}
                          </span>
                        </div>
                        <p className="text-white/60">{option.desc}</p>
                      </div>
                      {timeline === option.id && (
                        <CheckCircleIcon className="w-6 h-6 text-blue-400 flex-shrink-0 ml-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Goal */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  What's your primary goal?
                </h2>
                <p className="text-lg text-white/60">
                  What do you want to achieve with AI?
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'learn-skills', label: 'Learn AI skills', desc: 'Master AI tools and techniques' },
                  { id: 'implement-business', label: 'Implement in my business', desc: 'Drive real business results' },
                  { id: 'both', label: 'Both learning and implementation', desc: 'Comprehensive transformation' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setGoal(option.id as Goal)}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                      goal === option.id
                        ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{option.label}</h3>
                        <p className="text-white/60">{option.desc}</p>
                      </div>
                      {goal === option.id && (
                        <CheckCircleIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Show Recommendation */}
              {goal && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30">
                  <h3 className="text-xl font-bold text-white mb-3">Your Recommended Path:</h3>
                  {(userType === 'individual' || timeline === 'start-now') && (
                    <div>
                      <p className="text-blue-400 font-bold text-2xl mb-2">3-Day Personal Course - $297</p>
                      <p className="text-white/70">Perfect for individual professionals looking to master AI skills at their own pace.</p>
                    </div>
                  )}
                  {(userType === 'team-leader' || timeline === 'team-training' || challenge === 'train-team') && (
                    <div>
                      <p className="text-emerald-400 font-bold text-2xl mb-2">2-Week Team Bootcamp - $2,997</p>
                      <p className="text-white/70">Comprehensive team training with live sessions, custom workflows, and implementation support.</p>
                    </div>
                  )}
                  {(userType === 'enterprise' || challenge === 'custom-solution' || timeline === 'custom') && (
                    <div>
                      <p className="text-purple-400 font-bold text-2xl mb-2">Custom Enterprise Solution</p>
                      <p className="text-white/70">Let's discuss a tailored AI implementation for your organization.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold hover:from-blue-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 disabled:shadow-none"
            >
              <span>{step === totalSteps ? 'Complete & Enroll' : 'Next'}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
