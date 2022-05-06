import { zod as z, supabase } from "./deps.ts";

const supUrl = Deno.env.get("SUPABASE_URL");
const supKey = Deno.env.get("SUPABASE_KEY");
if (!supUrl) throw new Error("Missing SUPABASE_URL");
if (!supKey) throw new Error("Missing SUPABASE_KEY");

const sup = supabase.createClient(supUrl, supKey);

export type Session = z.infer<typeof sessionSchema>;

const sessionSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  data: z.object({

  }),
});

export async function createSession(): Promise<Session> {
  const { data, error } = await sup.from("sessions").insert({});
  if (error) {
    throw error;
  }

  return sessionSchema.parse(data[0]);
}

export async function readSession(id: string): Promise<Session> {
  const { data, error } = await sup.from("sessions").select("*").eq("id", id);
  if (error) {
    throw error;
  }

  return sessionSchema.parse(data[0]);
}

export async function upsertSession(session: Session): Promise<void> {
  const { error } = await sup.from("sessions").upsert(await sessionSchema.parse(session));
  if (error) {
    throw error;
  }
}

export async function logVisit({ req, session, ip }: {
  req: Request;
  session: Session;
  ip: string;
}) {
  const { error } = await sup.from("logs").upsert({
    session_id: session.id,
    type: "visit",
    data: { ip, agent: req.headers.get("user-agent") },
  });
  if (error) {
    throw error;
  }
}
