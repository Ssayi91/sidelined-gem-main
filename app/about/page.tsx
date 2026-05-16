import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const ABOUT_QUERY = `*[_type == "aboutPage" && published == true][0]{
  pageTitle,
  heroCollage[]{ asset->{ url }, alt },
  professionalBio { heading, content, sideImage { asset->{ url }, alt } },
  academicBackground { heading, content, sideImage { asset->{ url }, alt } },
  advocacyWork { heading, content, sideImage { asset->{ url }, alt } },
  focusAreas { heading, topics[]{ topic, description } },
  personalMission { heading, content, quote, backgroundImage { asset->{ url }, alt } },
  futureVision { heading, content }
}`;

// Doodle Components
const DoodleArrow = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 50 Q 30 20, 50 50 T 90 50" strokeLinecap="round" /><path d="M80 40 L 90 50 L 80 60" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const DoodleCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="50" cy="50" r="40" strokeLinecap="round" strokeDasharray="4 4" /></svg>
);
const DoodleLine = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 50" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 25 Q 50 5, 100 25 T 190 25" strokeLinecap="round" /></svg>
);
const DoodleStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"><path d="M50 10 L 60 40 L 90 50 L 60 60 L 50 90 L 40 60 L 10 50 L 40 40 Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Reusable Lurking Image Component - READABILITY OPTIMIZED
const LurkingImage = ({ src, alt, className, rotate, opacity = "opacity-70 hover:opacity-100" }: { 
  src: string, 
  alt: string, 
  className: string, 
  rotate: string,
  opacity?: string 
}) => (
  <div className={`absolute hidden lg:block z-0 ${className} ${opacity} pointer-events-none`}>
    <div className={`relative bg-cream p-2 border-2 border-charcoal shadow-xl ${rotate} transition-all duration-500 w-48 h-64 md:w-56 md:h-72`}>
      <Image src={src} alt={alt || "Collage"} fill className="object-cover grayscale hover:grayscale-0" />
      <DoodleCircle className="absolute -bottom-3 -right-3 w-8 h-8 text-orange/50" />
    </div>
  </div>
);

