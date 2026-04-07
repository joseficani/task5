"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Lottie from "lottie-react";
import { CircleGauge, Orbit, RefreshCcw } from "lucide-react";

type AboutCard = {
  id: number;
  order: number;
  title: string;
  subtitle: string;
  lottieUrl: string;
  lottieData: object | null;
};

type AboutHeroData = {
  title: string;
  subtitle: string;
};

type AboutSectionData = {
  title: string;
  subtitle: string;
  cards: AboutCard[];
};

function titleToLines(value?: string) {
  if (!value) return [];
  return value
    .split(";;;")
    .map((part) => part.trim())
    .filter(Boolean);
}

function cleanText(value?: string) {
  if (!value) return "";
  return value.replace(/<\/?p>/g, "").trim();
}

function FallbackIcon({ title }: { title: string }) {
  const lower = title.toLowerCase();

  if (lower.includes("agile")) {
    return <CircleGauge size={68} strokeWidth={1.3} className="text-[#4478ff]" />;
  }

  if (lower.includes("scalable")) {
    return <Orbit size={68} strokeWidth={1.3} className="text-[#4478ff]" />;
  }

  return <RefreshCcw size={68} strokeWidth={1.3} className="text-[#4478ff]" />;
}

function AboutMenu() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about-hero" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Contact", href: "#about-footer" },
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

function AboutFooter() {
  return (
    <footer
      id="about-footer"
      className="border-t border-[#20304d] bg-[#081326] text-white"
    >
      <div className="container mx-auto grid gap-10 px-6 py-12 md:grid-cols-3 md:px-12">
        <div>
          <h3 className="text-lg font-semibold">Home</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Delivering integrated connectivity and managed services with scalable
            and tailored solutions for global operations.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Links
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
            <Link href="/">Home</Link>
            <a href="#about-hero">About Us</a>
            <a href="#why-choose-us">Why Choose Us</a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Contact
          </h4>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Contact us for more information.
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhyChooseUsSection({
  section,
}: {
  section: AboutSectionData | null;
}) {
  const cards = useMemo(() => section?.cards || [], [section]);

  return (
    <section id="why-choose-us" className="bg-[#f2f3f7] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[13px] uppercase tracking-[0.34em] text-[#8b7d71]">
            {section?.title || "WHY CHOOSE US"}
          </p>

          <h2 className="mt-5 text-[46px] font-semibold leading-[1.03] tracking-[-0.03em] text-[#26369a] md:text-[66px]">
            {titleToLines(section?.subtitle || "Built Around How;;; You Operate").map(
              (line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              )
            )}
          </h2>
        </div>

        <div className="mt-24 grid gap-14 md:grid-cols-3 md:gap-10">
          {cards.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-[92px] w-[92px] items-center justify-center">
                {item.lottieData ? (
                  <Lottie
                    animationData={item.lottieData}
                    loop
                    autoplay
                    className="h-[86px] w-[86px]"
                  />
                ) : (
                  <FallbackIcon title={item.title} />
                )}
              </div>

              <h3 className="mt-10 text-[34px] font-semibold leading-none tracking-[-0.03em] text-[#26369a]">
                {item.title}
              </h3>

              <p className="mt-4 max-w-[360px] text-[18px] leading-[1.45] text-[#26369a]">
                {cleanText(item.subtitle)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutUsPageContent({
  hero,
  whyChooseUsSection,
}: {
  hero: AboutHeroData | null;
  whyChooseUsSection: AboutSectionData | null;
}) {
  return (
    <main className="min-h-screen bg-[#081326] text-white">
      <AboutMenu />

      <section
        id="about-hero"
        className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#081326_0%,#0d1b33_100%)]"
      >
        <div className="container mx-auto px-6 py-24 md:px-12 md:py-32">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/55">
              {hero?.subtitle ||
                "Beyond simple connectivity. We design, deploy, and manage the complete ground segment and terrestrial integration for complex global enterprises and MNOs."}
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              {hero?.title ||
                "Transforming Satellite Capacity into Reliable, Delivered Connectivity."}
            </h1>
          </div>
        </div>
      </section>

      <WhyChooseUsSection section={whyChooseUsSection} />

      <AboutFooter />
    </main>
  );
}