import { cav as c } from "./deps.ts";

const mainStack = c.stack({
  "*": c.assets(),
});

c.serve(mainStack);
console.log("listening on port 80");
