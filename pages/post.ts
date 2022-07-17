
import { page, nav, postPreview } from "./_base.ts";

export function postPage({ title, date, desc, content }: {
  content?: string;
  title?: string;
  date?: string;
  desc?: string;
}) {
  return page({
    head: /*html*/`
      <title>Hello, blog &bull; Connor Logan</title>
      <link rel="stylesheet" href="/styles/post.css">
    `,
    body: /*html*/`
      ${nav({})}
      
      <main class="main">
        ${postPreview({ title, date, desc })}
        
        <article class="content">
          ${content}
        </article>
      </main>
    `,
  });
}
