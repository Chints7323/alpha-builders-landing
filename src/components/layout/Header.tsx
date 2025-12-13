import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-transparent.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "About Us", path: "/about" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6">
      <div className="container-custom">
        {/* Floating navbar with solid dark background and border */}
        <div className="relative bg-foreground backdrop-blur-sm rounded-xl shadow-elevated mx-auto max-w-5xl border border-primary/50">
          <div className="flex items-center justify-between h-16 px-8">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-shrink-0">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link-hover text-sm font-bold uppercase tracking-wide transition-colors ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Center Logo - extends beyond navbar */}
            <Link 
              to="/" 
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-300 hover:scale-105 z-10"
            >
              <div className="bg-background rounded-lg p-1.5 shadow-elevated border-[3px] border-primary">
                <img 
                  src={logo} 
                  alt="Alpha Global Builders" 
                  className="h-[68px] w-auto"
                />
              </div>
            </Link>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Button asChild variant="navOutline" size="sm">
                <a href="tel:+447123456789" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 ml-auto text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-white/20 animate-fade-in">
              <nav className="flex flex-col py-4 px-6">
                {/* Logo at top of mobile menu */}
                <div className="flex justify-center mb-4 pb-4 border-b border-white/20">
                  <div className="bg-background rounded-lg p-1.5 border-[3px] border-primary">
                    <img 
                      src={logo} 
                      alt="Alpha Global Builders" 
                      className="h-16 w-auto"
                    />
                  </div>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-bold uppercase py-3 border-b border-white/20 transition-colors ${
                      location.pathname === item.path
                        ? "text-primary"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4">
                  <Button asChild variant="navOutline">
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
      </div>
    </header>
  );
};

export default Header;
