import { isValidBody } from "@/lib/server/isValidBody";
import { getSession } from "@/lib/server/session";
import { verifyMessageSignatureRsv } from "@stacks/encryption";
import { NextRequest } from "next/server";

type RequestBody = {
  signature: string;
  publicKey: string;
};

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    if (!isValidBody<RequestBody>(body, ["signature", "publicKey"])) {
      return new Response("Public key or signature are missing or invalid.", {
        status: 400,
      });
    }
    const now = Date.now();
    const { signature, publicKey } = body;
    const session = await getSession();

    if (
      !session.stxAddress ||
      !session.challenge ||
      !session.challengeValidUntil ||
      session.challengeValidUntil < now
    ) {
      return new Response("Invalid Authorization", { status: 401 });
    }
    const challenge = session.challenge;
    const isVerified = verifyMessageSignatureRsv({
      signature,
      publicKey,
      message: challenge,
    });
    if (!isVerified) {
      return new Response("Signature is not valid", { status: 403 });
    }

    session.verifiedUntil = Date.now() + 1000 * 60 * 60 * 24; // Authenticate user for the next 24 hours
    await session.save();

    return new Response("Signature verified");
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
