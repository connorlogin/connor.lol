#!/usr/bin/env deno run --watch --allow-net --quiet

import {
  router,
  serve,
} from "https://deno.land/x/cav@0.2.0-alpha.12/mod.ts";

if (import.meta.main) {
  serve(
    router({
      "/": /*html*/`
        <!DOCTYPE html><html lang="en"><head>

          <title>Connor Logan</title>
          <meta charset="utf-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            :root {
              width: 100%;
              height: 100%;
              font-family: sans-serif;
            }

            body {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-size: calc(1em + 1vw);
            }

            h1 {
              margin-bottom: 1em;
            }

            a {
              margin-bottom: 1em;
            }
          </style>

        </head><body>

          <h1>Connor Logan</h1>
          <a href="mailto:hey@connor.lol">Email</a>
          <a href="https://github.com/connorlogin">GitHub</a>
          <a href="https://fosstodon.org/@connorlogin">Mastodon</a>
          <a href="https://reddit.com/u/connorlogin">Reddit</a>
          <a href="https://twitter.com/connorlogin">Twitter</a>
        
        </body></html>
      `,
    }),
  );
}