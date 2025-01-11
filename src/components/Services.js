import React from "react";


function Services() {
  const services = [
    {
      title: "Coaching Personnel",
      description: "Développez votre potentiel et atteignez vos objectifs personnels avec un accompagnement sur mesure.",
      icon: "🌟",
      features: ["Séances individuelles", "Plan d'action personnalisé", "Suivi régulier"]
    },
    {
      title: "Bien-être Holistique",
      description: "Retrouvez l'harmonie entre corps, esprit et âme pour une vie plus équilibrée et épanouie.",
      icon: "🧘‍♀️",
      features: ["Méditation guidée", "Techniques de respiration", "Gestion du stress"]
    },
    {
      title: "Développement Spirituel",
      description: "Explorez votre dimension spirituelle et trouvez votre chemin vers une vie plus consciente.",
      icon: "✨",
      features: ["Exploration personnelle", "Pratiques énergétiques", "Connexion intérieure"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Nos Services</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Découvrez nos programmes conçus pour vous accompagner vers une transformation positive et durable.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 animate-bounce">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <span className="text-purple-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300">
                En savoir plus
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
