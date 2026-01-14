"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function HeroSignUpButton() {
    return (
        <SignUpButton mode="modal">
            <Button size="lg" className="rounded-full px-8 text-lg font-semibold shadow-lg hover:shadow-primary/20 transition-all">
                Get Started Free
            </Button>
        </SignUpButton>
    );
}

export function CTASignUpButton() {
    return (
        <SignUpButton mode="modal">
            <Button size="lg" variant="secondary" className="rounded-full px-8 text-lg font-semibold">
                Get Started Now
            </Button>
        </SignUpButton>
    );
}

export function FooterSignInButton() {
    return (
        <SignInButton mode="modal">
            <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sign In
            </button>
        </SignInButton>
    );
}

export function FooterSignUpButton() {
    return (
        <SignUpButton mode="modal">
            <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sign Up
            </button>
        </SignUpButton>
    );
}

export function EnrollSignInButton({ courseId, price }: { courseId: string, price: number }) {
    return (
        <SignInButton mode="modal" forceRedirectUrl={`/courses/${courseId}`}>
            <Button className="w-full rounded-full py-6 text-lg font-bold shadow-lg" size="lg">
                {price === 0 ? "Enroll Now" : "Buy Now"}
            </Button>
        </SignInButton>
    );
}
