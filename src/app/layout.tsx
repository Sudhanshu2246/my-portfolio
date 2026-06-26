import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { getMetadata } from "@/lib/metadata";
import CustomCursor from "@/components/ui/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geist.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Sudhanshu",
                url: "https://sudhanshu.dev",
                jobTitle: "Senior Full Stack Engineer",
                knowsAbout: [
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "MongoDB",
                  "PostgreSQL",
                  "AWS",
                  "Docker",
                  "Kubernetes",
                ],
                sameAs: [
                  "https://github.com/sudhanshu",
                  "https://linkedin.com/in/sudhanshu",
                  "https://twitter.com/sudhanshu",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Sudhanshu — Full Stack Engineer",
                url: "https://sudhanshu.dev",
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-primary antialiased" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
