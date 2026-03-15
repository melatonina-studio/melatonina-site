export type HeroSection = {
  type: "hero";
  title: string;
  subtitle: string;
};

export type TextSection = {
  type: "text";
  content: string;
};

export type GallerySection = {
  type: "gallery";
  images: string[];
};

export type Viewer3DSection = {
  type: "viewer3d";
  modelUrl: string;
};

export type Section =
  | HeroSection
  | TextSection
  | GallerySection
  | Viewer3DSection;

export type Project = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  sections: Section[];
};


export const projects: Project[] = [
  {
    slug: "cb-store",
    title: "CB Store",
    category: "E-commerce",
    excerpt:
      "Struttura shop, immagine prodotto e base per esperienze commerce più evolute.",
    featuredImage: "/placeholder.jpg",
    sections: [
      {
        type: "hero",
        title: "CB Store",
        subtitle: "E-commerce — 2025",
      },
      {
        type: "text",
        content:
          "Progetto e-commerce sviluppato per costruire una presenza più solida, ordinata e performante.",
      },
      {
        type: "gallery",
        images: ["/placeholder.jpg", "/placeholder.jpg"],
      },
    ],
  },
  {
    slug: "rsvp-system",
    title: "RSVP System",
    category: "Event Experience",
    excerpt:
      "Sistema RSVP con registrazione, ticket, scanner QR e gestione ingressi.",
    featuredImage: "/placeholder.jpg",
    sections: [
      {
        type: "hero",
        title: "RSVP System",
        subtitle: "Event Experience — 2025",
      },
      {
        type: "text",
        content:
          "Sistema pensato per eventi con registrazione utenti, ticket digitali e check-in rapido.",
      },
      {
        type: "viewer3d",
        modelUrl: "/models/placeholder.glb",
      },
    ],
  },
  {
    slug: "immersive-stage",
    title: "Immersive Stage",
    category: "Spatial Web",
    excerpt:
      "Concept di spazio teatrale digitale per presentare servizi e visioni in modo immersivo.",
    featuredImage: "/placeholder.jpg",
    sections: [
      {
        type: "hero",
        title: "Immersive Stage",
        subtitle: "Spatial Web — 2025",
      },
      {
        type: "text",
        content:
          "Un ambiente scenico digitale come sistema di navigazione e racconto.",
      },
    ],
  },
];