"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type FixedNavbarProps = {
  aboutHref?: string;
  whyChooseUsHref?: string;
  contactHref?: string;
};

export default function FixedNavbar({
  aboutHref = "/about-us",
  whyChooseUsHref = "/about-us#why-choose-us",
  contactHref = "#site-footer",
}: FixedNavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: aboutHref },
    { label: "Why Choose Us", href: whyChooseUsHref },
    { label: "Contact", href: contactHref },
  ];

  const desktopLinkClass = `text-sm font-medium transition-colors duration-300 ${
    scrolled ? "text-[#1f2f73] hover:text-[#2f79ff]" : "text-white/85 hover:text-white"
  }`;

  const mobileLinkClass = `py-3 text-sm font-medium transition-colors duration-300 ${
    scrolled ? "text-[#1f2f73] hover:text-[#2f79ff]" : "text-white/85 hover:text-white"
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-white/78 backdrop-blur-md shadow-[0_10px_30px_rgba(8,19,38,0.10)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-6 md:px-12 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link
          href="/"
          className={`font-semibold tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "text-[1.65rem] text-[#1f2f73] scale-[0.88]"
              : "text-[2.1rem] text-white scale-100"
          } origin-left`}
        >
          Home
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link key={item.href} href={item.href} className={desktopLinkClass}>
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href} className={desktopLinkClass}>
                {item.label}
              </a>
            )
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 md:hidden ${
            scrolled
              ? "border-[#1f2f73]/15 text-[#1f2f73] bg-white/60"
              : "border-white/15 text-white bg-white/5"
          }`}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "max-h-80 border-t" : "max-h-0 border-t-0"
        } ${
          scrolled
            ? "border-[#1f2f73]/10 bg-white/92 backdrop-blur-md"
            : "border-white/10 bg-[#081326]/92 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto flex flex-col px-6 py-3">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      </div>
    </header>
  );
}