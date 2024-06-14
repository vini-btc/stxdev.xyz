import {
  ClarityType,
  cvToHex,
  hexToCV,
  principalCV,
} from "@stacks/transactions";
import { blockchainApiClient } from "./blockchainClient";
import { SessionData, isAuthenticated } from "./session";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_NAME } from "../config";

export const getTokenPrice = async (): Promise<number> => {
  return Number(50_000 / 1_000_000);
};

export const isTokenOwner = async (session: SessionData): Promise<boolean> => {
  if (!isAuthenticated(session)) {
    return false;
  }
  const { stxAddress } = session;
  if (!stxAddress) {
    throw new Error("Unauthenticated");
  }
  const response = await blockchainApiClient.post<{
    okay: boolean;
    result?: string;
    cause?: string;
  }>(
    `/v2/contracts/call-read/${NFT_CONTRACT_ADDRESS}/${NFT_CONTRACT_NAME}/is-token-owner`,
    {
      sender: stxAddress,
      arguments: [cvToHex(principalCV(stxAddress))],
    },

    {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  if (response.data.okay && response.data.result !== undefined) {
    const result = hexToCV(response.data.result);
    return (
      result.type === ClarityType.ResponseOk &&
      result.value.type === ClarityType.BoolTrue
    );
  }
  console.log({ response });
  return false;
};
