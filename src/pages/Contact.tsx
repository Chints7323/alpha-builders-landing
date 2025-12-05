import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Residential Construction",
  "Loft Conversion",
  "House Extension",
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Commercial Fit-out",
  "General Building",
  "Outdoor/Structural",
  "Energy/Smart Systems",
  "Other"
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    postcode: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for your enquiry. We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      postcode: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Get in Touch</h1>
            <p className="text-accent-foreground/90">
              Ready to start your project? We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="bg-primary py-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a 
              href="tel:+447123456789" 
              className="flex items-center gap-2 text-primary-foreground font-semibold hover:underline"
            >
              <Phone className="h-5 w-5" />
              07123 456 789
            </a>
            <a 
              href="mailto:info@alphaglobalbuilders.co.uk" 
              className="flex items-center gap-2 text-primary-foreground font-semibold hover:underline"
            >
              <Mail className="h-5 w-5" />
              info@alphaglobalbuilders.co.uk
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <div className="bg-card p-6 md:p-8 rounded-lg shadow-card border border-border">
            <h2 className="text-2xl font-bold mb-2">Request a Free Quote</h2>
            <p className="text-muted-foreground mb-6">Fill in the form below and we'll get back to you shortly.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07123 456 789"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="postcode">Postcode / Area</Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="HA7 or Stanmore"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="service">Service Required *</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Project Details *</Label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="file">Attach Files (optional)</Label>
                <Input
                  id="file"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Photos, plans, or documents (max 10MB)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <a href="tel:+447123456789" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us Instead
                  </a>
                </Button>
              </div>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-secondary p-4 rounded-lg text-center">
              <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="font-medium text-sm">Stanmore, NW London</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg text-center">
              <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="font-medium text-sm">Mon-Fri 8am-6pm</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg text-center">
              <Phone className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="font-medium text-sm">24hr Response</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
