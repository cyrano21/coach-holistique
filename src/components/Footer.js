import React from "react";
import Link from "next/link"; // Remplacer react-router-dom par next/link

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-purple-400">
              Coach Holistique
            </h3>
            <p className="text-gray-400">
              Transformez votre vie avec une approche holistique du bien-être.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/approches"
                  className="text-gray-400 hover:text-white transition"
                >
                  Approches
                </Link>
              </li>
              <li>
                <Link
                  href="/coaching"
                  className="text-gray-400 hover:text-white transition"
                >
                  Coaching
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 07-60-78-54-89</li>
              <li>📧 minduse@gmail.com</li>
              <li>📍 Paris, France</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">
              Suivez-nous
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 Coach Holistique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
