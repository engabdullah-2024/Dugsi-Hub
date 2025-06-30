'use client';

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  FaBookOpen,
  FaQuran,
  FaLanguage,
  FaGlobe,
  FaCalculator,
  FaAtom,
  FaLandmark,
  FaMapMarkedAlt,
  FaFlask,
  FaLeaf,
  FaBusinessTime,
  FaTools,
} from "react-icons/fa";

// Language translation object
const translations = {
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

// Subject icons
const subjects = [
  { key: "Somali", icon: <FaBookOpen /> },
  // { key: "Islamic", icon: <FaQuran /> },
  // { key: "Arabic", icon: <FaLanguage /> },
  // { key: "English", icon: <FaGlobe /> },
  // { key: "Math", icon: <FaCalculator /> },
  // { key: "Physics", icon: <FaAtom /> },
  // { key: "History", icon: <FaLandmark /> },
  // { key: "Geography", icon: <FaMapMarkedAlt /> },
  // { key: "Biology", icon: <FaLeaf /> },
  // { key: "Chemistry", icon: <FaFlask /> },
  // { key: "Business", icon: <FaBusinessTime /> },
  // { key: "Technology", icon: <FaTools /> },
];

// PDF links for different years
const pdfLinks = {
  2020: {
    Somali: "/pdfs/Somali2020.pdf",
    Islamic: "/pdfs/Islamic2020.pdf",
    Arabic: "/pdfs/Arabic2020.pdf",
    English: "/pdfs/English2020.pdf",
    Math: "/pdfs/Math2020.pdf",
    Physics: "/pdfs/Physics2020.pdf",
    History: "/pdfs/History2020.pdf",
    Geography: "/pdfs/Geography2020.pdf",
    Biology: "/pdfs/Biology2020.pdf",
    Chemistry: "/pdfs/Chemistry2020.pdf",
    Business: "/pdfs/Business2020.pdf",
    Technology: "/pdfs/Technology2020.pdf",
  },
  2021: {
    Somali: "/pdfs/Somali2021.pdf",
    Islamic: "/pdfs/Islamic2021.pdf",
    Arabic: "/pdfs/Arabic2021.pdf",
    English: "/pdfs/English2021.pdf",
    Math: "/pdfs/Math2021.pdf",
    Physics: "/pdfs/Physics2021.pdf",
    History: "/pdfs/History2021.pdf",
    Geography: "/pdfs/Geography2021.pdf",
    Biology: "/pdfs/Biology2021.pdf",
    Chemistry: "/pdfs/Chemistry2021.pdf",
    Business: "/pdfs/Business2021.pdf",
    Technology: "/pdfs/Technology2021.pdf",
  },
  2022: {
    Somali: "/pdfs/Somali2022.pdf",
    Islamic: "/pdfs/Islamic2022.pdf",
    Arabic: "/pdfs/Arabic2022.pdf",
    English: "/pdfs/English2022.pdf",
    Math: "/pdfs/Math2022.pdf",
    Physics: "/pdfs/Physics2022.pdf",
    History: "/pdfs/History2022.pdf",
    Geography: "/pdfs/Geography2022.pdf",
    Biology: "/pdfs/Biology2022.pdf",
    Chemistry: "/pdfs/Chemistry2022.pdf",
    Business: "/pdfs/Business2022.pdf",
    Technology: "/pdfs/Technology2022.pdf",
  },
  2023: {
    Somali: "/pdfs/Somali2023.pdf",
    Islamic: "/pdfs/Islamic2023.pdf",
    Arabic: "/pdfs/Arabic2023.pdf",
    English: "/pdfs/English2023.pdf",
    Math: "/pdfs/Math2023.pdf",
    Physics: "/pdfs/Physics2023.pdf",
    History: "/pdfs/History2023.pdf",
    Geography: "/pdfs/Geography2023.pdf",
    Biology: "/pdfs/Biology2023.pdf",
    Chemistry: "/pdfs/Chemistry2023.pdf",
    Business: "/pdfs/Business2023.pdf",
    Technology: "/pdfs/Technology2023.pdf",
  },
  2024: {
    Somali: "/pdfs/Somali2024.pdf",
    Islamic: "/pdfs/Islamic2024.pdf",
    Arabic: "/pdfs/Arabic2024.pdf",
    English: "/pdfs/English2024.pdf",
    Math: "/pdfs/Math2024.pdf",
    Physics: "/pdfs/Physics2024.pdf",
    History: "/pdfs/History2024.pdf",
    Geography: "/pdfs/Geography2024.pdf",
    Biology: "/pdfs/Biology2024.pdf",
    Chemistry: "/pdfs/Chemistry2024.pdf",
    Business: "/pdfs/Business2024.pdf",
    Technology: "/pdfs/Technology2024.pdf",
  },
};

const Exam = () => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Fallback to English if language is not found
  const currentTranslations = translations[language] || translations.en;

  const handleDownloadAll = (subjectKey: string) => {
    Object.keys(pdfLinks).forEach((year) => {
      const link = pdfLinks[year as keyof typeof pdfLinks][subjectKey];
      if (link) {
        const a = document.createElement("a");
        a.href = link;
        a.download = `${subjectKey}${year}.pdf`;
        a.click();
      }
    });
    toast.success(`All ${currentTranslations.subjects[subjectKey]} PDFs downloaded successfully!`);
  };

  const handleDownload = (subjectKey: string, year: string) => {
    const link = pdfLinks[year as keyof typeof pdfLinks][subjectKey];
    if (link) {
      const a = document.createElement("a");
      a.href = link;
      a.download = `${subjectKey}${year}.pdf`;
      a.click();
      toast.success(`${currentTranslations.subjects[subjectKey]} PDF for ${year} downloaded successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-100 to-pink-300 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-end mb-6 space-x-4">
          <button
            onClick={() => changeLanguage("so")}
            className={`px-4 py-2 rounded-full ${
              language === "so" ? "bg-pink-600 text-white" : "bg-white text-pink-600"
            }`}
          >
            SO
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`px-4 py-2 rounded-full ${
              language === "en" ? "bg-pink-600 text-white" : "bg-white text-pink-600"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("ar")}
            className={`px-4 py-2 rounded-full ${
              language === "ar" ? "bg-pink-600 text-white" : "bg-white text-pink-600"
            }`}
          >
            AR
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">{currentTranslations.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{currentTranslations.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div key={subject.key} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
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
