"use client";
import { useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
export default function Contact() {
    const panelRef = useRef(null);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 3000);
    };
    const socials = [
        {
            label: "GitHub",
            href: SITE_CONFIG.github,
            path: "M12 0C5.37 0 0 5.37 0 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z",
        },
        {
            label: "LinkedIn",
            href: SITE_CONFIG.linkedin,
            path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
        },
        {
            label: "Twitter",
            href: SITE_CONFIG.twitter,
            path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
        },
    ];
    const inputClass = "w-full bg-transparent py-3 text-[15px] text-white outline-none transition-colors placeholder:text-[#8F8F8F]/40";
    return (<div ref={panelRef} className="relative flex h-full w-full items-center justify-center overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 60% 70% at 20% 60%, rgba(200,100,20,0.07) 0%, transparent 70%)",
        }}/>
      <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 50% 60% at 80% 40%, rgba(0,229,168,0.05) 0%, transparent 70%)",
        }}/>

      <div className="relative z-10 grid h-full w-full max-w-[1400px] grid-cols-1 gap-12 px-12 py-20 md:grid-cols-2 md:px-20 lg:px-32">
        {/* Left — Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "#C86414" }}>
              Get In Touch
            </div>
            <h2 className="font-display text-[42px] font-bold uppercase leading-[0.9] tracking-tight text-white md:text-[60px]">
              Let&apos;s Build Together
            </h2>
          </div>

          <p className="text-[18px] leading-relaxed" style={{ color: "#8F8F8F" }}>
            Have a project in mind or want to discuss opportunities?
            <br />
            Let&apos;s build something remarkable together.
          </p>

          <a href={`mailto:${SITE_CONFIG.email}`} className="font-display text-[22px] font-bold transition-colors hover:opacity-80 md:text-[28px]" style={{
            background: "linear-gradient(90deg, #C86414, #00E5A8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        }}>
            {SITE_CONFIG.email}
          </a>

          {/* Social icons */}
          <div className="flex gap-4">
            {socials.map((s) => (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300" style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
            }} aria-label={s.label}>
                <svg className="h-5 w-5 transition-colors duration-300 group-hover:text-white" style={{ color: "#8F8F8F" }} fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.path}/>
                </svg>
              </a>))}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full" style={{ background: "#00E5A8", boxShadow: "0 0 8px #00E5A8" }}/>
            <span className="text-[11px] uppercase tracking-[0.15em]" style={{ color: "#8F8F8F" }}>
              Available for Freelance &amp; Full-Time
            </span>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl p-8" style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
        }}>
            {/* Name */}
            <div>
              <label htmlFor="c-name" className="mb-2 block text-[10px] uppercase tracking-[0.3em]" style={{ color: "#8F8F8F" }}>
                Name
              </label>
              <div className="border-b transition-colors focus-within:border-[#C86414]" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <input id="c-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name"/>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="c-email" className="mb-2 block text-[10px] uppercase tracking-[0.3em]" style={{ color: "#8F8F8F" }}>
                Email
              </label>
              <div className="border-b transition-colors focus-within:border-[#00E5A8]" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <input id="c-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="your@email.com"/>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="c-message" className="mb-2 block text-[10px] uppercase tracking-[0.3em]" style={{ color: "#8F8F8F" }}>
                Message
              </label>
              <div className="border-b transition-colors focus-within:border-[#C86414]" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <textarea id="c-message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} placeholder="Tell me about your project..."/>
              </div>
            </div>

            <button type="submit" className="w-full rounded-full py-3.5 text-[13px] font-semibold uppercase tracking-widest text-[#050505] transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_30px_rgba(200,100,20,0.4)]" style={{
            background: "linear-gradient(135deg, #C86414 0%, #E8963C 50%, #00E5A8 100%)",
        }}>
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>);
}
