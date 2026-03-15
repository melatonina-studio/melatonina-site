export type ServiceItem = {
  id: "event" | "spatial" | "commerce";
  eyebrow: string;
  title: string;
  description: string;
  sceneLabel: string;
};

export const siteContent = {
  hero: {
    eyebrow: "melatonina.design",
    title: "Spatial Web Experiences, Event Experiences, Interactive Commerce",
    subtitle:
      "Progettiamo ambienti digitali, interfacce scenografiche e sistemi interattivi che uniscono design, tecnologia e immaginario.",
    primaryCta: {
      label: "Esplora i progetti",
      href: "#projects",
    },
    secondaryCta: {
      label: "Contatti",
      href: "#contact",
    },
  },

  services: [
    {
      id: "event",
      eyebrow: "01",
      title: "Event Experiences",
      description:
        "RSVP system, check-in, visual flow, interfacce per eventi e momenti dal vivo.",
      sceneLabel: "Event Scene Preview",
    },
    {
      id: "spatial",
      eyebrow: "02",
      title: "Spatial Web",
      description:
        "Ambienti digitali immersivi, architetture web teatrali e narrazioni spaziali.",
      sceneLabel: "Spatial Scene Preview",
    },
    {
      id: "commerce",
      eyebrow: "03",
      title: "Interactive Commerce",
      description:
        "Esperienze prodotto, configuratori, oggetti dinamici e shopping più vivo.",
      sceneLabel: "Commerce Scene Preview",
    },
  ] satisfies ServiceItem[],

  contact: {
    title: "Parliamo del tuo progetto",
    text: "Se vuoi costruire un sito, una demo interattiva o un’esperienza digitale con una forte identità visiva, questa è la tana giusta.",
    ctaLabel: "Scrivimi",
    ctaHref: "mailto:hello@melatonina.design",
  },
};