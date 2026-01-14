import Link from "next/link"
import { BookOpen, Mail, MapPin, Phone } from "lucide-react"
import { FooterSignInButton, FooterSignUpButton } from "@/components/clerk-auth-buttons"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full bg-slate-950 border-t border-white/5 py-24 text-white font-outfit">
            <div className="container mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-4 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 transition-transform group-hover:rotate-6">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                    DugsiHub
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mt-1">Learn Beyond</span>
                            </div>
                        </Link>
                        <p className="max-w-sm text-lg font-medium text-white/40 leading-relaxed">
                            Empowering the next generation of digital leaders with high-fidelity, hands-on professional education. Built for scale, delivered with passion.
                        </p>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 hover:bg-indigo-600 hover:border-indigo-600 transition-all cursor-pointer group">
                                    <div className="h-4 w-4 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Explore Hub</h3>
                        <ul className="space-y-4 font-bold">
                            <li>
                                <Link href="/courses" className="text-white/60 hover:text-indigo-400 transition-colors">Course Library</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/60 hover:text-indigo-400 transition-colors">Our Mission</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/60 hover:text-indigo-400 transition-colors">Support Center</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Control Panel */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Your Account</h3>
                        <ul className="space-y-4 font-bold">
                            <li>
                                <Link href="/dashboard" className="text-white/60 hover:text-indigo-400 transition-colors">Student Dashboard</Link>
                            </li>
                            <li>
                                <FooterSignInButton />
                            </li>
                            <li>
                                <FooterSignUpButton />
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Global Office</h3>
                        <ul className="space-y-5 font-medium text-white/50 text-sm">
                            <li className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span>dugsihub16@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <span>+252 61 234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span>Mogadishu, Somalia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                        © {currentYear} Dugsi Hub Education Hub. Licensed for professional use.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                        <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
