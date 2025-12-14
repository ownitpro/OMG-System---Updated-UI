import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "../posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  return {
    metadataBase: new URL("https://www.omgsystems.com"),
    title: post.title + " | OMGsystems",
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.omgsystems.com/blog/${post.slug}`,
      images: post.heroImage
        ? [
            {
              url: post.heroImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [post.heroImage] : [],
    },
  };
}
