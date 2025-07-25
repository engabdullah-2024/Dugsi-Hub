'use client';

import DugsiHubLogo from './DugsiHubLogo';

const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-50 dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-2">
          <DugsiHubLogo />
          <span className="text-base font-semibold text-pink-600 dark:text-pink-500">DugsiHub</span>
        </div>

        {/* Copyright */}
        <p className="mt-2 sm:mt-0 text-sm text-gray-600 dark:text-gray-400 text-center">
          &copy; {new Date().getFullYear()} DugsiHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