export default async function AboutPage() {
  const about = await client.fetch(ABOUT_QUERY);
  
  const FALLBACK = "https://images.unsplash.com/photo-1576763995926-8a3108179848?q=80&w=400&auto=format&fit=crop";
  const getImg = (img: any) => img?.asset?.url || FALLBACK;
  const getAlt = (img: any) => img?.alt || "Collage Image";

  if (!about) return <main className="min-h-screen bg-cream flex items-center justify-center"><p className="text-charcoal-muted">Content pending.</p></main>;

  return (
    <main className="relative min-h-screen bg-cream overflow-x-hidden">
      
      {/* 1. TOP HEADER LURKERS */}
      <header className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal overflow-hidden min-h-[500px]">
        <LurkingImage src={getImg(about.heroCollage?.[0])} alt={getAlt(about.heroCollage?.[0])} className="top-10 -left-20" rotate="-rotate-[8deg]" />
        <LurkingImage src={getImg(about.heroCollage?.[1])} alt={getAlt(about.heroCollage?.[1])} className="top-32 -right-16" rotate="rotate-[6deg]" />
        <LurkingImage src={getImg(about.heroCollage?.[2])} alt={getAlt(about.heroCollage?.[2])} className="bottom-0 left-1/3" rotate="-rotate-[4deg]" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal leading-tight mb-6">
            {about.pageTitle}
          </h1>
          <div className="h-1 w-32 bg-lime mb-4"></div>
          <DoodleLine className="w-48 h-12 text-charcoal/30" />
        </div>
      </header>

      {/* 2. MAIN CONTENT WITH SIDE LURKERS - READABILITY GUARDS */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        
        {/* Section 1: Professional Bio - Right Lurker */}
        <section className="relative mb-32 border-l-2 border-charcoal pl-6 md:pl-8 pr-0 lg:pr-40 z-10">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl text-charcoal mb-6">{about.professionalBio?.heading}</h2>
            <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed">
              <PortableText value={about.professionalBio?.content} />
            </div>
          </div>
          <LurkingImage src={getImg(about.professionalBio?.sideImage)} alt="Professional" className="-top-10 -right-20 md:-right-40" rotate="rotate-[3deg]" />
        </section>

        {/* Section 2: Academic - Left Lurker */}
        <section className="relative mb-32 pl-0 md:pl-24 lg:pl-40 bg-cream-dark p-8 border-2 border-charcoal z-10">
          <div className="max-w-3xl ml-0 md:ml-0">
            <h2 className="font-serif text-3xl text-charcoal mb-6">{about.academicBackground?.heading}</h2>
            <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed">
              <PortableText value={about.academicBackground?.content} />
            </div>
          </div>
          <LurkingImage src={getImg(about.academicBackground?.sideImage)} alt="Academic" className="-bottom-16 -left-24 md:-left-40" rotate="-rotate-[5deg]" />
          <DoodleStar className="absolute top-4 right-4 w-12 h-12 text-lime/40 hidden md:block" />
        </section>

        {/* Section 3: Advocacy - Right Lurker Low */}
        <section className="relative mb-32 border-l-2 border-charcoal pl-6 md:pl-8 pr-0 lg:pr-40 z-10 pb-24 md:pb-0">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl text-charcoal mb-6">{about.advocacyWork?.heading}</h2>
            <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed">
              <PortableText value={about.advocacyWork?.content} />
            </div>
          </div>
          <LurkingImage src={getImg(about.advocacyWork?.sideImage)} alt="Advocacy" className="-bottom-20 -right-20 md:-right-40" rotate="rotate-[4deg]" />
        </section>

        {/* Section 4: Focus Areas - Left Lurker */}
        <section className="relative mb-32 border-l-2 border-charcoal pl-6 md:pl-8 pr-0 lg:pl-40 z-10">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl text-charcoal mb-8">{about.focusAreas?.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {about.focusAreas?.topics?.map((item: any, i: number) => (
                <div key={i} className="p-6 border-2 border-charcoal hover:border-lime transition-colors bg-cream">
                  <h3 className="font-serif text-xl text-charcoal mb-2">{item.topic}</h3>
                  <p className="font-sans text-sm text-charcoal-soft">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <LurkingImage src={getImg(about.heroCollage?.[0])} alt="Focus" className="top-0 -left-24 md:-left-40" rotate="-rotate-[2deg]" />
          <DoodleCircle className="absolute top-10 right-0 w-16 h-16 text-orange/30 hidden md:block" />
        </section>

        {/* Section 5: Mission - Background Image */}
        <section className="relative mb-32 border-l-2 border-lime pl-6 md:pl-8 p-8 overflow-hidden z-10">
           <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
            <Image src={getImg(about.personalMission?.backgroundImage)} alt="" fill className="object-cover grayscale" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="font-serif text-3xl text-charcoal mb-6">{about.personalMission?.heading}</h2>
            <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed">
              <PortableText value={about.personalMission?.content} />
            </div>
            {about.personalMission?.quote && (
              <blockquote className="mt-8 pl-6 border-l-4 border-orange italic font-serif text-xl text-charcoal">
                "{about.personalMission.quote}"
              </blockquote>
            )}
          </div>
        </section>

        {/* Section 6: Future Vision - Right Lurker */}
        <section className="relative border-l-2 border-charcoal pl-6 md:pl-8 pr-0 lg:pr-40 z-10 mb-20">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl text-charcoal mb-6">{about.futureVision?.heading}</h2>
            <div className="prose prose-lg max-w-none font-sans text-charcoal leading-relaxed">
              <PortableText value={about.futureVision?.content} />
            </div>
          </div>
          <LurkingImage src={getImg(about.heroCollage?.[2])} alt="Future" className="top-10 -right-24 md:-right-40" rotate="rotate-[6deg]" />
        </section>

      </div>

      {/* 3. COLLAGE FOOTER */}
      <footer className="relative pt-32 pb-12 border-t-2 border-charcoal bg-cream overflow-hidden min-h-[400px]">
        <LurkingImage src={getImg(about.heroCollage?.[1])} alt="Footer 1" className="bottom-10 left-10 md:left-24" rotate="-rotate-[12deg]" />
        <LurkingImage src={getImg(about.heroCollage?.[2])} alt="Footer 2" className="bottom-20 right-10 md:right-32" rotate="rotate-[8deg]" />
        <LurkingImage src={getImg(about.professionalBio?.sideImage)} alt="Footer 3" className="bottom-40 left-1/2 -translate-x-1/2" rotate="rotate-[2deg]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="inline-block px-6 py-3 bg-orange text-cream text-sm uppercase tracking-widest mb-6">The Sidelined Gem</div>
          <p className="font-serif text-2xl italic text-charcoal/80 max-w-2xl mx-auto mb-8">
            "The most powerful stories are not the loudest ones. They are the ones that have been waiting to be heard."
          </p>
          <div className="h-px w-32 bg-charcoal mx-auto"></div>
        </div>
      </footer>
      
      <div className="h-2 w-full bg-gradient-to-r from-lime via-orange to-lime"></div>
    </main>
  );
}