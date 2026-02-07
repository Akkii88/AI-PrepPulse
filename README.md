# 🚀 AI PrepPulse - Your Professional AI Interview Coach

<div align="center">
  <img src="./doc_assets/landing_page.png" alt="AI PrepPulse Dashboard" width="100%">
  <br><br>

  [![Demo Video](https://img.shields.io/badge/🎥_Watch_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://drive.google.com/file/d/1aSAxpOCjASWQKolKelXjZxMw6ISJSEBm/view?usp=sharing)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

  <h3>Assess. Analyze. Accelerate.</h3>
  <p><b>AI PrepPulse</b> is the ultimate AI-powered career accelerator. It combines <b>technical mock interviews</b>, <b>resume analysis</b>, and <b>portfolio reviews</b> into a single, comprehensive readiness assessment. Powered by <b>Google Gemini 1.5 Flash</b>, it delivers instant, personalized feedback to help you land your dream job.</p>
</div>

---

## 🏆 Project Overview (Impact & Innovation)

Finding a job in tech is harder than ever. Candidates struggle not just with coding, but with **communicating their value** and **optimizing their resume** for modern ATS systems.

**AI PrepPulse solves this by aggregating 4 critical pillars of interview readiness into a single, 10-minute assessment:**
1.  **Technical Proficiency**: Deep-dive coding and system design questions.
2.  **Resume Impact**: Structural and keyword analysis of the user's uploaded resume.
3.  **Communication**: Evaluation of clarity, structure, and conciseness.
4.  **Portfolio Quality**: Assessment of project descriptions and demonstrable work.

**Why it's different:**
Unlike generic coding platforms, AI PrepPulse acts as a **holistic career coach**, using Google's Gemini 1.5 Flash to generate a **startup-specific readiness score** and a detailed, prioritized roadmap for improvement.

---

## 🏗️ Architecture & Flow

```mermaid
graph TD
    A[User] -->|Starts Assessment| B(Frontend: React/Vite)
    B -->|Uploads Resume| C{Resume Parsing}
    B -->|Submits Answers| D{AI Analysis Engine}
    C -->|Extracted Text| D
    D -->|Prompt Engineering| E[Google Gemini 1.5 Flash]
    E -->|Structured JSON Response| D
    D -->|Scoring & Feedback| F[Results Dashboard]
    F -->|Generates PDF| G[Downloadable Report]
```

---

## ✨ Key Features (User Experience)

### 1. 🧠 Consolidated AI Analysis
We use a sophisticated, multi-stage prompting strategy to analyze the candidate's Resume, Technical Answers, and Behavioral responses in one go. This ensures the feedback is **context-aware**—identifying gaps between what a candidate *says* they know and what their resume *shows*.

<div align="center">
  <img src="./doc_assets/assessment_question.png" width="48%" alt="Technical Assessment">
  <img src="./doc_assets/resume_upload.png" width="48%" alt="Resume Upload">
</div>

### 2. 📊 Professional Results Dashboard
Gone are the complex, developer-centric metrics. Our dashboard is designed for **clarity and motivation**:
-   **Readiness Score**: A clear 0-100 metric with status levels (Elite, Solid, Growth).
-   **Visual Breakdowns**: Glassmorphism-styled charts and progress rings.
-   **Plain English Explanations**: "What does this score mean?" sections for accessibility.

<div align="center">
  <img src="./doc_assets/results_dashboard.png" width="48%" alt="Results Dashboard">
  <img src="./doc_assets/resume_analysis.png" width="48%" alt="Resume Analysis">
</div>
<br>
<div align="center">
  <img src="./doc_assets/portfolio_assessment.png" width="100%" alt="Portfolio Assessment">
</div>
<br>
<div align="center">
  <img src="./doc_assets/improvement_plan.png" width="100%" alt="Personalized Improvement Plan">
</div>

### 3. 📄 Instant PDF Report Generation
Users can download a **professional, print-ready PDF report** of their assessment.
-   **Theory & Methodology**: Explains how the score was calculated.
-   **Executive Summary**: High-level insights for quick reading.
-   **Visuals**: Simplified charts optimized for print (A4 format).
-   *Powered by `html2pdf.js` with a custom, hidden rendering engine.*



---

## 🛠️ Technical Execution

### Tech Stack
| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS |
| **AI Engine** | Google Gemini API (`gemini-1.5-flash`) |
| **State Management** | React Context API |
| **PDF Generation** | `html2pdf.js` |
| **Parsing** | `pdfjs-dist` (Resume Parsing) |

### Code Quality Highlights
-   **Modular Architecture**: Separated concerns for API Services, Context, and UI Components.
-   **Robust Error Handling**: "Graceful degradation" logic ensures the app provides value even if the AI service experiences partial outages.
-   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.

---

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ai-preppulse.git
    cd ai-preppulse
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```bash
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open in Browser**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

---

---
## ❓ Frequently Asked Questions (Design Decisions)

### 1. Why didn't you train your own model using Python?
**Short Answer:** We prioritized **Application Intelligence** over **Model Training**.
**Detailed Answer:**
*   **The Problem is "Subjective Critique," not "Classification":** Training a model from scratch to understand nuances in resume quality and coding style would require massive datasets and months of compute.
*   **Leveraging Foundation Models:** Google's **Gemini 1.5 Flash** is already trained on billions of lines of code. Instead of reinventing the wheel, we use advanced **Prompt Engineering** to direct this massive intelligence, allowing us to build a feature-rich product in a single hackathon.
*   **Architecture Efficiency:** By bypassing a heavy Python backend for inference, our app is **Serverless**, faster, and easier to scale.

### 2. How do you ensure the AI's feedback is accurate?
We use a **multi-shot prompting strategy** with strict JSON schema enforcement. We don't just ask "Is this good?"; we provide the AI with a rubric and specific criteria for "Elite," "Solid," and "Growth" tiers. This grounds the AI's hallucinations and ensures consistent, actionable feedback.

### 3. Is my resume data safe?
**Yes.** The parsing happens in-memory on the client (using `pdfjs-dist`) and is sent to the Gemini API only for analysis. We do **not store** your resume on any persistent database. Once the session ends, the data is wiped. This "privacy-by-design" approach makes the tool safe for quick demos.

### 4. How is the "Readiness Score" calculated?
The score is a weighted average derived from the AI's analysis of 4 pillars:
*   **Technical Accuracy (40%)**: Correctness and optimality of code.
*   **Communication (20%)**: Clarity and structure of explanations.
*   **Resume Impact (25%)**: ATS compatibility and verifiable metrics.
*   **Portfolio (15%)**: Project complexity and documentation.

### 5. What is the future roadmap for AI PrepPulse?
*   **Voice Mode:** Integrating Speech-to-Text for real-time verbal mock interviews.
*   **Browser Extension:** Overlaying specific feedback directly on LeetCode/HackerRank problems.
*   **Company Specifics:** Customizing the assessment rubric for specific companies (e.g., "Googleyness" or Amazon Leadership Principles).

---

## 👥 Team
-   **Ankit** - Full Stack Developer & AI Engineer

---

*Built with ❤️ for the Hackathon 2026.*
