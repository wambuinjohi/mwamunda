import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-in-down">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're currently developing detailed service information. In the meantime, please feel free to contact us directly for specific service inquiries.
            </p>
            
            <div className="space-y-6 max-w-2xl mx-auto text-left">
              <div className="p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-foreground mb-2">Fair Personal Loans</h3>
                <p className="text-muted-foreground mb-4">
                  Affordable personal loans for individuals without access to mainstream finance
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="p-6 rounded-xl border border-border hover:border-secondary/50 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-foreground mb-2">Chama Loans</h3>
                <p className="text-muted-foreground mb-4">
                  Business group financing with capacity building support
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="p-6 rounded-xl border border-border hover:border-accent/50 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-foreground mb-2">Financial Advisory Services</h3>
                <p className="text-muted-foreground mb-4">
                  Expert debt advice and financial capability training
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-border">
              <p className="text-muted-foreground mb-6">
                Want to know more about a specific service?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all group"
              >
                Contact Our Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-lg">
                  M
                </div>
                <span className="font-bold text-lg">MWAMUNDA</span>
              </div>
              <p className="text-white/70 text-sm">
                Financial solutions for the underserved since 2019
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/services" className="text-white/70 hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
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
                <strong>Email:</strong><br />
                info@mwamunda.com
              </p>
              <p className="text-white/70 text-sm">
                <strong>Phone:</strong><br />
                0106673939 / 0784222284<br />
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
