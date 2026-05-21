import React, { useState, useEffect } from "react";
import { Menu, X, Hotel } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenSpaMenu: () => void;
}

export default function Navbar({ onOpenBooking, onOpenSpaMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Camere & Suite", href: "#suites" },
    { label: "Terme & SPA", href: "#pools" },
    { label: "Ristorazione", href: "#dining" },
    { label: "Esperienze", href: "#experiences" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out border-b border-outline-variant/10 ${
          isScrolled
            ? "bg-surface-bright/95 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-lg md:text-2xl font-semibold tracking-[0.2em] text-primary"
          >
            MIONI ROYAL SAN
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 items-center">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-on-surface-variant hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Booking Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-primary hover:bg-surface-tint text-surface-bright text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-3 md:px-8 transition-colors duration-300 rounded-none cursor-pointer"
            >
              Prenota Ora
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-primary hover:bg-surface-container transition-colors rounded-none"
              aria-label="Apri Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 bg-surface-bright/98 backdrop-blur-md flex flex-col justify-between p-8"
          >
            <div className="flex flex-col gap-6 mt-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-serif text-2xl font-normal text-primary hover:text-tertiary italic transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="h-[1px] w-full bg-outline-variant/30 my-2"></div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSpaMenu();
                }}
                className="font-sans text-xs font-semibold uppercase tracking-wider text-left text-tertiary hover:opacity-80"
              >
                Sfoglia Listino SPA
              </button>
            </div>

            <div className="space-y-4 text-xs text-on-surface-variant/80 border-t border-outline-variant/20 pt-6 font-light">
              <p>MIONI ROYAL SAN Hotel &amp; Thermal Baths</p>
              <p>Via Stazione, 10 • Montegrotto Terme (PD)</p>
              <p className="font-semibold text-primary">T: +39 049 8911711</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
