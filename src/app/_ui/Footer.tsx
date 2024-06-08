import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between text-sm border-t border-white border-dotted pt-2 mt-2">
      stxdev.xyz
      <div className="flex space-x-2">
        <Link href="https://github.com/vicnicius/stxdev.xyz">
          <GitHubLogoIcon />
        </Link>

        <Link href="https://x.com/vicnicius">
          <TwitterLogoIcon />
        </Link>
      </div>
    </footer>
  );
};
