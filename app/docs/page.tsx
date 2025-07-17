'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/outline';

const contributors = [
  {
    name: 'Eng Abdullah',
    title: 'Founder & Lead Developer',
    github: 'engabdullah-2024',
  },
  {
    name: 'Eng Iltire',
    title: 'Co-Founder & UI/UX Designer',
    github: 'EngIltire',
  },
];

const repos = [
  {
    name: 'Dugsi Hub',
    description: 'Main educational platform source code',
    url: 'https://github.com/engabdullah-2024/Dugsi-Hub.git',
  },
  {
    name: 'Dugsi Hub Mobile',
    description: 'Mobile app repository',
    url: 'https://github.com/engabdullah-2024/Dugsi-Hub-Mobile.git',
  },
  {
    name: 'Dugsi Hub Backend',
    description: 'Backend API for Dugsi Hub',
    url: 'https://github.com/engabdullah-2024/Dugsi-Hub-Backend.git',
  },
];

const DocsPage = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch {
      alert('Failed to copy!');
    }
  };

  return (
    <main
      className="
        max-w-5xl mx-auto px-4 pt-32 pb-20 space-y-14
        text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-200
        transition-colors duration-500
      "
    >
      {/* What's Dugsi Hub */}
      <section>
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-4">
          📚 What is Dugsi Hub?
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Dugsi Hub is a free educational platform designed for students. It allows access to PDFs,
          videos, and subject materials with zero login — making learning accessible for everyone,
          anywhere, anytime.
        </p>
      </section>

      {/* What We Do */}
      <section>
        <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">🚀 What We Do</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We provide simplified educational resources such as:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Grade 12 subject-based exam PDFs</li>
          <li>Educational videos for Somali & Islamic studies</li>
          <li>Mobile-friendly & responsive interface</li>
        </ul>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">✨ Key Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>No login or registration needed</li>
          <li>Quick download access to all materials</li>
          <li>Sources page for watching lessons on YouTube</li>
          <li>Modern design with smooth user experience</li>
        </ul>
      </section>

      {/* Clone Commands Section */}
      <section>
        <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-6">
          🛠️ Clone & Update Repositories
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Use the following git commands to clone or update the repositories. Click the copy button to
          quickly copy commands to your clipboard.
        </p>

        <div className="space-y-8">
          {repos.map(({ name, description, url }) => {
            const cloneCommand = `git clone ${url}`;
            const updateCommand = `cd ${name.toLowerCase().replace(/\s+/g, '-')} && git pull`;

            return (
              <div
                key={url}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-1">
                  {name}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">{description}</p>

                {/* Clone Command */}
                <div className="mb-3">
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Clone Command
                  </label>
                  <div className="relative">
                    <pre
                      className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto text-sm font-mono border border-gray-300 dark:border-gray-700"
                      aria-label={`Clone command for ${name}`}
                    >
                      {cloneCommand}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(cloneCommand)}
                      aria-label="Copy clone command"
                      className="absolute right-2 top-2 p-1 rounded-md bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white transition"
                    >
                      {copiedCommand === cloneCommand ? (
                        <CheckIcon className="w-5 h-5" />
                      ) : (
                        <ClipboardIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Update Command */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Update Command (inside repo folder)
                  </label>
                  <div className="relative">
                    <pre
                      className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto text-sm font-mono border border-gray-300 dark:border-gray-700"
                      aria-label={`Update command for ${name}`}
                    >
                      {updateCommand}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(updateCommand)}
                      aria-label="Copy update command"
                      className="absolute right-2 top-2 p-1 rounded-md bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white transition"
                    >
                      {copiedCommand === updateCommand ? (
                        <CheckIcon className="w-5 h-5" />
                      ) : (
                        <ClipboardIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contributors Section */}
      <section>
        <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-8">👨‍💻 Contributors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {contributors.map(({ name, title, github }) => (
            <div
              key={github}
              className="flex flex-col items-center bg-pink-50 dark:bg-pink-900 rounded-2xl p-6 shadow-lg transition-colors"
            >
              <Image
                src={`https://avatars.githubusercontent.com/${github}`}
                alt={name}
                width={128}
                height={128}
                className="rounded-full mb-4"
                priority
              />
              <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-300">{name}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">{title}</p>
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 dark:text-pink-400 underline font-medium hover:text-pink-700 dark:hover:text-pink-300"
              >
                GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DocsPage;
