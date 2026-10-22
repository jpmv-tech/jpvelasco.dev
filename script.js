(function () {
  "use strict";

  // Flag JS as available so CSS can hide no-JS-unfriendly states
  // (animations, scroll-reveal hidden states) only when this runs.
  document.documentElement.classList.add("js");

  /* ---------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------- */
  var menuToggle = document.querySelector(".menu-toggle");
  var mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu after a nav link is used.
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     Sticky header: tighten and add a divider once the page
     scrolls away from the top.
     --------------------------------------------------------- */
  var siteHeader = document.querySelector(".site-header");

  if (siteHeader) {
    var updateHeader = function () {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* ---------------------------------------------------------
     Screenshot fallback: swap to the placeholder SVG when the
     real file is missing. Covers images that fail after JS
     loads (error event) and images that already failed before
     JS attached its listener (complete + naturalWidth === 0).
     --------------------------------------------------------- */
  function usePlaceholder(img) {
    var placeholder = img.getAttribute("data-placeholder");
    if (!placeholder || img.classList.contains("is-placeholder")) return;
    img.src = placeholder;
    img.classList.add("is-placeholder");
  }

  var trackedImages = document.querySelectorAll("img[data-placeholder]");
  trackedImages.forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) {
      usePlaceholder(img);
    } else {
      img.addEventListener("error", function () {
        usePlaceholder(img);
      });
    }
  });

  /* ---------------------------------------------------------
     Scroll reveal (animation #2): project showcases and
     how-it-works stops slide up + fade in once, the first
     time they enter the viewport. Elements stay visible by
     default (see CSS: only .js .reveal starts hidden), and
     prefers-reduced-motion skips the transition entirely.
     --------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // No IntersectionObserver support: just show everything.
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------------------
     Click-to-enlarge for [data-zoom] buttons (Project 04), the
     screenshot carousel and the "My work" pictures. Images with
     data-full open that larger file instead of the thumbnail.
     One shared <dialog>; closes on any click, Esc (native)
     or the close button.
     --------------------------------------------------------- */
  var zoomButtons = document.querySelectorAll("[data-zoom]");
  var zoomImages = document.querySelectorAll(".marquee-item img, #work .project-media img");
  if ((zoomButtons.length || zoomImages.length) && typeof HTMLDialogElement === "function") {
    var lightbox = document.createElement("dialog");
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-label", "Enlarged screenshot");
    lightbox.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(lightbox);
    var lightboxImg = lightbox.querySelector("img");

    var openLightbox = function (img) {
      lightboxImg.src = img.getAttribute("data-full") || img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.showModal();
    };

    zoomButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        openLightbox(btn.querySelector("img"));
      });
    });

    zoomImages.forEach(function (img) {
      if (img.closest("[data-zoom]")) return; // already handled by its button
      img.classList.add("is-zoomable");
      img.addEventListener("click", function () {
        openLightbox(img);
      });
      // Keyboard access, except for the carousel's hidden duplicate row
      if (!img.closest('[aria-hidden="true"]')) {
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox(img);
          }
        });
      }
    });

    lightbox.addEventListener("click", function () {
      lightbox.close();
    });
  }

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
