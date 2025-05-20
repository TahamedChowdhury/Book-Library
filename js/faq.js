// FAQ page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize FAQ accordion functionality
  initFaqAccordion();
  
  // Initialize FAQ filtering by category
  initFaqCategoryFilter();
  
  // Initialize FAQ search functionality
  initFaqSearch();
});

// Initialize FAQ accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQs
      faqItems.forEach(faq => {
        faq.classList.remove('active');
      });
      
      // Toggle current FAQ
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Initialize FAQ category filtering
function initFaqCategoryFilter() {
  const categoryButtons = document.querySelectorAll('.faq-category');
  const faqItems = document.querySelectorAll('.faq-item');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      categoryButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      
      // Filter items
      faqItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      
      // Check if no items are displayed
      checkNoResults();
    });
  });
}

// Initialize FAQ search functionality
function initFaqSearch() {
  const searchInput = document.getElementById('faq-search-input');
  const faqItems = document.querySelectorAll('.faq-item');
  const notFoundMessage = document.getElementById('faq-not-found');
  
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      let resultsFound = false;
      
      // Clear category filters when searching
      const categoryButtons = document.querySelectorAll('.faq-category');
      categoryButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      document.querySelector('[data-category="all"]').classList.add('active');
      
      if (searchTerm === '') {
        // Show all items when search is empty
        faqItems.forEach(item => {
          item.style.display = 'block';
        });
        resultsFound = true;
      } else {
        // Filter items based on search term
        faqItems.forEach(item => {
          const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
          const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
          
          if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
            resultsFound = true;
          } else {
            item.style.display = 'none';
          }
        });
      }
      
      // Show or hide no results message
      if (notFoundMessage) {
        notFoundMessage.style.display = resultsFound ? 'none' : 'block';
      }
    });
  }
}

// Helper function to check if no results are displayed
function checkNoResults() {
  const faqItems = document.querySelectorAll('.faq-item');
  const notFoundMessage = document.getElementById('faq-not-found');
  let visibleItems = 0;
  
  faqItems.forEach(item => {
    if (item.style.display !== 'none') {
      visibleItems++;
    }
  });
  
  if (notFoundMessage) {
    notFoundMessage.style.display = visibleItems > 0 ? 'none' : 'block';
  }
}