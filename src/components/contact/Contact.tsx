"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/lib/constants";
import SectionReveal from "@/components/ui/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-el", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ name: "", email: "", message: "" });
  };

  const socials = [
    { label: "GitHub", href: SITE_CONFIG.github, icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" },
    { label: "LinkedIn", href: SITE_CONFIG.linkedin, icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { label: "Twitter", href: SITE_CONFIG.twitter, icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative bg-background py-32 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 md:mb-24">
          <SectionReveal as="h2" className="font-display text-[40px] font-bold uppercase leading-[0.95] tracking-tight text-primary md:text-[72px] lg:text-[96px]">
            Contact
          </SectionReveal>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div className="space-y-12">
            <p className="contact-el text-[20px] leading-relaxed text-muted md:text-[24px]">
              Have a project in mind or want to discuss opportunities?
              <br />Let&apos;s build something remarkable together.
            </p>
            <div className="contact-el">
              <a href={`mailto:${SITE_CONFIG.email}`} className="block font-display text-[28px] font-bold text-accent transition-colors hover:text-accent-secondary md:text-[36px]">
                {SITE_CONFIG.email}
              </a>
            </div>
            <div className="contact-el flex gap-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_var(--color-glow)]" aria-label={s.label}>
                  <svg className="h-5 w-5 text-muted transition-colors group-hover:text-accent" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="contact-el">
              <label htmlFor="name" className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-muted">Name</label>
              <input id="name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full border-b border-border bg-transparent py-3 text-[16px] text-primary outline-none transition-colors focus:border-accent" placeholder="Your name" />
            </div>
            <div className="contact-el">
              <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-muted">Email</label>
              <input id="email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full border-b border-border bg-transparent py-3 text-[16px] text-primary outline-none transition-colors focus:border-accent" placeholder="your@email.com" />
            </div>
            <div className="contact-el">
              <label htmlFor="message" className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-muted">Message</label>
              <textarea id="message" required rows={4} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full resize-none border-b border-border bg-transparent py-3 text-[16px] text-primary outline-none transition-colors focus:border-accent" placeholder="Tell me about your project..." />
            </div>
            <button type="submit" className="contact-el mt-4 rounded-full bg-accent px-8 py-3 text-[14px] font-medium text-background transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_var(--color-glow)]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
