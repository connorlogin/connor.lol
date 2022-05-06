import * as vanilla from "./vanilla.ts";
import * as preact from "./preact.tsx";
import { client } from "../browser_deps.ts";
import type { Api } from "../api.ts";

const api = client<Api>("/api");

// This uses events to switch between the duplicate frontends I've created for
// this site

function setFrontend(
  frontend = localStorage.getItem("frontend") || "vanilla",
) {
  localStorage.setItem("frontend", frontend);

  if (frontend !== "vanilla") vanilla.unrender();
  if (frontend !== "preact") preact.unrender();

  switch (frontend) {
    case "preact": preact.render(); break;
    case "vanilla":
    default: vanilla.render();
  }
}

// Init
setFrontend();

// When these events reach the window, it'll trigger a frontend switch
self.addEventListener("frontend:vanilla", () => setFrontend("vanilla"));
self.addEventListener("frontend:preact", () => setFrontend("preact"));

// Log the visit
api.visit({}); // Don't await