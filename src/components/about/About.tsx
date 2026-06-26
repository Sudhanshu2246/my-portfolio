"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePanels } from "@/lib/panelContext";

const STATS = [
  { number: "3+",   label: "Full Stack Apps" },
  { number: "15+",  label: "REST APIs Built" },
  { number: "10K+", label: "Records Processed" },
  { number: "-40%", label: "Latency Reduced" },
];

export default function About() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { currentPanel } = usePanels();
  const animated = useRef(false);

  useEffect(() => {
    if (currentPanel !== 1 || animated.current) return;
    animated.current = true;

    const ctx = gsap.context(() => {
      gsap.from(".about-stat-num", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".about-para", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, panelRef);

    return () => ctx.revert();
  }, [currentPanel]);

  return (
    <div
      ref={panelRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(200,100,20,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 75% 50%, rgba(0,229,168,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 grid h-full w-full max-w-[1400px] grid-cols-1 gap-16 px-12 py-20 md:grid-cols-2 md:px-20 lg:px-32">
        {/* Left — Text */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Section label */}
          <div
            className="about-para text-[11px] font-semibold uppercase tracking-[0.35em]"
            style={{ color: "#C86414" }}
          >
            About Me
          </div>

          <h2
            className="about-para font-display text-[42px] font-bold uppercase leading-[0.9] tracking-tight text-white md:text-[60px] lg:text-[72px]"
          >
            Building <span style={{ color: "#00E5A8" }}>Real</span> Products
          </h2>

          <p className="about-para text-[18px] font-light leading-relaxed md:text-[22px]" style={{ color: "#8F8F8F" }}>
            I&apos;m a MERN stack developer who builds real-world products from day one.
          </p>
          <p className="about-para text-[15px] leading-relaxed md:text-[17px]" style={{ color: "#8F8F8F", opacity: 0.8 }}>
            Starting my journey as an intern at Dr Design Pvt Ltd, I jumped straight into
            building production applications — full-stack recruitment platforms,
            travel booking systems, and REST APIs that handle real users and real data.
          </p>
          <p className="about-para text-[15px] leading-relaxed md:text-[17px]" style={{ color: "#8F8F8F", opacity: 0.8 }}>
            I believe in learning by shipping. Every project is a chance to solve real
            problems with modern web technologies.
          </p>

          {/* Divider */}
          <div
            className="about-para h-px"
            style={{
              width: "80px",
              background: "linear-gradient(90deg, #C86414, #00E5A8, transparent)",
            }}
          />
        </div>

        {/* Right — Stats grid */}
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-8">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="about-stat-num group relative overflow-hidden rounded-2xl p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(200,100,20,0.12) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="font-display text-[52px] font-bold leading-none md:text-[64px]"
                  style={{
                    background:
                      "linear-gradient(120deg, #C86414 0%, #E8963C 40%, #00E5A8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="mt-2 text-[12px] uppercase tracking-[0.25em]"
                  style={{ color: "#8F8F8F" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
