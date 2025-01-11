
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
      <motion.div 
        className="max-w-4xl mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl">
          <h1 className="text-4xl font-light text-center text-white mb-8">
            Réservez votre séance découverte gratuite
          </h1>
          
          <p className="text-gray-200 text-center mb-12">
            Commencez votre voyage vers le bien-être en réservant une séance découverte gratuite.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label htmlFor="name" className="text-white">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Votre nom"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label htmlFor="email" className="text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="votre@email.com"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label htmlFor="phone" className="text-white">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Votre numéro"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label htmlFor="date" className="text-white">Date souhaitée</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label htmlFor="time" className="text-white">Heure préférée</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Sélectionnez une heure</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                </select>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label htmlFor="message" className="text-white">Message (optionnel)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                placeholder="Partagez-nous vos attentes ou questions..."
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réserver ma séance découverte
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ReservationPage;
