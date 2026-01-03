// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const navbar = document.querySelector('.navbar');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');

// Set current year in footer
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Mobile menu toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
}

// Close mobile menu when clicking a link
if (navLinks) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (hamburger) {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
      
      // Update active link
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  // Add/remove scrolled class to navbar
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Show/hide back to top button
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  
  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Function to update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real implementation, you would send this data to a server
    // For now, we'll just show an alert and reset the form
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    contactForm.reset();
  });
}

// Initialize active nav link on page load
updateActiveNavLink();
