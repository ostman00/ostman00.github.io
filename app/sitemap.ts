import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ostman00.github.io";
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/hakkimda`, lastModified: new Date() },
    { url: `${baseUrl}/iletisim`, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
    })),
  ];
}
