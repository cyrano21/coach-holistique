"use client";

import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!formData.email.trim()) newErrors.email = "Email requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email invalide";
    if (!formData.message.trim()) newErrors.message = "Message requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const date = new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          });

          setConfirmationMessage(`
            Merci pour votre message !
            
            Détails de votre demande :
            Nom : ${formData.firstName} ${formData.lastName}
            Email : ${formData.email}
            Message : ${formData.message}
            
            Date : ${date}
            
            Nous vous recontacterons dans les plus brefs délais.
            À très bientôt !
          `);
          setShowModal(true);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: ""
          });
        } else {
          alert('Erreur lors de l\'envoi du message');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Erreur lors de l\'envoi du message');
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Effacer l'erreur lors de la saisie
    const fieldName = e.target.name as keyof FormErrors;
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-16 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Commencez Votre Voyage
            </h2>
            <p className="text-purple-100 text-lg">
              Première séance de consultation gratuite
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-200 border ${
                    errors.firstName ? "border-red-400" : "border-white/20"
                  } focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition`}
                />
                {errors.firstName && (
                  <p className="text-red-200 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nom"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-200 border ${
                    errors.lastName ? "border-red-400" : "border-white/20"
                  } focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition`}
                />
                {errors.lastName && (
                  <p className="text-red-200 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-200 border ${
                  errors.email ? "border-red-400" : "border-white/20"
                } focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition`}
              />
              {errors.email && (
                <p className="text-red-200 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                rows={4}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-200 border ${
                  errors.message ? "border-red-400" : "border-white/20"
                } focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition`}
              ></textarea>
              {errors.message && (
                <p className="text-red-200 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-white text-purple-600 py-4 px-8 rounded-lg font-bold hover:bg-purple-100 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Réserver ma séance gratuite
            </button>
          </form>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-xl p-8 max-w-md mx-4 relative shadow-2xl border border-purple-100 transform animate-modalSlideIn">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors duration-200"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">Confirmation</h2>
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {confirmationMessage}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
