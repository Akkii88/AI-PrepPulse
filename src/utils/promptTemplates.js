/**
 * Prompt templates for AI-powered assessment analysis
 */

export const TECHNICAL_ASSESSMENT_PROMPT = (answers) => `
You are an expert technical interviewer evaluating a candidate's technical readiness for software engineering roles.

Analyze the following responses and provide a detailed assessment:

**Data Structures & Algorithms Experience:** ${answers[1]}
**LeetCode/HackerRank Problems Solved:** ${answers[2]}
**System Design Understanding:** ${answers[3]}

Provide your assessment in the following JSON format:
{
  "score": <number between 40-95>,
  "strengths": [<array of 2-3 specific strengths>],
  "weaknesses": [<array of 2-3 specific areas to improve>],
  "recommendations": [
    {
      "priority": "high|medium|low",
      "action": "<specific, actionable recommendation>",
      "timeEstimate": "<realistic time estimate like '2 weeks'>"
    }
  ],
  "detailedFeedback": "<2-3 sentences of personalized feedback>"
}

Be specific, actionable, and encouraging. Focus on concrete next steps.
`;

export const RESUME_ASSESSMENT_PROMPT = (answers) => `
You are an expert resume reviewer and career coach specializing in tech industry applications.

Analyze the following resume-related responses:

**Quantifiable Achievements:** ${answers[4]}
**Years of Experience:** ${answers[5]}
**ATS Optimization:** ${answers[6]}

Provide your assessment in the following JSON format:
{
  "score": <number between 40-95>,
  "strengths": [<array of 2-3 specific strengths>],
  "weaknesses": [<array of 2-3 specific areas to improve>],
  "recommendations": [
    {
      "priority": "high|medium|low",
      "action": "<specific, actionable recommendation>",
      "timeEstimate": "<realistic time estimate>"
    }
  ],
  "detailedFeedback": "<2-3 sentences of personalized feedback>"
}

Focus on ATS optimization, quantifiable impact, and industry best practices.
`;

export const COMMUNICATION_ASSESSMENT_PROMPT = (answers) => `
You are an expert interview coach specializing in communication skills for technical roles.

Analyze the following communication-related responses:

**Explaining Technical Concepts to Non-Technical People:** ${answers[7]}
**Use of STAR Framework:** ${answers[8]}
**Mock Interviews Completed:** ${answers[9]}

Provide your assessment in the following JSON format:
{
  "score": <number between 40-95>,
  "strengths": [<array of 2-3 specific strengths>],
  "weaknesses": [<array of 2-3 specific areas to improve>],
  "recommendations": [
    {
      "priority": "high|medium|low",
      "action": "<specific, actionable recommendation>",
      "timeEstimate": "<realistic time estimate>"
    }
  ],
  "detailedFeedback": "<2-3 sentences of personalized feedback>"
}

Focus on structured communication, clarity, and interview preparation.
`;

export const PORTFOLIO_ASSESSMENT_PROMPT = (answers) => `
You are an expert technical recruiter evaluating candidate portfolios for software engineering roles.

Analyze the following portfolio-related responses:

**Number of Projects:** ${answers[10]}
**README Quality:** ${answers[11]}
**Project Complexity:** ${answers[12]}

Provide your assessment in the following JSON format:
{
  "score": <number between 40-95>,
  "strengths": [<array of 2-3 specific strengths>],
  "weaknesses": [<array of 2-3 specific areas to improve>],
  "recommendations": [
    {
      "priority": "high|medium|low",
      "action": "<specific, actionable recommendation>",
      "timeEstimate": "<realistic time estimate>"
    }
  ],
  "detailedFeedback": "<2-3 sentences of personalized feedback>"
}

Focus on project quality, documentation, and demonstrating technical depth.
`;

export const OVERALL_ASSESSMENT_PROMPT = (categoryResults) => `
You are a senior career coach providing an overall interview readiness assessment.

Based on the following category scores:
- Technical: ${categoryResults.technical.score}
- Resume: ${categoryResults.resume.score}
- Communication: ${categoryResults.communication.score}
- Portfolio: ${categoryResults.portfolio.score}

Provide an overall assessment in the following JSON format:
{
  "overallScore": <weighted average, technical 30%, resume 30%, communication 25%, portfolio 15%>,
  "readinessLevel": "Beginner|Intermediate|Advanced|Expert",
  "estimatedWeeksToReady": <number of weeks to reach 85+ score>,
  "topStrengths": [<3 overall strengths across all categories>],
  "criticalImprovements": [<3 most important improvements, prioritized>],
  "motivationalMessage": "<encouraging 2-3 sentence message>"
}

Be realistic but encouraging. Provide a clear path forward.
`;

