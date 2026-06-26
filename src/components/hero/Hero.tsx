"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Background image fade in
      if (imageRef.current) {
        tl.from(
          imageRef.current,
          { opacity: 0, scale: 1.06, duration: 1.8, ease: "power2.out" },
          0
        );
      }

      // "HI, I AM" line
      if (line1Ref.current) {
        const split1 = new SplitType(line1Ref.current, { types: ["chars"] });
        tl.from(
          split1.chars,
          {
            y: 30,
            opacity: 0,
            rotateX: 35,
            duration: 0.65,
            ease: "power4.out",
            stagger: 0.03,
          },
          0.4
        );
      }

      // Name
      if (nameRef.current) {
        const splitName = new SplitType(nameRef.current, { types: ["chars"] });
        tl.from(
          splitName.chars,
          {
            y: 80,
            opacity: 0,
            rotateX: 55,
            scale: 0.8,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.04,
          },
          0.55
        );
      }

      // Role line
      if (line2Ref.current) {
        const split2 = new SplitType(line2Ref.current, { types: ["chars"] });
        tl.from(
          split2.chars,
          {
            y: 40,
            opacity: 0,
            rotateX: 40,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.025,
          },
          0.75
        );
      }

      // Tagline
      if (taglineRef.current) {
        tl.from(
          taglineRef.current,
          { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" },
          0.95
        );
      }

      // CTA
      if (ctaRef.current) {
        tl.from(
          ctaRef.current.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          },
          1.1
        );
      }

      // Parallax: image scrolls slower than text (depth effect)
      if (imageRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          animation: gsap.to(imageRef.current, {
            y: 80,
            scale: 1.05,
            ease: "none",
          }),
        });
      }

      // Text drifts up on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(contentRef.current, {
          y: -70,
          opacity: 0,
          ease: "none",
        }),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-section relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* ── Full-screen background image ── */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src="/heroSectionImg/heroIMG.png"
          alt="Cosmic portal background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay stack for text readability */}
        {/* 1. Overall dark tint */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(5, 5, 5, 0.52)" }}
        />

        {/* 2. Heavy vignette — darkens all four edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, rgba(5,5,5,0.55) 60%, rgba(5,5,5,0.90) 100%)",
          }}
        />

        {/* 3. Bottom fade — keeps footer area clean */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[30%]"
          style={{
            background:
              "linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 100%)",
          }}
        />

        {/* 4. Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-[20%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Text content — centred over the image ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ maxWidth: "860px", width: "100%" }}
      >
        {/* "HI, I AM" */}
        <div
          ref={line1Ref}
          className="mb-3 font-display font-semibold uppercase tracking-[0.3em] text-[#C8C8C8]/80"
          style={{ perspective: "600px", fontSize: "clamp(11px, 1.2vw, 17px)" }}
        >
          HI, I AM
        </div>

        {/* NAME */}
        <h1
          ref={nameRef}
          className="hero-name font-display font-bold uppercase leading-[0.9] tracking-tight text-white"
          style={{
            fontSize: "clamp(56px, 10vw, 130px)",
            perspective: "800px",
          }}
        >
          SUDHANSHU
        </h1>

        {/* Role */}
        <div
          ref={line2Ref}
          className="mt-4 font-display font-bold uppercase leading-tight tracking-wide"
          style={{
            fontSize: "clamp(18px, 2.8vw, 42px)",
            perspective: "600px",
            background:
              "linear-gradient(120deg, #C86414 0%, #E8963C 30%, #00E5A8 70%, #64FFDA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          MERN STACK DEVELOPER
        </div>

        {/* Divider */}
        <div
          className="mx-auto my-7 h-px"
          style={{
            width: "clamp(50px, 8vw, 110px)",
            background:
              "linear-gradient(90deg, transparent, #C86414 30%, #00E5A8 70%, transparent)",
          }}
        />

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-body leading-relaxed text-[#B0B0B0]"
          style={{
            fontSize: "clamp(13px, 1.1vw, 16px)",
            maxWidth: "480px",
          }}
        >
          Crafting full-stack digital experiences with React, Node.js &amp;
          MongoDB — turning complex ideas into seamless, scalable products.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="hero-cta-primary group relative overflow-hidden rounded-full px-8 py-3.5 font-display font-semibold uppercase tracking-widest text-[#050505] transition-all duration-300"
            style={{
              fontSize: "11px",
              background:
                "linear-gradient(135deg, #C86414 0%, #E8963C 50%, #00E5A8 100%)",
              boxShadow:
                "0 0 30px rgba(200,100,20,0.45), 0 0 70px rgba(0,229,168,0.18)",
            }}
          >
            <span className="relative z-10">View My Work</span>
            <span
              className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0"
              aria-hidden="true"
            />
          </a>

          <a
            href="#contact"
            className="hero-cta-secondary rounded-full border px-8 py-3.5 font-display font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-[#C86414] hover:text-[#E8963C]"
            style={{
              fontSize: "11px",
              borderColor: "rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
            }}
          >
            Get In Touch
          </a>
        </div>

        {/* Availability badge */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="hero-availability-dot inline-block h-2 w-2 rounded-full bg-[#00E5A8]" />
          <span
            className="font-body text-[#8F8F8F]"
            style={{ fontSize: "10px", letterSpacing: "0.15em" }}
          >
            AVAILABLE FOR FREELANCE &amp; FULL-TIME
          </span>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span
            className="font-body font-medium uppercase text-[#8F8F8F]/60"
            style={{ fontSize: "9px", letterSpacing: "0.4em" }}
          >
            Scroll
          </span>
          <div className="relative h-[44px] w-[1px] overflow-hidden">
            <div
              className="hero-scroll-line absolute inset-0 origin-top"
              style={{
                background:
                  "linear-gradient(to bottom, #C86414, #00E5A8, transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
