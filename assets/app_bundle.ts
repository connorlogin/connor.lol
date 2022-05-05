import * as vanilla from "./vanilla.ts";
import * as preact from "./preact.tsx";

// The entrypoint app is a simple frontend switcher powered by CustomEvents

function setFrontend(
  frontend = localStorage.getItem("frontend") || "vanilla",
) {
  localStorage.setItem("frontend", frontend);

  if (frontend === "preact") {
    vanilla.unrender();
    preact.render();
  } else {
    preact.unrender();
    vanilla.render();
  }
}

// Init
setFrontend();

// These are the events to bubble to trigger a switch
self.addEventListener("frontend:vanilla", () => setFrontend("vanilla"));
self.addEventListener("frontend:preact", () => setFrontend("preact"));
