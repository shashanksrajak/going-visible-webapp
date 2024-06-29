"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)

export async function analyseMood(moodText) {
    console.log("analyseMood")

    const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze the mood sentiment of the following text of a person and classify them as POSITIVE, NEGATIVE, or NEUTRAL and then based on the result write a suggestion to improve the mood. ${moodText}`

    const result = await aiModel.generateContent([prompt])

    console.log(result)

    const response = result.response.text();

    return response
}