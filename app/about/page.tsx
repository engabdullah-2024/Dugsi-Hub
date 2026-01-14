import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BookOpen, Target, Users, Zap } from "lucide-react"

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-24 lg:py-32 relative">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-6">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                                About Dugsi Hub
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Empowering learners worldwide with cutting-edge education technology
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="w-full py-16 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
                                <p className="text-muted-foreground text-lg">
                                    At Dugsi Hub, we believe that quality education should be accessible to everyone, everywhere.
                                    Our mission is to democratize learning by providing a modern, scalable platform that connects
                                    students with expert instructors from around the world.
                                </p>
                                <p className="text-muted-foreground text-lg">
                                    We're committed to building the future of education through innovation, technology, and
                                    a deep understanding of how people learn best.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border bg-card">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold">Goal-Oriented</h3>
                                    <p className="text-sm text-muted-foreground">Focused on student success</p>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border bg-card">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                                        <Zap className="h-6 w-6 text-purple-500" />
                                    </div>
                                    <h3 className="font-bold">Fast & Efficient</h3>
                                    <p className="text-sm text-muted-foreground">Optimized learning paths</p>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border bg-card">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/10">
                                        <Users className="h-6 w-6 text-pink-500" />
                                    </div>
                                    <h3 className="font-bold">Community</h3>
                                    <p className="text-sm text-muted-foreground">Learn together, grow together</p>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border bg-card">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                                        <BookOpen className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <h3 className="font-bold">Quality Content</h3>
                                    <p className="text-sm text-muted-foreground">Expert-curated courses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="w-full py-24">
                    <div className="container px-4 md:px-6">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">Innovation</h3>
                                <p className="text-muted-foreground">
                                    We constantly push the boundaries of what's possible in online education,
                                    leveraging the latest technologies to create better learning experiences.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">Accessibility</h3>
                                <p className="text-muted-foreground">
                                    Education should be available to everyone. We work hard to make our platform
                                    accessible, affordable, and easy to use for learners of all backgrounds.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">Excellence</h3>
                                <p className="text-muted-foreground">
                                    We maintain the highest standards in course quality, platform performance,
                                    and student support to ensure the best possible outcomes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
