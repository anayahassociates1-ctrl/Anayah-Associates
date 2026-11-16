/* ==========================================================================
   ANAYAH ASSOCIATES — INTERACTIVE CLIENT SCRIPTS
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- 1. STARTING INTRO ANIMATION PRELOADER ---------- */
  var introLoader = $('#intro-loader');
  function dismissIntro() {
    if (!introLoader || introLoader.classList.contains('is-hidden')) return;
    introLoader.classList.add('is-hidden');
  }

  // Dismiss automatically after 1.5s
  window.addEventListener('load', function () {
    setTimeout(dismissIntro, 1200);
  });
  // Failsafe timer (max 2.2s)
  setTimeout(dismissIntro, 2200);
  // Dismiss on early user interaction
  window.addEventListener('keydown', dismissIntro, { once: true });
  window.addEventListener('touchstart', dismissIntro, { once: true });
  window.addEventListener('wheel', dismissIntro, { once: true });

  /* ---------- 2. DYNAMIC FLOATING PILL NAVBAR ---------- */
  var navbar = $('#navbar');
  var burger = $('#nav-burger');
  var drawer = $('#mobile-drawer');
  var drawerClose = $('#drawer-close');

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      drawer.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  $$('.m-link').forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  /* ---------- 3. STATS COUNT-UP NUMBERS ---------- */
  var counters = $$('.js-counter');
  var countStarted = false;

  function runCounters() {
    counters.forEach(function (counter) {
      var target = parseInt(counter.dataset.target, 10) || 0;
      var duration = 1600;
      var startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        var progress = Math.min((currentTime - startTime) / duration, 1);
        // Easing out cubic
        var easeOut = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(easeOut * target);
        counter.textContent = current;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.textContent = target;
        }
      }
      window.requestAnimationFrame(step);
    });
  }

  var statsSec = $('#stats');
  if (statsSec && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countStarted) {
          countStarted = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(statsSec);
  } else {
    runCounters();
  }

  /* ---------- 4. STICKY HORIZONTAL SCROLL GALLERY ---------- */
  var gallerySec = $('#gallery');
  var galleryTrack = $('#gallery-track');

  function handleGalleryScroll() {
    if (!gallerySec || !galleryTrack) return;
    var rect = gallerySec.getBoundingClientRect();
    var viewHeight = window.innerHeight;
    var totalHeight = rect.height;
    var scrolled = -rect.top;
    var maxScroll = totalHeight - viewHeight;

    if (maxScroll <= 0) return;

    // Clamped progress (0 to 1)
    var progress = Math.max(0, Math.min(1, scrolled / maxScroll));
    // Limit is track scrollWidth minus available width
    var limit = Math.max(0, galleryTrack.scrollWidth - window.innerWidth + 80);

    galleryTrack.style.transform = 'translateX(-' + (progress * limit) + 'px)';
  }

  window.addEventListener('scroll', handleGalleryScroll, { passive: true });
  window.addEventListener('resize', handleGalleryScroll);

  /* ---------- 5. INTERACTIVE WHY CHOOSE US ACCORDION & IMAGE SWITCHER ---------- */
  var whyItems = $$('.why-item');
  var dynamicImg = $('#why-dynamic-img');

  whyItems.forEach(function (item) {
    var btn = item.querySelector('.why-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all
      whyItems.forEach(function (it) {
        it.classList.remove('is-open');
        var toggle = it.querySelector('.why-toggle');
        if (toggle) toggle.textContent = '+';
      });

      // If clicked wasn't open, open it
      if (!isOpen) {
        item.classList.add('is-open');
        var toggle = item.querySelector('.why-toggle');
        if (toggle) toggle.textContent = '−';

        // Switch image with cross-fade
        var newImgSrc = item.dataset.img;
        if (dynamicImg && newImgSrc) {
          dynamicImg.style.opacity = '0';
          dynamicImg.style.transform = 'scale(0.97)';
          setTimeout(function () {
            dynamicImg.src = newImgSrc;
            dynamicImg.style.opacity = '1';
            dynamicImg.style.transform = 'scale(1)';
          }, 200);
        }
      }
    });
  });

  /* ---------- 6. PROJECTS MODAL DATA & DIALOG ---------- */
  var projectData = {
    'aasif': {
      title: 'Aasif Bhai Luxury Residence',
      sector: 'RESIDENTIAL VILLA · G+2',
      location: 'Islampura, Shrirampur, Dist-Ahilyanagar',
      client: 'Mr. Aasif Bhai Shaikh',
      scope: '3D Front View, RC Concrete Design & Turnkey Execution',
      desc: 'A bespoke two-storey luxury home with cantilevered floating balconies, vertical warm-wood architectural louvers, soft ambient exterior lighting, and lush garden terraces.',
      img: 'assets/img/projects/aasif-bhai-bungalow.webp'
    },
    'modern-elevation': {
      title: 'Modern Architectural Elevation',
      sector: '3D FRONT ELEVATION · AHILYANAGAR',
      location: 'Ahilyanagar District, Maharashtra',
      client: 'Private Residence',
      scope: 'Photorealistic 3D Concept, Day & Evening Lighting Studies',
      desc: 'High-contrast modern facade featuring textured stone tile accents, cantilevered parapet fins, warm ambient terrace illumination, and energy-conscious cross-ventilation planning.',
      img: 'assets/img/projects/architectural-elevation-modern.webp'
    },
    'commercial': {
      title: 'Pathan Commercial Complex',
      sector: 'COMMERCIAL COMPLEX · MULTI-STOREY',
      location: 'Main Road, Shrirampur, Maharashtra',
      client: 'Mr. Bashir Pathan',
      scope: 'MahaBPMS Sanction, High-Load Concrete Framing, Full Contracting',
      desc: 'Multi-storey commercial business center featuring ground floor retail shopping showrooms, flexible upper-level office units, basement parking, and heavy-duty IS-1893 seismic columns.',
      img: 'assets/img/projects/pathan-complex.webp'
    },
    'executive': {
      title: 'Executive Modern Residence',
      sector: 'LUXURY RESIDENTIAL VILLA',
      location: 'Rahuri, Dist-Ahilyanagar',
      client: 'Private Executive Family',
      scope: 'Vastu Floor Layout, 3D Elevation, Structural Detailing',
      desc: 'Spacious 4BHK architectural design featuring double-height ceiling living areas, bespoke open-plan Italian kitchen, private landscaped terrace, and complete IS-456 reinforcement detailing.',
      img: 'assets/img/projects/anayah-executive-residence.webp'
    },
    'seed-oil': {
      title: 'Shri Ganesh Seed Oil Plant',
      sector: 'INDUSTRIAL HEAVY PEB & RC',
      location: 'Industrial Corridor, Shrirampur',
      client: 'Farmer Producer Co. / Agri-Industries',
      scope: 'Factory PEB Steel Truss Design, Machinery Foundation, Town Planning',
      desc: 'Heavy-duty industrial manufacturing plant with precision reinforced vibrating machinery foundations, high-clearance steel PEB framing, and specialized fire-safety circulation.',
      img: 'assets/img/projects/industrial-jatap.webp'
    },
    'contemporary': {
      title: 'Contemporary Private Villa',
      sector: 'MINIMALIST RESIDENTIAL HOME',
      location: 'Deolali Pravara, Tal-Rahuri',
      client: 'Private Commission',
      scope: 'Bespoke Architecture, Structural Engineering, On-Site Audit',
      desc: 'A modern white and charcoal minimalist villa with seamless indoor-outdoor courtyards, large solar-reflective glass fenestrations, and private terrace gardens.',
      img: 'assets/img/projects/anayah-contemporary-villa.webp'
    },
    'mangal': {
      title: 'Mangal Karyalay & Community Hall',
      sector: 'PUBLIC COMMUNITY VENUE',
      location: 'Ahilyanagar District, Maharashtra',
      client: 'Community Trust',
      scope: 'Wide-Span Steel Roof, Acoustical Layout, Town Planning Approval',
      desc: 'A 1,200-capacity column-free banquet venue featuring long-span steel roof trusses, high-volume natural cross-ventilation, stage acoustics, and wide fire-exit clearances.',
      img: 'assets/img/projects/sai-shaneshwar-karyalay.webp'
    },
    'concept': {
      title: 'Prestige Luxury Architectural Concept',
      sector: 'SIGNATURE ARCHITECTURAL STUDY',
      location: 'Shrirampur / Ahilyanagar',
      client: 'Anayah Associates Signature Commission',
      scope: 'Architectural Blueprint, 3D Walkthrough, Structural Model',
      desc: 'A flagship design showcasing Anayah Associates signature design principles: effortless functionality, enduring structural durability, and refined architectural aesthetics.',
      img: 'assets/img/projects/anayah-3d-concept.webp'
    }
  };

  var modal = $('#project-modal');
  var modalCloseBtn = $('#modal-close-btn');

  function openProjectModal(key) {
    var data = projectData[key];
    if (!data || !modal) return;

    $('#modal-title').textContent = data.title;
    $('#modal-sector').textContent = data.sector;
    $('#modal-location').textContent = data.location;
    $('#modal-client').textContent = data.client;
    $('#modal-scope').textContent = data.scope;
    $('#modal-description').textContent = data.desc;
    $('#modal-img').src = data.img;

    if (modal.showModal) {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    if (modal.close) {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeProjectModal();
    });
  }

  $$('.gallery-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var key = card.dataset.project;
      openProjectModal(key);
    });
  });

  var modalInquire = $('.js-modal-inquire');
  if (modalInquire) {
    modalInquire.addEventListener('click', function () {
      closeProjectModal();
    });
  }

  /* ---------- 7. TOAST NOTIFICATION HELPER ---------- */
  var toast = $('#toast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  /* ---------- 8. CONTACT FORM SUBMISSION (WHATSAPP & EMAIL) ---------- */
  var form = $('#enquiry-form');
  var emailBtn = $('#form-email-btn');

  function getFormData() {
    var name = ($('#form-name') ? $('#form-name').value.trim() : '');
    var phone = ($('#form-phone') ? $('#form-phone').value.trim() : '');
    var email = ($('#form-email') ? $('#form-email').value.trim() : '');
    var type = ($('#form-type') ? $('#form-type').value : '');
    var location = ($('#form-location') ? $('#form-location').value.trim() : '');
    var message = ($('#form-message') ? $('#form-message').value.trim() : '');

    return {
      name: name,
      phone: phone,
      email: email,
      type: type,
      location: location,
      message: message
    };
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = getFormData();

      if (!d.name || !d.phone) {
        showToast('Please enter your name and phone number.');
        return;
      }

      var text = 'Hello Er. Sameer Shaikh,\n\n' +
        'I am interested in architectural & engineering services:\n' +
        '• Name: ' + d.name + '\n' +
        '• Phone: ' + d.phone + '\n' +
        (d.email ? ('• Email: ' + d.email + '\n') : '') +
        '• Project Type: ' + d.type + '\n' +
        (d.location ? ('• Site Location: ' + d.location + '\n') : '') +
        (d.message ? ('• Requirements: ' + d.message + '\n') : '') +
        '\nPlease let me know when we can schedule a consultation.';

      var waUrl = 'https://wa.me/918788731650?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening WhatsApp to send your enquiry...');
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      var d = getFormData();
      if (!d.name || !d.phone) {
        showToast('Please enter your name and phone number first.');
        return;
      }

      var subject = 'Project Enquiry from ' + d.name + ' (' + d.type + ')';
      var body = 'Dear Er. Sameer Shaikh,\n\n' +
        'I would like to consult with Anayah Associates for my project.\n\n' +
        '• Client Name: ' + d.name + '\n' +
        '• Phone: ' + d.phone + '\n' +
        '• Email: ' + d.email + '\n' +
        '• Project: ' + d.type + '\n' +
        '• Plot Location: ' + d.location + '\n' +
        '• Requirements: ' + d.message + '\n\n' +
        'Kindly connect at your earliest convenience.';

      var mailtoUrl = 'mailto:anayahassociates1@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailtoUrl;
      showToast('Opening your email app...');
    });
  }

})();
