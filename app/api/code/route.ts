import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(
    req: Request
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!messages) {
            return new NextResponse("Messages are required", {status: 400})
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API key not configured", {status: 500})
        }

        const freeTrial = await checkApiLimit();
        const upgrade = await checkSubscription();

        if (!freeTrial && !upgrade) {
            return new NextResponse("Free trial limit exceeded. Upgrade to pro", {status: 403})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        if (!upgrade) {
            await incrementApiLimit();
        }

        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("CODE_ERROR", error)
        return new NextResponse("Internal error", {status: 500})
    }
}