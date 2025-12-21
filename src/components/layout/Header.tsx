import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useCartTotalItems } from '@/stores/cartStore';
import { cn } from '@/lib/utils';
import logoImg from '@/assets/logo.png';

// Anchor links for single-product landing page
const navLinks = [
  { label: 'What\'s Included', href: '#whats-included' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartTotalItems();
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>✨ It's Magic Season! 50% OFF Today Only ✨</span>
      </div>

      {/* Main Header - Black background, not sticky */}
      <header className="relative z-50 bg-charcoal-dark border-b border-charcoal">
        <div className="container-wide">
          <div className="flex items-center justify-between h-28 md:h-32 lg:h-36">
            {/* Logo - Left, bigger */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src={logoImg} 
                alt="JM Presets" 
                className="h-20 md:h-24 lg:h-28 w-auto"
              />
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-white/80 hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions - Right */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gold relative"
                onClick={openCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gold text-charcoal-dark text-xs font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-charcoal-dark border-t border-charcoal animate-fade-in">
            <nav className="container-wide py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-base font-medium text-white/80 hover:text-gold transition-colors py-2 text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
