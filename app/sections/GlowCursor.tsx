"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const outerGlowRef = useRef<HTMLDivElement | null>(null);
  const midGlowRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const cursorColors = useMemo(() => {
    if (pathname === "/") {

      return {
        outerBg: "rgba(59,130,246,0.22)",
        midBg: "rgba(59,130,246,0.28)",
        dotBg: "#2563eb",
        shadow: "0 0 20px rgba(37,99,235,0.8)",
      };
    }
    return {
      outerBg: "rgba(147,51,234,0.25)",
      midBg: "rgba(147,51,234,0.30)",
      dotBg: "#9333ea",
      shadow: "0 0 20px rgba(147,51,234,0.9)",
    };
  }, [pathname]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power3.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.85,
        duration: 0.2,
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  useEffect(() => {
    if (!outerGlowRef.current || !midGlowRef.current || !dotRef.current) return;

    gsap.to(outerGlowRef.current, {
      backgroundColor: cursorColors.outerBg,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(midGlowRef.current, {
      backgroundColor: cursorColors.midBg,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(dotRef.current, {
      backgroundColor: cursorColors.dotBg,
      boxShadow: cursorColors.shadow,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [cursorColors]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative h-20 w-20">
        <div
          ref={outerGlowRef}
          className="absolute inset-0 rounded-full blur-3xl"
        />
        <div
          ref={midGlowRef}
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        />
        <div
          ref={dotRef}
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </div>
    </div>
  );
}