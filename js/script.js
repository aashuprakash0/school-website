/* ================================================================
   Aadarsh Avasiya School — script.js
   File: js/script.js
================================================================ */

/* ================================================================
   HERO SLIDER  — 8 slides, 5-second auto-advance
================================================================ */
(function () {
  const TOTAL_SLIDES  = 8;    // change this if you add/remove slides
  const INTERVAL_MS   = 5000; // 5 seconds

  let currentSlide = 0;
  let autoTimer    = null;

  const track = document.getElementById('heroSlides');
  const dotsContainer = document.getElementById('heroDots');

  /* Build dots dynamically based on TOTAL_SLIDES */
  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < TOTAL_SLIDES; i++) {
      const btn = document.createElement('button');
      btn.className = 'hero-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.addEventListener('click', function () {
        goToSlide(i);
        resetAuto();
      });
      dotsContainer.appendChild(btn);
    }
  }

  /* Move to a specific slide */
  function goToSlide(n) {
    currentSlide = (n + TOTAL_SLIDES) % TOTAL_SLIDES;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

    /* Update dots */
    dotsContainer.querySelectorAll('.hero-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  /* Public: next slide (called by arrow button in HTML) */
  window.nextSlide = function () {
    goToSlide(currentSlide + 1);
    resetAuto();
  };

  /* Public: previous slide (called by arrow button in HTML) */
  window.prevSlide = function () {
    goToSlide(currentSlide - 1);
    resetAuto();
  };

  /* Restart the auto-advance timer */
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(window.nextSlide, INTERVAL_MS);
  }

  /* Pause on hover */
  if (track) {
    track.parentElement.addEventListener('mouseenter', function () {
      clearInterval(autoTimer);
    });
    track.parentElement.addEventListener('mouseleave', function () {
      resetAuto();
    });
  }

  /* Touch / swipe support */
  var touchStartX = 0;
  var touchEndX   = 0;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {          // minimum swipe distance
      if (diff > 0) {
        window.nextSlide();             // swipe left  → next
      } else {
        window.prevSlide();             // swipe right → prev
      }
    }
  }, { passive: true });

  /* Keyboard arrow support */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') window.nextSlide();
    if (e.key === 'ArrowLeft')  window.prevSlide();
  });

  /* Init */
  if (track && dotsContainer) {
    buildDots();
    resetAuto();
  }
})();


/* ================================================================
   MOBILE NAVIGATION
================================================================ */
window.toggleMenu = function () {
  var menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
};

window.closeMenu = function () {
  var menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
};

/* Close mobile menu when clicking outside */
document.addEventListener('click', function (e) {
  var nav  = document.querySelector('nav');
  var menu = document.getElementById('mobileMenu');
  if (menu && nav && !nav.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
  }
});


/* ================================================================
   ACTIVE NAV LINK ON SCROLL
================================================================ */
window.addEventListener('scroll', function () {
  var sections = ['home', 'about', 'director', 'academics', 'gallery', 'contact'];
  var scrollY  = window.pageYOffset + 100;

  sections.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
});


/* ================================================================
   GALLERY FILTER (tabs)
================================================================ */
window.filterGallery = function (cat, btn) {
  /* Update active tab */
  document.querySelectorAll('.g-tab').forEach(function (t) {
    t.classList.remove('active');
  });
  btn.classList.add('active');

  /* Show/hide items */
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
};


/* ================================================================
   SCROLL REVEAL  (IntersectionObserver)
================================================================ */
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();


/* ================================================================
   SMOOTH SCROLL for anchor links  (fallback for older browsers)
================================================================ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
