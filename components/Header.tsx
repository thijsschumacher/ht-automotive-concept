"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#apk-check", label: "APK check" },
  { href: "#diensten", label: "Diensten" },
  { href: "#over-ons", label: "Over ons" },
  { href: "#afspraak", label: "Afspraak maken" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ phoneHref }: { phoneHref: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-slate-200/80 bg-white/85 shadow-[0_8px_30px_-12px_rgba(11,27,51,0.18)]" : "border-transparent bg-white/60"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="#top" className="flex min-h-11 items-center" aria-label="HT Automotive, naar boven">
          <Logo compact className="h-10 w-auto sm:hidden" />
          <Logo className="hidden h-11 w-auto sm:block" />
        </a>

        <nav aria-label="Hoofdmenu" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[15px] font-medium text-slate-600">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-3.5 py-2 transition-colors hover:bg-slate-100 hover:text-navy-900">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={phoneHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-600"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            </svg>
            Bel ons
          </a>
          {/* Mobiel menu */}
          <details className="relative lg:hidden">
            <summary
              className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-slate-200 bg-white text-navy-900 [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <nav aria-label="Mobiel menu" className="absolute right-0 mt-3 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <ul>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
                      className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-slate-700 hover:bg-accent-50 hover:text-accent-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
