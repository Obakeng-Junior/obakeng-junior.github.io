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
// ============================================
// CV DOWNLOAD FUNCTIONALITY
// ============================================

function setupCVDownload() {
  // Set current date for CV
  const cvDateElement = document.getElementById('cvDate');
  if (cvDateElement) {
    const today = new Date();
    const options = { year: 'numeric', month: 'long' };
    cvDateElement.textContent = today.toLocaleDateString('en-US', options);
  }
  
  // Track download count (using localStorage)
  const downloadCountElement = document.getElementById('downloadCount');
  const downloadButton = document.querySelector('.cv-download-btn');
  
  if (downloadCountElement && downloadButton) {
    // Get current count from localStorage
    let downloadCount = localStorage.getItem('cvDownloadCount') || 0;
    downloadCountElement.textContent = downloadCount;
    
    // Track download when button is clicked
    downloadButton.addEventListener('click', function(e) {
      // Prevent default to show animation first
      e.preventDefault();
      
      // Increment count
      downloadCount++;
      localStorage.setItem('cvDownloadCount', downloadCount);
      downloadCountElement.textContent = downloadCount;
      
      // Add download animation
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
      this.classList.add('downloading');
      this.style.pointerEvents = 'none';
      
      // Simulate download delay for better UX
      setTimeout(() => {
        // Actually trigger the download
        const link = document.createElement('a');
        link.href = this.getAttribute('href');
        link.download = this.getAttribute('download') || 'Obakeng_Mohale_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button text after download
        this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        
        // Reset to original after 1.5 seconds
        setTimeout(() => {
          this.innerHTML = originalText;
          this.classList.remove('downloading');
          this.style.pointerEvents = 'auto';
        }, 1500);
        
        // Log download event
        console.log('CV downloaded! Total downloads:', downloadCount);
        
        // Optional: Send analytics event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'cv_download', {
            'event_category': 'engagement',
            'event_label': 'CV Download',
            'value': downloadCount
          });
        }
      }, 800);
    });
  }
  
  // Add animation for CV card hover
  const cvCard = document.querySelector('.cv-card');
  if (cvCard) {
    cvCard.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.cv-icon i');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    cvCard.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.cv-icon i');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  }
  
  // Add manual download fallback
  const manualDownloadLink = document.querySelector('.cv-note a');
  if (manualDownloadLink && manualDownloadLink.textContent.includes('click here')) {
    manualDownloadLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '_blank');
    });
  }
}
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
