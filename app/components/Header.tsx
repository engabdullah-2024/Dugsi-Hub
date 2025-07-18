'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DugsiHubLogo from './DugsiHubLogo';

import {
  FaHome,
  FaInfoCircle,
  FaBook,
  FaPhone,
  FaUserAlt,
  FaVideo,
  FaBars,
  FaTimes,
  FaFileAlt 
} from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home', icon: <FaHome /> },
  { href: '/about', label: 'About', icon: <FaInfoCircle /> },
  { href: '/exam', label: 'Exam', icon: <FaBook /> },
  { href: '/contact', label: 'Contact', icon: <FaPhone /> },
  { href: '/dev', label: 'Dev', icon: <FaUserAlt /> },
  { href: '/docs', label: 'Docs', icon: <FaFileAlt  /> },

 
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Main Header */}
      <header className="
        fixed top-0 left-0 w-full z-50
        bg-white/60 dark:bg-gray-900/80
        backdrop-blur-md
        shadow-md
        transition-colors duration-500
      ">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <DugsiHubLogo className="w-10 h-10" />
            <span className="text-2xl font-bold
              text-pink-600 dark:text-pink-400
              transition-colors duration-500
            ">
              Dugsi <span className="text-gray-800 dark:text-gray-300">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-lg font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`
                  transition duration-300
                  ${
                    pathname === href
                      ? 'text-pink-600 font-semibold dark:text-pink-400'
                      : 'text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400'
                  }
                `}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Button */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            bg-pink-600 text-white
            p-4 rounded-full shadow-xl
            hover:bg-pink-700 transition
            focus:outline-none focus:ring-2 focus:ring-pink-400
            dark:focus:ring-pink-500
          "
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-40
          bg-white rounded-t-3xl border-t shadow-2xl
          px-6 py-6 space-y-4
          transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
          dark:bg-gray-900 dark:border-gray-700
        `}
      >
        {navLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className={`
              flex items-center gap-4 text-lg font-medium rounded-xl px-4 py-3
              ${
                pathname === href
                  ? 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400'
                  : 'hover:bg-pink-50 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300'
              }
              transition-colors duration-300
            `}
          >
            <span className="text-xl">{icon}</span>
            {label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Header;
