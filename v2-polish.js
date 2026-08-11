
/* V2 progressive enhancement */
(() => {
  document.addEventListener("mousemove", e => {
    document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
    document.documentElement.style.setProperty("--my", `${e.clientY}px`);
  });

  const cards = document.querySelectorAll(".album-card,.album,.card");
  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      card.style.transform = `perspective(700px) rotateX(${y*-2}deg) rotateY(${x*2}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
})();
