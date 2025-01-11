import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "tailwindcss/tailwind.css";

function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Arrière-plan plus clair */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 animate-gradient-xy">
        <div className="absolute inset-0 bg-[url('/images/home/home.jpg')] bg-cover bg-center mix-blend-overlay opacity-80"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div
        className="relative max-w-5xl mx-auto px-6 md:px-12 text-center"
        data-aos="fade-up"
      >
        <div className="text-white space-y-8">
          {/* Titre avec dégradé doré et fond blanc transparent + animations */}
          <div className="relative py-4 px-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 animate-float">
            <h1
              className="text-6xl md:text-8xl font-extrabold leading-tight tracking-wide animate-shimmer bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 bg-clip-text text-transparent"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundImage:
                  "linear-gradient(to right, #FFD700, #FDB931, #F0B90B)",
                backgroundSize: "200% auto",
              }}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Rêvez en Grand, Vivez en Lumière
            </h1>
          </div>

          {/* Paragraphe plus lisible avec animation de fade */}
          <p
            className="text-lg md:text-2xl text-gray-100 leading-relaxed italic font-medium animate-pulse-slow"
            data-aos="fade-up"
            data-aos-delay="400"
            style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)" }}
          >
            Plongez dans l'univers où chaque rêve devient une possibilité, où
            chaque pas vous rapproche de l'extraordinaire. <br />
            Votre voyage commence ici, là où le cœur guide et l'esprit crée des
            merveilles.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-10 py-4 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 font-bold uppercase tracking-wider animate-bounce-slow"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              Explorer l'Inconnu
            </button>
            <button
              className="border-2 border-white text-white px-10 py-4 rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 font-bold uppercase tracking-wider animate-pulse"
              data-aos="fade-left"
              data-aos-delay="800"
            >
              Rejoindre l'Aventure
            </button>
          </div>
        </div>
      </div>

      {/* Effets décoratifs améliorés */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Étoiles scintillantes */}
        <div className="absolute w-3 h-3 bg-white rounded-full opacity-50 animate-twinkle top-1/4 left-1/3"></div>
        <div className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-60 animate-twinkle-delayed top-1/2 left-1/4"></div>
        <div className="absolute w-4 h-4 bg-purple-300 rounded-full opacity-40 animate-float-delayed top-1/3 right-1/4"></div>
        <div className="absolute w-5 h-5 bg-blue-400 rounded-full opacity-30 animate-pulse-slow bottom-1/4 left-1/4"></div>

        {/* Particules flottantes */}
        <div className="absolute w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full opacity-20 animate-float top-1/6 right-1/3 blur-sm"></div>
        <div className="absolute w-6 h-6 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-30 animate-float-delayed bottom-1/3 right-1/6 blur-sm"></div>
      </div>

      {/* Overlay d'animation de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine pointer-events-none"></div>
    </section>
  );
}

export default HeroSection;

// Ajoutez ces styles dans votre fichier CSS global ou tailwind.config.js
