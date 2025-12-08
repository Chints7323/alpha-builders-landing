import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Heart, Eye, Users, Award, Clock, Target, Sparkles } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Alpha Global Builders</span>
            </h1>
            <p className="text-lg text-accent-foreground/90 leading-relaxed">
              <span className="text-primary font-semibold">Building</span> Trust. <span className="text-primary font-semibold">Maintaining</span> Relationships. <span className="text-primary font-semibold">Renovating</span> Dreams.
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
                  <span className="text-primary font-semibold">Alpha Global Builders</span> started with a simple ambition: 
                  to build something meaningful. What began as hands-on work in gardens and outdoor spaces 
                  grew into a genuine passion for construction — from fences and patios to complete home transformations.
                </p>
                <p>
                  Over eight years, we've learned the trade inside out. Not from textbooks, but from 
                  real projects, real challenges, and real customers who trusted us with their homes. 
                  That hands-on experience shaped who we are today: a team that understands what it 
                  takes to deliver quality work, on time, without cutting corners.
                </p>
                <p>
                  Today, we specialise in interior renovations and house extensions across North West London — 
                  the kind of projects where attention to detail makes all the difference. We've grown, 
                  but our approach hasn't changed: treat every home like it's our own, and every customer like family.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every project we take on
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Honesty First",
                description: "We give truthful recommendations — even if it means saving you money. No surprises, no hidden costs."
              },
              {
                icon: Heart,
                title: "Patience & Care",
                description: "Good work takes time. We'd rather do it right than rush through and regret it later."
              },
              {
                icon: Eye,
                title: "Clear Communication",
                description: "We explain every step of the process. You'll always know exactly what's happening with your project."
              },
              {
                icon: Award,
                title: "Quality Without Compromise",
                description: "We take time to perfect the details. Every finish, every corner, every joint — done properly."
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

      {/* What Sets Us Apart */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card p-8 md:p-12 rounded-lg shadow-card border border-border">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                What Makes <span className="text-primary">Alpha Global Builders</span> Different?
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We focus on honest and reliable work whilst thinking of our customers as family. 
                  That's not just a line — it's how we operate. We take time to focus on the details 
                  because that's what creates lasting quality.
                </p>
                <p>
                  When you work with us, you get truthful recommendations. Sometimes that means we'll 
                  suggest a simpler solution that costs less. We'd rather earn your trust than make 
                  a quick sale.
                </p>
                <p>
                  We're always on site, monitoring the work, calling out any issues before they become 
                  problems. And if something unexpected comes up? We take a step back, think it through, 
                  explain what's happened, and find the right solution together.
                </p>
                <p>
                  Most of our work comes from recommendations — and that says everything. When your 
                  customers become your best marketing, you know you're doing something right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-card">
              <div className="w-14 h-14 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To deliver construction work that we'd be proud to have in our own homes. 
                Every project, every customer, every detail — treated with the same care and respect.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-card">
              <div className="w-14 h-14 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                To build a reputation as one of London's most trusted builders — not through marketing, 
                but through the quality of our work and the relationships we build along the way.
              </p>
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
              { icon: Award, text: "8+ years of hands-on experience" },
              { icon: Users, text: "Skilled, trusted tradespeople" },
              { icon: Clock, text: "On-time project delivery" },
              { icon: Shield, text: "Fully insured & certified" },
              { icon: Heart, text: "Customers treated like family" },
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
