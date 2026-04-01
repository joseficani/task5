"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !videoWrapRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(videoWrapRef.current, {
        position: "absolute",
        width: "58vw",
        height: "42vh",
        left: "50%",
        top: "72%",
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
          duration: 0.4,
          ease: "power2.out",
        },
        0
      ).to(
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
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="hero-section"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#efefef]"
    >
      <div className="container mx-auto h-full px-6 md:px-12">
        <div className="relative h-full w-full pt-24 md:pt-24">
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
      </div>
    </section>
  );
}