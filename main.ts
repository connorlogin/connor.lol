#!/usr/bin/env deno run --watch --allow-net --allow-read=. --allow-env=NODE_DEBUG
// Access to NODE_DEBUG is needed by gfm

import {
  HttpError,
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
  ":slug": endpoint(null, ({ param, res }) => {
    const post = getPost(param.slug);
    if (!post) {
      throw new HttpError("404 post not found", { status: 404 });
    }

    return res({
      headers: { "content-type": "text/html" },
      body: postPage(post),
    });
  }),
});

serve(app);
