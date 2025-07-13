/**
 * premium-mobile-nav.js - Premium Mobile Navigation Functionality
 */

// Initialize Premium Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
  initPremiumMobileNavigation();
  initStickyMobileHeader();
});

/**
 * Initializes the premium mobile navigation functionality
 */
function initPremiumMobileNavigation() {
  // Get elements
  const navToggle = document.getElementById('navToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const navLinks = document.querySelectorAll('#mobileNavOverlay .mobile-nav-link, #mobileNavOverlay .mobile-nav-sublink');
  const ctaButton = document.querySelector('#mobileNavOverlay .mobile-nav-cta-button');
  
  // Initialize eventarten submenu
  // initEventartenSubmenu();
  
  // Check if elements exist
  if (!navToggle || !mobileNavOverlay) return;
  
  // Set initial states
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('data-open', 'false');
  mobileNavOverlay.setAttribute('aria-hidden', 'true');
  mobileNavOverlay.setAttribute('data-active', 'false');
  
  // Variables to track state
  let isOpen = false;
  let isAnimating = false;
  
  /**
   * Opens the premium mobile navigation with smooth entrance
   */
  function openPremiumMobileNav() {
    if (isAnimating) return;
    
    isAnimating = true;
    isOpen = true;
    
    // Update button state and add active class for hamburger-to-X
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('data-open', 'true');
    navToggle.classList.add('active');
    
    // Show overlay
    mobileNavOverlay.style.visibility = 'visible';
    mobileNavOverlay.setAttribute('aria-hidden', 'false');
    mobileNavOverlay.setAttribute('data-active', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate navigation items with stagger effect
    setTimeout(() => {
      animateNavigationItems('in');
    }, 100);
      
    // Focus first nav link
    setTimeout(() => {
      const firstNavLink = mobileNavOverlay.querySelector('.mobile-nav-link, .mobile-nav-sublink');
      if (firstNavLink) {
        firstNavLink.focus();
      }
      isAnimating = false;
    }, 400);
  }
  
  /**
   * Closes the premium mobile navigation with smooth exit
   */
  function closePremiumMobileNav() {
    if (isAnimating) return;
    
    isAnimating = true;
    isOpen = false;
    
    // Animate navigation items out
    animateNavigationItems('out');

    // Update button state and remove active class for X-to-hamburger
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('data-open', 'false');
    navToggle.classList.remove('active');
    
    // Hide overlay
    mobileNavOverlay.setAttribute('data-active', 'false');
    mobileNavOverlay.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Hide overlay after animation
    setTimeout(() => {
      mobileNavOverlay.style.visibility = 'hidden';
      isAnimating = false;
    }, 400);
      
    // Return focus to toggle button
    navToggle.focus();
  }

  /**
   * Toggles the premium mobile navigation
   */
  function togglePremiumMobileNav() {
    if (isOpen) {
      closePremiumMobileNav();
    } else {
      openPremiumMobileNav();
    }
  }
  
  /**
   * Animates navigation items with stagger effect
   */
  function animateNavigationItems(direction) {
    const items = mobileNavOverlay.querySelectorAll('.mobile-nav-item, .mobile-nav-subitem, .mobile-nav-cta-section');
    
    // Reset styles before animation
    if (direction === 'in') {
      items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.3s ease';
      });
    }
    
    // Animate items with staggered timing
    items.forEach((item, index) => {
      setTimeout(() => {
        if (direction === 'in') {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
        }
      }, index * 50);
    });
  }
  
  // Toggle button click handler
  navToggle.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    togglePremiumMobileNav();
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isOpen && !isAnimating) {
      closePremiumMobileNav();
    }
  });
  
  // Close when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Small delay to allow navigation to process
      setTimeout(() => {
        closePremiumMobileNav();
      }, 150);
    });
  });

  // Close when clicking CTA button
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
      setTimeout(() => {
        closePremiumMobileNav();
      }, 150);
    });
  }

  // Close when clicking outside overlay content
  mobileNavOverlay.addEventListener('click', function(event) {
    // Only close if clicking the overlay itself, not its contents
    if (event.target === mobileNavOverlay && isOpen && !isAnimating) {
      closePremiumMobileNav();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1025 && isOpen) {
      closePremiumMobileNav();
    }
  });
  
  // Enhanced touch handling for mobile
  let touchStartY = 0;
  let touchStartX = 0;
  
  mobileNavOverlay.addEventListener('touchstart', function(event) {
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
  });
  
  mobileNavOverlay.addEventListener('touchmove', function(event) {
      const touchY = event.touches[0].clientY;
      const touchX = event.touches[0].clientX;
      const deltaY = touchY - touchStartY;
      const deltaX = touchX - touchStartX;
      
    // Close if swiping up significantly (and not swiping horizontally)
    if (deltaY < -100 && Math.abs(deltaX) < 50 && isOpen && !isAnimating) {
      closePremiumMobileNav();
    }
  });

  // Add smooth scroll behavior for internal links with header offset
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          closePremiumMobileNav();
          setTimeout(() => {
            // Calculate header height for proper offset
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = target.offsetTop - headerHeight - 0; // Extra 100px padding for perfect mobile positioning
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 400);
        }
      });
    }
  });

  // Initialize navigation items for animation
  const items = mobileNavOverlay.querySelectorAll('.mobile-nav-item, .mobile-nav-subitem, .mobile-nav-cta-section');
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.3s ease';
  });
}

