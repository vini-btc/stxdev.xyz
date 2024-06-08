"use client";

import Link from "next/link";
import {
  AuthenticationProvider,
  useAuthentication,
} from "../_context/AuthenticationContext";
import { IronSessionData } from "iron-session";
import { FC } from "react";
import toast from "react-hot-toast";

const ConnectButton = () => {
  const { signIn } = useAuthentication();
  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error(error);
      toast.error("Authentication failed");
    }
  };
  return <button onClick={handleSignIn}>connect</button>;
};

const DisconnectButton = () => {
  const { signOut } = useAuthentication();
  return <button onClick={() => signOut()}>disconnect</button>;
};

const WalletConnectButton = () => {
  const { connectedAddress } = useAuthentication();
  return connectedAddress !== undefined ? (
    <DisconnectButton />
  ) : (
    <ConnectButton />
  );
};

export const Header: FC<{ session: IronSessionData | undefined }> = ({
  session,
}) => {
  return (
    <header className="flex justify-between w-full border-b border-white border-dotted pb-2">
      <span id="logo">
        <Link href="/">(stxdev.xyz)</Link>
      </span>
      <nav>
        <ul className="flex space-x-2">
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>
            <Link href="/posts">posts</Link>
          </li>
          <li>
            <AuthenticationProvider session={session}>
              <WalletConnectButton />
            </AuthenticationProvider>
          </li>
        </ul>
      </nav>
    </header>
  );
};
