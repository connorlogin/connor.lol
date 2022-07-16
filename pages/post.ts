
import { page, nav, postPreview } from "./_base.ts";

export function postPage({ content }: {
  content?: string;
}) {
  return page({
    head: /*html*/`
      <title>Hello, blog &bull; Connor Logan</title>
      <link rel="stylesheet" href="/styles/post.css">
    `,
    body: /*html*/`
      ${nav({
        active: "index",
        // Don't set current
      })}
      
      <main class="main">
        ${postPreview({
          title: "Hello, blog",
          date: "July 16, 2022",
          desc: "The one where I introduce this website and the server framework it's built on",
        })}
        
        ${content}
      </main>
    `,
  });
}
