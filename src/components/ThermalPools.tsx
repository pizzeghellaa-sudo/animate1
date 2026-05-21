import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Droplets, Waves, Thermometer } from "lucide-react";
import thermeVideo from "../assets/video2.webm";
import thermeVideoMp4 from "../assets/video2.mp4";

export default function ThermalPools() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => {
      setIsVideoPlaying(true);
    }).catch(() => {
      setIsVideoPlaying(true);
    });
    const onPlaying = () => setIsVideoPlaying(true);
    const onPause = () => setIsVideoPlaying(false);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const poolStats = [
    {
      icon: <Droplets className="w-5 h-5 text-tertiary" />,
      text: "Piscina interna con idromassaggi",
    },
    {
      icon: <Waves className="w-5 h-5 text-tertiary" />,
      text: "Laguna termale esterna",
    },
    {
      icon: <Thermometer className="w-5 h-5 text-tertiary" />,
      text: "Temperature da 32° a 36°",
    },
  ];

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden bg-primary">
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoPlaying ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        >
          <source src={thermeVideo} type="video/webm" />
          <source src={thermeVideoMp4} type="video/mp4" />
        </motion.video>
      </section>
      <section id="pools" className="pb-24 md:pb-40 px-6 md:px-20 max-w-[1440px] mx-auto overflow-hidden bg-surface-bright">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Asymmetric Wide Image Container */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="col-span-1 md:col-span-7 relative group overflow-hidden border border-outline-variant/20"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKZTF5nbCq3e2P0z_4DaIPi_E39FemwJNy_oe-P4-xERZS1Pzz2uMKxsUF26zfXOCgq_H4ZI4N8FJv__YoxmbyWpksX8XmYldo_zekWQS4AOBI5WGF5_I_YyzQSbksFpVI1zOb0m_dSZpvJf1pn6b4JD-i0VfKZ4oMjMBHKCXplP8Yr9bmDw4yDQ_BwhV-oTq0erE9Ou2otqjtM9LdITQKaI3G1zm-sr7oYbloxXNkcsPEtvpvOuqJ4ulKjhvwfnA0zL5DSVfq0fw"
            alt="Piscine Termali Mioni Royal San"
            className="w-full h-[400px] md:h-[650px] object-cover transition-transform duration-[2000ms] group-hover:scale-105 rounded-none"
          />
          {/* Glassmorphic-inspired label overlay */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12 bg-gradient-to-t from-black/70 via-black/35 to-transparent w-full">
            <h3 className="font-serif text-2xl md:text-4xl text-surface-bright italic font-normal tracking-wide">
              L'Incanto delle Acque
            </h3>
          </div>
        </motion.div>

        {/* Text Editorial offset box */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="col-span-1 md:col-span-5 md:pl-8 space-y-6"
        >
          <span className="text-[10px] uppercase font-bold text-tertiary tracking-widest block">
            Nuova Mioni Luxury Swim &amp; Spa
          </span>

          <h3 className="font-serif text-3xl font-normal text-primary italic leading-snug">
            Un percorso d'acqua che rigenera i sensi
          </h3>

          <p className="font-sans text-sm md:text-base text-on-surface-variant font-light leading-relaxed">
            Immergetevi nel calore rigenerante delle nostre acque termali biologiche di Montegrotto. Un viaggio sensoriale antico che unisce la tradizione millenaria del termalismo euganeo con le più moderne e ricercate attenzioni al benessere olistico della persona.
          </p>

          <div className="h-[1px] w-12 bg-tertiary/30 my-6"></div>

          {/* List stats with borders */}
          <ul className="space-y-4">
            {poolStats.map((stat, idx) => (
              <li
                key={idx}
                className="flex items-center gap-4 border-b border-outline-variant/20 pb-4 last:border-0"
              >
                <div className="p-2 border border-outline-variant/30 text-tertiary bg-surface-container-low rounded-none">
                  {stat.icon}
                </div>
                <span className="font-sans text-xs md:text-sm font-medium text-on-surface tracking-wide">
                  {stat.text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
    </>
  );
}
