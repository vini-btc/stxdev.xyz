import { AppConfig, UserSession } from "@stacks/connect";
import {
  StacksDevnet,
  StacksMainnet,
  StacksMocknet,
  StacksNetwork,
  StacksTestnet,
} from "@stacks/network";

export const HOST_URL = "http://localhost:3000";

export enum Network {
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

export const STACKS_ENV: Network = Network.DEVNET;
export const API_URL = "http://localhost:3000/api";
export const BLOCKCHAIN_API_URL = "http://localhost:3999";
export const BLOCKCHAIN_API_KEY = "?";
export const COOKIE_NAME = "stxdev.xyz";
export const SECRET_COOKIE_PASSWORD =
  "it-is-a-secret-but-a-very-long-one-so-you-would-have-a-hard-time-guessing-it-if-you-tried";
export const NFT_CONTRACT_ADDRESS = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
export const NFT_CONTRACT_NAME = "stxdev";
export const CONSOLE_LINK = "https://app.console.xyz/c/stxdev";

export const appConfig = new AppConfig(
  ["store_write", "publish_data"],
  HOST_URL,
);
export const appDetails = {
  name: "Felix",
  icon: `http://felixapp.xyz/favicon.ico`,
};
export const walletSession = new UserSession({ appConfig });

export function getNetwork(): StacksNetwork {
  if (STACKS_ENV === Network.DEVNET) {
    return new StacksDevnet();
  }

  if (STACKS_ENV === Network.TESTNET) {
    return new StacksTestnet();
  }

  if (STACKS_ENV === Network.MAINNET) {
    return new StacksMainnet();
  }

  return new StacksMocknet();
}
