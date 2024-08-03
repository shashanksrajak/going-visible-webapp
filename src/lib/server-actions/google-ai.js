"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "./user-auth";
import { addMoodLog } from "./mood-logs";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)

export async function analyseMood(moodText) {
    const user = await currentUser();

    console.log("analyseMood")

    const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze the mood sentiment of the following text and provide a structured response in JSON format with the following fields: "mood_sentiment" (can be POSITIVE, NEGATIVE, or NEUTRAL) and "suggestion" (a brief text suggestion to improve mood). Ensure the response matches this structure exactly.\n\nText: ${moodText}`

    const result = await aiModel.generateContent([prompt])

    console.log(result)

    const response = result.response.text();

    console.log(response);

    // Remove potential Markdown code block formatting
    const cleanedResponse = response.replace(/```json|```/g, '').trim();

    console.log("Cleaned Response:", cleanedResponse);

    // Parse the cleaned response as JSON
    const jsonResponse = JSON.parse(cleanedResponse);

    // Access the mood sentiment and suggestion
    const moodSentiment = jsonResponse.mood_sentiment;
    const suggestion = jsonResponse.suggestion;

    console.log("Mood Sentiment:", moodSentiment);
    console.log("Suggestion:", suggestion);

    // store data in firestore
    await addMoodLog(user.uid, jsonResponse)

    return jsonResponse;
}