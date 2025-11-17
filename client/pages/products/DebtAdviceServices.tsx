import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  LifeBuoy,
  TrendingUp,
  FileText,
  Heart,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function DebtAdviceServices() {
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
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-20 left-10 animate-float"></div>
          <div
            className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl bottom-20 right-10 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-sm font-semibold text-blue-600">
                🆘 Debt Advice Services
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Take Control of Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-primary">
                {" "}
                Debt
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Expert guidance to help you manage and overcome debt challenges.
              Our advisors provide personalized strategies to improve your
              financial health and build a stronger financial future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-blue-500 to-primary text-white font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Get Expert Help
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-blue-500 text-blue-600 font-semibold text-sm sm:text-base hover:bg-blue-500/5 transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Debt Advice Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                icon: FileText,
                title: "Expert Debt Counseling",
                desc: "One-on-one sessions with experienced financial counselors to assess your situation.",
              },
              {
                icon: TrendingUp,
                title: "Personalized Repayment Plans",
                desc: "Customized strategies designed to help you pay off debt efficiently and effectively.",
              },
              {
                icon: Heart,
                title: "Financial Health Assessment",
                desc: "Comprehensive review of your finances to identify challenges and opportunities.",
              },
              {
                icon: LifeBuoy,
                title: "Ongoing Guidance and Support",
                desc: "Continuous support throughout your debt repayment journey to keep you on track.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-gradient-to-br from-blue-500/5 to-primary/5 border border-border hover:border-blue-500/30 transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              How We Help You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A step-by-step approach to debt freedom
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Assessment",
                desc: "We analyze your debt situation and create a clear picture of your finances.",
              },
              {
                step: "2",
                title: "Planning",
                desc: "Develop a realistic and achievable repayment strategy tailored to you.",
              },
              {
                step: "3",
                title: "Negotiation",
                desc: "We may help negotiate with creditors for better terms or settlements.",
              },
              {
                step: "4",
                title: "Support",
                desc: "Ongoing guidance to ensure you stay on track to debt freedom.",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative animate-slide-in-up">
                <div className="bg-white rounded-xl p-6 border border-border h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-primary text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
            Benefits of Our Service
          </h2>

          <ul className="space-y-4">
            {[
              "Reduced stress through professional guidance",
              "Clear, actionable debt repayment plans",
              "Improved credit score over time",
              "Better negotiation with creditors",
              "Financial literacy and money management skills",
              "Emotional support throughout the process",
              "Customized solutions for your unique situation",
            ].map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg bg-blue-50/50 border border-blue-200/30"
              >
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-lg text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-primary to-blue-500/80 opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -right-48 animate-float"></div>
          <div
            className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -left-48 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-in-down">
            Ready to Achieve Debt Freedom?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto animate-slide-in-up">
            Don't let debt control your life. Get expert advice and start your
            journey to financial freedom today.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            Request a Consultation
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
                src="https://cdn.builder.io/api/v1/image/assets%2F675a5c01881345b88968fcdd971866d7%2F7e6019eab478401686a679312028d4e8?format=webp&width=800"
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
                <li>
                  <Link
                    to="/products/fair-personal-loans"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Fair Personal Loans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/chama-loans"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Chama Loans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/debt-advice-services"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Debt Advice Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/financial-capability-training"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Financial Capability Training
                  </Link>
                </li>
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
