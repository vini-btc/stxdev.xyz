"use client";

import { Header } from "./_ui/Header";
import { Footer } from "./_ui/Footer";
import { getSessionData } from "@/lib/server/session";
import { PageProvider } from "./_context/PageProvider";

export default async function ErrorPage() {
  const session = await getSessionData();
  return (
    <PageProvider session={session}>
      <Header />
      <main className="flex flex-col p-2">
        <h1 className="text-2xl py-8">Something went wrong</h1>
        <section className="border-t py-4 border-dotted border-white w-full prose prose-invert">
          <p>
            A problem occurred while loading this page. Please, try again in a
            few moments.
          </p>
        </section>
      </main>
      <Footer />
    </PageProvider>
  );
}
