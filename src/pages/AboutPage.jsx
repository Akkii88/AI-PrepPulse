import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            <Navigation />

            <main className="flex-grow py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            About AI PrepPulse
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Empowering students with AI-driven interview readiness assessment
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 mb-8 border border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                AI PrepPulse was created to solve a critical problem faced by students and early-career professionals:
                                uncertainty about their interview readiness. We believe that everyone deserves to know exactly where
                                they stand before applying to their dream jobs.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 mb-8 border border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Technical Assessment</h3>
                                        <p>We evaluate your coding skills, problem-solving ability, and understanding of computer science fundamentals through carefully curated questions.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Resume Analysis</h3>
                                        <p>Our AI scans your resume for ATS compatibility, impact metrics, formatting issues, and keyword optimization to ensure it passes initial screenings.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Communication Skills</h3>
                                        <p>We assess your ability to articulate complex ideas clearly and structure your responses using proven frameworks like STAR.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Portfolio Review</h3>
                                        <p>We evaluate your projects for complexity, documentation quality, and real-world applicability to showcase your practical skills.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 mb-8 border border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Science Behind Our Scoring</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                Our assessment algorithm is based on extensive research into hiring practices at top tech companies.
                                We've analyzed thousands of successful interview outcomes to identify the key factors that predict success:
                            </p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                    <span><strong>30% Technical Knowledge:</strong> Coding ability and problem-solving skills</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                    <span><strong>30% Resume Strength:</strong> ATS compatibility and impact demonstration</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                    <span><strong>25% Communication:</strong> Clarity and structured thinking</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                    <span><strong>15% Portfolio Quality:</strong> Project complexity and documentation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-white text-center">
                            <h2 className="text-2xl font-bold mb-4">Built for Hackathon 2026</h2>
                            <p className="text-white/90 leading-relaxed mb-6">
                                AI PrepPulse was developed as part of the 2026 Hackathon challenge to create innovative solutions
                                for career development. Our goal is to democratize access to interview preparation insights that
                                were previously only available through expensive coaching services.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-sm">
                                <span className="material-symbols-outlined">code</span>
                                <span>Built with React, Vite, Tailwind CSS, and powered by AI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
