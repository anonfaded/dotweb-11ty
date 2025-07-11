/**
 * animations.js - Enterprise-grade animation handler
 * Implements premium entrance animations with performance optimization
 */

// Hero buttons scroll animation
function initHeroButtonsScrollAnimation() {
  const heroButtons = document.querySelectorAll('.hero-actions .btn');
  if (!heroButtons.length) return;

  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDistance = Math.min(scrollTop, 300); // Cap at 300px scroll
    const scrollProgress = scrollDistance / 300; // 0 to 1
    
    // Only apply when scrolling down and within the first 300px
    if (scrollTop > lastScrollTop && scrollTop < 300) {
      heroButtons.forEach((btn, index) => {
        // Stagger the animation slightly for each button
        const delay = index * 0.15;
        const translateY = -5 * scrollProgress;
        
        btn.style.transform = `translateY(${translateY}px)`;
        
        // Add glow effect based on scroll
        if (btn.classList.contains('btn-primary')) {
          const glowIntensity = 0.15 + (0.1 * scrollProgress);
          btn.style.boxShadow = `0 2px 8px rgba(233, 37, 31, 0.2), 0 0 ${15 + (scrollProgress * 10)}px rgba(233, 37, 31, ${glowIntensity})`;
        } else if (btn.classList.contains('btn-outline')) {
          const glowIntensity = 0.1 + (0.1 * scrollProgress);
          btn.style.boxShadow = `0 2px 10px rgba(0, 0, 0, 0.1), 0 0 ${5 + (scrollProgress * 10)}px rgba(0, 0, 0, ${glowIntensity})`;
        }
      });
    } else if (scrollTop <= 0) {
      // Reset when back at top
      heroButtons.forEach(btn => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
      });
    }
    
    lastScrollTop = scrollTop;
  }, { passive: true });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
  // Check for reduced motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (reducedMotion) {
    document.documentElement.classList.add('reduced-motion');
    document.body.classList.add('content-loaded'); // Skip animations for accessibility
  } else {
    // Wait for preloader to finish before initializing animations
    if (document.body.classList.contains('content-loaded')) {
      initAnimationSequence(); // If preloader already finished (unlikely on DOMContentLoaded)
    } else {
      // Listen for preloader hidden event
      window.addEventListener('preloaderHidden', function() {
        // Short delay to ensure smooth transition
        setTimeout(function() {
          initAnimationSequence();
        }, 100);
      });
    }
  }
  
  // Initialize hero buttons scroll animation
  initHeroButtonsScrollAnimation();
});

/**
 * Initializes the complete animation sequence in the correct order
 */
function initAnimationSequence() {
  // 1. Make content visible first
  document.body.classList.add('content-loaded');
  
  // 2. Fix viewport scrolling issue
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  // 3. Initiate hero section animation with slight delay
  setTimeout(function() {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.add('animated');
    }
  }, 200);
  
  // 4. Initiate header animations
  setTimeout(function() {
    initHeaderAnimations();
  }, 300);
  
  // 5. Start scroll-based animations
  initScrollAnimations();
}

/**
 * Initializes entrance animations for the header elements
 */
function initHeaderAnimations() {
  const headerElements = document.querySelectorAll('.animate[data-animation="initial"]');
  let delay = 0;
  
  headerElements.forEach(element => {
    // Get delay from data attribute or use incremental delay
    const elementDelay = parseInt(element.dataset.delay || delay);
    
    setTimeout(() => {
      element.classList.add(element.dataset.effect || 'fade-in');
    }, elementDelay);
    
    // Increment default delay for next element if not specified
    if (!element.dataset.delay) {
      delay += 50;
    }
  });
}

/**
 * Process section specific animations
 */
export function initProcessAnimations() {
  const processSection = document.querySelector('.process');
  if (!processSection) return;
  
  // Process section is now handled by the standard scroll animations
  // This function is kept for compatibility with main.js imports
}

export function initPortfolioAnimations() {
  // Portfolio section animations
  const featureCards = document.querySelectorAll('.portfolio-showcase .feature-card');
  
  if (featureCards.length) {
    featureCards.forEach(card => {
      // Ensure proper animation classes are applied
      card.classList.add('animate-in');
      
      // Add hover effect handling
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.05)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        card.style.borderColor = 'rgba(233, 37, 31, 0.15)';
        card.style.zIndex = '5';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = '';
        card.style.zIndex = '';
      });
    });
  }
}

export function initContactAnimations() {
  // Contact section is now handled by the standard scroll animations
  // This function is kept for compatibility with main.js imports
}

/**
 * Footer animations
 */
export function initFooterAnimations() {
  // Footer is now handled by the standard scroll animations
  // This function is kept for compatibility with main.js imports
}

/**
 * Initializes scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  // Main scroll animation observer for elements with data-effect attribute
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const effect = element.dataset.effect || 'fade-in';
        const delay = parseInt(element.dataset.delay || 0);
        
        setTimeout(() => {
          element.classList.add(effect);
        }, delay);
        
        // Unobserve after animation is triggered
        observer.unobserve(element);
      }
    });
  }, {
    root: null, // use viewport
    threshold: 0.15, // trigger when 15% of the element is visible
    rootMargin: '0px 0px -10% 0px' // slightly above the bottom of viewport
  });
  
  // Observe all elements with the animate class
  document.querySelectorAll('.animate').forEach(element => {
    observer.observe(element);
  });
} 