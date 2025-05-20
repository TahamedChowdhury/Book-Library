// About page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Animate timeline items
  animateTimeline();
  
  // Team member animations
  animateTeamMembers();
  
  // Values animations
  animateValues();
});

// Animate timeline items with staggered delay
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    // Set custom property for staggered animation
    item.style.setProperty('--i', index);
  });
  
  // Animate timeline items when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${entry.target.style.getPropertyValue('--i') * 0.2}s`;
        entry.target.style.animation = 'fadeIn 0.6s forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Animate team members with staggered appearance
function animateTeamMembers() {
  const teamMembers = document.querySelectorAll('.team-member');
  
  teamMembers.forEach((member, index) => {
    // Initially hide team members
    member.style.opacity = '0';
    member.style.transform = 'translateY(20px)';
    
    // Animate when scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
          }, index * 150);
          observer.unobserve(member);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(member);
  });
}

// Animate values section
function animateValues() {
  const valueCards = document.querySelectorAll('.value-card');
  
  valueCards.forEach((card, index) => {
    // Initially hide value cards
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // Animate when scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 150);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(card);
  });
}