// Sticky nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
toggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.concept-text, .ccard, .menu-head, .dish, .order-inner, .infos-detail'
);
revealEls.forEach((el, i) => {
  el.setAttribute('data-reveal', '');
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
});

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}
