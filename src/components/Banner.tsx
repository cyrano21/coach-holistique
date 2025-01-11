import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="bg-holistic-blue text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Un voyage vers soi, au croisement des sciences et de l&#39;intuition
        </h1>
        <p className="text-xl mb-8">
          Découvrez une approche holistique du développement personnel.
        </p>
        <button className="bg-white text-holistic-blue font-bold py-3 px-8 rounded-full hover:bg-holistic-gray hover:text-white transition-colors">
          Commencer votre voyage
        </button>
      </div>
    </section>
  );
};

export default Banner;
