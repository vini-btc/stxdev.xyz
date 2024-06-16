import { AppConfig, UserSession } from "@stacks/connect";
import { Network, getValueOrThrow } from "../configHelper";

export const CONSOLE_LINK = getValueOrThrow(
  process.env.NEXT_PUBLIC_CONSOLE_LINK,
  "CONSOLE_LINK",
);
const VERCEL_URL = getValueOrThrow(
  process.env.NEXT_PUBLIC_VERCEL_URL,
  "VERCEL_URL",
);
export const HOST_URL = `${VERCEL_URL.startsWith("localhost") || VERCEL_URL.indexOf(".local") >= 0 ? "http" : "https"}://${VERCEL_URL}`;
export const API_URL = `${HOST_URL}/api`;
export const NFT_CONTRACT_ADDRESS = getValueOrThrow(
  process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
  "NFT_CONTRACT_ADDRESS",
);
export const NFT_CONTRACT_NAME = getValueOrThrow(
  process.env.NEXT_PUBLIC_NFT_CONTRACT_NAME,
  "NFT_CONTRACT_NAME",
);

const APP_NAME = getValueOrThrow(process.env.NEXT_PUBLIC_APP_NAME, "APP_NAME");

export const NETWORK = getValueOrThrow<Network>(
  process.env.NEXT_PUBLIC_NETWORK as Network | undefined,
  "NETWORK",
);

export const appConfig = new AppConfig([], HOST_URL);

export const appDetails = {
  name: APP_NAME,
  icon: `${HOST_URL}/favicon.ico`,
};

export const walletSession = new UserSession({ appConfig });
