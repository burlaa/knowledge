// Configuration - Change this to your name
const YOUR_NAME = "Swaroop Burla";

// DOM elements
const nameDisplay = document.getElementById('nameDisplay');
const namePath = document.getElementById('namePath');
const navbar = document.getElementById('navbar');
const navName = document.getElementById('navName');
const mainContent = document.getElementById('mainContent');
const constructionText = document.getElementById('constructionText');
const detailsText = document.getElementById('detailsText');

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

// Apple-style handwriting animation
function startHandwritingAnimation() {
    return new Promise((resolve) => {
        const namePath = document.getElementById('namePath');
        
        // Reset animation by removing and re-adding the animation class
        namePath.style.animation = 'none';
        namePath.offsetHeight; // Trigger reflow
        namePath.style.animation = 'drawAndFill 3s ease-in-out forwards';
        namePath.style.animationDelay = '0.5s';
        
        // The animation is handled by CSS, we just need to wait for it to complete
        setTimeout(() => {
            resolve();
        }, 3500); // 3s animation + 0.5s delay
    });
}

// Main animation sequence
async function startAnimation() {
    // Step 1: Let the Apple-style handwriting animation complete
    await startHandwritingAnimation();
    
    // Step 2: Wait for 2-3 seconds as requested
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Step 3: Fade out the name display
    nameDisplay.classList.add('fade-out');
    
    // Step 4: Show navbar and set the name
    navName.textContent = YOUR_NAME;
    navbar.classList.add('show');
    
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
    
    // Step 8: Remove the name display after animation
    setTimeout(() => {
        nameDisplay.style.display = 'none';
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
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Create floating particles
createFloatingParticles(); 