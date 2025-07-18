"use client";

import DugsiHubLogo from "../components/DugsiHubLogo";
import { ModeToggle } from "../components/ModeToggle";
import { FaBookOpen, FaGraduationCap, FaCloudDownloadAlt } from "react-icons/fa";

const AboutPage = () => {
  return (
    <main
      className="
        min-h-screen pt-24
        bg-gradient-to-br from-white via-pink-50 to-pink-100
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
        flex flex-col items-center px-4 md:px-8 transition-colors duration-500
      "
    >
      {/* Dark Mode Toggle Floating */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Logo */}
      <DugsiHubLogo className="w-20 h-20 md:w-28 md:h-28 mb-4" />

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-pink-700 dark:text-pink-400 text-center mb-4">
        About <span className="text-pink-900 dark:text-pink-500">Dugsi Hub</span>
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 text-center max-w-2xl mb-6 leading-relaxed">
        Dugsi Hub is a free digital platform that empowers Grade 12 students with access to reliable and well-organized exam materials, lessons, and downloadable PDF resources.
      </p>

      {/* Mission Card Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl w-full px-4">
        {/* Mission 1 */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-xl border dark:border-gray-800 text-center">
          <FaBookOpen className="text-pink-500 text-4xl mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-400 mb-2">Well-Structured PDFs</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Download exam-ready notes organized by subject and unit.
          </p>
        </div>

        {/* Mission 2 */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-xl border dark:border-gray-800 text-center">
          <FaGraduationCap className="text-pink-500 text-4xl mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-400 mb-2">Focused on Grade 12</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Built especially for Grade 12 students preparing for national exams.
          </p>
        </div>

        {/* Mission 3 */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-xl border dark:border-gray-800 text-center">
          <FaCloudDownloadAlt className="text-pink-500 text-4xl mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-400 mb-2">Access Anytime</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            No login needed. Instantly download what you need — for free.
          </p>
        </div>
      </section>

      {/* Footer Text */}
      <p className="mt-12 text-sm text-gray-600 dark:text-gray-400 text-center">
        💡 Powered by <strong>Dugsi Hub</strong> – Making education easier for every Somali student.
      </p>
    </main>
  );
};

export default AboutPage;
