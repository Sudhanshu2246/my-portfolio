"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-card", {
        scrollTrigger: {
          trigger: panelRef.current,
          scroller: document.body,
          horizontal: true,
          start: "left 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
      });

      gsap.from(".exp-line-h", {
        scrollTrigger: {
          trigger: panelRef.current,
          scroller: document.body,
          horizontal: true,
          start: "left 75%",
        },
        scaleX: 0,
        duration: 1.4,
        ease: "power3.out",
        transformOrigin: "left",
      });
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 65% 40%, rgba(0,229,168,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex h-full w-full max-w-[1400px] flex-col justify-center px-12 py-20 md:px-20 lg:px-32">
        {/* Header */}
        <div className="mb-14">
          <div
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em]"
            style={{ color: "#C86414" }}
          >
            Career Journey
          </div>
          <h2 className="font-display text-[42px] font-bold uppercase leading-[0.9] tracking-tight text-white md:text-[64px] lg:text-[80px]">
            Experience
          </h2>
          {/* Horizontal timeline line */}
          <div
            className="exp-line-h mt-8 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, #C86414 0%, #00E5A8 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Experience cards */}
        <div className="space-y-10">
          {EXPERIENCE.map((exp) => (
            <div
              key={exp.company}
              className="exp-card group relative overflow-hidden rounded-2xl p-8"
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
                    "radial-gradient(ellipse 70% 70% at 20% 50%, rgba(200,100,20,0.1) 0%, transparent 70%)",
                }}
              />

              {/* Top row: Logo + period */}
              <div className="relative z-10 mb-6 flex flex-wrap items-center gap-4">
                {/* Real Dr Design logo */}
                <div
                  className="flex h-10 w-auto items-center overflow-hidden rounded-lg px-2"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Image
                    src="/logo-remastered.svg"
                    alt="Dr Design logo"
                    width={120}
                    height={36}
                    className="h-8 w-auto object-contain"
                    unoptimized
                  />
                </div>

                <div
                  className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]"
                  style={{
                    background: "rgba(200,100,20,0.12)",
                    color: "#C86414",
                    border: "1px solid rgba(200,100,20,0.25)",
                  }}
                >
                  {exp.period}
                </div>
              </div>

              {/* Role & company */}
              <div className="relative z-10 mb-4">
                <h3 className="font-display text-[26px] font-bold text-white md:text-[32px]">
                  {exp.role}
                </h3>
                <div className="mt-1 flex items-center gap-3" style={{ color: "#8F8F8F" }}>
                  <span className="text-[16px]">{exp.company}</span>
                  <span style={{ color: "#1D1D1D" }}>|</span>
                  <span className="text-[14px]">{exp.location}</span>
                </div>
                <p className="mt-3 max-w-3xl text-[14px] leading-relaxed" style={{ color: "rgba(143,143,143,0.8)" }}>
                  {exp.description}
                </p>
              </div>

              {/* Highlights — 2 column grid */}
              <div className="relative z-10 mb-5 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
                {exp.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 text-[13px] leading-relaxed" style={{ color: "rgba(143,143,143,0.75)" }}>
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "#00E5A8" }}
                    />
                    {h}
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-3 py-1 text-[11px] uppercase tracking-wider"
                    style={{
                      background: "rgba(0,229,168,0.06)",
                      border: "1px solid rgba(0,229,168,0.15)",
                      color: "#00E5A8",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
