import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useCartTotalItems } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Presets', href: '/collections/presets' },
  { label: 'Actions', href: '/collections/actions' },
  { label: 'Bundles', href: '/collections/bundles' },
  { label: 'About', href: '/about' },
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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-serif font-semibold tracking-wide text-foreground">
              LUMIÈRE
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-foreground hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground relative"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container-wide py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
