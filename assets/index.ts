import "../browser_deps.ts";

Object.assign(self, {
  flipCard: (to: "front" | "back") => {
    const card = document.querySelector(".card")!;
    const [about, links] = document.querySelectorAll(".card-flip button") as NodeListOf<HTMLButtonElement>;

    if (to === "back") {
      card.classList.add("card--flipped");
      about.disabled = false;
      links.disabled = true;
    } else {
      card.classList.remove("card--flipped");
      about.disabled = true;
      links.disabled = false;
    }
  },
});
