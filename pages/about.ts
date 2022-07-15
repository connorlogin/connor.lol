
import { page, nav } from "./_base.ts";

export function aboutPage() {
  return page({
    head: /*html*/`
      <title>About &bull; Connor Logan</title>
    `,
    body: /*html*/`
      ${nav({
        active: "about",
        current: "about",
      })}

      <div class="construction">Under construction</div>
    `,
  });
}
