'use client';

import Link from 'next/link';
import Image from 'next/image';

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

const DocsPage = () => {
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

      {/* How to Download & Use */}
      <section>
        <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">🛠️ How to Download & Reuse the Code</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you're a developer or student who wants to reuse or rebuild this project, follow these simple steps:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Visit our GitHub repo:{' '}
            <Link
              href="https://github.com/engabdullah-2024/Dugsi-Hub"
              target="_blank"
              className="text-pink-600 dark:text-pink-400 underline font-medium"
              rel="noopener noreferrer"
            >
              github.com/engabdullah-2024/Dugsi-Hub
            </Link>
          </li>
          <li>Click <strong>Code</strong> and choose <code>Download ZIP</code> or use Git:</li>
          <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-3 rounded-md border border-gray-300 dark:border-gray-700 overflow-x-auto">
            git clone https://github.com/engabdullah-2024/Dugsi-Hub.git
          </pre>
          <li>Navigate into the project folder:</li>
          <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-3 rounded-md border border-gray-300 dark:border-gray-700 overflow-x-auto">
            cd dugsi
          </pre>
          <li>Install dependencies:</li>
          <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-3 rounded-md border border-gray-300 dark:border-gray-700 overflow-x-auto">
            npm install
          </pre>
          <li>Run the development server:</li>
          <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-3 rounded-md border border-gray-300 dark:border-gray-700 overflow-x-auto">
            npm run dev
          </pre>
          <li>Visit <code>http://localhost:3000</code> to view the site locally.</li>
          <li>Customize any pages under <code>/app</code> or <code>/components</code>.</li>
          <li>
            Want to deploy it? Just push to GitHub and connect to{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              className="text-pink-600 dark:text-pink-400 underline"
              rel="noopener noreferrer"
            >
              vercel.com
            </a>
            .
          </li>
        </ol>
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
