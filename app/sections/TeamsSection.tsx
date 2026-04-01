"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !viewportRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const viewport = viewportRef.current!;
      const track = trackRef.current!;

      const createAnimation = () => {
        gsap.killTweensOf(track);

        const maxMove = track.scrollWidth - viewport.clientWidth;

        gsap.to(track, {
          x: -maxMove,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=" + (maxMove + 400),
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      };

      createAnimation();
      window.addEventListener("resize", createAnimation);

      return () => window.removeEventListener("resize", createAnimation);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      <div className="container mx-auto flex min-h-screen flex-col justify-center px-6 md:px-12">
        <p className="mb-8 text-[18px] tracking-[-0.02em] text-white/90">
          With Teams Across
        </p>
        <div ref={viewportRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max items-center gap-8 will-change-transform"
          >
            {["RIYADH", "JEDDAH", "DUBAI", "BEIRUT", "CAIRO"].map(
              (city, index) => (
                <div key={index} className="flex items-center gap-8">
                  <span className="bg-[linear-gradient(90deg,#ff73b3_0%,#e96dff_42%,#b88cff_72%,#8ea2ff_100%)] bg-clip-text text-[62px] font-semibold uppercase leading-none tracking-[-0.06em] text-transparent sm:text-[88px] md:text-[118px] lg:text-[150px]">
                    {city}
                  </span>
                  <span className="text-[50px] text-[#ff73b3] md:text-[70px] lg:text-[90px]">
                    •
                  </span>
                </div>
              )
            )}
            <div className="w-[40vw] shrink-0" />
          </div>
        </div>
        <div className="mt-10 flex w-full justify-end">
          <p className="max-w-[500px] text-right text-[13px] leading-[1.7] text-white/70 md:text-[14px]">
            We create data-powered content, high-impact digital experiences,
            and platform-first storytelling built for the region’s evolving future.
          </p>
        </div>
      </div>
    </section>
  );
}