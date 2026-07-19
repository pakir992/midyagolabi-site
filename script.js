// =====================================================
// script.js — shared by ALL pages. Three jobs:
//   1. hamburger dropdown (every page)
//   2. images folder open/close (project pages)
//   3. fullscreen slider / lightbox (project pages)
// Each block checks its elements exist first, because e.g.
// index.html has no folder — without the check, JS would
// crash there and stop running.
// =====================================================

// ---------- 1. HAMBURGER MENU ----------

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    header.classList.toggle("open");
  });

  // close when clicking anywhere outside the header
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      header.classList.remove("open");
    }
  });
}

// ---------- 2. IMAGES FOLDER ----------

const folderButton = document.querySelector(".folder-toggle");
const folderContent = document.querySelector(".folder-content");

if (folderButton) {
  folderButton.addEventListener("click", () => {
    // toggle both: button (rotates arrow) and content (shows grid)
    folderButton.classList.toggle("open");
    folderContent.classList.toggle("open");
  });
}

// ---------- 3. LIGHTBOX SLIDER ----------

const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");
  // all folder previews, as a real array so we can use indexOf etc.
  const thumbs = Array.from(document.querySelectorAll(".folder-content img"));
  let current = 0; // index of the slide on screen

  // show slide number n (wrapping around at both ends)
  function show(n) {
    // modulo trick: (-1 + 7) % 7 = 6 → left arrow on first
    // image wraps to the last one, and vice versa
    current = (n + thumbs.length) % thumbs.length;
    lightboxImg.src = thumbs[current].src;
    lightboxImg.alt = thumbs[current].alt;
  }

  function open(n) {
    show(n);
    lightbox.classList.add("open");
  }

  function close() {
    lightbox.classList.remove("open");
  }

  // clicking a preview opens the slider at that image
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => open(i));
  });

  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));
  lightbox.querySelector(".lightbox-close").addEventListener("click", close);

  // clicking the dark background (not the image/buttons) also closes
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  // keyboard: ← → navigate, Esc closes — but only while open
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
    if (event.key === "Escape") close();
  });
}

// ---------- 4. SCROLL REVEAL (any page using class="reveal") ----------

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
