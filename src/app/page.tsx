import Link from "next/link";
import { Header } from "./_ui/Header";
import { Footer } from "./_ui/Footer";
import { getAllPosts } from "@/lib/server/posts";
import { getSessionData } from "@/lib/server/session";
import { DoubleArrowRightIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { PageProvider } from "./_context/PageProvider";

export default async function Home() {
  const session = await getSessionData();
  const allPosts = getAllPosts();
  return (
    <PageProvider session={session}>
      <Header />
      <main className="flex flex-col p-2">
        <h1 className="text-2xl py-8">
          Stacks, Clarity &amp; Bitcoin Development
        </h1>
        <section className="border-t py-4 border-dotted border-white w-full">
          <h2 className="text-lg">Latest Posts</h2>
          <ul className="flex flex-col space-y-2 py-4 text-sm">
            {allPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex items-center animated-feature-post"
                >
                  {post.private ? (
                    <LockClosedIcon className="mr-2" />
                  ) : (
                    <DoubleArrowRightIcon className="mr-2" />
                  )}
                  <span>{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </PageProvider>
  );
}
