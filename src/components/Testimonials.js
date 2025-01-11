import Image from "next/image";

function Testimonials() {
  const testimonials = [
    {
      text: "Le coaching holistique a transformé ma vie. Je me sens plus équilibré(e) et en harmonie avec moi-même.",
      author: "Marie L.",
      role: "Entrepreneure",
      image:
        "/public/images/approches/méditation_01d6fe26-81d5-4ce4-8fd8-af5e4bb5f9a9.jpg", // Chemin de l'image
      rating: 5,
    },
    {
      text: "Une expérience extraordinaire qui m'a permis de découvrir mon véritable potentiel.",
      author: "Pierre M.",
      role: "Cadre supérieur",
      image:
        "/public/images/approches/méditation_01d6fe26-81d5-4ce4-8fd8-af5e4bb5f9a9.jpg",
      rating: 5,
    },
    {
      text: "Un accompagnement personnalisé qui a dépassé mes attentes.",
      author: "Sophie D.",
      role: "Artiste",
      image:
        "/public/images/approches/méditation_01d6fe26-81d5-4ce4-8fd8-af5e4bb5f9a9.jpg",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Témoignages Inspirants
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Découvrez comment le coaching holistique a transformé la vie de nos
          clients
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48} // Largeur de l'image
                    height={48} // Hauteur de l'image
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-800">
                    {testimonial.author}
                  </div>
                  <div className="text-purple-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
