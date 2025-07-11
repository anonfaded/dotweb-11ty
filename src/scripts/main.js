import { initContactAnimations, initFooterAnimations, initPortfolioAnimations, initProcessAnimations } from './animations.js';

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
  
  // Initialize Language Drawer
  initLanguageDrawer();
  
  // Initialize Video Fallback
  initVideoFallback();
  
  // Initialize On-Scroll Animations
  animateOnScroll();
  
  // Initialize component-specific animations
  initPortfolioAnimations();
  initProcessAnimations();
  initContactAnimations();
  initFooterAnimations();
});

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

// Process timeline animation
function initProcessTimeline() {
  const processTimeline = document.querySelector('.process-timeline');
  if (!processTimeline) return;
  
  const processSteps = processTimeline.querySelectorAll('.process-step');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.3
  });
  
  processSteps.forEach(step => {
    observer.observe(step);
  });
}

// Contact form initialization
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Form submission logic would go here
    const formData = new FormData(contactForm);
    
    // Example: Display success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('form-success');
    successMessage.textContent = 'Thank you for your message. We will get back to you soon.';
    
    contactForm.innerHTML = '';
    contactForm.appendChild(successMessage);
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