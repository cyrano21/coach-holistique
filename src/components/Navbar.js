"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path
      ? "font-medium text-yellow-300 scale-105 transform" 
      : "font-medium text-gray-100 hover:text-purple-200 hover:scale-105 transform"; 
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-purple-900 via-purple-600 to-blue-900 text-white shadow-lg z-50 backdrop-blur-sm bg-opacity-90">
      <div className="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x"></div>

      <div className="navbar-container w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-full border-2 border-purple-300 hover:border-yellow-300 transition-colors duration-300 transform hover:scale-110 animate-float">
              <Image
                src="/logo.avif"
                alt="Mon logo"
                width={50}
                height={50}
                className="rounded-full transition-transform duration-500 hover:rotate-12"
              />
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine"></div>
            </div>
            <Link href="/" prefetch className="flex items-center group">
              <span className="font-extrabold text-lg md:text-xl lg:text-2xl whitespace-nowrap bg-gradient-to-r from-white via-purple-200 to-yellow-200 bg-clip-text text-transparent group-hover:from-yellow-200 group-hover:via-purple-200 group-hover:to-white transition-all duration-500">
                Coach Holistique
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 ml-8">
            {[
              { href: "/", text: "Accueil" },
              { href: "/approches-therapeutiques", text: "Approches Thérapeutiques" },
              { href: "/methodes", text: "Méthodes" },
              { href: "/coaching-personnalise", text: "Coaching Personnalisé" },
              { href: "/parcours-spirituels", text: "Parcours Spirituels" },
              { href: "/outils-developpement", text: "Outils" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className={`relative transition-all duration-300 ease-in-out ${isActive(
                  link.href
                )} hover:animate-pulse`}
              >
                <span className="relative">
                  {link.text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-300 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}
            <Link
              href="/contact"
              prefetch
              className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 animate-pulse-slow"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          <button
            className="md:hidden relative z-50 transform transition-all duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`burger-icon ${isMenuOpen ? 'open' : ''}`}>
              <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300"></span>
              <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300"></span>
              <span className="block w-6 h-0.5 bg-white transition-all duration-300"></span>
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-purple-900 bg-opacity-95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out z-[100] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4 relative">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {[
            { href: "/", text: "Accueil" },
            { href: "/approches-therapeutiques", text: "Approches Thérapeutiques" },
            { href: "/methodes", text: "Méthodes" },
            { href: "/coaching-personnalise", text: "Coaching Personnalisé" },
            { href: "/parcours-spirituels", text: "Parcours Spirituels" },
            { href: "/outils-developpement", text: "Outils" },
          ].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              onClick={() => setIsMenuOpen(false)}
              className={`transform transition-all duration-300 delay-${
                index * 100
              } ${isActive(link.href)} text-xl py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white active:scale-95`}
            >
              {link.text}
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch
            onClick={() => setIsMenuOpen(false)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse-slow"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;