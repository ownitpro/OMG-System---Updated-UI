// hooks/use-analytics.ts
import { useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { analytics } from '@/lib/analytics';
import { Role } from '../generated/prisma';

export function useAnalytics() {
  const { data: session } = useSession();

  // Update user context when session changes
  useEffect(() => {
    if (session?.user) {
      analytics.setUserContext({
        userId: session.user.id,
        organizationId: session.user.activeOrgId,
        role: session.user.role as Role,
      });
    }
  }, [session]);

  const track = useCallback((event: string, properties: Record<string, any> = {}) => {
    analytics.track(event, properties);
  }, []);

  const trackAdminAction = useCallback((action: string, resource: string, properties: Record<string, any> = {}) => {
    analytics.trackAdminAction(action, resource, properties);
  }, []);

  const trackPortalAction = useCallback((action: string, resource: string, properties: Record<string, any> = {}) => {
    analytics.trackPortalAction(action, resource, properties);
  }, []);

  const trackPerformance = useCallback((metric: string, value: number, properties: Record<string, any> = {}) => {
    analytics.trackPerformance(metric, value, properties);
  }, []);

  const trackError = useCallback((error: Error, context: Record<string, any> = {}) => {
    analytics.trackError(error, context);
  }, []);

  return {
    track,
    trackAdminAction,
    trackPortalAction,
    trackPerformance,
    trackError,
  };
}

// Hook for tracking page views
export function usePageTracking() {
  const { track } = useAnalytics();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      track('page_view', {
        page: window.location.pathname,
        title: document.title,
        referrer: document.referrer,
      });
    }
  }, [track]);
}

// Hook for tracking form interactions
export function useFormTracking(formName: string) {
  const { track } = useAnalytics();

  const trackFormStart = useCallback(() => {
    track('form_start', { form_name: formName });
  }, [track, formName]);

  const trackFormSubmit = useCallback((success: boolean, errors?: string[]) => {
    track('form_submit', {
      form_name: formName,
      success,
      errors: errors || [],
    });
  }, [track, formName]);

  const trackFormFieldChange = useCallback((fieldName: string, fieldType: string) => {
    track('form_field_change', {
      form_name: formName,
      field_name: fieldName,
      field_type: fieldType,
    });
  }, [track, formName]);

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormFieldChange,
  };
}

// Hook for tracking button clicks
export function useButtonTracking(buttonName: string, category: string = 'button') {
  const { track } = useAnalytics();

  const trackClick = useCallback(() => {
    track('button_click', {
      button_name: buttonName,
      category,
    });
  }, [track, buttonName, category]);

  return { trackClick };
}
