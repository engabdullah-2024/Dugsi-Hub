'use client';

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import DugsiHubLogo from './components/DugsiHubLogo';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      {/* Logo */}
      <DugsiHubLogo className="w-24 h-24 mb-8" />

      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
        Welcome to <span className="text-pink-600">Dugsi Hub</span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-700 mb-8 text-center max-w-xl">
        Empowering Grade 12 Students with Free Exam Resources – Access PDFs and Study Materials Effortlessly.
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/exam"
          className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition duration-300"
        >
          View All Exams
        </Link>
        <Link
          href="/about"
          className="bg-white border border-pink-600 text-pink-600 px-6 py-3 rounded-xl hover:bg-pink-50 transition duration-300"
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
