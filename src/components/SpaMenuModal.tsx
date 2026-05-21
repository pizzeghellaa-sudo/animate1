import { useState } from "react";
import { X, Clock, Euro, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TREATMENTS_DATA } from "../data";

interface SpaMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTreatmentForBooking?: (treatmentId: string) => void;
}

export default function SpaMenuModal({ isOpen, onClose, onSelectTreatmentForBooking }: SpaMenuModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (!isOpen) return null;

  const categories = [
    { id: "all", name: "Tutti i Rituali" },
    { id: "fango", name: "Fango Termale Euganeo" },
    { id: "massaggio", name: "Massaggi Rigeneranti" },
    { id: "percorso", name: "Percorsi Termali & Acqua" },
    { id: "viso", name: "Dermoestetica Viso & Antiage" },
  ];

  const filteredTreatments = selectedCategory === "all"
    ? TREATMENTS_DATA
    : TREATMENTS_DATA.filter(t => t.category === selectedCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-primary/80 backdrop-blur-md"
        />

        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-5xl bg-surface-bright text-primary p-0 border border-outline-variant/30 shadow-none rounded-none overflow-hidden"
          >
            {/* Header banner */}
            <div className="relative py-12 px-8 md:px-12 bg-surface-container text-center border-b border-outline-variant/30">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high rounded-none"
                aria-label="Chiudi"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="text-xs uppercase font-semibold text-tertiary tracking-[0.3em] block mb-2">
                Mioni Royal San
              </span>
              <h2 className="font-serif text-3xl md:text-5xl italic font-normal text-primary">
                Listino Trattamenti &amp; Benessere
              </h2>
              <div className="h-[1px] w-24 bg-tertiary-container mx-auto mt-6 mb-4"></div>
              <p className="text-xs md:text-sm text-on-surface-variant max-w-xl mx-auto font-light leading-relaxed">
                Le virtù straordinarie delle nostre acque ipertermali salsobromoiodiche e delle argille biologiche brevettate di Montegrotto Terme, unite alla manualità di professionisti d'eccezione.
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center border-b border-outline-variant/10 bg-surface-container-lowest py-3 px-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 border-b-2 text-[11px] font-semibold tracking-wider uppercase transition-all ${
                    selectedCategory === cat.id
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface-variant/70 hover:text-primary"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Treatments listing */}
            <div className="px-8 md:px-12 py-8 max-h-[55vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface-bright">
              {filteredTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="group relative flex flex-col justify-between border-b border-outline-variant/20 pb-6 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline gap-4">
                      <h4 className="font-serif text-lg font-normal text-primary group-hover:text-tertiary transition-colors italic">
                        {treatment.name}
                      </h4>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="font-serif text-lg font-normal text-secondary">
                          € {treatment.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-semibold tracking-wider text-tertiary uppercase">
                      <span className="flex items-center gap-1 bg-surface-container px-2 py-0.5 border border-outline-variant/10 rounded-none">
                        <Clock className="w-3 h-3" /> {treatment.duration} minuti
                      </span>
                      <span>• Aromaterapia e Tisana inclusi</span>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                      {treatment.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-primary block mb-1">
                        Benefici certificati:
                      </span>
                      <ul className="text-[11px] space-y-1 text-on-surface-variant/80 font-light">
                        {treatment.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-tertiary shrink-0"></span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {onSelectTreatmentForBooking && (
                    <button
                      onClick={() => {
                        onSelectTreatmentForBooking(treatment.id);
                        onClose();
                      }}
                      className="mt-5 w-fit border border-primary hover:bg-primary hover:text-surface-bright text-[10px] font-semibold px-4 py-2 uppercase tracking-widest transition-all rounded-none self-start"
                    >
                      Aggiungi al Soggiorno
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Footer / Simulated PDF download */}
            <div className="py-6 px-12 border-t border-outline-variant/20 bg-surface-container-low flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[11px] text-on-surface-variant font-light italic text-center sm:text-left">
                *Tutti i fanghi ed i trattamenti terapeutici di Mioni Royal San sono approvati dal Servizio Sanitario Nazionale.
              </span>
              <button
                onClick={() => {
                  alert("Attenzione: Download simulato! Il menu in PDF è stato preparato per la stampa di lusso.");
                }}
                className="bg-primary hover:bg-surface-tint text-surface-bright text-[10px] font-semibold uppercase tracking-widest px-6 py-3 transition-colors rounded-none whitespace-nowrap"
              >
                Download PDF Completo
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
