"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "System Architecture", level: 95 },
  { name: "React / Next.js", level: 98 },
  { name: "Node.js / Express", level: 95 },
  { name: "MongoDB / PostgreSQL", level: 90 },
  { name: "AWS / Cloud Services", level: 88 },
  { name: "Docker / Kubernetes", level: 85 },
  { name: "TypeScript", level: 95 },
  { name: "Performance Optimization", level: 92 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-row", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".skill-fill", {
        scrollTrigger: {
          trigger: ".skill-list",
          start: "top 75%",
        },
        scaleX: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
        transformOrigin: "left",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative bg-background py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 md:mb-32">
          <SectionReveal
            as="h2"
            className="font-display text-[40px] font-bold uppercase leading-[0.95] tracking-tight text-primary md:text-[72px] lg:text-[96px]"
          >
            Skills
          </SectionReveal>
        </div>

        <div className="skill-list space-y-8">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="skill-row group">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-[20px] font-medium text-primary md:text-[24px]">
                  {skill.name}
                </span>
                <span className="text-[13px] text-muted">{skill.level}%</span>
              </div>
              <div className="h-[2px] overflow-hidden bg-border">
                <div
                  className="skill-fill h-full bg-accent"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
