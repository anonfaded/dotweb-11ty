import { initContactAnimations, initFooterAnimations, initPortfolioAnimations, initProcessAnimations } from './animations.js';

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize Scroll Progress Bar
  initScrollProgressBar();
  
  // Initialize mobile navigation
  initMobileNavigation();
  
  // Initialize scroll to top button
  initScrollToTop();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize process timeline
  initProcessTimeline();
  
  // Initialize Contact Form
  initContactForm();
  
  // Make sure integrated section is visible
  makeIntegratedSectionVisible();
  
  // Initialize active nav links
  initActiveNavLinks();
  
  // Initialize navigation dropdowns
  initNavigationDropdowns();
  
  // Initialize legal drawer
  initLegalDrawer();
  
  // Initialize language drawer
  initLanguageDrawer();
  
  // Initialize video fallback
  initVideoFallback();
  
  // Initialize on-scroll animations
  animateOnScroll();
  
  // Initialize component-specific animations
  initPortfolioAnimations();
  initProcessAnimations();
  initContactAnimations();
  initFooterAnimations();
});

// Make integrated section visible
function makeIntegratedSectionVisible() {
  const integratedSection = document.querySelector('.integrated-section');
  if (!integratedSection) return;
  
  // Make header visible
  const header = integratedSection.querySelector('.integrated-header');
  if (header) {
    header.style.opacity = '1';
    header.style.visibility = 'visible';
    
    const title = header.querySelector('.section-title');
    const description = header.querySelector('.section-description');
    
    if (title) {
      title.style.opacity = '1';
      title.style.visibility = 'visible';
    }
    
    if (description) {
      description.style.opacity = '1';
      description.style.visibility = 'visible';
    }
  }
  
  // Make columns visible
  const columns = integratedSection.querySelectorAll('.contact-column, .testimonials-column');
  columns.forEach(column => {
    column.style.opacity = '1';
    column.style.transform = 'none';
  });
}

// Scroll Progress Bar
function initScrollProgressBar() {
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (!scrollProgressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollPercentage = (scrolled / windowHeight) * 100;
    
    scrollProgressBar.style.width = `${scrollPercentage}%`;
  }, { passive: true });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile navigation toggle
function initMobileNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;
  
  if (!menuToggle || !mobileNav) return;
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    body.classList.toggle('nav-open');
  });
}

// Scroll to top button
function initScrollToTop() {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  if (!scrollToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Advanced process section animations with precise trigger points
function initProcessTimeline() {
  const processSection = document.querySelector('.process');
  const processSteps = document.querySelectorAll('.process-step');
  const timelineIndicator = document.querySelector('.timeline-progress-indicator');
  const mobileTimelineIndicator = document.querySelector('.mobile-timeline-progress-indicator');
  const processTimeline = document.querySelector('.process-timeline');
  const mobileProcessSteps = document.querySelectorAll('.mobile-process-step');

  if (!processSection || !processTimeline) {
    console.warn('Process timeline elements not found, animations disabled.');
    return;
  }

  // Define the precise trigger point (57% of viewport height - just below center)
  function getTriggerPoint() {
    return window.innerHeight * 0.57;
  }

  // Handle hover effects for enhanced timeline progress
  function setupHoverEffects() {
    processSteps.forEach((step) => {
      step.addEventListener('mouseenter', () => {
        step.classList.add('hover-enhanced');
      });
      step.addEventListener('mouseleave', () => {
        step.classList.remove('hover-enhanced');
      });
    });
  }

  // Handle mobile process step animations
  function updateMobileSteps(scrollProgress) {
    mobileProcessSteps.forEach((step, i) => {
      const stepNumber = step.querySelector('.process-step-number');
      const stepThreshold = (i / mobileProcessSteps.length);
      
      if (scrollProgress >= stepThreshold) {
        stepNumber.classList.add('active');
      } else {
        stepNumber.classList.remove('active');
      }
    });
  }

  let scrollTimeout;
  let lastScrollY = window.scrollY;

  function handleScroll() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    lastScrollY = window.scrollY;
    scrollTimeout = window.requestAnimationFrame(updateScrollProgress);
  }

  function updateScrollProgress() {
    const timelineRect = processTimeline.getBoundingClientRect();
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;
    const viewportHeight = window.innerHeight;
    const triggerPoint = getTriggerPoint();
    let scrollProgress = 0;

    if (timelineTop <= triggerPoint) {
      const scrollRange = triggerPoint + timelineHeight - viewportHeight * 0.3;
      const scrollPosition = triggerPoint - timelineTop;
      scrollProgress = Math.min(Math.max(scrollPosition / scrollRange, 0), 1);
    }

    const progressPercentage = scrollProgress * 100;
    
    // Update desktop progress indicator
    if (timelineIndicator) {
      timelineIndicator.style.height = `${progressPercentage}%`;
    }
    
    // Update mobile progress indicator
    if (mobileTimelineIndicator) {
      mobileTimelineIndicator.style.height = `${progressPercentage}%`;
    }

    // Update desktop process steps
    processSteps.forEach((step, i) => {
      const stepThreshold = (i / processSteps.length);
      if (scrollProgress >= stepThreshold) {
        if (!step.classList.contains('animated')) {
          step.classList.add('animated');
        }
      } else {
        step.classList.remove('animated');
      }
    });

    // Update mobile process steps
    updateMobileSteps(scrollProgress);
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (timelineIndicator) {
        timelineIndicator.style.opacity = '1';
      }
      if (mobileTimelineIndicator) {
        mobileTimelineIndicator.style.opacity = '1';
      }
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); 
      updateScrollProgress(); 
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
  }, { threshold: 0.1 })

  sectionObserver.observe(processSection);
  setupHoverEffects();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }

  setTimeout(() => {
    updateScrollProgress();
  }, 300);
}

