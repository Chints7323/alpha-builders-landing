import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Phone, ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";
import projectKitchen from "@/assets/project-kitchen.jpg";
import projectLoft from "@/assets/project-loft.jpg";
import projectBathroom from "@/assets/project-bathroom.jpg";
import projectExtension from "@/assets/project-extension.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import { CONTACT_INFO } from "@/lib/constants";

const serviceData: Record<string, {
  title: string;
  description: string;
  fullDescription: string;
  items: string[];
  images: string[];
  category: string;
}> = {
  "residential": {
    title: "Residential Construction & Renovation",
    description: "Transform your home with our comprehensive residential services.",
    fullDescription: "At Alpha Global Builders, we specialise in transforming houses into dream homes. Our residential construction and renovation services cover everything from complete new builds to thoughtful extensions and renovations. With over 7 years of experience in North West London, we understand the unique character of homes in this area and work to enhance both functionality and value.\n\nOur team takes a customer-first approach, ensuring you're involved at every stage of the process. We handle all aspects of residential construction including planning applications, structural work, and finishing touches. Whether you're looking to add space for a growing family or modernise your existing property, we deliver quality craftsmanship that stands the test of time.",
    items: ["House extensions", "Loft conversions", "Interior renovation", "Basement conversions", "New build homes", "Structural alterations", "Garage conversions", "Property refurbishment"],
    images: [projectExtension, projectLoft],
    category: "Residential"
  },
  "kitchens-bathrooms": {
    title: "Kitchens & Bathrooms",
    description: "Create beautiful, functional spaces with our expert installation services.",
    fullDescription: "The kitchen and bathroom are the heart of any home, and at Alpha Global Builders, we create spaces that combine stunning aesthetics with practical functionality. Our design-led approach ensures every project reflects your personal style while maximising the potential of your space.\n\nFrom contemporary minimalist designs to classic traditional styles, our skilled craftsmen deliver exceptional quality in every detail. We manage the entire process from initial design concepts through to final installation, including all plumbing, electrical work, tiling, and finishing. Our relationships with premium suppliers mean we can source beautiful materials at competitive prices.",
    items: ["Kitchen design & installation", "Bathroom renovation", "Wet rooms", "En-suite bathrooms", "Utility rooms", "Tiling & flooring", "Underfloor heating", "Bespoke cabinetry"],
    images: [projectKitchen, projectBathroom],
    category: "Kitchens"
  },
  "commercial": {
    title: "Commercial Construction",
    description: "Professional commercial construction services for businesses.",
    fullDescription: "Alpha Global Builders provides comprehensive commercial construction services tailored to businesses of all sizes across North West London. We understand that commercial projects require minimal disruption to your operations and strict adherence to timelines and budgets.\n\nOur commercial team has extensive experience in office fit-outs, retail spaces, restaurant builds, and warehouse conversions. We work closely with project managers, architects, and business owners to deliver spaces that enhance productivity, impress clients, and comply with all relevant regulations. From initial planning to handover, we maintain clear communication and professional standards throughout.",
    items: ["Office fit-outs", "Retail spaces", "Restaurant & hospitality", "Warehouse conversions", "Shop fronts", "Commercial renovations", "Suspended ceilings", "Partitioning systems"],
    images: [projectCommercial],
    category: "Commercial"
  },
  "general-building": {
    title: "General Building & Maintenance",
    description: "Reliable building and maintenance services for all property needs.",
    fullDescription: "Our general building and maintenance services cover all those essential works that keep your property in top condition. From minor repairs to complete decorating projects, our skilled tradespeople deliver quality workmanship with attention to detail.\n\nWe pride ourselves on reliability, cleanliness, and clear communication. Whether you need urgent repairs or planned maintenance work, our team responds promptly and works efficiently to minimise disruption. We're fully insured and all our work is guaranteed, giving you complete peace of mind.",
    items: ["Painting & decorating", "Brickwork & masonry", "Plastering", "Carpentry & joinery", "Door & window fitting", "General repairs", "Damp proofing", "Chimney repairs"],
    images: [projectExtension, projectLoft],
    category: "Residential"
  },
  "outdoor-structural": {
    title: "Outdoor & Structural",
    description: "Enhance your property's exterior with our outdoor construction services.",
    fullDescription: "Transform your outdoor spaces with Alpha Global Builders' comprehensive outdoor and structural services. We create beautiful, durable external features that enhance both the appearance and functionality of your property.\n\nFrom stunning driveways that make a great first impression to secure fencing and gates that provide privacy and security, our outdoor works are built to last. We also handle all roofing repairs and installations, guttering, and drainage works. Our structural expertise ensures all work meets building regulations and is completed to the highest standards.",
    items: ["Driveways & patios", "Fencing & gates", "Roofing repairs", "Guttering", "Garden walls", "Decking & landscaping", "Block paving", "Drainage solutions"],
    images: [projectExtension],
    category: "Extensions"
  },
  "energy-smart": {
    title: "Energy & Smart Systems",
    description: "Future-proof your property with energy-efficient solutions.",
    fullDescription: "As energy costs rise and environmental awareness grows, Alpha Global Builders helps you future-proof your property with modern energy and smart systems. Our certified installers work with leading manufacturers to bring you the latest in sustainable technology.\n\nFrom solar panel installations that reduce your electricity bills to heat pump systems that provide efficient heating and cooling, we guide you through the options and handle the entire installation process. We also specialise in smart home wiring, allowing you to control lighting, heating, and security from your phone. All our electrical work is carried out by qualified electricians and certified to current regulations.",
    items: ["Solar panel installation", "Heat pump systems", "Smart home wiring", "Electrical installations", "Plumbing services", "LED lighting upgrades", "EV charging points", "Home automation"],
    images: [projectLoft, projectKitchen],
    category: "Residential"
  }
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <>
        <SEO
          title="Service Not Found | Alpha Global Builders"
          description="The requested service page was not found. Browse our construction services in North West London."
          canonicalUrl="/services"
          noindex
        />
        <Layout>
          <section className="section-padding">
            <div className="container-custom text-center">
              <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
              <Button asChild>
                <Link to="/services">Back to Services</Link>
              </Button>
            </div>
          </section>
        </Layout>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${service.title} | Alpha Global Builders - North West London`}
        description={service.description + " Quality construction services in Stanmore, Harrow, Edgware and North West London."}
        canonicalUrl={`/services/${slug}`}
      />
      <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground section-padding">
        <div className="container-custom">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-accent-foreground/70 hover:text-accent-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-lg text-accent-foreground/90 max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none mb-8">
                {service.fullDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">What We Offer</h3>
              <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Gallery */}
              <h3 className="text-xl font-bold mb-4">Project Gallery</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {service.images.map((image, idx) => (
                  <Link
                    key={idx}
                    to={`/projects?category=${service.category}`}
                    className="group relative overflow-hidden rounded-lg"
                  >
                    <img 
                      src={image} 
                      alt={`${service.title} project ${idx + 1}`}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/40 transition-colors duration-300" />
                  </Link>
                ))}
              </div>

              <Button asChild>
                <Link to={`/projects?category=${service.category}`}>
                  View All {service.category} Projects
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-primary p-6 rounded-lg text-primary-foreground">
                <h3 className="text-xl font-bold mb-3">Get a Free Quote</h3>
                <p className="text-primary-foreground/90 mb-4">
                  Ready to start your project? Contact us today for a free consultation.
                </p>
                <div className="space-y-3">
                  <Button asChild variant="secondary" className="w-full">
                    <Link to="/contact">Request Quote</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <a href={`tel:${CONTACT_INFO.phone}`} className="gap-2">
                      <Phone className="h-4 w-4" />
                      Call {CONTACT_INFO.phoneAlt}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-3">Why Choose Us?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>8+ years experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Fully insured & certified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Free detailed quotes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Quality guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default ServiceDetail;
