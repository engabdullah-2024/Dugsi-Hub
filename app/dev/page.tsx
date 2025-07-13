'use client';

import { FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import me from '../assets/me.jpeg'; // Your image import

const Dev = () => {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-6
        bg-gradient-to-br from-white via-pink-100 to-pink-300
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        transition-colors duration-500
      "
    >
      <motion.div
        className="
          bg-white dark:bg-gray-900 shadow-2xl dark:shadow-black/60 rounded-xl p-10 max-w-md w-full text-center
          transition-colors duration-300
        "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Developer Image with hover rotate animation */}
        <motion.div
          className="
            relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-pink-500 shadow-lg cursor-pointer
            dark:border-pink-400
          "
          whileHover={{
            rotate: [0, 10, -10, 10, -10, 0],
            transition: { duration: 0.6 },
          }}
        >
          <Image
            src={me}
            alt="Eng Abdullah"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="160px"
            className="rounded-full"
          />
        </motion.div>

        {/* Name & Title */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Eng Abdullah</h1>
          <FaCheckCircle className="text-pink-600 dark:text-pink-400 w-7 h-7" title="Verified" />
        </div>
        <p className="text-pink-600 dark:text-pink-400 text-lg font-semibold mt-1 mb-2">
          CEO & Founder of Dugsi Hub
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Fullstack Developer / UI Designer</p>

        {/* Contact Section */}
        <div className="flex flex-col items-center space-y-3 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-pink-600 dark:text-pink-400" />
            <span className="text-base">+252613169435</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-pink-600 dark:text-pink-400" />
            <span className="text-base">enga95311@gmail.com</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-4">
            <a
              href="https://github.com/engabdullah-2024"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-600 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dev;