// Contact form initialization
function initContactForm() {
  const contactForm = document.querySelector('#eventWebsiteForm');
  const successMessage = document.getElementById('successMessage');
  const contactColumn = document.querySelector('.contact-column');
  const formFields = document.querySelectorAll('.form-field');
  
  // Make sure contact form is visible
  if (contactColumn) {
    contactColumn.style.opacity = '1';
    contactColumn.style.transform = 'translateX(0)';
  }
  
  // Make form fields visible
  formFields.forEach(field => {
    field.style.opacity = '1';
    field.style.transform = 'translateY(0)';
  });
  
  if (!contactForm || !successMessage) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
          isValid = false;
          if (field.classList.contains('form-input') || field.classList.contains('form-textarea')) {
              field.style.borderColor = 'var(--primary)';
          }
      } else {
          if (field.classList.contains('form-input') || field.classList.contains('form-textarea')) {
              field.style.borderColor = 'var(--gray-300)';
          }
      }
    });

    if (!isValid) {
        console.log("Form is not valid. Please fill all required fields.");
        alert("Bitte füllen Sie alle Pflichtfelder (*) aus.");
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Wird übermittelt...</span>';
    submitButton.disabled = true;
    
    // Form data handling
    const formData = new FormData(contactForm);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Show success message
      successMessage.classList.add('visible');
      
      // Reset form
      contactForm.reset();
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('visible');
      }, 5000);
    }, 1500);
  });
}

// Active nav link highlighting
function initActiveNavLinks() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
      link.classList.add('active');
    }
  });
}

// Navigation dropdowns
function initNavigationDropdowns() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = toggle.nextElementSibling;
      
      // Close other open dropdowns
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.classList.remove('active');
          otherToggle.nextElementSibling?.classList.remove('active');
        }
      });
      
      toggle.classList.toggle('active');
      dropdown.classList.toggle('active');
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      dropdownToggles.forEach(toggle => {
        toggle.classList.remove('active');
        toggle.nextElementSibling?.classList.remove('active');
      });
    }
  });
}

// Legal drawer
function initLegalDrawer() {
  const legalToggle = document.querySelector('.legal-toggle');
  const legalDrawer = document.querySelector('.legal-drawer');
  
  if (!legalToggle || !legalDrawer) return;
  
  legalToggle.addEventListener('click', (e) => {
    e.preventDefault();
    legalDrawer.classList.toggle('active');
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (legalDrawer.classList.contains('active') && !e.target.closest('.legal-drawer') && !e.target.closest('.legal-toggle')) {
      legalDrawer.classList.remove('active');
    }
  });
}

// Language drawer
function initLanguageDrawer() {
  const langToggle = document.querySelector('.lang-toggle');
  const langDrawer = document.querySelector('.lang-drawer');
  
  if (!langToggle || !langDrawer) return;
  
  langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    langDrawer.classList.toggle('active');
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (langDrawer.classList.contains('active') && !e.target.closest('.lang-drawer') && !e.target.closest('.lang-toggle')) {
      langDrawer.classList.remove('active');
    }
  });
}

// Video fallback for browsers that don't support video
function initVideoFallback() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    if (video.canPlayType) {
      const fallbackImage = video.getAttribute('data-fallback');
      if (fallbackImage && !video.canPlayType('video/mp4')) {
        const img = document.createElement('img');
        img.src = fallbackImage;
        img.alt = 'Video fallback image';
        img.classList.add('video-fallback');
        video.parentNode.replaceChild(img, video);
      }
    }
  });
}

// General on-scroll animations
function animateOnScroll() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}