"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function NextSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const slide1Ref = useRef<HTMLDivElement | null>(null);
  const slide2Ref = useRef<HTMLDivElement | null>(null);
  const slide3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !slide1Ref.current ||
      !slide2Ref.current ||
      !slide3Ref.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([slide1Ref.current, slide2Ref.current, slide3Ref.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(slide1Ref.current, {
        opacity: 1,
        y: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2800",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        slide1Ref.current,
        {
          opacity: 0,
          y: -40,
          ease: "power2.out",
          duration: 0.7,
        },
        0.8
      )
        .to(
          slide2Ref.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.7,
          },
          1
        )
        .to(
          slide2Ref.current,
          {
            opacity: 0,
            y: -40,
            ease: "power2.out",
            duration: 0.7,
          },
          2
        )
        .to(
          slide3Ref.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.7,
          },
          2.2
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#060816] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(0,180,255,0.28),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(89,0,255,0.18),transparent_30%),linear-gradient(180deg,#090b18_0%,#070913_45%,#05070f_100%)]" />
      <div className="absolute left-0 top-0 z-30 w-full">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex w-full items-start justify-between pt-7">
            <div className="leading-none text-white">
              <div className="text-[34px] font-black tracking-[-0.08em]">
                future life/.
              </div>
              <div className="-mt-1 ml-[2px] text-[18px] font-bold tracking-[-0.05em]">
                studio
              </div>
            </div>

            <button
              aria-label="Open menu"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm"
            >
              <Menu size={24} strokeWidth={2.3} />
            </button>
          </div>
        </div>
      </div>

      <div className="container relative z-20 mx-auto flex min-h-screen items-center justify-center px-6 md:px-12">
        <div className="relative flex h-[260px] w-full items-center justify-center text-center">
          <div ref={slide1Ref} className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-[44px] font-semibold leading-none tracking-[-0.04em] sm:text-[58px] md:text-[78px] lg:text-[92px]">
              200+ Million
            </h2>
            <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-white/65 md:text-[13px]">
              Monthly Views
            </p>
          </div>
          <div ref={slide2Ref} className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-[44px] font-semibold leading-none tracking-[-0.04em] sm:text-[58px] md:text-[78px] lg:text-[92px]">
              50+ Million
            </h2>
            <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-white/65 md:text-[13px]">
              Subscribers
            </p>
          </div>
          <div ref={slide3Ref} className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-[44px] font-semibold leading-none tracking-[-0.04em] sm:text-[58px] md:text-[78px] lg:text-[92px]">
              30+
            </h2>
            <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-white/65 md:text-[13px]">
              Awards Across 2022–2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}