'use client';

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import DugsiHubLogo from './components/DugsiHubLogo';
import { ModeToggle } from './components/ModeToggle'; // Adjust path if needed

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Dark Mode Toggle top-right */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Logo */}
      <DugsiHubLogo className="w-24 h-24 mb-8" />

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
        Welcome to <span className="text-pink-600 dark:text-pink-400">Dugsi Hub</span>
      </h1>

      {/* Description */}
      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 text-center max-w-xl">
        Empowering Grade 12 Students — Instantly Access Free Exam PDFs & Smart Study Materials.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/exam"
          className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 dark:hover:bg-pink-500 transition duration-300"
        >
          View All Exams
        </Link>
        <Link
          href="/about"
          className="bg-white border border-pink-600 text-pink-600 px-6 py-3 rounded-xl hover:bg-pink-50 dark:bg-gray-800 dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-900 transition duration-300"
        >
          About Dugsi Hub
        </Link>
      </div>

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/+252613169435"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
};

export default Hero;
