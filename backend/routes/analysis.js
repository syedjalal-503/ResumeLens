const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Configure multer for file uploads (store in memory for processing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed."));
    }
  },
});

// Category technical keyword lists (all lowercase for matching)


// Map target role input to keywords category
function getCategoryForRole(role) {
  const r = role.toLowerCase();
  if (r.includes("front")) return "frontend";
  if (r.includes("back") || r.includes("api") || r.includes("server"))
    return "backend";
  if (r.includes("data") || r.includes("analy") || r.includes("science"))
    return "data";
  if (
    r.includes("devops") ||
    r.includes("infra") ||
    r.includes("cloud") ||
    r.includes("system")
  )
    return "devops";
  if (r.includes("product") || r.includes("project") || r.includes("manager"))
    return "product";
  return "general";
}

// Text extraction utility
async function extractText(fileBuffer, mimeType) {
  try {
    if (mimeType === "application/pdf") {
      const data = await pdfParse(fileBuffer);
      return data.text || "";
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const {value} = await mammoth.extractRawText({ buffer: fileBuffer });
      return value || "";
    } else if (mimeType === "application/msword") {
      // Fallback for older doc binary files: strip out non-ascii readable text
      return fileBuffer.toString("utf8").replace(/[^\x20-\x7E\s]/g, "");
    }
    return "";
  } catch (error) {
    console.error("Text extraction error:", error.message);
    throw new Error(
      `unsupported file type or corrupted file. Please upload a valid PDF, DOC, or DOCX file.`,
    );
  }
}


// POST /api/analysis — Analyze a resume file
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume file." });
    }

    const { role, experience } = req.body;

    if (!role || !role.trim()) {
      return res.status(400).json({ message: "Please enter a target role." });
    }

    if (!req.file.buffer || req.file.buffer.length === 0) {
      return res
        .status(400)
        .json({ message: "File buffer is empty. Please upload a valid file." });
    }

    // Extract text content from the file
    let textContent = "";


try {
  textContent = await extractText(
    req.file.buffer,
    req.file.mimetype
  );
} catch (extractError) {
  console.error("File extraction failed:", extractError.message);

  return res.status(400).json({
    success: false,
    message:
      "Unable to read your file. Please upload a valid PDF, DOC, or DOCX file.",
  });
}

if (!textContent || textContent.trim().length === 0) {
  return res.status(400).json({
    success: false,
    message:
      "Could not extract text from the resume. Please make sure the file contains readable text.",
  });
}
// Groq Analysis
let aiAnalysis = {
  atsScore: 0,
  matchedKeywords: [],
  missingKeywords: [],
  strengths: [],
  weaknesses: [],
  suggestions: [],
  overallFeedback: "",
};

try {
  const prompt = `
You are an expert ATS resume analyzer specializing in ${role}.

Deeply analyze the following resume for the role: "${role}"

CRITICAL REQUIREMENTS:
- Find AT LEAST 15 matched keywords from the resume that align with ${role}
- Find AT LEAST 12 missing keywords that the resume should contain for ${role}
- Provide AT LEAST 8 detailed, actionable improvement suggestions
- List 4-5 key strengths of the resume
- List 4-5 areas for improvement/weaknesses
- Provide comprehensive overall feedback

Resume:
${textContent}

Return ONLY valid JSON in this exact format:

{
  "atsScore": 75,
  "matchedKeywords": ["JavaScript", "React", ...],
  "missingKeywords": ["TypeScript", "REST API", ...],
  "strengths": ["Clear structure", "Good technical skills", ...],
  "weaknesses": ["Missing certifications", "Limited project descriptions", ...],
  "suggestions": ["Add quantified achievements", "Include modern tech stack", "Highlight leadership experience", "Add metrics to projects", "Include certifications section", "Improve formatting consistency", "Add relevant keywords for ATS", "Expand project descriptions with technical details"],
  "overallFeedback": "Strong technical foundation but needs more specific achievements and modern tools..."
}

IMPORTANT:
- Return ONLY the JSON object, nothing else
- Do not use markdown
- Do not wrap JSON in backticks
- Do not include any text outside the JSON
- Ensure arrays have at least the minimum items specified
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  const content = completion.choices[0].message.content;

  const jsonMatch = content.match(/\{[\s\S]*\}/);

  if (jsonMatch) {
    aiAnalysis = JSON.parse(jsonMatch[0]);
  }
} catch (err) {
  console.error("Groq Error:", err);
}

return res.json({
  success: true,
  score: aiAnalysis.atsScore,
  matched: aiAnalysis.matchedKeywords,
  missing: aiAnalysis.missingKeywords,
  suggestions: aiAnalysis.suggestions,
  strengths: aiAnalysis.strengths,
  weaknesses: aiAnalysis.weaknesses,
  overallFeedback: aiAnalysis.overallFeedback,
  fileName: req.file.originalname,
  role,
  experience: experience || "Not specified",
});

  } catch (err) {
    console.error("Analysis error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
      error: err.message,
    });
  }
});

module.exports = router;