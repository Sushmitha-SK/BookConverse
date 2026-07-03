import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://bookconverse.com/sitemap.xml",
        host: "https://bookconverse.com",
    };
}