
import { page } from "./_base.ts";

export function postPage({ slug, title, date, content }: {
  slug?: string;
  title?: string;
  date?: string;
  content?: string;
}) {
  return page({
    head: /*html*/`
      <title>Hello, blog &bull; Connor Logan</title>
      <link rel="stylesheet" href="/styles/post.css">
    `,
    body: /*html*/`      
      <main class="main">
        <nav class="nav"><a href="/">connor.lol</a></nav>

        <header class="header">
          <h1 class="title">${title}</h1>
          <time class="date">${date}</time>
        </header>

        <article class="content">
          ${content}
        </article>
      </main>
    `,
  });
}
