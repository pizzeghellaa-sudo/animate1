export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  size: string;
  maxGuests: number;
  view: string;
}

export interface Restaurant {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: "fango" | "massaggio" | "percorso" | "viso";
  benefits: string[];
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId?: string;
  selectedTreatments: string[];
}
