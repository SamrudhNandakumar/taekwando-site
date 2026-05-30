/* ============================================================
   ACE MARTIAL ARTS & WELLNESS — main.js
   Features:
     1. Navbar scroll effect + active link highlight
     2. Hamburger mobile menu toggle
     3. Scroll-triggered fade-in animations
     4. Back-to-top button visibility
     5. Smooth scroll for anchor links
     6. Stats counter animation
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. NAVBAR — scroll effect
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load


  /* ----------------------------------------------------------
     2. HAMBURGER MENU
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }


  /* ----------------------------------------------------------
     3. ACTIVE NAV LINK — highlight based on current page
  ---------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });


  /* ----------------------------------------------------------
     4. SCROLL FADE-IN ANIMATIONS
  ---------------------------------------------------------- */
  // Add fade-in class to key elements automatically
  const animateTargets = document.querySelectorAll(
    '.feature-card, .program-card, .intro-grid, .section-header, .stat-item'
  );

  animateTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animateTargets.forEach(function (el) {
    fadeObserver.observe(el);
  });


  /* ----------------------------------------------------------
     5. BACK TO TOP BUTTON
  ---------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 320) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ----------------------------------------------------------
     6. SMOOTH SCROLL for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });


  /* ----------------------------------------------------------
     7. STATS COUNTER ANIMATION
  ---------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const rawText = el.textContent.trim();
    const numMatch = rawText.match(/[\d.]+/);
    if (!numMatch) return;

    const endVal  = parseFloat(numMatch[0]);
    const prefix  = rawText.slice(0, rawText.indexOf(numMatch[0]));
    const suffix  = rawText.slice(rawText.indexOf(numMatch[0]) + numMatch[0].length);
    const isFloat = numMatch[0].includes('.');
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = endVal * ease;
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(function (el) { statsObserver.observe(el); });

})();
