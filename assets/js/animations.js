// Advanced animations and interactions
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.initHeroAnimations();
        this.initScrollTriggers();
        this.initHoverEffects();
        this.initCounterAnimations();
        this.initTypewriterEffect();
    }

    // Hero section animations
    initHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        const heroImage = document.querySelector('.hero-image');

        // Stagger animation for title lines
        if (heroTitle) {
            const titleLines = heroTitle.querySelectorAll('.title-line');
            titleLines.forEach((line, index) => {
                line.style.animationDelay = `${index * 0.2}s`;
            });
        }

        // Parallax effect for hero image
        if (heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroImage.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Scroll-triggered animations
    initScrollTriggers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Elements to observe
        const elements = document.querySelectorAll([
            '.about-content',
            '.media-card',
            '.insight-card',
            '.case-study',
            '.stat-item',
            '.expertise-item'
        ].join(','));

        elements.forEach(el => observer.observe(el));
    }

    triggerAnimation(element) {
        element.classList.add('animate');
        
        // Special animations for specific elements
        if (element.classList.contains('stat-item')) {
            this.animateCounter(element);
        }
        
        if (element.classList.contains('media-card')) {
            this.animateMediaCard(element);
        }
    }

    // Counter animation for statistics
    animateCounter(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        if (!numberElement) return;

        const finalNumber = numberElement.textContent;
        const isPercentage = finalNumber.includes('%');
        const isCurrency = finalNumber.includes('$');
        const isPlus = finalNumber.includes('+');
        
        let numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        
        if (isCurrency && finalNumber.includes('M')) {
            numericValue = numericValue;
        }

        let currentNumber = 0;
        const increment = numericValue / 60; // 60 frames for smooth animation
        
        const timer = setInterval(() => {
            currentNumber += increment;
            
            if (currentNumber >= numericValue) {
                currentNumber = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(currentNumber);
            
            if (isCurrency) {
                if (finalNumber.includes('M')) {
                    displayValue = `$${displayValue}M`;
                } else {
                    displayValue = `$${displayValue.toLocaleString()}`;
                }
            } else if (isPercentage) {
                displayValue = `${displayValue}%`;
            }
            
            if (isPlus && currentNumber >= numericValue) {
                displayValue += '+';
            }
            
            numberElement.textContent = displayValue;
        }, 16); // ~60fps
    }

    // Media card hover animations
    animateMediaCard(card) {
        const playButton = card.querySelector('.play-button');
        const thumbnail = card.querySelector('.media-thumbnail img');
        
        if (playButton && thumbnail) {
            card.addEventListener('mouseenter', () => {
                playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
                thumbnail.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                thumbnail.style.transform = 'scale(1)';
            });
        }
    }

    // Hover effects for interactive elements
    initHoverEffects() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.cta-primary, .cta-secondary, .case-cta');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });

        // Tilt effect for cards
        const tiltCards = document.querySelectorAll('.insight-card, .media-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Typewriter effect for dynamic text
    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    element.classList.remove('typewriter');
                }
            }, 100);
        });
    }

    // Particle system enhancement
    static createAdvancedParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.appendChild(canvas);
        }
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        const particleCount = 100;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    AnimationController.createAdvancedParticles();
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(script);
}