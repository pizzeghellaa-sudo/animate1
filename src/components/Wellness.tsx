import { useState } from "react";
import { ChevronRight, Sparkles, Clock, Compass, Activity, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TREATMENTS_DATA } from "../data";
import { Treatment } from "../types";

interface WellnessProps {
  onOpenSpaMenu: () => void;
  onSelectTreatmentForBooking: (id: string) => void;
}

export default function Wellness({ onOpenSpaMenu, onSelectTreatmentForBooking }: WellnessProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const treatments = TREATMENTS_DATA.slice(0, 3);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experiences" className="py-24 md:py-36 bg-surface-container overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Block: Interactive Rituals Description */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-xs uppercase font-semibold text-tertiary tracking-[0.3em] block">
                Esperienze di Cura Suprema
              </span>
              <h2 className="font-serif text-3xl md:text-5xl italic text-primary font-normal leading-tight">
                Rituali di Bellezza
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant font-light max-w-md">
                Un'antica simbologia del benessere attualizzata da esperti terapisti termali. Clicca sui rituali per comprenderne l'esatta esecuzione e i benefici clinici profondi.
              </p>
            </div>

            {/* List Accordion */}
            <div className="space-y-0 divide-y divide-outline-variant/30 border-y border-outline-variant/30">
              {treatments.map((t, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <div key={t.id} className="group py-5 transition-all">
                    <button
                      onClick={() => handleToggle(idx)}
                      className="w-full flex justify-between items-center text-left hover:pl-2 transition-all cursor-pointer focus:outline-none"
                    >
                      <h5 className="font-serif text-lg md:text-xl font-normal text-primary group-hover:text-tertiary transition-colors italic">
                        {t.name}
                      </h5>
                      <span
                        className={`text-on-surface-variant group-hover:text-primary transition-all duration-300 ${
                          isExpanded ? "rotate-90 text-tertiary" : ""
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-2 pr-6 space-y-4">
                            <p className="font-sans text-xs md:text-sm text-on-surface-variant font-light leading-relaxed">
                              {t.description}
                            </p>

                            {/* Internal parameters */}
                            <div className="flex gap-6 text-[10px] font-bold text-tertiary uppercase tracking-wide">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-tertiary-container" />
                                <span>Durata: {t.duration} minuti</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-tertiary-container" />
                                <span>Prezzo: € {t.price}</span>
                              </span>
                            </div>

                            {/* Mini checklists */}
                            <div className="bg-surface-bright/70 border border-outline-variant/10 p-4 space-y-2">
                              <span className="text-[9px] uppercase font-bold text-primary tracking-wider block">
                                Indicazioni Clinico Estetiche:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {t.benefits.slice(0, 4).map((b, bIdx) => (
                                  <div key={bIdx} className="flex items-start gap-1 text-[11px] text-on-surface-variant font-light">
                                    <span className="p-0.5 text-tertiary shrink-0 mt-0.5"><Check className="w-3 h-3" /></span>
                                    <span>{b}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Quick Reserve Item Button */}
                            <button
                              onClick={() => onSelectTreatmentForBooking(t.id)}
                              className="bg-primary text-surface-bright text-[9.5px] font-semibold uppercase tracking-widest px-4 py-2 hover:bg-surface-tint transition-colors rounded-none"
                            >
                              Includi nel Soggiorno
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* SPA Menu link block */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={onOpenSpaMenu}
                className="w-full sm:w-auto px-10 py-4 border border-primary text-primary font-semibold text-xs tracking-widest hover:bg-primary hover:text-surface-bright transition-all duration-500 uppercase rounded-none cursor-pointer"
              >
                Scarica lo SPA Menu
              </button>
              <div className="flex items-center gap-2 text-on-surface-variant/70 text-[10px] uppercase font-medium">
                <Activity className="w-4 h-4 text-secondary animate-pulse" />
                <span>Fanghi brevettati O.T.P. livello terapeutico</span>
              </div>
            </div>
          </div>

          {/* Right Block: Therapeutic Stone Picture */}
          <div className="relative">
            {/* Ambient gold/aqua bubble background glow */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-[80px]"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4 }}
              className="relative z-10 w-full overflow-hidden border border-outline-variant/20 shadow-sm"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq9Aynm1mlCbdbtu40WS0yZmic8JinVgrFxNTlpQWjUcG9ZwmAAzmd2IZmB9jvjw8L4xqcLdLX67e14YXVoKs3OfvllTlk5OfQD-tKn5u9W0WaFpJw_zmPTa4Vho9DC46yj2KxIscwY3J2kuFTrsomgwVMS_nD8U8LIH0zgdX-nmKos8nV80upoQZ3jQDBh85PtpjLO_yhHmkUDlV8go7ci7ey4qbYvUbgbYQdevOrTAg437GCykHBMOjpkOlOY1A92Ue18voP-fw"
                alt="Stone Massage Mioni Royal San"
                className="w-full h-[450px] md:h-[600px] object-cover grayscale-[20%] sepia-[10%] hover:grayscale-0 transition-all duration-1000 rounded-none transform hover:scale-102"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
