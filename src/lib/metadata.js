import { SITE_CONFIG } from "./constants";
export function getMetadata() {
    return {
        metadataBase: new URL(SITE_CONFIG.url),
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        keywords: [
            "full stack developer",
            "MERN stack",
            "software engineer",
            "scalable web applications",
            "Next.js developer",
            "React developer",
            "Node.js developer",
            "microservices",
            "cloud architecture",
        ],
        authors: [{ name: "Sudhanshu" }],
        creator: "Sudhanshu",
        openGraph: {
            type: "website",
            locale: "en_US",
            url: SITE_CONFIG.url,
            title: SITE_CONFIG.title,
            description: SITE_CONFIG.description,
            siteName: SITE_CONFIG.name,
            images: [
                {
                    url: SITE_CONFIG.ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Sudhanshu — Full Stack Engineer",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: SITE_CONFIG.title,
            description: SITE_CONFIG.description,
            images: [SITE_CONFIG.ogImage],
            creator: "@sudhanshu",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        alternates: {
            canonical: SITE_CONFIG.url,
        },
        manifest: "/manifest.json",
    };
}
export function getPersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Sudhanshu",
        url: SITE_CONFIG.url,
        jobTitle: "Full Stack Engineer",
        knowsAbout: [
            "JavaScript",
            "React",
            "Next.js",
            "Node.js",
            "MongoDB",
            "PostgreSQL",
            "AWS",
            "Docker",
            "Microservices",
        ],
        sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin, SITE_CONFIG.twitter],
    };
}
export function getWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        description: SITE_CONFIG.description,
        author: {
            "@type": "Person",
            name: "Sudhanshu",
        },
    };
}
export function getCreativeWorkSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Sudhanshu — Portfolio",
        description: SITE_CONFIG.description,
        author: {
            "@type": "Person",
            name: "Sudhanshu",
        },
        url: SITE_CONFIG.url,
    };
}
