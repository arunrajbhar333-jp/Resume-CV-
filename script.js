// Particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 15 + 's';
  particle.style.animationDuration = (15 + Math.random() * 10) + 's';
  particlesContainer.appendChild(particle);
}

// Custom Cursor
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

// Magnetic Effect
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// Typewriter Effect
const taglines = [
  'Transforming data into decisions.',
  'Building dashboards that tell stories.',
  'Making reports that matter.',
  '7+ years of analytical expertise.'
];

let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriter = document.querySelector('.typewriter');

function type() {
  const current = taglines[taglineIndex];
  
  if (isDeleting) {
    typewriter.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriter.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 30 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    taglineIndex = (taglineIndex + 1) % taglines.length;
    speed = 500;
  }

  setTimeout(type, speed);
}

type();

// Counter Animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(counter);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  });
}

animateCounters();

// Enter Portfolio
const enterBtn = document.getElementById('enterBtn');
enterBtn.addEventListener('click', () => {
  document.body.classList.add('entered');
  setTimeout(() => {
    window.scrollTo({ top: 0 });
  }, 100);
});

// Tilt Effect
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      // Animate skill bars
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const width = bar.dataset.width;
        bar.style.setProperty('--width', width + '%');
        bar.classList.add('animate');
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .skill-category').forEach(el => {
  revealObserver.observe(el);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});