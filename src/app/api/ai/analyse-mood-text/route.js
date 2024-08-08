import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@/lib/server-actions/user-auth";
import { addMoodLog } from "@/lib/server-actions/mood-logs";
import { sendMoodAlerts } from "@/lib/mood-alerts";

export async function POST(request) {
    const body = await request.json();

    const user = await currentUser();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)

    const aiModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const moodText = body.moodText;

    // Build the prompt

    const condition = user.medicalCondition;
    const age = user.age;
    const gender = user.gender;
    const bio = user.bio;

    const conditionText = condition ? `and they are dealing with ${condition}.` : '';


    // const prompt = `Analyze the mood sentiment of the following text and provide a structured response in JSON format with the following fields: "mood_sentiment" (can be POSITIVE, NEGATIVE, or NEUTRAL) and "suggestion" (a brief text suggestion to improve mood). Ensure the response matches this structure exactly.\n\nText: ${moodText}`

    const prompt = `
Analyze the mood sentiment of the following text and provide a structured response in JSON format with the following fields: 
- "mood_sentiment" (can be POSITIVE, NEGATIVE, or NEUTRAL) 
- "suggestion" (a brief text suggestion to improve mood) 
- "tips" (a brief text suggestion for family and friends to help uplift the person's mood). 
Ensure the response matches this structure exactly. 

The person is ${age} years old, their gender is ${gender}, their bio is ${bio} ${conditionText}

Text: ${moodText}
`;

    const result = await aiModel.generateContent([prompt])


    const response = result.response.text();

    const jsonResponse = JSON.parse(response);

    // Access the mood sentiment and suggestion
    const moodSentiment = jsonResponse.mood_sentiment;
    const tips = jsonResponse.tips;

    if (moodSentiment === 'NEGATIVE') {
        sendMoodAlerts(tips);
    }

    // store data in firestore
    await addMoodLog(user.uid, moodText, jsonResponse);


    return Response.json(jsonResponse);
}
