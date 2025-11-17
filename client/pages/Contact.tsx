import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-in-down">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out to our team
              today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Email */}
            <div className="text-center p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-slide-in-up">
              <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
              <a
                href="mailto:info@mwamunda.com"
                className="text-primary hover:underline mb-2 block"
              >
                info@mwamunda.com
              </a>
              <a
                href="mailto:mwamundainvestment@gmail.com"
                className="text-primary hover:underline block"
              >
                Mwamundainvestment@gmail.com
              </a>
              <p className="text-muted-foreground text-sm mt-4">
                We'll respond within 24 hours
              </p>
            </div>

            {/* Phone */}
            <div
              className="text-center p-8 rounded-2xl border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300 animate-slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-4">
                Phone & WhatsApp
              </h3>
              <div className="space-y-2">
                <a
                  href="tel:+254106673939"
                  className="text-primary hover:underline block font-semibold"
                >
                  0106673939
                </a>
                <a
                  href="tel:+254784222284"
                  className="text-primary hover:underline block font-semibold"
                >
                  0784222284
                </a>
                <a
                  href="tel:+254708192783"
                  className="text-primary hover:underline block font-semibold"
                >
                  0708192783
                </a>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                Call / SMS / WhatsApp anytime
              </p>
            </div>

            {/* Address */}
            <div
              className="text-center p-8 rounded-2xl border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 animate-slide-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-4">
                Head Office
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hussein Mayai Road
                <br />
                Opposite Kadzomba Plaza, Room 8<br />
                Kilifi, Kenya
                <br />
                <br />
                <strong className="text-foreground">P.O. Box 964</strong>
              </p>
            </div>
          </div>

          {/* Alternative Location */}
          <div className="mb-20 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 border border-primary/20 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Kilifi Branch Office
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Address:</strong> Edrine's
              Plaza Building, Ground Floor, Po.box 964 Kilifi
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Phone:</strong> 0708192783 /
              0784222284
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-in-down">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as
              possible
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 animate-slide-in-up"
          >
            {submitted && (
              <div className="p-6 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3 animate-slide-in-down">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-green-700">
                    Thank you for reaching out. We'll be in touch shortly.
                  </p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="+254 7XX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="personal-loan">Personal Loan Inquiry</option>
                  <option value="chama-loan">Chama Loan Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                placeholder="Tell us how we can help..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              Send Message
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-8">
            * Required fields
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Find Us
          </h2>

          <div className="rounded-2xl overflow-hidden border border-border h-96 md:h-96 animate-fade-in">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.5234567890!2d39.5196!3d-3.2869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMwamunda%20Investment%20Limited!5e0!3m2!1sen!2ske!4v1234567890"
            ></iframe>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-8">
            Located in Kilifi, Kenya. We serve all 47 counties with field
            agents.
          </p>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Get In Touch?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Loan Inquiries",
                desc: "Whether you're interested in a personal loan or chama loan, our team can guide you through the process",
              },
              {
                title: "Schedule a Visit",
                desc: "Request a visit from one of our field agents or arrange to visit a branch office near you",
              },
              {
                title: "Partnerships",
                desc: "Interested in partnering with us? We'd love to explore opportunities together",
              },
              {
                title: "Debt Advice",
                desc: "Struggling with debt? Our financial advisors can help you develop a better strategy",
              },
              {
                title: "Capacity Building",
                desc: "Learn about our training programs and financial capability services",
              },
              {
                title: "Business Support",
                desc: "Get expert advice on growing your business with our microfinance solutions",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Ffbf49e0b8b244100b448033b1a23a70b%2F92cea3121dc44b17903ff04a0698d8d8?format=webp&width=400"
                alt="Mwamunda Investment Limited"
                className="h-32 w-auto mb-4"
              />
              <p className="text-white/70 text-sm">
                Financial solutions for the underserved since 2019
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-white/70">Fair Personal Loans</li>
                <li className="text-white/70">Chama Loans</li>
                <li className="text-white/70">Debt Advice Services</li>
                <li className="text-white/70">Financial Capability Training</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-white/70 text-sm mb-3">
                <strong>Email:</strong>
                <br />
                info@mwamunda.com
              </p>
              <p className="text-white/70 text-sm">
                <strong>Phone:</strong>
                <br />
                0106673939 / 0784222284
                <br />
                0708192783
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-white/60 text-sm">
              &copy; 2024 Mwamunda Investment Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
