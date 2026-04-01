"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ValueItem = {
  id: number;
  title: string;
  description: string;
};

type SectionItem = {
  id: number;
  navTitle: string;
  image: string;
  type: "paragraph" | "values";
  text?: string;
  values?: ValueItem[];
};

const SECTIONS: SectionItem[] = [
  {
    id: 0,
    navTitle: "OUR VISION",
    image: "/images/vision.jpg",
    type: "paragraph",
    text: "To lead the region as the most influential content and marketing technology group, shaping culture, elevating creativity, and redefining how brands connect with audiences.",
  },
  {
    id: 1,
    navTitle: "OUR MISSION",
    image: "/images/mission.jpg",
    type: "paragraph",
    text: "To be the region’s most influential content and marketing technology group, shaping culture and elevating creativity while building the future of how brands connect with audiences.",
  },
  {
    id: 2,
    navTitle: "OUR VALUES",
    image: "/images/values.jpg",
    type: "values",
    values: [
      {
        id: 0,
        title: "Creativity\nwith Purpose",
        description:
          "Ideas rooted in culture, crafted with intention, and designed to move people.",
      },
      {
        id: 1,
        title: "Intelligence\nFirst",
        description:
          "Insights, data, and research guide every strategic and creative decision.",
      },
      {
        id: 2,
        title: "Innovation\nAlways",
        description:
          "We embrace technologies, tools, and platforms that push the industry forward.",
      },
      {
        id: 3,
        title: "Collaboration\nat Scale",
        description:
          "Eleven specialized entities working as one connected ecosystem.",
      },
    ],
  },
];

export default function VisionMissionValuesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const paragraphTextRef = useRef<HTMLParagraphElement | null>(null);
  const valuesGridRef = useRef<HTMLDivElement | null>(null);

  const valueItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const valueSlashRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const valueTitleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueDescRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeValueIndex, setActiveValueIndex] = useState(0);

  const activeSection = useMemo(() => SECTIONS[activeIndex], [activeIndex]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".vmv-step");

      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveIndex(index);
            if (index !== 2) setActiveValueIndex(0);
          },
          onEnterBack: () => {
            setActiveIndex(index);
            if (index !== 2) setActiveValueIndex(0);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    bgRefs.current.forEach((bg, index) => {
      if (!bg) return;

      gsap.to(bg, {
        opacity: index === activeIndex ? 1 : 0,
        scale: index === activeIndex ? 1 : 1.03,
        duration: 0.7,
        ease: "power2.out",
      });
    });

    navRefs.current.forEach((nav, index) => {
      if (!nav) return;

      gsap.to(nav, {
        opacity: index === activeIndex ? 1 : 0.3,
        duration: 0.35,
        ease: "power2.out",
      });
    });

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
      );
    }

    if (activeSection.type === "paragraph" && paragraphTextRef.current) {
      gsap.fromTo(
        paragraphTextRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.12,
        }
      );
    }

    if (activeSection.type === "values" && valuesGridRef.current) {
      const cards = valuesGridRef.current.querySelectorAll(".vmv-value-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }
  }, [activeIndex, activeSection]);

  useLayoutEffect(() => {
    if (activeSection.type !== "values") return;

    valueItemRefs.current.forEach((item, index) => {
      const slash = valueSlashRefs.current[index];
      const title = valueTitleRefs.current[index];
      const desc = valueDescRefs.current[index];
      const isActive = index === activeValueIndex;

      if (!item || !slash || !title || !desc) return;

      gsap.killTweensOf([slash, title, desc]);

      gsap.to(slash, {
        opacity: isActive ? 1 : 0,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(title, {
        opacity: isActive ? 1 : 0.42,
        y: isActive ? 0 : 0,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(desc, {
        height: isActive ? "auto" : 0,
        opacity: isActive ? 1 : 0,
        marginTop: isActive ? 10 : 0,
        duration: 0.38,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, [activeSection, activeValueIndex]);

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    if (index !== 2) setActiveValueIndex(0);

    const target = document.getElementById(`vmv-step-${index}`);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleValueActivate = (index: number) => {
    setActiveValueIndex(index);
  };

  const renderParagraphContent = () => {
    return (
      <div className="flex h-full items-center justify-center">
        <div ref={contentRef} className="max-w-[860px] px-2 md:px-0">
          <p
            ref={paragraphTextRef}
            className="max-w-[860px] text-[36px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-[48px] md:text-[64px] lg:text-[72px]"
          >
            {activeSection.text}
          </p>
        </div>
      </div>
    );
  };

  const renderValuesContent = () => {
    const values = activeSection.values || [];

    return (
      <div className="flex h-full items-center justify-center">
        <div
          ref={contentRef}
          className="relative z-30 w-full max-w-[1180px] pointer-events-auto"
        >
          <div
            ref={valuesGridRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-8"
          >
            {values.map((value, index) => {
              const titleLines = value.title.split("\n");

              return (
                <button
                  key={value.id}
                  ref={(el) => {
                    valueItemRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => handleValueActivate(index)}
                  className="vmv-value-card block cursor-pointer select-none bg-transparent text-left"
                >
                  <div className="min-h-[220px]">
                    <div className="flex items-start gap-3">
                      <span
                        ref={(el) => {
                          valueSlashRefs.current[index] = el;
                        }}
                        className="block text-[42px] font-semibold leading-none tracking-[-0.08em] opacity-0 text-white"
                      >
                        /
                      </span>

                      <div
                        ref={(el) => {
                          valueTitleRefs.current[index] = el;
                        }}
                        className="text-[28px] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[32px]"
                      >
                        {titleLines.map((line, lineIndex) => (
                          <span key={lineIndex} className="block">
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      ref={(el) => {
                        valueDescRefs.current[index] = el;
                      }}
                      className="overflow-hidden pl-[34px]"
                      style={{
                        height: index === 0 ? "auto" : 0,
                        opacity: index === 0 ? 1 : 0,
                        marginTop: index === 0 ? 10 : 0,
                      }}
                    >
                      <p className="max-w-[260px] text-[18px] leading-[1.25] tracking-[-0.025em] text-white/92 md:text-[19px]">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative bg-black text-white">
      <div className="sticky top-0 z-20 h-screen overflow-hidden">
        <div className="absolute inset-0">
          {SECTIONS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                bgRefs.current[index] = el;
              }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 will-change-transform"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_72%,rgba(116,38,255,0.26),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.45))]" />

        <div className="relative z-30 mx-auto flex h-full w-full max-w-[1440px] px-6 md:px-12">
          <div className="w-[180px] shrink-0 pt-36 md:w-[230px] md:pt-52">
            <div className="flex flex-col gap-5">
              {SECTIONS.map((item, index) => (
                <button
                  key={item.id}
                  ref={(el) => {
                    navRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => handleNavClick(index)}
                  className={`pointer-events-auto text-left text-[20px] font-semibold uppercase leading-none tracking-[-0.03em] transition-all duration-300 md:text-[18px] ${
                    index === activeIndex ? "text-white" : "text-white/30"
                  }`}
                >
                  {item.navTitle}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {activeSection.type === "paragraph"
              ? renderParagraphContent()
              : renderValuesContent()}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-0">
        {SECTIONS.map((item, index) => (
          <div
            key={item.id}
            id={`vmv-step-${index}`}
            className="vmv-step h-screen"
          >
            <div className="h-full w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}