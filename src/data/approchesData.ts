// Data for Therapeutic Approaches
import {approachImages} from './approchesImages';

export interface Approche {
    title : string;
    image : string;
    description : string;
    benefits : string[];
}

export interface VideoSource {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
}

export const approchesFirstRow : Approche[] = [
    {
        title: "AT (Analyse Transactionnelle)",
        image: approachImages.analyseTransactionnelle,
        description: "Une méthode de psychologie humaniste qui permet de comprendre les relations inte" +
                "rpersonnelles et la structure de la personnalité.",
        benefits: ["Amélioration de la communication", "Compréhension des schémas comportementaux", "Développement personnel"]
    }, {
        title: "PNL (Programmation Neuro-Linguistique)",
        image: approachImages.pnl,
        description: "Une approche de communication et de développement personnel basée sur l'étude de" +
                "s structures de l'expérience subjective.",
        benefits: ["Gestion des émotions", "Amélioration de la confiance en soi", "Techniques de communication avancées"]
    }, {
        title: "Sophrologie",
        image: approachImages.sophrologie,
        description: "Une méthode psychocorporelle utilisant la relaxation dynamique et la respiration" +
                " pour harmoniser corps et esprit.",
        benefits: ["Réduction du stress", "Amélioration du sommeil", "Renforcement du bien-être"]
    }, {
        title: "EFT (Emotional Freedom Techniques)",
        image: approachImages.eft,
        description: "Une technique de libération émotionnelle combinant la stimulation de points d'ac" +
                "upuncture et la psychologie énergétique.",
        benefits: ["Libération des blocages émotionnels", "Gestion des phobies et anxiétés", "Soulagement du stress post-traumatique"]
    }, {
        title: "Visualisation",
        image: approachImages.visualisation,
        description: "Une technique puissante utilisant l'imagination pour créer des changements posit" +
                "ifs et atteindre ses objectifs.",
        benefits: ["Développement de la créativité", "Amélioration de la concentration", "Manifestation des objectifs"]
    }, {
        title: "Méditation",
        image: approachImages.meditation,
        description: "Une pratique de pleine conscience visant à calmer l'esprit et à atteindre un éta" +
                "t de bien-être profond.",
        benefits: ["Réduction du stress et de l'anxiété", "Amélioration de la concentration et de la mémoire", "Renforcement de la résilience émotionnelle"]
    }
];

export const approchesSecondRow : Approche[] = [
    {
        title: "Thérapie Cognitivo-Comportementale",
        image: approachImages.tcc,
        description: "Une approche thérapeutique focalisée sur l'identification et la modification de " +
                "schémas de pensée et de comportement néfastes.",
        benefits: ["Gestion des émotions et des pensées négatives", "Amélioration des relations interpersonnelles", "Développement de stratégies de coping efficaces"]
    }, {
        title: "Thérapie Systémique",
        image: approachImages.systemique,
        description: "Une approche thérapeutique qui considère l'individu dans son environnement et se" +
                "s relations, pour une compréhension plus globale de ses problèmes.",
        benefits: ["Compréhension des dynamiques familiales et relationnelles", "Amélioration de la communication et de la coopération", "Développement de solutions adaptées au système"]
    }, {
        title: "Thérapie Humaniste",
        image: approachImages.humaniste,
        description: "Une approche thérapeutique qui met l'accent sur la dignité, l'autonomie et la cr" +
                "oissance personnelle de l'individu.",
        benefits: ["Valorisation de l'expérience subjective de l'individu", "Focalisation sur les buts et les valeurs personnelles", "Développement de la self-actualisation"]
    }, {
        title: "Thérapie Psychanalytique",
        image: approachImages.psychanalytique,
        description: "Une approche thérapeutique qui explore l'inconscient, les souvenirs d'enfance et" +
                " les relations passées pour comprendre les comportements et les émotions actuels" +
                ".",
        benefits: ["Exploration de l'inconscient et des souvenirs refoulés", "Compréhension des mécanismes de défense", "Développement de l'insight et de la prise de conscience"]
    }, {
        title: "Thérapie Brève",
        image: approachImages.therapieBrieve,
        description: "Une approche thérapeutique axée sur la résolution rapide et efficace des problèm" +
                "es, en se concentrant sur les solutions plutôt que sur les causes.",
        benefits: ["Résolution rapide des problèmes", "Focalisation sur les solutions et les ressources", "Développement d'une approche proactive"]
    }, {
        title: "Thérapie de Couple",
        image: approachImages.therapieCouple,
        description: "Une approche thérapeutique qui vise à améliorer la communication, la compréhensi" +
                "on et l'intimité au sein d'un couple.",
        benefits: ["Amélioration de la communication et de la compréhension", "Renforcement de l'intimité et de la connexion émotionnelle", "Résolution des conflits et développement de stratégies de coping"]
    }
];

export const videoSources: VideoSource[] = [
    {
        id: '1',
        title: 'Introduction à l\'Analyse Transactionnelle',
        description: 'Comprendre les bases de l\'Analyse Transactionnelle',
        thumbnailUrl: '/images/videos/at-thumbnail.jpg',
        videoUrl: '/videos/at-introduction.mp4'
    },
    {
        id: '2',
        title: 'PNL : Techniques de Communication',
        description: 'Découvrez les techniques de la Programmation Neuro-Linguistique',
        thumbnailUrl: '/images/videos/pnl-thumbnail.jpg',
        videoUrl: '/videos/pnl-communication.mp4'
    }
];

export const approchesData = {
  videos: [
    {
      id: '1',
      title: 'Méditation Guidée',
      description: 'Technique de relaxation profonde pour réduire le stress',
      thumbnailUrl: '/images/videos/meditation-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/embed/Tpf4iii8YSo',
      category: 'meditation'
    },
    {
      id: '2', 
      title: 'Respiration Consciente',
      description: 'Exercices de respiration pour améliorer votre bien-être',
      thumbnailUrl: '/images/videos/respiration-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/embed/wTUdQ0VY9OY',
      category: 'meditation'
    },
    {
      id: '3',
      title: 'Développement Personnel',
      description: 'Stratégies pour développer votre potentiel',
      thumbnailUrl: '/images/videos/developpement-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/embed/qvMj8-kNIqM',
      category: 'coaching'
    },
    {
      id: '4',
      title: 'Coaching de Vie',
      description: 'Accompagnement personnalisé pour atteindre vos objectifs',
      thumbnailUrl: '/images/videos/coaching-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      category: 'coaching'
    },
    {
      id: '5',
      title: 'Bonshommes Allumettes',
      description: 'Technique de libération émotionnelle par le dessin',
      thumbnailUrl: '/images/videos/bonshommes-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/embed/xvzSXcVmEFU',
      category: 'spiritualite'
    },
    {
      id: '6',
      title: 'Voyage Chamanique',
      description: 'Exploration des états de conscience modifiés',
      thumbnailUrl: '/images/videos/chakras-thumbnail.jpg',
      videoUrl: 'https://www.youtube.com/embed/qvMj8-kNIqM',
      category: 'spiritualite'
    }
  ]
};
