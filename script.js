(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll-reveal for elements with .reveal or .reveal-pop
  const revealEls = document.querySelectorAll('.reveal, .reveal-pop');
  if (revealEls.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }
  // Safety: also reveal everything after 2s in case the observer never fires
  // (e.g. the section is already in view on load and observer threshold misses)
  setTimeout(() => {
    revealEls.forEach((el) => el.classList.add('in'));
  }, 2000);

  // 2. Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    function setMenu(open) {
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      mobileMenu.classList.toggle('open', open);
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    hamburger.addEventListener('click', () => {
      setMenu(!hamburger.classList.contains('open'));
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        setMenu(false);
        hamburger.focus();
      }
    });
  }
})();
