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
