/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import ThermalPools from "./components/ThermalPools";
import Rooms from "./components/Rooms";
import Dining from "./components/Dining";
import Wellness from "./components/Wellness";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import SpaMenuModal from "./components/SpaMenuModal";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSpaMenuOpen, setIsSpaMenuOpen] = useState(false);
  const [selectedRoomIdForBooking, setSelectedRoomIdForBooking] = useState<string | undefined>(undefined);

  const handleOpenBooking = (roomId?: string) => {
    setSelectedRoomIdForBooking(roomId);
    setIsBookingOpen(true);
  };

  const handleSelectTreatmentForBooking = (treatmentId: string) => {
    // Open Booking and pre-load some values if needed, otherwise trigger general booking
    setIsBookingOpen(true);
  };

  const handleExploreSuites = () => {
    const suitesSec = document.getElementById("suites");
    if (suitesSec) {
      suitesSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="hotel-spa-applet" className="min-h-screen bg-surface-bright text-on-surface select-none font-sans antialiased overflow-x-hidden">
      
      {/* Editorial Fixed Sticky Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenSpaMenu={() => setIsSpaMenuOpen(true)}
      />

      {/* Main Narrative Sections */}
      <main>
        
        {/* Section 1: Hero Block */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreSuites={handleExploreSuites}
        />

        {/* Section 2: Intro Presentation */}
        <Intro />

        {/* Section 3: Thermal Pools Asymmetric Panel */}
        <ThermalPools />

        {/* Section 4: Rooms Luxury Grid */}
        <Rooms
          onSelectRoomForBooking={(roomId) => handleOpenBooking(roomId)}
        />

        {/* Section 5: Gastronomy Dining Block */}
        <Dining />

        {/* Section 6: Wellness Supreme Rituals */}
        <Wellness
          onOpenSpaMenu={() => setIsSpaMenuOpen(true)}
          onSelectTreatmentForBooking={handleSelectTreatmentForBooking}
        />

        {/* Interstitial Action: Rimani Aggiornato Form */}
        <Newsletter />

      </main>

      {/* Footnote information panel */}
      <Footer />

      {/* Interactive Booking Engine Modal Overlay */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialRoomId={selectedRoomIdForBooking}
      />

      {/* Luxury Wellness Treatment Price-List Modal Drawer */}
      <SpaMenuModal
        isOpen={isSpaMenuOpen}
        onClose={() => setIsSpaMenuOpen(false)}
        onSelectTreatmentForBooking={handleSelectTreatmentForBooking}
      />

    </div>
  );
}

