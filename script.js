// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupScrollAnimations();
    setupCounters();
    setupModals();
    setupFloatingCTA();
    setupFormHandling();
    setupSmoothScrolling();
    setupParallaxEffects();
    setupIntersectionObserver();
}

// Navigation Setup
function setupNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.step, .feature-card, .example-card, .testimonial-card, .result-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animations
function setupCounters() {
    const counters = document.querySelectorAll('.metric-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Modal Setup
function setupModals() {
    // Demo Modal
    window.openDemoModal = function(type = null) {
        const modal = document.getElementById('demo-modal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Pre-select demo type if specified
            if (type) {
                const demoCards = modal.querySelectorAll('.modal-demo-card');
                demoCards.forEach(card => {
                    if (card.onclick.toString().includes(type)) {
                        card.style.borderColor = 'var(--primary)';
                        card.style.background = 'rgba(0, 208, 132, 0.1)';
                    }
                });
            }
        }
    };
    
    window.closeDemoModal = function() {
        const modal = document.getElementById('demo-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Strategy Modal
    window.openStrategyModal = function() {
        const modal = document.getElementById('strategy-modal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeStrategyModal = function() {
        const modal = document.getElementById('strategy-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const demoModal = document.getElementById('demo-modal');
        const strategyModal = document.getElementById('strategy-modal');
        
        if (event.target === demoModal) {
            closeDemoModal();
        }
        if (event.target === strategyModal) {
            closeStrategyModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeDemoModal();
            closeStrategyModal();
        }
    });
}

// Floating CTA Setup
function setupFloatingCTA() {
    const floatingCTA = document.getElementById('floating-cta');
    
    if (floatingCTA) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Show floating CTA after scrolling past hero section
            if (scrollPosition > windowHeight * 0.5) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
    }
}

// Form Handling
function setupFormHandling() {
    const strategyForm = document.querySelector('.strategy-form');
    
    if (strategyForm) {
        strategyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleStrategyFormSubmission(this);
        });
    }
}

function handleStrategyFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!data.name || !data.email || !data.company || !data.industry) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Scheduling...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Strategy call scheduled successfully! We\'ll contact you within 24 hours.', 'success');
        form.reset();
        closeStrategyModal();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Track conversion
        trackEvent('strategy_call_scheduled', {
            industry: data.industry,
            company: data.company
        });
    }, 2000);
}

// Demo Functions
window.startDemo = function(type) {
    closeDemoModal();
    
    // Track demo start
    trackEvent('demo_started', { demo_type: type });
    
    // Simulate demo experience
    showNotification(`Starting ${type} demo... Redirecting to demo environment.`, 'info');
    
    // In a real implementation, this would redirect to the actual demo
    setTimeout(() => {
        window.open(`https://demo.omgsystems.com/${type}`, '_blank');
    }, 1000);
};

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                animation: slideInRight 0.3s ease;
            }
            .notification-success {
                background: #00D084;
                color: white;
            }
            .notification-error {
                background: #ff6b6b;
                color: white;
            }
            .notification-info {
                background: #4A90E2;
                color: white;
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth Scrolling
function setupSmoothScrolling() {
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
}

// Parallax Effects
function setupParallaxEffects() {
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroParticles.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Analytics and Tracking
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
    
    // Custom analytics
    console.log('Event tracked:', eventName, properties);
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        './assets/hero-animation.json',
        './assets/logo.svg'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        if (resource.endsWith('.json')) {
            link.as = 'fetch';
            link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
    });
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // In production, you might want to send this to an error tracking service
});

// Unhandled Promise Rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // In production, you might want to send this to an error tracking service
});

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced scroll handling with throttling
const throttledScrollHandler = throttle(function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Update progress indicator if exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const progress = (scrollPosition / documentHeight) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    // Parallax effects
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrollPosition * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Keyboard Navigation
document.addEventListener('keydown', function(event) {
    // Tab navigation enhancement
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyles);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.OMGsystems = {
    openDemoModal,
    closeDemoModal,
    openStrategyModal,
    closeStrategyModal,
    startDemo,
    scrollToSection,
    trackEvent,
    showNotification
};
