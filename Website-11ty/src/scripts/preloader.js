/**
 * preloader.js - Minimalist, enterprise-grade preloader
 * Optimized for performance with clean visual hierarchy
 */

class EventPreloader {
  constructor(options = {}) {
    // Streamlined options
    this.options = {
      minDisplayTime: 1800,    // Minimum display time for brand impact
      fadeOutTime: 600,        // Clean fade out duration
      progressSmoothing: true, // Smooth progress animation
      ...options
    };
    
    // DOM elements
    this.preloader = document.getElementById('preloader');
    this.progressBar = document.getElementById('preloaderProgressBar');
    this.progressPercentage = document.getElementById('preloaderProgressPercentage');
    
    // State variables
    this.loadStartTime = Date.now();
    this.resourcesLoaded = false;
    this.minTimeElapsed = false;
    this.progress = 0;
    this.targetProgress = 0;
    this.progressFrame = null;
    this.systemReady = false;
    
    // Resource tracking
    this.resourcesTotal = 0;
    this.resourcesLoaded = 0;
    
    // Initialize
    this.init();
  }
  
  init() {
    // Validation
    if (!this.preloader || !this.progressBar) {
      console.warn('Preloader elements not found');
      document.body.classList.add('content-loaded');
      return;
    }
    
    // Ensure content is initially hidden
    document.body.classList.remove('content-loaded');
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.options.progressSmoothing = false;
      this.options.minDisplayTime = 800; // Shorter time for accessibility
    }
    
    // Begin tracking page resources
    this.startProgressTracking();
    this.trackResources();
    
    // Main event listeners
    window.addEventListener('load', () => this.onWindowLoaded());
    
    // Ensure minimum display time
    setTimeout(() => {
      this.minTimeElapsed = true;
      this.checkReadyToHide();
    }, this.options.minDisplayTime);
    
    // Safety fallback
    setTimeout(() => {
      if (this.preloader && !this.systemReady) {
        this.targetProgress = 100;
        this.finishLoading();
      }
    }, Math.max(8000, this.options.minDisplayTime + 3000));
  }
  
  /**
   * Start progress animation
   */
  startProgressTracking() {
    this.incrementProgress();
  }
  
  /**
   * Track all page resources
   */
  trackResources() {
    // Collect trackable resources
    const resources = [
      ...Array.from(document.images),
      ...Array.from(document.querySelectorAll('video')),
      ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')),
      ...Array.from(document.querySelectorAll('script:not([data-preloader-ignore])'))
    ];
    
    this.resourcesTotal = resources.length;
    let loadedCount = 0;
    
    // Check initially loaded resources
    resources.forEach(resource => {
      if (this.isResourceLoaded(resource)) {
        loadedCount++;
        this.updateProgress(loadedCount);
      } else {
        // Add listeners for resource load events
        const loadHandler = () => {
          loadedCount++;
          this.updateProgress(loadedCount);
        };
        
        resource.addEventListener('load', loadHandler, { once: true });
        resource.addEventListener('error', loadHandler, { once: true });
      }
    });
    
    // Ensure some initial progress for empty pages
    if (this.resourcesTotal === 0 || loadedCount === this.resourcesTotal) {
      this.targetProgress = Math.max(this.targetProgress, 50);
      this.updateVisualProgress();
    }
  }
  
  /**
   * Check if a resource is already loaded
   */
  isResourceLoaded(resource) {
    if (!resource) return true;
    
    if (resource.tagName === 'IMG') {
      return resource.complete;
    } else if (resource.tagName === 'VIDEO') {
      return resource.readyState >= 3;
    } else if (resource.tagName === 'LINK') {
      return resource.sheet !== null;
    } else if (resource.tagName === 'SCRIPT') {
      return resource.readyState === 'complete' || resource.readyState === 'loaded';
    }
    return true;
  }
  
  /**
   * Update progress based on loaded resources
   */
  updateProgress(loadedCount) {
    if (!this.resourcesTotal) return;
    
    const percentage = (loadedCount / this.resourcesTotal) * 90; // Reserve 10% for final transition
    this.targetProgress = Math.max(this.targetProgress, Math.floor(percentage));
  }
  
  /**
   * Handle window load event
   */
  onWindowLoaded() {
    // Quickly ramp up to 90%
    this.targetProgress = Math.max(this.targetProgress, 90);
    
    // Mark resources as loaded
    this.resourcesLoaded = true;
    
    // Check if we can hide
    this.checkReadyToHide();
  }
  
  /**
   * Main progress animation loop
   */
  incrementProgress() {
    if (!this.options.progressSmoothing) {
      // Simple mode for reduced motion
      this.progress = this.targetProgress;
      this.updateVisualProgress();
      this.progressFrame = requestAnimationFrame(() => this.incrementProgress());
      return;
    }
    
    // Smooth progress animation
    if (this.progress < this.targetProgress) {
      const gap = this.targetProgress - this.progress;
      const increment = Math.max(0.2, gap * 0.07);
      
      this.progress += increment;
      this.updateVisualProgress();
    }
    
    // Final completion when resources loaded
    if (this.resourcesLoaded && this.minTimeElapsed && this.progress >= this.targetProgress && this.progress < 100) {
      this.progress += (100 - this.progress) * 0.08;
      
      if (this.progress > 99.5) {
        this.progress = 100;
        this.finishLoading();
      }
      
      this.updateVisualProgress();
    }
    
    // Continue animation loop
    this.progressFrame = requestAnimationFrame(() => this.incrementProgress());
  }
  
  /**
   * Update visual progress indicators
   */
  updateVisualProgress() {
    // Update progress bar
    if (this.progressBar) {
      this.progressBar.style.width = `${this.progress}%`;
    }
    
    // Update percentage text
    if (this.progressPercentage) {
      const roundedProgress = Math.floor(this.progress);
      if (this.lastDisplayedPercentage !== roundedProgress) {
        this.progressPercentage.textContent = `${roundedProgress}%`;
        this.lastDisplayedPercentage = roundedProgress;
      }
    }
  }
  
  /**
   * Check if ready to hide
   */
  checkReadyToHide() {
    if (this.resourcesLoaded && this.minTimeElapsed && !this.systemReady) {
      this.finishLoading();
    }
  }
  
  /**
   * Complete loading process
   */
  finishLoading() {
    if (this.systemReady) return;
    this.systemReady = true;
    
    // Hide immediately
    this.hide();
  }
  
  /**
   * Hide the preloader
   */
  hide() {
    if (!this.preloader) return;
    
    // Stop animation loop
    if (this.progressFrame) {
      cancelAnimationFrame(this.progressFrame);
      this.progressFrame = null;
    }
    
    // Ensure all content is loaded before transitioning
    Promise.all([
      // Add any critical resources that should block the transition
      document.fonts.ready, // Wait for fonts to load
      new Promise(resolve => setTimeout(resolve, 100)) // Small buffer
    ]).then(() => {
      // Add hidden class for fade out
      this.preloader.classList.add('hidden');
      
      // Remove from DOM after animation
      setTimeout(() => {
        if (this.preloader && this.preloader.parentNode) {
          this.preloader.parentNode.removeChild(this.preloader);
        }
        
        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('preloaderHidden'));
        
        // Clean up
        this.cleanup();
      }, this.options.fadeOutTime);
    });
  }
  
  /**
   * Clean up resources
   */
  cleanup() {
    this.preloader = null;
    this.progressBar = null;
    this.progressPercentage = null;
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new EventPreloader({
    minDisplayTime: 1800,
    progressSmoothing: true
  });
}); 