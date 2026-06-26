"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete,
          });
        },
      });

      tl.to(
        {},
        {
          duration: 2.5,
          onUpdate: function () {
            setCount(Math.round(this.progress() * 100));
          },
        }
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2.5, ease: "power2.inOut" },
        0
      );

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-8">
        <div
          ref={textRef}
          className="text-[11px] font-medium uppercase tracking-[0.4em] text-muted"
        >
          Loading
        </div>

        <span
          ref={counterRef}
          className="font-display text-[80px] font-bold leading-none text-primary md:text-[120px]"
        >
          {count}
        </span>

        <div className="relative h-[1px] w-[200px] overflow-hidden bg-border">
          <div
            ref={lineRef}
            className="absolute inset-0 origin-left bg-accent"
          />
        </div>
      </div>
    </div>
  );
}
