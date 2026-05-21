import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ROOMS_DATA } from "../data";
import { Room } from "../types";
import { Compass, Maximize, User2, Check, ArrowRight, X } from "lucide-react";

interface RoomsProps {
  onSelectRoomForBooking: (roomId: string) => void;
}

export default function Rooms({ onSelectRoomForBooking }: RoomsProps) {
  const [activeDetailRoom, setActiveDetailRoom] = useState<Room | null>(null);

  const handleCardClick = (room: Room) => {
    setActiveDetailRoom(room);
  };

  return (
    <section id="suites" className="py-24 md:py-36 bg-surface-container-low border-y border-outline-variant/15">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        
        {/* Header Title Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase font-semibold text-tertiary tracking-[0.2em] block">
              L'Arte dell'Accoglienza
            </span>
            <h2 className="font-serif text-3xl md:text-5xl italic text-primary font-normal leading-tight">
              Dimore di Lusso
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs md:text-sm text-on-surface-variant font-light leading-relaxed">
            Ogni suite è pensata per essere un rifugio privato di eleganza e comfort, dove materiali pregiati, design italiano e ampi spazi luminosi si incontrano in armonia.
          </p>
        </div>

        {/* Bento/Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS_DATA.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.15 }}
              onClick={() => handleCardClick(room)}
              className="group cursor-pointer flex flex-col justify-between border border-outline-variant/10 bg-surface-bright pb-6 hover:shadow-md transition-shadow duration-500 rounded-none overflow-hidden"
            >
              <div>
                {/* Image and Price banner */}
                <div className="relative overflow-hidden aspect-[4/5] bg-neutral-100 border-b border-outline-variant/10">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105 rounded-none"
                  />
                  <div className="absolute top-6 right-6 bg-surface-bright/90 backdrop-blur-sm px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-primary border border-outline-variant/20 rounded-none">
                    Da € {room.price} / Notte
                  </div>
                </div>

                <div className="px-6 pt-5 space-y-1">
                  <h3 className="font-serif text-xl md:text-2xl text-primary group-hover:text-tertiary transition-colors italic font-normal">
                    {room.name}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant font-light leading-relaxed">
                    {room.description}
                  </p>
                </div>
              </div>

              {/* Card Footer interaction */}
              <div className="px-6 pt-6 flex items-center justify-between text-[10px] font-semibold text-tertiary uppercase tracking-wider">
                <span>Esplora Dettagli</span>
                <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Drawer Overlay for Selected Room Details */}
      <AnimatePresence>
        {activeDetailRoom && (
          <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailRoom(null)}
              className="absolute inset-0 bg-primary/80 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.4 }}
                className="w-screen max-w-xl bg-surface-bright text-primary border-l border-outline-variant/20 shadow-xl overflow-y-auto"
              >
                {/* Drawer Content */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDetailRoom(null)}
                    className="absolute top-6 right-6 z-10 p-2 text-primary bg-surface-bright/80 backdrop-blur-xs hover:bg-surface-container-high transition-colors rounded-none"
                    aria-label="Chiudi"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Top full bleed cover */}
                  <div className="h-72 w-full bg-neutral-150 relative">
                    <img
                      src={activeDetailRoom.image}
                      alt={activeDetailRoom.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <span className="text-[10px] uppercase font-semibold text-tertiary-fixed tracking-widest block mb-1">
                        Private Exclusive Lodging
                      </span>
                      <h3 className="font-serif text-2xl md:text-4xl italic text-surface-bright font-normal">
                        {activeDetailRoom.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body suite specs */}
                  <div className="p-8 space-y-6">
                    {/* Basic info strip */}
                    <div className="grid grid-cols-3 text-center border-y border-outline-variant/20 py-4 divide-x divide-outline-variant/20">
                      <div>
                        <Maximize className="w-4 h-4 mx-auto text-tertiary mb-1" />
                        <span className="text-[10px] text-on-surface-variant block">Superficie</span>
                        <span className="text-xs font-semibold text-primary">{activeDetailRoom.size}</span>
                      </div>
                      <div>
                        <User2 className="w-4 h-4 mx-auto text-tertiary mb-1" />
                        <span className="text-[10px] text-on-surface-variant block">Capacità</span>
                        <span className="text-xs font-semibold text-primary">Fino a {activeDetailRoom.maxGuests} Ospiti</span>
                      </div>
                      <div>
                        <Compass className="w-4 h-4 mx-auto text-tertiary mb-1" />
                        <span className="text-[10px] text-on-surface-variant block">Orientamento</span>
                        <span className="text-xs font-semibold text-primary truncate max-w-[130px] block">{activeDetailRoom.view}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-lg italic text-primary">La tua Oasi d'Eleganza</h4>
                      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                        La suite è stata arredata con pezzi esclusivi creati su misura da artigiani veneti. Offre un'atmosfera sospesa, soffusa e lussuosa, progettata appositamente per chi viene a cercare i trattamenti di fango e le famose sorgenti termali di Montegrotto.
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] uppercase font-bold tracking-wider text-primary">
                        Comfort &amp; Servizi Inclusi
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface-variant font-light">
                        {activeDetailRoom.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="p-0.5 bg-tertiary-fixed text-tertiary shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="h-[1px] w-full bg-outline-variant/10 my-4"></div>

                    {/* Drawer Footer CTA */}
                    <div className="flex justify-between items-center bg-surface-container-low p-4 border border-outline-variant/20">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">
                          Tariffa Garantita
                        </span>
                        <span className="text-base font-bold text-primary block">
                          € {activeDetailRoom.price} / notte
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onSelectRoomForBooking(activeDetailRoom.id);
                          setActiveDetailRoom(null);
                        }}
                        className="bg-primary hover:bg-surface-tint text-surface-bright text-[10px] font-semibold uppercase tracking-widest px-6 py-3 transition-colors rounded-none"
                      >
                        Seleziona &amp; Prenota
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
