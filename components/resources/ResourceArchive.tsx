"use client";

import { useState } from "react";
import Link from "next/link";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Research", value: "research" },
  { label: "Reports", value: "report" },
  { label: "Articles", value: "article" },
  { label: "Policy", value: "policy" },
  { label: "External Links", value: "link" },
];

export default function ResourceArchive({ initialResources }: { initialResources: any[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = initialResources.filter((res) => {
    const matchesType = activeFilter === "all" || res.type === activeFilter;
    const matchesSearch =
      !searchQuery ||
      res.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal">
        <div className="max-w-5xl">
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight mb-4">
        <span className="text-lime">Resources</span>
          </h1>
          <div className="h-1 w-32 bg-orange mb-6"></div>
          <p className="font-sans text-lg text-charcoal/80 max-w-2xl">
            A curated archive of African scholarship, policy frameworks, and external references on sign language, linguistic rights, and CODA identity.
          </p>
        </div>
      </header>

      {/* Filters & Search */}
      <section className="sticky top-20 z-20 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10 py-4 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest border-2 transition-colors ${
                  activeFilter === f.value
                    ? "bg-charcoal text-cream border-charcoal"
                    : "bg-cream text-charcoal border-charcoal hover:border-lime"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search title, author, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-72 px-4 py-2 bg-cream border-2 border-charcoal font-sans text-sm focus:outline-none focus:border-lime"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 border-2 border-charcoal/10 bg-cream-dark">
            <p className="font-sans text-charcoal-muted">No resources match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((res: any) => (
              <article
                key={res._id}
                className="group relative bg-cream border-2 border-charcoal p-6 hover:border-lime transition-colors flex flex-col h-full"
              >
                {/* Type Badge: ORANGE */}
                <span className="inline-block self-start px-3 py-1 bg-orange text-cream text-[10px] uppercase tracking-widest mb-3">
                  {res.type}
                </span>

                {/* Title: Charcoal → Lime hover */}
                <h3 className="font-serif text-xl text-charcoal leading-tight group-hover:text-lime transition-colors mb-2">
                  {res.url ? (
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      {res.title} <span className="text-xs text-charcoal/50 group-hover:text-lime">↗</span>
                    </a>
                  ) : (
                    res.title
                  )}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-charcoal-muted mb-3">
                  {res.author && <span>{res.author}</span>}
                  {res.year && <span>• {res.year}</span>}
                </div>

                {/* Description */}
                {res.description && (
                  <p className="font-sans text-sm text-charcoal/70 leading-relaxed line-clamp-3 mb-4 flex-grow">
                    {res.description}
                  </p>
                )}

                {/* Tags */}
                {res.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-charcoal/10">
                    {res.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider text-lime">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
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