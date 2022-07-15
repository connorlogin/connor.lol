
import { page, nav } from "./_base.ts";

export function articlePage() {
  return page({
    head: /*html*/`
      <title>Hello, world &bull; Connor Logan</title>
    `,
    body: /*html*/`
      ${nav({
        active: "posts",
        // No current
      })}
      
      <div class="construction">Under construction</div>
    `,
  });
}
