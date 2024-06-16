"use client";

import { Header } from "./_ui/Header";
import { Footer } from "./_ui/Footer";

export default function ErrorPage() {
  return (
    <>
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
    </>
  );
}
