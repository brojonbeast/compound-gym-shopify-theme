/*============================================================================
  Compound Gym Replit Theme — main.js
  Mobile menu toggle | Product image thumbnails | Smooth scroll | No dependencies
============================================================================*/

(function () {
  'use strict';

  /* ── Mobile Menu Toggle ─────────────────────────────────────────────── */
  function initMobileMenu() {
    var toggle = document.getElementById('mobile-menu-toggle');
    var menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      var newState = !isExpanded;

      toggle.setAttribute('aria-expanded', String(newState));
      menu.setAttribute('aria-hidden', String(!newState));

      if (newState) {
        toggle.setAttribute('aria-label', 'Close navigation menu');
        document.body.style.overflow = 'hidden';
      } else {
        toggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
      }
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    /* Close when clicking outside */
    document.addEventListener('click', function (e) {
      if (
        toggle.getAttribute('aria-expanded') === 'true' &&
        !toggle.contains(e.target) &&
        !menu.contains(e.target)
      ) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Product Image Thumbnails ───────────────────────────────────────── */
  function initProductThumbnails() {
    var featuredImg = document.getElementById('product-featured-img');
    var thumbnails = document.querySelectorAll('.product-thumbnail');

    if (!featuredImg || !thumbnails.length) return;

    thumbnails.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var newSrc = this.getAttribute('data-image-src');
        if (newSrc) {
          featuredImg.src = newSrc;
        }

        thumbnails.forEach(function (t) {
          t.classList.remove('product-thumbnail--active');
        });
        this.classList.add('product-thumbnail--active');
      });
    });
  }

  /* ── Smooth Scroll for anchor links ────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        var headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 64;

        var targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ── Product Variant Picker ─────────────────────────────────────────── */
  function initVariantPicker() {
    var forms = document.querySelectorAll('[id^="product-form"]');
    forms.forEach(function (form) {
      var sectionId = form.getAttribute('data-section-id');
      if (!sectionId) return;

      var variantsEl = document.getElementById('product-variants-' + sectionId);
      if (!variantsEl) return;

      var variants;
      try { variants = JSON.parse(variantsEl.textContent); } catch (e) { return; }

      var variantInput = document.getElementById('variant-id-' + sectionId);
      if (!variantInput) return;

      var selects = form.querySelectorAll('.product-option__select');
      if (!selects.length) return;

      function getSelectedOptions() {
        return Array.prototype.map.call(selects, function (sel) {
          return sel.value;
        });
      }

      function findVariant(options) {
        return variants.find(function (v) {
          return v.options.every(function (opt, i) {
            return opt === options[i];
          });
        });
      }

      function updateVariant() {
        var options = getSelectedOptions();
        var matched = findVariant(options);
        if (matched) {
          variantInput.value = matched.id;
          var submitBtn = form.querySelector('[type="submit"]');
          if (submitBtn) {
            if (matched.available) {
              submitBtn.disabled = false;
              submitBtn.removeAttribute('aria-disabled');
              submitBtn.textContent = 'Add to Cart';
            } else {
              submitBtn.disabled = true;
              submitBtn.setAttribute('aria-disabled', 'true');
              submitBtn.textContent = 'Sold Out';
            }
          }
        }
      }

      selects.forEach(function (sel) {
        sel.addEventListener('change', updateVariant);
      });
    });
  }

  /* ── Cart Quantity Input — prevent < 0 ─────────────────────────────── */
  function initCartInputs() {
    document.querySelectorAll('.cart-item__qty-input').forEach(function (input) {
      input.addEventListener('change', function () {
        if (parseInt(this.value) < 0) {
          this.value = 0;
        }
      });
    });
  }

  /* ── Announce cart count to screen readers ──────────────────────────── */
  function initCartAnnouncer() {
    var cartLink = document.querySelector('.site-header__cart');
    if (!cartLink) return;

    var count = cartLink.querySelector('.site-header__cart-count');
    if (count) {
      var liveRegion = document.createElement('span');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'visually-hidden';
      liveRegion.textContent = count.textContent + ' items in cart';
      document.body.appendChild(liveRegion);
    }
  }

  /* ── PT inquiry form: scroll to on CTA click ───────────────────────── */
  function initPTFormScroll() {
    var ptCTAs = document.querySelectorAll('a[href="#pt-contact"]');
    ptCTAs.forEach(function (cta) {
      cta.addEventListener('click', function (e) {
        var target = document.getElementById('pt-contact');
        if (!target) return;

        e.preventDefault();
        var headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 64;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        var firstInput = target.querySelector('input, select, textarea');
        if (firstInput) setTimeout(function () { firstInput.focus(); }, 400);
      });
    });
  }

  /* ── Init all ───────────────────────────────────────────────────────── */
  function init() {
    initVariantPicker();
    initMobileMenu();
    initProductThumbnails();
    initSmoothScroll();
    initCartInputs();
    initCartAnnouncer();
    initPTFormScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
