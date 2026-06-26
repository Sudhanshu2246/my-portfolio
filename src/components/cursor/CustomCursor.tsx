"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);
  const springInnerX = useSpring(innerX, { stiffness: 500, damping: 28 });
  const springInnerY = useSpring(innerY, { stiffness: 500, damping: 28 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      innerX.set(e.clientX - 4);
      innerY.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]");
      if (isInteractive && ringRef.current) {
        ringRef.current.style.width = "80px";
        ringRef.current.style.height = "80px";
        ringRef.current.style.borderColor = "var(--color-accent)";
        if (dotRef.current) {
          dotRef.current.style.transform = "scale(0)";
        }
      }
    };

    const handleMouseOut = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "40px";
        ringRef.current.style.height = "40px";
        ringRef.current.style.borderColor = "var(--color-accent)";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = "scale(1)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktop, cursorX, cursorY, innerX, innerY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-[40px] w-[40px] rounded-full border border-accent mix-blend-difference transition-[width,height,border-color] duration-300"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-[8px] w-[8px] rounded-full bg-accent mix-blend-difference transition-transform duration-200"
        style={{ x: springInnerX, y: springInnerY }}
      />
    </>
  );
}
