import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
// Using a more reliable worker source for Vite environments
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;


/**
 * Extract text content from a PDF file
 * @param {File} file - The PDF file to parse
 * @returns {Promise<string>} - Extracted text content
 */
export async function extractTextFromPDF(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
            cMapPacked: true,
            standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`
        });

        const pdf = await loadingTask.promise;

        let fullText = '';

        // Extract text from each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            // Combine text items with spaces
            const pageText = textContent.items
                .map(item => item.str)
                .join(' ');

            fullText += pageText + '\n\n';
        }

        return fullText.trim();
    } catch (error) {
        console.error('Detailed PDF parsing error:', error);
        throw new Error(`Failed to parse PDF: ${error.message || 'Unknown error'}. Please ensure the file is not password protected and is a valid PDF.`);
    }
}



/**
 * Validate PDF file
 * @param {File} file - The file to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validatePDFFile(file) {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    if (!file) {
        return { valid: false, error: 'No file provided' };
    }

    if (file.type !== 'application/pdf') {
        return { valid: false, error: 'File must be a PDF' };
    }

    if (file.size > MAX_SIZE) {
        return { valid: false, error: 'File size must be less than 5MB' };
    }

    return { valid: true };
}

/**
 * Extract key sections from resume text
 * @param {string} text - Resume text
 * @returns {Object} - Structured resume sections
 */
export function parseResumeSections(text) {
    const sections = {
        contact: '',
        summary: '',
        experience: '',
        education: '',
        skills: '',
        projects: '',
        raw: text
    };

    // Simple heuristic-based section detection
    const lines = text.split('\n');
    let currentSection = 'summary';

    for (const line of lines) {
        const lowerLine = line.toLowerCase().trim();

        // Detect section headers
        if (lowerLine.includes('experience') || lowerLine.includes('work history')) {
            currentSection = 'experience';
        } else if (lowerLine.includes('education')) {
            currentSection = 'education';
        } else if (lowerLine.includes('skills') || lowerLine.includes('technical')) {
            currentSection = 'skills';
        } else if (lowerLine.includes('projects')) {
            currentSection = 'projects';
        } else if (lowerLine.includes('summary') || lowerLine.includes('objective')) {
            currentSection = 'summary';
        } else if (lowerLine.match(/\b[\w._%+-]+@[\w.-]+\.[a-z]{2,}\b/i)) {
            sections.contact += line + '\n';
        } else {
            sections[currentSection] += line + '\n';
        }
    }

    return sections;
}
