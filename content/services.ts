export type ServiceAccent = "violet" | "ice" | "amber";

export type Service = {
  slug: "event-experiences" | "spatial-web" | "interactive-commerce";
  index: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  intro: string;
  tags: string[];
  capabilities: string[];
  coverImage: string;
  accent: ServiceAccent;
};

export const services: Service[] = [
  {
    slug: "event-experiences",
    index: "01",
    title: "Event Experiences",
    shortTitle: "Event",
    subtitle: "RSVP systems, check-in flows, visual interfaces for live events.",
    description:
      "Sistemi digitali per eventi che uniscono registrazione, ticketing, accesso e interfacce pensate come esperienza.",
    intro:
      "Progettiamo strumenti e ambienti digitali per eventi dal vivo: RSVP, ticket, scanner, visual system e touchpoint che migliorano il flusso e l’identità dell’evento.",
    tags: ["RSVP", "Check-in", "Ticketing", "Visual Flow"],
    capabilities: [
      "Registration systems",
      "QR ticket flows",
      "Scanner interfaces",
      "Live visual touchpoints",
      "Guest management",
    ],
    coverImage: "/services/event-cover.jpg",
    accent: "violet",
  },
  {
    slug: "spatial-web",
    index: "02",
    title: "Spatial Web",
    shortTitle: "Spatial",
    subtitle: "Digital stages, immersive layouts, theatrical web environments.",
    description:
      "Spazi digitali che non si limitano a mostrare contenuti: li mettono in scena.",
    intro:
      "Costruiamo ambienti web con una logica spaziale e scenografica, dove contenuto, movimento e atmosfera diventano parte dell’esperienza di navigazione.",
    tags: ["Immersive UX", "3D Layouts", "Digital Stage", "Narrative Space"],
    capabilities: [
      "Spatial storytelling",
      "Immersive page systems",
      "Stage-like interfaces",
      "Concept-driven layouts",
      "Interactive environments",
    ],
    coverImage: "/services/spatial-cover.jpg",
    accent: "ice",
  },
  {
    slug: "interactive-commerce",
    index: "03",
    title: "Interactive Commerce",
    shortTitle: "Commerce",
    subtitle: "Product scenes, configurators, richer digital shopping moments.",
    description:
      "Esperienze commerce dove il prodotto non è solo mostrato, ma messo in relazione con spazio, gesto e interazione.",
    intro:
      "Dalle pagine prodotto evolute ai configuratori, sviluppiamo sistemi visivi e interattivi che rendono il commercio digitale più memorabile, leggibile e coinvolgente.",
    tags: ["Product Experience", "Configurator", "Visual Commerce", "3D Product"],
    capabilities: [
      "Interactive product displays",
      "Configurable interfaces",
      "Editorial commerce layouts",
      "Motion-led product scenes",
      "Digital merchandising",
    ],
    coverImage: "/services/commerce-cover.jpg",
    accent: "amber",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}