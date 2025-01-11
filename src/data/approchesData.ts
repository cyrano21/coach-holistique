// Data for Therapeutic Approaches
import {approachImages} from './approchesImages';

export interface Approche {
    title : string;
    image : string;
    description : string;
    benefits : string[];
}

export interface VideoSource {
    src : string;
    title : string;
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

export const videoSources : VideoSource[] = [
    {
        src: "https://www.youtube.com/embed/V3Fpng7AZwM",
        title: "Introduction à l'Analyse Transactionnelle"
    }, {
        src: "https://www.youtube.com/embed/N3RqUYfvevY",
        title: "Introduction à la PNL"
    }, {
        src: "https://www.youtube.com/embed/L8TQZxpd_Vo",
        title: "Introduction à la Sophrologie"
    }
];

export const approchesData = {
  videos: videoSources
};
