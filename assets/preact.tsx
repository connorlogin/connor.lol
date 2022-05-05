// I'm pretty decent with React/Preact in addition to vanilla JS, and I wanted
// to show that off somehow. It's pretty minimal but I added this duplicate
// frontend and a frontend switching entrypoint that manages which frontend is
// active, vanilla JS or Preact. Note: Preact for this website is definitely
// overkill, but this is all for fun anyway. I'm planning on making this card do
// more stuff in the future, so perhaps the Preact duplicate will prevail in the
// end

/** @jsx h */
import { h, render as _render, useState } from "../browser_deps.ts";

function cx(...classes: unknown[]): string {
  return classes.filter(c => c && typeof c === "string").join(" ");
}

function App() {
  const [flipped, setFlipped] = useState(false);

  return (
    <main class="main">
      <header class={cx("card", flipped && "card--flipped")}>
        <section>
          <h1>Connor Logan</h1>
          <a class="card__url" href="https://connor.lol">https://connor.lol</a>
          <div class="card__emoji">⚛️</div>
          <label class="push-down">Software engineer specializing in</label>
          <div class="card__specialties">
            <a target="_blank" href="https://typescriptlang.org">TypeScript</a>
            <a target="_blank" href="https://deno.land">Deno</a>
            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API">Web APIs</a>
          </div>
        </section>

        <section>
          <label>Email</label>
          <a class="card__email" href="mailto:hey@connor.lol">hey@connor.lol</a>
          <label class="push-down">connorlogin@</label>
          <div class="card__links">
            <a target="_blank" href="https://github.com/connorlogin">github.com</a>
            <a target="_blank" href="https://reddit.com/u/connorlogin">reddit.com</a>
            <a target="_blank" href="https://dev.to/connorlogin">dev.to</a>
            <a target="_blank" href="https://mastodon.online/@connorlogin">mastodon.online</a>
            <a target="_blank" href="https://twitter.com/connorlogin">twitter.com</a>
          </div>
        </section>
      </header>

      <nav class="card-flip" aria-hidden="true">
        <button
          tabIndex={-1}
          disabled={!flipped}
          onClick={() => setFlipped(false)}
        >About</button>
        <button
          tabIndex={-1}
          disabled={flipped}
          onClick={() => setFlipped(true)}
        >Connect</button>
      </nav>

      <footer class="footer">
        <a
          target="_blank"
          href="https://github.com/connorlogin/connor-lol"
        >This card</a>
        is powered by
        <a target="_blank" href="https://github.com/connorlogin/cav">Cav</a>
        and
        <select value="preact" onInput={e => {
          const target = e.target as HTMLSelectElement;
          self.dispatchEvent(new CustomEvent(`frontend:${target.value}`, {
            bubbles: true,
          }));
        }}>
          <option value="vanilla">the DOM</option>
          <option value="preact">Preact</option>
        </select>
      </footer>
    </main>
  );
}

export function render() {
  _render(<App />, document.body);
}

export function unrender() {
  _render(null, document.body);
}
