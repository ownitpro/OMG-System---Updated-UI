"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { CreateDesignRequestInput } from "@/hooks/useDesignRequests";

interface DesignRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDesignRequestInput) => Promise<void>;
}

export function DesignRequestModal({ isOpen, onClose, onSubmit }: DesignRequestModalProps) {
  const [formData, setFormData] = React.useState({
    projectName: "",
    designType: "",
    description: "",
    deadline: "",
    budget: "",
    assets: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to API via onSubmit prop
      await onSubmit({
        projectName: formData.projectName,
        designType: formData.designType,
        description: formData.description,
        deadline: formData.deadline || undefined,
        budget: formData.budget || undefined,
        assets: formData.assets || undefined,
      });

      setSubmitStatus("success");

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setFormData({
          projectName: "",
          designType: "",
          description: "",
          deadline: "",
          budget: "",
          assets: "",
        });
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Failed to submit design request:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl"
        style={{ boxShadow: "0 0 40px rgba(168, 85, 247, 0.2)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Request Design</h2>
            <p className="text-sm text-white/60 mt-1">Tell us about your design needs</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="mb-6 rounded-xl bg-[#47BD79]/10 border border-[#47BD79]/30 p-4">
            <p className="text-[#47BD79] font-medium">✓ Design request submitted successfully!</p>
            <p className="text-sm text-white/60 mt-1">Our team will review your request and get back to you shortly.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 p-4">
            <p className="text-red-400 font-medium">Failed to submit request</p>
            <p className="text-sm text-white/60 mt-1">Please try again or contact support.</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-white mb-2">
              Project Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#1b2335] px-4 py-3 text-white placeholder-white/40 focus:border-[#A855F7] focus:outline-none focus:ring-2 focus:ring-[#A855F7]/20"
              placeholder="e.g., Q2 Marketing Campaign"
            />
          </div>

          {/* Design Type */}
          <div>
            <label htmlFor="designType" className="block text-sm font-medium text-white mb-2">
              Design Type <span className="text-red-400">*</span>
            </label>
            <select
              id="designType"
              name="designType"
              value={formData.designType}
              onChange={handleChange}
              required
              style={{
                colorScheme: 'dark',
              }}
              className="w-full rounded-xl border border-white/10 bg-[#1b2335] px-4 py-3 text-white focus:border-[#A855F7] focus:outline-none focus:ring-2 focus:ring-[#A855F7]/20 [&>option]:bg-[#1b2335] [&>option]:text-white"
            >
              <option value="">Select design type...</option>
              <option value="logo">Logo Design</option>
              <option value="brand_identity">Brand Identity</option>
              <option value="marketing_materials">Marketing Materials</option>
              <option value="social_media">Social Media Graphics</option>
              <option value="web_design">Web Design</option>
              <option value="print_design">Print Design</option>
              <option value="packaging">Packaging Design</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Project Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-[#1b2335] px-4 py-3 text-white placeholder-white/40 focus:border-[#A855F7] focus:outline-none focus:ring-2 focus:ring-[#A855F7]/20 resize-none"
              placeholder="Describe what you need designed, including style preferences, color schemes, target audience, etc."
            />
          </div>

          {/* Deadline and Budget Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-white mb-2">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                style={{
                  colorScheme: 'dark',
                }}
                className="w-full rounded-xl border border-white/10 bg-[#1b2335] px-4 py-3 text-white focus:border-[#A855F7] focus:outline-none focus:ring-2 focus:ring-[#A855F7]/20"
              />
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                style={{
                  colorScheme: 'dark',
                }}
                className="w-full rounded-xl border border-white/10 bg-[#1b2335] px-4 py-3 text-white focus:border-[#A855F7] focus:outline-none focus:ring-2 focus:ring-[#A855F7]/20 [&>option]:bg-[#1b2335] [&>option]:text-white"
              >
                <option value="">Select budget range...</option>
                <option value="under_1k">Under $1,000</option>
                <option value="1k_5k">$1,000 - $5,000</option>
                <option value="5k_10k">$5,000 - $10,000</option>
                <option value="10k_plus">$10,000+</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Existing Assets */}
          <div>
            <label htmlFor="assets" className="block text-sm font-medium text-white mb-2">
              Existing Brand Assets
            </label>
            <textarea
              id="assets"
              name="assets"
              value={formData.assets}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-xl border border-white/10 bg-[#1b2335] px-4 py-3 text-white placeholder-white/40 focus:border-[#A855F7] focus:outline-none focus:ring-2 focus:ring-[#A855F7]/20 resize-none"
              placeholder="List any existing logos, color schemes, fonts, or style guides we should follow"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === "success"}
              className="flex-1 rounded-xl bg-[#A855F7] px-4 py-3 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : submitStatus === "success" ? "Submitted ✓" : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
