(function () {
  'use strict';

  // ---------- CTA TRACKING ----------
  // Fires Meta Pixel "Lead" event then redirects after ~150ms
  // so the event has time to reach the Meta servers.
  function handleCTAClick(e) {
    var target = e.currentTarget;
    var href = target.getAttribute('href');
    if (!href) return;

    e.preventDefault();

    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }
    } catch (err) {
      // Silently ignore pixel errors; never block the redirect.
    }

    window.setTimeout(function () {
      window.location.href = href;
    }, 150);
  }

  function bindCTAs() {
    var ctas = document.querySelectorAll('[data-cta]');
    for (var i = 0; i < ctas.length; i++) {
      ctas[i].addEventListener('click', handleCTAClick);
    }
  }

  // ---------- SCROLL REVEAL ----------
  function setupReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything immediately.
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    for (var j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }
  }

  // ---------- INIT ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      bindCTAs();
      setupReveal();
    });
  } else {
    bindCTAs();
    setupReveal();
  }
})();
