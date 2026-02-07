import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'
import Navigation from '../components/Navigation'
import ResumeUpload from '../components/ResumeUpload'
import { analyzeResumeDocument } from '../services/geminiService'

const QUESTIONS = {
    technical: [
        { id: 1, question: "What is your experience level with data structures and algorithms?", type: "select", options: ["Beginner", "Intermediate", "Advanced", "Expert"] },
        { id: 2, question: "How many LeetCode/HackerRank problems have you solved?", type: "select", options: ["0-10", "11-50", "51-100", "100+"] },
        { id: 3, question: "Rate your understanding of system design concepts:", type: "select", options: ["No knowledge", "Basic understanding", "Can design simple systems", "Can design complex systems"] }
    ],
    resume: [
        { id: 4, question: "Does your resume include quantifiable achievements (metrics, percentages, numbers)?", type: "select", options: ["No metrics", "Some metrics", "Most bullets have metrics", "All bullets quantified"] },
        { id: 5, question: "How many years of relevant experience do you have?", type: "select", options: ["0-1 years", "1-2 years", "2-4 years", "4+ years"] },
        { id: 6, question: "Have you tailored your resume for ATS (Applicant Tracking Systems)?", type: "select", options: ["Not sure what ATS is", "No", "Somewhat", "Yes, fully optimized"] }
    ],
    communication: [
        { id: 7, question: "How comfortable are you explaining technical concepts to non-technical people?", type: "select", options: ["Very uncomfortable", "Somewhat uncomfortable", "Comfortable", "Very comfortable"] },
        { id: 8, question: "Do you use structured frameworks (like STAR) for behavioral questions?", type: "select", options: ["Never heard of it", "Aware but don't use", "Sometimes use it", "Always use it"] },
        { id: 9, question: "How many mock interviews have you completed?", type: "select", options: ["0", "1-3", "4-10", "10+"] }
    ],
    portfolio: [
        { id: 10, question: "How many projects are in your portfolio?", type: "select", options: ["0-1", "2-3", "4-5", "6+"] },
        { id: 11, question: "Do your projects have detailed README files with setup instructions?", type: "select", options: ["No READMEs", "Basic READMEs", "Detailed READMEs", "Professional documentation"] },
        { id: 12, question: "What is the complexity level of your best project?", type: "select", options: ["Simple CRUD app", "Multi-feature app", "Full-stack with auth", "Production-ready with CI/CD"] }
    ]
}

