import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="section-padding relative border-t border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16">
          <h2 className="font-display text-[32px] font-bold uppercase leading-tight tracking-tight text-primary md:text-[48px] lg:text-[64px]">
            Let&apos;s Build
            <br />
            <span className="text-accent">Something Great.</span>
          </h2>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 border-t border-border pt-8 md:flex-row md:items-center">
          <div className="text-[13px] text-muted">
            &copy; {new Date().getFullYear()} Sudhanshu. All rights reserved.
          </div>

          <div className="flex gap-6">
            {[
              { label: "GitHub", href: SITE_CONFIG.github },
              { label: "LinkedIn", href: SITE_CONFIG.linkedin },
              { label: "Twitter", href: SITE_CONFIG.twitter },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="animated-underline text-[13px] text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
