import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function FinancialCapabilityTraining() {
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
          <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl top-20 left-10 animate-float"></div>
          <div
            className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl bottom-20 right-10 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <span className="text-sm font-semibold text-amber-600">
                📚 Financial Capability Training
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Build Your Financial
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-primary">
                {" "}
                Literacy
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive training programs designed to empower individuals
              with essential money management skills for sustainable financial
              success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-amber-500 to-primary text-white font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Enroll Now
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-amber-500 text-amber-600 font-semibold text-sm sm:text-base hover:bg-amber-500/5 transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Training Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Diverse learning paths for every financial stage
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                icon: BookOpen,
                title: "Money Management Basics",
                desc: "Learn fundamental principles of budgeting, saving, and spending wisely.",
              },
              {
                icon: TrendingUp,
                title: "Budgeting and Savings Strategies",
                desc: "Master techniques to create effective budgets and build emergency funds.",
              },
              {
                icon: Award,
                title: "Investment Fundamentals",
                desc: "Understand investment options, risks, and how to grow your wealth.",
              },
              {
                icon: Users,
                title: "Financial Planning Workshops",
                desc: "Interactive sessions on goal-setting, retirement planning, and wealth building.",
              },
            ].map((program, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-gradient-to-br from-amber-500/5 to-primary/5 border border-border hover:border-amber-500/30 transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <program.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {program.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Levels Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Training Levels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Progression paths for all experience levels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                level: "Beginner",
                description: "Start your financial literacy journey",
                topics: [
                  "Basic budgeting",
                  "Emergency funds",
                  "Savings habits",
                  "Understanding credit",
                ],
              },
              {
                level: "Intermediate",
                description: "Deepen your financial knowledge",
                topics: [
                  "Investment basics",
                  "Tax planning",
                  "Debt management",
                  "Insurance planning",
                ],
              },
              {
                level: "Advanced",
                description: "Master wealth creation strategies",
                topics: [
                  "Portfolio management",
                  "Retirement planning",
                  "Business finance",
                  "Advanced investing",
                ],
              },
            ].map((level, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-border hover:border-amber-500/30 transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {level.level}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {level.description}
                </p>
                <ul className="space-y-3">
                  {level.topics.map((topic, tidx) => (
                    <li
                      key={tidx}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Benefits Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
            What You'll Gain
          </h2>

          <ul className="space-y-4">
            {[
              "Confidence in financial decision-making",
              "Practical skills for day-to-day money management",
              "Understanding of personal finance concepts",
              "Ability to plan for future financial goals",
              "Tools to build and maintain good credit",
              "Knowledge to protect yourself financially",
              "Community support from fellow learners",
              "Certificate of completion for your resume",
            ].map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg bg-amber-50/50 border border-amber-200/30"
              >
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <span className="text-lg text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery Methods Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              How We Train
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible learning options to fit your schedule
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "In-Person Workshops",
                desc: "Interactive group sessions in convenient locations with hands-on learning activities.",
              },
              {
                title: "Online Courses",
                desc: "Self-paced learning from anywhere with video lessons, quizzes, and resources.",
              },
              {
                title: "One-on-One Coaching",
                desc: "Personalized sessions tailored to your specific financial situation and goals.",
              },
            ].map((method, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-border text-center animate-slide-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {method.title}
                </h3>
                <p className="text-muted-foreground">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-primary to-amber-500/80 opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -right-48 animate-float"></div>
          <div
            className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -left-48 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-in-down">
            Start Your Financial Learning Journey Today
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto animate-slide-in-up">
            Invest in yourself and take control of your financial future through
            quality education and practical skills.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            Enroll Now
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
