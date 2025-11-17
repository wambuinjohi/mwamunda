import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home } from "lucide-react";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative pt-32 md:pt-40 pb-20 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl top-20 left-10 animate-float"></div>
          <div className="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-8 animate-slide-in-down">
            <div className="inline-block p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-primary/20 mb-8">
              <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                404
              </h1>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-slide-in-up">
            Page Not Found
          </h2>

          <p className="text-xl text-muted-foreground mb-12 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
            We couldn't find the page you're looking for. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <Home className="w-5 h-5" />
              Go Back Home
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all"
            >
              Contact Support
            </Link>
          </div>

          <p className="mt-12 text-muted-foreground text-sm">
            Need help? <Link to="/contact" className="text-primary font-semibold hover:underline">Contact our team</Link>
          </p>
        </div>
      </section>

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
};

export default NotFound;
