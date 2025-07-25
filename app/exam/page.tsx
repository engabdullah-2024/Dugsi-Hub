"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaBookOpen } from "react-icons/fa";
import { ModeToggle } from "../components/ModeToggle"; // Adjust import path

type Language = "en" | "so" | "ar";

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
    title: "2019-2024 Grade 12 Exam PDFs",
    description: "Download your exam papers with one click.",
    download: "Download PDF",
    downloadAll: "Download All PDFs",
    subjects: {
      Somali: "Somali",
      Islamic: "Islamic",
      Arabic: "Arabic",
      English: "English",
      Math: "Math",
      Physics: "Physics",
      History: "History",
      Geography: "Geography",
      Biology: "Biology",
      Chemistry: "Chemistry",
      Business: "Business",
      Technology: "Technology",
    },
  },
  so: {
    title: "Imtixaannada Fasalka 12aad -  2019-2024",
    description: "Ku soo degso waraaqaha imtixaanka hal gujin.",
    download: "Soo Degso PDF",
    downloadAll: "Soo Degso Dhammaan PDFs",
    subjects: {
      Somali: "Af-Soomaali",
      Islamic: "Tarbiyada Islaamka",
      Arabic: "Carabi",
      English: "Ingiriisi",
      Math: "Xisaab",
      Physics: "Fiiskis",
      History: "Taariikh",
      Geography: "Juquraafi",
      Biology: "Bayoolaji",
      Chemistry: "Kimistari",
      Business: "Ganacsi",
      Technology: "Tignoolajiyada",
    },
  },
  ar: {
    title: "2019-امتحانات الصف الثاني عشر - 2024",
    description: "قم بتنزيل أوراق الامتحان بنقرة واحدة.",
    download: "تحميل PDF",
    downloadAll: "تحميل جميع ملفات PDF",
    subjects: {
      Somali: "اللغة الصومالية",
      Islamic: "التربية الإسلامية",
      Arabic: "اللغة العربية",
      English: "اللغة الإنجليزية",
      Math: "الرياضيات",
      Physics: "الفيزياء",
      History: "التاريخ",
      Geography: "الجغرافيا",
      Biology: "الأحياء",
      Chemistry: "الكيمياء",
      Business: "إدارة الأعمال",
      Technology: "التكنولوجيا",
    },
  },
};

const subjects = [{ key: "Somali", icon: <FaBookOpen /> }];

const pdfLinks: Record<number, Record<string, string>> = {
  2020: {
    Somali: "/pdfs/Somali.pdf",

    
  },
  2024: {
    Somali: "/pdfs/Somali.pdf",

    
  },
  // Add other years...
};

const Exam = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && ["en", "so", "ar"].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const currentTranslations = translations[language] || translations.en;

  const handleDownloadAll = (subjectKey: string) => {
    Object.keys(pdfLinks).forEach((year) => {
      const link = pdfLinks[Number(year)][subjectKey];
      if (link) {
        const a = document.createElement("a");
        a.href = link;
        a.download = `${subjectKey}${year}.pdf`;
        a.click();
      }
    });
    toast.success(
      `All ${currentTranslations.subjects[subjectKey]} PDFs downloaded successfully!`
    );
  };

  const handleDownload = (subjectKey: string, year: string) => {
    const link = pdfLinks[Number(year)][subjectKey];
    if (link) {
      const a = document.createElement("a");
      a.href = link;
      a.download = `${subjectKey}${year}.pdf`;
      a.click();
      toast.success(
        `${currentTranslations.subjects[subjectKey]} PDF for ${year} downloaded successfully!`
      );
    } else {
      toast.error("PDF link not found!");
    }
  };

  return (
    <div
      className="
        min-h-screen pt-20 pb-10 px-6
        bg-white
        dark:bg-black
        transition-colors duration-500
      "
    >
      <div className="max-w-6xl mx-auto text-center relative">
        {/* Dark Mode Toggle top-right */}
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>

        {/* Language Selector */}
        <div className="flex justify-end mb-6 space-x-4">
          {(["so", "en", "ar"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`
                px-5 py-2 rounded-full font-semibold transition
                ${
                  language === lang
                    ? "bg-pink-700 text-white shadow-lg shadow-pink-600/60"
                    : "bg-white text-pink-700 dark:bg-gray-900 dark:text-pink-500"
                }
                hover:brightness-90
              `}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <h1
          className="
            text-4xl font-extrabold 
            text-gray-900 dark:text-white 
            mb-3
          "
        >
          {currentTranslations.title}
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {currentTranslations.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.key}
              className="
                bg-white dark:bg-gray-900
                shadow-lg dark:shadow-black/50
                rounded-xl p-6 flex flex-col items-center
                transition-colors duration-300 hover:shadow-pink-600/50
                dark:hover:shadow-pink-600/80
              "
            >
              <div className="text-5xl text-pink-700 dark:text-pink-500 mb-4">
                {subject.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-pink-400">
                {currentTranslations.subjects[subject.key]}
              </h3>
              <div className="space-y-3 mt-6 w-full">
                <button
                  className="
                    w-full px-6 py-3 bg-pink-700 text-white rounded-lg shadow-md
                    hover:bg-pink-800 dark:bg-pink-600 dark:hover:bg-pink-700 transition
                  "
                  onClick={() => handleDownloadAll(subject.key)}
                >
                  {currentTranslations.downloadAll}
                </button>
                {Object.keys(pdfLinks).map((year) => (
                  <button
                    key={year}
                    className="
                      w-full px-6 py-3 bg-pink-700 text-white rounded-lg shadow-md
                      hover:bg-pink-800 dark:bg-pink-600 dark:hover:bg-pink-700 transition
                    "
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
