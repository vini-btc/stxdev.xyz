import {
  StacksDevnet,
  StacksMainnet,
  StacksMocknet,
  StacksNetwork,
  StacksTestnet,
} from "@stacks/network";

export function getValueOrThrow<T>(value: T | undefined, label: string): T {
  if (value === undefined) {
    throw new Error(`Invalid config set for ${label}: ${value}`);
  }

  return value;
}

export enum Network {
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

export function getNetwork(network: Network | unknown): StacksNetwork {
  if (network === Network.DEVNET) {
    return new StacksDevnet();
  }

  if (network === Network.TESTNET) {
    return new StacksTestnet();
  }

  if (network === Network.MAINNET) {
    return new StacksMainnet();
  }

  return new StacksMocknet();
}
