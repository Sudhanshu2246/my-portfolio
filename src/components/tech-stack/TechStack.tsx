"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_STACK } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

// Devicon CDN base URL
const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// Map tech names → devicon slugs + variants
const DEVICON_MAP: Record<string, { slug: string; variant: string } | null> = {
  // Frontend
  "React":          { slug: "react",               variant: "original" },
  "Next.js":        { slug: "nextjs",              variant: "original" },
  "TypeScript":     { slug: "typescript",          variant: "original" },
  "Tailwind CSS":   { slug: "tailwindcss",         variant: "original" },
  "GSAP":           null,
  "Three.js":       { slug: "threejs",             variant: "original" },
  "Framer Motion":  null,
  "Redux":          { slug: "redux",               variant: "original" },
  // Backend
  "Node.js":        { slug: "nodejs",              variant: "original" },
  "Express.js":     { slug: "express",             variant: "original" },
  "NestJS":         { slug: "nestjs",              variant: "original" },
  "GraphQL":        { slug: "graphql",             variant: "plain" },
  "REST APIs":      null,
  "WebSockets":     null,
  // Database
  "MongoDB":        { slug: "mongodb",             variant: "original" },
  "PostgreSQL":     { slug: "postgresql",          variant: "original" },
  "Redis":          { slug: "redis",               variant: "original" },
  "Elasticsearch":  { slug: "elasticsearch",       variant: "original" },
  "Prisma":         null,
  // DevOps
  "AWS":            { slug: "amazonwebservices",   variant: "original" },
  "Docker":         { slug: "docker",              variant: "original" },
  "Kubernetes":     { slug: "kubernetes",          variant: "plain" },
  "CI/CD":          null,
  "Vercel":         null,
  "Nginx":          { slug: "nginx",               variant: "original" },
};

// Accent colors per category
const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#00E5A8",
  Backend:  "#C86414",
  Database: "#7DF9FF",
  DevOps:   "#E8963C",
};

const CATEGORIES = ["All", ...Object.keys(TECH_STACK)];

// ── Letter Avatar (fallback) ──────────────────────────────────────────────────
function LetterAvatar({ name, color }: { name: string; color: string }) {
  const letters = name
    .split(/[\s.\/]+/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-[18px] font-bold text-white"
      style={{
        background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
        border: `1px solid ${color}30`,
      }}
    >
      {letters}
    </div>
  );
}

// ── Tech Card ─────────────────────────────────────────────────────────────────
function TechCard({
  tech,
  category,
  index,
}: {
  tech: string;
  category: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconInfo = DEVICON_MAP[tech];
  const accentColor = CATEGORY_COLORS[category] ?? "#00E5A8";
  const [imgError, setImgError] = useState(false);

  // Individual float animation
  useEffect(() => {
    if (!cardRef.current) return;
    const delay = (index % 7) * 0.4;
    const duration = 2.6 + (index % 5) * 0.35;
    const tween = gsap.to(cardRef.current, {
      y: index % 2 === 0 ? -6 : 6,
      duration,
      delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => { tween.kill(); };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="tech-card group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl p-4 transition-transform duration-300 hover:scale-110"
      style={{
        width: "118px",
        height: "118px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${accentColor}18 0%, transparent 70%)`,
          boxShadow: `0 0 0 1px ${accentColor}25`,
        }}
      />

      {/* Icon */}
      <div className="relative flex h-12 w-12 items-center justify-center">
        {iconInfo && !imgError ? (
          <img
            src={`${DEVICON_BASE}/${iconInfo.slug}/${iconInfo.slug}-${iconInfo.variant}.svg`}
            alt={tech}
            width={48}
            height={48}
            className="h-12 w-12 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_10px_var(--glow)]"
            style={{ "--glow": accentColor } as React.CSSProperties}
            onError={() => setImgError(true)}
          />
        ) : (
          <LetterAvatar name={tech} color={accentColor} />
        )}
      </div>

      {/* Name */}
      <div
        className="w-full text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] transition-colors duration-300 group-hover:text-white"
        style={{ color: "rgba(143,143,143,0.7)" }}
      >
        {tech}
      </div>

      {/* Category dot */}
      <div
        className="h-1 w-1 rounded-full"
        style={{ background: accentColor, opacity: 0.5 }}
      />
    </div>
  );
}

// ── Main TechStack panel ──────────────────────────────────────────────────────
export default function TechStack() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const techs =
    activeCategory === "All"
      ? Object.entries(TECH_STACK).flatMap(([cat, items]) =>
          items.map((tech) => ({ tech, category: cat }))
        )
      : (TECH_STACK[activeCategory as keyof typeof TECH_STACK] ?? []).map(
          (tech) => ({ tech, category: activeCategory })
        );

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-card", {
        scrollTrigger: {
          trigger: panelRef.current,
          scroller: document.body,
          horizontal: true,
          start: "left 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: { amount: 0.8, from: "center" },
        ease: "power3.out",
      });
    }, panelRef);
    return () => ctx.revert();
  }, []);

  // Re-animate on category change
  useEffect(() => {
    gsap.from(".tech-card", {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: { amount: 0.4, from: "center" },
      ease: "power2.out",
    });
  }, [activeCategory]);

  return (
    <div
      ref={panelRef}
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 25% 50%, rgba(200,100,20,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 80% 60%, rgba(0,229,168,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex-shrink-0 px-12 pt-20 pb-6 md:px-20 lg:px-28">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "#C86414" }}>
          My Arsenal
        </div>
        <h2 className="font-display text-[42px] font-bold uppercase leading-[0.9] tracking-tight text-white md:text-[60px]">
          Tech Stack
        </h2>

        {/* Category filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const catColor =
              cat === "All" ? "#ffffff" : CATEGORY_COLORS[cat] ?? "#00E5A8";
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-wider transition-all duration-300"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${catColor}25 0%, ${catColor}10 100%)`
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? `1px solid ${catColor}50`
                    : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? catColor : "rgba(143,143,143,0.7)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gradient line */}
        <div
          className="mt-5 h-px"
          style={{
            background:
              "linear-gradient(90deg, #C86414 0%, #00E5A8 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Tech grid */}
      <div className="relative z-10 flex-1 overflow-y-auto px-12 pb-8 md:px-20 lg:px-28" style={{ scrollbarWidth: "none" }}>
        <div className="flex flex-wrap gap-4 py-4">
          {techs.map(({ tech, category }, i) => (
            <TechCard
              key={`${activeCategory}-${tech}`}
              tech={tech}
              category={category}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
