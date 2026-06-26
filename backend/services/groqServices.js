const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function analyzeResume(resumeText, { role }) {
  try {
    const prompt = `
Analyze the following resume for the role: ${role}

Return ONLY valid JSON in this format:

{
  "atsScore": 0,
  "matchedKeywords": [],
  "missingKeywords": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "overallFeedback": ""
}

Resume:
${resumeText}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const content = completion.choices[0].message.content;

    const analysis = JSON.parse(content);

    return {
      success: true,
      analysis,
    };
  } catch (error) {
    console.error("Groq Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = { analyzeResume };