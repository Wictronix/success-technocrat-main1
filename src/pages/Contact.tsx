import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Building,
  User,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import heroContact from "@/assets/hero-contact.jpg";

const FORMSPREE_URL = "https://formspree.io/f/mykzzpqb";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        form.reset();
      } else {
        throw new Error(result?.error || "Submission failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 931-635-1322",
      href: "tel:+919316351322",
    },
    {
      icon: Mail,
      title: "Email",
      value: "sales@successtechnocrat.com",
      href: "mailto:sales@successtechnocrat.com",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon–Sat: 9AM – 6PM",
      href: null,
    },
  ];

  const offices = [
    {
      title: "Registered Office",
      city: "Vadodara",
      address:
        "Darshanam Crossroad, Second Floor 224-225, Soma Talav Char Rasta, Vadodara 390025",
    },
    {
      title: "Branch Office",
      city: "Agra",
      address:
        "UG 5,6,7,8 Ganesh Plaza, Bye Pass Road, Sultanganj Ki Puliya, Agra 282004",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact Us - Success Technocrat | Get Free Solar Quote"
        description="Contact Success Technocrat for a free solar consultation and site survey. Call +91 931-635-1322 or email us."
        keywords="contact solar company, solar quote, free solar consultation"
        canonicalUrl="https://www.successtechnocrat.com/contact"
      />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroContact}
            alt="Solar Installation Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <nav className="flex justify-center gap-2 text-sm text-white/70 mb-6">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">Contact</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Ready to start your solar journey? Contact us for a free
              consultation and site survey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Section */}
      <main className="section-padding bg-background" ref={ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <div className="p-8 rounded-2xl bg-card border">
                <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden Fields */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Solar Inquiry - Success Technocrat"
                  />
                  <input type="hidden" name="_template" value="table" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input name="name" required placeholder="Full Name *" />
                    <Input
                      name="phone"
                      required
                      type="tel"
                      placeholder="Phone Number *"
                    />
                  </div>

                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />

                  <select
                    name="property_type"
                    className="w-full h-10 rounded-lg border px-3"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Other</option>
                  </select>

                  <Textarea
                    name="message"
                    placeholder="Tell us about your solar requirements..."
                    className="min-h-[120px]"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="space-y-8"
            >
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href || undefined}
                  className="flex items-center gap-4 p-4 rounded-xl border"
                >
                  <item.icon className="w-6 h-6 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {item.title}
                    </div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                </a>
              ))}

              {offices.map((office, i) => (
                <div key={i} className="p-6 rounded-xl border">
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <div className="font-semibold">{office.title}</div>
                  <div className="text-primary text-sm">{office.city}</div>
                  <p className="text-sm text-muted-foreground">
                    {office.address}
                  </p>
                </div>
              ))}

              <div className="p-6 rounded-xl bg-primary/10 border">
                {[
                  "Free consultation & site survey",
                  "No obligation quotes",
                  "Certified solar engineers",
                  "Response within 24 hours",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
