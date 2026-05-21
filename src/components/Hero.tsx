import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

interface HeroProps {
  onOpenBooking: () => void;
  onExploreSuites: () => void;
}

export default function Hero({ onOpenBooking, onExploreSuites }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce mute programmatically to safely bypass aggressive browser autoplay blocks
    video.muted = true;
    
    const playVideo = async () => {
      try {
        await video.play();
        setIsVideoPlaying(true);
      } catch (error) {
        console.warn("Hero background video autoplay prevented or deferred:", error);
      }
    };

    playVideo();

    // Event listeners to coordinate smooth fade transitions
    const handlePlaying = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
      {/* Soft overlay for typography protection */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Atmospheric Spa Steam Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 hero-video-mask select-none pointer-events-none opacity-80 z-0"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-steam-rising-from-a-hot-pool-at-night-42845-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Elegant Ken Burns Ambient Poster Fallback */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isVideoPlaying ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 select-none pointer-events-none z-5 bg-primary"
      >
        <motion.img
          initial={{ scale: 1 }}
          animate={{ scale: isVideoPlaying ? 1 : 1.05 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKZTF5nbCq3e2P0z_4DaIPi_E39FemwJNy_oe-P4-xERZS1Pzz2uMKxsUF26zfXOCgq_H4ZI4N8FJv__YoxmbyWpksX8XmYldo_zekWQS4AOBI5WGF5_I_YyzQSbksFpVI1zOb0m_dSZpvJf1pn6b4JD-i0VfKZ4oMjMBHKCXplP8Yr9bmDw4yDQ_BwhV-oTq0erE9Ou2otqjtM9LdITQKaI3G1zm-sr7oYbloxXNkcsPEtvpvOuqJ4ulKjhvwfnA0zL5DSVfq0fw"
          alt="Thermal Pool Ambient Backdrop"
          className="w-full h-full object-cover opacity-75"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-25 text-center px-6 max-w-4xl mx-auto space-y-6">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-xs uppercase font-semibold text-tertiary-fixed tracking-[0.3em] block"
        >
          Hotel Termale &amp; Luxury SPA
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="font-serif text-4xl md:text-7xl font-light text-surface-bright text-glow leading-tight"
        >
          Un Rifugio di Puro Benessere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7 }}
          className="font-sans text-sm md:text-lg text-surface-bright/95 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
        >
          L'eccellenza dell'ospitalità termale italiana, dove il tempo si ferma per rigenerare corpo e spirito.
        </motion.p>

        {/* Dynamic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1 }}
          className="pt-6 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onExploreSuites}
            className="px-10 py-4 bg-surface-bright text-primary font-semibold uppercase text-xs tracking-widest hover:bg-secondary-fixed transition-colors duration-300 rounded-none cursor-pointer"
          >
            Scopri le Suite
          </button>
          <button
            onClick={onOpenBooking}
            className="px-10 py-4 border border-surface-bright text-surface-bright font-semibold uppercase text-xs tracking-widest hover:bg-surface-bright hover:text-primary transition-all duration-300 rounded-none cursor-pointer"
          >
            Prenota il Tuo Soggiorno
          </button>
        </motion.div>
      </div>

      {/* Floating Decompressor Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-surface-bright/50 animate-bounce">
        <span className="font-light text-[10px] uppercase tracking-[0.3em]">
          Scorri l'Oasi
        </span>
        <div className="w-[1px] h-10 bg-surface-bright/35"></div>
      </div>
    </section>
  );
}
