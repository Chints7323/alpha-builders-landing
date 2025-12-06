import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="bg-background rounded p-3 inline-block">
              <img src={logo} alt="Alpha Global Builders" className="h-28 w-auto" />
            </div>
            <p className="text-accent-foreground/80 text-sm leading-relaxed">
              Trusted residential and commercial construction across North West London. 
              7+ years of experience delivering quality builds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "Projects", "Testimonials", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-accent-foreground/80 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-accent-foreground/80 text-sm">
              <li>House Extensions</li>
              <li>Loft Conversions</li>
              <li>Kitchen & Bathroom</li>
              <li>Commercial Fit-outs</li>
              <li>Roofing & Carpentry</li>
              <li>Energy Solutions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+447123456789" className="hover:text-primary transition-colors">
                    07123 456 789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@alphaglobalbuilders.co.uk" className="hover:text-primary transition-colors text-sm">
                  info@alphaglobalbuilders.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-accent-foreground/80 text-sm">
                  Stanmore, North West London
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-accent-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-accent-foreground/60 text-sm">
              © {new Date().getFullYear()} Alpha Global Builders. All rights reserved.
            </p>
            <p className="text-accent-foreground/60 text-sm">
              Serving Stanmore, Harrow, Edgware, Wembley & North West London
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;