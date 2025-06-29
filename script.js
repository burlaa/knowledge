// Configuration - Change this to your name
const YOUR_NAME = "Swaroop Burla";

// DOM elements
const nameDisplay = document.getElementById('nameDisplay');
const namePath = document.getElementById('namePath');
const topNavbar = document.getElementById('topNavbar');
const navName = document.getElementById('navName');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sideMenu = document.getElementById('sideMenu');
const sideMenuName = document.getElementById('sideMenuName');
const mainContent = document.getElementById('mainContent');
const constructionText = document.getElementById('constructionText');
const detailsText = document.getElementById('detailsText');

// Side menu functionality
function initSideMenu() {
    hamburgerMenu.addEventListener('click', toggleSideMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (sideMenu.classList.contains('open')) {
            // Check if click is outside the side menu and not on the hamburger
            const sideMenuRect = sideMenu.getBoundingClientRect();
            const hamburgerRect = hamburgerMenu.getBoundingClientRect();
            
            const isOutsideSideMenu = e.clientX < sideMenuRect.left || e.clientX > sideMenuRect.right || 
                                    e.clientY < sideMenuRect.top || e.clientY > sideMenuRect.bottom;
            const isOnHamburger = e.clientX >= hamburgerRect.left && e.clientX <= hamburgerRect.right && 
                                e.clientY >= hamburgerRect.top && e.clientY <= hamburgerRect.bottom;
            
            if (isOutsideSideMenu && !isOnHamburger) {
                closeSideMenu();
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSideMenu();
        }
    });
}

function toggleSideMenu() {
    if (sideMenu.classList.contains('open')) {
        closeSideMenu();
    } else {
        openSideMenu();
    }
}

function openSideMenu() {
    sideMenu.classList.add('open');
    hamburgerMenu.classList.add('active');
}

function closeSideMenu() {
    sideMenu.classList.remove('open');
    hamburgerMenu.classList.remove('active');
}

// Typewriter animation function
function typeWriter(element, text, speed = 100) {
    return new Promise((resolve) => {
        let i = 0;
        element.innerHTML = '';
        element.classList.add('typing');
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.classList.remove('typing');
                    resolve();
                }, 500);
            }
        }
        
        type();
    });
}

// Apple-style handwriting animation with mobile optimization
function startHandwritingAnimation() {
    return new Promise((resolve) => {
        const namePath = document.getElementById('namePath');
        
        // Check if SVG animations are supported
        const supportsSVGAnimations = 'animate' in document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        
        if (!supportsSVGAnimations || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Fallback animation for mobile or unsupported browsers
            namePath.style.fill = 'none';
            namePath.style.stroke = 'white';
            namePath.style.strokeWidth = '2';
            namePath.style.opacity = '0';
            
            // Simple fade-in animation
            let opacity = 0;
            const fadeIn = setInterval(() => {
                opacity += 0.02;
                namePath.style.opacity = opacity;
                
                if (opacity >= 1) {
                    clearInterval(fadeIn);
                    // Fill the text after fade-in
                    setTimeout(() => {
                        namePath.style.fill = 'white';
                        resolve();
                    }, 500);
                }
            }, 30);
        } else {
            // Original SVG animation for supported browsers
            namePath.style.animation = 'none';
            namePath.offsetHeight; // Trigger reflow
            
            // Use webkit prefix for better mobile support
            namePath.style.webkitAnimation = 'drawAndFill 3s ease-in-out forwards';
            namePath.style.animation = 'drawAndFill 3s ease-in-out forwards';
            namePath.style.webkitAnimationDelay = '0.5s';
            namePath.style.animationDelay = '0.5s';
            
            // Force hardware acceleration on mobile
            namePath.style.webkitTransform = 'translateZ(0)';
            namePath.style.transform = 'translateZ(0)';
            
            // The animation is handled by CSS, we just need to wait for it to complete
            setTimeout(() => {
                resolve();
            }, 3500); // 3s animation + 0.5s delay
        }
    });
}

// Main animation sequence
async function startAnimation() {
    // Add animating class to body to prevent scrolling on mobile
    document.body.classList.add('animating');
    
    // Step 1: Let the Apple-style handwriting animation complete
    await startHandwritingAnimation();
    
    // Step 2: Wait for 2-3 seconds as requested
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Step 3: Fade out the name display
    nameDisplay.classList.add('fade-out');
    
    // Step 4: Show top navbar, hamburger menu and set the name
    navName.textContent = YOUR_NAME;
    sideMenuName.textContent = YOUR_NAME;
    topNavbar.classList.add('show');
    hamburgerMenu.classList.add('show');
    
    // Step 5: Show main content
    mainContent.classList.add('show');
    
    // Step 6: Type the construction messages
    await typeWriter(constructionText, "🚧 This website is currently under construction 🚧", 80);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await typeWriter(detailsText, "I'm working hard to bring you something amazing. Check back soon!", 60);
    
    // Step 7: Avengers-style cursor disappearance
    setTimeout(() => {
        constructionText.classList.add('avengers-fade');
        detailsText.classList.add('avengers-fade');
    }, 1000);
    
    // Step 8: Remove the name display after animation and restore scrolling
    setTimeout(() => {
        nameDisplay.style.display = 'none';
        document.body.classList.remove('animating');
    }, 1500);
}

// Add some interactive effects
function addInteractiveEffects() {
    // Parallax effect for the background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        if (parallax) {
            const speed = scrolled * 0.5;
            document.body.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Smooth hover effects for cards
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.cta-button, .link-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .cta-button, .link-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addRippleStyles();
    addInteractiveEffects();
    initSideMenu();
    startAnimation();
});

// Add some floating particles for extra visual appeal
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create particles after animation completes
setTimeout(createFloatingParticles, 5000); 