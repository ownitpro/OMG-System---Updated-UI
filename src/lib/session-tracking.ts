/**
 * Session tracking utilities for email capture and user behavior
 * Client-side only to avoid SSR issues
 */

const SESSION_KEYS = {
  EMAIL_CAPTURE_SHOWN: 'omg_email_capture_shown',
  EMAIL_CAPTURE_SUBMITTED: 'omg_email_captured',
  SESSION_START: 'omg_session_start',
  PAGE_VIEWS: 'omg_page_views',
  TIME_ON_SITE: 'omg_time_on_site'
} as const;

export class SessionTracker {
  private static instance: SessionTracker;
  private sessionStartTime: number;
  private isClient: boolean;

  private constructor() {
    this.isClient = typeof window !== 'undefined';
    this.sessionStartTime = Date.now();
    
    if (this.isClient) {
      this.initializeSession();
    }
  }

  public static getInstance(): SessionTracker {
    if (!SessionTracker.instance) {
      SessionTracker.instance = new SessionTracker();
    }
    return SessionTracker.instance;
  }

  private initializeSession() {
    if (!this.isClient) return;
    
    // Check if this is a new session
    const sessionStart = localStorage.getItem(SESSION_KEYS.SESSION_START);
    if (!sessionStart) {
      // New session - reset all tracking
      this.resetSession();
      localStorage.setItem(SESSION_KEYS.SESSION_START, this.sessionStartTime.toString());
    } else {
      this.sessionStartTime = parseInt(sessionStart);
    }

    // Track page views
    this.incrementPageViews();
  }

  private resetSession() {
    if (!this.isClient) return;
    
    // Clear email capture flags
    localStorage.removeItem(SESSION_KEYS.EMAIL_CAPTURE_SHOWN);
    localStorage.removeItem(SESSION_KEYS.EMAIL_CAPTURE_SUBMITTED);
    localStorage.removeItem(SESSION_KEYS.PAGE_VIEWS);
    localStorage.removeItem(SESSION_KEYS.TIME_ON_SITE);
  }

  public hasShownEmailCapture(): boolean {
    if (!this.isClient) return false;
    return localStorage.getItem(SESSION_KEYS.EMAIL_CAPTURE_SHOWN) === 'true';
  }

  public hasSubmittedEmail(): boolean {
    if (!this.isClient) return false;
    return localStorage.getItem(SESSION_KEYS.EMAIL_CAPTURE_SUBMITTED) === 'true';
  }

  public markEmailCaptureShown(): void {
    if (!this.isClient) return;
    localStorage.setItem(SESSION_KEYS.EMAIL_CAPTURE_SHOWN, 'true');
  }

  public markEmailSubmitted(): void {
    if (!this.isClient) return;
    localStorage.setItem(SESSION_KEYS.EMAIL_CAPTURE_SUBMITTED, 'true');
  }

  public incrementPageViews(): void {
    if (!this.isClient) return;
    const currentViews = this.getPageViews();
    localStorage.setItem(SESSION_KEYS.PAGE_VIEWS, (currentViews + 1).toString());
  }

  public getPageViews(): number {
    if (!this.isClient) return 0;
    const views = localStorage.getItem(SESSION_KEYS.PAGE_VIEWS);
    return views ? parseInt(views) : 0;
  }

  public getTimeOnSite(): number {
    return Date.now() - this.sessionStartTime;
  }

  public shouldShowEmailCapture(): boolean {
    if (!this.isClient) return false;
    
    // Don't show if already shown or submitted
    if (this.hasShownEmailCapture() || this.hasSubmittedEmail()) {
      return false;
    }

    // Show if user has been on site for at least 30 seconds
    // and viewed at least 2 pages
    const timeOnSite = this.getTimeOnSite();
    const pageViews = this.getPageViews();

    return timeOnSite > 30000 && pageViews >= 2;
  }

  public getSessionData() {
    return {
      sessionStart: this.sessionStartTime,
      pageViews: this.getPageViews(),
      timeOnSite: this.getTimeOnSite(),
      hasShownEmailCapture: this.hasShownEmailCapture(),
      hasSubmittedEmail: this.hasSubmittedEmail()
    };
  }

  // Clean up old session data (call on page unload)
  public cleanup() {
    if (!this.isClient) return;
    // Update time on site
    localStorage.setItem(SESSION_KEYS.TIME_ON_SITE, this.getTimeOnSite().toString());
  }
}

// Export singleton instance
export const sessionTracker = SessionTracker.getInstance();
