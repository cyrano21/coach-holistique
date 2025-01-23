import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

function HeroSection() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/home/home.jpg';
    img.onload = () => setBackgroundLoaded(true);
    img.onerror = () => {
      console.error('Background image failed to load');
      setBackgroundLoaded(true);
    };
  }, []);

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        backgroundLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url('/images/home/home.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(26, 26, 46, 0.7)', // Soft dark overlay
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center z-10">
        <div className="text-white space-y-8">
          <div className="relative py-4 px-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500">
            <h1 
              className="text-6xl md:text-8xl font-extrabold leading-tight tracking-wide text-white"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
              }}
            >
              Rêvez en Grand Vivez en Lumière
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-gray-100 leading-relaxed italic font-medium">
            Plongez dans l&apos;univers où chaque rêve devient une possibilité,
            où chaque pas vous rapproche de l&apos;extraordinaire. <br />
            Votre voyage commence ici, là où le cœur guide et l&apos;esprit crée
            des merveilles.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-10 py-4 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 font-bold uppercase tracking-wider">
              Explorer l&apos;Inconnu
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 font-bold uppercase tracking-wider">
              Rejoindre l&apos;Aventure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
