"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileSearch, Search, Lightbulb, Compass } from "lucide-react";
import { createRoot, Root } from "react-dom/client";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Assess",
    items: ["Objectives", "Needs", "Outputs & Deliverables"],
    icon: FileSearch,
    height: "min-h-[225px]",
    offset: "lg:mt-[22px]",
  },
  {
    title: "Analyse",
    items: [
      "Webedia audiences",
      "Surveys and polls",
      "Third party databases",
      "Social media analytics",
      "Google search queries",
      "Global consumption trends",
    ],
    icon: Search,
    height: "min-h-[328px]",
    offset: "lg:mt-[42px]",
  },
  {
    title: "Strategize",
    items: [
      "Identify risks and barriers",
      "Unlock opportunities",
      "Develop value-proposition",
    ],
    icon: Lightbulb,
    height: "min-h-[220px]",
    offset: "lg:mt-[6px]",
  },
  {
    title: "Guide",
    items: [
      "Implementation",
      "Execution support",
      "Optimization",
      "Results tracking",
      "Continuous improvement",
    ],
    icon: Compass,
    height: "min-h-[262px]",
    offset: "lg:mt-[2px]",
  },
];

const ICON_SIZE = 62;

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const activeIconRef = useRef<HTMLDivElement | null>(null);
  const activeIconInnerRef = useRef<HTMLDivElement | null>(null);

  const dotRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotInnerRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardWrapRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const itemRef = useRef<(HTMLLIElement[] | null)[]>([]);
  const iconRootRef = useRef<Root | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const track = trackRef.current;
      const progress = progressRef.current;
      const activeIcon = activeIconRef.current;
      const activeIconInner = activeIconInnerRef.current;

      const dotNodes = dotRef.current.filter(Boolean) as HTMLDivElement[];
      const dotInnerNodes = dotInnerRef.current.filter(Boolean) as HTMLDivElement[];
      const cardWrapNodes = cardWrapRef.current.filter(Boolean) as HTMLDivElement[];
      const cardNodes = cardRef.current.filter(Boolean) as HTMLDivElement[];
      const titleNodes = titleRef.current.filter(Boolean) as HTMLHeadingElement[];

      if (
        !track ||
        !progress ||
        !activeIcon ||
        !activeIconInner ||
        dotNodes.length !== STEPS.length ||
        dotInnerNodes.length !== STEPS.length ||
        cardWrapNodes.length !== STEPS.length ||
        cardNodes.length !== STEPS.length ||
        titleNodes.length !== STEPS.length
      ) {
        return;
      }

      if (!iconRootRef.current) {
        iconRootRef.current = createRoot(activeIconInner);
      }

      const renderIcon = (index: number) => {
        const CurrentIcon = STEPS[index].icon;
        iconRootRef.current?.render(
          <CurrentIcon size={18} strokeWidth={1.9} className="text-white" />
        );
      };

      const getDotCenterXInTrack = (index: number) => {
        const trackRect = track.getBoundingClientRect();
        const dotRect = dotNodes[index].getBoundingClientRect();
        return dotRect.left - trackRect.left + dotRect.width / 2;
      };

      const getProgressWidth = (index: number) => getDotCenterXInTrack(index);

      const animateCardEntrance = (index: number) => {
        const wrap = cardWrapNodes[index];
        if (!wrap) return;

        gsap.fromTo(
          wrap,
          {
            y: 24,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: wrap,
              start: "top 88%",
              once: true,
            },
          }
        );
      };

      const pulseActiveCard = (index: number) => {
        const card = cardNodes[index];
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 10, scale: 0.985 },
          {
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      };

      const setCardVisualState = (
        index: number,
        activeIndex: number,
        hasStarted: boolean
      ) => {
        const card = cardNodes[index];
        const gradient = card.querySelector(".card-gradient");
        const glow = card.querySelector(".card-glow");
        const borderGlow = card.querySelector(".card-border-glow");
        const title = titleNodes[index];
        const items = itemRef.current[index] || [];

        const isActive = hasStarted && index === activeIndex;
        const isPrevious = hasStarted && index < activeIndex;

        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: isActive ? 1 : 0.985,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
          boxShadow: isActive
            ? "0 0 0 1px rgba(176,93,255,0.22), 0 0 36px rgba(162,86,255,0.14)"
            : isPrevious
            ? "0 0 0 1px rgba(176,93,255,0.16), 0 0 18px rgba(162,86,255,0.08)"
            : "0 0 0 1px rgba(176,93,255,0.08), 0 0 6px rgba(162,86,255,0.02)",
        });

        if (gradient) {
          gsap.to(gradient, {
            opacity: isActive ? 1 : isPrevious ? 0.72 : 0.12,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (glow) {
          gsap.to(glow, {
            opacity: isActive ? 1 : isPrevious ? 0.62 : 0.08,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (borderGlow) {
          gsap.to(borderGlow, {
            opacity: isActive ? 1 : isPrevious ? 0.7 : 0.22,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (title) {
          title.innerHTML = isActive
            ? `<span class="inline-block mr-[8px] text-white">/</span>${STEPS[index].title}`
            : STEPS[index].title;

          gsap.to(title, {
            color: isActive
              ? "rgba(255,255,255,1)"
              : isPrevious
              ? "rgba(255,255,255,0.78)"
              : "rgba(255,255,255,0.22)",
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        items.forEach((item, itemIndex) => {
          gsap.to(item, {
            color: isActive
              ? "rgba(255,255,255,0.90)"
              : isPrevious
              ? "rgba(255,255,255,0.58)"
              : "rgba(255,255,255,0.12)",
            duration: 0.45,
            delay: isActive ? itemIndex * 0.03 : 0,
            ease: "power2.out",
            overwrite: "auto",
          });

          const bullet = item.querySelector(".process-bullet");
          if (bullet) {
            gsap.to(bullet, {
              opacity: isActive ? 1 : isPrevious ? 0.65 : 0.18,
              scale: isActive ? 1 : 0.95,
              duration: 0.45,
              delay: isActive ? itemIndex * 0.03 : 0,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      const setDotsState = (activeIndex: number, hasStarted: boolean) => {
        dotNodes.forEach((dot, index) => {
          const inner = dotInnerNodes[index];
          const isActive = hasStarted && index === activeIndex;
          const isPrevious = hasStarted && index < activeIndex;

          gsap.to(dot, {
            opacity: isActive ? 0 : isPrevious ? 0.72 : 0.55,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (inner) {
            gsap.to(inner, {
              opacity: hasStarted ? (isPrevious ? 1 : 0) : 0,
              scale: hasStarted ? (isPrevious ? 1 : 0.4) : 0.4,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      let lastActiveIndex = -1;

      const setStepState = (activeIndex: number, hasStarted: boolean) => {
        cardNodes.forEach((_, index) =>
          setCardVisualState(index, activeIndex, hasStarted)
        );

        setDotsState(activeIndex, hasStarted);

        if (hasStarted) {
          if (activeIndex !== lastActiveIndex) {
            pulseActiveCard(activeIndex);
            lastActiveIndex = activeIndex;
          }

          gsap.to(activeIcon, {
            autoAlpha: 1,
            x: getDotCenterXInTrack(activeIndex) - ICON_SIZE / 2,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(progress, {
            width: getProgressWidth(activeIndex),
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });

          renderIcon(activeIndex);
        } else {
          lastActiveIndex = -1;

          gsap.set(activeIcon, {
            autoAlpha: 0,
            x: getDotCenterXInTrack(0) - ICON_SIZE / 2,
          });

          gsap.set(progress, {
            width: 0,
            opacity: 1,
          });
        }
      };

      cardWrapNodes.forEach((_, index) => animateCardEntrance(index));

      setStepState(0, false);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3600",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      tl.to({}, { duration: 0.6, onUpdate: () => setStepState(0, false) })
        .to(
          {},
          {
            duration: 1,
            onStart: () => setStepState(0, true),
            onReverseComplete: () => setStepState(0, false),
          }
        )
        .to(
          {},
          {
            duration: 1,
            onStart: () => setStepState(1, true),
            onReverseComplete: () => setStepState(0, true),
          }
        )
        .to(
          {},
          {
            duration: 1,
            onStart: () => setStepState(2, true),
            onReverseComplete: () => setStepState(1, true),
          }
        )
        .to(
          {},
          {
            duration: 1,
            onStart: () => setStepState(3, true),
            onReverseComplete: () => setStepState(2, true),
          }
        );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      iconRootRef.current?.unmount();
      iconRootRef.current = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#040406] text-white"
    >
      <div className="absolute inset-0 bg-[#040406]" />

      <div className="absolute inset-0 opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(98,33,208,0.30),transparent_34%),radial-gradient(circle_at_50%_68%,rgba(188,73,255,0.12),transparent_52%),radial-gradient(circle_at_50%_100%,rgba(69,16,128,0.40),transparent_58%)]" />
        <div className="absolute inset-x-0 bottom-[-8%] h-[68%] bg-[radial-gradient(ellipse_at_center,rgba(73,17,136,0.36)_0%,rgba(32,8,59,0.22)_36%,rgba(0,0,0,0)_76%)] blur-[34px]" />
      </div>

      <div className="container relative z-10 mx-auto min-h-screen px-6 md:px-12">
        <div className="flex min-h-screen flex-col justify-center py-16">
          <div className="relative hidden md:block">
            <div
              ref={trackRef}
              className="relative mx-auto mb-8 h-[64px] w-[calc(100%-32px)]"
            >
              <div className="absolute left-0 right-0 top-[22px] h-px border-t border-dashed border-white/12" />

              <div
                ref={progressRef}
                className="absolute left-0 top-[22px] h-[2px] bg-[linear-gradient(90deg,#8A4FFF_0%,#C74DFF_100%)] shadow-[0_0_10px_rgba(172,89,255,0.45)]"
              />

              <div className="relative grid h-full grid-cols-4">
                {STEPS.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative flex h-full items-start justify-center"
                  >
                    <div
                      ref={(el) => {
                        dotRef.current[index] = el;
                      }}
                      className="absolute top-[17px] flex h-[12px] w-[12px] items-center justify-center rounded-full border border-[#9f5cff] bg-transparent shadow-[0_0_12px_rgba(160,91,255,0.45)]"
                    >
                      <div
                        ref={(el) => {
                          dotInnerRef.current[index] = el;
                        }}
                        className="h-[5px] w-[5px] rounded-full bg-[#A05BFF] opacity-0 shadow-[0_0_8px_rgba(160,91,255,0.9)]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                ref={activeIconRef}
                className="absolute left-0 top-0 z-20 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-[#a35eff]/25 bg-[radial-gradient(circle_at_center,rgba(170,92,255,0.34)_0%,rgba(116,45,213,0.18)_44%,rgba(21,10,43,0.96)_72%,rgba(8,5,18,1)_100%)] shadow-[0_0_22px_rgba(167,89,255,0.24),0_0_52px_rgba(103,45,210,0.18)]"
              >
                <div className="absolute inset-[7px] rounded-full border border-white/6" />
                <div ref={activeIconInnerRef} className="relative z-10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14 lg:items-start">
            {STEPS.map((step, cardIndex) => (
              <div
                key={step.title}
                ref={(el) => {
                  cardWrapRef.current[cardIndex] = el;
                }}
                className={step.offset}
              >
                <div
                  ref={(el) => {
                    cardRef.current[cardIndex] = el;
                  }}
                  className={[
                    "relative overflow-hidden rounded-[10px] border border-[#a860ff]/18 px-7 pb-7 pt-8 backdrop-blur-[3px]",
                    step.height,
                  ].join(" ")}
                >
                  <div className="card-gradient absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(54,26,116,0.86)_0%,rgba(90,32,165,0.54)_26%,rgba(168,78,255,0.20)_62%,rgba(255,255,255,0.02)_100%)]" />

                  <div className="card-glow pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_34%,rgba(228,118,255,0.25),transparent_28%),radial-gradient(circle_at_28%_82%,rgba(89,32,180,0.18),transparent_38%)]" />

                  <div className="card-border-glow pointer-events-none absolute inset-0 z-0 rounded-[10px] shadow-[inset_0_0_0_1px_rgba(170,96,255,0.10)]" />

                  <div className="relative z-10">
                    <h3
                      ref={(el) => {
                        titleRef.current[cardIndex] = el;
                      }}
                      className="mb-7 text-[26px] font-semibold leading-none tracking-[-0.045em] text-white"
                    >
                      {step.title}
                    </h3>

                    <ul className="space-y-[14px]">
                      {step.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          ref={(el) => {
                            if (!itemRef.current[cardIndex]) {
                              itemRef.current[cardIndex] = [];
                            }
                            if (el) {
                              itemRef.current[cardIndex]![itemIndex] = el;
                            }
                          }}
                          className="flex items-start gap-[10px] text-[15px] font-normal leading-[1.55] text-white/85"
                        >
                          <span className="process-bullet mt-[9px] block h-[4px] w-[4px] rounded-full bg-[#c56aff] shadow-[0_0_6px_rgba(197,106,255,0.8)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}