import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Home, Bath, Building2, Hammer, Fence, Zap, 
  ChevronRight, CheckCircle2, ExternalLink
} from "lucide-react";
import projectKitchen from "@/assets/project-kitchen.jpg";
import projectLoft from "@/assets/project-loft.jpg";
import projectBathroom from "@/assets/project-bathroom.jpg";
import projectExtension from "@/assets/project-extension.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";

const services = [
  {
    icon: Home,
    title: "Residential Construction & Renovation",
    description: "Transform your home with our comprehensive residential services. From new builds to complete renovations, we deliver quality results.",
    items: ["House extensions", "Loft conversions", "Interior renovation", "Basement conversions", "New build homes", "Structural alterations"],
    category: "Residential",
    images: [projectExtension, projectLoft]
  },
  {
    icon: Bath,
    title: "Kitchens & Bathrooms",
    description: "Create beautiful, functional spaces with our expert kitchen and bathroom installation services.",
    items: ["Kitchen design & installation", "Bathroom renovation", "Wet rooms", "En-suite bathrooms", "Utility rooms", "Tiling & flooring"],
    category: "Kitchens",
    images: [projectKitchen, projectBathroom]
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    description: "Professional commercial construction services for businesses of all sizes across North West London.",
    items: ["Office fit-outs", "Retail spaces", "Restaurant & hospitality", "Warehouse conversions", "Shop fronts", "Commercial renovations"],
    category: "Commercial",
    images: [projectCommercial]
  },
  {
    icon: Hammer,
    title: "General Building & Maintenance",
    description: "Reliable building and maintenance services for all your property needs.",
    items: ["Painting & decorating", "Brickwork & masonry", "Plastering", "Carpentry & joinery", "Door & window fitting", "General repairs"],
    category: "Residential",
    images: [projectExtension, projectLoft]
  },
  {
    icon: Fence,
    title: "Outdoor & Structural",
    description: "Enhance your property's exterior with our outdoor construction and structural services.",
    items: ["Driveways & patios", "Fencing & gates", "Roofing repairs", "Guttering", "Garden walls", "Decking & landscaping"],
    category: "Extensions",
    images: [projectExtension]
  },
  {
    icon: Zap,
    title: "Energy & Smart Systems",
    description: "Future-proof your property with energy-efficient and smart home solutions.",
    items: ["Solar panel installation", "Heat pump systems", "Smart home wiring", "Electrical installations", "Plumbing services", "LED lighting upgrades"],
    category: "Residential",
    images: [projectLoft, projectKitchen]
  }
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground section-padding">
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

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-3 mb-6">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild>
                    <Link to="/contact">
                      Get a Quote
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Image Thumbnails */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="grid grid-cols-2 gap-4">
                    {service.images.map((image, imgIndex) => (
                      <Link
                        key={imgIndex}
                        to={`/projects?category=${service.category}`}
                        className="group relative overflow-hidden rounded-lg shadow-card card-hover"
                      >
                        <img 
                          src={image} 
                          alt={`${service.title} project ${imgIndex + 1}`}
                          className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/60 transition-colors duration-300 flex items-center justify-center">
                          <ExternalLink className="h-8 w-8 text-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link 
                    to={`/projects?category=${service.category}`}
                    className="flex items-center gap-2 mt-4 text-primary font-medium hover:underline"
                  >
                    View all {service.category.toLowerCase()} projects
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
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
          <Button asChild variant="secondary" size="xl">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
