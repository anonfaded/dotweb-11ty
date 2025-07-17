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
  const header = document.querySelector('.header');
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!header) return;

  let isAtTop = true;
  let isScrollingUp = false;
  let lastScrollY = window.scrollY;

  function updateHeader() {
    const currentScrollY = window.scrollY;
    isScrollingUp = currentScrollY < lastScrollY;

    const wasAtTop = isAtTop;
    isAtTop = currentScrollY <= 50;

    if (isScrollingUp && !wasAtTop && isAtTop) {
      header.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else if (!isAtTop) {
      header.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    if (currentScrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Force a reflow to ensure accurate height calculation
  header.offsetHeight;
  
  // Update header height with more accurate calculation
  const headerHeight = header.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--header-height', `${Math.ceil(headerHeight)}px`);

    if (progressBar) {
      const scrollPercentage = (currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${scrollPercentage}%`;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader, { passive: true });
  updateHeader();
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
  const legalToggle = document.getElementById('mobileNavLegalToggle');
  
  if (legalToggle) {
    legalToggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create legal drawer bottom sheet
      const existingDrawer = document.getElementById('legalDrawer');
      if (existingDrawer) {
        existingDrawer.remove();
      }
      
      const drawer = document.createElement('div');
      drawer.id = 'legalDrawer';
      drawer.className = 'legal-drawer-overlay';
      drawer.innerHTML = `
        <div class="legal-drawer-content">
          <div class="legal-drawer-header">
            <h3>Rechtliche Informationen</h3>
            <button class="legal-drawer-close" id="legalDrawerClose">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="legal-drawer-body">
            <a href="agb.html" class="legal-drawer-item">
              <div class="legal-drawer-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div class="legal-drawer-text">
                <span class="legal-drawer-title">Allgemeine Geschäftsbedingungen</span>
                <span class="legal-drawer-desc">Unsere AGB und Nutzungsbedingungen</span>
              </div>
            </a>
            <a href="datenschutz.html" class="legal-drawer-item">
              <div class="legal-drawer-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="legal-drawer-text">
                <span class="legal-drawer-title">Datenschutzerklärung</span>
                <span class="legal-drawer-desc">Wie wir Ihre Daten schützen</span>
              </div>
            </a>
            <a href="impressum.html" class="legal-drawer-item">
              <div class="legal-drawer-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div class="legal-drawer-text">
                <span class="legal-drawer-title">Impressum</span>
                <span class="legal-drawer-desc">Rechtliche Angaben zu unserem Unternehmen</span>
              </div>
            </a>
          </div>
        </div>
      `;
      
      document.body.appendChild(drawer);
      
      // Add styles for the drawer
      const style = document.createElement('style');
      style.textContent = `
        .legal-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .legal-drawer-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        .legal-drawer-content {
          width: 100%;
          background: white;
          border-radius: 16px 16px 0 0;
          padding: 0;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          max-height: 60vh;
          overflow: hidden;
        }
        
        .legal-drawer-overlay.active .legal-drawer-content {
          transform: translateY(0);
        }
        
        .legal-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .legal-drawer-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
        }
        
        .legal-drawer-close {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 50%;
          transition: background-color 0.2s ease;
          color: #6b7280;
        }
        
        .legal-drawer-close:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #374151;
        }
        
        .legal-drawer-body {
          padding: 8px 16px 24px;
        }
        
        .legal-drawer-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 8px;
          text-decoration: none;
          border-radius: 8px;
          transition: background-color 0.2s ease;
          margin-bottom: 4px;
        }
        
        .legal-drawer-item:hover {
          background: rgba(233, 37, 31, 0.04);
        }
        
        .legal-drawer-icon {
          width: 40px;
          height: 40px;
          background: rgba(233, 37, 31, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary, #e9251f);
          flex-shrink: 0;
        }
        
        .legal-drawer-text {
          flex: 1;
          min-width: 0;
        }
        
        .legal-drawer-title {
          display: block;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2d3748;
          line-height: 1.2;
        }
        
        .legal-drawer-desc {
          display: block;
          font-size: 0.8rem;
          color: #6b7280;
          line-height: 1.3;
          margin-top: 2px;
        }
      `;
      document.head.appendChild(style);
      
      // Show drawer
      setTimeout(() => {
        drawer.classList.add('active');
      }, 10);
      
      // Close drawer functionality
      const closeDrawer = () => {
        drawer.classList.remove('active');
        setTimeout(() => {
          drawer.remove();
          document.head.removeChild(style);
        }, 300);
      };
      
      document.getElementById('legalDrawerClose').addEventListener('click', closeDrawer);
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeDrawer();
      });
    });
  }
}

// Language drawer
function initLanguageDrawer() {
  const mobileNavLanguageToggle = document.getElementById('mobileNavLanguageToggle');
  
  if (!mobileNavLanguageToggle) return;
  
  mobileNavLanguageToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-language-overlay';
    overlay.id = 'mobileLanguageOverlay';
    
    // Create drawer
    const drawer = document.createElement('div');
    drawer.className = 'mobile-language-sheet';
    drawer.id = 'mobileLanguageSheet';
    
    drawer.innerHTML = `
      <div class="mobile-language-header">
        <h3 class="mobile-language-title">Sprache wählen</h3>
        <button class="mobile-language-close" id="mobileLanguageClose">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="mobile-language-content">
        <div class="mobile-language-list">
          <a href="#" class="mobile-language-option active" data-lang="de">
            <div class="mobile-lang-code">DE</div>
            <span class="mobile-lang-name">Deutsch</span>
          </a>
          <a href="#" class="mobile-language-option" data-lang="fr">
            <div class="mobile-lang-code">FR</div>
            <span class="mobile-lang-name">Français</span>
          </a>
          <a href="#" class="mobile-language-option" data-lang="it">
            <div class="mobile-lang-code">IT</div>
            <span class="mobile-lang-name">Italiano</span>
          </a>
          <a href="#" class="mobile-language-option" data-lang="en">
            <div class="mobile-lang-code">EN</div>
            <span class="mobile-lang-name">English</span>
          </a>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .mobile-language-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .mobile-language-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      
      .mobile-language-sheet {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        border-radius: 16px 16px 0 0;
        z-index: 1001;
        transform: translateY(100%);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-height: 60vh;
        overflow: hidden;
      }
      
      .mobile-language-sheet.active {
        transform: translateY(0);
      }
      
      .mobile-language-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      
      .mobile-language-title {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #2d3748;
      }
      
      .mobile-language-close {
        background: none;
        border: none;
        padding: 8px;
        cursor: pointer;
        border-radius: 50%;
        transition: background-color 0.2s ease;
        color: #6b7280;
      }
      
      .mobile-language-close:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #374151;
      }
      
      .mobile-language-content {
        padding: 8px 16px 24px;
      }
      
      .mobile-language-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .mobile-language-option {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 12px;
        text-decoration: none;
        border-radius: 12px;
        transition: all 0.2s ease;
        color: #2d3748;
      }
      
      .mobile-language-option:hover {
        background: rgba(233, 37, 31, 0.04);
      }
      
      .mobile-language-option.active {
        background: rgba(233, 37, 31, 0.08);
      }
      
      .mobile-lang-code {
        width: 40px;
        height: 40px;
        background: rgba(233, 37, 31, 0.1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary, #e9251f);
        font-weight: 600;
        font-size: 0.9rem;
        flex-shrink: 0;
      }
      
      .mobile-language-option.active .mobile-lang-code {
        background: var(--primary, #e9251f);
        color: white;
      }
      
      .mobile-lang-name {
        font-size: 1rem;
        font-weight: 500;
        color: #2d3748;
      }
    `;
    document.head.appendChild(style);
    
    // Show drawer
    setTimeout(() => {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 10);
    
    // Close drawer functionality
    const closeDrawer = () => {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        overlay.remove();
        drawer.remove();
        document.head.removeChild(style);
      }, 300);
    };
    
    document.getElementById('mobileLanguageClose').addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    
    // Handle language selection
    const mobileLanguageOptions = document.querySelectorAll('.mobile-language-option');
    mobileLanguageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.getAttribute('data-lang');
        
        // Get language details
        let langCode = 'DE', langName = 'Deutsch', langRegion = 'Schweiz';
        switch(lang) {
          case 'de': 
            langCode = 'DE'; 
            langName = 'Deutsch'; 
            langRegion = 'Schweiz'; 
            break;
          case 'fr': 
            langCode = 'FR'; 
            langName = 'Français'; 
            langRegion = 'Suisse'; 
            break;
          case 'it': 
            langCode = 'IT'; 
            langName = 'Italiano'; 
            langRegion = 'Svizzera'; 
            break;
          case 'en': 
            langCode = 'EN'; 
            langName = 'English'; 
            langRegion = 'International'; 
            break;
        }
        
        // Update mobile nav language display if elements exist
        const mobileNavLanguageCode = document.getElementById('mobileNavLanguageCode');
        const mobileNavLanguageName = document.getElementById('mobileNavLanguageName');
        const mobileNavLanguageRegion = document.getElementById('mobileNavLanguageRegion');
        
        if (mobileNavLanguageCode) mobileNavLanguageCode.textContent = langCode;
        if (mobileNavLanguageName) mobileNavLanguageName.textContent = langName;
        if (mobileNavLanguageRegion) mobileNavLanguageRegion.textContent = langRegion;
        
        // Update desktop language display with animation
        const currentElement = document.querySelector('.language-current');
        if (currentElement && currentElement.textContent !== langCode) {
          currentElement.classList.add('changing');
          
          setTimeout(() => {
            currentElement.textContent = langCode;
          }, 200);
          
          setTimeout(() => {
            currentElement.classList.remove('changing');
          }, 400);
        }
        
        // Update active state
        mobileLanguageOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Close the drawer
        closeDrawer();
        
        console.log('Mobile language changed to:', lang);
      });
    });
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