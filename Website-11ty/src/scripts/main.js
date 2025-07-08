document.addEventListener('DOMContentLoaded', () => {
  // Initialize Header Scroll Effects
  initHeaderScroll();
  
  // Initialize Mobile Navigation
  initMobileNavigation();
  
  // Initialize Scroll To Top Button
  initScrollToTop();
  
  // Initialize Smooth Scrolling for Anchor Links
  initSmoothScrolling();
  
  // Initialize Process Timeline Animation
  initProcessTimeline();
  
  // Initialize Contact Form
  initContactForm();
  
  // Initialize Active Nav Link Highlighting
  initActiveNavLinks();
  
  // Initialize Navigation Dropdowns
  initNavigationDropdowns();
  
  // Initialize Legal Drawer
  initLegalDrawer();
  
  // Initialize Video Fallback
  initVideoFallback();
  
  // Initialize On-Scroll Animations
  animateOnScroll();
});

// Handle Header Scroll Effects
function initHeaderScroll() {
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  let isAtTop = true;
  let isScrollingUp = false;
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    isScrollingUp = currentScrollY < lastScrollY;
    
    // Detect if we're at the top of the page
    const wasAtTop = isAtTop;
    isAtTop = currentScrollY <= 50;
    
    // Only apply transitions when needed
    if (isScrollingUp && !wasAtTop && isAtTop) {
      // Apply transition only when returning to the top
      header.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      console.log('Smooth scroll-up transition applied');
    } else if (!isAtTop) {
      // Apply transition when scrolling down
      header.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    // Add 'scrolled' class to header when page is scrolled
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update scroll progress bar
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (currentScrollY / scrollHeight) * 100;
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercentage}%`;
    }
    
    // Update last scroll position for next comparison
    lastScrollY = currentScrollY;
  });
}

// Handle Mobile Navigation
function initMobileNavigation() {
  // Mobile navigation is now handled by radial-menu.js
  // This function is kept for backward compatibility
  // with existing code that might expect it to be defined
  
  // We're not manipulating the navMenu directly anymore as
  // the radial menu component handles all mobile navigation interactions
  
  // Note: The event handler on the navToggle button is now 
  // managed in radial-menu.js with the radial reveal animation
}

// Handle Legal Drawer in Mobile Navigation
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

// Handle Scroll To Top Button
function initScrollToTop() {
  const scrollToTopBtn = document.querySelector('.scroll-top-button');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Make the footer contact items interactive (simple hover effect for icon)
  const contactItems = document.querySelectorAll('.footer-contact-item');
  contactItems.forEach(item => {
    const icon = item.querySelector('.contact-icon');
    if (icon) {
      // The CSS :hover state on .footer-contact-item .contact-icon already handles this
      // This JS version is kept for potential future advanced animations if needed
    }
  });
}

// Handle Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Add extra offset to ensure clean landing without black bar
        const extraOffset = -65; // Increased from 20px to 100px for perfect alignment
        const targetPosition = targetElement.offsetTop - headerHeight - extraOffset;
        
        window.scrollTo({
          top: Math.max(0, targetPosition), // Ensure we don't scroll to negative position
          behavior: 'smooth'
        });
        
        // Update active nav link when clicking on navigation items
        updateActiveNavLink(targetId);
      }
    });
  });
}

// Handle Active Navigation Link Highlighting
function initActiveNavLinks() {
  // Disable automatic scroll-based highlighting to prevent unwanted hover effects
  // Initial check on page load - commented out
  // highlightActiveSection();
  
  // Update on scroll - commented out to prevent scroll-triggered hover effects
  // window.addEventListener('scroll', throttle(highlightActiveSection, 100));
}

// Update which navigation link is active based on visible sections
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  
  let currentSectionId = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - document.getElementById('header').offsetHeight;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSectionId = '#' + section.getAttribute('id');
    }
  });
  
  if (currentSectionId) {
    updateActiveNavLink(currentSectionId);
  }
}

// Update the active class on navigation links
function updateActiveNavLink(sectionId) {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  // Check if we're on the homepage or an inner page
  const isHomePage = currentPath === '/' || currentPath.endsWith('index.html');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    if (isHomePage) {
      // On homepage, highlight based on section ID - only if we have a valid section ID
      const linkHref = link.getAttribute('href');
      if (sectionId && linkHref === sectionId) {
        link.classList.add('active');
      }
    } else {
      // On inner pages, check the pathname
      const linkPath = link.getAttribute('href');
      
      // If it's a relative link to the current page or an explicit match
      if (linkPath === '#' || 
          (linkPath.includes('/') && currentPath.includes(linkPath.split('#')[0]))) {
        link.classList.add('active');
      }
    }
  });
  
  // TODO: Extend active link logic for inner pages (check window.location.pathname)
  // For multi-page sites, this function should be extended to:
  // 1. Check if we're on an inner page by examining window.location.pathname
  // 2. Add 'active' class to corresponding main nav item for that page
  // 3. Implement a breadcrumb system for deeper navigation if needed
}

// Handle Navigation Dropdowns
function initNavigationDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const languageSwitcher = document.querySelector('.language-switcher');
  
  // Handle navigation dropdowns
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    
    if (toggle && menu) {
      // Handle hover events
      dropdown.addEventListener('mouseenter', () => {
        toggle.setAttribute('aria-expanded', 'true');
        menu.style.display = 'block';
      });
      
      dropdown.addEventListener('mouseleave', () => {
        toggle.setAttribute('aria-expanded', 'false');
        // Small delay to prevent flickering
        setTimeout(() => {
          if (toggle.getAttribute('aria-expanded') === 'false') {
            menu.style.display = 'none';
          }
        }, 100);
      });
      
      // Handle keyboard navigation
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        menu.style.display = isExpanded ? 'none' : 'block';
      });
      
      // Close on escape key
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          toggle.setAttribute('aria-expanded', 'false');
          menu.style.display = 'none';
          toggle.focus();
        }
      });
    }
  });
  
  // Handle language switcher
  if (languageSwitcher) {
    const toggle = languageSwitcher.querySelector('.language-switcher-toggle');
    const menu = languageSwitcher.querySelector('.language-switcher-menu');
    const options = languageSwitcher.querySelectorAll('.language-option');
    
    if (toggle && menu) {
      // Handle hover events
      languageSwitcher.addEventListener('mouseenter', () => {
        toggle.setAttribute('aria-expanded', 'true');
        menu.style.display = 'block';
      });
      
      languageSwitcher.addEventListener('mouseleave', () => {
        toggle.setAttribute('aria-expanded', 'false');
        setTimeout(() => {
          if (toggle.getAttribute('aria-expanded') === 'false') {
            menu.style.display = 'none';
          }
        }, 100);
      });
      
      // Handle click events
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        menu.style.display = isExpanded ? 'none' : 'block';
      });
      
      // Handle language selection
      options.forEach(option => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Remove active class from all options
          options.forEach(opt => opt.classList.remove('active'));
          
          // Add active class to selected option
          option.classList.add('active');
          
          // Update the toggle text
          const langCode = option.dataset.lang?.toUpperCase() || 'DE';
          const currentSpan = toggle.querySelector('.language-current');
          if (currentSpan) {
            currentSpan.textContent = langCode;
          }
          
          // Close the menu
          toggle.setAttribute('aria-expanded', 'false');
          menu.style.display = 'none';
          
          // Here you would typically handle the actual language change
          console.log('Language changed to:', option.dataset.lang);
        });
      });
      
      // Close on escape key
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          toggle.setAttribute('aria-expanded', 'false');
          menu.style.display = 'none';
          toggle.focus();
        }
      });
    }
  }
  
  // Close dropdowns when clicking CTA buttons in mega menu
  const promoCTAButtons = document.querySelectorAll('.promo-cta');
  promoCTAButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Close all open dropdowns
      dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const menu = dropdown.querySelector('.nav-dropdown-menu');
        if (toggle && menu) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.style.display = 'none';
        }
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const menu = dropdown.querySelector('.nav-dropdown-menu');
        if (toggle && menu) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.style.display = 'none';
        }
      }
    });
    
    if (languageSwitcher && !languageSwitcher.contains(e.target)) {
      const toggle = languageSwitcher.querySelector('.language-switcher-toggle');
      const menu = languageSwitcher.querySelector('.language-switcher-menu');
      if (toggle && menu) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.style.display = 'none';
      }
    }
  });
}

// Throttle function to limit how often a function is called
function throttle(func, delay) {
  let lastCall = 0;
  return function() {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func.apply(this, arguments);
    }
  };
}

// Advanced process section animations with precise trigger points
function initProcessTimeline() {
  const processSection = document.querySelector('.process');
  const processSteps = document.querySelectorAll('.process-step');
  const timelineIndicator = document.querySelector('.timeline-progress-indicator');
  const processTimeline = document.querySelector('.process-timeline');

  if (!processSection || !processTimeline || !timelineIndicator) {
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

  let scrollTimeout;
  let lastScrollY = window.scrollY;

  function handleScroll() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    lastScrollY = window.scrollY; // Update lastScrollY here
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
    timelineIndicator.style.height = `${progressPercentage}%`;

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
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      timelineIndicator.style.opacity = '1';
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); 
      updateScrollProgress(); 
    } else {
      window.removeEventListener('scroll', handleScroll);
      // timelineIndicator.style.opacity = '0'; // Optional: hide when out of view
    }
  }, { threshold: 0.1 });

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

// Handle Contact Form Submission
function initContactForm() {
  const contactForm = document.getElementById('eventWebsiteForm');
  const successMessage = document.getElementById('successMessage');
  
  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic client-side validation (HTML5 `required` attributes handle most of this)
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
          if (!field.value.trim()) {
              isValid = false;
              // Optional: Add some visual feedback for empty required fields
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
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Show success message
        if (successMessage) {
          successMessage.classList.add('visible');
        }
        
        // Reset form
        contactForm.reset();
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          if (successMessage) {
            successMessage.classList.remove('visible');
          }
        }, 5000);
      }, 1500);
      
      // For actual implementation, uncomment and modify this code:
      /*
      fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
      .then(response => response.json())
      .then(data => {
        // Show success message
        if (successMessage) {
          successMessage.classList.add('visible');
        }
        
        // Reset form
        contactForm.reset();
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          if (successMessage) {
            successMessage.classList.remove('visible');
          }
        }, 5000);
      })
      .catch(error => {
        console.error('Error:', error);
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
      });
      */
    });
  }
}

// Handle Viewport Animation for Elements - This is now handled in animations.js
function animateOnScroll() {
  // This function is maintained for compatibility, but the main animation
  // logic is now in the animations.js file for better organization
  
  // Handle legacy animation elements
  const legacyElements = document.querySelectorAll('.animate-on-scroll');
  if (legacyElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  
    legacyElements.forEach(element => {
    observer.observe(element);
  });
  }
}

// Initialize fallback for hero video if not loaded
function initVideoFallback() {
  const heroVideo = document.getElementById('heroVideo');
  const heroSection = document.querySelector('.hero');
  
  if (heroVideo && heroSection) {
    // Check if video loaded successfully within timeout
    let videoLoaded = false;
    const videoTimeout = setTimeout(() => {
      if (!videoLoaded) {
        console.log("Video load timeout - applying fallback");
        heroSection.classList.add('video-fallback');
      }
    }, 3000);
    
    // Handle successful video load
    heroVideo.addEventListener('loadeddata', () => {
      videoLoaded = true;
      clearTimeout(videoTimeout);
      console.log("Hero video loaded successfully");
      
      // Apply subtle zoom animation
      setTimeout(() => {
        heroVideo.style.animation = 'subtle-zoom 30s infinite alternate ease-in-out';
      }, 500);
    });
    
    // Handle video errors
    heroVideo.addEventListener('error', (e) => {
      clearTimeout(videoTimeout);
      console.error("Hero video error:", e);
      heroSection.classList.add('video-fallback');
      
      // Create a high-quality gradient fallback
      const fallbackBg = document.createElement('div');
      fallbackBg.classList.add('hero-fallback-bg');
      heroSection.querySelector('.hero-bg').appendChild(fallbackBg);
    });
    
    // Handle mobile devices and reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
        window.innerWidth < 768) {
      heroVideo.setAttribute('preload', 'none');
      heroVideo.removeAttribute('autoplay');
      heroSection.classList.add('video-fallback');
    }
    
    // Ensure hero fills viewport with proper header offset
    const header = document.getElementById('header');
    const adjustHeroHeight = () => {
      const headerHeight = header ? header.offsetHeight : 0;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    };
    
    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);
  }
} 