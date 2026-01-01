import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  Home, Bath, Building2, Hammer, Fence, Zap, 
  ChevronRight, CheckCircle2, Phone
} from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

// Service images
import residential1 from "@/assets/services/residential-1.jpg";
import residential2 from "@/assets/services/residential-2.jpg";
import residential3 from "@/assets/services/residential-3.jpg";
import kitchen1 from "@/assets/services/kitchen-1.jpg";
import kitchen2 from "@/assets/services/kitchen-2.jpg";
import kitchen3 from "@/assets/services/kitchen-3.jpg";
import bathroom1 from "@/assets/services/bathroom-1.jpg";
import bathroom2 from "@/assets/services/bathroom-2.jpg";
import bathroom3 from "@/assets/services/bathroom-3.jpg";
import commercial1 from "@/assets/services/commercial-1.jpg";
import commercial2 from "@/assets/services/commercial-2.jpg";
import commercial3 from "@/assets/services/commercial-3.jpg";
import loft1 from "@/assets/services/loft-1.jpg";
import loft2 from "@/assets/services/loft-2.jpg";
import loft3 from "@/assets/services/loft-3.jpg";
import outdoor1 from "@/assets/services/outdoor-1.jpg";
import outdoor2 from "@/assets/services/outdoor-2.jpg";
import outdoor3 from "@/assets/services/outdoor-3.jpg";

const services = [
  {
    icon: Home,
    title: "Residential Construction & Renovation",
    slug: "residential",
    description: "Transform your home with our comprehensive residential services. From new builds to complete renovations, we deliver quality results that exceed expectations.",
    items: ["House extensions", "Loft conversions", "Interior renovation", "Basement conversions", "New build homes", "Structural alterations"],
    category: "Residential",
    images: [residential1, residential2, residential3]
  },
  {
    icon: Bath,
    title: "Kitchens & Bathrooms",
    slug: "kitchens-bathrooms",
    description: "Create beautiful, functional spaces with our expert kitchen and bathroom installation services. We handle design through to completion.",
    items: ["Kitchen design & installation", "Bathroom renovation", "Wet rooms", "En-suite bathrooms", "Utility rooms", "Tiling & flooring"],
    category: "Kitchens",
    images: [kitchen1, bathroom1, kitchen2]
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    slug: "commercial",
    description: "Professional commercial construction services for businesses of all sizes across North West London. Minimal disruption, maximum results.",
    items: ["Office fit-outs", "Retail spaces", "Restaurant & hospitality", "Warehouse conversions", "Shop fronts", "Commercial renovations"],
    category: "Commercial",
    images: [commercial1, commercial2, commercial3]
  },
  {
    icon: Hammer,
    title: "General Building & Maintenance",
    slug: "general-building",
    description: "Reliable building and maintenance services for all your property needs. From minor repairs to major renovations.",
    items: ["Painting & decorating", "Brickwork & masonry", "Plastering", "Carpentry & joinery", "Door & window fitting", "General repairs"],
    category: "Residential",
    images: [loft1, loft2, loft3]
  },
  {
    icon: Fence,
    title: "Outdoor & Structural",
    slug: "outdoor-structural",
    description: "Enhance your property's exterior with our outdoor construction and structural services. Built to last.",
    items: ["Driveways & patios", "Fencing & gates", "Roofing repairs", "Guttering", "Garden walls", "Decking & landscaping"],
    category: "Extensions",
    images: [outdoor1, outdoor2, outdoor3]
  },
  {
    icon: Zap,
    title: "Energy & Smart Systems",
    slug: "energy-smart",
    description: "Future-proof your property with energy-efficient and smart home solutions. Save money while helping the environment.",
    items: ["Solar panel installation", "Heat pump systems", "Smart home wiring", "Electrical installations", "Plumbing services", "LED lighting upgrades"],
    category: "Residential",
    images: [bathroom2, bathroom3, kitchen3]
  }
];

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const Services = () => {
  return (
    <>
      <SEO
        title="Our Services | Alpha Global Builders - Construction Services North West London"
        description="Explore our comprehensive construction services: residential renovations, kitchens, bathrooms, loft conversions, commercial fit-outs & more in North West London."
        canonicalUrl="/services"
      />
      <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg text-accent-foreground/90 leading-relaxed">
              From residential renovations to commercial fit-outs, we offer comprehensive 
              construction services tailored to your needs. Quality craftsmanship guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-0">
            {services.map((service, index) => (
              <div key={index}>
                <div className="py-10">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left: Content */}
                    <div className="flex-1">
                      <Link 
                        to={`/services/${service.slug}`}
                        className="flex items-start gap-4 mb-4 group service-link-hover"
                      >
                        <div className="service-icon w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                          <service.icon className="h-7 w-7 text-primary transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <h2 className="service-title text-2xl font-bold mb-2 transition-colors duration-300">{service.title}</h2>
                          <p className="text-muted-foreground">
                            {truncateText(service.description, 80)}
                            <Link 
                              to={`/services/${service.slug}`}
                              className="text-primary hover:underline font-medium ml-1"
                            >
                              read more
                            </Link>
                          </p>
                        </div>
                      </Link>

                      {/* Service items preview */}
                      <div className="grid grid-cols-2 gap-2 mb-4 ml-0 lg:ml-[4.5rem]">
                        {service.items.slice(0, 4).map((item, i) => (
                          <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3 ml-0 lg:ml-[4.5rem]">
                        <Button asChild variant="outline" size="sm">
                          <a href={`tel:${CONTACT_INFO.phone}`} className="gap-2">
                            <Phone className="h-4 w-4" />
                            Call Us
                          </a>
                        </Button>
                        <Button asChild size="sm">
                          <Link to="/contact">Get a Quote</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Right: Image thumbnails - Consistent grid showing 3 images */}
                    <div className="lg:w-72 flex-shrink-0">
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <div className="grid grid-cols-3 gap-2">
                          {[0, 1, 2].map((imgIndex) => (
                            <div
                              key={imgIndex}
                              className="group relative overflow-hidden rounded-md aspect-square bg-muted"
                            >
                              {service.images[imgIndex] ? (
                                <img 
                                  src={service.images[imgIndex]} 
                                  alt={`${service.title} project ${imgIndex + 1}`}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-muted-foreground text-xs">Coming</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <Link 
                          to={`/projects?category=${encodeURIComponent(service.category)}`}
                          className="block text-center text-sm text-primary hover:underline mt-3 font-medium"
                        >
                          View All Projects →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Separator */}
                {index < services.length - 1 && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-background px-4">
                        <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't see exactly what you're looking for? Contact us to discuss your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="xl">
              <Link to="/contact">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href={`tel:${CONTACT_INFO.phone}`} className="gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default Services;
