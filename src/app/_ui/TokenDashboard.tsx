"use client";

import { FC, useState } from "react";
import { useAuthentication } from "../_context/AuthenticationContext";
import { mint } from "@/lib/client/mint";
import { CONSOLE_LINK } from "@/lib/client/config";
import toast from "react-hot-toast";
import Link from "next/link";

const Dashboard: FC<{ tokenPrice: number; ownsToken: boolean }> = ({
  tokenPrice,
  ownsToken,
}) => {
  const { connectedAddress, signIn } = useAuthentication();
  const [confirmationTxId, setConfirmationTxId] = useState<
    string | undefined
  >();
  const isSignedIn = !!connectedAddress;
  const handleMint = () => {
    if (connectedAddress === undefined) {
      toast.error("Trying to mint token without a wallet connected.");
      return;
    }
    if (tokenPrice === undefined) {
      toast.error("Trying to mint token but the price is unknown");
    }
    mint({
      connectedAddress,
      tokenPriceInMicroStacks: BigInt(tokenPrice * 1_000_000),
      onError: (cause) => {
        console.error("token mint failed", cause);
        toast.error("Something went wrong while trying to mint your token.");
      },
      onSuccess: (txId) => {
        setConfirmationTxId(txId);
      },
    });
  };

  if (!isSignedIn) {
    return (
      <div className="text-center">
        <p>
          Sign in with your wallet to (mint) or (transfer) your membership
          token.
        </p>
        <button
          className="bg-white text-gray-950 p-1 rounded"
          onClick={() => signIn()}
        >
          sign in
        </button>
      </div>
    );
  }

  if (isSignedIn && !ownsToken) {
    return (
      <div className="border-white border-dotted border-t pt-4 pb-0 px-2 my-2">
        <p className="p-0 m-0">
          Become a member by minting your stxdev token now:
        </p>
        <div className="pt-4 pb-2 flex justify-center space-x-2">
          <span className="p-1 border-b border-dotted border-white">
            {tokenPrice.toLocaleString()} STX
          </span>
          <button onClick={handleMint}>(mint)</button>
        </div>
        {confirmationTxId !== undefined && (
          <span>
            Mint transaction successfully sent.
            <br />
            Follow it here:{" "}
            <Link href={`https://explorer.hiro.so/txid/${confirmationTxId}`}>
              Hiro Explorer
            </Link>
          </span>
        )}
      </div>
    );
  }

  return (
    <p className="p-2">
      YOU ARE IN!
      <br />
      Enjoy access to all posts. Have something you&apos;d like to ask, correct
      or suggest?
      <br />
      Head to our <Link href={CONSOLE_LINK}>member&apos;s only Console</Link>.
    </p>
  );
};

export const TokenDashboard: FC<{ tokenPrice: number; ownsToken: boolean }> = ({
  tokenPrice,
  ownsToken,
}) => (
  <div className="py-4 border border-dotted border-white rounded text-center">
    <h2 className="m-0 px-0 font-mono font-normal text-lg mb-4">
      Members Token
    </h2>
    <Dashboard tokenPrice={tokenPrice} ownsToken={ownsToken} />
  </div>
);
