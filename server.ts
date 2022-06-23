// Copyright 2022 Connor Logan. All rights reserved. MIT License.

import {
  router,
  serve,
  assets,
} from "./deps.ts";
import * as html from "./html.ts";

export function mainRouter() {
  return router({
    "*": assets(),
    "/": html.index(),
  });
}

if (import.meta.main) {
  serve(mainRouter(), { port: 8080 });
  console.log("Listening on port 8080");
}