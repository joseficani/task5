"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !videoWrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(videoWrapRef.current, {
        position: "absolute",
        width: "58vw",
        height: "42vh",
        left: "50%",
        top: "68%",
        xPercent: -50,
        yPercent: -50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -70,
          duration: 0.45,
          ease: "power2.out",
        },
        0
      )
        .to(
          navRef.current,
          {
            opacity: 0.35,
            duration: 0.4,
            ease: "power2.out",
          },
          0
        )
        .to(
          videoWrapRef.current,
          {
            width: "100vw",
            height: "100vh",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0.08
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#efefef]"
    >
      <div
        ref={navRef}
        className="absolute left-0 top-0 z-30 flex w-full items-start justify-between px-8 pt-7 md:px-14"
      >
        <div className="leading-none text-black">
          <div className="text-[34px] font-black tracking-[-0.08em]">
            future life/.
          </div>
          <div className="-mt-1 ml-[2px] text-[18px] font-bold tracking-[-0.05em]">
            studio
          </div>
        </div>

        <button
          aria-label="Open menu"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-black transition hover:bg-black hover:text-white"
        >
          <Menu size={24} strokeWidth={2.3} />
        </button>
      </div>
      <div className="relative h-full w-full px-8 pt-24 md:px-14 md:pt-24">
        <div ref={textRef} className="relative z-20 max-w-[900px]">
          <h1 className="text-[44px] font-medium leading-[0.9] tracking-[-0.05em] text-black sm:text-[64px] md:text-[88px] lg:text-[98px]">
            Creativity Powered
            <br />
            By Intelligence
          </h1>
        </div>
        <div
          ref={videoWrapRef}
          className="z-10 overflow-hidden bg-black shadow-[0_24px_80px_rgba(0,0,0,0.16)]"
        >
          <video
            className="h-full w-full object-cover"
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </div>
      </div>
    </section>
  );
}