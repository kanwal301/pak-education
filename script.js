// Performance Detection for Mobile Optimization
const isMobileOrTablet = () => window.innerWidth <= 768;
const isLowPerformanceDevice = () => navigator.deviceMemory && navigator.deviceMemory <= 2;

// Photo Slider - Auto-rotation every 5 seconds
const photos = document.querySelectorAll('#photo-slider img');
let current = 0;

setInterval(() => {
  if (photos.length > 0) {
    photos[current].classList.add('hidden');
    current = (current + 1) % photos.length;
    photos[current].classList.remove('hidden');
  }
}, 5000);

// Reduce animation complexity on mobile devices
if (isMobileOrTablet()) {
  const style = document.createElement('style');
  style.textContent = `
    .wave-line.wave1,
    .wave-line.wave2,
    .wave-line.wave4,
    .wave-line.wave6,
    .wave-line.wave7 {
      display: none !important;
    }
    
    .rotating-circle.clockwise,
    .rotating-circle.counterclockwise {
      animation-duration: 8s !important;
    }
    
    #admin, #teacher, #student {
      animation-duration: 12s !important;
    }
  `;
  document.head.appendChild(style);
}

// Reduce on low-performance devices
if (isLowPerformanceDevice()) {
  const style = document.createElement('style');
  style.textContent = `
    * {
      animation-duration: var(--slow-animation, 1s) !important;
    }
    
    .wave-line {
      display: none !important;
    }
    
    .nav-box {
      animation: none !important;
    }
  `;
  document.head.appendChild(style);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Intersection Observer for Lazy Animation Trigger
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply observer to portal sections
document.querySelectorAll('#admin, #teacher, #student').forEach(el => {
  el.style.opacity = '0.8';
  el.style.transform = 'translateY(10px)';
  observer.observe(el);
});