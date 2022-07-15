
import {
  router,
  serve,
  assets,
} from "./deps.ts";
import {
  indexPage,
  aboutPage,
  projectsPage,
  socPage,
} from "./html.ts";

export function mainRouter() {
  return router({
    "*": assets(),
    "": indexPage(),
    "about": aboutPage(),
    "projects": projectsPage(),
    "soc": socPage(),
  });
}

export function start() {
  serve(mainRouter());
}