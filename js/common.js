// Common JavaScript functionality

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(event.target) && 
        !mobileMenuToggle.contains(event.target)) {
      navLinks.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
  });

  // Header background change on scroll
  const header = document.getElementById('main-header');
  let lastScrollPosition = 0;
  
  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 50) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollPosition = currentScrollPosition;
  });

  // Generic lightbox functionality for gallery
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    initLightbox();
  }
});

// Initialize lightbox
function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const galleryImages = document.querySelectorAll('.gallery-image');
  
  let currentImageIndex = 0;
  
  // Open lightbox on image click
  galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
      currentImageIndex = index;
      const imageSrc = image.getAttribute('src');
      const imageAlt = image.getAttribute('alt');
      
      lightboxImage.setAttribute('src', imageSrc);
      lightboxImage.setAttribute('alt', imageAlt);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Navigate to previous image
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    });
  }
  
  // Navigate to next image
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      updateLightboxImage();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    } else if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      updateLightboxImage();
    }
  });
  
  function updateLightboxImage() {
    const imageSrc = galleryImages[currentImageIndex].getAttribute('src');
    const imageAlt = galleryImages[currentImageIndex].getAttribute('alt');
    
    lightboxImage.setAttribute('src', imageSrc);
    lightboxImage.setAttribute('alt', imageAlt);
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}