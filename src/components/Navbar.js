"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

import "./navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path
      ? "font-medium text-yellow-300 scale-105 transform"
      : "font-medium text-gray-100 hover:text-purple-200 hover:scale-105 transform";
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-purple-900 via-purple-600 to-blue-900 shadow-lg z-50 overflow-x-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>

      <div className="w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.avif"
                alt="Mon logo"
                width={48}
                height={48}
                priority
                className="rounded-full"
              />
            </div>
            <span className="ml-3 text-xl font-bold text-white">
              Coach Holistique
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ThemeToggle />
            <Link href="/" className={isActive("/")}>
              Accueil
            </Link>
            <Link
              href="/approches-therapeutiques"
              className={isActive("/approches-therapeutiques")}
            >
              Approches Thérapeutiques
            </Link>
            <Link href="/methodes" className={isActive("/methodes")}>
              Méthodes
            </Link>
            <Link
              href="/coaching-personnalise"
              className={isActive("/coaching-personnalise")}
            >
              Coaching Personnalisé
            </Link>
            <Link
              href="/parcours-spirituels"
              className={isActive("/parcours-spirituels")}
            >
              Parcours Spirituels
            </Link>
            <Link
              href="/outils-developpement"
              className={isActive("/outils-developpement")}
            >
              Outils
            </Link>
            <a
              href="https://new-blog-mong.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-purple-200"
            >
              Blog
            </a>
            <Link href="/contact" className={isActive("/contact")}>
              Contact
            </Link>
          </div>

          {/* Burger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-purple-800 focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Menu principal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden w-full">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="px-3 py-2">
                <ThemeToggle />
              </div>
              <Link
                href="/"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
              >
                Accueil
              </Link>
              <Link
                href="/approches-therapeutiques"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
              >
                Approches Thérapeutiques
              </Link>
              <Link
                href="/methodes"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
              >
                Méthodes
              </Link>
              <Link
                href="/coaching-personnalise"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
              >
                Coaching Personnalisé
              </Link>
              <Link
                href="/parcours-spirituels"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
              >
                Parcours Spirituels
              </Link>
              <Link
                href="/outils-developpement"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
              >
                Outils
              </Link>
              <a
                href="https://new-blog-mong.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
              >
                Blog
              </a>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
