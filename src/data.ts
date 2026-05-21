import { Room, Restaurant, Treatment } from "./types";

export const ROOMS_DATA: Room[] = [
  {
    id: "junior-suite",
    name: "Junior Suite",
    description: "Spazi fluidi e dettagli in marmo pregiato.",
    price: 180,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtRWLihiP_v-vW6P98wGTj-FfPY5Kcrz0McR1OGue7hS-ki6tmW5hub1gv1_7U-dETmkX9tiGVUScUpydpqptgX00tMqHRRJHVVku40AbU0OhRMjt9HaxC9q7s0ITuIAXZQ5HzIKODNd3TeGrAR_hVbR6-RdhQtZTM9dk9IdOiK1WEy8EnmAnbV0iTMj3V6CFMBU-D0H-LoDSro7uMulCEostcNcd2fwKfbkaHKdaSwzZuTP0YcJvREARBcL7Ki0Qagy8oe1IS9a4",
    features: [
      "Bagno in pregiato marmo italiano",
      "Balcone privato con affaccio sul parco",
      "Letto King size con lenzuola in cotone egiziano",
      "Linea cortesia di lusso biologica",
      "WI-FI ad alta velocità & Smart TV"
    ],
    size: "38 mq",
    maxGuests: 2,
    view: "Vista Parco Interno"
  },
  {
    id: "royal-executive",
    name: "Royal Executive",
    description: "Il massimo dell'esclusività con vista panoramica.",
    price: 260,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8zyUhuVS2FEjqWxrcRbAVgjUiGkWInAOzUTX767WPznq24VgqUoZMrUym456En8coCZUOIJEjkbz5dcYK4qmdXxTKnBBtru283Hx1Ygdbz9APpkfp_dn5ifek6M48pnZ6Qe7yxIFtSalFyTYX1hHFkED6uZ1wutPBqUDH6V4nS3vBDDeZx1zs_ib23yFCw9G_kOSxqqoRJitGXQgBvstm2LZ6FBZg5k9QAI8_RyaROWXnZhewQNTyPDAS9VQcYRN9TZhULWGYJas",
    features: [
      "Soggiorno e salotto privato adiacente",
      "Arredamenti di design in velluto verde salvia",
      "Balcone panoramico con balaustra in pietra",
      "Macchina del caffè espresso gourmet inclusa",
      "Accesso prioritario al percorso termale"
    ],
    size: "52 mq",
    maxGuests: 3,
    view: "Vista Colli Euganei e Terme"
  },
  {
    id: "deluxe-garden",
    name: "Deluxe Garden",
    description: "Accesso diretto ai giardini termali privati.",
    price: 140,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjMCrPADiUNEO8DzdXl7arm3akr_dceFiuXlvz445Za1IEvF5ZJQP5gXEALuVTM4TJZN2iMzBIlNzBB_O3I1EsNtYnCY3DjG6RrVzep3I_-0FsbWKanMqM0M4frtaKlDxF05FKr5dWnzpsywCTbBj8NL-qzNuGfYYIybqUfM1QQFPvgxrMvGX6oJV8AnTYkbhBbZo1qSQFhWfsrGqrVzNX9bH_RX_APL30hfbSbkJmOTMGN5CDULxq5MXZ3t98ttW1h76IrRW3EXg",
    features: [
      "Accesso diretto senza scale ai giardini privati",
      "Vasca da bagno a libera installazione freestanding",
      "Pavimentazioni e rivestimenti in pietra chiara levigata",
      "Ingresso privato ed esclusivo",
      "Servizio in camera personalizzato"
    ],
    size: "42 mq",
    maxGuests: 2,
    view: "Giardino Termale Privato"
  }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: "ristorante-giove",
    name: "Ristorante Giove",
    subtitle: "CUCINA CLASSICA ITALIANA",
    category: "Cena di classe",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5NQw7JKakqB9idFdZ2lMUbfFMUmJjxx_5BA0uMLciZRb_eCEYcCDEOwmb0vjCUX4_2hft23W0quDUhNyIbQ6HBnL9IThGAIibpmpoUmE1URQwSHaTJicTI3dzsil940CTLTnKZKhwSSP1G5D-ZKlvTxVXFfaJukkz2XJ06j99pkQ9tZYPn3gTH2Ss7rE5_i3nRZjIXV0spQW1idlNebcdAnCbE3s9OvrHRKtAEDNNe9kdCOSJbNrHjf8rlj_vFxpFbP6OdpGR43Y",
    description: "Eccellenza culinaria servita in una cornice di regale eleganza.",
    fullDescription: "Un ambiente sontuoso con tovaglie di lino bianco e cristalli d'epoca, dove la grande tradizione culinaria italiana viene reinterpretata con creatività dallo Chef Executive, esaltando ingredienti a chilometro zero provenienti dal territorio veneto."
  },
  {
    id: "bistrot-due-zero",
    name: "Bistrot Due.Zero",
    subtitle: "LIGHT LUNCH & COCKTAILS",
    category: "Pranzo Informale & Pool Lounge",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFsaHintMT3nJ8nmBpeB7iG98AHeZnbWJTXJrFpji8Fo-VWufyVJ0Qh3RTUbeuBOzO8jkpe9A31sTmBwQqjuLsQ8M7Te2uBQjVBzlYIB7QZSI5zUeYnPUV6tURJnYSFY5HrYIu3hS8I259fcPQx2FVOj2JgRps6-Bf3top5EBDoKZVQ6SI9l9y1hLQtmcO9HbIYpWyfrihLL3Y6LdWUWDL2KxRXMkAaRYUfOjPew78WqSvYiGq3dYnJ6getyWQUBUdgjDFTQBVTaM",
    description: "Sapori freschi e contemporanei a bordo piscina.",
    fullDescription: "Dedicato a chi ama uno stile di vita dinamico, il Bistrot offre pranzi leggeri, centrifugati di frutta biologica, vellutate minerali e, al tramonto, trasforma la panoramica terrazza esterna in un esclusivo cocktail lounge con DJ set d'atmosfera."
  },
  {
    id: "tamashi",
    name: "Tamashi",
    subtitle: "ORIENTAL FUSION EXPERIENCE",
    category: "Sushi Bar & Fusion",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnansZ7veeac_CGJ1mbQUSKdSFM0_HKpr51dY62BPOXW84uHJyYdu_hraAoHOpjr8rSQr92Uu524uzFm4hqDHWm-SjvFznzGq5EQF2tbCeT3BQ6Ezs3F9GrqbHRjwgw957BCvb9LRVcj5NnV9ylNiybO92dSBDjFOs2hp3dBS5Yot4HVezaWDh3heSsE_ePaJruLvbRkUPJSlBvss5_eAsUoTx5JBE5x0ityRO8Tagw3W5jvG1bcRUpZP8yYfD9XdEF0xTRsmYF_k",
    description: "Un viaggio sensoriale nei sapori dell'estremo oriente.",
    fullDescription: "Un design minimalista giapponese dalle luci teatrali soffuse e superfici in ardesia scura. Qui, la precisione asiatica sposa la materia prima nobile mediterranea in percorsi degustazione Omakase intimi, eleganti e indimenticabili."
  }
];

