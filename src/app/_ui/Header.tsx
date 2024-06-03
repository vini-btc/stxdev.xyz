import Link from "next/link";

export const Header = () => (
  <header className="flex justify-between w-full border-b border-white border-dotted pb-2">
    <span id="logo">
      <Link href="/">(stxdev.xyz)</Link>
    </span>
    <nav>
      <ul className="flex space-x-2">
        <li>
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/posts">posts</Link>
        </li>
      </ul>
    </nav>
  </header>
);
