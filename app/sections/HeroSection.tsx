"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const navBgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !textRef.current ||
      !videoWrapRef.current ||
      !logoRef.current ||
      !burgerRef.current ||
      !navBgRef.current
    )
      return;

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

      gsap.set(navBgRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
        },
      });
      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -70,
          duration: 0.4,
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
          0.05
        )
        .to(
          navBgRef.current,
          {
            opacity: 1,
            duration: 0.4,
          },
          0.2
        )
        .to(
          logoRef.current,
          {
            color: "#ffffff",
            duration: 0.4,
          },
          0.2
        )
        .to(
          burgerRef.current,
          {
            color: "#ffffff",
            borderColor: "rgba(255,255,255,0.4)",
            backgroundColor: "rgba(255,255,255,0.08)",
            duration: 0.4,
          },
          0.2
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
        ref={navBgRef}
        className="pointer-events-none absolute top-0 left-0 z-20 h-28 w-full bg-gradient-to-b from-black/40 to-transparent"
      />
      <div className="absolute left-0 top-0 z-30 flex w-full items-start justify-between px-8 pt-7 md:px-14">
        <div ref={logoRef} className="leading-none text-black">
          <div className="text-[34px] font-black tracking-[-0.08em]">
            future life/.
          </div>
          <div className="-mt-1 ml-[2px] text-[18px] font-bold tracking-[-0.05em]">
            studio
          </div>
        </div>
        <button
          ref={burgerRef}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 text-black transition"
        >
          <Menu size={24} strokeWidth={2.3} />
        </button>
      </div>
      <div className="relative h-full w-full px-8 pt-24 md:px-14">
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
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </div>
      </div>
    </section>
  );
}