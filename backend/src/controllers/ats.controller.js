import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';

/**
 * Calculate ATS Score based on resume and job title
 */
export const calculateATSScore = async (req, res) => {
  try {
    const { jobTitle } = req.body;
    const resumeFile = req.file;

    console.log("📄 ATS Analysis started for job:", jobTitle);

    if (!jobTitle || !resumeFile) {
      return res.status(400).json({ message: "Job title and resume are required" });
    }

    // Simple PDF text extraction (basic version for now)
    let resumeText = "";
    try {
      const pdf = await pdfjs.getDocument({ data: resumeFile.buffer }).promise;
      
      for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          resumeText += textContent.items.map(item => item.str).join(" ") + " ";
        } catch (e) {
          console.log("Could not extract text from page", i);
        }
      }
    } catch (pdfError) {
      // Fallback: treat PDF buffer as text (for simple PDFs)
      console.log("PDF parsing error, using fallback");
      resumeText = resumeFile.buffer.toString('utf8', 0, Math.min(10000, resumeFile.buffer.length));
    }
    
    resumeText = resumeText.toLowerCase();

    console.log("✅ Resume parsed, length:", resumeText.length);

    // Extract keywords from job title
    const jobKeywords = extractKeywords(jobTitle);
    console.log("🔑 Job keywords extracted:", jobKeywords);

    // Score calculation
    let score = 0;

    // 1. Job title match (30 points)
    const jobTitleScore = calculateJobTitleMatch(resumeText, jobTitle);
    score += jobTitleScore * 0.3;
    console.log("📌 Job title match:", jobTitleScore);

    // 2. Keyword match (40 points)
    const keywordScore = calculateKeywordMatch(resumeText, jobKeywords);
    score += keywordScore * 0.4;
    console.log("🎯 Keyword match:", keywordScore);

    // 3. Formatting (20 points)
    const formattingScore = calculateFormatting(resumeText);
    score += formattingScore * 0.2;
    console.log("📝 Formatting score:", formattingScore);

    // 4. Structure (10 points)
    const structureScore = calculateStructure(resumeText);
    score += structureScore * 0.1;
    console.log("🏗️ Structure score:", structureScore);

    const finalScore = Math.round(score);
    console.log("✅ Final ATS Score:", finalScore);

    return res.status(200).json({
      score: finalScore,
      jobTitle,
    });
  } catch (error) {
    console.error("❌ ATS Analysis error:", error);
    return res.status(500).json({ message: "Failed to analyze resume" });
  }
};

/**
 * Extract relevant keywords from job title
 */
function extractKeywords(jobTitle) {
  const keywords = {
    "frontend developer": ["react", "vue", "angular", "javascript", "typescript", "html", "css", "ui", "ux"],
    "backend developer": ["node", "python", "java", "express", "django", "flask", "database", "sql", "api"],
    "full stack developer": ["react", "node", "javascript", "typescript", "database", "sql", "html", "css"],
    "data scientist": ["python", "machine learning", "pandas", "numpy", "tensorflow", "analysis", "data"],
    "product manager": ["product", "strategy", "roadmap", "analytics", "user", "features", "market"],
    "marketing manager": ["marketing", "campaign", "brand", "social", "content", "seo", "analytics"],
    "default": ["experience", "skills", "education", "projects", "achievements"],
  };

  const normalizedTitle = jobTitle.toLowerCase();
  for (const [key, value] of Object.entries(keywords)) {
    if (normalizedTitle.includes(key)) {
      return value;
    }
  }

  return keywords["default"];
}

/**
 * Calculate job title match score (0-100)
 */
function calculateJobTitleMatch(resumeText, jobTitle) {
  const words = jobTitle.toLowerCase().split(" ");
  let matches = 0;

  for (const word of words) {
    if (word.length > 3 && resumeText.includes(word)) {
      matches++;
    }
  }

  return Math.min(100, (matches / words.length) * 100);
}

/**
 * Calculate keyword match score (0-100)
 */
function calculateKeywordMatch(resumeText, keywords) {
  let matches = 0;

  for (const keyword of keywords) {
    if (resumeText.includes(keyword.toLowerCase())) {
      matches++;
    }
  }

  return Math.min(100, (matches / keywords.length) * 100);
}

/**
 * Calculate formatting score (0-100)
 * Checks for proper sections and structure
 */
function calculateFormatting(resumeText) {
  const sections = ["experience", "education", "skills", "projects", "certifications"];
  let score = 50; // Base score

  for (const section of sections) {
    if (resumeText.includes(section)) {
      score += 10;
    }
  }

  return Math.min(100, score);
}

/**
 * Calculate structure score (0-100)
 * Checks for proper email, phone, etc.
 */
function calculateStructure(resumeText) {
  let score = 30; // Base score

  // Check for email
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(resumeText)) {
    score += 20;
  }

  // Check for phone number
  if (/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText)) {
    score += 20;
  }

  // Check for date formats (YYYY-YYYY or similar)
  if (/\d{4}\s*[-–]\s*\d{4}|\d{4}/.test(resumeText)) {
    score += 30;
  }

  return Math.min(100, score);
}
