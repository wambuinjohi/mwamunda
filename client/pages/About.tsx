import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-in-down">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">About Mwamunda</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A trusted microcredit institution empowering micro and small businesses across Kenya since 2019
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold text-foreground mb-6">Who We Are</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We offer a range of financial products and services designed to meet the needs of people who are financially excluded. We are committed to providing high quality products and services that are affordable and accessible.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Wherever possible we work in partnership with other companies and agencies that share our goals. Most of our customers are ignored by the mainstream financial services industry and exploited by the sub-prime financial services industry.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                <strong className="text-primary">Our ultimate success</strong> will be when we have helped to put the loan sharks and predatory lenders out of business, ensuring that everyone has access to fair and honest financial services.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all group"
              >
                Get In Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-12 h-96 flex flex-col justify-center border border-primary/20">
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">2019</div>
                    <p className="text-muted-foreground">Year Founded</p>
                  </div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary"></div>
                  <p className="text-foreground leading-relaxed">
                    Founded with the mission to economically empower micro and small businesses that face operational challenges, especially in relation to finances.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-12 mb-20 animate-fade-in border border-primary/10">
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Journey & Impact</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a microcredit institution, we understand that small businesses face operational challenges especially in relation to finances. Therefore, we help these businesses commercialize products that meet the needs of clients while adapting the services and products in a way that allows the business to compete favorably in a versatile business environment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We also support farmers and agribusiness actors through training, capacity building and provision of financial services. We are passionate about supporting economically active individuals realize their goals of growing their business and farming enterprises – however small these may be.
                </p>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We have established our institution as a trusted micro lender in the communities where we are present, and have built a name for supporting smallholder farmers especially in the dairy sector.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our board of directors has members who are experienced in investment, microfinance, product development and treasury management. This wealth of knowledge and experience helps us serve these businesses and help them compete favorably in the business landscape of Kenya.
                </p>
              </div>
            </div>
          </div>

          {/* Presence Section */}
          <div className="mb-20 text-center animate-slide-in-up">
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Presence</h3>
            <p className="text-xl text-muted-foreground mb-8">
              We have many field agents eager to serve you. We have offices in every county.
            </p>
            <p className="text-lg text-primary font-semibold">
              Contact us to schedule a visit from one of our agents, or visit a Branch office near you.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission */}
          <div className="mb-20 animate-slide-in-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              To provide a differentiated financial service experience to our clients, a rewarding employment experience to our staff and a positive impact in the communities we serve. We deliver innovative financial solutions to small and mid-size businesses that are often underserved in the formal and informal sector.
            </p>
          </div>

          {/* Vision */}
          <div className="mb-20 animate-slide-in-right">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              To be the financing partner of choice in the markets where we operate. We believe that businesses should have equal opportunities to access financial products. Therefore, we position ourselves as one of the most reliable financial and advisory service organizations.
            </p>
          </div>

          {/* Values */}
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Core Values</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Integrity",
                  desc: "As a microcredit institution, we are honest in our work and stay aligned with the values of our company."
                },
                {
                  title: "Accountability",
                  desc: "We have an accountable team of experts that contribute to our success and that of the businesses we serve."
                },
                {
                  title: "Service Excellence",
                  desc: "Mwamunda Investment is proactive and responsive to the needs of our clients to ensure satisfaction and top notch results."
                },
                {
                  title: "Innovation",
                  desc: "Mwamunda believes in new ideas, practices and methods to help enhance product and service provision."
                },
                {
                  title: "Teamwork",
                  desc: "Our strength lies in combined expertise and ability to trust each other. We help businesses reach goals faster and more efficiently."
                },
                {
                  title: "Value to All Stakeholders",
                  desc: "We believe all stakeholders should experience highest returns. Shareholders, employees, community and businesses all benefit positively."
                }
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border hover:border-primary/50 bg-white hover:shadow-lg transition-all duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-6">Our Leadership</h2>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Our board of directors brings wealth of experience in investment, microfinance, product development and treasury management
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: "Investment Expert", field: "Strategic Investments" },
              { role: "Microfinance Specialist", field: "Financial Services" },
              { role: "Product Development", field: "Service Innovation" }
            ].map((member, idx) => (
              <div
                key={idx}
                className="text-center p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary/40" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{member.role}</h3>
                <p className="text-muted-foreground text-sm">{member.field}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -right-48 animate-float"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-in-down">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join the growing network of businesses and individuals who trust Mwamunda Investment Limited
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-primary font-semibold hover:shadow-xl transition-all transform hover:scale-105 group"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
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
                className="h-16 w-auto mb-4"
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
