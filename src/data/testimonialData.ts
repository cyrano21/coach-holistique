export interface Testimonial {
  name: string;
  profession: string;
  quote: string;
  avatar: string;
}

export const testimonialData: Testimonial[] = [
  {
    name: "Sophie L.",
    profession: "Entrepreneur",
    quote: "Ce coaching m'a permis de reprendre confiance et de clarifier mes objectifs professionnels.",
    avatar: "/images/avatars/sophie.jpg"
  },
  {
    name: "Marc D.",
    profession: "Cadre en reconversion",
    quote: "Une approche holistique qui m'a aidé à retrouver un équilibre entre ma vie personnelle et professionnelle.",
    avatar: "/images/avatars/marc.jpg"
  },
  {
    name: "Isabelle R.",
    profession: "Professeur",
    quote: "J'ai découvert de nouveaux outils de développement personnel qui ont transformé ma façon de gérer le stress.",
    avatar: "/images/avatars/isabelle.jpg"
  }
];
