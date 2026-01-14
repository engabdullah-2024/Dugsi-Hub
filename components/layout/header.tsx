"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs"
import { BookOpen, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
    const { isSignedIn, user } = useUser()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <header className="sticky top-0 z-[60] w-full border-b border-white/10 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
            <nav className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group transition-transform hover:scale-105 active:scale-95">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 shadow-lg shadow-indigo-600/20 group-hover:rotate-6 transition-transform">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                            DugsiHub
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mt-0.5">Learn Beyond</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:items-center lg:space-x-10">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-black text-slate-500 transition-all hover:text-indigo-600 hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-widest"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden lg:flex lg:items-center lg:space-x-4">
                    {isSignedIn ? (
                        <div className="flex items-center gap-4">
                            <Link href={user?.publicMetadata?.role === "SUPERADMIN" ? "/admin" : "/dashboard"}>
                                <Button className="rounded-2xl font-black text-xs uppercase tracking-widest px-6 h-11 bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all hover:-translate-y-1 active:translate-y-0">
                                    Go to Dashboard
                                </Button>
                            </Link>
                            <div className="p-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
                                <div className="p-0.5 bg-white rounded-full">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <SignInButton mode="modal">
                                <Button variant="ghost" className="font-black text-xs uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl h-11 px-6">
                                    Log In
                                </Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button className="rounded-2xl font-black text-xs uppercase tracking-widest h-11 px-8 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 active:translate-y-0">
                                    Join Now
                                </Button>
                            </SignUpButton>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 rounded-2xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="container space-y-1 px-4 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <p className="text-xs text-slate-500">
                            © {new Date().getFullYear()} Dugsi Hub. All rights reserved.
                        </p>                <div className="pt-4 space-y-2">
                            {isSignedIn ? (
                                <>
                                    <Link
                                        href={user?.publicMetadata?.role === "SUPERADMIN" ? "/admin" : "/dashboard"}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Button variant="ghost" size="sm" className="w-full">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <div className="flex justify-center pt-2">
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <SignInButton mode="modal">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button size="sm" className="w-full rounded-full">
                                            Get Started
                                        </Button>
                                    </SignUpButton>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
