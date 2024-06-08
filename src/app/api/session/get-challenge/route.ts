import { getSession } from "@/lib/server/session";
import { addressToString, createAddress } from "@stacks/transactions";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

function generateChallenge(): string {
  return crypto.randomBytes(32).toString("hex");
}

// @TODO: Harden this API
// - rate limit?
// - setup something at the infra level?
export async function GET(req: NextRequest) {
  try {
    const requestUrl = req.nextUrl.searchParams;
    const stxAddress = requestUrl.get("stxAddress") ?? "";
    const principalAddress = createAddress(stxAddress);
    const session = await getSession();
    const challenge = generateChallenge();

    session.stxAddress = addressToString(principalAddress);
    session.challenge = challenge;
    session.challengeValidUntil = Date.now() + 1000 * 60 * 15; // 15min
    session.verifiedUntil = null;

    await session.save();

    return NextResponse.json({ challenge }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong.", { status: 500 });
  }
}
