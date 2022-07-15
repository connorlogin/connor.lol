
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
      href: "/",
      cls: "tilt",
      active: active === "posts",
      current: current === "posts",
      text: "CL",
    })}
    ${topNavLink({
      href: "/about",
      active: active === "about",
      current: current === "about",
      text: "About",
    })}
    ${topNavLink({
      href: "/projects",
      active: active === "projects",
      current: current === "projects",
      text: "Projects",
    })}
    ${topNavLink({
      href: "/soc",
      active: active === "soc",
      current: current === "soc",
      text: "SoC"
    })}
  </nav>
  `;
}
