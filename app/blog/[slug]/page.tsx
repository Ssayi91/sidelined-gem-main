import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  featuredImage { asset->{ url }, alt },
  body
}`;

const RELATED_QUERY = `*[_type == "blogPost" && slug.current != $slug && published == true] | order(publishedAt desc)[0...2]{
  _id,
  title,
  "slug": slug.current,
  category,
  featuredImage { asset->{ url } }
}`;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(POST_QUERY, { slug: params.slug });
  const related = await client.fetch(RELATED_QUERY, { slug: params.slug });

  if (!post) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-sans text-charcoal-muted">Post not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Post Header */}
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          {post.category && (
            <span className="inline-block px-3 py-1 bg-orange text-cream text-[10px] uppercase tracking-widest mb-4">
              {post.category}
            </span>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
            {post.title}
          </h1>
          <p className="font-sans text-sm text-charcoal-muted mb-4">
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage?.asset?.url && (
        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] my-8 border-2 border-charcoal">
          <Image
            src={post.featuredImage.asset.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover grayscale"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed prose-headings:font-serif prose-a:text-lime prose-a:border-b prose-a:border-lime hover:prose-a:border-orange">
          <PortableText value={post.body} />
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t-2 border-charcoal bg-cream py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-charcoal mb-8">
              More <span className="text-lime">Reflections</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r: any) => (
                <Link href={`/blog/${r.slug}`} key={r._id} className="group bg-cream border-2 border-charcoal hover:border-lime transition-colors">
                  {r.featuredImage?.asset?.url && (
                    <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-charcoal">
                      <Image
                        src={r.featuredImage.asset.url}
                        alt={r.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-[10px] uppercase tracking-widest text-charcoal-muted">{r.category}</span>
                    <h3 className="font-serif text-lg text-charcoal leading-tight group-hover:text-lime transition-colors mt-2">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back Link */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/blog" className="font-sans text-sm text-charcoal hover:text-lime transition-colors inline-flex items-center gap-2">
          ← Back to all posts
        </Link>
      </div>

      {/* Bottom Theme Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-lime via-orange to-lime"></div>
    </main>
  );
}