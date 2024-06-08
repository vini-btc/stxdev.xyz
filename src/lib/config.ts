export const HOST_URL = "http://localhost:3000";

export enum Network {
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

export const STACKS_ENV: Network = Network.DEVNET;

export const API_URL = "http://localhost:3000/api";
export const BLOCKCHAIN_API_URL = "http://localhost:9001";
export const BLOCKCHAIN_API_KEY = "?";
export const COOKIE_NAME = "stxdev.xyz";
export const SECRET_COOKIE_PASSWORD =
  "it-is-a-secret-but-a-very-long-one-so-you-would-have-a-hard-time-guessing-it-if-you-tried";
