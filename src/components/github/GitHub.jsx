"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GITHUB_STATS } from "@/lib/constants";
import SectionReveal from "@/components/ui/SectionReveal";
gsap.registerPlugin(ScrollTrigger);
export default function GitHub() {
    const sectionRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gh-stat", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });
            gsap.from(".lang-bar", {
                scrollTrigger: {
                    trigger: ".lang-bars",
                    start: "top 80%",
                },
                scaleX: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                transformOrigin: "left",
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    return (<section ref={sectionRef} className="section-padding relative bg-background-secondary py-32 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 md:mb-32">
          <SectionReveal as="h2" className="font-display text-[40px] font-bold uppercase leading-[0.95] tracking-tight text-primary md:text-[72px] lg:text-[96px]">
            GitHub
          </SectionReveal>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-24">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              {[
            {
                value: GITHUB_STATS.totalRepos,
                label: "Repositories",
            },
            {
                value: GITHUB_STATS.totalStars,
                label: "Stars Earned",
            },
            {
                value: GITHUB_STATS.totalCommits,
                label: "Commits",
            },
            {
                value: GITHUB_STATS.contributions,
                label: "Contributions",
            },
        ].map((stat) => (<div key={stat.label} className="gh-stat space-y-2">
                  <div className="font-display text-[40px] font-bold text-accent md:text-[48px]">
                    {stat.value}+
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </div>
                </div>))}
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-[14px] uppercase tracking-[0.3em] text-muted">
              Top Languages
            </h3>
            <div className="lang-bars space-y-6">
              {GITHUB_STATS.topLanguages.map((lang) => (<div key={lang.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium text-primary">
                      {lang.name}
                    </span>
                    <span className="text-[13px] text-muted">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="h-[4px] overflow-hidden rounded-full bg-border">
                    <div className="lang-bar h-full rounded-full" style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
            }}/>
                  </div>
                </div>))}
            </div>

            {/* Contribution graph mock */}
            <div className="mt-12 rounded-xl border border-border bg-card p-6">
              <div className="mb-4 text-[12px] uppercase tracking-[0.2em] text-muted">
                Contribution Activity
              </div>
              <div className="grid grid-cols-[repeat(52,1fr)] gap-[2px]">
                {Array.from({ length: 364 }).map((_, i) => {
            const intensity = Math.random();
            let bg = "bg-border/30";
            if (intensity > 0.7)
                bg = "bg-accent/80";
            else if (intensity > 0.4)
                bg = "bg-accent/40";
            else if (intensity > 0.2)
                bg = "bg-accent/20";
            return (<div key={i} className={`aspect-square rounded-[1px] ${bg}`}/>);
        })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
