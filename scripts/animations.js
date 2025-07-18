// Enhanced animations and interactions for the portfolio
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initTextAnimations();
        this.initCursorFollower();
        this.initGlitchEffect();
        this.initMagneticEffect();
        this.initScrollProgress();
        this.initTypewriter();
        this.initCountUpAnimations();
    }

    // Create animated particles background
    createParticles() {
        const particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) return;

        // Create particles
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${this.getRandomColor()};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            particlesContainer.appendChild(particle);
        }
    }

    getRandomColor() {
        const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Enhanced scroll animations
    initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    this.triggerStaggeredAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            scrollObserver.observe(el);
        });

        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Staggered animations for groups
    triggerStaggeredAnimation(parent) {
        const children = parent.querySelectorAll('.skill-tag, .tech-badge, .achievement-item');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.animation = `fadeInUp 0.6s ease-out forwards`;
                child.style.animationDelay = `${index * 0.1}s`;
            }, index * 50);
        });
    }

    // Enhanced hover effects
    initHoverEffects() {
        const cards = document.querySelectorAll('.hover-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRipple(e, card);
                this.addGlow(card);
            });
            
            card.addEventListener('mousemove', (e) => {
                this.tiltCard(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCard(card);
                this.removeGlow(card);
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.cta-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.animateButton(button);
            });
        });
    }

    // Create ripple effect
    createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.8s ease-out;
            pointer-events: none;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        ripple.classList.add('ripple');
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }

    // 3D tilt effect
    tiltCard(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    // Reset card transform
    resetCard(card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    // Add glow effect
    addGlow(element) {
        element.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
    }

    // Remove glow effect
    removeGlow(element) {
        element.style.boxShadow = '';
    }

    // Button animation
    animateButton(button) {
        button.style.transform = 'scale(1.05) translateY(-2px)';
        setTimeout(() => {
            button.style.transform = 'scale(1) translateY(0)';
        }, 200);
    }

    // Text reveal animations
    initTextAnimations() {
        const textElements = document.querySelectorAll('.text-reveal');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: char-reveal 0.5s ease-out forwards;
                    animation-delay: ${index * 0.05}s;
                `;
                element.appendChild(span);
            });
        });
    }

    // Cursor follower
    initCursorFollower() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-follower';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(59, 130, 246, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            backdrop-filter: blur(2px);
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(59, 130, 246, 0.2)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });

        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
        }
    }

    // Glitch effect
    initGlitchEffect() {
        const glitchElements = document.querySelectorAll('.glitch');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.triggerGlitch(element);
            });
        });
    }

    triggerGlitch(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let iterations = 0;
        
        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    }

    // Magnetic effect
    initMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // Scroll progress indicator
    initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Typewriter effect
    initTypewriter() {
        const typewriterElement = document.getElementById('typewriter-text');
        if (!typewriterElement) return;

        const texts = [
            'AI Product Builder',
            'Software Engineer',
            'Community Leader',
            'Innovation Catalyst',
            'Tech Evangelist'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseDelay = 2000;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeDelay = isDeleting ? deleteSpeed : typeSpeed;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeDelay = pauseDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(type, typeDelay);
        };
        
        type();
    }

    // Count up animations
    initCountUpAnimations() {
        const counters = document.querySelectorAll('.count-up');
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            countObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Smooth reveal on scroll
    revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Initialize loading screen
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;
        
        const progressBar = document.getElementById('progress-bar');
        let progress = 0;
        
        const loadingTimer = setInterval(() => {
            progress += Math.random() * 15;
            if (progressBar) {
                progressBar.style.width = Math.min(progress, 100) + '%';
            }
            
            if (progress >= 100) {
                clearInterval(loadingTimer);
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 500);
            }
        }, 100);
    }

    // Reduce motion for accessibility
    respectReducedMotion() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (mediaQuery.matches) {
            // Disable animations
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animations = new PortfolioAnimations();
    animations.respectReducedMotion();
    animations.initLoadingScreen();
    
    // Initialize scroll reveal
    window.addEventListener('scroll', () => {
        animations.revealOnScroll();
    });
});

// CSS Animations as JavaScript-injected styles
const animationStyles = `
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(90deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    75% { transform: translateY(-10px) rotate(270deg); }
}

@keyframes ripple-animation {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

@keyframes char-reveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0, 0, 0);
    }
    40%, 43% {
        transform: translate3d(0, -10px, 0);
    }
    70% {
        transform: translate3d(0, -5px, 0);
    }
    90% {
        transform: translate3d(0, -2px, 0);
    }
}

.particle {
    pointer-events: none;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.8s ease-out;
    pointer-events: none;
}

.reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
}

.reveal.active {
    opacity: 1;
    transform: translateY(0);
}

/* Smooth transitions */
* {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
