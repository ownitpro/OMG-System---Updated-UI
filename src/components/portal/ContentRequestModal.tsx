"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ContentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ContentRequestInput) => Promise<void>;
}

export interface ContentRequestInput {
  title: string;
  contentType: string;
  description: string;
  targetAudience?: string;
  keywords?: string;
  deadline?: string;
  wordCount?: number;
  tone?: string;
  additionalNotes?: string;
}

const CONTENT_TYPES = [
  { value: "blog_post", label: "Blog Post" },
  { value: "video", label: "Video" },
  { value: "email_campaign", label: "Email Campaign" },
  { value: "social_media", label: "Social Media Content" },
  { value: "whitepaper", label: "Whitepaper / eBook" },
  { value: "case_study", label: "Case Study" },
  { value: "infographic", label: "Infographic" },
  { value: "podcast", label: "Podcast" },
  { value: "other", label: "Other" },
];

const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "authoritative", label: "Authoritative" },
  { value: "playful", label: "Playful" },
  { value: "inspirational", label: "Inspirational" },
];

export function ContentRequestModal({ isOpen, onClose, onSubmit }: ContentRequestModalProps) {
  const [formData, setFormData] = useState<ContentRequestInput>({
    title: "",
    contentType: "",
    description: "",
    targetAudience: "",
    keywords: "",
    deadline: "",
    wordCount: undefined,
    tone: "",
    additionalNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Fallback: just log for now
        console.log("Content Request Submitted:", formData);
      }

      setSubmitStatus("success");

      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setFormData({
          title: "",
          contentType: "",
          description: "",
          targetAudience: "",
          keywords: "",
          deadline: "",
          wordCount: undefined,
          tone: "",
          additionalNotes: "",
        });
        setSubmitStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Content request submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f172a] border border-white/10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Request New Content</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
            ✓ Content request submitted successfully! We'll get back to you soon.
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            ✗ Failed to submit request. Please try again.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Content Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Content Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Ultimate Guide to Email Marketing"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all"
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Content Type <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={formData.contentType}
              onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all"
              style={{ colorScheme: 'dark' }}
            >
              <option value="">Select content type...</option>
              {CONTENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what you want this content to cover, key points to include, and any specific requirements..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all resize-none"
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g., Small business owners"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all"
                style={{ colorScheme: 'dark' }}
              >
                <option value="">Select tone...</option>
                {TONE_OPTIONS.map((tone) => (
                  <option key={tone.value} value={tone.value}>
                    {tone.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Word Count */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Target Word Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.wordCount || ""}
                onChange={(e) => setFormData({ ...formData, wordCount: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="e.g., 2000"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Target Keywords
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="e.g., SEO, digital marketing, content strategy (comma separated)"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all"
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Additional Notes
            </label>
            <textarea
              rows={3}
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              placeholder="Any additional requirements, references, or special instructions..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#1b2335] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#47BD79] transition-all resize-none"
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-white/5 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
