
import { page, nav } from "./_base.ts";

export function projectsPage() {
  return page({
    head: /*html*/`
      <title>Projects &bull; Connor Logan</title>
    `,
    body: /*html*/`
      ${nav({
        active: "projects",
        current: "projects",
      })}

      <div class="construction">Under construction</div>
    `,
  });
}
