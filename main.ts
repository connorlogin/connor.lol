#!/usr/bin/env deno run --watch --allow-net --allow-read=.

import {
  router,
  assets,
  serve,
} from "./deps.ts";
import {
  aboutPage,
  articlePage,
  indexPage,
  projectsPage,
  socPage,
} from "./pages/mod.ts";

const app = router({
  "*": assets(),
  "": indexPage(),
  "about": aboutPage(),
  "projects": projectsPage(),
  "soc": socPage(),
  
  "hello-blog": articlePage(),
});

serve(app);
