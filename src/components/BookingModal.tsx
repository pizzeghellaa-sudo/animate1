import { useState, useEffect } from "react";
import { X, Calendar, Users, Check, Bell, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ROOMS_DATA, TREATMENTS_DATA } from "../data";
import { BookingState } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
}

export default function BookingModal({ isOpen, onClose, initialRoomId }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bookingState, setBookingState] = useState<BookingState>({
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    guests: 2,
    roomId: initialRoomId || "junior-suite",
    selectedTreatments: [],
  });

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    note: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successReservationId, setSuccessReservationId] = useState<string | null>(null);

  // Sync initial Room ID if changed from outside
  useEffect(() => {
    if (initialRoomId) {
      setBookingState((prev) => ({ ...prev, roomId: initialRoomId }));
    }
  }, [initialRoomId]);

  if (!isOpen) return null;

  const currentRoom = ROOMS_DATA.find((r) => r.id === bookingState.roomId) || ROOMS_DATA[0];

  // Calculate Nights
  const date1 = new Date(bookingState.checkIn);
  const date2 = new Date(bookingState.checkOut);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Selected Treatments Details
  const selectedTreatmentsObjects = TREATMENTS_DATA.filter((t) =>
    bookingState.selectedTreatments.includes(t.id)
  );

  // Total Calculation
  const roomCost = currentRoom.price * nights;
  const treatmentsCost = selectedTreatmentsObjects.reduce((acc, curr) => acc + curr.price, 0);
  const totalCost = roomCost + treatmentsCost;

  const handleToggleTreatment = (id: string) => {
    setBookingState((prev) => {
      const alreadySelected = prev.selectedTreatments.includes(id);
      const updated = alreadySelected
        ? prev.selectedTreatments.filter((tId) => tId !== id)
        : [...prev.selectedTreatments, id];
      return { ...prev, selectedTreatments: updated };
    });
  };

  const validateStep1 = () => {
    const errorList: Record<string, string> = {};
    const checkInDate = new Date(bookingState.checkIn);
    const checkOutDate = new Date(bookingState.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      errorList.checkIn = "La data di check-in non può essere nel passato.";
    }
    if (checkOutDate <= checkInDate) {
      errorList.checkOut = "Il check-out deve essere successivo al check-in.";
    }
    if (bookingState.guests < 1 || bookingState.guests > currentRoom.maxGuests) {
      errorList.guests = `Questa camera supporta massimo ${currentRoom.maxGuests} ospiti.`;
    }

    setErrors(errorList);
    return Object.keys(errorList).length === 0;
  };

  const validateStep2 = () => {
    const errorList: Record<string, string> = {};
    if (!formData.nome.trim()) errorList.nome = "Il nome è obbligatorio.";
    if (!formData.cognome.trim()) errorList.cognome = "Il cognome è obbligatorio.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errorList.email = "Inserisci un indirizzo email valido.";
    }
    if (!formData.telefono.trim()) errorList.telefono = "Il numero di telefono è obbligatorio.";

    setErrors(errorList);
    return Object.keys(errorList).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        // Generate random order ID
        const orderId = `MION-${Math.floor(100000 + Math.random() * 900000)}`;
        setSuccessReservationId(orderId);
        setStep(3);
      }
    }
  };

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
            className="relative w-full max-w-4xl bg-surface-bright text-primary p-0 border border-outline-variant/30 shadow-none rounded-none overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/20 bg-surface-container-low">
              <div>
                <span className="text-[10px] uppercase font-semibold text-tertiary tracking-[0.2em] block mb-1">
                  Mioni Royal San — Prenotazioni
                </span>
                <h3 className="font-serif text-2xl font-normal leading-tight italic">
                  {step === 3 ? "Esperienza Confermata" : "Disegna il tuo Soggiorno"}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-none"
                aria-label="Chiudi"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Stepper indicators */}
            {step < 3 && (
              <div className="grid grid-cols-2 text-center text-xs font-semibold tracking-wider border-b border-outline-variant/20 bg-surface-container-lowest">
                <button
                  disabled={step === 1}
                  onClick={() => setStep(1)}
                  className={`py-4 uppercase border-r border-outline-variant/10 text-center transition-all ${
                    step === 1
                      ? "bg-primary text-surface-bright border-b-2 border-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  1. Dettagli &amp; Servizi Termali
                </button>
                <div
                  className={`py-4 uppercase text-center transition-all ${
                    step === 2
                      ? "bg-primary text-surface-bright border-b-2 border-primary"
                      : "text-on-surface-variant/40"
                  }`}
                >
                  2. Dati di Contatto &amp; Riepilogo
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Main Steps Content */}
              <div aria-live="polite" className="col-span-1 md:col-span-8 p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif text-lg italic mb-4">Scegli la tua Suite</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {ROOMS_DATA.map((r) => (
                          <div
                            key={r.id}
                            onClick={() =>
                              setBookingState((prev) => ({
                                ...prev,
                                roomId: r.id,
                                guests: Math.min(prev.guests, r.maxGuests),
                              }))
                            }
                            className={`p-4 border cursor-pointer transition-all flex items-center justify-between text-left rounded-none ${
                              bookingState.roomId === r.id
                                ? "border-primary bg-surface-container-low bg-opacity-70"
                                : "border-outline-variant/30 hover:border-outline"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={r.image}
                                alt={r.name}
                                className="w-16 h-16 object-cover rounded-none"
                              />
                              <div>
                                <h5 className="font-serif text-base font-normal">{r.name}</h5>
                                <p className="text-xs text-on-surface-variant">{r.size} • {r.view}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-semibold tracking-wider block">
                                € {r.price}
                              </span>
                              <span className="text-[10px] text-on-surface-variant uppercase">
                                a notte
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Check-In */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-semibold text-tertiary tracking-wider block">
                          Check-In
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={bookingState.checkIn}
                            onChange={(e) =>
                              setBookingState((prev) => ({ ...prev, checkIn: e.target.value }))
                            }
                            className={`w-full bg-transparent border ${
                              errors.checkIn ? "border-error" : "border-outline-variant/60"
                            } p-2.5 text-xs focus:ring-0 focus:border-primary focus:outline-none rounded-none`}
                          />
                        </div>
                        {errors.checkIn && (
                          <p className="text-[10px] text-error font-medium">{errors.checkIn}</p>
                        )}
                      </div>

                      {/* Check-Out */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-semibold text-tertiary tracking-wider block">
                          Check-Out
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={bookingState.checkOut}
                            onChange={(e) =>
                              setBookingState((prev) => ({ ...prev, checkOut: e.target.value }))
                            }
                            className={`w-full bg-transparent border ${
                              errors.checkOut ? "border-error" : "border-outline-variant/60"
                            } p-2.5 text-xs focus:ring-0 focus:border-primary focus:outline-none rounded-none`}
                          />
                        </div>
                        {errors.checkOut && (
                          <p className="text-[10px] text-error font-medium">{errors.checkOut}</p>
                        )}
                      </div>

                      {/* Ospiti */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-semibold text-tertiary tracking-wider block">
                          Ospiti (max {currentRoom.maxGuests})
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={currentRoom.maxGuests}
                          value={bookingState.guests}
                          onChange={(e) =>
                            setBookingState((prev) => ({
                              ...prev,
                              guests: parseInt(e.target.value) || 1,
                            }))
                          }
                          className={`w-full bg-transparent border ${
                            errors.guests ? "border-error" : "border-outline-variant/60"
                          } p-2.5 text-xs focus:ring-0 focus:border-primary focus:outline-none rounded-none`}
                        />
                        {errors.guests && (
                          <p className="text-[10px] text-error font-medium">{errors.guests}</p>
                        )}
                      </div>
                    </div>

                    {/* Extensible Luxury Experiences & Spa Treatments */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-serif text-lg italic">Personalizza con Trattamenti Benessere</h4>
                        <span className="text-[10px] text-secondary hover:underline cursor-pointer tracking-wider uppercase">
                          Menu SPA consigliato
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mb-4">
                        Aggiungi i famosi rituali di fango biologico o massaggi termali esclusivi al tuo soggiorno.
                      </p>
                      <div className="space-y-2">
                        {TREATMENTS_DATA.slice(0, 3).map((t) => {
                          const isSelected = bookingState.selectedTreatments.includes(t.id);
                          return (
                            <div
                              key={t.id}
                              onClick={() => handleToggleTreatment(t.id)}
                              className={`p-3 border text-left cursor-pointer transition-all flex items-start justify-between rounded-none ${
                                isSelected
                                  ? "border-secondary bg-secondary-fixed/15"
                                  : "border-outline-variant/20 hover:border-outline-variant"
                              }`}
                            >
                              <div className="flex gap-3">
                                <div
                                  className={`w-5 h-5 flex items-center justify-center mt-0.5 border text-white rounded-none ${
                                    isSelected
                                      ? "bg-secondary border-secondary"
                                      : "border-outline-variant"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5" />}
                                </div>
                                <div className="space-y-0.5 max-w-[80%]">
                                  <h5 className="text-xs font-semibold uppercase tracking-wider text-primary">
                                    {t.name}
                                  </h5>
                                  <p className="text-xs text-on-surface-variant leading-relaxed">
                                    {t.description}
                                  </p>
                                  <span className="text-[10px] font-medium text-tertiary-container tracking-wider uppercase block">
                                    Durata: {t.duration} min • Aromaterapia termale inclusa
                                  </span>
                                </div>
                              </div>
                              <span className="text-xs font-semibold text-secondary">
                                € {t.price}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h4 className="font-serif text-lg italic mb-2">I Tuoi Dati Personali</h4>
                    <p className="text-xs text-on-surface-variant">
                      I tuoi dati saranno custoditi secondo i più rigidi standard di riservatezza alberghiera di Mioni Royal San.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Nome */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-semibold text-primary tracking-wider block">
                          Nome
                        </label>
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          placeholder="es. Mario"
                          className={`w-full bg-transparent border ${
                            errors.nome ? "border-error" : "border-outline-variant/50"
                          } p-2.5 text-xs focus:border-primary focus:outline-none rounded-none`}
                        />
                        {errors.nome && <p className="text-[10px] text-error">{errors.nome}</p>}
                      </div>

                      {/* Cognome */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-semibold text-primary tracking-wider block">
                          Cognome
                        </label>
                        <input
                          type="text"
                          value={formData.cognome}
                          onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                          placeholder="es. Rossi"
                          className={`w-full bg-transparent border ${
                            errors.cognome ? "border-error" : "border-outline-variant/50"
                          } p-2.5 text-xs focus:border-primary focus:outline-none rounded-none`}
                        />
                        {errors.cognome && <p className="text-[10px] text-error">{errors.cognome}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-semibold text-primary tracking-wider block">
                          Indirizzo Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="es. nome@esempio.it"
                          className={`w-full bg-transparent border ${
                            errors.email ? "border-error" : "border-outline-variant/50"
                          } p-2.5 text-xs focus:border-primary focus:outline-none rounded-none`}
                        />
                        {errors.email && <p className="text-[10px] text-error">{errors.email}</p>}
                      </div>

                      {/* Telefono */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-semibold text-primary tracking-wider block">
                          Telefono
                        </label>
                        <input
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          placeholder="es. +39 345 678901"
                          className={`w-full bg-transparent border ${
                            errors.telefono ? "border-error" : "border-outline-variant/50"
                          } p-2.5 text-xs focus:border-primary focus:outline-none rounded-none`}
                        />
                        {errors.telefono && <p className="text-[10px] text-error">{errors.telefono}</p>}
                      </div>
                    </div>

                    {/* Note Speciali */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-semibold text-primary tracking-wider block">
                        Richieste Speciali (Allergie, Intolleranze, Preferenze Letto)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder="es. Intolleranze al glutine, preferenza cuscini anallergici..."
                        className="w-full bg-transparent border border-outline-variant/50 p-2.5 text-xs focus:border-primary focus:outline-none rounded-none resize-none"
                      />
                    </div>

                    {/* Policy check */}
                    <div className="flex gap-2 items-start py-1">
                      <input
                        type="checkbox"
                        id="privacy-chk"
                        defaultChecked
                        className="mt-1 border-outline-variant text-primary focus:ring-0 rounded-none w-4 h-4"
                      />
                      <label htmlFor="privacy-chk" className="text-[11px] leading-snug text-on-surface-variant">
                        Acconsento al trattamento dei dati personali ai fini della prenotazione e alle politiche di cancellazione di Mioni Royal San (cancellazione gratuita fino a 48 ore prima dell'arrivo).
                      </label>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center py-10 space-y-6">
                    <div className="w-16 h-16 bg-tertiary-fixed text-tertiary flex items-center justify-center mx-auto rounded-none">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-serif text-3xl italic">Benvenuto a Mioni Royal San</h4>
                      <p className="text-sm text-on-surface-variant max-w-lg mx-auto">
                        Gentile <strong>{formData.nome} {formData.cognome}</strong>, il tuo rifugio di puro benessere è pronto ad accoglierti. Abbiamo inviato un'email dettagliata di conferma a <strong>{formData.email}</strong>.
                      </p>
                    </div>

                    <div className="border border-dashed border-outline-variant/60 p-5 bg-surface-container-low max-w-md mx-auto space-y-3 font-mono text-center">
                      <div className="flex justify-between border-b border-outline-variant/20 pb-2 text-xs">
                        <span className="text-on-surface-variant">CODICE PRENOTAZIONE:</span>
                        <span className="font-bold text-primary">{successReservationId}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-on-surface-variant">SUITE:</span>
                        <span className="text-primary uppercase">{currentRoom.name}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-on-surface-variant">PERIODO:</span>
                        <span className="text-primary">{bookingState.checkIn} / {bookingState.checkOut}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-on-surface-variant">NOTTI / OSPITI:</span>
                        <span className="text-primary">{nights} Notte/i — {bookingState.guests} Ospite/i</span>
                      </div>
                      {selectedTreatmentsObjects.length > 0 && (
                        <div className="flex justify-between text-xs text-left border-t border-outline-variant/20 pt-2">
                          <span className="text-on-surface-variant block">SERVIZI SPA:</span>
                          <span className="text-primary text-right flex-col flex select-none">
                            {selectedTreatmentsObjects.map((t) => (
                              <span key={t.id} className="block text-[11px]">{t.name}</span>
                            ))}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-outline-variant/20 pt-2 text-sm font-bold">
                        <span className="text-primary">TOTALE STIMATO:</span>
                        <span className="text-secondary font-sans">€ {totalCost}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-on-surface-variant leading-relaxed italic max-w-md mx-auto">
                      Per qualsiasi modifica o richiesta integrativa (come transfer privato o orari specifici per i fanghi termali), la nostra reception è a tua disposizione al <strong>+39 049 8911711</strong>.
                    </p>

                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-primary text-surface-bright font-semibold uppercase text-xs tracking-widest hover:bg-surface-tint transition-all rounded-none"
                    >
                      Torna al Sito
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar Booking Summary */}
              {step < 3 && (
                <div className="col-span-1 md:col-span-4 bg-surface-container-low border-t md:border-t-0 md:border-l border-outline-variant/20 p-6 space-y-6">
                  <h4 className="font-serif text-lg italic tracking-wide">Riepilogo Soggiorno</h4>

                  <div className="space-y-4 text-xs">
                    {/* Selected Suite preview */}
                    <div className="space-y-1.5 pb-3 border-b border-outline-variant/20">
                      <span className="text-[10px] text-tertiary font-semibold tracking-wider uppercase block">
                        La tua Suite
                      </span>
                      <div className="font-serif text-sm font-semibold text-primary">
                        {currentRoom.name}
                      </div>
                      <div className="text-on-surface-variant">
                        € {currentRoom.price} / notte
                      </div>
                    </div>

                    {/* Stay Dates */}
                    <div className="space-y-1 pb-3 border-b border-outline-variant/20">
                      <span className="text-[10px] text-tertiary font-semibold tracking-wider uppercase block">
                        Soggiorno
                      </span>
                      <div className="flex items-center gap-1.5 text-primary font-medium">
                        <Calendar className="w-3.5 h-3.5 text-on-surface-variant" />
                        <span>{bookingState.checkIn} al {bookingState.checkOut}</span>
                      </div>
                      <div className="text-on-surface-variant font-medium">
                        {nights} {nights === 1 ? "notte" : "notti"} • {bookingState.guests} {bookingState.guests === 1 ? "ospite" : "ospiti"}
                      </div>
                    </div>

                    {/* SPA Addons */}
                    {selectedTreatmentsObjects.length > 0 && (
                      <div className="space-y-2 pb-3 border-b border-outline-variant/20">
                        <span className="text-[10px] text-tertiary font-semibold tracking-wider uppercase block">
                          Servizi SPA esclusivi
                        </span>
                        <div className="space-y-1.5 max-h-32 overflow-y-auto">
                          {selectedTreatmentsObjects.map((t) => (
                            <div key={t.id} className="flex justify-between items-start text-primary text-[11px]">
                              <span className="max-w-[80%]">• {t.name}</span>
                              <span className="font-semibold text-secondary">€ {t.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prices list */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Costo Camera ({nights} n.):</span>
                        <span className="font-medium text-primary">€ {roomCost}</span>
                      </div>
                      {treatmentsCost > 0 && (
                        <div className="flex justify-between text-on-surface-variant">
                          <span>Trattamenti SPA:</span>
                          <span className="font-medium text-primary">€ {treatmentsCost}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Tassa di soggiorno:</span>
                        <span className="text-secondary font-medium tracking-wide">Inclusa</span>
                      </div>

                      <div className="flex justify-between text-base font-bold text-primary border-t border-outline-variant/20 pt-4 mt-2">
                        <span>TOTALE</span>
                        <span className="text-secondary font-sans text-lg font-bold">€ {totalCost}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full bg-primary text-surface-bright py-3 text-center uppercase tracking-widest font-semibold text-xs transition-colors hover:bg-surface-tint rounded-none flex items-center justify-center gap-2 mt-4"
                  >
                    <span>{step === 1 ? "Continua al Riepilogo" : "Conferma Prenotazione"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
