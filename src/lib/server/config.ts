import { getValueOrThrow } from "../configHelper";

export const BLOCKCHAIN_API_URL = process.env.BLOCKCHAIN_API_URL;
export const BLOCKCHAIN_API_KEY = process.env.BLOCKCHAIN_API_KEY;
export const SECRET_COOKIE_PASSWORD = getValueOrThrow(
  process.env.SECRET_COOKIE_PASSWORD,
  "SECRET_COOKIE_PASSWORD",
);
export const COOKIE_NAME = getValueOrThrow(
  process.env.COOKIE_NAME,
  "COOKIE_NAME",
);