export default function AssessmentFlow() {
    const navigate = useNavigate()
    const { startAssessment, submitAnswers, timeRemaining, isAnalyzing, analysisProgress } = useAssessment()
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState({})

    const steps = ['technical', 'resume', 'communication', 'portfolio', 'resumeUpload']
    const currentCategory = steps[currentStep]
    const currentQuestions = QUESTIONS[currentCategory] || []
    const progress = ((currentStep + 1) / steps.length) * 100
    const [resumeAnalysis, setResumeAnalysis] = useState(null)
    const [resumeText, setResumeText] = useState('')
    const [isAnalyzingResume, setIsAnalyzingResume] = useState(false)
    const [resumeProgress, setResumeProgress] = useState('')

    useEffect(() => {
        startAssessment()
    }, [])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }))
    }

    const isStepComplete = () => {
        if (currentCategory === 'resumeUpload') {
            return resumeAnalysis !== null
        }
        return currentQuestions.every(q => answers[q.id])
    }

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            // Submit with resume analysis and raw text
            await submitAnswers(answers, resumeAnalysis, resumeText)
            navigate('/results')
        }
    }

    const handleResumeAnalysis = async (resumeText, fileName) => {
        setIsAnalyzingResume(true)
        try {
            setResumeText(resumeText)
            const analysis = await analyzeResumeDocument(resumeText, (progress) => {
                setResumeProgress(progress)
            })
            setResumeAnalysis(analysis)
        } catch (error) {
            console.error('Resume analysis failed:', error)
        } finally {
            setIsAnalyzingResume(false)
            setResumeProgress('')
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const getCategoryIcon = (category) => {
        const icons = {
            technical: 'code',
            resume: 'description',
            communication: 'forum',
            portfolio: 'folder_open',
            resumeUpload: 'upload_file'
        }
        return icons[category] || 'help'
    }

    const getCategoryColor = (category) => {
        const colors = {
            technical: 'from-blue-500 to-primary',
            resume: 'from-green-500 to-emerald-600',
            communication: 'from-purple-500 to-pink-600',
            portfolio: 'from-orange-500 to-red-600',
            resumeUpload: 'from-indigo-500 to-purple-600'
        }
        return colors[category] || 'from-gray-500 to-gray-600'
    }

    const getCategoryTitle = (category) => {
        const titles = {
            technical: 'Technical Skills',
            resume: 'Resume Quality',
            communication: 'Communication',
            portfolio: 'Portfolio',
            resumeUpload: 'Resume Upload & Analysis'
        }
        return titles[category] || category
    }

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            <Navigation />

            {/* Timer Header */}
            <div className="sticky top-16 z-40 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress:</span>
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(progress)}%</span>
                    </div>

                    <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full border border-red-100 dark:border-red-900/30">
                        <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-xl">timer</span>
                        <span className="font-mono text-lg font-bold text-red-600 dark:text-red-400 tabular-nums">
                            {formatTime(timeRemaining)}
                        </span>
                    </div>
                </div>
            </div>

            <main className="flex-grow py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Category Header */}
                    <div className="text-center mb-8">
                        <div className={`inline-flex size-20 rounded-2xl bg-gradient-to-br ${getCategoryColor(currentCategory)} text-white items-center justify-center mb-4 shadow-lg`}>
                            <span className="material-symbols-outlined text-4xl">{getCategoryIcon(currentCategory)}</span>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white capitalize mb-2">
                            {currentCategory} Assessment
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Step {currentStep + 1} of {steps.length}
                        </p>
                    </div>

                    {/* Questions & Upload */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 mb-6">
                        {currentCategory === 'resumeUpload' ? (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        Upload Your Resume for Deep Analysis
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Our AI will analyze your PDF resume for ATS compatibility, impact, and keywords.
                                    </p>
                                </div>

                                <ResumeUpload
                                    onAnalysisComplete={handleResumeAnalysis}
                                    isAnalyzing={isAnalyzingResume}
                                />

                                {resumeAnalysis && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                                        <div>
                                            <p className="font-bold text-green-800 dark:text-green-300">Resume Analyzed Successfully</p>
                                            <p className="text-sm text-green-700 dark:text-green-400">Click next to see your full readiness report.</p>
                                        </div>
                                    </div>
                                )}

                                {isAnalyzingResume && (
                                    <div className="text-center py-4">
                                        <div className="inline-block animate-spin size-8 border-4 border-primary border-t-transparent rounded-full mb-2"></div>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                                            {resumeProgress || 'AI is reading your resume...'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {currentQuestions.map((q, idx) => (
                                    <div key={q.id} className="space-y-4">
                                        <label className="block text-base font-bold text-gray-900 dark:text-white leading-snug">
                                            {idx + 1}. {q.question}
                                        </label>

                                        {q.type === 'select' && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {q.options.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => handleAnswer(q.id, option)}
                                                        className={`p-3.5 rounded-xl border-2 text-left transition-all duration-200 active:scale-95 ${answers[q.id] === option
                                                            ? 'border-primary bg-primary/5 text-primary shadow-sm ring-1 ring-primary/20'
                                                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary/40 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 hover:shadow-md hover:scale-[1.01]'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors ${answers[q.id] === option ? 'border-primary bg-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                                                                {answers[q.id] === option && <div className="size-2 bg-white rounded-full"></div>}
                                                            </div>
                                                            <span className="text-sm font-medium">{option}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined">arrow_back</span>
                                <span>Back</span>
                            </span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!isStepComplete()}
                            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
                        >
                            <span className="flex items-center gap-2">
                                <span>{currentStep === steps.length - 1 ? 'View Results' : 'Next'}</span>
                                <span className="material-symbols-outlined">
                                    {currentStep === steps.length - 1 ? 'check_circle' : 'arrow_forward'}
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </main>

            {/* AI Analysis Loading Modal */}
            {isAnalyzing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-white dark:bg-surface-dark rounded-3xl p-12 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-800">
                        <div className="text-center">
                            {/* Animated Icon */}
                            <div className="inline-flex size-24 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white items-center justify-center mb-6 animate-pulse">
                                <span className="material-symbols-outlined text-5xl">psychology</span>
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                                AI Analysis in Progress
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {analysisProgress || 'Analyzing your responses...'}
                            </p>

                            {/* Loading Bar */}
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                            </div>

                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                                This may take a few moments...
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
