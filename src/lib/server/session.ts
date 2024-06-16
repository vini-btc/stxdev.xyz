import { getIronSession } from "iron-session";
import type { IronSession, SessionOptions } from "iron-session";
import { SECRET_COOKIE_PASSWORD, COOKIE_NAME } from "../server/config";
import { cookies } from "next/headers";

export interface SessionData {
  stxAddress: string | null;
  challenge: string | null;
  challengeValidUntil: number | null;
  verifiedUntil: number | null;
}

export const sessionOptions: SessionOptions = {
  password: SECRET_COOKIE_PASSWORD as string,
  cookieName: COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSession = async (): Promise<IronSession<SessionData>> =>
  getIronSession<SessionData>(cookies(), sessionOptions);

export const getSessionData = async (): Promise<SessionData> => {
  const session = await getSession();
  return {
    stxAddress: session.stxAddress,
    verifiedUntil: session.verifiedUntil,
    challenge: session.challenge,
    challengeValidUntil: session.challengeValidUntil,
  };
};

export const isAuthenticated = (session: SessionData): boolean => {
  return (
    session.stxAddress !== undefined &&
    session.verifiedUntil !== null &&
    session.verifiedUntil > Date.now()
  );
};
