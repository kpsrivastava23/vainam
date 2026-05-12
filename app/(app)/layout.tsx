import Image from "next/image";
import Link from "next/link";
import LoggedInStatusStrip from "../ui/logged-in-status-strip";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Finance", href: "/finance" },
  { label: "Notifications", href: "/notifications" },
  { label: "Apps", href: "/apps" },
  { label: "Calendar", href: "/calendar" },
];

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-stone-200">
                <Image
                  src="/images/vainam-logo.webp"
                  alt="Vainam logo"
                  width={40}
                  height={37}
                  priority
                  sizes="40px"
                  className="h-9 w-auto object-contain"
                />
              </span>
              <span className="font-[family-name:var(--font-display)] text-[23px] leading-none text-stone-900">
                Vainam
              </span>
              <span className="hidden sm:inline text-[11px] tracking-[0.1em] text-stone-400">
                your personal universe
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[13px] text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-md hover:bg-stone-100 transition-all duration-150"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/notifications" className="relative p-1.5 text-stone-500 hover:text-stone-900 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border-[1.5px] border-white" />
              </Link>

              <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[12px] font-medium text-stone-600 cursor-pointer select-none">
                R
              </div>

              <Link
                href="/apps"
                className="hidden sm:inline-flex items-center gap-1.5 text-[12.5px] px-4 py-1.5 rounded-full bg-stone-900 text-stone-50 hover:bg-stone-700 transition-colors duration-200"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Connect app
              </Link>
            </div>
          </div>

          <LoggedInStatusStrip />
        </div>
      </header>

      {children}
    </>
  );
}
