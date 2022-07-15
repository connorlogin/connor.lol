
import { cx } from "./deps.ts";

function navLink({ href, cls, current, text }: {
  href?: string;
  cls?: string;
  current?: boolean;
  text?: string;
}) {
  return /*html*/`
    <a
      href="${href ?? ""}"
      class="${cx(cls, current && "current")}"
      aria-current="${current ? "page" : "false"}"
    >${text ?? ""}</a>
  `;
}

function page({ head, nav, main }: {
  head?: string;
  nav?: string;
  main?: string;
}) {
  return /*html*/`
    <!DOCTYPE html>
    <html lang="en" class="light-mode">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="/base.css">
      ${head ?? ""}
    </head>
    <body>
      <nav>
        ${navLink({
          href: "/",
          cls: "tilt",
          current: nav === "index",
          text: "CL",
        })}
        ${navLink({
          href: "/about",
          current: nav === "about",
          text: "About",
        })}
        ${navLink({
          href: "/projects",
          current: nav === "projects",
          text: "Projects",
        })}
        ${navLink({
          href: "/soc",
          current: nav === "soc",
          text: "SoC"
        })}
      </nav>
      <main>
        ${main ?? ""}
      </main>
    </body>
    </html>
  `;
}

export function indexPage() {
  return page({
    head: /*html*/`
      <title>Connor Logan</title>
      <link rel="stylesheet" href="/index.css">
    `,
    nav: "index",
    main: /*html*/`
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
        <img
          class="avatar"
          src="/photo/mt-lemmon.jpg"
          alt="Photo of me standing alone on a rocky ledge high up in the Arizona mountains. (I wasn't in danger of falling.) This is my profile image on most social media websites"
        >
      </header>
      <script>(() => {
        document.querySelector("header p").classList.remove("show");
        const desc = document.querySelectorAll("header p");
        const next = parseInt(localStorage.getItem("desc"));
        if (isNaN(next) || next <= 0 || next >= desc.length) {
          document.querySelector("header p").classList.add("show");
          localStorage.setItem("desc", "1");
        } else {
          desc[next].classList.add("show");
          localStorage.setItem("desc", (next + 1).toString());
        }
      })();</script>

      <section class="featured">
        <a class="article" href="#">
          <img class="thumb gif" alt="Meme" src="/meme/hello-this-is-dog.gif">
          <img class="thumb" alt="Meme" src="/meme/hello-this-is-dog.jpg">
          <h1 class="title">Hello, world</h1>
          <p class="description">The one where I introduce this website and ramble about how I created it. (From scratch!)</p>
          <time class="date">July 14, 2022</time>
        </a>
      </section>
    `,
  });
}

export function aboutPage() {
  return page({
    head: /*html*/`
      <title>About &bull; Connor Logan</title>
    `,
    nav: "about",
    main: /*html*/`
    `,
  });
}

export function projectsPage() {
  return page({
    nav: "projects",
    head: /*html*/`
      <title>Projects &bull; Connor Logan</title>
    `,
    main: /*html*/`
    `,
  });
}

export function socPage() {
  return page({
    head: /*html*/`
      <title>Stream of consciousness &bull; Connor Logan</title>
    `,
    nav: "soc",
    main: /*html*/`
    `,
  });
}