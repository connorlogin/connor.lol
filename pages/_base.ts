
import { cx } from "../deps.ts";

export function page({ head, body }: {
  head?: string;
  body?: string;
}) {
  return /*html*/`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="/styles/_base.css">
      ${head ?? ""}
    </head>
    <body>
      ${body ?? ""}
    </body>
    </html>
  `;
}

function topNavLink({ href, cls, active, current, text }: {
  href?: string;
  cls?: string;
  active?: boolean;
  current?: boolean;
  text?: string;
}) {
  return /*html*/`
    <a
      href="${href ?? ""}"
      class="${cx(cls, "link", active && "active")}"
      aria-current="${current ? "page" : "false"}"
    >${text ?? ""}</a>
  `;
}

export function nav({ active, current }: {
  active?: string;
  current?: string;
}) {
  return /*html*/`
  <nav class="nav">
    ${topNavLink({
      cls: "tilt",
      href: "/",
      active: active === "index",
      current: current === "index",
      text: "CL",
    })}
    ${topNavLink({
      href: "/about",
      active: active === "about",
      current: current === "about",
      text: "About",
    })}
  </nav>
  `;
}

export function postPreview({ href, title, desc, date }: {
  href?: string;
  title?: string;
  desc?: string;
  date?: string;
}) {
  const wrap = (body: string) => (
    // On the feed
    href ? /*html*/`
      <a class="post-preview" href="${href}">
        ${body}
      </a>
    `
    // Header on the post page
    : /*html*/`
      <header class="post-preview">
        ${body}
      </header>
    `
  );

  return wrap(/*html*/`
    <h1 class="title">${title}</h1>
    <p class="desc">${desc}</p>
    <time class="date">${date}</time>
  `);
}
