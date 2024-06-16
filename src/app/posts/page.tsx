import Link from "next/link";
import { Header } from "../_ui/Header";
import { Footer } from "../_ui/Footer";
import { getAllPosts } from "@/lib/server/posts";
import { getSessionData } from "@/lib/server/session";
import { PageProvider } from "../_context/PageProvider";
import { DoubleArrowRightIcon, LockClosedIcon } from "@radix-ui/react-icons";

export default async function Posts() {
  const allPosts = getAllPosts();
  const session = await getSessionData();
  return (
    <PageProvider session={session}>
      <Header />
      <section className="py-4 w-full min-h-full">
        <h2 className="text-lg">All Posts</h2>
        <ul className="flex flex-col space-y-2 py-4">
          {allPosts.map((post) => (
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
      <Footer />
    </PageProvider>
  );
}
