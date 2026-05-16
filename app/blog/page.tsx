import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

const BLOG_QUERY = `*[_type == "blogPost" && published == true] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  featuredImage { asset->{ url }, alt }
}`;

export default async function BlogPage() {
  const posts = await client.fetch(BLOG_QUERY);

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal">
        <div className="max-w-5xl">
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight mb-4">
            Reflections & <span className="text-lime">Writing</span>
          </h1>
          <div className="h-1 w-32 bg-orange mb-6"></div>
          <p className="font-sans text-lg text-charcoal/80 max-w-2xl">
            Thoughts on language, identity, advocacy, and the lived experience of navigating between worlds.
          </p>
        </div>
      </header>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20 border-2 border-charcoal/10 bg-cream-dark">
            <p className="font-sans text-charcoal-muted">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="group relative bg-cream border-2 border-charcoal hover:border-lime transition-colors flex flex-col h-full"
              >
                {post.featuredImage?.asset?.url && (
                  <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-charcoal">
                    <Image
                      src={post.featuredImage.asset.url}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  {post.category && (
                    <span className="inline-block self-start px-3 py-1 bg-orange text-cream text-[10px] uppercase tracking-widest mb-3">
                      {post.category}
                    </span>
                  )}
                  <h3 className="font-serif text-xl text-charcoal leading-tight group-hover:text-lime transition-colors mb-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {post.excerpt && (
                    <p className="font-sans text-sm text-charcoal/70 leading-relaxed line-clamp-3 mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/10">
                    <span className="font-sans text-xs text-charcoal-muted">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <Link href={`/blog/${post.slug}`} className="font-sans text-xs uppercase tracking-widest text-lime hover:text-orange transition-colors">
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Theme Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-lime via-orange to-lime"></div>
    </main>
  );
}