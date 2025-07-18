// Performance optimization and monitoring
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.initLazyLoading();
        this.initImageOptimization();
        this.initResourceHints();
        this.initServiceWorker();
        this.initPerformanceMonitoring();
        this.initMemoryManagement();
        this.optimizeAnimations();
        this.initIntersectionObserver();
    }

    // Advanced lazy loading
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src], iframe[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.loadElement(element);
                    observer.unobserve(element);
                }
            });
        }, {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadElement(element) {
        const src = element.dataset.src;
        if (src) {
            element.src = src;
            element.classList.remove('lazy');
            element.classList.add('loaded');
            
            // Remove data-src attribute
            element.removeAttribute('data-src');
            
            // Add fade-in animation
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.3s ease';
            
            element.onload = () => {
                element.style.opacity = '1';
            };
        }
    }

    // Image optimization
    initImageOptimization() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading attribute for native lazy loading
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // Add decoding attribute for better performance
            if (!img.decoding) {
                img.decoding = 'async';
            }
            
            // Handle image load errors
            img.addEventListener('error', () => {
                img.style.display = 'none';
                console.warn('Failed to load image:', img.src);
            });
        });
    }

    // Resource hints for better loading
    initResourceHints() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
            'https://unpkg.com/aos@2.3.1/dist/aos.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // Service worker for caching
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Performance monitoring
    initPerformanceMonitoring() {
        // Core Web Vitals
        this.measureCoreWebVitals();
        
        // Custom performance metrics
        this.measureCustomMetrics();
        
        // Resource loading times
        this.measureResourceTiming();
        
        // Memory usage
        this.measureMemoryUsage();
    }

    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({entryTypes: ['largest-contentful-paint']});

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({entryTypes: ['first-input']});

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        }).observe({entryTypes: ['layout-shift']});
    }

    measureCustomMetrics() {
        // Time to Interactive (TTI)
        window.addEventListener('load', () => {
            const navigationEntry = performance.getEntriesByType('navigation')[0];
            const tti = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
            console.log('TTI:', tti);
        });

        // First Paint and First Contentful Paint
        const paintObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log(`${entry.name}:`, entry.startTime);
            });
        });
        paintObserver.observe({entryTypes: ['paint']});
    }

    measureResourceTiming() {
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            resources.forEach(resource => {
                if (resource.duration > 1000) {
                    console.warn('Slow resource:', resource.name, resource.duration);
                }
            });
        });
    }

    measureMemoryUsage() {
        if ('memory' in performance) {
            const memoryInfo = performance.memory;
            console.log('Memory Usage:', {
                used: Math.round(memoryInfo.usedJSHeapSize / 1048576) + ' MB',
                total: Math.round(memoryInfo.totalJSHeapSize / 1048576) + ' MB',
                limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576) + ' MB'
            });
        }
    }

    // Memory management
    initMemoryManagement() {
        // Clean up event listeners on page unload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });

        // Periodic cleanup
        setInterval(() => {
            this.performGarbageCollection();
        }, 300000); // Every 5 minutes
    }

    cleanup() {
        // Remove event listeners
        const elements = document.querySelectorAll('[data-cleanup]');
        elements.forEach(element => {
            element.removeEventListener('click', element.clickHandler);
            element.removeEventListener('scroll', element.scrollHandler);
        });

        // Clear timers
        clearInterval(this.cleanupInterval);
        clearTimeout(this.debounceTimeout);
    }

    performGarbageCollection() {
        // Remove unused DOM elements
        const unusedElements = document.querySelectorAll('.removed, .hidden');
        unusedElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });

        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }

    // Animation optimization
    optimizeAnimations() {
        // Use requestAnimationFrame for smooth animations
        this.animationFrame = null;
        
        // Throttle scroll events
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // Optimize CSS animations
        this.optimizeCSSAnimations();
    }

    optimizeCSSAnimations() {
        // Add will-change property to animated elements
        const animatedElements = document.querySelectorAll('.animated, .hover-card, .cta-button');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });

        // Remove will-change after animation
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const element = mutation.target;
                    if (!element.classList.contains('animated')) {
                        element.style.willChange = 'auto';
                    }
                }
            });
        });

        animatedElements.forEach(element => {
            observer.observe(element, { attributes: true });
        });
    }

    handleScroll() {
        // Optimized scroll handling
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Update scroll progress
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    // Intersection Observer for better performance
    initIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, options);

        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Preload critical resources
    preloadCriticalResources() {
        const criticalImages = [
            'assets/images/hero-bg.webp',
            'assets/images/profile.webp'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Optimize fonts
    optimizeFonts() {
        // Preload critical fonts
        const fontLinks = [
            'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeAmM.woff2'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    // Network optimization
    initNetworkOptimization() {
        // Check connection quality
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Disable non-essential animations
                document.body.classList.add('low-bandwidth');
                
                // Load smaller images
                this.loadLowQualityImages();
            }
        }
    }

    loadLowQualityImages() {
        const images = document.querySelectorAll('img[data-src-low]');
        images.forEach(img => {
            if (img.dataset.srcLow) {
                img.src = img.dataset.srcLow;
            }
        });
    }

    // Bundle optimization
    loadModulesAsynchronously() {
        // Dynamic imports for non-critical modules
        const loadNonCriticalModules = async () => {
            try {
                const { default: analytics } = await import('./analytics.js');
                const { default: social } = await import('./social.js');
                
                analytics.init();
                social.init();
            } catch (error) {
                console.error('Failed to load non-critical modules:', error);
            }
        };

        // Load after page is interactive
        if (document.readyState === 'complete') {
            loadNonCriticalModules();
        } else {
            window.addEventListener('load', loadNonCriticalModules);
        }
    }
}

// Initialize performance optimization
document.addEventListener('DOMContentLoaded', () => {
    const performanceOptimizer = new PerformanceOptimizer();
    
    // Additional performance checks
    if (window.performance && window.performance.mark) {
        performance.mark('portfolio-start');
        
        window.addEventListener('load', () => {
            performance.mark('portfolio-end');
            performance.measure('portfolio-load', 'portfolio-start', 'portfolio-end');
            
            const measure = performance.getEntriesByName('portfolio-load')[0];
            console.log('Portfolio load time:', measure.duration);
        });
    }
});
