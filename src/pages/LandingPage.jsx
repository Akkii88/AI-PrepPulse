import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function LandingPage() {
    const navigate = useNavigate()
    const { hasSavedProgress, resumeAssessment, clearProgress } = useAssessment()

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            <Navigation />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative overflow-hidden px-4 py-20 md:py-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto relative">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                <span className="font-bold text-sm">AI-Powered Assessment</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                                Know Your Interview
                                <br />
                                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                    Readiness Score
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Get a comprehensive assessment of your interview readiness in under 2 minutes.
                                AI-powered analysis of your technical skills, resume, communication, and portfolio.
                            </p>

                            {hasSavedProgress ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl mb-4">
                                        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                                            <span className="material-symbols-outlined">info</span>
                                            <span className="font-semibold">You have an incomplete assessment</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            onClick={() => {
                                                resumeAssessment()
                                                navigate('/assessment')
                                            }}
                                            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg shadow-2xl shadow-primary/30 transition-all transform hover:scale-105"
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined">play_arrow</span>
                                                <span>Resume Assessment</span>
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to start over? Your progress will be lost.')) {
                                                    clearProgress()
                                                    navigate('/assessment')
                                                }
                                            }}
                                            className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                        >
                                            Start Over
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                    <button
                                        onClick={() => navigate('/assessment')}
                                        className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg shadow-2xl shadow-primary/30 transition-all transform hover:scale-105"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>Start Assessment</span>
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => navigate('/about')}
                                        className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            )}

                            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                                    <span>Under 2 minutes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                                    <span>100% Free</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                                    <span>Instant Results</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4 bg-white dark:bg-surface-dark">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                                What We Assess
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Comprehensive evaluation across 4 critical dimensions
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-background-light dark:bg-background-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all hover:shadow-xl">
                                <div className="size-16 rounded-xl bg-gradient-to-br from-blue-500 to-primary text-white flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">code</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Technical Skills</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Evaluate your coding ability, problem-solving skills, and understanding of CS fundamentals.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-background-light dark:bg-background-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all hover:shadow-xl">
                                <div className="size-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">description</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Resume Analysis</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    AI-powered scan for ATS compatibility, impact metrics, and keyword optimization.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-background-light dark:bg-background-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all hover:shadow-xl">
                                <div className="size-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">record_voice_over</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Communication</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Assess your ability to articulate ideas clearly using proven frameworks like STAR.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-background-light dark:bg-background-dark rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all hover:shadow-xl">
                                <div className="size-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">folder_open</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Portfolio Review</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Evaluate project complexity, documentation quality, and real-world applicability.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                                How It Works
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Simple, fast, and accurate assessment in 3 steps
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="size-20 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center text-3xl font-black mx-auto mb-6">
                                    1
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Answer Questions</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Quick profile setup and targeted questions about your skills and experience.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="size-20 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center text-3xl font-black mx-auto mb-6">
                                    2
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">AI Analysis</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Our AI evaluates your responses across technical, communication, and portfolio dimensions.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="size-20 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center text-3xl font-black mx-auto mb-6">
                                    3
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get Results</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Receive your detailed readiness score with personalized improvement recommendations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 bg-gradient-to-br from-primary to-purple-600">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Ready to Discover Your Score?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of students who've used AI PrepPulse to ace their interviews.
                        </p>
                        <button
                            onClick={() => navigate('/assessment')}
                            className="px-10 py-5 bg-white text-primary rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-105"
                        >
                            Start Free Assessment
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
