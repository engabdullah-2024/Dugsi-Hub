'use client';

import React, { useState } from 'react';
import { FaBookOpen, FaQuran } from 'react-icons/fa';

const subjects = [
  { key: 'Somali', icon: <FaBookOpen /> },
  { key: 'Islamic', icon: <FaQuran /> },
];

const videos: Record<string, { title: string; url: string }[]> = {
  Somali: [
    {
      title:
        'Cutubka 3aad: Miisaanka Maansada (Erayga Lidkiisa iyo Eray Kale oo La Macno ah)',
      url: 'https://www.youtube.com/embed/ZZ5akWsMLJE?rel=0',
    },
    {
      title: 'Cutubka 4aad: Mudnaan Badan',
      url: 'https://www.youtube.com/embed/XEdOVFskTQo?rel=0',
    },
  ],
  Islamic: [
    {
      title: 'TARBIYO FORM FOUR CASHIRKA 2-AAD',
      url: 'https://www.youtube.com/embed/R2kbZR1zze4?rel=0',
    },
  ],
};

const SourcesPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('Somali');

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-white via-pink-50 to-pink-200
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        py-16 px-4 sm:px-8 transition-colors duration-500
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-white mb-12">
          🎥 Subject Video Lessons
        </h1>

        {/* Subject Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {subjects.map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => setSelectedSubject(key)}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 shadow-sm
                ${
                  selectedSubject === key
                    ? 'bg-pink-600 text-white scale-105 shadow-md'
                    : 'bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-700'
                }
              `}
            >
              <span className="text-lg">{icon}</span> {key}
            </button>
          ))}
        </div>

        {/* Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos[selectedSubject]?.length > 0 ? (
            videos[selectedSubject].map(({ title, url }, idx) => (
              <div
                key={idx}
                className="
                  bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-black/40
                  hover:shadow-pink-200 dark:hover:shadow-pink-700
                  overflow-hidden transition transform hover:-translate-y-1 duration-300
                "
              >
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-full rounded-t-2xl"
                    src={url}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
                    {title}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
              No videos available for this subject.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourcesPage;
