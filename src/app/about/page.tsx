import { Header } from "../_ui/Header";
import { Footer } from "../_ui/Footer";

export default function About() {
  return (
    <>
      <Header />
      <section className="py-4 w-full min-h-full prose prose-invert prose-p:font-mono prose-h1:font-mono prose-h1:font-normal prose-h2:font-normal">
        <h1>About</h1>
        <p>
          Hello, my name is Vini and I&apos;m building stuff on Stacks using web
          technology and the Clarity Programming Language. This blog is where I
          keep notes of what I learn along the way, to foment discussion and
          validate my ideas and also to help support the development of other
          builders out there.
        </p>
        <h2>Membership</h2>
        <p>
          If you&apos;re interested in the stuff I write, consider becoming a
          member. Members get access to articles still on the draft phase,
          allowing them a first-hand look at what&apos;s coming next and an
          opportunity to discuss topics with others in the community as they
          unroll. When ready, articles are also published first for members.
          Only after 3 months those articles are made available publicly.
        </p>
      </section>
      <Footer />
    </>
  );
}
