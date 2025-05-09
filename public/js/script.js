// Wait for DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM Element References =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const yearElement = document.getElementById('year');
    
    // ===== Initialize All Functionality =====
    function init() {
        setCurrentYear();
        setupSmoothScrolling();
        setupNavbarScroll();
        setupMobileMenu();
        if (contactForm) setupContactForm(); // Only setup form if exists
    }
    
    // ===== Helper Functions =====
    
    /**
     * Updates copyright year in footer dynamically
     */
    const setCurrentYear = () => {
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };
    
    // ===== Smooth Scrolling for Anchor Links =====
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target section
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL hash without page jump
                    history.pushState(null, null, targetId);
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    };
    
    // ===== Dynamic Navbar Behavior on Scroll =====
    const setupNavbarScroll = () => {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.top = '-80px'; // Hide navbar
            } else {
                navbar.style.top = '0'; // Show navbar
            }
            
            lastScrollY = currentScrollY;
        });
    };
    
    // ===== Mobile Menu Toggle Functionality =====
    const setupMobileMenu = () => {
        if (!hamburger) return;
        
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            navLinks.classList.toggle('active', !isExpanded);
            hamburger.setAttribute('aria-expanded', String(!isExpanded));
        });
    };
    
    // ===== Contact Form Handling =====
    const setupContactForm = () => {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name').trim(),
                email: formData.get('email').trim(),
                message: formData.get('message').trim()
            };
            
            // Validate required fields
            if (data.name && data.email && data.message) {
                try {
                    // TODO: Replace with actual API endpoint
                    console.log('Form submitted:', data);
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } catch (error) {
                    console.error('Form submission error:', error);
                    alert('There was an error sending your message. Please try again later.');
                }
            } else {
                alert('Please fill in all required fields.');
            }
        });
    };
    
    // ===== Initialize All Features =====
    init();
});