import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo-transparent.png";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="bg-background rounded-lg p-2 inline-block">
              <img src={logo} alt="Alpha Global Builders" className="h-24 w-auto" />
            </div>
            <p className="text-accent-foreground/80 text-sm leading-relaxed">
              <span className="text-primary font-semibold">Building</span> Trust. <span className="text-primary font-semibold">Maintaining</span> Relationships. <span className="text-primary font-semibold">Renovating</span> Dreams.<br />
              8+ years of quality construction across North West London.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "Projects", path: "/projects" },
                { label: "Testimonials", path: "/testimonials" },
                { label: "About Us", path: "/about" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-accent-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Residential Construction", slug: "residential" },
                { label: "Kitchens & Bathrooms", slug: "kitchens-bathrooms" },
                { label: "Commercial Projects", slug: "commercial" },
                { label: "General Building", slug: "general-building" },
                { label: "Outdoor & Structural", slug: "outdoor-structural" },
                { label: "Energy & Smart Systems", slug: "energy-smart" },
              ].map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-accent-foreground/80 hover:text-primary transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+447828131029" className="hover:text-primary transition-colors">
                    (+44) 07828131029
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@alphaglobalbuilders.uk" className="hover:text-primary transition-colors text-sm">
                  info@alphaglobalbuilders.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-accent-foreground/80 text-sm">
                  Stanmore, London, United Kingdom
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