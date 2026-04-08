
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { CircleGauge, Orbit, RefreshCcw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FixedNavbar from "../sections/FixedNavbar";
import SiteFooter from "../sections/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

type AboutHeroData = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
};

type StorySlide = {
  id: number;
  order: number;
  title: string;
  text: string;
  lottieUrl: string;
  lottieData: object | null;
};

type StorySectionData = {
  slides: StorySlide[];
};

type ServicesImageCard = {
  id: number;
  order: number;
  title: string;
  imageUrl: string;
};

type ServicesShowcaseData = {
  eyebrow: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  ctaText: string;
  ctaHref: string;
  cards: ServicesImageCard[];
};

type GlobalPresenceStat = {
  id: number;
  order: number;
  title: string;
  value: string;
};

type GlobalPresenceData = {
  title: string;
  subtitle: string;
  mapLottieUrl: string;
  mapLottieData: object | null;
  ctaText: string;
  ctaHref: string;
  stats: GlobalPresenceStat[];
};

type WhyChooseUsCard = {
  id: number;
  order: number;
  title: string;
  subtitle: string;
  lottieUrl: string;
  lottieData: object | null;
};

type WhyChooseUsData = {
  title: string;
  subtitle: string;
  cards: WhyChooseUsCard[];
};

function cleanText(value?: string) {
  if (!value) return "";
  return value.replace(/<\/?p>/g, "").trim();
}

function titleToLines(value?: string) {
  if (!value) return [];
  return value
    .split(";;;")
    .map((part) => part.trim())
    .filter(Boolean);
}

function formatHighlightedTitle(value?: string) {
  if (!value) return null;

  const lines = value.split(";;;");
  return lines.map((line, lineIndex) => {
    const parts = line.split(/(::.*?::)/g).filter(Boolean);

    return (
      <span key={lineIndex} className="block">
        {parts.map((part, partIndex) => {
          const isHighlight = part.startsWith("::") && part.endsWith("::");
          const text = isHighlight ? part.slice(2, -2) : part;

          return (
            <span
              key={partIndex}
              className={isHighlight ? "text-[#2f79ff]" : "text-[#2a3f9d]"}
            >
              {text}
            </span>
          );
        })}
      </span>
    );
  });
}

