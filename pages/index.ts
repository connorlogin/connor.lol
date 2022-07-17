
import { page } from "./_base.ts";
import type { Post } from "../content.ts";

function postPreview({ href, title, desc, date }: {
  href?: string;
  title?: string;
  desc?: string;
  date?: string;
}) {
  return /*html*/`
    <a class="post-preview" href="${href}">
      <h1 class="title">${title}</h1>
      <time class="date">${date}</time>
      <p class="desc">${desc}</p>
    </a>
  `;
}

export function indexPage({ posts }: {
  posts?: Post[];
}) {
  return page({
    head: /*html*/`
      <title>Connor Logan</title>
      <link rel="stylesheet" href="/styles/index.css">
    `,
    body: /*html*/`
      <header class="header tilt">
        <h1 class="name">Connor Logan</h1>
        <p class="tagline show">Computer engineer</h1>
        <p class="tagline">Web developer</p>
        <p class="tagline">Tech tinkerer</p>
        <p class="tagline">Problem creator</p>
        <p class="tagline">Problem solver</p>
        <p class="tagline">Forever student</p>
        <p class="tagline">Science enthusiast</p>
        <p class="tagline">Climate advocate</p>
        <p class="tagline">Aspiring extrovert</p>
        <p class="tagline">Recovering perfectionis</p>
        <p class="tagline">Writer</p>
        <p class="tagline">Photographer</p>
        <p class="tagline">Cat person</p>
        <p class="tagline">Dog person</p>
        <p class="tagline">Human person</p>
        <p class="tagline">Weird person</p>
        <script>(() => {
          document.querySelector("header p").classList.remove("show");
          const tagline = document.querySelectorAll("header p");
          const next = parseInt(localStorage.getItem("tagline"));
          if (isNaN(next) || next <= 0 || next >= tagline.length) {
            document.querySelector("header p").classList.add("show");
            localStorage.setItem("tagline", "1");
          } else {
            tagline[next].classList.add("show");
            localStorage.setItem("tagline", (next + 1).toString());
          }
        })();</script>
        <img
          class="avatar"
          src="/avatars/mt-lemmon.jpg"
          alt="Photo of me standing alone on a rocky ledge high up in the Arizona mountains. (I wasn't in danger of falling.) This is my profile image on most social media websites"
        >
      </header>

      <main class="main">${
        posts?.map(p => postPreview({ ...p, href: "/" + p.slug })).join("") ||
        ""
      }</main>
    `,
  });
}
