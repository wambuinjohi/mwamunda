import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ContactModal from "./ContactModal";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32 md:h-40">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F675a5c01881345b88968fcdd971866d7%2F7e6019eab478401686a679312028d4e8?format=webp&width=800"
              alt="Mwamunda Investment Limited"
              className="h-24 md:h-28 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-in-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsContactModalOpen(true);
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-center hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </nav>
  );
}
