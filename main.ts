#!/usr/bin/env deno run --watch --allow-net --allow-read=. --allow-env=NODE_DEBUG
// Access to NODE_DEBUG is needed by gfm

import {
  router,
  assets,
  serve,
  endpoint,
} from "./deps.ts";
import { aboutPage } from "./pages/about.ts";
import { indexPage } from "./pages/index.ts";
import { postPage } from "./pages/post.ts";
import { getPost } from "./posts.ts";

const app = router({
  "*": assets(),
  "": indexPage(),
  "about": aboutPage(),
  ":slug": endpoint(null, ({ res }) => res({
    headers: { "content-type": "text/html" },
    body: postPage({
      content: getPost("hello-blog").content,
    }),
  })),
});

serve(app);
