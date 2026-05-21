import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setErrorMessage("Inserisci la tua email.");
      return;
    }
    if (!email.includes("@")) {
      setStatus("error");
      setErrorMessage("La mail deve contenere il carattere @.");
      return;
    }

    setStatus("loading");
    // Simulate API delay
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-20 bg-primary text-surface-bright border-b border-outline-variant/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          <div className="max-w-md space-y-2">
            <h3 className="font-serif text-2xl md:text-3xl italic font-normal text-surface-bright">
              Rimani Aggiornato
            </h3>
            <p className="font-sans text-xs md:text-sm text-primary-fixed-dim/90 font-light leading-relaxed">
              Iscriviti alla nostra newsletter d'élite per ricevere insolite offerte esclusive, segreti salutistici e novità terapeutiche dal mondo Mioni Royal San.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px] sm:min-w-[480px]">
            {status === "success" ? (
              <div className="flex items-center gap-3 bg-surface-container-low/10 border border-tertiary-fixed/30 p-4 text-xs tracking-wide">
                <CheckCircle className="w-5 h-5 text-tertiary-fixed shrink-0" />
                <span className="font-light">
                  Benvenuto! Iscrizione completata con successo. Controlla la tua casella di posta per sbloccare l'esclusivo voucher Benvenuto.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 select-text">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Indirizzo Email"
                    className="flex-1 bg-transparent border-b border-outline-variant/30 text-surface-bright px-4 py-3 text-xs focus:outline-none focus:border-surface-bright transition-all placeholder:text-primary-fixed-dim/40 rounded-none w-full"
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-surface-bright hover:bg-secondary-fixed text-primary text-[10.5px] font-semibold uppercase tracking-widest px-8 py-3.5 transition-colors duration-300 rounded-none cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>{status === "loading" ? "Invio in corso" : "Iscriviti"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-error font-medium pl-4">{errorMessage}</p>
                )}
                <p className="text-[10px] text-primary-fixed-dim/40 font-light mt-2 italic pl-1">
                  *Nessun spam. Puoi disiscriverti liberamente con un singolo click in qualsiasi momento.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
