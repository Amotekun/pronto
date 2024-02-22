"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"
import { useAuth } from "@clerk/nextjs"

const font = Montserrat({weight: '600', subsets: ['latin']})

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 transparent flex items-center justify-between">
            <Link 
                href="/"
                className="flex items-center"
            >
                <div className="relative h-8 w-8 mr-4">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Pronto
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button
                        variant="outline"
                        className="rounded-full"
                    >
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}