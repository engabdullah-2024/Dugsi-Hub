'use client';

import { useState } from 'react';
import Link from 'next/link';
import DugsiHubLogo from './DugsiHubLogo'; // adjust path if needed

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Dugsi Hub Home" onClick={closeMenu} className="flex items-center">
          <DugsiHubLogo className="w-12 h-12" />
          <span className="ml-2 text-2xl font-bold text-pink-600">
            Dugsi <span className="text-gray-800">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/exam', label: 'Exam' },
            { href: '/contact', label: 'Contact' },
            { href: '/dev', label: 'Dev' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-700 hover:text-pink-600 transition duration-300"
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 rounded"
        >
          {menuOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation (slide from right with opacity) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white/90 backdrop-blur-md shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
          flex flex-col`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="text-gray-700 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 rounded"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center space-y-6 py-4 flex-grow">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/exam', label: 'Exam' },
            { href: '/contact', label: 'Contact' },
            { href: '/dev', label: 'Dev' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-700 hover:text-pink-600 text-xl"
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
