import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Heart, Eye, Users, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-lg text-accent-foreground/90 leading-relaxed">
              Alpha Global Builders has been delivering quality construction services 
              across North West London for over 7 years. Learn more about our story, 
              values, and commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Alpha Global Builders was founded with a simple mission: to provide 
                  honest, high-quality construction services that homeowners and businesses 
                  can trust. Based in Stanmore, we've grown from a small team to one of 
                  North West London's most trusted building companies.
                </p>
                <p>
                  Over the past seven years, we've completed hundreds of projects ranging 
                  from kitchen renovations to full house transformations and commercial 
                  fit-outs. Our success is built on strong relationships, clear communication, 
                  and a commitment to delivering exceptional results every time.
                </p>
                <p>
                  Today, we continue to serve the communities of Stanmore, Harrow, Edgware, 
                  Wembley, and beyond with the same dedication and attention to detail that 
                  has defined us from day one.
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded-lg aspect-square flex items-center justify-center">
              <Users className="h-32 w-32 text-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Honesty",
                description: "We believe in transparent pricing, honest timelines, and straightforward communication at every stage."
              },
              {
                icon: Heart,
                title: "Patience",
                description: "We take the time to understand your vision and ensure every detail meets your expectations."
              },
              {
                icon: Eye,
                title: "Clarity",
                description: "We explain every step of the process clearly, so you always know what's happening with your project."
              },
              {
                icon: Award,
                title: "Quality",
                description: "We never compromise on quality finishing. Every project receives our full attention and expertise."
              }
            ].map((value, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-card text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card p-8 md:p-12 rounded-lg shadow-card border border-border">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                A Message from Our Founder
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  "When I started Alpha Global Builders, I wanted to create a construction 
                  company that I would want to hire myself - one built on trust, quality, 
                  and genuine care for our clients' projects."
                </p>
                <p>
                  "Our approach is simple: we treat every home as if it were our own. 
                  We take the time to explain each step of the process because we believe 
                  informed clients make better decisions. We're patient because good work 
                  takes time, and we're honest because that's the only way to build lasting 
                  relationships."
                </p>
                <p>
                  "Quality finishing isn't just about aesthetics - it's about delivering 
                  work that will stand the test of time. Whether it's a small bathroom 
                  renovation or a complete house transformation, every project receives 
                  our full commitment and expertise."
                </p>
                <p>
                  "Thank you for considering Alpha Global Builders for your project. 
                  We look forward to the opportunity to exceed your expectations."
                </p>
              </div>
              <p className="mt-6 font-bold text-lg text-center">— The Alpha Global Builders Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding bg-accent text-accent-foreground">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, text: "7+ years of experience" },
              { icon: Users, text: "Skilled, vetted tradespeople" },
              { icon: Clock, text: "On-time project delivery" },
              { icon: Shield, text: "Fully insured & certified" },
              { icon: Heart, text: "Customer-first approach" },
              { icon: Eye, text: "Clear, transparent pricing" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-accent-foreground/10 p-4 rounded-lg">
                <item.icon className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Ready to start your project? Get in touch for a free consultation.
          </p>
          <Button asChild variant="secondary" size="xl">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
