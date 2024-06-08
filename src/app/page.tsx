import Link from "next/link";
import { Header } from "./_ui/Header";
import { Footer } from "./_ui/Footer";
import { getAllPosts } from "@/lib/server/posts";

export default function Home() {
  const allPosts = getAllPosts();
  return (
    <>
      <Header />
      <main className="flex flex-col p-2">
        <h1 className="text-xl py-8">
          Stacks, Clarity &amp; Bitcoin Development Blog
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
