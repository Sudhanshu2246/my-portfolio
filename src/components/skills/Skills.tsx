"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePanels } from "@/lib/panelContext";

const SKILLS = [
  { name: "React / Next.js",          level: 98, color: "#00E5A8" },
  { name: "Node.js / Express",         level: 95, color: "#C86414" },
  { name: "TypeScript",                level: 95, color: "#00E5A8" },
  { name: "MongoDB / PostgreSQL",      level: 90, color: "#E8963C" },
  { name: "System Architecture",       level: 92, color: "#00E5A8" },
  { name: "AWS / Cloud Services",      level: 88, color: "#C86414" },
  { name: "Docker / Kubernetes",       level: 85, color: "#00E5A8" },
  { name: "Performance Optimization",  level: 92, color: "#E8963C" },
];

export default function Skills() {
  const panelRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const { currentPanel } = usePanels();

  useEffect(() => {
    if (currentPanel !== 5 || animated.current) return;
    animated.current = true;

    const ctx = gsap.context(() => {
      gsap.from(".skill-row-item", {
        x: -50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
      });

      gsap.from(".skill-fill", {
        scaleX: 0,
        duration: 1.4,
        stagger: 0.09,
        ease: "power3.out",
        transformOrigin: "left",
        delay: 0.2,
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
            "radial-gradient(ellipse 55% 65% at 70% 50%, rgba(0,229,168,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex h-full w-full max-w-[1400px] flex-col justify-center px-12 py-20 md:px-20 lg:px-32">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "#C86414" }}>
            Proficiency
          </div>
          <h2 className="font-display text-[42px] font-bold uppercase leading-[0.9] tracking-tight text-white md:text-[64px]">
            Skills
          </h2>
          <div
            className="mt-6 h-px"
            style={{
              width: "80px",
              background: "linear-gradient(90deg, #C86414, #00E5A8, transparent)",
            }}
          />
        </div>

        {/* Skill bars */}
        <div className="grid gap-7 md:grid-cols-2">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="skill-row-item group">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-display text-[17px] font-medium text-white md:text-[19px]">
                  {skill.name}
                </span>
                <span
                  className="font-display text-[13px] font-bold"
                  style={{ color: skill.color }}
                >
                  {skill.level}%
                </span>
              </div>
              <div
                className="h-[3px] overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="skill-fill h-full rounded-full"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, #C86414 0%, ${skill.color} 100%)`,
                    boxShadow: `0 0 8px ${skill.color}60`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
