#!/usr/bin/env deno run --watch --allow-net --allow-read=.

import {
  router,
  assets,
  serve,
} from "./deps.ts";
import {
  aboutPage,
  articlePage,
  postsPage,
  projectsPage,
  socPage,
} from "./pages/mod.ts";

const app = router({
  "*": assets(),
  "": postsPage(),
  "about": aboutPage(),
  "projects": projectsPage(),
  "soc": socPage(),
  
  "hello-world": articlePage(),
});

serve(app);
