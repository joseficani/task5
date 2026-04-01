"use client";

import { useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FixedNavbar() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!bgRef.current || !logoRef.current || !burgerRef.current) return;

    const hero = document.querySelector("#hero-section");
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, { opacity: 0 });
      gsap.set(logoRef.current, { color: "#000" });

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=250",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          gsap.to(bgRef.current, { opacity: p });

          gsap.to(logoRef.current, {
            color: p > 0.15 ? "#fff" : "#000",
          });

          gsap.to(burgerRef.current, {
            color: p > 0.15 ? "#fff" : "#000",
            borderColor:
              p > 0.15
                ? "rgba(255,255,255,0.35)"
                : "rgba(0,0,0,0.2)",
            backgroundColor:
              p > 0.15
                ? "rgba(255,255,255,0.08)"
                : "transparent",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-black/40 to-transparent"
      />
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-start justify-between pt-7">
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
        </div>
      </div>
    </>
  );
}