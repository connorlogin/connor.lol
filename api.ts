import { cav as c } from "./deps.ts";
import * as db from "./db.ts";

const cookieKey = Deno.env.get("COOKIE_KEY");
if (!cookieKey) throw new Error("Missing COOKIE_KEY");

const base = c.rpcInit({
  keys: [cookieKey],
  ctx: async x => {
    let sid: number;
    try {
      sid = parseInt(x.cookie.get("session", { signed: true })!, 10);
      if (isNaN(sid)) {
        throw new Error("session id wasn't a number");
      }
    } catch {
      sid = -1;
    }

    let session: db.Session;
    if (sid !== -1) {
      try {
        session = await db.readSession(sid);
      } catch {
        session = await db.createSession();
      }
    } else {
      session = await db.createSession();
    }

    if (sid !== session.id) {
      x.cookie.set("session", session.id.toString(), {
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
