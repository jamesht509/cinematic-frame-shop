import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useCartTotalItems } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'SHOP ALL', href: '/shop' },
  { label: 'PRESETS', href: '/collections/presets' },
  { label: 'ACTIONS', href: '/collections/actions' },
  { label: 'BUNDLES', href: '/collections/bundles' },
  { label: 'ABOUT', href: '/about' },
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

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>✨ It's Magic Season! 50% OFF Bundles ✨</span>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-charcoal-dark border-b border-charcoal'
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Left */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-serif font-bold tracking-wider text-white">
                LUMIÈRE
              </h1>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-semibold text-white/80 hover:text-gold transition-colors duration-200 tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions - Right */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-white hover:text-gold hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-gold hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gold relative"
                onClick={openCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
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
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-base font-semibold text-white/80 hover:text-gold transition-colors py-2 tracking-widest"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}