import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { courseId } = await params;
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                published: true,
            }
        });

        if (!course) {
            return new NextResponse("This course is not published yet and cannot be purchased.", { status: 404 });
        }

        if (course.price === null || course.price === undefined) {
            return new NextResponse("Course price is not set. Please contact support.", { status: 400 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId }
        });

        if (!dbUser) {
            return new NextResponse("User profile not found in database.", { status: 404 });
        }

        const purchase = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: dbUser.id,
                    courseId: courseId
                }
            }
        });

        if (purchase) {
            return new NextResponse("You have already purchased this course.", { status: 400 });
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: course.title,
                        description: course.description || "Course Purchase",
                    },
                    unit_amount: Math.round(course.price * 100),
                }
            }
        ];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: dbUser.id,
            },
            select: {
                stripeCustomerId: true,
            }
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
            });

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: dbUser.id,
                    stripeCustomerId: customer.id,
                }
            });
        } else {
            // Verify the customer exists in the CURRENT Stripe account
            try {
                await stripe.customers.retrieve(stripeCustomer.stripeCustomerId);
            } catch (error: any) {
                if (error.status === 404 || error.message.includes("No such customer")) {
                    // Customer exists in DB but NOT in this Stripe account (common when swapping keys)
                    const customer = await stripe.customers.create({
                        email: user.emailAddresses[0].emailAddress,
                    });

                    stripeCustomer = await db.stripeCustomer.update({
                        where: { userId: dbUser.id },
                        data: {
                            stripeCustomerId: customer.id,
                        }
                    });
                } else {
                    throw error;
                }
            }
        }

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
            payment_method_types: ["card"],
            metadata: {
                courseId: course.id,
                userId: dbUser.id,
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse(`Stripe Error: ${error.message || "Unknown error"}`, { status: 500 });
    }
}
