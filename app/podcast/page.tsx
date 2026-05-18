import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

const PODCAST_QUERY = `*[_type == "podcastMedia" && published == true] | order(publishedDate desc){
  _id,
  title,
  mediaType,
  platform,
  externalUrl,
  description,
  thumbnail { asset->{ url }, alt },
  publishedDate,
  tags
}`;

// Helper to get platform icon/color
const getPlatformStyle = (platform: string) => {
  const styles: Record<string, string> = {
    YouTube: 'bg-red-600',
    Spotify: 'bg-green-600',
    SoundCloud: 'bg-orange-500',
    'Apple Podcasts': 'bg-purple-600',
    Vimeo: 'bg-blue-500',
  };
  return styles[platform] || 'bg-charcoal';
};

export default async function PodcastPage() {
  const media = await client.fetch(PODCAST_QUERY);

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal">
        <div className="max-w-5xl">
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight mb-4">
            Podcast & <span className="text-lime">Media</span>
          </h1>
          <div className="h-1 w-32 bg-orange mb-6"></div>
          <p className="font-sans text-lg text-charcoal/80 max-w-2xl">
            Conversations, interviews, and multimedia stories exploring sign language, CODA identity, and linguistic human rights.
          </p>
        </div>
      </header>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {media.length === 0 ? (
          <div className="text-center py-20 border-2 border-charcoal/10 bg-cream-dark">
            <p className="font-sans text-charcoal-muted mb-4">No media published yet.</p>
            <p className="font-sans text-sm text-charcoal/60">Check back soon for podcasts, interviews, and videos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {media.map((item: any) => (
              <article
                key={item._id}
                className="group relative bg-cream border-2 border-charcoal hover:border-lime transition-colors flex flex-col h-full"
              >
                {/* Thumbnail or Placeholder */}
                {item.thumbnail?.asset?.url ? (
                  <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-charcoal">
                    <Image
                      src={item.thumbnail.asset.url}
                      alt={item.thumbnail.alt || item.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Platform Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 text-[10px] uppercase tracking-widest text-cream ${getPlatformStyle(item.platform)}`}>
                      {item.platform}
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] bg-charcoal/10 border-b-2 border-charcoal flex items-center justify-center">
                    <div className={`px-4 py-2 text-xs uppercase tracking-widest text-cream ${getPlatformStyle(item.platform)}`}>
                      {item.platform || 'Media'}
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Type Badge */}
                  <span className="inline-block self-start px-3 py-1 bg-orange text-cream text-[10px] uppercase tracking-widest mb-3">
                    {item.mediaType}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-charcoal leading-tight group-hover:text-lime transition-colors mb-2">
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {item.title}
                      <span className="text-xs text-charcoal/50 group-hover:text-lime">↗</span>
                    </a>
                  </h3>

                  {/* Date */}
                  {item.publishedDate && (
                    <p className="font-sans text-xs text-charcoal-muted mb-3">
                      {new Date(item.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="font-sans text-sm text-charcoal/70 leading-relaxed line-clamp-3 mb-4 flex-grow">
                      {item.description}
                    </p>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-charcoal/10">
                      {item.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider text-lime">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Watch/Listen Button */}
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-charcoal text-cream text-xs uppercase tracking-widest hover:bg-lime hover:text-charcoal transition-colors"
                  >
                    {item.platform === 'YouTube' || item.platform === 'Vimeo' ? 'Watch' : 'Listen'} Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
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