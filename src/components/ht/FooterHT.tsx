import { Instagram, Youtube, Mail } from 'lucide-react';
import logoImg from '@/assets/logo.png';
import { ht } from '@/locales/ht/translations';

const footerLinks = {
  support: [
    { label: ht.footer.links.howToInstall, href: '#how-it-works' },
    { label: ht.footer.links.faq, href: '#faq' },
    { label: ht.footer.links.contact, href: 'mailto:contato@jmpresets.com' },
  ],
  legal: [
    { label: ht.footer.links.termsOfUse, href: '#' },
    { label: ht.footer.links.privacy, href: '#' },
  ],
};

export function FooterHT() {
  return (
    <footer className="bg-charcoal-dark border-t border-charcoal">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <img 
              src={logoImg} 
              alt="JM Presets" 
              className="h-16 w-auto mb-4"
            />
            <p className="text-white/60 text-sm max-w-xs">
              {ht.footer.description}
            </p>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              {ht.footer.support}
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              {ht.footer.legal}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-charcoal flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {ht.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/jemsonbautista"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-gold transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@jemsonbautista"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-gold transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="mailto:contato@jmpresets.com"
              className="text-white/40 hover:text-gold transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