/**
 * Initializes the Eventarten submenu in mobile navigation
 */
// function initEventartenSubmenu() {
//   // The global function is defined in main.js, but let's open the submenu by default
//   const button = document.querySelector('.mobile-nav-section-header');
//   const submenu = document.getElementById('eventartenSubmenu');
//   const dropdownIcon = document.querySelector('.mobile-nav-dropdown-icon');
  
//   if (button && submenu) {
//     // Set initial expanded state
//     button.setAttribute('aria-expanded', 'true');
    
//     // Open the submenu by default
//     submenu.style.maxHeight = submenu.scrollHeight + 'px';
//     submenu.style.opacity = '1';
    
//     // Rotate the dropdown icon
//     if (dropdownIcon) {
//       dropdownIcon.style.transform = 'rotate(180deg)';
//     }
    
//     // Apply styles to subitems
//     const subItems = submenu.querySelectorAll('.mobile-nav-subitem');
//     subItems.forEach((item, index) => {
//       item.style.opacity = '1';
//       item.style.transform = 'translateY(0px)';
//       item.style.transition = '0.3s';
//     });
//   }
// }

// Define the toggleEventartenSubmenu function globally
window.toggleEventartenSubmenu = function() {
  const button = document.querySelector('.mobile-nav-section-header');
  const submenu = document.getElementById('eventartenSubmenu');
  const dropdownIcon = document.querySelector('.mobile-nav-dropdown-icon');
  
  if (button && submenu && dropdownIcon) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Toggle the aria-expanded attribute
    button.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle submenu visibility
    if (isExpanded) {
      submenu.style.maxHeight = '0px';
      submenu.style.opacity = '0';
      dropdownIcon.style.transform = 'rotate(0deg)';
    } else {
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
      submenu.style.opacity = '1';
      dropdownIcon.style.transform = 'rotate(180deg)';
    }
  }
};

/**
 * Initializes sticky mobile header behavior
 */
function initStickyMobileHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  let isScrollingDown = false;
  let isScrollingUp = false;
  let scrollTimeout;
  
  // Throttle scroll events for better performance
  let ticking = false;
  
  // Check if we're on mobile
  function isMobile() {
    return window.innerWidth <= 992;
  }
  
  /**
   * Updates header state based on scroll position and direction
   */
  function updateHeaderState() {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;
    const scrollThreshold = 5; // Minimum scroll distance to trigger state change
    
    // Update CSS custom property for header height
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    
    // Only apply mobile sticky behavior on mobile devices
    if (!isMobile()) {
      // Remove all mobile classes on desktop
      header.classList.remove('mobile-compact', 'mobile-top');
      ticking = false;
      return;
    }
    
    // Remove any desktop scrolled class that might interfere
    header.classList.remove('scrolled');
    
    // Apply header states based on scroll position - Simple shrinking behavior
    if (currentScrollY <= 20) {
      // At top of page - show full header
      header.classList.remove('mobile-compact');
      header.classList.add('mobile-top');
    } else {
      // Scrolled down - show compact header (ALWAYS VISIBLE)
      header.classList.remove('mobile-top');
      header.classList.add('mobile-compact');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  /**
   * Throttled scroll handler
   */
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
  }
  
  // Initial state
  updateHeaderState();
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    // Update header state for current viewport
    updateHeaderState();
  });
  
  // Handle orientation change
  window.addEventListener('orientationchange', function() {
    setTimeout(() => {
      updateHeaderState();
    }, 100);
  });
}