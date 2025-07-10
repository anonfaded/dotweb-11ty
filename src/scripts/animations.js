/**
 * animations.js - Enterprise-grade animation handler
 * Implements premium entrance animations with performance optimization
 */

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
  
  // 6. Initialize enhanced section animations
  initEnhancedSectionAnimations();
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
 * Enhanced section animations with enterprise-grade effects
 */
function initEnhancedSectionAnimations() {
  // Portfolio section animations
  initPortfolioAnimations();
  
  // Process section animations
  initProcessAnimations();
  
  // Contact/Testimonials section animations
  initContactAnimations();
  
  // Footer animations
  initFooterAnimations();
}

/**
 * Portfolio section specific animations
 */
function initPortfolioAnimations() {
  const portfolioSection = document.querySelector('.portfolio-showcase');
  if (!portfolioSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate section header first
        const sectionHeader = entry.target.querySelector('.section-header');
        if (sectionHeader) {
          sectionHeader.classList.add('animate-in');
        }
        
        // Animate project card with delay
        setTimeout(() => {
          const projectCard = entry.target.querySelector('.project-card');
          if (projectCard) {
            projectCard.classList.add('animate-in');
            
            // Animate project card children with stagger
            const cardChildren = projectCard.querySelectorAll('.project-media, .project-content');
            cardChildren.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-in');
              }, 200 + (index * 150));
            });
          }
        }, 300);
        
        // Animate features section
        setTimeout(() => {
          const featuresSection = entry.target.querySelector('.features-section');
          if (featuresSection) {
            featuresSection.classList.add('animate-in');
            
            // Animate feature cards with stagger
            const featureCards = featuresSection.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, 100 + (index * 100));
            });
          }
        }, 600);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });
  
  observer.observe(portfolioSection);
}

/**
 * Process section specific animations
 */
function initProcessAnimations() {
  const processSection = document.querySelector('.process');
  if (!processSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate section header
        const sectionHeader = entry.target.querySelector('.section-header');
        if (sectionHeader) {
          sectionHeader.classList.add('animate-in');
        }
        
        // Animate process steps with stagger
        const processSteps = entry.target.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
          setTimeout(() => {
            step.classList.add('animate-in');
          }, 400 + (index * 200));
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -5% 0px'
  });
  
  observer.observe(processSection);
}

export function initContactAnimations() {
  const contactSection = document.querySelector('.integrated-section');
  if (!contactSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate section header
        const sectionHeader = entry.target.querySelector('.integrated-header');
        if (sectionHeader) {
          sectionHeader.classList.add('animate-in');
        }
        
        // Animate contact and testimonials columns
        const columns = entry.target.querySelectorAll('.contact-column, .testimonials-column');
        columns.forEach((column, index) => {
          setTimeout(() => {
            column.classList.add('animate-in');
            
            // Animate form fields with stagger
            if (column.classList.contains('contact-column')) {
              const formFields = column.querySelectorAll('.form-field');
              formFields.forEach((field, fieldIndex) => {
                setTimeout(() => {
                  field.classList.add('animate-in');
                }, 100 + (fieldIndex * 50));
              });
            }
            
            // Animate guarantee items with stagger
            if (column.classList.contains('testimonials-column')) {
              const guaranteeItems = column.querySelectorAll('.guarantee-item');
              guaranteeItems.forEach((item, itemIndex) => {
                setTimeout(() => {
                  item.classList.add('animate-in');
                }, 100 + (itemIndex * 80));
              });
            }
          }, 300 + (index * 200));
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });
  
  observer.observe(contactSection);
}

/**
 * Footer animations
 */
export function initFooterAnimations() {
  const footer = document.querySelector('.footer');
  if (!footer) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate footer columns with stagger
        const footerColumns = entry.target.querySelectorAll('.footer-brand-column, .footer-nav-column, .footer-contact-column');
        footerColumns.forEach((column, index) => {
          setTimeout(() => {
            column.classList.add('animate-in');
          }, 100 + (index * 100));
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -5% 0px'
  });
  
  observer.observe(footer);
}

/**
 * Initializes scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  // Main scroll animation observer for legacy elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = parseInt(element.dataset.delay || 0);
        
        setTimeout(() => {
          element.classList.add(element.dataset.effect || 'fade-in');
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
  
  // Observe all elements with the animate class that don't have initial animation
  document.querySelectorAll('.animate:not([data-animation="initial"])').forEach(element => {
    observer.observe(element);
  });
} 