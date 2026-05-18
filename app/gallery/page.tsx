"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

// Fetch data on the server
async function getGalleryData() {
  return await client.fetch(`*[_type == "galleryItem" && published == true] | order(eventDate desc){
    _id,
    title,
    category,
    images[]{ asset->{ url }, alt, caption },
    description,
    eventDate,
    location,
    featured
  }`);
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    getGalleryData().then((data) => {
      setGalleryItems(data);
      setLoading(false);
    });
  }, []);

  const CATEGORIES = [
    { label: "All", value: "all" },
    { label: "Events", value: "events" },
    { label: "Conferences", value: "conferences" },
    { label: "Field Activities", value: "field" },
    { label: "Advocacy", value: "advocacy" },
    { label: "Stories", value: "storytelling" },
  ];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (item: any, index: number) => {
    setCurrentItem(item);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentItem(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (currentItem && currentItem.images) {
      setCurrentImageIndex((prev) => (prev + 1) % currentItem.images.length);
    }
  };

  const prevImage = () => {
    if (currentItem && currentItem.images) {
      setCurrentImageIndex((prev) => (prev - 1 + currentItem.images.length) % currentItem.images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentItem]);

  if (loading) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-charcoal border-t-lime rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-sans text-charcoal-muted">Loading gallery...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-cream">
      
      {/* Header */}
      <header className="relative pt-32 pb-16 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal">
        <div className="max-w-5xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight mb-4">
            Visual <span className="text-lime">Archive</span>
          </h1>
          <div className="h-1 w-32 bg-orange mb-6"></div>
          <p className="font-sans text-lg text-charcoal/80 max-w-2xl">
            Moments from the field: advocacy, conferences, community engagement, and visual storytelling from the journey.
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <nav className="sticky top-20 z-20 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10 py-4 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border-2 transition-all duration-300 ${
                activeFilter === cat.value
                  ? "bg-charcoal text-cream border-charcoal"
                  : "bg-cream text-charcoal border-charcoal/30 hover:border-lime"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {filteredItems.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-charcoal/20 bg-cream-dark">
            <div className="w-24 h-24 mx-auto mb-4 border-2 border-charcoal/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-charcoal/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-sans text-charcoal-muted mb-2">No images found in this category.</p>
            <button 
              onClick={() => setActiveFilter("all")}
              className="font-sans text-sm text-lime hover:text-orange transition-colors mt-2"
            >
              View all images →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item: any) => (
              <article
                key={item._id}
                className="group relative bg-cream border-2 border-charcoal overflow-hidden hover:border-lime transition-colors duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5 cursor-pointer"
                  onClick={() => openLightbox(item, 0)}>
                  {item.images?.[0]?.asset?.url && (
                    <Image
                      src={item.images[0].asset.url}
                      alt={item.images[0].alt || item.title}
                      width={600}
                      height={450}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-orange text-cream text-[10px] uppercase tracking-widest">
                    {item.category}
                  </div>

                  {/* Multiple Images Indicator */}
                  {item.images && item.images.length > 1 && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-charcoal/70 text-cream text-[10px] rounded">
                      {item.images.length} photos
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="px-4 py-2 border-2 border-cream text-cream text-xs uppercase tracking-widest">
                      View Gallery
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-xl text-charcoal leading-tight mb-2 group-hover:text-lime transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.location && (
                    <p className="font-sans text-xs text-charcoal-muted mb-2">
                      📍 {item.location}
                    </p>
                  )}
                  
                  {item.eventDate && (
                    <p className="font-sans text-xs text-charcoal-muted mb-3">
                      {new Date(item.eventDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  )}

                  {item.description && (
                    <p className="font-sans text-sm text-charcoal/70 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && currentItem && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-50"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          {currentItem.images && currentItem.images.length > 1 && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image Container */}
          <div 
            className="max-w-6xl max-h-[90vh] overflow-hidden bg-cream p-2 border-2 border-charcoal mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.images?.[currentImageIndex]?.asset?.url && (
              <Image
                src={currentItem.images[currentImageIndex].asset.url}
                alt={currentItem.images[currentImageIndex].alt || currentItem.title}
                width={1200}
                height={900}
                className="object-contain max-h-[85vh] w-auto"
                priority
              />
            )}
            
            {/* Caption */}
            <div className="p-4 bg-cream">
              <p className="font-sans text-sm text-charcoal/70 italic mb-2">
                {currentItem.images[currentImageIndex].caption || currentItem.title}
              </p>
              {currentItem.location && (
                <p className="font-sans text-xs text-charcoal-muted">
                  📍 {currentItem.location} • {new Date(currentItem.eventDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>

          {/* Next Button */}
          {currentItem.images && currentItem.images.length > 1 && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image Counter */}
          {currentItem.images && currentItem.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-charcoal/80 text-cream text-xs uppercase tracking-widest rounded">
              {currentImageIndex + 1} / {currentItem.images.length}
            </div>
          )}
        </div>
      )}

      {/* Bottom Theme Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-lime via-orange to-lime"></div>
    </main>
  );
}