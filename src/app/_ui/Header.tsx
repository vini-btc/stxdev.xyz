"use client";

import Link from "next/link";
import { useAuthentication } from "../_context/AuthenticationContext";
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
  return (
    <button
      className="hover:underline hover:underline-offset-4"
      onClick={handleSignIn}
    >
      (sign in)
    </button>
  );
};

const DisconnectButton = () => {
  const { signOut } = useAuthentication();
  return (
    <button
      className="hover:underline hover:underline-offset-4"
      onClick={() => signOut()}
    >
      (sign out)
    </button>
  );
};

const WalletConnectButton = () => {
  const { connectedAddress } = useAuthentication();
  return connectedAddress !== undefined ? (
    <DisconnectButton />
  ) : (
    <ConnectButton />
  );
};

export const Header = () => {
  return (
    <header className="flex flex-col justify-between w-full border-b border-white border-dotted pb-2">
      <span id="logo">
        <Link href="/">(stxdev.xyz)</Link>
      </span>
      <nav className="place-self-end pt-1 text-sm">
        <ul className="flex overflow-x-auto max-w-full flex-wrap ml-4 sm:ml-0">
          <li>(</li>
          <li>
            <Link href="/about">(about)</Link>
          </li>
          <li>
            <Link href="/membership">(membership)</Link>
          </li>
          <li>
            <Link href="/posts">(posts)</Link>
          </li>
          <li>
            <WalletConnectButton />
          </li>
          <li>)</li>
        </ul>
      </nav>
    </header>
  );
};
