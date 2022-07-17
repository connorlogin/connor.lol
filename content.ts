
import {
  gfm,
  fm,
  fs,
} from "./deps.ts";

const contentDir = "./content";

type Slug = string;

interface FrontMatter {
  slug: Slug;
  title: string;
  date: string;
  longDate: string;
  desc: string;
}

export interface Post extends FrontMatter {
  path: string;
  content: string;
}

const posts = new Map<Slug, Post>();

export function getPost(slug: Slug): Post | null {
  return posts.get(slug) || null;
}

async function loadPosts() {
  posts.clear();

  // The posts folder structure doesn't matter, they're only ever identified by
  // the slug in their front-matter. An error is thrown if there's a conflict
  let contentSize = 0;
  for await (const entry of fs.walk(contentDir)) {
    if (
      !entry.isFile ||
      entry.name.startsWith("_") ||
      entry.name.startsWith(".") ||
      !entry.name.endsWith(".md")
    ) {
      continue;
    }

    try {
      const { attrs, body } = fm.extract(await Deno.readTextFile(entry.path));
      const post: Post = {
        ...attrs as FrontMatter,
        content: gfm.render(body),
        path: entry.path,
      };
      if (!post.slug) {
        new Error(`Missing slug`);
      }
      const conflict = posts.get(post.slug);
      if (conflict) {
        throw new Error(`Slug conflict with ${conflict.path}`);
      }
      contentSize += post.content.length;
      posts.set(post.slug, post);
    } catch (err) {
      console.error(entry.path, err);
      continue;
    }
  }
  console.log("Content size:", contentSize);
}
loadPosts();

(async () => {
  let lastEvent = 0;
  for await (const _ of Deno.watchFs(contentDir)) {
    const now = new Date().getTime();
    if (now - lastEvent < 1000) {
      continue;
    }
    lastEvent = now;
    loadPosts();
  }
})();
