"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CERTIFICATES } from "@/lib/constants";
import SectionReveal from "@/components/ui/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative bg-background-secondary py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 md:mb-32">
          <SectionReveal
            as="h2"
            className="font-display text-[40px] font-bold uppercase leading-[0.95] tracking-tight text-primary md:text-[72px] lg:text-[96px]"
          >
            Certificates
          </SectionReveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.name}
              className="cert-card group rounded-xl border border-border bg-card p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_var(--color-glow)]"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
                    {cert.year}
                  </div>
                  <h3 className="font-display text-[20px] font-bold text-primary md:text-[22px]">
                    {cert.name}
                  </h3>
                  <p className="text-[14px] text-muted">{cert.issuer}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-accent/50">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
