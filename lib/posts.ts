import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  content: string;
};

export function getSortedPostsData(): Post[] {
  // Get file names under /content/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".mdx" or ".md" from file name to get slug
      const slug = fileName.replace(/\.mdx?$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        content: matterResult.content,
        ...(matterResult.data as Omit<Post, "slug" | "content">),
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getSortedPostsData();
  return posts.find((post) => post.slug === slug);
}

export const posts = getSortedPostsData();
export const categories = ["Tümü", ...new Set(posts.map((post) => post.category))];
