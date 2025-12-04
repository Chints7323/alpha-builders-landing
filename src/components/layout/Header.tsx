import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-transparent.png";

const leftNavItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
];

const rightNavItems = [
  { name: "Testimonials", path: "/testimonials" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allNavItems = [...leftNavItems, ...rightNavItems];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/98 backdrop-blur-md shadow-soft" : "bg-background"
    }`}>
      {/* Top bar with contact */}
      <div className="bg-accent text-accent-foreground hidden lg:block">
        <div className="container-custom">
          <div className="flex items-center justify-between py-2 text-sm">
            <span>Mon - Fri: 8:00am – 7:00pm</span>
            <a href="tel:+447123456789" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-3 w-3" />
              <span className="font-semibold">07123 456 789</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container-custom relative">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Desktop Left Navigation */}
          <nav className="hidden lg:flex items-center gap-6 flex-1">
            {leftNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors link-hover ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <Link 
            to="/" 
            className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-auto lg:translate-x-0 flex items-center justify-center"
          >
            <div className="relative bg-background rounded-b-2xl shadow-elevated px-4 py-2 lg:px-6 lg:py-3 -mt-1">
              <img 
                src={logo} 
                alt="Alpha Global Builders" 
                className="h-16 lg:h-20 w-auto"
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
            </div>
          </Link>

          {/* Desktop Right Navigation */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-end">
            {rightNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors link-hover ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="default" size="default" className="ml-4">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground ml-auto"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-elevated animate-fade-in">
            <nav className="container-custom flex flex-col py-4">
              {allNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-3 border-b border-border transition-colors ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="tel:+447123456789"
                  className="flex items-center gap-2 text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold">07123 456 789</span>
                </a>
                <Button asChild variant="default">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Get a Quote
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
