/**
 * A–Z Menagerie — Gallery data & interactions
 * Each `file` must match the filename in the repository root exactly (case-sensitive).
 */

const HERO_IMAGE = "HEro.png";

const ANIMALS = [
  { letter: "A", name: "Alligator", file: "Alligator.png", description: "A large, semi-aquatic reptile known for its powerful jaws and thick, armored skin." },
  { letter: "B", name: "Bear", file: "Bear.png", description: "A large, heavily built mammal known for its thick fur and winter hibernation." },
  { letter: "C", name: "Camel", file: "Camel.png", description: "A long-legged mammal known for its distinctive humps and ability to survive in harsh deserts." },
  { letter: "D", name: "Dog", file: "Dog.png", description: "A highly adaptable, domesticated canine known for its keen sense of smell and strong bond with humans.", hoverSound: "./dog-bark.wav" },
  { letter: "E", name: "Elephant", file: "Elephant.png", description: "A massive land mammal known for its highly dexterous trunk and large, flapping ears." },
  { letter: "F", name: "Fox", file: "Fox.png", description: "A small-to-medium-sized canine known for its bushy tail and reputation for cunning intelligence." },
  { letter: "G", name: "Giraffe", file: "Giraffe.png", description: "A towering African mammal known for its incredibly long neck and distinctively spotted coat." },
  { letter: "H", name: "Hippopotamus", file: "Hippopotamus.png", description: "A massive, semi-aquatic African mammal known for its barrel-shaped body and wide-opening mouth." },
  { letter: "I", name: "Iguana", file: "iguana.png", description: "A large, herbivorous lizard known for a prominent dewlap and a row of spines down its back." },
  { letter: "J", name: "Jaguar", file: "Jaguar.png", description: "A powerful, solitary big cat known for its rosette-spotted coat and exceptionally strong bite." },
  { letter: "K", name: "Kangaroo", file: "Kangaroo.png", description: "A hopping Australian marsupial known for carrying its undeveloped young in an abdominal pouch." },
  { letter: "L", name: "Lion", file: "Lion.png", description: "A muscular big cat known for living in social prides and the male's impressive mane.", hoverSound: "./lion-growl.wav" },
  { letter: "M", name: "Monkey", file: "Monkey.png", description: "A highly adaptable primate known for its grasping hands, long tail, and tree-dwelling habits.", hoverSound: "./monkey-giggle.wav" },
  { letter: "N", name: "Needlefish", file: "Needlefish.png", description: "A slender, surface-dwelling fish known for its elongated, beak-like jaws filled with sharp teeth." },
  { letter: "O", name: "Ostrich", file: "Ostrich.png", description: "A large, flightless African bird known for its incredible running speed and long legs." },
  { letter: "P", name: "Peacock", file: "peacock.png", description: "A large, colorful bird known for the male's iridescent plumage and magnificent, fan-like tail display." },
  { letter: "Q", name: "Quail", file: "Quail.png", description: "A small, ground-dwelling game bird known for its plump body and distinctive feathered crest." },
  { letter: "R", name: "Rabbit", file: "Rabbit.png", description: "A small, burrowing mammal known for its long ears, fluffy tail, and rapid hopping movements." },
  { letter: "S", name: "Snake", file: "Snake.png", description: "A legless, elongated reptile known for its flexible jaw and slithering locomotion." },
  { letter: "T", name: "Tiger", file: "Tiger.png", description: "A massive, solitary big cat known for its striking orange coat with dark vertical stripes.", hoverSound: "./tiger-roar.mp3" },
  { letter: "U", name: "Urchin", file: "Urial.png", description: "A spiny, globular marine invertebrate known for moving slowly across the ocean floor." },
  { letter: "V", name: "Vulture", file: "Vulture.png", description: "A large, scavenging bird of prey known for its featherless head and crucial role in cleaning up carrion." },
  { letter: "W", name: "Wolf", file: "Wolf.png", description: "A highly social, pack-hunting canine known for its haunting howl and complex family structures.", hoverSound: "./wolf-howl.wav" },
  { letter: "X", name: "Xerus", file: "Xerus.png", description: "A burrowing African ground squirrel known for its coarse, bristly fur and using its bushy tail as a sunshade." },
  { letter: "Y", name: "Yak", file: "Yak.png", description: "A heavily built, long-haired bovine known for thriving in the freezing, high altitudes of the Himalayas." },
  { letter: "Z", name: "Zebra", file: "Zebra.png", description: "A wild, horse-like African mammal known for its iconic, unique pattern of black and white stripes." },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const galleryGrid = document.getElementById("gallery-grid");
const azIndex = document.querySelector(".az-index");
const searchInput = document.getElementById("search");
const emptyState = document.getElementById("gallery-empty");
const heroImage = document.querySelector(".hero-image");

let activeLetter = null;

function imagePath(file) {
  return `./${encodeURIComponent(file)}`;
}

function setHeroImage() {
  if (heroImage) {
    heroImage.src = `./${HERO_IMAGE}`;
  }
}

function buildGallery() {
  galleryGrid.innerHTML = ANIMALS.map(
    (animal, index) => `
      <article
        class="gallery-card reveal"
        style="--reveal-delay: ${Math.min(index * 0.04, 0.6)}s"
        role="listitem"
        data-letter="${animal.letter}"
        data-name="${animal.name.toLowerCase()}"
        data-description="${animal.description.toLowerCase()}"
        id="animal-${animal.letter.toLowerCase()}"
        ${animal.hoverSound ? `data-hover-sound="${animal.hoverSound}"` : ""}
        tabindex="0"
      >
        <div class="card-image-wrap">
          <img
            class="card-image"
            src="${imagePath(animal.file)}"
            alt="${animal.name} — monochrome illustration"
            loading="lazy"
            width="400"
            height="400"
            onerror="this.classList.add('image-missing')"
          >
        </div>
        <div class="card-meta">
          <div class="card-title">
            <div class="card-title-text">
              <span class="card-letter">${animal.letter}</span>
              <span class="card-name">${animal.name}</span>
            </div>
            <button
              type="button"
              class="card-sound"
              data-name="${animal.name}"
              aria-label="Play pronunciation for ${animal.name}"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 5.5v3h2.5L9 12V2L5.5 5.5H3z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
                <path d="M10.5 5.5a2 2 0 010 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M11.75 4.25a3.5 3.5 0 010 5.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <p class="card-desc">${animal.description}</p>
        </div>
      </article>
    `
  ).join("");
}

function buildAzIndex() {
  const availableLetters = new Set(ANIMALS.map((a) => a.letter));

  azIndex.innerHTML = ALPHABET.map((letter) => {
    const hasAnimal = availableLetters.has(letter);
    return `
      <button
        type="button"
        class="az-letter${hasAnimal ? "" : " disabled"}"
        data-letter="${letter}"
        aria-label="Filter by letter ${letter}"
        ${hasAnimal ? "" : "disabled"}
      >${letter}</button>
    `;
  }).join("");
}

function getCards() {
  return [...galleryGrid.querySelectorAll(".gallery-card")];
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const cards = getCards();
  let visibleCount = 0;

  cards.forEach((card) => {
    const letter = card.dataset.letter;
    const name = card.dataset.name;
    const description = card.dataset.description;
    const matchesLetter = !activeLetter || letter === activeLetter;
    const matchesSearch = !query || name.includes(query) || description.includes(query) || letter.toLowerCase() === query;
    const visible = matchesLetter && matchesSearch;

    card.hidden = !visible;
    if (visible) visibleCount++;
  });

  emptyState.hidden = visibleCount > 0;
}

function setActiveLetter(letter) {
  activeLetter = activeLetter === letter ? null : letter;

  azIndex.querySelectorAll(".az-letter").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.letter === activeLetter);
  });

  applyFilters();

  if (activeLetter) {
    const target = document.getElementById(`animal-${activeLetter.toLowerCase()}`);
    if (target && !target.hidden) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
}

