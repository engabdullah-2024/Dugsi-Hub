import { db } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookOpen, Search, Filter, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

export default async function CoursesPage() {
    const { userId } = await auth();
    let dbUser = null;

    if (userId) {
        dbUser = await db.user.findUnique({
            where: { userId }
        });
    }

    const isSuperAdmin = dbUser?.role === "SUPERADMIN";

    const courses = await db.course.findMany({
        where: isSuperAdmin ? {} : { published: true },
        include: {
            category: true,
            _count: {
                select: { lessons: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    return (
        <>
            <Header />
            <main className="flex-1 bg-muted/10">
                {/* Hero / Header Section */}
                <section className="w-full py-16 md:py-24 relative overflow-hidden bg-background">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-6">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                                Master New <span className="text-primary italic">Skills</span>
                            </h1>
                            <p className="max-w-[800px] text-muted-foreground md:text-xl lg:text-2xl font-medium">
                                Join thousands of learners mastering technology with premium Somalian-led educational courses.
                            </p>
                            <div className="w-full max-w-2xl mt-8 relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="What do you want to learn today?"
                                    className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 bg-background shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-lg"
                                />
                                <Button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-2xl px-6 py-6 font-bold shadow-lg">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Course Grid Section */}
                <section className="w-full pb-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold font-heading">Popular Courses</h2>
                            <div className="flex gap-2">
                                <Button variant="outline" className="rounded-full shadow-sm">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        {courses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-32 text-center border-4 border-dashed rounded-[3rem] bg-card">
                                <BookOpen className="h-20 w-20 text-muted-foreground mb-6 opacity-10" />
                                <h3 className="text-2xl font-bold">No courses available yet</h3>
                                <p className="text-muted-foreground max-w-sm">We're currently preparing new content for you. Sign up to get notified!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {courses.map((course: any) => (
                                    <Link key={course.id} href={`/courses/${course.id}`} className="group relative">
                                        <div className="h-full rounded-[2rem] border bg-card overflow-hidden shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col group-hover:border-primary/50 border-transparent bg-background">
                                            {/* Course Image */}
                                            <div className="aspect-[16/10] relative overflow-hidden">
                                                {course.imageUrl ? (
                                                    <img
                                                        src={course.imageUrl}
                                                        alt={course.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                                                        <BookOpen className="h-12 w-12 text-primary/30" />
                                                    </div>
                                                )}
                                                <div className="absolute top-4 left-4">
                                                    <span className="rounded-full bg-background/90 backdrop-blur-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">
                                                        {course.category.name}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Course Details */}
                                            <div className="p-7 flex flex-col flex-1">
                                                <div className="flex items-center gap-1 mb-3">
                                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                    ))}
                                                    <span className="text-[10px] font-bold text-muted-foreground ml-1">(4.8)</span>
                                                </div>

                                                <h3 className="font-extrabold text-xl mb-3 line-clamp-1 group-hover:text-primary transition-colors leading-tight">
                                                    {course.title}
                                                </h3>

                                                <p className="text-sm font-medium text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                                                    {course.description}
                                                </p>

                                                <div className="mt-auto pt-6 flex items-center justify-between border-t border-muted-foreground/10">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                                        <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                                                            <BookOpen className="h-3 w-3 text-primary" />
                                                        </div>
                                                        {course._count.lessons} Lessons
                                                    </div>

                                                    <div className="flex flex-col items-end">
                                                        {isSuperAdmin && !course.published && (
                                                            <span className="text-[9px] font-black uppercase text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full mb-1">
                                                                Draft
                                                            </span>
                                                        )}
                                                        <span className="text-2xl font-black text-primary">
                                                            {course.price === 0 ? "Free" : `$${course.price}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
