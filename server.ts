#!/usr/bin/env deno run --watch --allow-env --allow-net --allow-read

import * as view from "./view.ts";
import {
  router,
  assets,
  endpoint,
  serve,
  path,
  gfm,
  frontMatter,
} from "./deps.ts";

export interface Post {
  slug: string;
  title: string;
  date: Date;
  path: string;
}

async function loadPosts(
  dir: string,
  watch?: boolean,
  _prev?: Map<string, Post>,
): Promise<Map<string, Post>> {
  const _posts = new Map<string, Post>();
  const walk = async (dir: string) => {
    const contents = Deno.readDir(dir);
    for await (const item of contents) {
      if (item.name.startsWith(".")) {
        continue;
      }
      
      const p = path.join(dir, item.name);
      if (item.isDirectory) {
       await walk(p);
       continue;
      }
      
      const { attrs } = frontMatter.extract<Post>(await Deno.readTextFile(p));
      const slug = attrs.slug;
      if (_posts.has(slug)) {
        throw new Error(`Slug conflict: ${_posts!.get(slug)} & ${p}`);
      }

      _posts!.set(slug, {
        ...attrs,
        path: p,
      });
    }
  }
  await walk(dir);

  const entries = Array.from(_posts.entries());
  entries.sort((_a, _b) => {
    const a = _a[1].date;
    const b = _b[1].date;
    return a.getTime() - b.getTime();
  });

  if (_prev) {
    _prev.clear();
  }
  const posts = _prev || new Map<string, Post>();
  for (const [k, v] of _posts.entries()) {
    posts.set(k, v);
  }
  
  if (watch) {
    (async () => {
      for await (const ev of Deno.watchFs(dir)) {
        if (ev.kind === "create" || ev.kind === "remove") {
          posts.clear();
          await loadPosts(dir, true, posts);
          break;
        }
      }
    })();
  }
  return posts;
}

async function app() {
  const posts = await loadPosts("./posts", true);

  return router({
    "*": assets(),

    "/": endpoint(null, ({ res }) => res({
      headers: {
        "content-type": "text/view",
      },
      body: view.feed({
        posts: Array.from(posts.entries()).map(e => e[1]),
      }),
    })),

    ":slug+": endpoint({
      param: ({ slug }) => {
        if (!posts.has(slug)) {
          throw new Error("slug not found");
        }
        return { slug };
      }
    }, ({ param }) => {
      return param.slug;
    }),
  });
}

if (import.meta.main) {
  serve(await app());
}