import {
  ClarityValue,
  FungibleConditionCode,
  createSTXPostCondition,
  principalCV,
} from "@stacks/transactions";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_NAME, getNetwork } from "../config";
import { openContractCall, ContractCallOptions } from "@stacks/connect";

const normalizeTxPrefix = (tx: string): string => {
  return tx.startsWith("0x") ? tx : `0x${tx}`;
};

export const mint = ({
  connectedAddress,
  tokenPriceInMicroStacks,
  onSuccess,
  onError,
}: {
  connectedAddress: string;
  tokenPriceInMicroStacks: bigint;
  onSuccess: (tx: string) => void;
  onError: (cause: string) => void;
}) => {
  const functionArgs: ClarityValue[] = [principalCV(connectedAddress)];
  const network = getNetwork();
  const stxPostCondition = createSTXPostCondition(
    connectedAddress,
    FungibleConditionCode.Equal,
    tokenPriceInMicroStacks,
  );

  const contractCallOptions: ContractCallOptions = {
    contractAddress: NFT_CONTRACT_ADDRESS,
    contractName: NFT_CONTRACT_NAME,
    functionName: "mint",
    postConditions: [stxPostCondition],
    functionArgs,
    network,
    onFinish: async (data) => {
      const txId = normalizeTxPrefix(data.txId);
      onSuccess(txId);
    },
    onCancel: () => {
      onError("Minting token failed.");
    },
  };
  openContractCall(contractCallOptions);
};
