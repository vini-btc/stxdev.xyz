import Link from "next/link";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SessionData } from "@/lib/server/session";
import { PageProvider } from "../_context/PageProvider";

export default function MembersOnly({ session }: { session: SessionData }) {
  return (
    <PageProvider session={session}>
      <Header />
      <main className="flex flex-col p-2">
        <h1 className="text-2xl py-8">Members Only</h1>
        <section className="border-t py-4 border-dotted border-white w-full prose prose-invert">
          <p>
            This post is for members only. To become a member you must be the
            owner of our blog&apos;s NFT. Head to our{" "}
            <Link href="/membership">Membership area</Link> to learn more.
          </p>
        </section>
      </main>
      <Footer />
    </PageProvider>
  );
}
