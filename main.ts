#!/usr/bin/env deno run --watch --allow-net --allow-read=.

import {
  router,
  assets,
  serve,
} from "./deps.ts";
import {
  aboutPage,
  postPage,
  indexPage,
} from "./pages/mod.ts";

const app = router({
  "*": assets(),
  "": indexPage(),
  "about": aboutPage(),
  "hello-blog": postPage(),
});

serve(app);
