import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { z } from "zod";

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

// Flexible UK phone validation: +44, 0, or just digits
const phoneSchema = z.string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number is too long")
  .refine((val) => {
    const cleaned = val.replace(/[\s\-\(\)]/g, '');
    // Accept: +447..., 07..., 7..., or any 10-11 digit number
    return /^(\+44|0)?[1-9]\d{9,10}$/.test(cleaned);
  }, "Please enter a valid UK phone number");

const emailSchema = z.string().email("Please enter a valid email address");

const nameSchema = z.string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name is too long");

const messageSchema = z.string()
  .min(10, "Please provide more details about your project")
  .max(2000, "Message is too long");

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    postcode: "",
    message: ""
  });

  const validateField = (field: string, value: string): string | null => {
    try {
      switch (field) {
        case 'name':
          nameSchema.parse(value);
          break;
        case 'email':
          emailSchema.parse(value);
          break;
        case 'phone':
          phoneSchema.parse(value);
          break;
        case 'message':
          messageSchema.parse(value);
          break;
      }
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || "Invalid input";
      }
      return "Invalid input";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field: string) => {
    const value = formData[field as keyof typeof formData];
    if (value) {
      const error = validateField(field, value);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: Record<string, string> = {};
    
    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validateField('phone', formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }
    
    const messageError = validateField('message', formData.message);
    if (messageError) newErrors.message = messageError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const isNetlifyEnvironment =
      typeof window !== "undefined" &&
      (window.location.hostname === "alphaglobalbuilders.uk" ||
        window.location.hostname.endsWith(".netlify.app"));

    try {
      if (isNetlifyEnvironment) {
        const formDataToSend = new URLSearchParams();
        formDataToSend.append("form-name", "contact");
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("service", formData.service);
        formDataToSend.append("postcode", formData.postcode);
        formDataToSend.append("message", formData.message);

        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formDataToSend.toString(),
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }
      } else {
        // In preview/non-Netlify environments we skip the network request
        console.warn("Skipping Netlify form POST in non-Netlify environment.");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        postcode: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting contact form", error);
      setErrors({ submit: "Something went wrong. Please try again or call us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="bg-accent text-accent-foreground pt-32 pb-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-accent-foreground/90 leading-relaxed">
                Ready to discuss your project? Get in touch today for a free consultation and quote.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-card p-12 rounded-lg shadow-card border border-border">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Your enquiry has been submitted successfully. Our team will review your project details and get back to you within 24 hours.
                </p>
                <p className="text-muted-foreground mb-8">
                  For urgent matters, please call us directly at{" "}
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-primary font-semibold hover:underline">
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </p>
                <Button onClick={() => setIsSubmitted(false)} size="lg">
                  Submit Another Enquiry
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16">
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
                
                {errors.submit && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    {errors.submit}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="space-y-5">
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="John Smith"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="john@example.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="07828 131 029"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Required *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => handleInputChange('service', value)}
                      >
                        <SelectTrigger className={errors.service ? "border-destructive" : ""}>
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
                      <input type="hidden" name="service" value={formData.service} />
                      {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode / Area</Label>
                    <Input
                      id="postcode"
                      name="postcode"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      placeholder="HA7 1XX or Stanmore"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Please describe your project, including any specific requirements or timeline..."
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
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
                      <a href={`tel:${CONTACT_INFO.phone}`} className="text-foreground hover:text-primary">
                        {CONTACT_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Email</h4>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-foreground hover:text-primary text-sm">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Location</h4>
                      <p className="text-foreground text-sm">{CONTACT_INFO.location}</p>
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
