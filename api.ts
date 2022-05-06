import { cav as c } from "./deps.ts";
import * as db from "./db.ts";

const cookieKey = Deno.env.get("COOKIE_KEY");
if (!cookieKey) throw new Error("Missing COOKIE_KEY");

const base = c.rpcInit({
  keys: [cookieKey],
  ctx: async x => {
    const sid = x.cookie.get("session", { signed: true });
    const session = (
      !sid ? await db.createSession()
      : await db.readSession(sid)
    );

    if (sid !== session.id) {
      x.cookie.set("session", session.id, {
        signed: true,
        secure: !Deno.env.get("DEV"),
      });
    }

    x.whenDone(async () => {
      await db.upsertSession(session);
    });

    return { session };
  },
});

export type Api = typeof api;

export const api = c.stack({
  visit: c.rpc({ ...base,
    resolve: async x => {
      await db.logVisit({
        req: x.req,
        session: x.ctx.session,
        ip: (x.conn.remoteAddr as Deno.NetAddr).hostname,
      });
    },
  }),
});