export const RESUME_ANALYSIS_PROMPT = (resumeText) => `
You are an expert resume reviewer, ATS specialist, and career coach with deep knowledge of tech industry hiring practices.

Analyze the following resume comprehensively:

RESUME CONTENT:
${resumeText}

Provide a detailed analysis in the following JSON format:
{
  "overallScore": <number 0-100>,
  "dimensions": {
    "atsCompatibility": {
      "score": <0-100>,
      "strengths": [<2-3 specific strengths>],
      "weaknesses": [<2-3 specific issues>],
      "recommendations": [<2-3 actionable fixes>]
    },
    "contentQuality": {
      "score": <0-100>,
      "strengths": [<2-3 specific strengths>],
      "weaknesses": [<2-3 specific issues>],
      "recommendations": [<2-3 actionable fixes>]
    },
    "experienceRelevance": {
      "score": <0-100>,
      "strengths": [<2-3 specific strengths>],
      "weaknesses": [<2-3 specific issues>],
      "recommendations": [<2-3 actionable fixes>]
    },
    "impactMetrics": {
      "score": <0-100>,
      "strengths": [<2-3 specific strengths>],
      "weaknesses": [<2-3 specific issues>],
      "recommendations": [<2-3 actionable fixes>]
    },
    "formatting": {
      "score": <0-100>,
      "strengths": [<2-3 specific strengths>],
      "weaknesses": [<2-3 specific issues>],
      "recommendations": [<2-3 actionable fixes>]
    }
  },
  "missingKeywords": [<5-10 important technical keywords not found>],
  "weakVerbs": [<3-5 weak action verbs to replace>],
  "suggestedMetrics": [<3-5 places where metrics could be added>],
  "topPriorities": [
    {
      "priority": "high|medium|low",
      "action": "<specific improvement>",
      "impact": "<why this matters>",
      "timeEstimate": "<how long to fix>"
    }
  ],
  "summary": "<2-3 sentence overall assessment>"
}

Be specific, actionable, and provide concrete examples. Focus on what will make the biggest impact for tech roles.
`;

export const CONSOLIDATED_ASSESSMENT_PROMPT = (answers, resumeText = null) => `
You are a Principal Engineering Manager and Executive Talent Partner at a top-tier Silicon Valley VC firm (like Sequoia or Andreessen Horowitz). You are evaluating a high-potential candidate for a critical role in a billion-dollar "soonicorn" startup.

ANALYSIS INPUTS:
1. TECHNICAL ANSWERS:
   - DS & Algo: ${answers[1]}
   - Problems Solved: ${answers[2]}
   - System Design: ${answers[3]}

2. CAREER & PREPARATION (RESUME CATEGORY):
   - Quant Achievements: ${answers[4]}
   - Experience Depth: ${answers[5]}
   - Prep Focus: ${answers[6]}

3. COMMUNICATION & SOFT SKILLS:
   - Tech Explanation: ${answers[7]}
   - STAR Framework: ${answers[8]}
   - Preparation Level: ${answers[9]}

4. PORTFOLIO & PROJECTS:
   - Project Count: ${answers[10]}
   - Documentation: ${answers[11]}
   - Project Complexity: ${answers[12]}

${resumeText ? `5. RESUME CONTENT (RAW TEXT FROM PDF):
${resumeText}` : ''}

TASK:
Provide a high-stakes, professional assessment. Be brutally honest, elite-level, and highly actionable. If they are "hackathon grade", say so. If they are "billion-dollar startup grade", prove it.

OUTPUT FORMAT (STRICT JSON ONLY):
{
  "overallScore": <0-100>,
  "readinessLevel": "Junior|Mid-Level|Senior-Ready|Startup-Founder-Grade",
  "startupFit": {
    "score": <0-100>,
    "feedback": "<How well they fit a high-growth, high-pressure environment>"
  },
  "marketValue": {
    "estimatedSalary": "<Realistic annual salary range in USD, e.g. '$120k - $150k'>",
    "roleSeniority": "<Suggested title, e.g. 'Senior Frontend Engineer'>"
  },
  "categoryScores": {
    "technical": <0-100>,
    "resume": <0-100>,
    "communication": <0-100>,
    "portfolio": <0-100>
  },
  "topStrengths": [<3 senior-level, high-impact insights>],
  "hiddenGems": [<2 unique qualities identified from their background/answers>],
  "criticalImprovements": [
    {
      "priority": "P0|P1|P2",
      "action": "<High-impact, specific step>",
      "impact": "<Why this matters for top-tier hiring>",
      "timeEstimate": "<Weeks/Days>"
    }
  ],
  "timeline": {
    "weeks": <number of weeks to reach 95+ readiness>,
    "targetScore": 95
  },
  "categoryDetails": {
    "technical": { 
      "feedback": "<Detailed evaluation of technical depth. Explain WHY their current score makes sense.>", 
      "strengths": ["<Point 1>", "<Point 2>", "<Point 3>"], 
      "weaknesses": ["<Point 1>", "<Point 2>", "<Point 3>"] 
    },
    "resume": { 
      "feedback": "<Evaluation of narrative and impact quantification.>", 
      "strengths": ["<Point 1>", "<Point 2>", "<Point 3>"], 
      "weaknesses": ["<Point 1>", "<Point 2>", "<Point 3>"] 
    },
    "communication": { 
      "feedback": "<Evaluation of clarity and professional tone.>", 
      "strengths": ["<Point 1>", "<Point 2>", "<Point 3>"], 
      "weaknesses": ["<Point 1>", "<Point 2>", "<Point 3>"] 
    },
    "portfolio": { 
      "feedback": "<Evaluation of project complexity and documentation.>", 
      "strengths": ["<Point 1>", "<Point 2>", "<Point 3>"], 
      "weaknesses": ["<Point 1>", "<Point 2>", "<Point 3>"] 
    }
  },
  "motivationalMessage": "<A high-stakes closing message that either lights a fire under them or validates their elite status. Mention their potential to build or lead a billion-dollar company.>"
}

Strictly return valid JSON. Do not include markdown formatting like \`\`\`json. Ensure each category has at least 3 strengths and 3 weaknesses. Be extremely specific to the candidate's answers and resume.
`;
