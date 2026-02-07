import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
    const location = useLocation()
    const isLanding = location.pathname === '/'

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#ece8f3] dark:border-white/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-2xl">analytics</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-text-light dark:text-white">AI PrepPulse</h2>
                </Link>



                <div className="flex items-center gap-4">
                    {isLanding && (
                        <Link
                            to="/assessment"
                            className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20"
                        >
                            Start Assessment
                        </Link>
                    )}


                </div>
            </div>
        </header>
    )
}
