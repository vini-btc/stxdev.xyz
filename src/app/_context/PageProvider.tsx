"use client";

import { SessionData } from "@/lib/server/session";
import { FC, PropsWithChildren } from "react";
import { AuthenticationProvider } from "./AuthenticationContext";

export const PageProvider: FC<
  PropsWithChildren<{ session: SessionData | undefined }>
> = ({ children, session }) => {
  return (
    <AuthenticationProvider session={session}>
      {children}
    </AuthenticationProvider>
  );
};