function speakAnimalName(name) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(name);
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function initSoundButtons() {
  galleryGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-sound");
    if (!btn) return;
    e.stopPropagation();
    speakAnimalName(btn.dataset.name);
  });
}

const hoverAudioCache = new Map();

function playHoverSound(src) {
  let audio = hoverAudioCache.get(src);
  if (!audio) {
    audio = new Audio(src);
    hoverAudioCache.set(src, audio);
  }
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function initHoverSounds() {
  document.querySelectorAll("[data-hover-sound]").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      playHoverSound(card.dataset.hoverSound);
    });
  });
}

function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    alert(`Thanks for subscribing with ${email}. (Connect this to your email service.)`);
    form.reset();
  });
}

function initScrollAnimations() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initHeroAnimations() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    document.body.classList.add("is-loaded");
    document.querySelector(".site-header")?.classList.add("is-visible");
    return;
  }

  requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
    document.querySelector(".site-header")?.classList.add("is-visible");
    document.querySelector(".hero-visual")?.classList.add("is-visible");
  });
}

function init() {
  setHeroImage();
  buildGallery();
  buildAzIndex();
  initScrollAnimations();
  initHeroAnimations();

  azIndex.addEventListener("click", (e) => {
    const btn = e.target.closest(".az-letter:not(.disabled)");
    if (btn) setActiveLetter(btn.dataset.letter);
  });

  searchInput.addEventListener("input", applyFilters);
  initSoundButtons();
  initHoverSounds();
  initNewsletter();
}

init();
