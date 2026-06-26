"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: SectionRevealProps) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(ref.current!, { types: ["chars", "words"] });

      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.02,
        delay,
      });
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`mask-reveal ${className}`}>
      {children}
    </Tag>
  );
}
