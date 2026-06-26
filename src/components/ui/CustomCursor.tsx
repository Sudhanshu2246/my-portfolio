"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Track position and velocity
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, sparkle: 1 });

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");
    const flareRotateSet = gsap.quickSetter(flareRef.current, "rotation", "deg");
    const flareScaleSet = gsap.quickSetter(flareRef.current, "scaleY", "");
    const flareOpacitySet = gsap.quickSetter(flareRef.current, "opacity", "");

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    const ticker = gsap.ticker.add(() => {
      // Smooth interpolation for the cursor position
      pos.current.x += (mouse.current.x - pos.current.x) * 0.25;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.25;

      xSet(pos.current.x);
      ySet(pos.current.y);

      // Calculate velocity vector
      const vx = mouse.current.x - pos.current.x;
      const vy = mouse.current.y - pos.current.y;
      const speed = Math.sqrt(vx * vx + vy * vy);

      // Smooth the random sparkle to prevent strobe-effect
      const targetSparkle = Math.random() * 0.4 + 0.6; 
      pos.current.sparkle = pos.current.sparkle || 1;
      pos.current.sparkle += (targetSparkle - pos.current.sparkle) * 0.2; // Smooth interpolation

      if (speed > 0.5) {
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        flareRotateSet(angle + 90);

        // Small stretching effect (not too long)
        flareScaleSet((Math.min(speed / 20, 0.4) + 1) * pos.current.sparkle);
        flareOpacitySet(Math.min((speed / 20) + 0.6, 1) * pos.current.sparkle);
      } else {
        // Hide flare when stopped
        flareScaleSet(0);
        flareOpacitySet(0);
      }
    });

    // Add hover effect for clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, select, textarea, [data-inner-scroll]")) {
        gsap.to(dotRef.current, { scale: 1.5, backgroundColor: "#00E5A8", boxShadow: "0 0 15px #00E5A8", duration: 0.3 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, select, textarea, [data-inner-scroll]")) {
        gsap.to(dotRef.current, { scale: 1, backgroundColor: "#ffffff", boxShadow: "0 0 10px rgba(255,255,255,0.8)", duration: 0.3 });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center mix-blend-screen"
      style={{ width: 0, height: 0 }}
    >
      {/* Flare (Rocket Exhaust) */}
      <div
        ref={flareRef}
        className="absolute"
        style={{
          width: "10px",
          height: "35px",
          top: "0px", // Attaches directly to the dot and points outward
          // Rocket exhaust: bright at the engine, fading out to red/transparent
          background: "linear-gradient(to bottom, #FFFFFF 0%, #FFD700 25%, #FF4500 70%, transparent 100%)",
          filter: "blur(2px)",
          transformOrigin: "top center",
          borderRadius: "50% 50% 20% 20%", // Tapered shape
          opacity: 0,
          willChange: "transform, opacity"
        }}
      />
      {/* Dot (Rocket) */}
      <div
        ref={dotRef}
        className="absolute h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{ willChange: "transform, background-color, box-shadow" }}
      />
    </div>
  );
}
