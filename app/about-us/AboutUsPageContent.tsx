"use client";

import { useEffect, useMemo, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { CircleGauge, Orbit, RefreshCcw } from "lucide-react";
import FixedNavbar from "../sections/FixedNavbar";
import SiteFooter from "../sections/SiteFooter";

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

function WhyChooseUsSection({
  section,
}: {
  section: AboutSectionData | null;
}) {
  const cards = useMemo(() => section?.cards || [], [section]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasPlayedOnScroll = useRef(false);

  const lottieRefs = useRef<
    Record<number, React.MutableRefObject<LottieRefCurrentProps | null>>
  >({});

  const getLottieRef = (id: number) => {
    if (!lottieRefs.current[id]) {
      lottieRefs.current[id] = {
        current: null,
      };
    }

    return lottieRefs.current[id];
  };

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || cards.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedOnScroll.current) {
          hasPlayedOnScroll.current = true;

          cards.forEach((card) => {
            const lottie = lottieRefs.current[card.id]?.current;
            if (lottie) {
              lottie.stop();
              lottie.play();
            }
          });
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, [cards]);

  const handleHoverPlay = (id: number) => {
    const lottie = lottieRefs.current[id]?.current;
    if (lottie) {
      lottie.stop();
      lottie.play();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="bg-[#f2f3f7] py-20 md:py-28"
    >
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
              onMouseEnter={() => handleHoverPlay(item.id)}
            >
              <div className="flex h-[92px] w-[92px] items-center justify-center">
                {item.lottieData ? (
                  <Lottie
                    lottieRef={getLottieRef(item.id)}
                    animationData={item.lottieData}
                    loop={false}
                    autoplay={false}
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
      <FixedNavbar
        aboutHref="#about-hero"
        whyChooseUsHref="#why-choose-us"
        contactHref="#site-footer"
      />

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

      <SiteFooter
        aboutHref="#about-hero"
        whyChooseUsHref="#why-choose-us"
      />
    </main>
  );
}