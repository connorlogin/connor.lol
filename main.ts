import { cav as c } from "./deps.ts";
import { api } from "./api.ts";

const mainStack = c.stack({
  api,
  "*": c.assets(),
});

c.serve(mainStack);
console.log("listening on port 80");
