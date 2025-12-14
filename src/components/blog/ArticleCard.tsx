import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  authors: string[];
  categories: string[];
  tags: string[];
  heroImage?: string;
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  date,
  readTime,
  authors,
  categories,
  tags,
  heroImage,
}: ArticleCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Hero Image */}
      {heroImage && (
        <div className="relative w-full aspect-[16/9] bg-slate-50">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category) => (
            <span
              key={category}
              className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center space-x-4">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
          <div className="text-slate-400">
            {authors.join(", ")}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 text-xs text-slate-500 bg-slate-100 rounded"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs text-slate-400">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
