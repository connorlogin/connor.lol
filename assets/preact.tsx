/** @jsx h */
import { h, render as _render, useState } from "../browser_deps.ts";

// I'm decent with Preact/React in addition to vanilla JS, and I wanted to show
// that off somehow. This is a Preact replica of the interface from vanilla.ts
// and index.html

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
        <label class="footer__frontend">
          Preact
          <select
            value="preact"
            onInput={e => {
              const target = e.target as HTMLSelectElement;
              self.dispatchEvent(new CustomEvent(`frontend:${target.value}`, {
                bubbles: true,
              }));
            }}
          >
            <option value="vanilla">Vanilla JS</option>
            <option value="preact">Preact</option>
          </select>
        </label>
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
