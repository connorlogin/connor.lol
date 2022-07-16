
import {
  HttpError,
  gfm,
  fm,
  fs,
} from "./deps.ts";

type Slug = string;

interface FrontMatter {
  slug: Slug;
  title: string;
  date: Date;
  desc: string;
}

interface Post extends FrontMatter {
  path: string;
  content: string;
}

const posts = new Map<Slug, Post>();

// The posts folder structure doesn't matter, they're only ever identified by
// the slug in their front-matter. An error is thrown if there's a conflict
let contentSize = 0;
for await (const entry of fs.walk("./posts")) {
  if (
    !entry.isFile ||
    entry.name.startsWith("_") ||
    entry.name.startsWith(".") ||
    !entry.name.endsWith(".md")
  ) {
    continue;
  }

  const { attrs, body } = fm.extract(await Deno.readTextFile(entry.path));
  const post: Post = {
    ...attrs as FrontMatter,
    content: gfm.render(body),
    path: entry.path,
  };

  if (!post.slug) {
    throw new Error(`Missing slug in ${entry.path}`);
  }
  const conflict = posts.get(post.slug);
  if (conflict) {
    throw new Error(`Slug conflict for "${post.slug}": ${conflict.path} & ${entry.path}`)
  }

  contentSize += post.content.length;
  posts.set(post.slug, post);
}
console.log("Size of all posts:", contentSize);

export function getPost(slug: Slug): Post {
  const post = posts.get(slug);
  if (!post) {
    throw new HttpError("404 post not found", { status: 404 });
  }
  return post;
}
