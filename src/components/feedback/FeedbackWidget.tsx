"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  CheckCircleIcon,
  StarIcon,
  BugAntIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

interface FeedbackWidgetProps {
  page?: string;
  userAgent?: string;
  browserInfo?: string;
}

export function FeedbackWidget({ page, userAgent, browserInfo }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    rating: '',
    feedback: '',
    featureRequest: false,
    bugReport: false,
    improvementSuggestion: false
  });

  const categories = [
    { value: 'ui-ux', label: 'UI/UX', icon: '🎨' },
    { value: 'performance', label: 'Performance', icon: '⚡' },
    { value: 'features', label: 'Features', icon: '🔧' },
    { value: 'bug', label: 'Bug Report', icon: '🐛' },
    { value: 'suggestion', label: 'Suggestion', icon: '💡' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          page: page || window.location.pathname,
          userAgent: userAgent || navigator.userAgent,
          browserInfo: browserInfo || `${navigator.platform} - ${navigator.language}`
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
          setFormData({
            category: '',
            rating: '',
            feedback: '',
            featureRequest: false,
            bugReport: false,
            improvementSuggestion: false
          });
        }, 2000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category,
      bugReport: category === 'bug',
      featureRequest: category === 'features',
      improvementSuggestion: category === 'suggestion'
    }));
  };

  if (isSubmitted) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80 shadow-lg border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
            <p className="text-green-700">Your feedback has been submitted successfully.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
          Feedback
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Share Your Feedback</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Selection */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating */}
            <div>
              <Label>Rating</Label>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star.toString() }))}
                    className={`p-1 ${
                      parseInt(formData.rating) >= star 
                        ? 'text-yellow-500' 
                        : 'text-gray-300'
                    }`}
                  >
                    <StarIcon className="h-6 w-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Type Badges */}
            {formData.bugReport && (
              <Badge variant="destructive" className="flex items-center w-fit">
                <BugAntIcon className="h-3 w-3 mr-1" />
                Bug Report
              </Badge>
            )}
            {formData.featureRequest && (
              <Badge variant="default" className="flex items-center w-fit">
                <LightBulbIcon className="h-3 w-3 mr-1" />
                Feature Request
              </Badge>
            )}
            {formData.improvementSuggestion && (
              <Badge variant="secondary" className="flex items-center w-fit">
                <HeartIcon className="h-3 w-3 mr-1" />
                Improvement
              </Badge>
            )}

            {/* Feedback Text */}
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                value={formData.feedback}
                onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
                placeholder="Tell us what you think..."
                rows={4}
                required
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !formData.category || !formData.rating || !formData.feedback}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
