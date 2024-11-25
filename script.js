document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav__menu--active');
        navToggle.classList.toggle('nav__toggle--active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        const answer = item.querySelector('.faq-item__answer');

        question.addEventListener('click', () => {
            const isOpen = question.getAttribute('aria-expanded') === 'true';

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-item__answer').setAttribute('aria-hidden', 'true');
                }
            });

            // Toggle current item
            question.setAttribute('aria-expanded', !isOpen);
            answer.setAttribute('aria-hidden', isOpen);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = `${scrollPosition * 0.7}px`;
    });

    // Animated counter for pricing
    const pricingCards = document.querySelectorAll('.pricing-card__price');

    const animateCounter = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = `$${currentValue}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const price = parseInt(entry.target.textContent.replace('$', ''));
                animateCounter(entry.target, 0, price, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    pricingCards.forEach(card => observer.observe(card));

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero__title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    const typeWriter = (text, i = 0) => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(text, i), 100);
        }
    };

    setTimeout(() => typeWriter(text), 1000);

    // Particle effect for hero background
    particlesJS('hero', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
});