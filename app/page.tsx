import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const CONTACT_QUERY = `*[_type == "contactSection" && published == true][0]{
  heading,
  subheading,
  body,
  contactDetails { email, phone, location },
  socialLinks[]{ platform, url, icon },
  ctaButton { label, url }
}`;

const RESEARCH_THEMES_QUERY = `*[_type == "researchFocus" && published == true][0]{
  heading,
  introText,
  topicGrid[]{ topic, description }
}`;

const BLOG_QUERY = `*[_type == "blogPost" && published == true] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  featuredImage {
    asset->{ url },
    alt
  }
}`;

const PUBLICATIONS_QUERY = `*[_type == "featuredPublication" && published == true && featured == true]{
id,  
title,
  excerpt,
  publicationType,
  coverImage {
    asset->{ url },
    alt,
    caption
  },
  downloadUrl,
  publishedDate,
  tags,
  _createdAt
}|order(publishedDate desc)[0..2]`;

const HERO_QUERY = `*[_type == "heroSection" && published == true][0]{
  title,
  subtitle,
  body,
  "links": referenceLinks[]{label, url}
}`;

const PERSONAL_QUERY = `*[_type == "personalIntro" && published == true][0]{
  heading,
  subheading,
  body,
  portraitImage {
    asset->{ url, metadata { dimensions { width, height } } },
    alt,
    caption
  },
  researchLink { label, url }
}`;

// Cloudinary placeholders for collage
const PHOTO_1 = "https://res.cloudinary.com/dzyxm0rhg/image/upload/v1778781547/Image_May_10_2026_04_38_27_PM_rp1kzz.png";
const PHOTO_2 = "https://res.cloudinary.com/dzyxm0rhg/image/upload/v1778781547/Image_May_10_2026_04_38_27_PM_rp1kzz.png";
const PHOTO_3 = "https://res.cloudinary.com/dzyxm0rhg/image/upload/v1778781547/Image_May_10_2026_04_38_27_PM_rp1kzz.png";

