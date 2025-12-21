import { Instagram, Youtube, Mail } from 'lucide-react';

import logoImg from '@/assets/logo.png';

const footerLinks = {
  support: [
    { label: 'How to Install', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: 'mailto:contato@jmpresets.com' },
  ],
  legal: [
    { label: 'Refund Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Privacy', href: '#' },
  ],
};

export function Footer() {
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
              Premium digital backdrops and Photoshop actions for photographers who demand excellence.
            </p>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Support
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
              Legal
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
            © {new Date().getFullYear()} JM Presets by Jemson Bautista. All rights reserved.
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
