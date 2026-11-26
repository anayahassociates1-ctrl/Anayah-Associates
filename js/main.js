/* ==========================================================================
   ANAYAH ASSOCIATES — ZERO-LAG ENGINE & INTERACTIVE SCRIPTS
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- 1. LENIS SMOOTH SCROLL INITIALIZATION ---------- */
  var lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.25,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* ---------- 2. STARTING INTRO ANIMATION PRELOADER ---------- */
  var introLoader = $('#intro-loader');
  function dismissIntro() {
    if (!introLoader || introLoader.classList.contains('is-hidden')) return;
    introLoader.classList.add('is-hidden');
  }

  window.addEventListener('load', function () {
    setTimeout(dismissIntro, 1000);
  });
  setTimeout(dismissIntro, 2000);
  window.addEventListener('keydown', dismissIntro, { once: true });
  window.addEventListener('touchstart', dismissIntro, { once: true });
  window.addEventListener('wheel', dismissIntro, { once: true });

  /* ---------- 3. SMART NAVBAR: AUTO-HIDE & REVEAL (NO OVERLAP) ---------- */
  var navbar = $('#navbar');
  var burger = $('#nav-burger');
  var drawer = $('#mobile-drawer');
  var drawerClose = $('#drawer-close');

  var lastScrollY = window.scrollY;
  var scrollThreshold = 8;
  var ticking = false;

  function handleNavbarScroll() {
    var currentScrollY = window.scrollY;
    var delta = currentScrollY - lastScrollY;

    if (currentScrollY <= 40) {
      // At top of page: transparent full-width navbar
      navbar.classList.add('is-top');
      navbar.classList.remove('is-scrolled', 'nav-hidden', 'nav-visible');
    } else {
      navbar.classList.remove('is-top');
      navbar.classList.add('is-scrolled');

      if (delta > scrollThreshold) {
        // Scrolling DOWN: auto-hide so it NEVER blocks content
        navbar.classList.add('nav-hidden');
        navbar.classList.remove('nav-visible');
      } else if (delta < -scrollThreshold) {
        // Scrolling UP: reveal compact, floating glassmorphic pill bar
        navbar.classList.remove('nav-hidden');
        navbar.classList.add('nav-visible');
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(handleNavbarScroll);
      ticking = true;
    }
  }, { passive: true });

  handleNavbarScroll();

  // Mobile Drawer
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      drawer.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    });
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  // Mobile Drawer Services Accordion
  var mServicesBtn = $('#m-services-btn');
  var mServicesAccordion = $('#m-services-accordion');
  if (mServicesBtn && mServicesAccordion) {
    mServicesBtn.addEventListener('click', function () {
      mServicesAccordion.classList.toggle('is-open');
    });
  }

  $$('.m-sub-link').forEach(function (link) {
    link.addEventListener('click', function () {
      closeDrawer();
    });
  });

  $$('.m-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      closeDrawer();
      var targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        var targetEl = $(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -80 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Desktop smooth anchor clicks with offset
  $$('.nav-link[href^="#"], .btn-hero-primary, .btn-hero-secondary, .btn-pill-nav, .f-col a[href^="#"], .about-actions a[href^="#"], .about-office-pill, .back-top').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        var targetEl = $(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -90 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  /* ---------- 4. SCROLL REVEAL TRANSITIONS (.fade-up) ---------- */
  var fadeElements = $$('.fade-up');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    fadeElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- 5. STATS COUNT-UP NUMBERS ---------- */
  var counters = $$('.js-counter');
  var countStarted = false;

  function runCounters() {
    counters.forEach(function (counter) {
      var target = parseInt(counter.dataset.target, 10) || 0;
      var duration = 1500;
      var startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        var progress = Math.min((currentTime - startTime) / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(easeOut * target);

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
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countStarted) {
          countStarted = true;
          runCounters();
        }
      });
    }, { threshold: 0.25 });
    statsObserver.observe(statsSec);
  } else {
    runCounters();
  }

  /* ---------- 6. STICKY HORIZONTAL SCROLL GALLERY (WITH LERP INTERPOLATION) ---------- */
  var gallerySec = $('#gallery');
  var galleryTrack = $('#gallery-track');
  var currentTranslate = 0;
  var targetTranslate = 0;
  var isDesktop = window.innerWidth >= 769;

  function updateGalleryTarget() {
    if (!gallerySec || !galleryTrack || !isDesktop) return;
    var rect = gallerySec.getBoundingClientRect();
    var viewHeight = window.innerHeight;
    var totalHeight = rect.height;
    var scrolled = -rect.top;
    var maxScroll = totalHeight - viewHeight;

    if (maxScroll <= 0) return;

    var progress = Math.max(0, Math.min(1, scrolled / maxScroll));
    var limit = Math.max(0, galleryTrack.scrollWidth - window.innerWidth + 80);
    targetTranslate = progress * limit;
  }

  // Smooth LERP animation loop on desktop
  function animateGallery() {
    if (isDesktop && galleryTrack) {
      currentTranslate += (targetTranslate - currentTranslate) * 0.12;
      galleryTrack.style.transform = 'translate3d(-' + currentTranslate.toFixed(2) + 'px, 0, 0)';
    }
    requestAnimationFrame(animateGallery);
  }
  requestAnimationFrame(animateGallery);

  window.addEventListener('scroll', updateGalleryTarget, { passive: true });
  window.addEventListener('resize', function () {
    isDesktop = window.innerWidth >= 769;
    if (!isDesktop && galleryTrack) {
      galleryTrack.style.transform = 'none';
    } else {
      updateGalleryTarget();
    }
  });

  /* ---------- 7. INTERACTIVE WHY CHOOSE US ACCORDION & IMAGE SWITCHER ---------- */
  var whyItems = $$('.why-item');
  var dynamicImg = $('#why-dynamic-img');

  whyItems.forEach(function (item) {
    var btn = item.querySelector('.why-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      whyItems.forEach(function (it) {
        it.classList.remove('is-open');
        var toggle = it.querySelector('.why-toggle');
        if (toggle) toggle.textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        var toggle = item.querySelector('.why-toggle');
        if (toggle) toggle.textContent = '−';

        var newImgSrc = item.dataset.img;
        if (dynamicImg && newImgSrc) {
          dynamicImg.style.opacity = '0';
          dynamicImg.style.transform = 'scale(0.97)';
          setTimeout(function () {
            dynamicImg.src = newImgSrc;
            dynamicImg.style.opacity = '1';
            dynamicImg.style.transform = 'scale(1)';
          }, 180);
        }
      }
    });
  });

  /* ---------- 8. PROJECTS DATA, 3 CATEGORY FOLDERS & DIRECTOR MANAGEMENT ---------- */
  var defaultProjects = {
    'aasif': {
      id: 'aasif',
      folder: 'residential',
      client: 'Mr. Aasif Bhai Shaikh',
      location: 'Islampura, Deolali Pravara',
      img: 'assets/img/projects/aasif-bhai-bungalow.webp'
    },
    'modern-elevation': {
      id: 'modern-elevation',
      folder: 'residential',
      client: 'Mazhar Bhai Pathan',
      location: 'Rahuri, Ahilyanagar',
      img: 'assets/img/projects/architectural-elevation-modern.webp'
    },
    'commercial': {
      id: 'commercial',
      folder: 'commercial',
      client: 'Mr. Bashir Pathan',
      location: 'Shivaji Chowk, Deolali Pravara',
      img: 'assets/img/projects/pathan-complex.webp'
    },
    'executive': {
      id: 'executive',
      folder: 'residential',
      client: 'Shete Family',
      location: 'Rahuri, Ahilyanagar',
      img: 'assets/img/projects/anayah-executive-residence.webp'
    },
    'contemporary': {
      id: 'contemporary',
      folder: 'residential',
      client: 'Sagar Warghude',
      location: 'Kangar, Tal-Rahuri',
      img: 'assets/img/projects/anayah-contemporary-villa.webp'
    },
    'mangal': {
      id: 'mangal',
      folder: 'commercial',
      client: 'Sai Shaneshwar Farmer Producer Company Ltd',
      location: 'Jatap',
      img: 'assets/img/projects/sai-shaneshwar-karyalay.webp'
    },
    'concept': {
      id: 'concept',
      folder: 'residential',
      client: 'Asim Inamdar',
      location: 'Deolali Pravara',
      img: 'assets/img/projects/anayah-3d-concept.webp'
    },
    'sujit-londhe': {
      id: 'sujit-londhe',
      folder: 'residential',
      client: 'Mr. Sujit Londhe',
      location: 'Rahuri Factory',
      img: 'assets/img/projects/mangalmurti-londhe.jpg'
    },
    'sunil-kalhapure': {
      id: 'sunil-kalhapure',
      folder: 'residential',
      client: 'Shri. Sunil Kalhapure',
      location: 'Vambori',
      img: 'assets/img/projects/kalhapure-sunil.jpg'
    },
    'noman-qureshi': {
      id: 'noman-qureshi',
      folder: 'residential',
      client: 'Noman Qureshi',
      location: 'Rahata',
      img: 'assets/img/projects/noman-qureshi.jpg'
    },
    'kalim-khan': {
      id: 'kalim-khan',
      folder: 'residential',
      client: 'Kalim Khan',
      location: 'Daulatpur (Uttar Pradesh)',
      img: 'assets/img/projects/kalim-khan.jpg'
    },
    'twin-villa': {
      id: 'twin-villa',
      folder: 'residential',
      client: 'Twin Villa Estate',
      location: 'Rahuri, Ahilyanagar',
      img: 'assets/img/projects/twin-villa-estate.jpg'
    },
    'hotel-ganraj': {
      id: 'hotel-ganraj',
      folder: 'commercial',
      client: 'Hotel Ganraj',
      location: 'State Highway Corridor, Maharashtra',
      img: 'assets/img/projects/hotel-ganraj-aerial.jpg'
    },
    'masjid-elevation-1': {
      id: 'masjid-elevation-1',
      folder: 'religious',
      client: 'Masjid',
      location: '',
      img: 'assets/img/projects/masjid-elevation-1.jpg'
    },
    'masjid-elevation-2': {
      id: 'masjid-elevation-2',
      folder: 'religious',
      client: 'Masjid',
      location: '',
      img: 'assets/img/projects/masjid-elevation-2.jpg'
    },
    'masjid-interior-mihrab': {
      id: 'masjid-interior-mihrab',
      folder: 'religious',
      client: 'Masjid',
      location: '',
      img: 'assets/img/projects/masjid-interior-mihrab.jpg'
    },
    'altaf-shaikh': {
      id: 'altaf-shaikh',
      folder: 'residential',
      client: 'Altaf Shaikh',
      location: 'Kolhar',
      img: 'assets/img/projects/altaf-shaikh.jpg'
    },
    'fajal-bhai-jivani': {
      id: 'fajal-bhai-jivani',
      folder: 'residential',
      client: 'Fajal Bhai Jivani',
      location: 'Shrirampur',
      img: 'assets/img/projects/fajal-bhai-jivani.jpg'
    }
  };

  // Load clean project database (Owner Name & Location of Site ONLY)
  var projectData = {};
  var STORAGE_KEY = 'anayah_projects_clean_v7';
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      projectData = JSON.parse(stored);
    } else {
      projectData = JSON.parse(JSON.stringify(defaultProjects));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));
    }
  } catch (e) {
    projectData = JSON.parse(JSON.stringify(defaultProjects));
  }

  // Ensure default items and new designs are always synchronized
  Object.keys(defaultProjects).forEach(function (k) {
    if (!projectData[k]) {
      projectData[k] = defaultProjects[k];
    }
  });

  if (projectData['aasif']) {
    projectData['aasif'].location = 'Islampura, Deolali Pravara';
  }
  if (projectData['modern-elevation']) {
    projectData['modern-elevation'].client = 'Mazhar Bhai Pathan';
    projectData['modern-elevation'].location = 'Rahuri, Ahilyanagar';
  }
  if (projectData['executive']) {
    projectData['executive'].client = 'Shete Family';
    projectData['executive'].location = 'Rahuri, Ahilyanagar';
  }
  if (projectData['contemporary']) {
    projectData['contemporary'].client = 'Sagar Warghude';
    projectData['contemporary'].location = 'Kangar, Tal-Rahuri';
  }
  if (projectData['commercial']) {
    projectData['commercial'].location = 'Shivaji Chowk, Deolali Pravara';
  }
  if (projectData['mangal']) {
    projectData['mangal'].client = 'Sai Shaneshwar Farmer Producer Company Ltd';
    projectData['mangal'].location = 'Jatap';
  }
  if (!projectData['hotel-ganraj']) {
    projectData['hotel-ganraj'] = defaultProjects['hotel-ganraj'];
  }
  if (projectData['masjid-elevation-1']) {
    projectData['masjid-elevation-1'].client = 'Masjid';
    projectData['masjid-elevation-1'].location = '';
  }
  if (projectData['masjid-elevation-2']) {
    projectData['masjid-elevation-2'].client = 'Masjid';
    projectData['masjid-elevation-2'].location = '';
  }
  if (projectData['masjid-interior-mihrab']) {
    projectData['masjid-interior-mihrab'].client = 'Masjid';
    projectData['masjid-interior-mihrab'].location = '';
  }
  if (!projectData['altaf-shaikh']) {
    projectData['altaf-shaikh'] = defaultProjects['altaf-shaikh'];
  }
  if (!projectData['fajal-bhai-jivani']) {
    projectData['fajal-bhai-jivani'] = defaultProjects['fajal-bhai-jivani'];
  }
  if (projectData['industrial-peb']) delete projectData['industrial-peb'];
  if (projectData['seed-oil']) delete projectData['seed-oil'];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));
  } catch (e) {}

  function saveProjectsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }

  var currentFolder = 'residential';
  var isDirectorAuth = sessionStorage.getItem('anayah_director_auth') === 'true';

  // Modal references
  var modal = $('#project-modal');
  var modalCloseBtn = $('#modal-close-btn');
  var loginModal = $('#director-login-modal');
  var loginModalClose = $('#login-modal-close');
  var btnCancelLogin = $('#btn-cancel-login');
  var directorLoginForm = $('#director-login-form');
  var directorPasscodeInput = $('#director-passcode');
  var loginError = $('#login-error');
  var btnDirectorAccess = $('#btn-director-access');
  var mDirectorAccess = $('#m-director-access');
  var directorToolbar = $('#director-toolbar');
  var btnDirectorLogout = $('#btn-director-logout');
  var btnAddProject = $('#btn-add-project');
  var editModal = $('#director-project-modal');
  var editModalClose = $('#project-edit-modal-close');
  var btnCancelEdit = $('#btn-cancel-edit');
  var editProjectForm = $('#director-project-form');
  var navDirectorText = $('#nav-director-text');

  function openProjectModal(key) {
    var data = projectData[key];
    if (!data || !modal) return;

    var clientEl = $('#modal-client');
    var locEl = $('#modal-location');
    var imgEl = $('#modal-img');

    if (clientEl) clientEl.textContent = data.client || data.title || '';
    if (locEl) locEl.textContent = data.location || '';
    if (imgEl) imgEl.src = data.img || '';

    if (modal.showModal) {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeProjectModal() {
    if (!modal) return;
    if (modal.close) {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeProjectModal();
    });
  }

  // Update folder badges and render cards
  function updateFolderBadges() {
    var counts = { residential: 0, commercial: 0, religious: 0, industrial: 0 };
    Object.keys(projectData).forEach(function (k) {
      var item = projectData[k];
      var f = item.folder || 'residential';
      if (counts[f] !== undefined) counts[f]++;
    });
    var bRes = $('#badge-residential');
    var bCom = $('#badge-commercial');
    var bRel = $('#badge-religious');
    var bInd = $('#badge-industrial');
    if (bRes) bRes.textContent = counts.residential;
    if (bCom) bCom.textContent = counts.commercial;
    if (bRel) bRel.textContent = counts.religious;
    if (bInd) bInd.textContent = counts.industrial;
  }

  function renderGallery(folder) {
    currentFolder = folder;
    var track = $('#gallery-track');
    if (!track) return;

    // Update active tab buttons
    $$('.folder-tab').forEach(function (tab) {
      if (tab.dataset.folder === folder) {
        tab.classList.add('is-active');
      } else {
        tab.classList.remove('is-active');
      }
    });

    // Update navbar active states
    $$('.js-folder-nav').forEach(function (link) {
      if (link.dataset.folder === folder) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });

    updateFolderBadges();

    // Filter projects
    var keys = Object.keys(projectData).filter(function (k) {
      return (projectData[k].folder || 'residential') === folder;
    });

    track.innerHTML = '';

    if (keys.length === 0) {
      var emptyEl = document.createElement('div');
      emptyEl.className = 'gallery-empty';
      emptyEl.style.cssText = 'padding: 50px 20px; text-align: center; color: var(--ink-light); width: 100%; font-size: 14px;';
      emptyEl.innerHTML = '<p>No projects in this folder yet.</p>' +
        (isDirectorAuth ? '<button type="button" class="btn btn-sm btn-director-add" style="margin-top:10px;" onclick="document.getElementById(\'btn-add-project\').click()">+ Add First Project Photo</button>' : '');
      track.appendChild(emptyEl);
    } else {
      keys.forEach(function (key) {
        var item = projectData[key];
        var card = document.createElement('article');
        card.className = 'gallery-card';
        card.dataset.project = key;

        var imgWrap = document.createElement('div');
        imgWrap.className = 'g-img-wrap';
        var img = document.createElement('img');
        img.src = item.img || 'assets/img/projects/anayah-3d-concept.webp';
        img.alt = item.client || item.title || 'Project Photo';
        img.loading = 'lazy';
        imgWrap.appendChild(img);

        var info = document.createElement('div');
        info.className = 'g-info';

        var name = document.createElement('h3');
        name.className = 'g-name';
        name.textContent = item.client || item.title || 'Project';

        var loc = document.createElement('p');
        loc.className = 'g-loc';
        loc.textContent = item.location || '';

        info.appendChild(name);
        info.appendChild(loc);

        card.appendChild(imgWrap);
        card.appendChild(info);

        // If Director mode is authenticated, show Edit & Delete buttons
        if (isDirectorAuth) {
          var actionBox = document.createElement('div');
          actionBox.className = 'card-director-actions';

          var editBtn = document.createElement('button');
          editBtn.type = 'button';
          editBtn.className = 'btn-card-edit';
          editBtn.innerHTML = '✏️ Edit';
          editBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openEditProjectModal(key);
          });

          var delBtn = document.createElement('button');
          delBtn.type = 'button';
          delBtn.className = 'btn-card-delete';
          delBtn.innerHTML = '🗑️ Delete';
          delBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var owner = item.client || item.title || 'this project';
            if (confirm('Delete project photo for "' + owner + '"?')) {
              delete projectData[key];
              saveProjectsToStorage();
              renderGallery(currentFolder);
              showToast('Project photo deleted.');
            }
          });

          actionBox.appendChild(editBtn);
          actionBox.appendChild(delBtn);
          card.appendChild(actionBox);
        }

        card.addEventListener('click', function () {
          openProjectModal(key);
        });

        track.appendChild(card);
      });
    }

    currentTranslate = 0;
    targetTranslate = 0;
    if (track) track.style.transform = 'none';
    if (typeof updateGalleryTarget === 'function') updateGalleryTarget();
  }

  // Folder tab click event
  $$('.folder-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var f = tab.dataset.folder;
      renderGallery(f);
    });
  });

  // Folder nav links click (smooth scroll + activate folder)
  $$('.js-folder-nav').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var f = link.dataset.folder;
      if (f) renderGallery(f);
      var drawer = $('#mobile-drawer');
      if (drawer && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  // Director Auth UI Updates
  function updateDirectorUI() {
    if (isDirectorAuth) {
      if (directorToolbar) directorToolbar.style.display = 'flex';
      if (navDirectorText) navDirectorText.textContent = '👑 Director Mode';
    } else {
      if (directorToolbar) directorToolbar.style.display = 'none';
      if (navDirectorText) navDirectorText.textContent = 'Director Access';
    }
  }

  function openLoginModal() {
    if (loginError) loginError.style.display = 'none';
    if (directorPasscodeInput) directorPasscodeInput.value = '';
    if (loginModal) {
      if (loginModal.showModal) loginModal.showModal();
      else loginModal.setAttribute('open', '');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      setTimeout(function () {
        if (directorPasscodeInput) directorPasscodeInput.focus();
      }, 100);
    }
  }

  function closeLoginModal() {
    if (loginModal) {
      if (loginModal.close) loginModal.close();
      else loginModal.removeAttribute('open');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  }

  if (loginModalClose) loginModalClose.addEventListener('click', closeLoginModal);
  if (btnCancelLogin) btnCancelLogin.addEventListener('click', closeLoginModal);

  if (btnDirectorAccess) {
    btnDirectorAccess.addEventListener('click', function () {
      if (isDirectorAuth) {
        showToast('Director mode is already active.');
        var gal = $('#gallery');
        if (gal) gal.scrollIntoView({ behavior: 'smooth' });
      } else {
        openLoginModal();
      }
    });
  }

  if (mDirectorAccess) {
    mDirectorAccess.addEventListener('click', function (e) {
      e.preventDefault();
      var drawer = $('#mobile-drawer');
      if (drawer) drawer.classList.remove('is-open');
      document.body.style.overflow = '';
      if (isDirectorAuth) {
        showToast('Director mode is already active.');
      } else {
        openLoginModal();
      }
    });
  }

  if (directorLoginForm) {
    directorLoginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var pin = (directorPasscodeInput ? directorPasscodeInput.value.trim() : '');
      var storedPin = localStorage.getItem('anayah_director_pin') || '1234';
      if (pin === storedPin) {
        isDirectorAuth = true;
        sessionStorage.setItem('anayah_director_auth', 'true');
        closeLoginModal();
        updateDirectorUI();
        renderGallery(currentFolder);
        showToast('Director Mode unlocked! You can now Add, Edit, or Delete photos.');
      } else {
        if (loginError) loginError.style.display = 'block';
      }
    });
  }

  if (btnDirectorLogout) {
    btnDirectorLogout.addEventListener('click', function () {
      isDirectorAuth = false;
      sessionStorage.removeItem('anayah_director_auth');
      updateDirectorUI();
      renderGallery(currentFolder);
      showToast('Director Mode locked.');
    });
  }

  // Image Upload / Preview Handling
  var fileInput = $('#proj-file-input');
  var imgUrlInput = $('#proj-img-url');
  var previewBox = $('#proj-img-preview-box');
  var previewImg = $('#proj-img-preview');
  var currentSelectedImage = '';

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function (ev) {
          currentSelectedImage = ev.target.result;
          if (previewImg) previewImg.src = currentSelectedImage;
          if (previewBox) previewBox.style.display = 'flex';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (imgUrlInput) {
    imgUrlInput.addEventListener('input', function () {
      var val = imgUrlInput.value.trim();
      if (val) {
        currentSelectedImage = val;
        if (previewImg) previewImg.src = val;
        if (previewBox) previewBox.style.display = 'flex';
      }
    });
  }

  function openAddProjectModal() {
    if (!editModal) return;
    $('#edit-project-id').value = '';
    $('#director-modal-title').textContent = 'Add Project Photo';
    $('#director-modal-subtitle').textContent = 'DIRECTOR UPLOAD';
    $('#proj-folder').value = currentFolder;
    $('#proj-client').value = '';
    $('#proj-location').value = '';
    if (fileInput) fileInput.value = '';
    if (imgUrlInput) imgUrlInput.value = '';
    currentSelectedImage = '';
    if (previewBox) previewBox.style.display = 'none';

    if (editModal.showModal) editModal.showModal();
    else editModal.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function openEditProjectModal(key) {
    var item = projectData[key];
    if (!item || !editModal) return;
    $('#edit-project-id').value = key;
    $('#director-modal-title').textContent = 'Edit Project Photo';
    $('#director-modal-subtitle').textContent = 'DIRECTOR EDIT';
    $('#proj-folder').value = item.folder || currentFolder;
    $('#proj-client').value = item.client || item.title || '';
    $('#proj-location').value = item.location || '';
    if (fileInput) fileInput.value = '';
    if (imgUrlInput) imgUrlInput.value = (item.img && !item.img.startsWith('data:')) ? item.img : '';
    currentSelectedImage = item.img || '';

    if (currentSelectedImage && previewImg && previewBox) {
      previewImg.src = currentSelectedImage;
      previewBox.style.display = 'flex';
    } else if (previewBox) {
      previewBox.style.display = 'none';
    }

    if (editModal.showModal) editModal.showModal();
    else editModal.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeEditModal() {
    if (editModal) {
      if (editModal.close) editModal.close();
      else editModal.removeAttribute('open');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  }

  if (editModalClose) editModalClose.addEventListener('click', closeEditModal);
  if (btnCancelEdit) btnCancelEdit.addEventListener('click', closeEditModal);
  if (btnAddProject) btnAddProject.addEventListener('click', openAddProjectModal);

  if (editProjectForm) {
    editProjectForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var id = $('#edit-project-id').value;
      var isNew = !id;
      if (isNew) {
        id = 'proj_' + Date.now();
      }

      var photo = currentSelectedImage;
      if (!photo && imgUrlInput && imgUrlInput.value.trim()) {
        photo = imgUrlInput.value.trim();
      }
      if (!photo) {
        photo = 'assets/img/projects/anayah-3d-concept.webp';
      }

      var folder = $('#proj-folder').value || currentFolder;
      var client = $('#proj-client').value.trim();
      var location = $('#proj-location').value.trim();

      projectData[id] = {
        id: id,
        folder: folder,
        client: client,
        title: client,
        location: location,
        img: photo
      };

      saveProjectsToStorage();
      closeEditModal();
      renderGallery(folder);
      showToast(isNew ? 'New project photo added successfully!' : 'Project photo updated successfully!');
    });
  }

  // Initial gallery setup & director UI
  updateDirectorUI();
  renderGallery(currentFolder);

  // Initial gallery setup & director UI
  updateDirectorUI();
  renderGallery(currentFolder);

  var modalInquire = $('.js-modal-inquire');
  if (modalInquire) {
    modalInquire.addEventListener('click', function () {
      closeProjectModal();
    });
  }

  /* ---------- 9. TOAST NOTIFICATIONS ---------- */
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

  /* ---------- 10. CONTACT FORM (GOOGLE SHEETS, WHATSAPP & EMAIL) ---------- */
  // Deployed Google Apps Script Web App URL:
  var GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxMPxz_OSNsznDUxCwJI_RNnAqxsebGwB28XnfJfanDrZ8uSMif3Bu7CaALB6s6_v1nCQ/exec";

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

  // Background Google Sheets & Email Alert Dispatch
  function syncLeadToGoogleSheet(d) {
    if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.trim() === '' || GOOGLE_SHEET_WEBAPP_URL.indexOf('http') !== 0) {
      return;
    }

    var payload = {
      fullName: d.name,
      mobile: d.phone,
      email: d.email || '-',
      projectType: d.type || 'Residential Villa',
      location: d.location || '-',
      notes: d.message || '-',
      sourceUrl: window.location.href,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      fetch(GOOGLE_SHEET_WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(function () {
        console.log('Lead synced to Google Sheet successfully');
      }).catch(function (err) {
        console.warn('Google Sheet sync note:', err);
      });
    } catch (e) {
      // Fallback safe
    }
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = getFormData();

      if (!d.name || !d.phone) {
        showToast('Please enter your name and phone number.');
        return;
      }

      // Automatically sync lead to Google Sheet & trigger instant owner email alert
      syncLeadToGoogleSheet(d);

      var lines = [
        '*New Project Enquiry — Anayah Associates*',
        '',
        '*Client Name:* ' + d.name,
        '*Phone Number:* ' + d.phone,
        d.email ? ('*Email:* ' + d.email) : '',
        '*Project Type:* ' + d.type,
        d.location ? ('*Plot / Site Location:* ' + d.location) : '',
        d.message ? ('*Requirements:* ' + d.message) : '',
        '',
        'Hello Er. Sameer Shaikh, please review my project requirements above. Looking forward to your consultation.'
      ].filter(function (l) { return l !== ''; });

      var text = lines.join('\n');
      var encoded = encodeURIComponent(text);

      // Auto-copy to clipboard as an instant fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () {});
      }

      // Detect Mobile vs Desktop for direct, reliable WhatsApp chat opening
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      var waUrl = isMobile
        ? ('https://api.whatsapp.com/send?phone=918788731650&text=' + encoded)
        : ('https://web.whatsapp.com/send?phone=918788731650&text=' + encoded);

      // Use a trusted dynamic link click to prevent popup blockers & parameter dropping
      var link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      setTimeout(function () {
        if (link.parentNode) link.parentNode.removeChild(link);
      }, 500);

      // Show instant confirmation toast and inline status hint
      showToast('Opening WhatsApp with Er. Sameer (+91 87887 31650)...');

      var hint = $('#wa-status-hint');
      if (hint) {
        hint.innerHTML = 'Enquiry prepared for <strong>Er. Sameer Shaikh (+91 87887 31650)</strong>. ' +
          'If WhatsApp didn\'t open automatically, <a href="' + waUrl + '" target="_blank" rel="noopener">click here to open chat directly</a>.';
        hint.style.display = 'block';
      }
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      var d = getFormData();
      if (!d.name || !d.phone) {
        showToast('Please enter your name and phone number first.');
        return;
      }

      // Automatically sync lead to Google Sheet & trigger instant owner email alert
      syncLeadToGoogleSheet(d);

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
