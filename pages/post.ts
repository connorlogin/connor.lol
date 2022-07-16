
import { page, nav } from "./_base.ts";

export function postPage() {
  return page({
    head: /*html*/`
      <title>Hello, blog &bull; Connor Logan</title>
    `,
    body: /*html*/`
      ${nav({
        active: "index",
        // No current
      })}
      
      <div class="construction">Under construction</div>
    `,
  });
}
