document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Animation Setup ---
    // Select all elements with the 'reveal' class
    const reveals = document.querySelectorAll('.reveal');

    // Create an Intersection Observer
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger CSS transitions
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed if you only want it to animate once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class to animate out when scrolled past
                // Comment out the below line if you want the elements to stay visible
                // after appearing for the first time.
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Attach the observer to each reveal element
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // --- Particle Background Effect Setup ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 60; // Increased for better visibility

        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
    }
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Randomize particle size, position, and animation duration
    const size = Math.random() * 6 + 4; // Size between 4px and 10px
    const left = Math.random() * 100; // Position from 0vw to 100vw
    const animationDuration = Math.random() * 8 + 8; // Faster, between 8s and 16s
    const animationDelay = Math.random() * 5; // Delay start up to 5s
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}vw`;
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${animationDelay}s`;
    
    container.appendChild(particle);
}

// --- INTERACTIVE COVER & MUSIC SETUP ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Lock the scroll initially so user sees the cover
    document.body.classList.add('locked');
    
    const coverScreen = document.getElementById('cover-screen');
    const openBtn = document.getElementById('openInvitationBtn');
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;
    
    // 2. Open Invitation Button Click
    if(openBtn && coverScreen) {
        openBtn.addEventListener('click', () => {
            // Slide cover up out of view
            coverScreen.classList.add('opened');
            
            // Unlock scrolling smoothly
            setTimeout(() => {
                document.body.classList.remove('locked');
                // Optionally remove the cover from DOM after animation completes to save memory
                setTimeout(() => coverScreen.remove(), 1200); 
            }, 200);
            
            // Play Music
            if(bgMusic && !isPlaying) {
                bgMusic.play().then(() => {
                    if(musicBtn) musicBtn.classList.add('playing');
                    isPlaying = true;
                }).catch(e => console.log("Audio prevented", e));
            }
        });
    }

    // 3. Floating Music Toggle Button Logic
    if(musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
            } else {
                bgMusic.play();
                musicBtn.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
    }
});
