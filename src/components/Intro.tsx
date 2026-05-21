import { motion } from "motion/react";

export default function Intro() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-20 max-w-[1440px] mx-auto text-center bg-surface-bright">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-sans text-[11px] font-semibold text-tertiary tracking-[0.3em] uppercase block"
        >
          Benvenuti a Montegrotto
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-serif text-3xl md:text-5xl italic text-primary font-normal leading-tight"
        >
          Sorgente di Equilibrio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-sans text-sm md:text-lg text-on-surface-variant font-light leading-relaxed max-w-3xl mx-auto"
        >
          Vogliamo essere la sorgente di benessere dei nostri ospiti. L’acqua, il silenzio, il tempo: qui nasce il tuo benessere. Noi ci prendiamo cura di tutto il resto, offrendo un’oasi di pace nel cuore pulsante del lusso termale.
        </motion.p>

        {/* Brand signature timeline divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="mt-16 flex justify-center items-center gap-6"
        >
          <div className="h-[1px] w-16 md:w-28 bg-tertiary-container/45"></div>
          <span className="font-serif italic text-base md:text-xl text-tertiary tracking-wide">
            Mioni Royal San
          </span>
          <div className="h-[1px] w-16 md:w-28 bg-tertiary-container/45"></div>
        </motion.div>
      </div>
    </section>
  );
}
