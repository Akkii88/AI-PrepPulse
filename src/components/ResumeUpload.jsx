import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { extractTextFromPDF, validatePDFFile } from '../utils/pdfParser';

export default function ResumeUpload({ onAnalysisComplete }) {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback(async (acceptedFiles) => {
        setError(null);
        const uploadedFile = acceptedFiles[0];

        if (!uploadedFile) return;

        // Validate file
        const validation = validatePDFFile(uploadedFile);
        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        setFile(uploadedFile);
        setIsProcessing(true);
        setProgress(20);

        try {
            // Extract text from PDF
            setProgress(40);
            const resumeText = await extractTextFromPDF(uploadedFile);

            setProgress(60);

            // Pass extracted text to parent for AI analysis
            if (onAnalysisComplete) {
                await onAnalysisComplete(resumeText, uploadedFile.name);
            }

            setProgress(100);
        } catch (err) {
            console.error('Resume processing error:', err);
            setError(err.message || 'Failed to process resume');
            setFile(null);
        } finally {
            setIsProcessing(false);
        }
    }, [onAnalysisComplete]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        disabled: isProcessing
    });

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
                    ${isDragActive
                        ? 'border-primary bg-primary/5 scale-105'
                        : 'border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }
                    ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <input {...getInputProps()} />

                <div className="space-y-4">
                    <div className="size-20 mx-auto rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl">
                            {isProcessing ? 'hourglass_empty' : 'upload_file'}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {isProcessing ? 'Processing Resume...' : 'Upload Your Resume'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {isDragActive
                                ? 'Drop your resume here'
                                : 'Drag & drop your PDF resume here, or click to browse'
                            }
                        </p>
                    </div>

                    {!isProcessing && (
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                <span>PDF only</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                <span>Max 5MB</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                <span>AI-powered</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Processing Progress */}
            {isProcessing && (
                <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="animate-spin size-5 border-2 border-primary border-t-transparent rounded-full"></div>
                        <span className="font-medium text-gray-900 dark:text-white">
                            Analyzing your resume...
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {progress < 40 ? 'Extracting text from PDF...' :
                            progress < 80 ? 'Running AI analysis...' :
                                'Generating recommendations...'}
                    </p>
                </div>
            )}

            {/* File Info */}
            {file && !isProcessing && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                        <div className="flex-1">
                            <p className="font-medium text-green-900 dark:text-green-100">{file.name}</p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                                {(file.size / 1024).toFixed(1)} KB • Uploaded successfully
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                        <div>
                            <p className="font-medium text-red-900 dark:text-red-100">Upload Failed</p>
                            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Privacy Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">lock</span>
                    <div className="text-sm">
                        <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Your Privacy Matters</p>
                        <p className="text-blue-700 dark:text-blue-300">
                            Your resume is processed locally in your browser. Only extracted text is sent to our AI for analysis.
                            We don't store your resume permanently.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
