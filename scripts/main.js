// Enhanced main JavaScript functionality
class PortfolioCore {
    constructor() {
        this.init();
    }

    init() {
        this.initAOS();
        this.initNavigation();
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initThemeToggle();
        this.initContactForm();
        this.initNotificationSystem();
        this.initBackToTop();
        this.initKeyboardNavigation();
        this.initLazyLoading();
        this.initGreeting();
        this.initConsoleEasterEgg();
    }

    // Initialize AOS (Animate On Scroll)
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                mirror: false,
                easing: 'ease-out-cubic',
                offset: 100,
                delay: 0,
                anchorPlacement: 'top-bottom'
            });
        }
    }

    // Enhanced navigation functionality
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(17, 24, 39, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'rgba(17, 24, 39, 0.9)';
            }
            
            this.updateActiveNavLink();
        });

        // Add click handlers for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.scrollToSection(targetElement);
                    this.setActiveNavLink(link);
                }
            });
        });
    }

    // Enhanced mobile menu
    initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        if (!mobileMenuButton || !mobileMenu) return;

        mobileMenuButton.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const icon = mobileMenuButton.querySelector('i');
        
        if (mobileMenu.classList.contains('show')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const icon = mobileMenuButton.querySelector('i');
        
        mobileMenu.classList.add('show');
        mobileMenu.style.transform = 'translateY(0)';
        mobileMenu.style.opacity = '1';
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const icon = mobileMenuButton.querySelector('i');
        
        mobileMenu.classList.remove('show');
        mobileMenu.style.transform = 'translateY(-100%)';
        mobileMenu.style.opacity = '0';
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }

    // Smooth scrolling implementation
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.scrollToSection(target);
                    this.closeMobileMenu();
                }
            });
        });
    }

    scrollToSection(element) {
        const headerHeight = document.getElementById('navbar').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    // Update active navigation link
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    setActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Theme toggle functionality
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.updateThemeIcon(savedTheme);
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Enhanced contact form
    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        if (!this.validateForm(form)) {
            this.showNotification('Please fill in all required fields correctly', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        this.setButtonLoading(submitButton, true);

        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            this.setButtonLoading(submitButton, false);
        }, 2000);
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Phone validation
        else if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        this.showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        if (message) {
            field.style.borderColor = '#ef4444';
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
            `;
            field.parentNode.appendChild(errorElement);
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        } else {
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
        }
    }

    // Enhanced notification system
    initNotificationSystem() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        const id = 'notification-' + Date.now();
        
        notification.id = id;
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            padding: 1rem 1.5rem;
            margin-bottom: 0.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        `;

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.background = colors[type] || colors.info;

        // Add icon
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center;">
                <i class="${icons[type] || icons.info}" style="margin-right: 0.5rem;"></i>
                <span>${message}</span>
                <button style="margin-left: auto; background: none; border: none; color: white; cursor: pointer; padding: 0; font-size: 1.2rem;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        const container = document.getElementById('notification-container');
        container.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Add close functionality
        const closeButton = notification.querySelector('button');
        closeButton.addEventListener('click', () => {
            this.removeNotification(id);
        });

        // Auto remove
        setTimeout(() => {
            this.removeNotification(id);
        }, duration);
    }

    removeNotification(id) {
        const notification = document.getElementById(id);
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }

    // Back to top button
    initBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');
        if (!backToTopButton) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.transform = 'scale(1)';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.transform = 'scale(0.8)';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Keyboard navigation support
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
            
            // ESC key to close mobile menu
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // Lazy loading for images
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Dynamic greeting based on time
    initGreeting() {
        const greetingElement = document.getElementById('greeting-text');
        if (!greetingElement) return;

        const hour = new Date().getHours();
        let greeting;

        if (hour < 12) {
            greeting = 'Good morning, I\'m';
        } else if (hour < 17) {
            greeting = 'Good afternoon, I\'m';
        } else {
            greeting = 'Good evening, I\'m';
        }

        greetingElement.textContent = greeting;
    }

    // Console easter egg
    initConsoleEasterEgg() {
        const styles = [
            'background: linear-gradient(45deg, #3b82f6, #8b5cf6)',
            'color: white',
            'padding: 10px 20px',
            'border-radius: 5px',
            'font-size: 16px',
            'font-weight: bold'
        ].join(';');

        console.log(`%c🚀 Welcome to Alok's Portfolio!`, styles);
        console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                    Welcome to my portfolio!                  ║
║                                                              ║
║  If you're reading this, you're probably a developer too!   ║
║  Feel free to reach out - I'd love to connect!              ║
║                                                              ║
║  Email: alokagarwal629@gmail.com                            ║
║  GitHub: github.com/alokagarwal565                          ║
║  LinkedIn: linkedin.com/in/alokagarwal565                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
        `);
    }

    // Performance monitoring
    initPerformanceMonitoring() {
        // Log performance metrics
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paintEntries = performance.getEntriesByType('paint');
            
            console.log('Performance Metrics:');
            console.log(`Page Load Time: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
            console.log(`DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
            
            paintEntries.forEach(entry => {
                console.log(`${entry.name}: ${entry.startTime}ms`);
            });
        });
    }

    // Utility method for debouncing
    debounce(func, wait) {
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

    // Utility method for throttling
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the portfolio core functionality
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioCore();
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
    });
    
    // Add unhandled promise rejection handling
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
    });
});
