"use client";

import DugsiHubLogo from "../components/DugsiHubLogo";
import { ModeToggle } from "../components/ModeToggle";

const AboutPage = () => {
  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-tr from-pink-50 via-white to-pink-100
        dark:bg-gradient-to-tr dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
        flex flex-col items-center justify-center px-6 py-12
        transition-colors duration-500
      "
    >
      {/* Dark Mode Toggle floating top-right */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Logo */}
      <DugsiHubLogo className="w-24 h-24 mb-8" />

      {/* Content box */}
      <section
        className="
          max-w-4xl
          bg-white
          dark:bg-[#121212]
          rounded-3xl shadow-2xl
          p-10 md:p-16
          text-center
          transition-colors duration-500
          ring-1 ring-gray-200 dark:ring-gray-700
          drop-shadow-lg dark:drop-shadow-[0_10px_20px_rgba(255,105,180,0.4)]
        "
      >
        <h1
          className="
            text-4xl md:text-5xl
            font-extrabold
            text-pink-700
            dark:text-pink-400
            mb-6
            drop-shadow-md
          "
        >
          About{" "}
          <span className="text-pink-900 dark:text-pink-500">Dugsi Hub</span>
        </h1>
        <p
          className="
            text-lg md:text-xl
            text-gray-800
            dark:text-gray-200
            leading-relaxed
            mb-6
          "
        >
          Dugsi Hub is a modern digital platform dedicated to helping Grade 12 students access free exam PDFs for all subjects — organized and easy to find.
        </p>
        <p
          className="
            text-base md:text-lg
            text-gray-700
            dark:text-gray-400
            italic
            mb-8
          "
        >
          Our mission: <strong>Empower students</strong> by providing instant access to vital educational resources, anywhere and anytime.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
