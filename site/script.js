// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const isOpen = toggle.classList.toggle('active');
  links.classList.toggle('active');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav on link click
links.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    links.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Shrink nav on scroll
const nav = document.getElementById('nav');

window.addEventListener(
  'scroll',
  () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  },
  { passive: true },
);
