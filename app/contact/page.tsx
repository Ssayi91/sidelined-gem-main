import Link from "next/link";

// Inline Doodle Components (matches About page aesthetic)
const DoodleArrow = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 50 Q 30 20, 50 50 T 90 50" strokeLinecap="round" />
    <path d="M80 40 L 90 50 L 80 60" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DoodleCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="50" cy="50" r="40" strokeLinecap="round" strokeDasharray="4 4" />
  </svg>
);
const DoodleLine = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 50" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 25 Q 50 5, 100 25 T 190 25" strokeLinecap="round" />
  </svg>
);

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-cream overflow-x-hidden">
      
      {/* 1. HEADER: Warm Invitation */}
      <header className="relative pt-32 pb-16 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal">
        <div className="max-w-4xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
            Let's <span className="text-lime">Connect</span>
          </h1>
          <div className="mt-6 h-1 w-32 bg-orange"></div>
          <p className="mt-6 font-sans text-lg text-charcoal/80 leading-relaxed max-w-2xl">
            This platform is built for conversation. Whether you're a researcher, advocate, artist, or ally, your voice matters here. Should we create a different email address dedicated to the blog? Let's shape it together.
          </p>
        </div>
        {/* Doodle Accents */}
        <DoodleArrow className="absolute top-28 right-32 w-24 h-24 text-lime/40 hidden lg:block" />
        <DoodleCircle className="absolute bottom-10 left-20 w-32 h-32 text-orange/30 hidden lg:block" />
      </header>

      {/* 2. DIRECT CONTACT: Editorial Cards */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <a 
            href="mailto:info@thesidelinedgem.org" 
            className="group relative bg-cream border-2 border-charcoal p-8 hover:border-lime transition-colors duration-300"
          >
            <h3 className="font-serif text-2xl text-charcoal mb-2">Email</h3>
            <p className="font-sans text-charcoal/70 group-hover:text-lime transition-colors">info@thesidelinedgem.org</p>
            <DoodleLine className="absolute top-4 right-4 w-12 h-6 text-charcoal/20" />
          </a>

          {/* Phone */}
          <a 
            href="tel:+254715332313" 
            className="group relative bg-cream border-2 border-charcoal p-8 hover:border-lime transition-colors duration-300"
          >
            <h3 className="font-serif text-2xl text-charcoal mb-2">Phone</h3>
            <p className="font-sans text-charcoal/70 group-hover:text-lime transition-colors">+254 715 332 313</p>
            <DoodleCircle className="absolute top-4 right-4 w-8 h-8 text-orange/30" />
          </a>

          {/* Location */}
          <div className="group relative bg-cream border-2 border-charcoal p-8 hover:border-lime transition-colors duration-300">
            <h3 className="font-serif text-2xl text-charcoal mb-2">Location</h3>
            <p className="font-sans text-charcoal/70">Nairobi, Kenya</p>
            <p className="font-sans text-xs text-charcoal-muted mt-2">Available for collaborations, field visits & speaking engagements</p>
            <DoodleArrow className="absolute top-4 right-4 w-10 h-10 text-lime/30" />
          </div>
        </div>
      </section>

      {/* 3. COMMUNITY & SOCIALS */}
      <section className="border-t-2 border-charcoal bg-cream-dark py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Social Links */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal mb-6">
              Follow the <span className="text-lime">Journey</span>
            </h2>
            <p className="font-sans text-charcoal/70 mb-6">
              Watch interviews, read reflections, and join the conversation across platforms.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "YouTube", url: "#" },
                { name: "LinkedIn", url: "#" },
                { name: "Twitter/X", url: "#" },
                { name: "Instagram", url: "#" },
                { name: "WhatsApp Community", url: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-4 py-2 border-2 border-charcoal bg-cream text-charcoal text-xs uppercase tracking-widest hover:border-lime hover:text-lime transition-colors"
                >
                  {social.name} <span className="ml-1 text-[10px] text-charcoal/40 group-hover:text-lime/40">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal mb-6">
              Stay in the <span className="text-orange">Loop</span>
            </h2>
            <p className="font-sans text-charcoal/70 mb-4">
              Receive monthly reflections, research updates, and event invitations directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 bg-cream border-2 border-charcoal font-sans text-sm placeholder:text-charcoal-muted focus:outline-none focus:border-lime transition-colors"
              />
              <button className="px-6 py-3 bg-orange text-cream text-xs uppercase tracking-widest hover:bg-charcoal transition-colors">
                Subscribe
              </button>
            </div>
            <p className="font-sans text-[10px] text-charcoal-muted mt-2">
              No spam. Unsubscribe anytime. Powered by your inbox, not algorithms.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SUPPORT / DONATE (Text-Only, Transparent) */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Support This <span className="text-lime">Work</span>
          </h2>
          <p className="font-sans text-charcoal/70 mb-8 max-w-2xl mx-auto">
            This platform is a labor of love, research, and advocacy. Your contributions help sustain accessibility features, amplify African scholarship, and keep these stories alive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* M-Pesa */}
            <div className="p-6 border-2 border-charcoal bg-cream-dark hover:border-lime transition-colors">
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal-muted mb-2">M-Pesa Paybill</p>
              <p className="font-mono text-xl text-charcoal font-medium">123456</p>
              <p className="font-sans text-xs text-charcoal/60 mt-1">Account: <span className="font-mono">SIDELINEDGEM</span></p>
            </div>
            {/* Bank */}
            <div className="p-6 border-2 border-charcoal bg-cream-dark hover:border-lime transition-colors">
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal-muted mb-2">Bank Transfer</p>
              <p className="font-sans text-sm text-charcoal">Equity Bank • Acc: 1234567890</p>
              <p className="font-sans text-xs text-charcoal/60 mt-1">Name: Aminah N'kadziri Idd</p>
            </div>
          </div>
          <p className="font-sans text-[10px] text-charcoal-muted mt-6 italic">
            Funds support research, accessibility, and platform maintenance. No third-party fees. 100% direct.
          </p>
        </div>
      </section>

      {/* 5. COLLABORATION CTA */}
      <section className="border-t-2 border-charcoal bg-cream py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">
            Let's <span className="text-orange">Build Together</span>
          </h2>
          <p className="font-sans text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Research collaborations, artistic partnerships, advocacy campaigns, or simply sharing this work with someone who needs to hear it. Every connection matters.
          </p>
          <a
            href="mailto:info@thesidelinedgem.org?subject=Collaboration%20Inquiry"
            className="inline-block px-8 py-4 border-2 border-charcoal text-charcoal text-sm uppercase tracking-widest hover:bg-charcoal hover:text-cream transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      {/* Bottom Theme Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-lime via-orange to-lime"></div>
    </main>
  );
}