import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { 
  Phone, Shield, Award, Clock, Users, Home, Building2, 
  Wrench, Zap, ChevronRight, Star, MapPin 
} from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";
import projectKitchen from "@/assets/project-kitchen.jpg";
import projectLoft from "@/assets/project-loft.jpg";
import projectExtension from "@/assets/project-extension.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Construction site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/95 via-accent/80 to-accent/40" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-accent-foreground animate-fade-up">
            <p className="text-primary font-semibold mb-4 text-lg">Welcome to Alpha Global Builders</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Trusted. High Quality.{" "}
              <span className="text-primary">Responsible.</span>
            </h1>
            <p className="text-lg md:text-xl text-accent-foreground/90 mb-8 leading-relaxed">
              Residential and commercial construction across North West London. 
              7+ years of experience. Customer first approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                <a href="tel:+447123456789">
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver exceptional results through dedication, expertise, and a commitment to quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Trusted & Reliable",
                description: "7+ years of proven experience with hundreds of satisfied customers across North West London."
              },
              {
                icon: Award,
                title: "Quality Craftsmanship",
                description: "We take pride in every project, delivering superior finishes and attention to detail."
              },
              {
                icon: Clock,
                title: "On Time Delivery",
                description: "We respect your time. Projects completed on schedule with clear communication throughout."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-card p-8 rounded-lg shadow-card card-hover text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Services</h2>
              <p className="text-muted-foreground">Comprehensive building solutions for every need</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/services">
                View All Services
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Home, title: "Residential Construction", desc: "Extensions, loft conversions, renovations" },
              { icon: Wrench, title: "Kitchens & Bathrooms", desc: "Complete design and installation" },
              { icon: Building2, title: "Commercial Projects", desc: "Office fit-outs and retail spaces" },
              { icon: Users, title: "General Building", desc: "Brickwork, carpentry, painting" },
              { icon: MapPin, title: "Outdoor & Structural", desc: "Driveways, fencing, roofing" },
              { icon: Zap, title: "Energy & Smart Systems", desc: "Solar, heat pumps, smart wiring" },
            ].map((service, index) => (
              <Link 
                key={index}
                to="/services"
                className="group p-6 bg-card border border-border rounded-lg card-hover"
              >
                <div className="w-12 h-12 mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">See our latest completed work</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/projects">
                View All Projects
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: projectKitchen, title: "Modern Kitchen Renovation", location: "Stanmore" },
              { image: projectLoft, title: "Loft Conversion", location: "Harrow" },
              { image: projectExtension, title: "Rear Extension", location: "Edgware" },
            ].map((project, index) => (
              <Link 
                key={index}
                to="/projects"
                className="group relative overflow-hidden rounded-lg card-hover"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-accent-foreground">
                  <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                  <p className="text-accent-foreground/80 text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {project.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it — hear from our satisfied customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", location: "Stanmore", text: "Excellent work on our kitchen renovation. Professional team, clean and tidy. Highly recommend!" },
              { name: "David R.", location: "Harrow", text: "Alpha Global completed our loft conversion on time and budget. Outstanding quality throughout." },
              { name: "Emma T.", location: "Wembley", text: "Fantastic experience from start to finish. They explained every step clearly. Very happy with our extension." },
            ].map((review, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-card border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{review.text}"</p>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-muted-foreground text-sm">{review.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/testimonials">
                Read More Reviews
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="section-padding bg-accent text-accent-foreground">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Areas We Serve</h2>
            <p className="text-accent-foreground/80 max-w-2xl mx-auto">
              Providing quality construction services across North West London
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {["Stanmore", "Harrow", "Edgware", "Wembley", "Pinner", "Ruislip", "Northwood", "Bushey", "Watford", "Barnet"].map((area) => (
              <span 
                key={area}
                className="px-6 py-3 bg-accent-foreground/10 rounded-full text-accent-foreground font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">A Message from Our Founder</h2>
            <blockquote className="text-lg md:text-xl text-muted-foreground italic mb-6 leading-relaxed">
              "At Alpha Global Builders, we believe in honesty, patience, and explaining every step of the process. 
              Our commitment to quality finishing and customer satisfaction has been the foundation of our success 
              for over seven years. Every project, big or small, receives the same level of care and attention."
            </blockquote>
            <p className="font-bold text-lg">— The Alpha Global Builders Team</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get in touch today for a free consultation and quote. Let's bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="xl">
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:+447123456789">
                <Phone className="h-5 w-5" />
                07123 456 789
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
