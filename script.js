document.addEventListener('DOMContentLoaded', () => {
    // Snow Effect
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 100;
    const snowflakes = [];

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        
        // Initial position
        snowflake.style.top = -20 + 'px';
        
        snowContainer.appendChild(snowflake);
        
        return {
            element: snowflake,
            speed: Math.random() * 1 + 0.5,
            y: -20,
            x: parseFloat(snowflake.style.left)
        };
    }

    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push(createSnowflake());
    }

    function animateSnow() {
        // Calculate scroll speed factor
        const scrollY = window.scrollY;
        const speedFactor = 1 + (scrollY / 500); // Snow falls faster as you scroll down

        snowflakes.forEach(flake => {
            flake.y += flake.speed * speedFactor;
            
            if (flake.y > window.innerHeight) {
                flake.y = -20;
                flake.element.style.left = Math.random() * 100 + 'vw';
            }

            flake.element.style.transform = `translateY(${flake.y}px)`;
        });

        requestAnimationFrame(animateSnow);
    }

    animateSnow();

    // Countdown Timer
    const eventDate = new Date('November 28, 2025 09:00:00').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "Event Started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
