import type * as server from "./server.ts";
import {
  cx,
} from "./deps.ts";

function page({ head, nav, body }: {
  head: string;
  nav?: "feed" | "about";
  body: string;
}) {
  return /*html*/`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/base.css">
        ${head}
      </head>
      <body>
        <header class="main-header">
          <nav class="main-nav">
            <a href="/about" class="${cx(
              nav === "about" && "active"
            )}">About</a>
            <a href="/" class="${cx(
              nav === "feed" && "active"
            )}">Feed</a>
          </nav>
        </header>
        <main>
          ${body}
        </main>
      </body>
    </html>
  `;
}

export function feed({ posts }: {
  posts: server.Post[];
}) {
  return page({
    head: /*html*/`
      <title>connor.lol</title>
    `,
    nav: "feed",
    body: /*html*/`
      <main>
        
      </main>
    `,
  })
}

export function about({ body }: {
  body: string;
}) {
  return page({
    head: /*html*/`
      <title>connor.lol / about</title>
    `,
    nav: "about",
    body,
  })
}