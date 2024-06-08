import {
  AppConfig,
  showConnect,
  showSignMessage,
  UserSession,
} from "@stacks/connect";
import {
  StacksDevnet,
  StacksMainnet,
  StacksMocknet,
  StacksNetwork,
  StacksTestnet,
} from "@stacks/network";
import React, { createContext, useEffect, useState } from "react";
import { apiClient } from "@/lib/client/apiClient";
import { HOST_URL, STACKS_ENV, Network } from "@/lib/config";
import { SessionData } from "@/lib/server/session";

const appConfig = new AppConfig(["store_write", "publish_data"], HOST_URL);
const appDetails = {
  name: "Felix",
  icon: `http://felixapp.xyz/favicon.ico`,
};
const walletSession = new UserSession({ appConfig });

function getNetwork(): StacksNetwork {
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

const AuthenticationContext = createContext<{
  signIn: () => Promise<void>;
  connectedAddress: string | undefined;
  signOut: () => Promise<void>;
}>({
  signIn: () => {
    throw new Error("Unimplemented");
  },
  connectedAddress: undefined,
  signOut: () => {
    throw new Error("Unimplemented");
  },
});

const getChallengeMessage = async (address: string) => {
  const response = await apiClient.get(
    `/session/get-challenge?stxAddress=${address}`,
  );
  if (response.status !== 200) {
    throw new Error("Failed to get challenge");
  }
};

const verifyChallenge = async ({
  signature,
  publicKey,
}: {
  signature: string;
  publicKey: string;
}): Promise<boolean> => {
  const response = await apiClient.post("/session/verify-challenge", {
    signature,
    publicKey,
  });
  if (response.status === 200) {
    return true;
  }

  return false;
};

function getConnectedWalletAddress(): string | undefined {
  if (walletSession.isUserSignedIn()) {
    const profile = walletSession.loadUserData().profile;
    return STACKS_ENV === Network.MAINNET
      ? profile.stxAddress.mainnet
      : profile.stxAddress.testnet;
  }
  return undefined;
}

function AuthenticationProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionData | undefined;
}) {
  const [connectedAddress, setConnectedAddress] = useState<
    string | undefined
  >();
  useEffect(() => {
    const connectedWalletAddress = getConnectedWalletAddress();
    if (
      session !== undefined &&
      connectedWalletAddress !== undefined &&
      session.stxAddress === connectedWalletAddress &&
      session.verifiedUntil !== null &&
      session.verifiedUntil > Date.now()
    ) {
      setConnectedAddress(session.stxAddress);
    }
  }, [session?.stxAddress]);

  const connectWallet = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const maybeConnectedWalletAddress = getConnectedWalletAddress();
      if (maybeConnectedWalletAddress !== undefined) {
        return resolve(maybeConnectedWalletAddress);
      }
      showConnect({
        appDetails,
        onFinish: async (payload) => {
          const stxAddress = payload.authResponsePayload.profile.stxAddress;
          const address =
            STACKS_ENV === Network.MAINNET
              ? stxAddress.mainnet
              : stxAddress.testnet;
          resolve(address);
        },
        onCancel: () => {
          reject();
        },
        userSession: walletSession,
      });
    });
  };

  const signMessage = async (walletAddress: string): Promise<boolean> => {
    const network = getNetwork();
    const challenge = await getChallengeMessage(walletAddress);
    return new Promise((resolve, reject) => {
      showSignMessage({
        appDetails,
        network,
        message: challenge,
        onFinish: async (payload) => {
          resolve(
            await verifyChallenge({
              signature: payload.signature,
              publicKey: payload.publicKey,
            }),
          );
        },
        onCancel: () => {
          reject();
        },
      });
    });
  };

  const signIn = async () => {
    const connectedWalletAddress = await connectWallet();

    const signedMessage = await signMessage(connectedWalletAddress);

    if (!signedMessage) {
      throw new Error("Authentication failed");
    }
    setConnectedAddress(connectedWalletAddress);
  };

  const signOut = async () => {
    walletSession.signUserOut();
    await apiClient.post("/session/destroy", null);
    setConnectedAddress(undefined);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        signIn,
        connectedAddress,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

function useAuthentication() {
  const context = React.useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider");
  }
  return context;
}

export { AuthenticationProvider, useAuthentication };
