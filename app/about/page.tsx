import DugsiHubLogo from '../components/DugsiHubLogo';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Logo at top */}
      <DugsiHubLogo className="w-24 h-24 mb-8" />

      <section className="max-w-4xl bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-6">
          About <span className="text-pink-900">Dugsi Hub</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          Dugsi Hub is a modern digital platform dedicated to helping Grade 12 students access free exam PDFs for all subjects — organized and easy to find.
        </p>
        <p className="text-base md:text-lg text-gray-600 italic mb-8">
          Our mission: <strong>Empower students</strong> by providing instant access to vital educational resources, anywhere and anytime.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
