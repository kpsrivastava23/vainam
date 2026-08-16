// src/app/layout.tsx

import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Image from "next/image";
import AuthRedirect from "./ui/auth-redirect";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Vainam",
  description:
    "Vainam — your unified personal universe. Notifications, mutual funds, connected apps, calendar, and tasks in one calm dashboard.",
};

const FOOTER_LINKS = {
  Platform: ["Dashboard", "Finance & MF", "Notifications", "Connected Apps", "Calendar & Tasks"],
  Company: ["About", "Security", "Privacy", "Contact"],
  Integrations: ["Gmail", "Zerodha", "Groww", "Notion", "Slack", "+ 40 more"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen bg-[#F9F9F7] text-stone-900 antialiased font-[family-name:var(--font-body)]">
        <AuthRedirect />
        <div className="min-h-screen flex flex-col">
          {/* ── MAIN ─────────────────────────────────────────── */}
          <main className="flex-1">{children}</main>

          {/* ── FOOTER ───────────────────────────────────────── */}
          <footer className="border-t border-stone-200 mt-20 py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row justify-between gap-10">

                {/* Brand blurb */}
                <div className="max-w-[220px]">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 ring-1 ring-stone-200">
                      <Image
                        src="/images/vainam-logo.webp"
                        alt="Vainam logo"
                        width={36}
                        height={33}
                        sizes="36px"
                        className="h-8 w-auto object-contain"
                      />
                    </span>
                    <p className="font-[family-name:var(--font-display)] text-[18px] text-stone-900">
                      Vainam
                    </p>
                  </div>
                  <p className="text-[12.5px] text-stone-500 leading-relaxed mb-4">
                    One calm place for your notifications, finances, apps, and everything in between.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Gmail", "Finance", "Groww", "Zerodha"].map((t: string) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-full border border-stone-200 text-stone-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link columns */}
                <div className="flex gap-10 lg:gap-16 text-[13px] flex-wrap">
                  {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                    <div key={section} className="flex flex-col gap-2.5">
                      <span className="text-[10.5px] uppercase tracking-[0.14em] text-stone-400 mb-1">
                        {section}
                      </span>
                      {links.map((l) => (
                        <a
                          key={l}
                          href="#"
                          className="text-stone-500 hover:text-stone-900 transition-colors duration-150"
                        >
                          {l}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-10 pt-6 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-2 text-[11.5px] text-stone-400">
                <span>© {new Date().getFullYear()} Vainam. All rights reserved.</span>
                <div className="flex gap-4">
                  {["Terms", "Privacy", "Security"].map((l) => (
                    <a key={l} href="#" className="hover:text-stone-600 transition-colors duration-150">
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}
