import type { Metadata } from "next";
import { Fira_Code as Mono, Inter_Tight as Sans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "(stxdev.xyz) - Stacks, Clarity and Bitcoin Development",
  description:
    "A blog about developing applications using blockchain technology, focusing on the Stacks & Bitcoin blockchains and the Clarity programming language.",
};

const sans = Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const mono = Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.className} ${sans.variable} ${mono.className} ${mono.variable} p-4 flex flex-col justify-between min-h-screen max-w-prose`}
      >
        {children}
      </body>
    </html>
  );
}
