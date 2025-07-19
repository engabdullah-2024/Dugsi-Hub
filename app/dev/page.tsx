'use client';

import {
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFramer,
} from 'react-icons/si';
import Image from 'next/image';
import { motion } from 'framer-motion';
import me from '../assets/me.jpeg';

const techStack = [
  { name: 'React', icon: <SiReact className="text-blue-500" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" /> },
  { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" /> },
  { name: 'Express', icon: <SiExpress className="text-gray-700 dark:text-gray-300" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
  { name: 'Framer Motion', icon: <SiFramer className="text-pink-500" /> },
];

const Dev = () => {
  return (
    <div className="pt-20 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="md:w-80 w-full md:sticky top-24 self-start h-fit bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-6 shadow-md border-r border-gray-200 dark:border-gray-800 flex flex-col items-center z-10">
        <motion.div
          className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-pink-600 dark:border-pink-400 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={me}
            alt="Eng Abdullah"
            fill
            className="object-cover rounded-full"
            priority
            sizes="128px"
          />
        </motion.div>

        <h1 className="text-2xl font-bold text-center flex items-center gap-2">
          Eng Abdullah <FaCheckCircle className="text-pink-500 dark:text-pink-400" />
        </h1>
        <p className="text-sm text-pink-600 dark:text-pink-400 mt-1 mb-3 text-center">
          Fullstack Developer & Tech Lead
        </p>

        <div className="text-sm space-y-2 w-full">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-pink-500" />
            <span>+252 613169435</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-pink-500" />
            <span>enga95311@gmail.com</span>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <a href="https://github.com/engabdullah-2024" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-xl hover:text-black dark:hover:text-white" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-xl text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-10 py-8 space-y-12">
        {/* About */}
        <section>
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-2">About Me</h2>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            I'm a fullstack developer passionate about building scalable, maintainable, and visually engaging digital products. I transform complex requirements into high-performing systems and love mentoring devs, leading Agile teams, and architecting full-featured apps.
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-2">Experience</h2>
          <ul className="space-y-2 text-base">
            <li>
              <span className="font-semibold">Dugsi Hub</span> — CEO & Tech Lead (2025-Present)
            </li>
            <li>
              <span className="font-semibold">Soplang </span>  — CEO & Tech Lead (2025-Present)
            </li>
            <li>
              <span className="font-semibold">Mentor</span> — Guided junior devs through code and career growth
            </li>
          </ul>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              'System Design',
              'UI/UX',
              'API Development',
              'Performance Tuning',
              'Agile Leadership',
            ].map(skill => (
              <span
                key={skill}
                className="px-3 py-1 bg-pink-100 dark:bg-pink-800 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-2">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
            {techStack.map(({ name, icon }) => (
              <div
                key={name}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg group hover:shadow transition"
              >
                <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                  {icon}
                </span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dev;
