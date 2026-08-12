const albums = {
  innerspeaker: {
    year:"2010", title:"Innerspeaker", className:"art-inner",
    description:"The debut studio album and the first full-length statement of Tame Impala's immersive psychedelic sound.",
    tracks:["It Is Not Meant to Be","Desire Be, Desire Go","Alter Ego","Lucidity","Why Won't You Make Up Your Mind?","Solitude Is Bliss","Jeremy's Storm","Expectation"]
  },
  lonerism: {
    year:"2012", title:"Lonerism", className:"art-loner",
    description:"A more expansive and inward-looking record built around isolation, melody and a kaleidoscopic production style.",
    tracks:["Be Above It","Endors Toi","Apocalypse Dreams","Mind Mischief","Music to Walk Home By","Why Won't They Talk to Me?","Feels Like We Only Go Backwards","Elephant"]
  },
  currents: {
    year:"2015", title:"Currents", className:"art-current",
    description:"A transformation toward synth-pop and electronic textures, centered on change, relationships and moving forward.",
    tracks:["Let It Happen","Nangs","The Moment","Reality in Motion","Eventually","Disciples","Cause I'm a Man","New Person, Same Old Mistakes"]
  },
   slowrush: {
    year:"2020", title:"The Slow Rush", className:"art-slow",
    description:"A record obsessed with the passage of time, memory and the tension between living in the present and looking ahead.",
    tracks:["One More Year","Instant Destiny","Borderline","Posthumous Forgiveness","Breathe Deeper","Tomorrow's Dust","On Track","Is It True"]
  },
  deadbeat: {
    year:"2025", title:"Deadbeat", className:"art-deadbeat",
    description:"A club-psych evolution inspired by rave culture, spontaneous production and direct songwriting.",
    tracks:["My Old Ways","No Reply","Dracula","Loser","Oblivion","Not My World","Piece of Heaven","Obsolete","Ethereal Connection","See You On Monday (You're Lost)","Afterthought","End of Summer"]
  }
};

const header = document.querySelector(".site-header");
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".menu-toggle");
const glow = document.querySelector(".cursor-glow");
const modal = document.querySelector(".album-modal");
const modalArt = document.querySelector(".modal-art");
const modalYear = document.querySelector(".modal-year");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const tracklist = document.querySelector(".tracklist");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

toggle.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.addEventListener("mousemove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

document.querySelectorAll(".album-card").forEach(card => {
  card.addEventListener("click", () => {
    const album = albums[card.dataset.album];
    modalArt.className = `modal-art album-art ${album.className}`;
    modalYear.textContent = album.year;
    modalTitle.textContent = album.title;
    modalDescription.textContent = album.description;
    tracklist.innerHTML = album.tracks.map(track => `<li>${track}</li>`).join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});


/* =========================================================
   V3.0 FOUNDATION
   Loader + reveal observer + accessibility hooks
   ========================================================= */

(() => {
  const body = document.body;
  const loader = document.getElementById("v3Loader");
  const loaderBar = document.getElementById("v3LoaderBar");
  const loaderPercent = document.getElementById("v3LoaderPercent");
  const loaderText = document.getElementById("v3LoaderText");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finishExperience = () => {
    body.dataset.v3Ready = "true";

    if (!loader) return;

    loader.classList.add("is-done");

    window.setTimeout(() => {
      loader.setAttribute("aria-hidden", "true");
    }, reducedMotion ? 0 : 850);
  };

  if (loader) {
    const steps = reducedMotion
      ? [{ value: 100, label: "READY" }]
      : [
          { value: 18, label: "INITIALIZING EXPERIENCE" },
          { value: 42, label: "TUNING THE FREQUENCIES" },
          { value: 68, label: "OPENING THE PORTAL" },
          { value: 88, label: "CALIBRATING REALITY" },
          { value: 100, label: "READY" }
        ];

    let current = 0;
    let stepIndex = 0;

    const advance = () => {
      const step = steps[stepIndex];
      if (!step) {
        finishExperience();
        return;
      }

      current = step.value;

      if (loaderBar) loaderBar.style.width = `${current}%`;
      if (loaderPercent) loaderPercent.textContent = `${current}%`;
      if (loaderText) loaderText.textContent = step.label;

      stepIndex += 1;

      if (current >= 100) {
        window.setTimeout(finishExperience, reducedMotion ? 0 : 260);
      } else {
        window.setTimeout(advance, reducedMotion ? 0 : 260);
      }
    };

    window.addEventListener("load", () => {
      window.setTimeout(advance, reducedMotion ? 0 : 180);
    }, { once: true });
  } else {
    finishExperience();
  }

  // V3 scroll reveal system. Existing sections remain untouched;
  // elements opt in through the classes added in later V3 phases.
  const revealItems = document.querySelectorAll(".v3-reveal, .v3-stagger");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Keep keyboard users from getting trapped by the visual effects.
  document.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      document.documentElement.classList.add("keyboard-user");
    }
  }, { once: true });
})();
