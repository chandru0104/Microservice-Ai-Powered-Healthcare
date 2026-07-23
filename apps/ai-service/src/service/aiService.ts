import { gemini } from "../utils/gemini";

// 1. Correct TypeScript types (lowercase 'string') and optional fields
interface SymptomsInput {
  option1: string;
  option2?: string;
  option3?: string;
  option4?: string;
  option5?: string;
}

export const aiSymptomsService = async (data: SymptomsInput) => {
  try {
    const { option1, option2, option3, option4, option5 } = data;


    const prompt = `
            You are an AI healthcare triage assistant.

            Analyze the following symptoms provided by the patient:
            ${option1},${option2},${option3},${option4},${option5}

            Your task:
            - Identify the most likely medical conditions related to these symptoms.
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
            - Output MUST be valid JSON only.
            `;

    const response = await gemini.interactions.create({
      model: "gemini-3.5-flash",
      input: prompt
    })

    const clean = response?.output_text?.trim()

    if (!clean) {
      throw new Error("No ai response")
    }

    const aiResponse = JSON.parse(clean)

    return aiResponse

  } catch (error: any) {

    throw new Error(error.message || "Failed to analyze symptoms.");
  }
};

export const aiReportService = async (file: Express.Multer.File) => {
  try {
    if (!file || !file.buffer) {
      throw new Error("Please upload a valid file");
    }

    const base64 = file.buffer.toString("base64");
    const mimeType = file.mimetype || "application/pdf";

    const prompt = `
        Analyze this medical report and return valid JSON only.

        Format:
        {
          "is_valid_medical_report": true,
          "message": "Valid medical report processed successfully.",
          "report_summary": {
            "document_type": "Blood Test Report / Prescription / etc",
            "key_findings": ["finding 1", "finding 2"],
            "summary": "Patient friendly summary",
            "actionable_next_steps": ["step 1", "step 2"]
          },
          "disclaimer": "This AI summary is for informational purposes only."
        }

        If it is NOT a valid medical report:
        {
          "is_valid_medical_report": false,
          "message": "Please upload a clear medical document.",
          "report_summary": null,
          "disclaimer": "This AI summary is for informational purposes only."
        }
        `;

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { text: prompt },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64
          }
        }
      ]
    });

    const rawText = response.text || "";
    const cleanText = rawText.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanText);
  } catch (error: any) {
    throw new Error(error.message || "Failed to process medical report");
  }
};