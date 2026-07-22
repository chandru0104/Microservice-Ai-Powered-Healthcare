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

export const aiReportService = async (data: Buffer) => {

    try {
        // const prompt = `
        // You are an AI medical document verification and analysis assistant.

        // TASK 1: VERIFY THE DOCUMENT
        // Check whether the uploaded image is a valid medical document such as:
        // - Blood test report
        // - Lab report
        // - Prescription
        // - X-ray / CT / MRI report
        // - Hospital discharge summary
        // - Doctor consultation note

        // If the document is NOT a valid medical document (random photo, invoice, utility bill, non-medical image, or unreadable/blurred image), return ONLY this JSON:

        // {
        // "is_valid_medical_report": false,
        // "message": "Please upload a clear medical document such as a lab report, prescription, or scan report.",
        // "report_summary": {
        //     "document_type": "",
        //     "key_findings": [],
        //     "summary": "",
        //     "actionable_next_steps": []
        // },
        // "disclaimer": "This AI summary is for informational purposes only."
        // }

        // TASK 2: ANALYZE THE DOCUMENT
        // If the document is a valid medical document:
        // - Extract the document type.
        // - Identify important findings or abnormal values.
        // - Summarize the report in simple patient-friendly language.
        // - Suggest general next steps (e.g., consult a doctor, repeat a test, follow prescribed treatment).
        // - Do NOT provide a definitive diagnosis.
        // - Return ONLY valid JSON.

        // Use this exact format:

        // {
        // "is_valid_medical_report": true,
        // "message": "Valid medical report processed successfully.",
        // "report_summary": {
        //     "document_type": "Blood Test Report",
        //     "key_findings": [
        //     "Hemoglobin is below the normal range",
        //     "Blood glucose is elevated"
        //     ],
        //     "summary": "The report shows mild anemia and elevated blood glucose levels.",
        //     "actionable_next_steps": [
        //     "Consult a physician for further evaluation",
        //     "Follow the prescribed treatment plan"
        //     ]
        // },
        // "disclaimer": "This AI summary is for informational purposes only. Please review the report with your doctor."
        // }

        // IMPORTANT:
        // - Return ONLY raw JSON.
        // - Do not include markdown, explanations, or code fences.
        // - Ensure the JSON is valid and parsable by JSON.parse().
        // `;

       const base64 = data.toString('base64');

  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        parts: [
          { text: 'Analyze this medical report and return only valid JSON.' },
          {
            inlineData: {
              mimeType: 'application/pdf',
              data: base64
            }
          }
        ]
      }
    ]
  });


  const text = response.text?.trim();

  if (!text) throw new Error('No AI response');

  return JSON.parse(text);


    } catch (error: any) {
        throw new Error(error.message)
    }


}