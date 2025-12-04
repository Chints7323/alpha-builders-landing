import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Quote } from "lucide-react";
import TestimonialSlider from "@/components/TestimonialSlider";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Stanmore",
    project: "Kitchen Renovation",
    text: "Excellent work on our kitchen renovation. The team was professional, clean, and tidy throughout the entire process. They kept us informed at every stage and the final result exceeded our expectations. Highly recommend Alpha Global Builders!",
    rating: 5
  },
  {
    name: "David Richardson",
    location: "Harrow",
    project: "Loft Conversion",
    text: "Alpha Global completed our loft conversion on time and within budget. Outstanding quality throughout. The attention to detail was impressive and they managed all the planning permissions for us. Our new master suite is absolutely stunning.",
    rating: 5
  },
  {
    name: "Emma Thompson",
    location: "Wembley",
    project: "House Extension",
    text: "Fantastic experience from start to finish. They explained every step clearly and were always available to answer questions. Very happy with our new extension - it's transformed how we use our home.",
    rating: 5
  },
  {
    name: "James Patterson",
    location: "Edgware",
    project: "Bathroom Renovation",
    text: "We hired Alpha Global for two bathroom renovations. Both completed to an excellent standard. The team was respectful of our home and cleaned up daily. Would definitely use again and have recommended to friends.",
    rating: 5
  },
  {
    name: "Lisa Chen",
    location: "Pinner",
    project: "Full House Renovation",
    text: "Complete renovation of our 1930s semi. The project was complex but the team handled everything brilliantly. From structural work to final finishes, the quality has been exceptional. Our home is unrecognisable!",
    rating: 5
  },
  {
    name: "Michael O'Brien",
    location: "Northwood",
    project: "Commercial Fit-out",
    text: "We engaged Alpha Global for our office fit-out. Professional from the first meeting to handover. They worked around our business hours and delivered a modern, functional space. Great value for money.",
    rating: 5
  },
  {
    name: "Amanda Hughes",
    location: "Bushey",
    project: "Rear Extension",
    text: "The team added a stunning rear extension to our property. The bi-fold doors and open plan layout have completely changed how we live. Communication was excellent throughout - no surprises on cost or timeline.",
    rating: 5
  },
  {
    name: "Robert Singh",
    location: "Barnet",
    project: "Driveway & Landscaping",
    text: "New driveway and complete front garden landscaping. The transformation is incredible. Neighbours have commented on how much it's improved the street appeal. Professional team and fair pricing.",
    rating: 5
  },
  {
    name: "Catherine Williams",
    location: "Stanmore",
    project: "Kitchen Extension",
    text: "Our kitchen extension has given us the family space we always wanted. The project was managed seamlessly and the finish quality is superb. Thank you Alpha Global for making our dream kitchen a reality!",
    rating: 5
  },
  {
    name: "Tom Baker",
    location: "Harrow",
    project: "Electrical Upgrade",
    text: "Full rewire of our property plus smart home installation. The electricians were knowledgeable and took time to explain the system. Everything works perfectly. Very pleased with the service.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Testimonials</h1>
            <p className="text-lg text-accent-foreground/90 leading-relaxed">
              Don't just take our word for it. Read what our clients have to say about 
              their experience working with Alpha Global Builders.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-primary-foreground">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">7+</p>
              <p className="text-primary-foreground/80">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">500+</p>
              <p className="text-primary-foreground/80">Projects Completed</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">98%</p>
              <p className="text-primary-foreground/80">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">5.0</p>
              <p className="text-primary-foreground/80">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Slider */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Reviews</h2>
            <p className="text-muted-foreground">Hear directly from our satisfied clients</p>
          </div>
          <TestimonialSlider testimonials={testimonials.slice(0, 5)} />
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">All Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card p-6 md:p-8 rounded-lg shadow-card border border-border card-hover"
              >
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.location} • {testimonial.project}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch today for a free consultation and see why our clients rate us so highly.
          </p>
          <Button asChild size="xl">
            <Link to="/contact">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
