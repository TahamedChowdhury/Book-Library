// Home page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Testimonial slider functionality
  initTestimonialSlider();
  
  // Gallery item initialization
  initGallery();
  
  // Newsletter form validation
  initNewsletterForm();
});

// Initialize testimonial slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevButton = document.querySelector('.prev-testimonial');
  const nextButton = document.querySelector('.next-testimonial');
  
  if (!testimonials.length) return;
  
  let currentIndex = 0;
  let interval;
  
  // Start automatic slider
  startSliderInterval();
  
  // Handle dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      currentIndex = index;
      updateSlider();
      startSliderInterval();
    });
  });
  
  // Handle previous button
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      clearInterval(interval);
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateSlider();
      startSliderInterval();
    });
  }
  
  // Handle next button
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      clearInterval(interval);
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
      startSliderInterval();
    });
  }
  
  function updateSlider() {
    // Update testimonials
    testimonials.forEach((testimonial, index) => {
      if (index === currentIndex) {
        testimonial.classList.add('active');
      } else {
        testimonial.classList.remove('active');
      }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function startSliderInterval() {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    }, 5000);
  }
}

// Initialize gallery
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    // Set animation delay for staggered appearance
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Trigger animation when scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(item);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(item);
  });
}

// Initialize newsletter form
function initNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (validateEmail(email)) {
        // Simulate form submission
        newsletterForm.innerHTML = '<div class="success-message">Thank you for subscribing to our newsletter!</div>';
      } else {
        // Show error
        if (!newsletterForm.querySelector('.error-message')) {
          const errorMessage = document.createElement('div');
          errorMessage.classList.add('error-message');
          errorMessage.textContent = 'Please enter a valid email address.';
          errorMessage.style.color = 'var(--color-error)';
          errorMessage.style.marginTop = 'var(--spacing-xs)';
          emailInput.parentNode.appendChild(errorMessage);
          
          // Clear error on input
          emailInput.addEventListener('input', () => {
            errorMessage.style.display = 'none';
          });
        } else {
          newsletterForm.querySelector('.error-message').style.display = 'block';
        }
      }
    });
  }
}

// Email validation helper
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}