"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = ["Creativity", "Innovation", "Excellence", "Storytelling"];

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trophyRef = useRef<HTMLImageElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLHeadingElement | null>(null);

  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % WORDS.length);
    }, 2200);

    return () => clearInterval(wordTimer);
  }, []);

  useEffect(() => {
    const word = wordRef.current;
    if (!word) return;

    gsap.fromTo(
      word,
      {
        opacity: 0,
        scale: 0.96,
        y: 12,
      },
      {
        opacity: 0.68,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, [activeWord]);

  useEffect(() => {
    const section = sectionRef.current;
    const trophy = trophyRef.current;
    const glow = glowRef.current;
    const word = wordRef.current;

    if (!section || !trophy || !glow || !word) return;

    gsap.to(word, {
      backgroundPosition: "200% center",
      duration: 6,
      repeat: -1,
      ease: "none",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const moveX = ((x / rect.width) - 0.5) * 36;
      const moveY = ((y / rect.height) - 0.5) * 24;

      gsap.to(trophy, {
        x: moveX,
        y: moveY + 24,
        rotate: moveX * 0.12,
        duration: 0.55,
        ease: "power3.out",
      });

      gsap.to(glow, {
        x: moveX * 0.55,
        y: moveY * 0.4,
        scale: 1.05,
        duration: 0.65,
        ease: "power3.out",
      });

      gsap.to(word, {
        x: moveX * 0.18,
        y: moveY * 0.12,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(trophy, {
        x: 0,
        y: 24,
        rotate: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(glow, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(word, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#090c0d] py-16 text-white md:py-24"
    >
      <div className="absolute inset-0 bg-[#090c0d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(152,55,255,0.18),transparent_22%),radial-gradient(circle_at_50%_52%,rgba(255,0,170,0.08),transparent_30%)]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="text-center">
          <h2 className="text-[88px] font-light leading-none tracking-[-0.06em] text-white sm:text-[110px] md:text-[132px] lg:text-[150px]">
            30+
          </h2>
          <p className="-mt-1 text-[14px] font-medium uppercase tracking-[0.06em] text-white/75 md:text-[18px]">
            Awards Across 2023-2025
          </p>
        </div>

        <div className="relative mt-8 flex min-h-[360px] items-center justify-center md:min-h-[430px] lg:min-h-[500px]">
          <img
            ref={trophyRef}
            src="/images/trophy.png"
            alt="Award trophy"
            className="pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[180px] -translate-x-1/2 -translate-y-1/2 opacity-90 sm:w-[220px] md:w-[280px] lg:w-[360px]"
          />
          <h3
            ref={wordRef}
            className="pointer-events-none absolute left-1/2 top-1/2 z-[10] w-full -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,#ff4fa8_0%,#cc5fff_25%,#7b74ff_50%,#4f79ff_75%,#ff4fa8_100%)] bg-[length:200%_100%] bg-clip-text text-center text-[96px] font-medium tracking-[-0.07em] text-transparent opacity-70 sm:text-[125px] md:text-[170px] lg:text-[220px]"
          >
            {WORDS[activeWord]}
          </h3>
          <div
            ref={glowRef}
            className="pointer-events-none absolute left-1/2 top-1/2 z-[20] h-[230px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(157,58,255,0.42)_0%,rgba(105,24,180,0.18)_40%,rgba(0,0,0,0)_72%)] blur-[18px] md:h-[260px] md:w-[760px] lg:h-[300px] lg:w-[900px]"
          />
        </div>

        <div className="mt-2 grid grid-cols-2 gap-y-8 text-center sm:grid-cols-3 md:mt-6 md:grid-cols-5 md:gap-6">
          <div>
            <div className="text-[44px] font-semibold leading-none tracking-[-0.05em] text-white/80 md:text-[56px]">
              27
            </div>
            <div className="mt-1 text-[18px] uppercase tracking-[-0.02em] text-white/55 md:text-[20px]">
              Gold
            </div>
          </div>

          <div>
            <div className="text-[44px] font-semibold leading-none tracking-[-0.05em] text-white/80 md:text-[56px]">
              20
            </div>
            <div className="mt-1 text-[18px] uppercase tracking-[-0.02em] text-white/55 md:text-[20px]">
              Platinum
            </div>
          </div>

          <div>
            <div className="text-[44px] font-semibold leading-none tracking-[-0.05em] text-white/80 md:text-[56px]">
              6
            </div>
            <div className="mt-1 text-[18px] uppercase tracking-[-0.02em] text-white/55 md:text-[20px]">
              Silver
            </div>
          </div>

          <div>
            <div className="text-[44px] font-semibold leading-none tracking-[-0.05em] text-white/80 md:text-[56px]">
              3
            </div>
            <div className="mt-1 text-[18px] uppercase tracking-[-0.02em] text-white/55 md:text-[20px]">
              Bronze
            </div>
          </div>

          <div>
            <div className="text-[44px] font-semibold leading-none tracking-[-0.05em] text-white/80 md:text-[56px]">
              1
            </div>
            <div className="mt-1 text-[18px] uppercase tracking-[-0.02em] text-white/55 md:text-[20px]">
              Grand Prix
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}