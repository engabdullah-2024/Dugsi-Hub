import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/ModeToggle';
import Header from './components/Header';
import Footer from './components/Footer'; // ✅ Footer import

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DugsiHub – Learn, Practice, Excel 📚',
  description:
    'DugsiHub is your all-in-one educational platform for Somali students – Exams, PDFs, Sources, Videos, and more!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black dark:bg-black dark:text-white antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <div className="fixed top-4 right-4 z-50">
              <ModeToggle />
            </div>
            <main className="flex-1">{children}</main>
            <Footer /> {/* ✅ Footer added */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
