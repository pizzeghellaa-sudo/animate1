import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RESTAURANTS_DATA } from "../data";
import { Restaurant } from "../types";
import { X, ChefHat, Info } from "lucide-react";

export default function Dining() {
  const [activeRestaurantDetail, setActiveRestaurantDetail] = useState<Restaurant | null>(null);

  const handleOpenInfo = (item: Restaurant) => {
    setActiveRestaurantDetail(item);
  };

  return (
    <section id="dining" className="py-24 md:py-36 px-6 md:px-20 max-w-[1440px] mx-auto bg-surface-bright">
      {/* Editorial Title */}
      <div className="text-center mb-20 space-y-4">
        <span className="text-xs uppercase font-semibold text-tertiary tracking-[0.3em] block">
          Gusto e Raffinatezza
        </span>
        <h2 className="font-serif text-3xl md:text-5xl italic text-primary font-normal leading-tight">
          Esperienze Gastronomiche
        </h2>
        <div className="h-[1px] w-12 bg-tertiary-container mx-auto"></div>
      </div>

      {/* Grid containing Rhythmic asymmetry: second card offset on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-12">
        {RESTAURANTS_DATA.map((item, idx) => {
          const isOffset = idx === 1; // Double translation offsets center card
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: idx * 0.15 }}
              className={`relative h-[550px] md:h-[600px] overflow-hidden group border border-outline-variant/10 select-none ${
                isOffset ? "md:mt-20" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-all duration-500" />

              {/* Glassmorphic card overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-surface-bright/10 backdrop-blur-lg border-t border-surface-bright/20 transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-end min-h-[170px]">
                <h4 className="font-serif text-xl md:text-2xl text-surface-bright font-normal leading-tight">
                  {item.name}
                </h4>
                <p className="font-sans text-[10px] whitespace-nowrap overflow-ellipsis overflow-hidden font-bold tracking-widest text-surface-bright/80 mt-1 uppercase">
                  {item.subtitle}
                </p>

                {/* Secret description revealed on hover/focus */}
                <p className="mt-4 text-xs text-surface-bright/90 leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                  {item.description}
                </p>

                <button
                  onClick={() => handleOpenInfo(item)}
                  className="mt-4 flex items-center gap-1.5 text-surface-bright text-[10px] font-semibold uppercase tracking-wider hover:underline w-fit select-none"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Scopri Menù &amp; Filosofia</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Restaurant Philosophy Modal */}
      <AnimatePresence>
        {activeRestaurantDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRestaurantDetail(null)}
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface-bright text-primary border border-outline-variant/30 p-8 space-y-6 shadow-xl rounded-none overflow-hidden z-10"
            >
              <button
                onClick={() => setActiveRestaurantDetail(null)}
                className="absolute top-6 right-6 p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-none"
                aria-label="Chiudi Detail"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-semibold text-tertiary tracking-[0.2em] block">
                  {activeRestaurantDetail.category}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl italic text-primary font-normal">
                  {activeRestaurantDetail.name}
                </h3>
                <div className="h-[1px] w-12 bg-tertiary/40"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
                <div className="sm:col-span-4 max-h-[160px] overflow-hidden bg-surface-container">
                  <img
                    src={activeRestaurantDetail.image}
                    alt={activeRestaurantDetail.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-8 space-y-4 font-light text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  <p>{activeRestaurantDetail.fullDescription}</p>
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-primary uppercase">
                    <ChefHat className="w-4 h-4 text-tertiary" />
                    <span>È gradita la prenotazione • Abbigliamento smart casual</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-outline-variant/10">
                <button
                  onClick={() => {
                    setActiveRestaurantDetail(null);
                    alert("Grazie per l'interesse! Puoi richiedere la riserva del tavolo coordinandoti direttamente nel box Note del booking hotel, o contattando la reception.");
                  }}
                  className="bg-primary hover:bg-surface-tint text-surface-bright text-[10.5px] font-semibold uppercase tracking-widest px-6 py-3 rounded-none transition-colors"
                >
                  Richiedi un Tavolo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
