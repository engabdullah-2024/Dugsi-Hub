'use client';

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import DugsiHubLogo from './components/DugsiHubLogo';
import { ModeToggle } from './components/ModeToggle';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-950 transition-colors duration-500">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Logo */}
      <DugsiHubLogo className="w-20 h-20 md:w-24 md:h-24 mb-6" />

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-gray-900 dark:text-white leading-tight mb-4">
        Welcome to <span className="text-pink-600 dark:text-pink-400">DugsiHub</span>
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 text-center max-w-2xl mb-8 px-4">
        Empowering Grade 12 Students — Instantly Access Free Exam PDFs & Smart Study Materials.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/exam"
          className="bg-pink-600 text-white px-6 py-3 rounded-xl shadow hover:bg-pink-700 dark:hover:bg-pink-500 transition duration-300 w-full sm:w-auto text-center"
        >
          View All Exams
        </Link>
        <Link
          href="/about"
          className="bg-white border border-pink-600 text-pink-600 px-6 py-3 rounded-xl hover:bg-pink-50 dark:bg-gray-800 dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-900 transition duration-300 w-full sm:w-auto text-center"
        >
          About DugsiHub
        </Link>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+252613169435"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-xl hover:bg-green-600 transition duration-300 z-40"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} className="sm:size-6" />
      </a>
    </section>
  );
};

export default Hero;
