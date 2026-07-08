// AVS - Main JavaScript File
// Handles smooth scrolling, interactions, and animations

document.addEventListener('DOMContentLoaded', function() {
  console.log('AVS Application Loaded');

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or if it's a tab/modal trigger
      if (href === '#' || href === '#login' || href === '#signup' || href === '#demo') {
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe feature cards, pricing cards, and sections
  const animatedElements = document.querySelectorAll(
    '.feature-card, .pricing-card, .about, .contact'
  );
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ===== NAVBAR ACTIVE LINK HIGHLIGHT =====
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== FORM HANDLING =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = this.querySelector('input[placeholder="Your Name"]').value;
      const email = this.querySelector('input[placeholder="Your Email"]').value;
      const company = this.querySelector('input[placeholder="Company Name"]').value;
      const message = this.querySelector('textarea').value;

      // Basic validation
      if (!name || !email || !company || !message) {
        alert('Please fill in all fields');
        return;
      }

      // Show success message
      alert(`Thank you ${name}! We'll contact you at ${email} soon.`);
      
      // Reset form
      this.reset();
    });
  }

  // ================================
// Pricing / Stripe
// ================================

const proBtn = document.getElementById("pro-btn");

if (proBtn) {
    proBtn.addEventListener("click", async () => {

        // Stripe Checkout will go here later

        console.log("Upgrade to Pro clicked!");

    });
}
  // ===== BUTTON HOVER EFFECTS =====
  const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // ===== PRICING CARD INTERACTION =====
  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (this.classList.contains('featured')) {
        this.style.transform = 'scale(1.05)';
      } else {
        this.style.transform = 'translateY(0) scale(1)';
      }
    });
  });

  // ===== FEATURE CARD GLOW EFFECT =====
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'none';
    });
  });

  // ===== SCROLL TO TOP BUTTON =====
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Create scroll to top button if it doesn't exist
  if (!scrollToTopBtn) {
    const btn = document.createElement('button');
    btn.id = 'scrollToTop';
    btn.innerHTML = '↑';
    btn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: var(--red-dark, #d72638);
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 999;
      display: none;
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.display = 'block';
        btn.style.opacity = '1';
      } else {
        btn.style.opacity = '0';
        setTimeout(() => btn.style.display = 'none', 300);
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    btn.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'var(--gold, #d4af37)';
      this.style.color = 'var(--bg-dark, #0b0b0f)';
      this.style.transform = 'scale(1.1)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'var(--red-dark, #d72638)';
      this.style.color = 'white';
      this.style.transform = 'scale(1)';
    });
  }

  // ===== MOBILE MENU TOGGLE (if you add a hamburger menu later) =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // ===== PAGE PERFORMANCE MONITORING =====
  if (window.performance) {
    window.addEventListener('load', function() {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
  }

  // ===== LAZY LOADING IMAGES (if you add images later) =====
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
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
  }

  // ===== LOCAL STORAGE UTILITIES =====
  window.storageHelper = {
    set: function(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log('LocalStorage not available:', e);
      }
    },
    get: function(key) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        console.log('LocalStorage not available:', e);
        return null;
      }
    },
    remove: function(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.log('LocalStorage not available:', e);
      }
    }
  };

  // ===== USER PREFERENCES =====
  // Check if user has been here before
  const hasVisited = window.storageHelper.get('avsVisited');
  if (!hasVisited) {
    console.log('Welcome to AVS!');
    window.storageHelper.set('avsVisited', true);
    window.storageHelper.set('firstVisitDate', new Date().toISOString());
  }

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener('keydown', function(event) {
    // Escape key to scroll to top
    if (event.key === 'Escape') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Ctrl/Cmd + K to focus search (if you add search later)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      const searchInput = document.querySelector('input[type="search"]');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });

  // ===== CLICK TRACKING =====
  document.addEventListener('click', function(e) {
    if (e.target.matches('a, button')) {
      const element = e.target.tagName === 'A' ? e.target : e.target.closest('a, button');
      if (element) {
        const text = element.textContent || element.innerText;
        console.log('Clicked:', text);
      }
    }
  });

  // ===== CONSOLE MESSAGE =====
  console.log('%c🎯 AVS - Real-Time Verification Protection', 'font-size: 20px; color: #d4af37; font-weight: bold;');
  console.log('%cBuilt with Firebase & JavaScript', 'font-size: 12px; color: #d72638;');
});

// ===== UTILITY FUNCTIONS =====

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Debounce function for performance
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

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
    color: white;
    border-radius: 5px;
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Export for use in other files
window.AVS = {
  validateEmail,
  debounce,
  throttle,
  formatDate,
  showNotification,
  storageHelper: window.storageHelper
};
