"use client"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";


export const LandingHero = () => {
    const {isSignedIn} = useAuth()

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>Welcome to Pronto</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent 
                        options={{
                            strings: [
                                "Image Generation",
                                "Video Generation",
                                "Audio Generation",
                                "Text Generation",
                                "Code Generation",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Your favourite platform is Pronto
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button 
                        variant="premium"
                        className="rounded-full md:text-lg p-4 md:p-6 font-semibold"
                    >
                        Get Started Now
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required on first 5 tries
            </div>
        </div>
    );
};