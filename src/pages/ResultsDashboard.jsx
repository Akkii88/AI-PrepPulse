import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'
import html2pdf from 'html2pdf.js'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import AssessmentReport from '../components/AssessmentReport'

export default function ResultsDashboard() {
    const navigate = useNavigate()
    const { results } = useAssessment()
    const reportRef = useRef(null)
    const printableRef = useRef(null)

    useEffect(() => {
        if (!results) {
            navigate('/assessment')
        }
    }, [results, navigate])

    if (!results) return null

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-500'
        if (score >= 60) return 'text-yellow-500'
        return 'text-red-500'
    }

    const getScoreGradient = (score) => {
        if (score >= 80) return 'from-green-500 to-emerald-600'
        if (score >= 60) return 'from-yellow-500 to-orange-600'
        return 'from-red-500 to-rose-600'
    }

    const handleDownloadReport = () => {
        const element = printableRef.current;
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `PrepPulse_Assessment_${new Date().toLocaleDateString()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false,
                windowWidth: 1280 // Ensure consistent width for rendering
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Create a clone for the PDF to apply print-specific styling
        const worker = html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            <Navigation />

            <main className="flex-grow py-12 px-4" ref={reportRef}>
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-full mb-4">
                            <span className="material-symbols-outlined">check_circle</span>
                            <span className="font-bold text-sm">Assessment Complete</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            Your Interview Readiness Report
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Completed in {Math.floor(results.timeSpent / 60)}:{(results.timeSpent % 60).toString().padStart(2, '0')} minutes
                        </p>
                    </div>

                    {/* Enhanced Overall Score Section */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#DB2777] rounded-[2.5rem] p-8 md:p-14 text-white mb-10 shadow-2xl shadow-primary/20 group">
                        {/* Animated Mesh Gradients Background */}
                        <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
                            <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-blue-400/20 blur-[120px] rounded-full animate-pulse-slow"></div>
                            <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-purple-400/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                        </div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            {/* Left Side: Large Score & Status */}
                            <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
                                <span className="text-sm font-black uppercase tracking-[0.2em] opacity-80 mb-6 block">Current Status: {results.readinessLevel}</span>

                                <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                                    {/* Circular Progress Ring */}
                                    <div className="relative size-40 md:size-48 flex items-center justify-center">
                                        <svg className="size-full -rotate-90">
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="45%"
                                                className="stroke-white/10 fill-none"
                                                strokeWidth="8"
                                            />
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="45%"
                                                className="stroke-white fill-none transition-all duration-1000 ease-out"
                                                strokeWidth="8"
                                                strokeDasharray="283"
                                                strokeDashoffset={283 - (283 * results.overallScore) / 100}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-6xl md:text-7xl font-black tracking-tighter tabular-nums drop-shadow-md">{results.overallScore}</span>
                                            <span className="text-xs font-bold opacity-60 uppercase tracking-widest mt-[-4px]">Ready</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                        <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight tracking-tight">
                                            You are {results.overallScore >= 90 ? 'Elite Ready!' : results.overallScore >= 70 ? 'Solidly On Track' : 'Just Getting Started'}
                                        </h2>
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                                            <div className="px-5 py-2 bg-white/10 backdrop-blur-xl rounded-2xl text-sm font-black border border-white/20 shadow-lg flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">timer</span>
                                                Target: {results.timeline.targetScore}+
                                            </div>
                                            <div className="flex items-center gap-2 text-base font-bold opacity-90 px-2 py-2">
                                                <span className="material-symbols-outlined text-xl">event_upcoming</span>
                                                <span>{results.timeline.weeks} Weeks to Peak</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Category Bubbles (Glassmorphism) */}
                            <div className="flex-1 w-full max-w-xl">
                                <div className="grid grid-cols-2 gap-5">
                                    {Object.entries(results.categoryScores).map(([category, score]) => {
                                        const details = results.categoryDetails?.[category];
                                        const status = score >= 85 ? 'Elite' : score >= 70 ? 'Solid' : 'Growth';

                                        return (
                                            <div key={category} className="group/item relative bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 transition-all hover:bg-white/20 hover:scale-[1.02] hover:shadow-xl shadow-inner-white flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center justify-between mb-3 text-white/60">
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
                                                        <span className="material-symbols-outlined text-sm">
                                                            {category === 'technical' ? 'code' : category === 'resume' ? 'description' : category === 'communication' ? 'forum' : 'folder'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-baseline gap-2 mb-1">
                                                        <div className="text-4xl font-black drop-shadow-sm tabular-nums">{score}</div>
                                                        <div className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-black uppercase tracking-tighter self-center">
                                                            {status}
                                                        </div>
                                                    </div>

                                                    {details && (
                                                        <div className="flex items-center gap-3 text-[10px] font-bold opacity-60 mb-4">
                                                            <span className="flex items-center gap-1">
                                                                <span className="size-1.5 rounded-full bg-green-400"></span>
                                                                {details.strengths.length} Strengths
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <span className="size-1.5 rounded-full bg-orange-400"></span>
                                                                {details.weaknesses.length} Gaps
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-auto">
                                                    <div
                                                        className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                                        style={{ width: `${score}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Simple Explanation for Beginners */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">help</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What does this score mean?</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                    Think of this score like your **"Readiness Level"** for a big game (the interview).
                                    A score of 100 means you are a Pro! Since you are at **{results.overallScore}**, you're doing great but have a few more levels to go.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex gap-3">
                                        <div className="size-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-blue-100 dark:border-blue-800 shrink-0">
                                            <span className="material-symbols-outlined text-sm text-blue-500">code</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white">Technical</p>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400">How good you are at solving puzzles and building apps.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="size-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-blue-100 dark:border-blue-800 shrink-0">
                                            <span className="material-symbols-outlined text-sm text-green-500">description</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white">Resume</p>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400">How well you tell your story on paper.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="size-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-blue-100 dark:border-blue-800 shrink-0">
                                            <span className="material-symbols-outlined text-sm text-purple-500">forum</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white">Communication</p>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400">How clearly you talk and share your ideas.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="size-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-blue-100 dark:border-blue-800 shrink-0">
                                            <span className="material-symbols-outlined text-sm text-orange-500">folder</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white">Portfolio</p>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400">The cool things you've built that people can see.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Strengths */}
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-12 rounded-xl bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">thumb_up</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your Strengths</h3>
                            </div>
                            <ul className="space-y-3">
                                {results.strengths.map((strength, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                                        <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">schedule</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Timeline</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Current Score</span>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{results.overallScore}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Target Score</span>
                                    <span className="text-2xl font-bold text-primary">{results.timeline.targetScore}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Estimated Time</span>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{results.timeline.weeks} weeks</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all"
                                        style={{ width: `${(results.overallScore / results.timeline.targetScore) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Improvement Plan */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl">map</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Personalized Improvement Plan</h3>
                        </div>

                        <div className="space-y-4">
                            {results.improvements.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`p-5 rounded-xl border-l-4 ${item.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/10' :
                                        item.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10' :
                                            'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${item.priority === 'high' ? 'bg-red-500 text-white' :
                                                    item.priority === 'medium' ? 'bg-yellow-500 text-white' :
                                                        'bg-blue-500 text-white'
                                                    }`}>
                                                    {item.priority}
                                                </span>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                                    <span>{item.timeEstimate}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-900 dark:text-white font-bold text-lg mb-2">{item.action || item.text}</p>

                                            {item.impact && (
                                                <div className="flex items-start gap-2 bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-white/50 dark:border-black/10">
                                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">auto_awesome</span>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                        <span className="font-bold text-primary">Impact: </span>
                                                        {item.impact}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <button className="whitespace-nowrap px-6 py-2.5 bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary text-primary dark:text-primary rounded-xl text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-sm">
                                            Start Task
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resume Document Analysis */}
                    {results.resumeDocumentAnalysis && (
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="size-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">description</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Detailed Resume Document Analysis</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                                {Object.entries(results.resumeDocumentAnalysis.dimensions).map(([key, dim]) => (
                                    <div key={key} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                        <div className="text-sm font-bold text-gray-500 uppercase mb-2 tracking-wider">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                        <div className={`text-3xl font-black ${getScoreColor(dim.score)} mb-2`}>
                                            {dim.score}
                                        </div>
                                        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${getScoreGradient(dim.score)} rounded-full`}
                                                style={{ width: `${dim.score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-indigo-500">key</span>
                                            Missing Keywords
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.resumeDocumentAnalysis.missingKeywords.map((kw, i) => (
                                                <span key={i} className="px-3 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-full text-sm font-medium">
                                                    {kw}
                                                </span>
                                            ))}
                                            {results.resumeDocumentAnalysis.missingKeywords.length === 0 && (
                                                <span className="text-gray-500 text-sm italic">No major missing keywords identified.</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-orange-500">bolt</span>
                                            Action Verb Improvements
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.resumeDocumentAnalysis.weakVerbs.map((verb, i) => (
                                                <span key={i} className="px-3 py-1 bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30 rounded-full text-sm font-medium">
                                                    {verb}
                                                </span>
                                            ))}
                                            {results.resumeDocumentAnalysis.weakVerbs.length === 0 && (
                                                <span className="text-gray-500 text-sm italic">Strong action verbs used throughout.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-green-500">analytics</span>
                                            Suggested Impact Metrics
                                        </h4>
                                        <ul className="space-y-2">
                                            {results.resumeDocumentAnalysis.suggestedMetrics.map((metric, i) => (
                                                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                                    <span className="material-symbols-outlined text-green-500 text-base mt-0.5">add_chart</span>
                                                    <span>{metric}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-6">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-500">assignment_turned_in</span>
                                    Resume Priorities
                                </h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {results.resumeDocumentAnalysis.topPriorities.map((priority, i) => (
                                        <div key={i} className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/20 shadow-sm transition-all hover:scale-[1.02]">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${priority.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {priority.priority}
                                                </span>
                                                <span className="text-xs text-gray-500">{priority.timeEstimate}</span>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{priority.action}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-none">{priority.impact}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-600/5 border border-indigo-500/10">
                                <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-2">AI Summary</h4>
                                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                                    "{results.resumeDocumentAnalysis.summary}"
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Category Details */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        {Object.entries(results.categoryScores).map(([category, score]) => (
                            <div key={category} className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                                <div className={`text-4xl font-black ${getScoreColor(score)} mb-2`}>{score}</div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white capitalize mb-2">{category}</h4>
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${getScoreGradient(score)} rounded-full`}
                                        style={{ width: `${score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* AI-Powered Insights Section */}
                    {results.categoryDetails && (
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">psychology</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered Category Deep-Dive</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Detailed breakdown of your performance across all assessment pillars.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {Object.entries(results.categoryDetails).map(([category, details]) => (
                                    <div key={category} className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="size-14 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700 text-2xl font-black text-primary">
                                                    {results.categoryScores[category]}
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{category} Assessment</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="h-1.5 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full bg-gradient-to-r ${getScoreGradient(results.categoryScores[category])}`}
                                                                style={{ width: `${results.categoryScores[category]}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className={`text-xs font-bold ${getScoreColor(results.categoryScores[category])}`}>
                                                            {results.categoryScores[category] < 70 ? 'Needs Work' : results.categoryScores[category] < 85 ? 'Solid' : 'Elite'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 md:max-w-md">
                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">
                                                    "{details.feedback}"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Detailed Strengths */}
                                            <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-green-100 dark:border-green-900/20 shadow-sm">
                                                <div className="flex items-center gap-2 mb-4 text-green-600 dark:text-green-400">
                                                    <span className="material-symbols-outlined text-xl">verified</span>
                                                    <span className="text-sm font-black uppercase tracking-wider">Key Strengths</span>
                                                </div>
                                                <ul className="space-y-4">
                                                    {details.strengths.map((strength, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <div className="size-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                                                <span className="material-symbols-outlined text-[10px] text-green-600 font-bold">check</span>
                                                            </div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight">{strength}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Detailed Weaknesses */}
                                            <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-orange-100 dark:border-orange-900/20 shadow-sm">
                                                <div className="flex items-center gap-2 mb-4 text-orange-600 dark:text-orange-400">
                                                    <span className="material-symbols-outlined text-xl">error</span>
                                                    <span className="text-sm font-black uppercase tracking-wider">Weaknesses & Gaps</span>
                                                </div>
                                                <ul className="space-y-4">
                                                    {details.weaknesses.map((weakness, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <div className="size-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                                                <span className="material-symbols-outlined text-[10px] text-orange-600 font-bold">priority_high</span>
                                                            </div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight">{weakness}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {results.motivationalMessage && (
                                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-600/5 to-transparent border border-primary/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <span className="material-symbols-outlined text-8xl">format_quote</span>
                                    </div>
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                                            <span className="material-symbols-outlined">auto_awesome</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">A Message from your AI Coach</h4>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium italic text-lg leading-relaxed">
                                                "{results.motivationalMessage}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-800">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to improve your score?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start working on your improvement plan today and track your progress.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={handleDownloadReport}
                                className="px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-xl">download</span>
                                Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            {/* Hidden Report Container for PDF Generation */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                <AssessmentReport ref={printableRef} results={results} />
            </div>
        </div>
    )
}
