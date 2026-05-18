import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

const RESEARCH_QUERY = `*[_type == "featuredPublication" && published == true] | order(publishedDate desc){
  _id,
  title,
  excerpt,
  publicationType,
  coverImage { asset->{ url }, alt, caption },
  downloadUrl,
  publishedDate,
  tags
}`;

export default async function ResearchPage() {
  const publications = await client.fetch(RESEARCH_QUERY);

  // Group by type for better organization
  const grouped = {
    research: publications?.filter((p: any) => p.publicationType === 'research') || [],
    report: publications?.filter((p: any) => p.publicationType === 'report') || [],
    policy: publications?.filter((p: any) => p.publicationType === 'policy') || [],
    concept: publications?.filter((p: any) => p.publicationType === 'concept') || [],
  };

  const typeLabels = {
    research: 'Research Papers',
    report: 'Reports',
    policy: 'Policy Briefs',
    concept: 'Concept Notes',
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal">
        <div className="max-w-5xl">
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight mb-4">
            Research & <span className="text-lime">Publications</span>
          </h1>
          <div className="h-1 w-32 bg-orange mb-6"></div>
          <p className="font-sans text-lg text-charcoal/80 max-w-2xl">
            Academic papers, policy briefs, and research contributions on sign language, linguistic rights, CODA identity, and inclusive development in Africa.
          </p>
        </div>
      </header>

      {/* Content Sections by Type */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-16 space-y-20">
        {Object.entries(grouped).map(([type, papers]) => {
          if (!papers || papers.length === 0) return null;

          return (
            <div key={type}>
              <h2 className="font-serif text-3xl text-charcoal mb-8 pb-2 border-b-2 border-lime inline-block">
                {typeLabels[type as keyof typeof typeLabels]}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {papers.map((pub: any) => (
                  <article
                    key={pub._id}
                    className="group relative bg-cream border-2 border-charcoal hover:border-lime transition-colors flex flex-col h-full"
                  >
                    {/* Cover Image */}
                    {pub.coverImage?.asset?.url && (
                      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-charcoal">
                        <Image
                          src={pub.coverImage.asset.url}
                          alt={pub.coverImage.alt || pub.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      {/* Type Badge */}
                      <span className="inline-block self-start px-3 py-1 bg-orange text-cream text-[10px] uppercase tracking-widest mb-3">
                        {pub.publicationType}
                      </span>

                      {/* Title */}
                      <h3 className="font-serif text-xl text-charcoal leading-tight group-hover:text-lime transition-colors mb-2">
                        {pub.title}
                      </h3>

                      {/* Date */}
                      {pub.publishedDate && (
                        <p className="font-sans text-xs text-charcoal-muted mb-3">
                          Published {new Date(pub.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      )}

                      {/* Excerpt */}
                      {pub.excerpt && (
                        <p className="font-sans text-sm text-charcoal/70 leading-relaxed line-clamp-3 mb-4 flex-grow">
                          {pub.excerpt}
                        </p>
                      )}

                      {/* Tags */}
                      {pub.tags && pub.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pub.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider text-lime">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Download/View Link */}
                      {pub.downloadUrl ? (
                        <a
                          href={pub.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-orange text-cream text-xs uppercase tracking-widest hover:bg-charcoal transition-colors mt-auto"
                        >
                          View Publication
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <span className="inline-block px-4 py-2 border-2 border-charcoal/30 text-charcoal/50 text-xs uppercase tracking-widest mt-auto">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {publications.length === 0 && (
          <div className="text-center py-20 border-2 border-charcoal/10 bg-cream-dark">
            <p className="font-sans text-charcoal-muted mb-4">No publications yet.</p>
            <Link href="/resources" className="font-sans text-sm text-lime hover:text-orange transition-colors">
              Explore curated resources →
            </Link>
          </div>
        )}
      </section>

      {/* Bottom Theme Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-lime via-orange to-lime"></div>
    </main>
  );
}