export const TREATMENTS_DATA: Treatment[] = [
  {
    id: "thermal-mud-detox",
    name: "Thermal Mud Detox",
    description: "Fango termale certificato per una profonda azione detossinante e remineralizzante.",
    duration: 50,
    price: 95,
    category: "fango",
    benefits: [
      "Rigenerazione delle articolazioni osteoarticolari",
      "Purificazione profonda dell'epidermide",
      "Azione antiossidante e anti-invecchiamento tissutale",
      "Stimolazione del microcircolo linfatico"
    ]
  },
  {
    id: "massage-lomi-lomi",
    name: "Massaggio Lomi Lomi",
    description: "Rituale hawaiano che agisce sulla circolazione e sul sistema nervoso per un relax totale.",
    duration: 60,
    price: 110,
    category: "massaggio",
    benefits: [
      "Decontrattura muscolare completa tramite manovre avvolgenti",
      "Rilascio delle tensioni accumulate sul collo e sulla schiena",
      "Riequilibrio energetico globale e rilassamento psichico",
      "Idratazione profonda del corpo con oli minerali caldi"
    ]
  },
  {
    id: "spa-ozonizzata",
    name: "Percorso SPA Ozonizzata",
    description: "L'efficacia dell'ozono combinata con l'acqua termale per la rigenerazione cellulare.",
    duration: 45,
    price: 75,
    category: "percorso",
    benefits: [
      "Ossigenazione profonda dei tessuti cutanei",
      "Azione rinfrescante ed energizzante per gambe stanche",
      "Miglioramento dell'elasticità delle pareti venose",
      "Tonificazione totale e stimolazione metabolica"
    ]
  },
  {
    id: "massaggio-hot-stone",
    name: "Massaggio Hot Stone",
    description: "Tratto terapeutico con calde pietre laviche basaltiche e oli fitoterapici.",
    duration: 75,
    price: 130,
    category: "massaggio",
    benefits: [
      "Riduzione immediata dello stress e del cortisolo corporeo",
      "Allineamento dei centri energetici (Chakra)",
      "Detensionamento fasciale profondo",
      "Cura del calore radiante a lento e profondo rilascio"
    ]
  },
  {
    id: "rituale-viso-ialuronico",
    name: "Rituale Viso all'Acido Ialuronico",
    description: "Trattamento lifting istantaneo con acido ialuronico termale e maschera lenitiva.",
    duration: 50,
    price: 85,
    category: "viso",
    benefits: [
      "Rimpolpamento immediato delle piccole rughe d'espressione",
      "Idratazione intensa degli strati superficiali protettivi",
      "Luminosità intensa con cristalli di fango termale puro",
      "Attenuazione delle occhiaie tramite linfodrenaggio del viso"
    ]
  }
];
