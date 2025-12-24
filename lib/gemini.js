"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateWords() {
    try {
        const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash-001" });

        const jsonSchema = `
            [
                  {
                        "word": "string",
                        "translation": "string",
                        "definition": "string",
                        "partOfSpeech": "string",
                        "level": "string"
                  }
            ]
            `

        const prompt = `
            Generate a list of 50 English vocabulary words for a learning game.
            Return ONLY a raw JSON array. Do not include markdown formatting (like \`\`\`json).
            Follow this schema:
            ${jsonSchema}

            Ensure the words vary in difficulty levels (A1, A2, B1, B2, C1, C2).
            For 'translation', provide the Thai translation.
            `

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const words = JSON.parse(jsonText);

        return {
            status: true,
            data: words
        };
    } catch (error) {
        console.error("Gemini Error:", error);
        return {
            status: false,
            message: error.message
        }
    }
}