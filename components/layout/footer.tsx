import { client } from "@/sanity/lib/client";
import Link from "next/link";

const FOOTER_QUERY = `*[_type == "footer" && published == true][0]{
  siteName,
  tagline,
  copyright,
  contactEmail,
  contactPhone,
  location,
  supportSection { heading, description, paybillNumber, accountNumber, bankAccount, note },
  newsletter { heading, description, providerUrl },
  quickLinks[]{ label, url, isExternal },
  featuredLinks[]{ label, url, description },
  socialLinks[]{ platform, url, handle },
  siteCredits { label, companyName, companyUrl, displayText }
}`;

export async function Footer() {
  const footer = await client.fetch(FOOTER_QUERY);
  if (!footer) return null;

  return (
    <footer className="relative bg-cream text-charcoal border-t-2 border-charcoal">
      {/* Decorative Top Strip: Lime → Orange */}
      <div className="h-1 w-full bg-gradient-to-r from-lime via-orange to-lime"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          
          {/* Brand + Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl tracking-tight text-charcoal hover:text-lime transition-colors">
              {footer.siteName}
            </Link>
            {footer.tagline && (
              <p className="mt-3 font-sans text-sm text-charcoal/70 italic">
                {footer.tagline}
              </p>
            )}
            {footer.location && (
              <p className="mt-4 font-sans text-xs text-charcoal/60">
                📍 {footer.location}
              </p>
            )}
          </div>

          {/* Featured Content: African Scholarship + AFRIAK Series */}
          {footer.featuredLinks && footer.featuredLinks.length > 0 && (
            <div className="lg:col-span-1">
              <h3 className="font-serif text-lg text-charcoal mb-4">Explore</h3>
              <ul className="space-y-3">
                {footer.featuredLinks.map((link: any) => (
                  <li key={link.label}>
                    <Link 
                      href={link.url}
                      className="group block font-sans text-sm text-charcoal hover:text-lime transition-colors"
                    >
                      <span className="font-medium">{link.label}</span>
                      {link.description && (
                        <span className="block text-xs text-charcoal/60 mt-1 group-hover:text-charcoal">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support Section (Text-only, no integration) */}
          {footer.supportSection && (
            <div className="lg:col-span-1">
              <h3 className="font-serif text-lg text-charcoal mb-4">
                {footer.supportSection.heading}
              </h3>
              {footer.supportSection.description && (
                <p className="font-sans text-sm text-charcoal/70 mb-3">
                  {footer.supportSection.description}
                </p>
              )}
              
              {/* Paybill Display */}
              {footer.supportSection.paybillNumber && (
                <div className="mb-3 p-3 bg-cream-dark border border-charcoal/20 rounded-sm">
                  <p className="font-sans text-xs uppercase tracking-widest text-charcoal-muted mb-1">
                    M-Pesa Paybill
                  </p>
                  <p className="font-mono text-sm text-charcoal font-medium">
                    {footer.supportSection.paybillNumber}
                  </p>
                  {footer.supportSection.accountNumber && (
                    <p className="font-sans text-xs text-charcoal/60 mt-1">
                      Account: <span className="font-mono">{footer.supportSection.accountNumber}</span>
                    </p>
                  )}
                </div>
              )}
              
              {/* Bank Account (Optional) */}
              {footer.supportSection.bankAccount && (
                <div className="mb-3 p-3 bg-cream-dark border border-charcoal/20 rounded-sm">
                  <p className="font-sans text-xs uppercase tracking-widest text-charcoal-muted mb-1">
                    Bank Transfer
                  </p>
                  <p className="font-sans text-xs text-charcoal whitespace-pre-line">
                    {footer.supportSection.bankAccount}
                  </p>
                </div>
              )}
              
              {footer.supportSection.note && (
                <p className="font-sans text-[10px] text-charcoal/50 italic">
                  {footer.supportSection.note}
                </p>
              )}
            </div>
          )}

          {/* Newsletter + Contact */}
          <div className="lg:col-span-1">
            {/* Newsletter */}
            {footer.newsletter?.providerUrl && (
              <div className="mb-6">
                <h3 className="font-serif text-lg text-charcoal mb-2">
                  {footer.newsletter.heading}
                </h3>
                {footer.newsletter.description && (
                  <p className="font-sans text-sm text-charcoal/70 mb-3">
                    {footer.newsletter.description}
                  </p>
                )}
                <a
                  href={footer.newsletter.providerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-orange text-cream text-xs uppercase tracking-widest hover:bg-charcoal transition-colors"
                >
                  Subscribe
                </a>
              </div>
            )}
            
            {/* Contact */}
            <h3 className="font-serif text-lg text-charcoal mb-2">Connect</h3>
            <div className="space-y-2 font-sans text-sm">
              {footer.contactEmail && (
                <a 
                  href={`mailto:${footer.contactEmail}`}
                  className="block text-charcoal hover:text-lime transition-colors border-b border-transparent hover:border-lime pb-1"
                >
                  ✉️ {footer.contactEmail}
                </a>
              )}
              {footer.contactPhone && (
                <a 
                  href={`tel:${footer.contactPhone}`}
                  className="block text-charcoal hover:text-lime transition-colors border-b border-transparent hover:border-lime pb-1"
                >
                  📞 {footer.contactPhone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links + Social */}
        <div className="mt-10 pt-8 border-t border-charcoal/20 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Nav */}
          {footer.quickLinks && footer.quickLinks.length > 0 && (
            <div>
              <h3 className="font-serif text-lg text-charcoal mb-3">Navigate</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
                {footer.quickLinks.map((link: any) => (
                  <li key={link.label}>
                    <Link 
                      href={link.url}
                      className="text-charcoal hover:text-lime transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.isExternal && (
                        <span className="text-[10px] text-charcoal/50">↗</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Social */}
          {footer.socialLinks && footer.socialLinks.length > 0 && (
            <div className="md:text-right">
              <h3 className="font-serif text-lg text-charcoal mb-3">Follow</h3>
              <div className="flex flex-wrap justify-start md:justify-end gap-3">
                {footer.socialLinks.map((social: any) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-3 py-1.5 border-2 border-charcoal hover:border-lime transition-colors"
                    aria-label={`Follow on ${social.platform}`}
                  >
                    <span className="font-sans text-xs uppercase tracking-wider text-charcoal group-hover:text-lime">
                      {social.platform}
                    </span>
                    {social.handle && (
                      <span className="ml-1 font-sans text-[10px] text-charcoal/60">
                        {social.handle}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-charcoal/20 flex flex-col md:flex-row justify-between items-center gap-4">
  <p className="font-sans text-xs text-charcoal/50">
    {footer.copyright}
  </p>
  
  {/* Site Credits: Sonny Sayi Solutions */}
  {footer.siteCredits?.companyUrl && (
    <div className="flex items-center gap-2">
      <span className="font-sans text-xs text-charcoal/50">
        {footer.siteCredits.label || 'Made by'}{' '}
      </span>
      <a
        href={footer.siteCredits.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-xs text-charcoal hover:text-lime transition-colors border-b border-transparent hover:border-lime"
      >
        {footer.siteCredits.companyName}
      </a>
    </div>
  )}
  
  <div className="flex items-center gap-4">
    <Link href="/privacy" className="font-sans text-xs text-charcoal/60 hover:text-orange transition-colors">
      Privacy
    </Link>
    <Link href="/accessibility" className="font-sans text-xs text-charcoal/60 hover:text-orange transition-colors">
      Accessibility
    </Link>
  </div>
        </div>
      </div>
      {/* Decorative Bottom Strip: Orange accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange to-transparent opacity-60"></div>
    </footer>
  );
}