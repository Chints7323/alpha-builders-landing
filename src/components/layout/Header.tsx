import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-transparent.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Check background color at header position
      const headerHeight = 80;
      const elementAtPoint = document.elementFromPoint(window.innerWidth / 2, headerHeight);
      if (elementAtPoint) {
        const bgColor = window.getComputedStyle(elementAtPoint).backgroundColor;
        // Parse RGB and check if it's dark
        const match = bgColor.match(/\d+/g);
        if (match) {
          const [r, g, b] = match.map(Number);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          setIsDarkBg(luminance < 0.5);
        }
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const textColorClass = isDarkBg && !scrolled
    ? "text-white" 
    : "text-foreground";

  const activeColorClass = "text-primary";

  return (
    <header className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "top-0 bg-background/98 backdrop-blur-md shadow-soft" : "bg-transparent"
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Left Navigation - squeezed to left */}
          <nav className="hidden lg:flex items-center gap-6 flex-shrink-0">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-bold uppercase tracking-wide transition-colors link-hover ${
                  location.pathname === item.path
                    ? activeColorClass
                    : `${textColorClass} hover:text-primary`
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Center Logo - Bigger with box */}
          <Link 
            to="/" 
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
          >
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-soft border border-border/30">
              <img 
                src={logo} 
                alt="Alpha Global Builders" 
                className="h-14 lg:h-20 w-auto"
              />
            </div>
          </Link>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Button asChild variant="outline" size="sm" className={isDarkBg && !scrolled ? "border-white text-white hover:bg-white hover:text-foreground" : ""}>
              <a href="tel:+447123456789" className="gap-2">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
            <div className="flex flex-col items-center">
              <Button asChild variant="default" size="sm">
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <span className={`text-[10px] mt-0.5 ${isDarkBg && !scrolled ? "text-white/70" : "text-muted-foreground"}`}>Contact Us</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ml-auto ${textColorClass}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-elevated animate-fade-in">
            <nav className="container-custom flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-bold uppercase py-3 border-b border-border transition-colors ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <Button asChild variant="outline">
                  <a href="tel:+447123456789" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </Button>
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