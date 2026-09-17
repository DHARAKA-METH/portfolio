import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projectSection`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/Blogs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
