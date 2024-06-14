import { Header } from "../_ui/Header";
import { Footer } from "../_ui/Footer";
import { getSessionData } from "@/lib/server/session";
import Link from "next/link";
import { TokenDashboard } from "../_ui/TokenDashboard";
import { PageProvider } from "../_context/PageProvider";
import { getTokenPrice, isTokenOwner } from "@/lib/server/token";

export default async function Membership() {
  const session = await getSessionData();
  const tokenPrice = await getTokenPrice();
  const ownsToken = await isTokenOwner(session);

  return (
    <PageProvider session={session}>
      <Header />
      <section className="py-4 w-full min-h-full prose prose-invert prose-h1:font-normal prose-h1:font-mono prose-h1:text-2xl">
        <h1>Membership</h1>
        <p>
          Become a blog member by owning our NFT token. Holders of the NFT have
          access to members-only posts and exclusive channels on&nbsp;
          <Link href="https://app.console.xyz/c/stxdev">
            the blog's Console community
          </Link>
          .
        </p>
        <TokenDashboard ownsToken={ownsToken} tokenPrice={tokenPrice} />
      </section>
      <Footer />
    </PageProvider>
  );
}
