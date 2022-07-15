
import { page, nav } from "./_base.ts";

export function postsPage() {
  return page({
    head: /*html*/`
      <title>Connor Logan</title>
      <link rel="stylesheet" href="/styles/posts.css">
    `,
    body: /*html*/`
      ${nav({
        active: "posts",
        current: "posts",
      })}

      <header class="header tilt">
        <h1 class="name">Connor Logan</h1>
        <p class="tagline show">Computer engineer</h1>
        <p class="tagline">Web developer</p>
        <p class="tagline">Tech tinkerer</p>
        <p class="tagline">Open sourcerer</p>
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

      <main class="main">
        <a class="post" href="/hello-world">
          <h1 class="title">Hello, world</h1>
          <img
            class="thumb"
            alt="Meme"
            src="/memes/hello-this-is-dog.jpg"
            aria-hidden="true"
          >
          <img
            class="thumb gif"
            alt="Meme"
            src="/memes/hello-this-is-dog.gif"
            aria-hidden="true"
          >
          <p class="description">The one where I introduce this website and ramble about how I created it. (From scratch!)</p>
          <time class="date">July ??, 2022</time>
        </a>
      </main>
    `,
  });
}
