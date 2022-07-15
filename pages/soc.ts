
import { page, nav } from "./_base.ts";

export function socPage() {
  return page({
    head: /*html*/`
      <title>Stream of consciousness &bull; Connor Logan</title>
    `,
    body: /*html*/`
      ${nav({
        active: "soc",
        current: "soc",
      })}

      <div class="construction">Under construction</div>
    `,
  });
}
