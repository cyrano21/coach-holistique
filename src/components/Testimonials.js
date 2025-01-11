

function getInitials(name) {
  return name.split(' ').map(word => word[0].toUpperCase()).join('');
}

function Testimonials() {
  const testimonials = [
    {
      text: "Le coaching holistique a transformé ma vie. Je me sens plus équilibré(e) et en harmonie avec moi-même.",
      author: "Marie L.",
      role: "Entrepreneure",
      initials: getInitials("Marie L."),
      rating: 5,
    },
    {
      text: "Une expérience extraordinaire qui m'a permis de découvrir mon véritable potentiel.",
      author: "Pierre M.",
      role: "Cadre supérieur",
      initials: getInitials("Pierre M."),
      rating: 5,
    },
    {
      text: "Un accompagnement personnalisé qui a dépassé mes attentes.",
      author: "Sophie D.",
      role: "Artiste",
      initials: getInitials("Sophie D."),
      rating: 5,
    },
  ];

  const colorVariants = [
    {
      initial: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white',
      card: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
      text: 'text-blue-900'
    },
    {
      initial: 'bg-gradient-to-br from-purple-600 to-purple-800 text-white',
      card: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
      text: 'text-purple-900'
    },
    {
      initial: 'bg-gradient-to-br from-teal-600 to-teal-800 text-white',
      card: 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200',
      text: 'text-teal-900'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Témoignages Inspirants
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Découvrez comment le coaching holistique a transformé la vie de nos
          clients
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const colorScheme = colorVariants[index % colorVariants.length];
            return (
              <div
                key={index}
                className={`
                  ${colorScheme.card}
                  rounded-xl shadow-lg 
                  hover:shadow-2xl 
                  transition-all duration-300 
                  transform hover:-translate-y-2
                  border
                  p-8
                `}
              >
                <div className="flex items-center mb-6">
                  <div className={`
                    w-12 h-12 rounded-full 
                    flex items-center justify-center 
                    font-bold text-lg mr-4
                    ${colorScheme.initial}
                    shadow-md
                  `}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${colorScheme.text}`}>
                      {testimonial.author}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className={`
                  ${colorScheme.text} 
                  opacity-80 
                  italic 
                  text-base 
                  leading-relaxed
                `}>
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
