
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
