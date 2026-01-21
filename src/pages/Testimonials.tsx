import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Quote } from "lucide-react";
import TestimonialSlider from "@/components/TestimonialSlider";
import { loadTestimonials, Testimonial } from "@/lib/projects-data";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials().then(loaded => {
      setTestimonials(loaded);
      setLoading(false);
    });
  }, []);

  // Convert to format expected by TestimonialSlider
  const testimonialData = testimonials.map(t => ({
    name: t.name,
    location: t.location,
    project: t.project,
    text: t.text,
    rating: t.rating
  }));

  return (
    <>
      <SEO
        title="Client Testimonials | Alpha Global Builders - Customer Reviews"
        description="Read reviews from our satisfied customers across North West London. 500+ completed projects with 5-star ratings for quality construction work."
        canonicalUrl="/testimonials"
      />
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
              <p className="text-4xl md:text-5xl font-bold mb-2">8+</p>
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
          {!loading && testimonialData.length > 0 && (
            <TestimonialSlider testimonials={testimonialData.slice(0, 5)} />
          )}
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">All Reviews</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading testimonials...</p>
            </div>
          ) : (
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
          )}
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
    </>
  );
};

export default Testimonials;
