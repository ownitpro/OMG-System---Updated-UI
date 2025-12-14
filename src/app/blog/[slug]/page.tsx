import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { posts, type PostData } from "../posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      metadataBase: new URL("https://www.omgsystems.com"),
      title: "Not Found | OMGsystems",
      description: "Post not found",
    };
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      {/* Back to Blog Link */}
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      {post.heroImage && (
        <div className="mb-8">
          <Image
            src={post.heroImage}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            priority
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
          {post.title}
        </h1>
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>By {post.authors.join(", ")}</span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.map((category) => (
            <span
              key={category}
              className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </header>

      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="inline-block px-3 py-1 text-sm text-slate-600 bg-slate-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Related Articles CTA */}
      <div className="mt-12 p-6 bg-slate-50 rounded-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Want to read more?
        </h3>
        <p className="text-slate-600 mb-4">
          Discover more automation insights and case studies from Ontario businesses.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Articles
        </Link>
      </div>
    </article>
  );
}