export default async function Home() {
  const [hero, personal, publications, blogs, themes, contact] = await Promise.all([
    client.fetch(HERO_QUERY),
    client.fetch(PERSONAL_QUERY),
    client.fetch(PUBLICATIONS_QUERY),
    client.fetch(BLOG_QUERY),
    client.fetch(RESEARCH_THEMES_QUERY),
    client.fetch(CONTACT_QUERY),
  ]);

  return (
    <main className="relative min-h-screen bg-cream overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Editorial Text with THEME COLORS */}
          <div className="lg:col-span-7 space-y-8">
            {hero && (
              <>
                {/* HEADLINE: Charcoal base, LIME accent span */}
                <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-charcoal">
                  {hero.title.split("Between Two Worlds")[0]}
                  <span className="text-lime">Between Two Worlds</span>
                </h1>
                
                {/* BODY: Charcoal text, lime left border */}
                <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed border-l-2 border-lime pl-6">
                  <PortableText value={hero.body} />
                </div>
              </>
            )}

            {/* ACTION LINKS: ORANGE primary, charcoal secondary */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/about" className="group px-6 py-3 bg-orange text-cream font-sans text-xs uppercase tracking-widest hover:bg-charcoal transition-colors">
                Read the Story
              </a>
              <a href="/research" className="group px-6 py-3 border border-charcoal text-charcoal font-sans text-xs uppercase tracking-widest hover:border-lime hover:text-lime transition-colors">
                Research & Advocacy
              </a>
            </div>
          </div>

          {/* RIGHT: Photo Strip Collage */}
          <div className="lg:col-span-5 relative flex justify-center items-center min-h-[500px]">
            <div className="relative flex flex-col gap-4 w-64 md:w-72 transform rotate-2 transition-transform duration-700 hover:rotate-0">
              
              {/* Photo 1 */}
              <div className="relative bg-cream p-3 pb-12 shadow-xl border-2 border-charcoal transform -rotate-1 hover:rotate-0 transition-transform duration-500 z-20">
                <div className="relative aspect-[4/5] bg-charcoal/10 overflow-hidden">
                  <Image src={PHOTO_1} alt="Visual Texture" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <span className="absolute bottom-2 left-3 font-serif text-xs italic text-lime">Fig 1. Identity</span>
              </div>

              {/* Photo 2 */}
              <div className="relative bg-cream p-3 pb-12 shadow-xl border-2 border-charcoal transform rotate-2 hover:rotate-0 transition-transform duration-500 z-10 mt-[-4rem] ml-4">
                <div className="relative aspect-[4/5] bg-charcoal/10 overflow-hidden">
                  <Image src={PHOTO_2} alt="Sign Language Detail" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <span className="absolute bottom-2 left-3 font-serif text-xs italic text-lime">Fig 2. Language</span>
              </div>

              {/* Photo 3 */}
              <div className="relative bg-cream p-3 pb-12 shadow-xl border-2 border-charcoal transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-30 mt-[-4rem] -ml-2">
                <div className="relative aspect-[4/5] bg-charcoal/10 overflow-hidden">
                  <Image src={PHOTO_3} alt="CODA Portrait" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <span className="absolute bottom-2 left-3 font-serif text-xs italic text-lime">Fig 3. Voice</span>
              </div>

            </div>
          </div>
        </div>

        {/* THEME STRIP: Lime/Orange accent bar */}
        <div className="mt-16 h-1 w-full bg-gradient-to-r from-lime via-orange to-lime opacity-80"></div>
      </section>

      {/* PERSONAL INTRODUCTION SECTION */}
      {personal && (
        <section className="py-20 border-t-2 border-charcoal bg-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left: Portrait Panel */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative bg-cream p-4 border-2 border-charcoal shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  {personal.portraitImage?.asset?.url ? (
                    <div className="relative aspect-[3/4] w-64 overflow-hidden bg-charcoal/10">
                      <Image
                        src={personal.portraitImage.asset.url}
                        alt={personal.portraitImage.alt || "Dziri portrait"}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] w-64 bg-charcoal/10 flex items-center justify-center">
                      <span className="font-sans text-xs text-charcoal">Portrait pending</span>
                    </div>
                  )}
                  {personal.portraitImage?.caption && (
                    <p className="mt-3 font-serif text-xs italic text-lime text-center">
                      {personal.portraitImage.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Biography with THEME COLORS */}
              <div className="lg:col-span-8 space-y-6">
                {/* HEADING: Charcoal + LIME accent */}
                <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
                  {personal.heading.split("Purpose")[0]}
                  <span className="text-lime">Purpose</span>
                </h2>
                
                {personal.subheading && (
                  <p className="font-sans text-lg text-orange italic">
                    {personal.subheading}
                  </p>
                )}
                
                {/* BODY: Charcoal text, lime left border */}
                <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed border-l-2 border-lime pl-6">
                  <PortableText value={personal.body} />
                </div>

                {/* RESEARCH LINK: ORANGE button */}
                {personal.researchLink?.url && (
                  <div className="pt-4">
                    <a
                      href={personal.researchLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 bg-orange text-cream text-sm font-sans uppercase tracking-widest hover:bg-charcoal transition-colors"
                    >
                      {personal.researchLink.label || "View Research"}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Publications Section */}
{publications && publications.length > 0 && (
  <section className="py-20 border-t-2 border-charcoal bg-cream">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      
      {/* Section Header with THEME COLORS */}
      <div className="mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
          Featured <span className="text-lime">Research</span>
        </h2>
        <div className="mt-4 h-1 w-24 bg-orange"></div>
      </div>

      {/* Publications Grid: Manga Panel Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((pub: any, index: number) => (
          <article 
            key={pub.id} 
            className={`group relative bg-cream border-2 border-charcoal p-6 hover:border-lime transition-colors ${
              index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            }`}
          >
            {/* Cover Image Panel */}
            {pub.coverImage?.asset?.url && (
              <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-charcoal/10 border border-charcoal/20">
                <Image
                  src={pub.coverImage.asset.url}
                  alt={pub.coverImage.alt || pub.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            )}
            
            {/* Type Badge: ORANGE */}
            <span className="inline-block px-3 py-1 bg-orange text-cream text-[10px] uppercase tracking-widest mb-3">
              {pub.publicationType}
            </span>
            
            {/* Title: Charcoal + LIME hover */}
            <h3 className="font-serif text-xl md:text-2xl text-charcoal leading-tight group-hover:text-lime transition-colors">
              {pub.title}
            </h3>
            
            {/* Excerpt: Charcoal text */}
            <p className="mt-3 font-sans text-sm text-charcoal-soft leading-relaxed line-clamp-3">
              {pub.excerpt}
            </p>
            
            {/* Tags: Lime text */}
            {pub.tags && pub.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {pub.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider text-lime">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Action: ORANGE button */}
            {pub.downloadUrl && (
              <div className="mt-6">
                <a
                  href={pub.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange text-cream text-xs uppercase tracking-widest hover:bg-charcoal transition-colors"
                >
                  View Publication
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-12 text-center">
        <a 
          href="/research" 
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-charcoal text-charcoal font-sans text-xs uppercase tracking-widest hover:border-lime hover:text-lime transition-colors"
        >
          Explore Full Archive
          <span className="text-lime">→</span>
        </a>
      </div>
    </div>
  </section>
)}
{/* Latest Blog Posts Section (Snippets Only) */}
{blogs && blogs.length > 0 && (
  <section className="py-20 border-t-2 border-charcoal bg-cream">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
            Latest <span className="text-lime">Reflections</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-orange"></div>
        </div>
        <a href="/blog" className="font-sans text-sm text-charcoal border-b border-lime hover:text-lime transition-colors pb-1">
          View all posts →
        </a>
      </div>

      {/* Snippet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post: any) => (
          <article key={post._id} className="group bg-cream border-2 border-charcoal hover:border-lime transition-colors flex flex-col h-full">
            {/* Image Panel */}
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
              {/* Category Badge: Orange accent */}
              {post.category && (
                <span className="inline-block self-start px-3 py-1 bg-orange text-cream text-[10px] uppercase tracking-widest mb-3">
                  {post.category}
                </span>
              )}

              {/* Title: Charcoal → Lime hover */}
              <h3 className="font-serif text-xl text-charcoal leading-tight group-hover:text-lime transition-colors mb-3">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h3>

              {/* Excerpt: Charcoal text, max 3 lines */}
              <p className="font-sans text-sm text-charcoal-soft leading-relaxed line-clamp-3 mb-4 flex-grow">
                {post.excerpt}
              </p>

              {/* Footer: Date + Read More */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/10">
                <span className="font-sans text-xs text-charcoal-muted">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <a href={`/blog/${post.slug}`} className="font-sans text-xs uppercase tracking-widest text-lime hover:text-orange transition-colors">
                  Read more →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)}
{/* Research Themes Section */}
{themes && (
  <section className="py-20 bg-charcoal text-cream">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      
      {/* Header */}
      <div className="mb-12 border-l-2 border-lime pl-6">
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
          {themes.heading}
        </h2>
      </div>

      {/* Intro Text: Cream text on Charcoal bg */}
      <div className="mb-16 max-w-3xl">
        <div className="prose prose-lg prose-invert max-w-none font-sans text-cream/80 leading-relaxed">
          <PortableText value={themes.introText} />
        </div>
      </div>

      {/* Topics Grid: Manga Panel Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/20 border-2 border-cream/20">
        {themes.topicGrid?.map((item: any, i: number) => (
          <div 
            key={i} 
            className="group bg-charcoal p-8 hover:bg-cream hover:text-charcoal transition-colors duration-300"
          >
            <div className="h-px w-8 bg-lime mb-4 group-hover:bg-orange"></div>
            <h3 className="font-serif text-xl leading-tight mb-2 group-hover:text-lime transition-colors">
              {item.topic}
            </h3>
            <p className="font-sans text-sm text-cream/60 group-hover:text-charcoal-soft leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      
    </div>
  </section>
)}

{/* Contact Section */}
{contact && (
  <section className="py-20 bg-cream border-t-2 border-charcoal">
    <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
      
      {/* Header */}
      <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-4">
        {contact.heading}
      </h2>
      
      {contact.subheading && (
        <p className="font-sans text-lg text-orange italic mb-8">
          {contact.subheading}
        </p>
      )}
      
      {/* Invitation Text */}
      <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed mx-auto mb-12">
        <PortableText value={contact.body} />
      </div>

      {/* Contact Details Grid */}
    

      {/* Social Links */}
      {contact.socialLinks && contact.socialLinks.length > 0 && (
        <div className="flex justify-center gap-6 mb-12">
          {contact.socialLinks.map((social: any) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-charcoal border-b-2 border-transparent hover:border-lime transition-colors"
            >
              {social.platform}
            </a>
          ))}
        </div>
      )}

      {/* Primary CTA Button: ORANGE */}
      {contact.ctaButton?.url && (
        <a
          href={contact.ctaButton.url}
          className="inline-block px-8 py-4 bg-orange text-cream font-sans text-sm uppercase tracking-widest hover:bg-charcoal transition-colors"
        >
          {contact.ctaButton.label || 'Get in Touch'}
        </a>
      )}
    </div>
  </section>
)}

      {/* FOOTER THEME STRIP */}
      <div className="h-2 w-full bg-charcoal"></div>
    </main>
  );
}