// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typed.js initialization
    const options = {
        strings: ['Programmer'], /* ['Software Developer', 'Machine Learning Enthusiast', 'Web Developer', 'Programmer'] */
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    };
    
    const typed = new Typed('.typing', options);

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });

    // Sticky Navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 20) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar .menu li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Close mobile menu if open
            document.getElementById('menu-toggle').checked = false;
            
            // Get the target section ID
            const targetId = this.getAttribute('href');
            
            // Scroll to the target section smoothly
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const menuToggle = document.getElementById('menu-toggle');
    
    menuBtn.addEventListener('click', function() {
        menuToggle.checked = !menuToggle.checked;
    });

    // Activate menu items based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.navbar .menu li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Add parallax effect to home section
    window.addEventListener('scroll', function() {
        const home = document.querySelector('.home');
        const scrollPosition = window.pageYOffset;
        
        // Only apply the effect when the section is in view
        if (scrollPosition < home.offsetHeight) {
            home.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });

    // Add floating particles to the home section
    const particlesConfig = {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#5e60ce"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#5e60ce",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };

    // Create particles-js container
    if (!document.getElementById('particles-js')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '0';
        
        const homeSection = document.querySelector('.home');
        homeSection.appendChild(particlesContainer);
        
        // Check if particlesJS is loaded and initialize it
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', particlesConfig);
        } else {
            // If particlesJS isn't loaded, add it dynamically
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
            script.onload = function() {
                particlesJS('particles-js', particlesConfig);
            };
            document.head.appendChild(script);
        }
    }

    // Skill bars animation on scroll
    const skillSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const showProgress = () => {
        skillBars.forEach(skill => {
            skill.classList.add('animate');
        });
    };

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Trigger animations when elements come into view
    function animateOnScroll() {
        // Animate skill bars
        if (isInViewport(skillSection)) {
            showProgress();
        }
        
        // Add active class to menu items
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.navbar .menu li a');
        
        let current = '';
        
        sections.forEach(section => {
            if (isInViewport(section)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Call on scroll and initial load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Add tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            this.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        });
    });
}); 
