import React from "react";

const CoachingPersonnalisePage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Coaching Personnalisé</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Questionnaire d&apos;entrée
          </h2>
          <p>Formulaire pour évaluer vos besoins et objectifs.</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Profil dynamique</h2>
          <p>Votre espace personnalisé pour suivre votre progression.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Recommandations adaptatives
          </h2>
          <p>Suggestions personnalisées basées sur votre profil.</p>
        </div>
      </div>
    </div>
  );
};

export default CoachingPersonnalisePage;
