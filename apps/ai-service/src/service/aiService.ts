
import { gemini } from "../utils/gemini"

interface SymptomsInput {
    option1: String
    option2: String
    option3: String
    option4: String
    option5: String
}

export const aiSymptomsService = async (data: SymptomsInput) => {
    try {
        const { option1, option2, option3, option4, option5 } = data



        const prompt = `
            You are an AI healthcare triage assistant.

            Analyze the following symptoms:
            1. ${option1}
            2. ${option2}
            3. ${option3}
            4. ${option4}
            5. ${option5}

            Your task:
            - Identify the most likely medical conditions related to these symptoms.
            - Return ONLY valid JSON.
            - Do not include markdown, explanations, headings, or extra text.
            - Do not claim a confirmed diagnosis.
            - Use professional medical terminology.
            - Include emergency warning signs if applicable.

            Return JSON in this exact format:

            {
            "possible_conditions": [
                {
                "condition": "Condition name",
                "probability": "High",
                "reason": "Short medical reasoning"
                },
                {
                "condition": "Condition name",
                "probability": "Medium",
                "reason": "Short medical reasoning"
                },
                {
                "condition": "Condition name",
                "probability": "Low",
                "reason": "Short medical reasoning"
                }
            ],
            "recommended_specialist": "General Physician",
            "triage_level": "Low | Medium | High | Emergency",
            "red_flags": [
                "warning sign 1",
                "warning sign 2"
            ],
            "home_care": [
                "advice 1",
                "advice 2"
            ],
            "disclaimer": "This is not a confirmed diagnosis. Consult a licensed healthcare professional for proper evaluation."
            }

            Important:
            - If symptoms suggest a life-threatening condition, set triage_level to "Emergency".
            - Keep each reason under 25 words.
            - Ensure the output is valid JSON that can be parsed directly with JSON.parse().
            `;

        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        let jsonResponse;

        const rowtext = response.text?.replace(/```json/g, "").replace(/```/g, "").trim()
        if (!rowtext) {
            throw new Error("No response from AI")
        }
        jsonResponse = JSON.parse(rowtext)

        return jsonResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}