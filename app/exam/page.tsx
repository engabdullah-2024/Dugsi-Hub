'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaBookOpen } from 'react-icons/fa';

// Define allowed language keys
type Language = 'en' | 'so' | 'ar';

// Translations typed properly
const translations: Record<
  Language,
  {
    title: string;
    description: string;
    download: string;
    downloadAll: string;
    subjects: Record<string, string>;
  }
> = {
  en: {
    title: '2019-2024 Grade 12 Exam PDFs',
    description: 'Download your exam papers with one click.',
    download: 'Download PDF',
    downloadAll: 'Download All PDFs',
    subjects: {
      Somali: 'Somali',
      Islamic: 'Islamic',
      Arabic: 'Arabic',
      English: 'English',
      Math: 'Math',
      Physics: 'Physics',
      History: 'History',
      Geography: 'Geography',
      Biology: 'Biology',
      Chemistry: 'Chemistry',
      Business: 'Business',
      Technology: 'Technology',
    },
  },
  so: {
    title: 'Imtixaannada Fasalka 12aad -  2019-2024',
    description: 'Ku soo degso waraaqaha imtixaanka hal gujin.',
    download: 'Soo Degso PDF',
    downloadAll: 'Soo Degso Dhammaan PDFs',
    subjects: {
      Somali: 'Af-Soomaali',
      Islamic: 'Tarbiyada Islaamka',
      Arabic: 'Carabi',
      English: 'Ingiriisi',
      Math: 'Xisaab',
      Physics: 'Fiiskis',
      History: 'Taariikh',
      Geography: 'Juquraafi',
      Biology: 'Bayoolaji',
      Chemistry: 'Kimistari',
      Business: 'Ganacsi',
      Technology: 'Tignoolajiyada',
    },
  },
  ar: {
    title: '2019-امتحانات الصف الثاني عشر - 2024',
    description: 'قم بتنزيل أوراق الامتحان بنقرة واحدة.',
    download: 'تحميل PDF',
    downloadAll: 'تحميل جميع ملفات PDF',
    subjects: {
      Somali: 'اللغة الصومالية',
      Islamic: 'التربية الإسلامية',
      Arabic: 'اللغة العربية',
      English: 'اللغة الإنجليزية',
      Math: 'الرياضيات',
      Physics: 'الفيزياء',
      History: 'التاريخ',
      Geography: 'الجغرافيا',
      Biology: 'الأحياء',
      Chemistry: 'الكيمياء',
      Business: 'إدارة الأعمال',
      Technology: 'التكنولوجيا',
    },
  },
};

// Subject icons (example uses only Somali for simplicity)
const subjects = [{ key: 'Somali', icon: <FaBookOpen /> }];

// Your PDF links (sample for 2020 only for brevity)
const pdfLinks: Record<number, Record<string, string>> = {
  2020: {
    Somali: '/pdfs/Somali2020.pdf',
    Islamic: '/pdfs/Islamic2020.pdf',
    Arabic: '/pdfs/Arabic2020.pdf',
    English: '/pdfs/English2020.pdf',
    Math: '/pdfs/Math2020.pdf',
    Physics: '/pdfs/Physics2020.pdf',
    History: '/pdfs/History2020.pdf',
    Geography: '/pdfs/Geography2020.pdf',
    Biology: '/pdfs/Biology2020.pdf',
    Chemistry: '/pdfs/Chemistry2020.pdf',
    Business: '/pdfs/Business2020.pdf',
    Technology: '/pdfs/Technology2020.pdf',
  },
  // add other years similarly...
};

const Exam = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && ['en', 'so', 'ar'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Now this is type safe!
  const currentTranslations = translations[language] || translations.en;

  const handleDownloadAll = (subjectKey: string) => {
    Object.keys(pdfLinks).forEach((year) => {
      const link = pdfLinks[Number(year)][subjectKey];
      if (link) {
        const a = document.createElement('a');
        a.href = link;
        a.download = `${subjectKey}${year}.pdf`;
        a.click();
      }
    });
    toast.success(`All ${currentTranslations.subjects[subjectKey]} PDFs downloaded successfully!`);
  };

  const handleDownload = (subjectKey: string, year: string) => {
    const link = pdfLinks[Number(year)][subjectKey];
    if (link) {
      const a = document.createElement('a');
      a.href = link;
      a.download = `${subjectKey}${year}.pdf`;
      a.click();
      toast.success(`${currentTranslations.subjects[subjectKey]} PDF for ${year} downloaded successfully!`);
    } else {
      toast.error('PDF link not found!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-100 to-pink-300 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Language Selector */}
        <div className="flex justify-end mb-6 space-x-4">
          {(['so', 'en', 'ar'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`px-4 py-2 rounded-full ${
                language === lang ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">{currentTranslations.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{currentTranslations.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.key}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
            >
              <div className="text-4xl text-pink-500 mb-3">{subject.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{currentTranslations.subjects[subject.key]}</h3>
              <div className="space-y-2 mt-4 w-full">
                <button
                  className="w-full px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                  onClick={() => handleDownloadAll(subject.key)}
                >
                  {currentTranslations.downloadAll}
                </button>
                {Object.keys(pdfLinks).map((year) => (
                  <button
                    key={year}
                    className="w-full px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                    onClick={() => handleDownload(subject.key, year)}
                  >
                    {currentTranslations.download} ({year})
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exam;
