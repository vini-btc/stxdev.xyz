import Link from "next/link";
import { Header } from "./_ui/Header";
import { Footer } from "./_ui/Footer";
import { getAllPosts } from "@/lib/server/posts";
import { getSessionData } from "@/lib/server/session";

export default async function Home() {
  const session = await getSessionData();
  const allPosts = getAllPosts();
  return (
    <>
      <Header session={session} />
      <main className="flex flex-col p-2">
        <h1 className="text-2xl py-8">
          Stacks, Clarity &amp; Bitcoin Development
        </h1>
        <section className="border-t py-4 border-dotted border-white w-full">
          <h2 className="text-lg">Latest Posts</h2>
          <ul className="flex flex-col space-y-2 py-4">
            {allPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`}>
                  {">"} {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
