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
      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-accent-foreground/90 leading-relaxed">
              Ready to discuss your project? Get in touch today for a free consultation and quote.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Matching reference layout */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form - Left side (larger) */}
            <div className="lg:col-span-3">
              <div className="bg-card p-8 rounded-lg shadow-card border border-border">
                <h2 className="text-2xl font-bold mb-6">Get a Free Quote</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
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
                    <div className="space-y-2">
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode / Area</Label>
                    <Input
                      id="postcode"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      placeholder="HA7 1XX or Stanmore"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your project, including any specific requirements or timeline..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Attach Files (optional)</Label>
                    <Input
                      id="file"
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload plans, photos, or documents (max 10MB per file)
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right side - Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information Card */}
              <div className="bg-card p-6 rounded-lg shadow-card border border-border">
                <h3 className="text-xl font-bold mb-5">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Phone</h4>
                      <a href="tel:+447123456789" className="text-foreground hover:text-primary">
                        07123 456 789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Email</h4>
                      <a href="mailto:info@alphaglobalbuilders.co.uk" className="text-foreground hover:text-primary text-sm">
                        info@alphaglobalbuilders.co.uk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Location</h4>
                      <p className="text-foreground text-sm">Stanmore, North West London</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Hours</h4>
                      <p className="text-foreground text-sm">Mon - Fri: 8:00am - 6:00pm</p>
                      <p className="text-foreground text-sm">Sat: 9:00am - 2:00pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Guarantee */}
              <div className="bg-primary p-6 rounded-lg text-primary-foreground">
                <h3 className="text-lg font-bold mb-2">Quick Response Guarantee</h3>
                <p className="text-sm text-primary-foreground/90">
                  We aim to respond to all enquiries within 24 hours. For urgent matters, please call us directly.
                </p>
              </div>

              {/* Areas We Cover */}
              <div className="bg-card p-6 rounded-lg shadow-card border border-border">
                <h3 className="text-xl font-bold mb-3">Areas We Cover</h3>
                <p className="text-muted-foreground text-sm">
                  Stanmore, Harrow, Edgware, Wembley, Pinner, Ruislip, Northwood, Bushey, Watford, Barnet, and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;