import { Globe, Instagram, MapPin, Compass, Shield, Heart } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [showCoordinatesAlert, setShowCoordinatesAlert] = useState(false);

  const handleGlobeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCoordinatesAlert(!showCoordinatesAlert);
    setTimeout(() => {
      setShowCoordinatesAlert(false);
    }, 4000);
  };

  return (
    <footer className="bg-primary text-surface-bright border-t border-outline-variant/10">
      
      {/* 4-Column Luxury Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 px-6 md:px-20 py-16 md:py-24 max-w-[1440px] mx-auto select-none">
        
        {/* Col 1: Brand & Coordinates */}
        <div className="space-y-6">
          <div className="font-serif text-xl md:text-2xl font-semibold tracking-[0.2em] text-surface-bright">
            MIONI ROYAL SAN
          </div>
          <div className="space-y-3 font-sans text-xs md:text-sm text-primary-fixed-dim/90 font-light leading-relaxed">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-tertiary-fixed shrink-0 mt-0.5" />
              <span>
                Via Stazione, 10<br />
                35036 Montegrotto Terme (PD)<br />
                Italia
              </span>
            </p>
            <p className="text-[10px] text-tertiary-fixed font-semibold uppercase tracking-wider block pt-2">
              Sito d'Arte &amp; Benessere termale
            </p>
          </div>
        </div>

        {/* Col 2: Esplora */}
        <div className="space-y-4">
          <h6 className="font-sans text-[11px] font-bold text-tertiary-fixed tracking-[0.2em] uppercase">
            Esplora
          </h6>
          <ul className="space-y-3 font-sans text-xs text-primary-fixed-dim/75 font-light">
            <li>
              <a href="#suites" className="hover:text-surface-bright transition-colors">
                Camere &amp; Suite lussuose
              </a>
            </li>
            <li>
              <a href="#pools" className="hover:text-surface-bright transition-colors">
                Laguna Termale &amp; Piscine
              </a>
            </li>
            <li>
              <a href="#dining" className="hover:text-surface-bright transition-colors">
                Ristorazione &amp; Bistrot
              </a>
            </li>
            <li>
              <a href="#experiences" className="hover:text-surface-bright transition-colors">
                Rituali Benessere &amp; SPA Menu
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Contatti */}
        <div className="space-y-4">
          <h6 className="font-sans text-[11px] font-bold text-tertiary-fixed tracking-[0.2em] uppercase">
            Contatti
          </h6>
          <ul className="space-y-3 font-sans text-xs text-primary-fixed-dim/75 font-light">
            <li>
              <a href="tel:+390498911711" className="hover:text-surface-bright transition-colors block font-semibold text-surface-bright">
                T: +39 049 8911711
              </a>
            </li>
            <li>
              <a href="mailto:info@mionirivalsan.it" className="hover:text-surface-bright transition-colors block">
                E: info@mionirivalsan.it
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-surface-bright transition-colors block">
                Lavora con noi / Careers
              </a>
            </li>
            <li>
              <span className="text-secondary-fixed text-[10px] block font-medium">
                Reception attiva 24 ore su 24
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal & Socials */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h6 className="font-sans text-[11px] font-bold text-tertiary-fixed tracking-[0.2em] uppercase">
              Legal
            </h6>
            <ul className="space-y-2.5 font-sans text-xs text-primary-fixed-dim/75 font-light">
              <li>
                <a href="#" className="hover:text-surface-bright transition-colors">
                  Privacy Policy Alberghiera
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-surface-bright transition-colors">
                  Termini e Condizioni di Soggiorno
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-surface-bright transition-colors">
                  Cookie Settings &amp; GDPR
                </a>
              </li>
            </ul>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 items-center">
            <a
              href="#"
              onClick={handleGlobeClick}
              className="w-10 h-10 border border-outline-variant/30 flex items-center justify-center hover:bg-surface-bright hover:text-primary transition-all duration-300 rounded-none relative"
              aria-label="Sito Termale Internazionale"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 border border-outline-variant/30 flex items-center justify-center hover:bg-surface-bright hover:text-primary transition-all duration-300 rounded-none"
              aria-label="Instagram Mioni Royal San"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <AnimatePresence>
              {showCoordinatesAlert && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-24 bg-surface-container text-primary p-3 border border-outline-variant text-[11px] antialiased leading-relaxed tracking-wide z-10 max-w-xs font-mono rounded-none"
                >
                  <p className="font-bold text-tertiary uppercase text-[9.5px] tracking-widest mb-1">
                    Posizione Geografica
                  </p>
                  Coordinate: 45.3345° N, 11.7923° E <br />
                  Montegrotto Terme, Padova, Veneto, Italia.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Extreme Bottom Footnote */}
      <div className="px-6 md:px-20 py-8 border-t border-outline-variant/10 text-center bg-primary">
        <p className="font-sans text-[10px] text-primary-fixed-dim/40 uppercase tracking-[0.25em] font-medium leading-loose">
          © {new Date().getFullYear()} Hotel Mioni Royal San. All rights reserved. Benessere e lusso in Italia. P.IVA 01234567890.
        </p>
      </div>

    </footer>
  );
}