function renderDoubleColonHighlight(
  value?: string,
  normalClass = "text-white",
  highlightClass = "text-[#1492ff]"
) {
  if (!value) return null;

  const parts = value.split(/(::.*?::)/g).filter(Boolean);

  return parts.map((part, index) => {
    const isHighlight = part.startsWith("::") && part.endsWith("::");
    const text = isHighlight ? part.slice(2, -2) : part;

    return (
      <span key={index} className={isHighlight ? highlightClass : normalClass}>
        {text}
      </span>
    );
  });
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

function StorySection({ section }: { section: StorySectionData | null }) {
  const slides = useMemo(() => section?.slides || [], [section]);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const lottieRefs = useRef<
    Record<number, React.MutableRefObject<LottieRefCurrentProps | null>>
  >({});

  const getLottieRef = (id: number) => {
    if (!lottieRefs.current[id]) {
      lottieRefs.current[id] = { current: null };
    }
    return lottieRefs.current[id];
  };

  useEffect(() => {
    if (!sectionRef.current || slides.length === 0) return;

    const ctx = gsap.context(() => {
      const total = slides.length;

      const playSlide = (index: number) => {
        setActiveIndex(index);

        slides.forEach((slide, i) => {
          const lottie = lottieRefs.current[slide.id]?.current;
          if (!lottie) return;

          if (i === index) {
            lottie.stop();
            lottie.play();
          } else {
            lottie.stop();
          }
        });
      };

      playSlide(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${total * 420}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      slides.forEach((_, index) => {
        tl.call(() => playSlide(index), [], index);
        tl.to({}, { duration: 1 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [slides]);

  if (!slides.length) return null;

  const activeSlide = slides[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 text-[#2a3f9d] md:py-0"
    >
      <div className="container mx-auto min-h-screen px-6 md:px-12">
        <div className="grid min-h-screen items-center gap-12 md:grid-cols-[45%_55%]">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[560px]">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={index === activeIndex ? "block" : "hidden"}
                >
                  {slide.lottieData ? (
                    <Lottie
                      lottieRef={getLottieRef(slide.id)}
                      animationData={slide.lottieData}
                      loop={false}
                      autoplay={false}
                      className="h-full w-full"
                    />
                  ) : (
                    <div className="flex h-[360px] items-center justify-center">
                      <div className="text-[#4478ff]">
                        <FallbackIcon title={slide.title} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="max-w-[640px]">
              <p className="mb-8 text-[15px] uppercase leading-[1.55] tracking-[0.28em] text-[#907b70] md:text-[18px]">
                {activeSlide.order === 1
                  ? "ORCHESTRATING"
                  : activeSlide.order === 2
                  ? "AS A LEADING MANAGED SERVICES PROVIDER"
                  : "OUR RELIABLE SMART NETWORK SOLUTIONS"}
              </p>

              <div className="text-[36px] font-semibold leading-[1.04] tracking-[-0.04em] md:text-[54px]">
                {formatHighlightedTitle(activeSlide.title)}
              </div>

              {cleanText(activeSlide.text) && (
                <p className="mt-8 max-w-[560px] text-[18px] leading-[1.55] text-[#7c8aa8] md:text-[20px]">
                  {cleanText(activeSlide.text)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceImageCard({
  title,
  imageUrl,
  className = "",
  titleClassName = "",
}: {
  title: string;
  imageUrl: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[16px] bg-[#29358f] shadow-[0_18px_40px_rgba(27,37,103,0.14)] ${className}`}
    >
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,39,123,0.04)_0%,rgba(19,26,95,0.78)_100%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#3759c6_0%,#222b88_100%)]" />
      )}

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3
          className={`max-w-[88%] text-[19px] font-medium leading-[1.03] tracking-[-0.03em] text-white md:text-[20px] ${titleClassName}`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}

function ServicesShowcaseSection({
  section,
}: {
  section: ServicesShowcaseData | null;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: -140 },
          {
            y: 180,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      }

      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: 140 },
          {
            y: -180,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!section) return null;

  const engineering = section.cards.find((card) => card.title === "Engineering");
  const maritime = section.cards.find(
    (card) => card.title === "Field & Maritime Services"
  );
  const managed = section.cards.find((card) => card.title === "Managed Services");
  const ran = section.cards.find((card) => card.title === "RAN");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7fa] py-20 lg:py-24"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid items-start gap-1 lg:grid-cols-[53%_47%] xl:grid-cols-[53%_47%]">
          <div className="relative z-20 max-w-[540px] pt-2 lg:pt-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8d8f99] md:text-[12px]">
              {section.eyebrow}
            </p>

            <h2 className="mt-4 text-[33px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#27348b] md:text-[47px]">
              <span className="inline whitespace-nowrap">Services Engineered for</span>
              <br />
              <span className="inline whitespace-nowrap">Reliability and Scale</span>
            </h2>

            <p className="mt-5 max-w-[430px] text-[16px] leading-[1.55] text-[#45527f] md:text-[18px]">
              {section.description}
            </p>

            <div className="mt-10 max-w-[340px] rounded-[14px] bg-[#edf2f8] px-5 py-5">
              <div className="text-[44px] font-light leading-none tracking-[-0.04em] text-[#27348b] md:text-[50px]">
                {section.statValue}
              </div>
              <p className="mt-3 text-[15px] leading-[1.35] text-[#27348b] md:text-[16px]">
                {section.statLabel}
              </p>
            </div>

            <a
              href={section.ctaHref || "#"}
              className="mt-6 inline-flex h-[42px] items-center justify-center rounded-full bg-[#edf5fb] px-7 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2785c7] transition-all duration-300 hover:scale-[1.03]"
            >
              {section.ctaText}
              <span className="ml-2 text-[15px]">→</span>
            </a>
          </div>

          <div className="relative z-20 hidden h-[660px] overflow-hidden lg:block lg:-ml-0 xl:-ml-0">
            <div className="grid h-full grid-cols-[180px_180px] justify-start gap-[12px] xl:grid-cols-[190px_190px]">
              <div ref={col1Ref} className="space-y-[12px] will-change-transform">
                {engineering ? (
                  <ServiceImageCard
                    title={engineering.title}
                    imageUrl={engineering.imageUrl}
                    className="h-[258px] xl:h-[272px]"
                  />
                ) : null}

                {maritime ? (
                  <ServiceImageCard
                    title="Maritime"
                    imageUrl={maritime.imageUrl}
                    className="h-[296px] xl:h-[308px]"
                  />
                ) : null}
              </div>

              <div ref={col2Ref} className="space-y-[12px] will-change-transform">
                {maritime ? (
                  <ServiceImageCard
                    title="Field Services"
                    imageUrl={maritime.imageUrl}
                    className="h-[108px] xl:h-[114px]"
                    titleClassName="text-[17px] md:text-[18px]"
                  />
                ) : null}

                {managed ? (
                  <ServiceImageCard
                    title={managed.title}
                    imageUrl={managed.imageUrl}
                    className="h-[272px] xl:h-[286px]"
                  />
                ) : null}

                {ran ? (
                  <ServiceImageCard
                    title={ran.title}
                    imageUrl={ran.imageUrl}
                    className="h-[232px] xl:h-[244px]"
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:hidden">
            {section.cards.map((item) => (
              <ServiceImageCard
                key={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                className="h-[240px]"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[230px] overflow-hidden">
        <div
          className="absolute inset-x-0 bottom-0 h-[188px] bg-[#2f5db7]"
          style={{
            clipPath:
              "polygon(0% 100%, 0% 76%, 9% 71%, 18% 68%, 27% 64%, 35% 57%, 40% 50%, 45% 42%, 50% 42%, 58% 41%, 66% 41%, 100% 41%, 100% 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[10%] top-[76%] h-2 w-2 rounded-full bg-white" />
          <div className="absolute left-[18%] top-[70%] h-2 w-2 rounded-full bg-white" />
          <div className="absolute left-[44%] top-[66%] h-2 w-2 rounded-full bg-white" />
          <div className="absolute left-[61%] top-[48%] h-2 w-2 rounded-full bg-white" />
          <div className="absolute left-[73%] top-[58%] h-2 w-2 rounded-full bg-white" />
          <div className="absolute left-[86%] top-[50%] h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}

function GlobalPresenceSection({
  section,
}: {
  section: GlobalPresenceData | null;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mapWrapRef = useRef<HTMLDivElement | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !mapWrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(mapWrapRef.current, {
        scale: 0.62,
        y: 110,
        transformOrigin: "center center",
      });

      gsap.to(mapWrapRef.current, {
        scale: 1.16,
        y: -8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          end: "top 36%",
          scrub: 1.15,
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 88%",
        onEnter: () => lottieRef.current?.play(),
        onEnterBack: () => lottieRef.current?.play(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!section) return null;

  return (
    <section
      ref={sectionRef}
      id="global-presence"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#2f63c7_0%,#263ea7_36%,#1b1e83_72%,#10145f_100%)] text-white"
    >
      <div className="container mx-auto px-6 pb-0 pt-10 md:px-12 md:pt-12">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
            <div className="max-w-[640px]">
              <p className="text-[12px] uppercase tracking-[0.28em] text-white/45 md:text-[13px]">
                {section.title}
              </p>

              <h2 className="mt-4 max-w-[620px] text-[42px] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[64px]">
                {renderDoubleColonHighlight(
                  section.subtitle,
                  "text-white",
                  "text-[#1492ff]"
                )}
              </h2>

              <a
                href={section.ctaHref || "#"}
                className="mt-10 inline-flex h-[44px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#3d65f2_0%,#2d63df_100%)] px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:scale-[1.03]"
              >
                {section.ctaText}
                <span className="ml-2 text-[16px]">→</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4 lg:justify-self-end lg:pt-8">
              {section.stats.map((item) => (
                <div key={item.id} className="text-center">
                  <div className="text-[52px] font-light leading-none tracking-[-0.04em] text-white md:text-[62px]">
                    {item.value}
                  </div>
                  <p className="mt-6 text-[16px] leading-none text-white/85 md:text-[18px]">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={mapWrapRef}
            className="relative z-0 mx-auto -mb-8 w-[140%] max-w-none -translate-x-[10%] md:-mb-10 md:w-[132%] md:-translate-x-[8%] lg:-mb-12 lg:w-[126%] lg:-translate-x-[6%]"
          >
            {section.mapLottieData ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={section.mapLottieData}
                loop={true}
                autoplay={true}
                className="pointer-events-none block h-auto w-full"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection({
  section,
}: {
  section: WhyChooseUsData | null;
}) {
  const cards = useMemo(() => section?.cards || [], [section]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasPlayedOnScroll = useRef(false);

  const lottieRefs = useRef<
    Record<number, React.MutableRefObject<LottieRefCurrentProps | null>>
  >({});

  const getLottieRef = (id: number) => {
    if (!lottieRefs.current[id]) {
      lottieRefs.current[id] = { current: null };
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
      { threshold: 0.35 }
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
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
  storySection,
  servicesShowcaseSection,
  globalPresenceSection,
  whyChooseUsSection,
}: {
  hero: AboutHeroData | null;
  storySection: StorySectionData | null;
  servicesShowcaseSection: ServicesShowcaseData | null;
  globalPresenceSection: GlobalPresenceData | null;
  whyChooseUsSection: WhyChooseUsData | null;
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

            {hero?.ctaText ? (
              <a
                href={hero.ctaHref || "#"}
                className="mt-10 inline-flex h-[46px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#355de8_0%,#2d6cff_100%)] px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:scale-[1.03]"
              >
                {hero.ctaText}
                <span className="ml-2 text-[16px]">→</span>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <StorySection section={storySection} />

      <ServicesShowcaseSection section={servicesShowcaseSection} />

      <GlobalPresenceSection section={globalPresenceSection} />

      <WhyChooseUsSection section={whyChooseUsSection} />

      <SiteFooter
        aboutHref="#about-hero"
        whyChooseUsHref="#why-choose-us"
      />
    </main>
  );
}