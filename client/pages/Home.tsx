import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Shield, Award, Target } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-20 pb-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl top-20 left-10 animate-float"></div>
          <div className="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-sm font-semibold text-primary">🚀 Empowering Financial Inclusion</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Financial Solutions for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Underserved</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Mwamunda Investment Limited provides affordable, accessible financial products designed to help micro and small businesses thrive. We're committed to putting predatory lenders out of business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/about"
                  className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex gap-8 mt-12 pt-8 border-t border-border">
                <div className="animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
                  <div className="text-3xl font-bold text-primary">2019</div>
                  <p className="text-sm text-muted-foreground">Founded</p>
                </div>
                <div className="animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
                  <div className="text-3xl font-bold text-secondary">47+</div>
                  <p className="text-sm text-muted-foreground">Counties Served</p>
                </div>
                <div className="animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
                  <div className="text-3xl font-bold text-accent">1000s</div>
                  <p className="text-sm text-muted-foreground">Families Empowered</p>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
              <div className="relative w-full h-96 md:h-full min-h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block p-6 bg-white rounded-2xl shadow-xl mb-6">
                        <TrendingUp className="w-16 h-16 text-primary animate-bounce" style={{ animationDelay: "0.1s" }} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Growing Together</h3>
                      <p className="text-white/80 mt-2">Your success is our mission</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Mwamunda?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're dedicated to providing financial solutions that actually work for underserved communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Trusted Partner",
                description: "Established micro-credit institution with proven track record in communities across Kenya"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Focused",
                description: "We understand the unique needs of micro and small businesses and farmers"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Fast Approval",
                description: "Quick processing and affordable terms designed for those excluded by mainstream finance"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Expert Team",
                description: "Experienced board members in investment, microfinance, and product development"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Field Agents",
                description: "Our dedicated agents are eager to serve you across every county in Kenya"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Accessible",
                description: "Honest, affordable financial products for those ignored by predatory lenders"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Financial Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions for individuals and business groups
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 animate-slide-in-left">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 transition-all duration-300">
                <Users className="w-24 h-24 text-primary/40 group-hover:text-primary/60 transition-colors" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Fair Personal Loans</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Affordable personal loans designed for individuals without access to mainstream finance. Quick approval process with terms that work for you.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Quick approval process", "Affordable interest rates", "Flexible repayment terms", "Debt advice support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group/link"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="group rounded-3xl overflow-hidden border border-border hover:border-secondary/50 transition-all duration-300 animate-slide-in-right">
              <div className="h-48 bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center group-hover:from-secondary/30 transition-all duration-300">
                <Target className="w-24 h-24 text-secondary/40 group-hover:text-secondary/60 transition-colors" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Chama Loans</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Specialized financing for business groups and cooperatives. Perfect for groups looking to scale operations and support collective growth.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Group-focused financing", "Capacity building support", "Training programs included", "Competitive rates"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all group/link"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What drives us every day in serving our communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Integrity", desc: "Honest work aligned with company values" },
              { title: "Accountability", desc: "Expert team committed to your success" },
              { title: "Service Excellence", desc: "Proactive and responsive to client needs" },
              { title: "Innovation", desc: "New ideas and methods for better solutions" },
              { title: "Teamwork", desc: "Combined expertise reaching goals faster" },
              { title: "Value to All", desc: "Positive returns for all stakeholders" }
            ].map((value, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border hover:border-primary/30 transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary/80 opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -right-48 animate-float"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -left-48 animate-float" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-in-down">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-slide-in-up">
            Join thousands of individuals and businesses who've transformed their financial future with Mwamunda Investment Limited.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-lg bg-white text-primary font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
            >
              Contact Us Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Explore Our Story
            </Link>
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
