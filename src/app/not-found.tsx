import Link from "next/link";
import { Footer } from "./_ui/Footer";
import { Header } from "./_ui/Header";
import { getSessionData } from "@/lib/server/session";
import { PageProvider } from "./_context/PageProvider";

export default async function NotFoundPage() {
  const session = await getSessionData();
  return (
    <PageProvider session={session}>
      <Header />
      <main className="flex flex-col p-2">
        <h1 className="text-2xl py-8">404 Not Found</h1>
        <section className="border-t py-4 border-dotted border-white w-full prose prose-invert">
          <p>
            This page does not exist. Make sure you entered the right URL. Did
            you follow a link here? Please, report on{" "}
            <Link href="https://x.com/vicnicius">(X)</Link> so we can fix it.
          </p>
        </section>
      </main>
      <Footer />
    </PageProvider>
  );
}
