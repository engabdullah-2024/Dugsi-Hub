import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { syncUser } from "@/app/actions/user"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
  PlayCircle,
  ArrowRight,
  Zap,
  Layout,
  Shield,
  Globe,
  Monitor,
  Coffee
} from "lucide-react"
import { HeroSignUpButton } from "@/components/clerk-auth-buttons"
import { db } from "@/lib/prisma"

export default async function Home() {
  const { userId } = await auth()

  if (userId) {
    await syncUser()
  }

  // Fetch some featured courses for the homepage
  const featuredCourses = await db.course.findMany({
    where: { published: true },
    take: 3,
    include: {
      category: true,
      enrollments: true
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="relative w-full py-20 lg:py-32 xl:py-40 overflow-hidden">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-0 right-0 -m-10 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 -m-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

          <div className="container mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-10 animate-fade-in shadow-sm">
              <Zap className="h-4 w-4 fill-indigo-600" />
              Revolutionizing Education
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 leading-[0.9] mb-8 animate-slide-up">
              Master Your <span className="text-indigo-600 italic">Future</span> <br />
              Skills with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700">Expertise.</span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl font-medium text-slate-500 mb-12 animate-slide-up delay-100 leading-relaxed">
              Join over <span className="text-slate-900 font-bold">12,000+ students</span> mastering professional skills in IT, Design, and Business with our world-class courses.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 animate-slide-up delay-200">
              <HeroSignUpButton />
              <Link href="/courses">
                <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-black border-2 border-slate-100 hover:border-indigo-600 transition-all hover:bg-indigo-50 group shadow-lg shadow-slate-100">
                  Explore Library
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Hero Sub-Visual (Floating Badges Mockup) */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
              {['Modern UI/UX', 'Cloud Engineering', 'AI Mastery', 'Data Science'].map((skill) => (
                <div key={skill} className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TRUST BAR --- */}
        <section className="py-12 border-y border-slate-50 bg-slate-50/30">
          <div className="container mx-auto px-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Trusted by industry leaders worldwide</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              {[Monitor, Layout, Globe, Shield, Coffee, Zap].map((Icon, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="h-6 w-6" />
                  <span className="font-black text-xl tracking-tighter">BRAND_{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CATEGORIES SECTION --- */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                  Top Professional <br /> <span className="text-indigo-600 italic underline decoration-indigo-200 underline-offset-8">Categories</span>
                </h2>
              </div>
              <Link href="/courses">
                <Button variant="link" className="text-indigo-600 font-black p-0 h-auto hover:text-indigo-700 uppercase tracking-widest text-xs">
                  See all Categories <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Web Development", lessons: 45, icon: Monitor, color: "indigo" },
                { title: "Graphic Design", lessons: 28, icon: Layout, color: "purple" },
                { title: "Cyber Security", lessons: 12, icon: Shield, color: "pink" },
                { title: "Digital Marketing", lessons: 34, icon: Globe, color: "emerald" },
              ].map((cat) => (
                <div key={cat.title} className="group cursor-pointer">
                  <div className="h-full p-8 rounded-[2.5rem] border-2 border-slate-50 bg-white transition-all hover:border-indigo-100 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
                    <div className={`absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 bg-${cat.color}-500/5 rounded-full blur-2xl group-hover:bg-${cat.color}-500/10 transition-colors`} />
                    <div className={`h-14 w-14 rounded-2xl bg-${cat.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <cat.icon className={`h-7 w-7 text-${cat.color}-600`} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{cat.title}</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{cat.lessons} Premium Courses</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURED COURSES --- */}
        <section className="py-24 lg:py-32 bg-slate-900 text-white rounded-[4rem] mx-4 lg:mx-10 my-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 right-0 -m-10 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[150px]" />

          <div className="container mx-auto px-6 lg:px-10 relative z-10">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Choice of the Month</h2>
              <p className="text-white/50 text-lg md:text-xl font-medium max-w-2xl mx-auto italic">Learn something new and broaden your perspectives with our globally trending selection.</p>
            </div>

            {featuredCourses.length === 0 ? (
              <div className="flex flex-col items-center gap-6 py-20 text-white/20">
                <BookOpen className="h-20 w-20 stroke-[1]" />
                <p className="font-bold uppercase tracking-widest text-sm">More Courses Coming Soon</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {featuredCourses.map((course: any) => (
                  <Link key={course.id} href={`/courses/${course.id}`} className="group">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] overflow-hidden hover:bg-white/10 transition-all hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col h-full">
                      <div className="aspect-video relative p-3">
                        {course.imageUrl ? (
                          <img src={course.imageUrl} className="h-full w-full object-cover rounded-[2.2rem]" alt="" />
                        ) : (
                          <div className="h-full w-full bg-indigo-500/20 rounded-[2.2rem] flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-indigo-400/50" />
                          </div>
                        )}
                        <div className="absolute top-6 left-6 uppercase text-[10px] font-black tracking-[0.2em] bg-white text-slate-900 px-4 py-1.5 rounded-full shadow-lg">
                          {course.category?.name || "Premium"}
                        </div>
                      </div>
                      <div className="p-8 space-y-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-black tracking-tight leading-snug line-clamp-2">{course.title}</h3>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                              <Users className="h-5 w-5" />
                            </div>
                            <span className="font-black text-sm uppercase tracking-tighter">{course.enrollments?.length || 0} Students</span>
                          </div>
                          <div className="text-2xl font-black text-indigo-400">${course.price || "Free"}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-20 text-center">
              <Link href="/courses">
                <Button size="lg" className="rounded-full h-16 px-10 bg-indigo-600 hover:bg-white hover:text-indigo-600 transition-all font-black text-lg uppercase tracking-widest shadow-2xl shadow-indigo-500/20">
                  Start Watching All 100+ Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- WHY DUGSIHUB --- */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[4rem] relative overflow-hidden p-10">
                <div className="absolute -top-20 -right-20 h-64 w-64 bg-white/50 blur-3xl opacity-50" />
                <div className="h-full w-full border-4 border-white/50 rounded-[3rem] shadow-inner flex items-center justify-center bg-white/30 backdrop-blur-md">
                  <div className="text-center space-y-4">
                    <Award className="h-20 w-20 text-indigo-600 mx-auto transition-transform hover:scale-110 duration-500" />
                    <p className="text-xl font-black text-slate-800 tracking-tighter uppercase italic">Quality Guaranteed</p>
                  </div>
                </div>

                {/* Floating Stat Badges */}
                <div className="absolute top-10 right-10 p-6 bg-white rounded-3xl shadow-2xl border border-slate-50 animate-bounce-slow">
                  <p className="text-3xl font-black text-indigo-600">98%</p>
                  <p className="text-[10px] font-black uppercase text-slate-400">Success Rate</p>
                </div>
                <div className="absolute bottom-10 left-10 p-6 bg-white rounded-3xl shadow-2xl border border-slate-50 animate-float">
                  <p className="text-3xl font-black text-emerald-600">5k+</p>
                  <p className="text-[10px] font-black uppercase text-slate-400">Certificates Issued</p>
                </div>
              </div>
            </div>

            <div className="space-y-12 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">
                  <div className="h-px w-6 bg-indigo-600" />
                  Why Choose DugsiHub
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight">
                  Learning That <br /> <span className="text-indigo-600 italic">Actually</span> Works.
                </h1>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Unlike traditional platforms, we focus on hands-on practical skills. We don't just teach you how to write code, we teach you how to build products.
                </p>
              </div>

              <div className="grid gap-8">
                {[
                  { title: "Personal Analytics", desc: "Track your progress with advanced dashboards and insights.", icon: TrendingUp },
                  { title: "Lifetime Access", desc: "Buy once, access forever. No recurring monthly fees ever.", icon: Zap },
                  { title: "Industry Mentors", desc: "Learn directly from seniors working at top global tech firms.", icon: Users },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-6 group">
                    <div className="h-14 w-14 flex-shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors group-hover:border-indigo-600">
                      <feature.icon className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-1 pt-1">
                      <h4 className="font-black text-xl text-slate-900 uppercase tracking-tight italic">{feature.title}</h4>
                      <p className="text-slate-500 font-medium text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- MOCK NEWSLETTER / CTA --- */}
        <section className="py-24 lg:py-40 relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="container mx-auto px-6 lg:px-10 text-center space-y-10">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic">
                Ready to join the <br /> <span className="text-indigo-600 uppercase not-italic">Elite?</span>
              </h2>
              <p className="text-xl text-slate-500 font-bold max-w-xl mx-auto">
                Start learning today and get closer to your professional goals. Join DugsiHub now.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="w-full sm:w-80 group">
                <input
                  placeholder="Enter your email address"
                  className="w-full h-16 px-8 rounded-full border-2 border-slate-100 focus:border-indigo-600 focus:outline-none font-bold placeholder:text-slate-300 transition-all shadow-xl shadow-slate-100"
                />
              </div>
              <Button size="lg" className="rounded-full h-16 px-12 bg-indigo-600 hover:bg-slate-900 shadow-2xl shadow-indigo-500/20 font-black text-lg uppercase tracking-widest transition-all">
                Get Started Free
              </Button>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">No Credit Card Required • Full Lifetime Access</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
