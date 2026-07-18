(function () {
  "use strict";

  // Mark JS as available so CSS can enable the reveal-on-scroll effect
  // (page is fully usable/visible without this, per progressive enhancement).
  document.documentElement.classList.add("js");

  // --- Mobile navigation toggle ---
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú de navegación");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // --- Scroll reveal ---
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // --- Galaxy background (whole page, fixed) ---
  var canvas = document.getElementById("galaxy-bg");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = 0, height = 0;
    var stars = [];
    var nebulas = [];
    var angle = 0;
    var rafId = null;
    var running = false;

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function buildField() {
      var area = width * height;
      var starCount = Math.max(60, Math.min(220, Math.round(area / 5500)));
      stars = [];
      for (var i = 0; i < starCount; i++) {
        stars.push({
          x: rand(0, width),
          y: rand(0, height),
          r: rand(0.5, 1.8),
          baseAlpha: rand(0.25, 0.9),
          phase: rand(0, Math.PI * 2),
          twinkleSpeed: rand(0.4, 1.4),
          driftX: rand(-0.008, 0.008),
          driftY: rand(-0.006, 0.006)
        });
      }

      nebulas = [
        { x: width * 0.22, y: height * 0.3, r: Math.max(width, height) * 0.28, color: "34,211,238", drift: 0.05 },
        { x: width * 0.78, y: height * 0.18, r: Math.max(width, height) * 0.24, color: "255,90,31", drift: 0.06 },
        { x: width * 0.5, y: height * 0.85, r: Math.max(width, height) * 0.22, color: "34,211,238", drift: 0.04 }
      ];
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildField();
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      // Nebula glow clouds — slow drifting radial gradients
      nebulas.forEach(function (n, i) {
        var ox = Math.sin(time * 0.00005 * n.drift + i) * width * 0.06;
        var oy = Math.cos(time * 0.00004 * n.drift + i) * height * 0.06;
        var gradient = ctx.createRadialGradient(n.x + ox, n.y + oy, 0, n.x + ox, n.y + oy, n.r);
        gradient.addColorStop(0, "rgba(" + n.color + ",0.10)");
        gradient.addColorStop(1, "rgba(" + n.color + ",0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Slow galaxy-like rotation for the star field
      angle += 0.00006;
      var cx = width / 2, cy = height / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.translate(-cx, -cy);

      stars.forEach(function (s) {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < -5) s.x = width + 5;
        if (s.x > width + 5) s.x = -5;
        if (s.y < -5) s.y = height + 5;
        if (s.y > height + 5) s.y = -5;

        var twinkle = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(time * 0.001 * s.twinkleSpeed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + (s.baseAlpha * twinkle).toFixed(3) + ")";
        ctx.fill();
      });

      ctx.restore();
    }

    function loop(time) {
      draw(time || 0);
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      if (reduceMotion) {
        draw(0);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    resize();
    draw(0);
    start();

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        draw(0);
      }, 150);
    });
  }
})();
