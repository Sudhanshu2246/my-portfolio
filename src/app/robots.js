export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/admin/"],
            },
        ],
        sitemap: "https://sudhanshu.dev/sitemap.xml",
    };
}
