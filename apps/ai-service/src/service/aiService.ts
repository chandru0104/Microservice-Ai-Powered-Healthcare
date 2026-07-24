import PdfParse from "pdf-parse-new";
import { openai } from "../utils/openai";

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


    const response = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })

    const clear = response.choices[0].message?.content || "{}"

    return JSON.parse(clear)

  } catch (error: any) {
    throw new Error(error.message || "Failed to analyze symptoms.");
  }
};

export const aiReportService = async (file: any) => {
  try {

    if (!file || !file.buffer) {
      throw new Error("Please upload a valid PDF file.");
    }


    const data = PdfParse(file.buffer)

    const text = (await data).text

    if (!text || text.trim().length === 0) {
      throw new Error("Unable to extract text from the PDF.");
    }

    // AI Prompt
    const prompt = `
                    You are a medical report analysis assistant.

                    Analyze the following medical report.

                    Medical Report:
                    ${text}

                    Rules:
                    - Return ONLY valid JSON.
                    - Do not include markdown.
                    - Do not include explanation outside JSON.
                    - If this is not a medical report, return:
                    {
                      "is_valid_medical_report": false,
                      "message": "Uploaded document is not a valid medical report."
                    }

                    Otherwise return:

                    {
                      "is_valid_medical_report": true,
                      "message": "Valid medical report processed successfully.",
                      "report_summary": {
                        "document_type": "",
                        "key_findings": [],
                        "summary": "",
                        "actionable_next_steps": []
                      },
                      "disclaimer": "This AI summary is for informational purposes only and should not replace professional medical advice."
                    }
                    `;

    const response = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })

    const dataResponse = response.choices[0].message.content || "{}"

    return JSON.parse(dataResponse)

  } catch (error: any) {
    throw new Error(error.message || "Failed to analyze medical report.");
  }
};