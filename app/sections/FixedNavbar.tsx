"use client";

import Link from "next/link";
import { useState } from "react";

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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: aboutHref },
    { label: "Why Choose Us", href: whyChooseUsHref },
    { label: "Contact", href: contactHref },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081326]/85 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          Home
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/80 transition hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/80 transition hover:text-white"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#081326] md:hidden">
          <div className="container mx-auto flex flex-col px-6 py-4">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium text-white/80 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium text-white/80 transition hover:text-white"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}