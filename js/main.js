/* ============================================
   Praxis Buliga — Main JavaScript
   ============================================ */

/* --------------------------------------------
   1. Accordion (FAQ)
   -------------------------------------------- */
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.parentElement;
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', !isOpen);
  });
});

/* --------------------------------------------
   2. Scroll-Spy (Active Navigation)
   -------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a:not(.header-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}, { passive: true });

/* --------------------------------------------
   3. Fade-in Observer (Scroll Animations)
   -------------------------------------------- */
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

/* --------------------------------------------
   4. Mobile Navigation (Overlay + Focus Trap)
   -------------------------------------------- */
const navToggle = document.querySelector('.nav-toggle');
const navOverlay = document.querySelector('.nav-overlay');
const navClose = document.querySelector('.nav-close');
const body = document.body;

function openNav() {
  navOverlay.classList.add('open');
  navOverlay.setAttribute('aria-hidden', 'false');
  body.classList.add('nav-open');
  navToggle.setAttribute('aria-expanded', 'true');
  const focusable = navOverlay.querySelectorAll('a, button');
  if (focusable.length) focusable[0].focus();
}

function closeNav() {
  navOverlay.classList.remove('open');
  navOverlay.setAttribute('aria-hidden', 'true');
  body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.focus();
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navOverlay.classList.contains('open') ? closeNav() : openNav();
  });
}

if (navClose) navClose.addEventListener('click', closeNav);

// Close on link click
navOverlay?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Focus trap + Escape
navOverlay?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
  if (e.key === 'Tab') {
    const focusable = navOverlay.querySelectorAll('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* --------------------------------------------
   5. Maps 2-Click Solution (GDPR)
   -------------------------------------------- */
const mapPlaceholder = document.querySelector('.contact-map-placeholder');

if (mapPlaceholder) {
  mapPlaceholder.querySelector('button')?.addEventListener('click', () => {
    const mapContainer = mapPlaceholder.parentElement;
    mapContainer.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.5!2d16.2987!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKuefsteingasse+48%2F50%2C+1140+Wien!5e0!3m2!1sde!2sat" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Praxis Buliga Standort"></iframe>';
  });
}
