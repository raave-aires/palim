import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Account } from "@/components/pieces/account";

export function SiteHeader() {
  return (
    <header className="sticky h-14 top-0 flex items-center justify-center bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-b border-border z-50">
      <nav className="container flex justify-between items-center">
        <Link href="/" className="font-averia text-2xl font-semibold">
          palim
        </Link>

        <div className="flex gap-2 items-center">
          <Account />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
