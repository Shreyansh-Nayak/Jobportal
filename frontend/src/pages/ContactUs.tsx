import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log({ name, email, message });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      detail: "support@jobkonnect.com",
      link: "mailto:support@jobkonnect.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      detail: "+91-12345-67890",
      link: "tel:+911234567890"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      detail: "Pune, Maharashtra, India",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Whether you're a job seeker, an employer, or just curious — we'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground"
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-muted-foreground mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground"
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-muted-foreground mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground resize-none"
                    placeholder="Write your message here…"
                    rows={5}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg text-white font-semibold rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Contact Information</h2>
            
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.link}
                  className="block bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-border group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">{info.title}</h3>
                      <p className="text-muted-foreground">{info.detail}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white mt-8">
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <div className="space-y-2 opacity-90">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-75">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ or Additional CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Need Immediate Help?</h3>
          <p className="text-muted-foreground mb-6">
            Check out our FAQ section or reach out directly via phone for urgent inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all">
              View FAQ
            </button>
            <a 
              href="tel:+911234567890"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}