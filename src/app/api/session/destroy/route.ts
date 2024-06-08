import { getSession } from "@/lib/server/session";

export async function POST() {
  const session = await getSession();
  session.destroy();
  return new Response("Success");
}
