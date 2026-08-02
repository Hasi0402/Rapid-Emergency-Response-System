import { Link, useRoute } from "wouter";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Alert" },
  { href: "/contacts", label: "Contacts" },
  { href: "/services", label: "Services" },
  { href: "/history", label: "History" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const [isActive] = useRoute(href === "/" ? "/" : `${href}/*?`);
  const active = href === "/" ? isActive : window.location.pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm font-medium tracking-tight transition-colors rounded-md",
        active ? "bg-base-800 text-base-100" : "text-base-400 hover:text-base-100"
      )}
    >
      {label}
    </Link>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-base-800 sticky top-0 z-40 bg-base-950/90 backdrop-blur">
        <div className="mx-auto max-w-3xl px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-alert opacity-75 animate-pulseSoft" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-alert" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-base-100">
              Rapid Response
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-8">{children}</div>
      </main>
      <footer className="border-t border-base-800 py-6">
        <div className="mx-auto max-w-3xl px-5 text-xs text-base-400 font-mono">
          Runs entirely in this browser. No data leaves your device.
        </div>
      </footer>
    </div>
  );
}
