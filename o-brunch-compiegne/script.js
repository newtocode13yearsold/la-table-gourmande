// ===== Navigation : fond au scroll =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Menu hamburger (mobile) =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

const toggleMenu = (open) => {
  const isOpen = open ?? !navLinks.classList.contains('open');
  navLinks.classList.toggle('open', isOpen);
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
};

burger.addEventListener('click', () => toggleMenu());
navLinks.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => toggleMenu(false))
);

// ===== Année du pied de page =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
