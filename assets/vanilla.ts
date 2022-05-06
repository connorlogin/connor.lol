import "../browser_deps.ts";
const $ = (sel: string) => document.querySelector(sel);

// The vanilla HTML is sent right away in the index.html file, so this module
// doesn't deal with constructing the DOM from scratch like preact.tsx

// Setup

const main = $("main") as HTMLElement;
const card = $(".card") as HTMLElement;
const frontButton = $(".card-flip button:first-child") as HTMLButtonElement;
const backButton = $(".card-flip button:last-child") as HTMLButtonElement;
const uiSelect = $(".footer select") as HTMLSelectElement;

frontButton.onclick = flip;
backButton.onclick = flip;

uiSelect.oninput = () => {
  self.dispatchEvent(new CustomEvent(`frontend:${uiSelect.value}`, {
    bubbles: true,
  }));
};

// State

let flipped = false;

// Actions

function flip() {
  flipped = !flipped;
  render();
}

// State <-> DOM

export function render() {
  // If this is the first render after switching from Preact, put the main node
  // back into the body
  if (main.parentElement !== document.body) {
    document.body.replaceChildren(main);
    flipped = false;
  }

  if (flipped) {
    card.classList.add("card--flipped");
  } else {
    card.classList.remove("card--flipped");
  }
  
  frontButton.disabled = !flipped;
  backButton.disabled = flipped;
  uiSelect.value = "vanilla";
}

export function unrender() {
  document.body.replaceChildren();
}
