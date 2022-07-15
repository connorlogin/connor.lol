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

serve(async (req, conn) => {
  const url = new URL(req.url);
  const res = await app(req, conn);
  console.log("Response etag:", url.pathname, "-", res.headers.get("etag"));
  return res;
});
