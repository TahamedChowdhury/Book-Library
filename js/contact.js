// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize contact form validation
  initContactForm();
  
  // Animate map elements
  animateMapElements();
});

// Initialize contact form with validation
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      
      // Reset previous error messages
      document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
      });
      
      // Validate fields
      let isValid = true;
      
      // Name validation
      if (!nameInput.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter your name';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
      }
      
      // Email validation
      if (!validateEmail(emailInput.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
      }
      
      // Subject validation
      if (!subjectInput.value) {
        document.getElementById('subject-error').textContent = 'Please select a subject';
        document.getElementById('subject-error').style.display = 'block';
        isValid = false;
      }
      
      // Message validation
      if (!messageInput.value.trim()) {
        document.getElementById('message-error').textContent = 'Please enter your message';
        document.getElementById('message-error').style.display = 'block';
        isValid = false;
      }
      
      // If all validations pass
      if (isValid) {
        // Simulate form submission
        contactForm.reset();
        document.getElementById('form-success').style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          document.getElementById('form-success').style.display = 'none';
        }, 5000);
      }
    });
    
    // Clear error messages on input
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        const fieldName = field.getAttribute('id');
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
          errorElement.style.display = 'none';
        }
      });
    });
  }
}

// Animate map elements with a subtle bounce effect
function animateMapElements() {
  const mapPin = document.querySelector('.map-pin');
  
  if (mapPin) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mapPin.style.animation = 'mapPinBounce 1s ease-in-out';
          observer.unobserve(mapPin);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(mapPin);
  }
  
  // Add CSS for the animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes mapPinBounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
  `;
  document.head.appendChild(style);
}

// Email validation helper
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}