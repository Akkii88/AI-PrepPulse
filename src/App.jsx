import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AssessmentProvider } from './context/AssessmentContext'
import LandingPage from './pages/LandingPage'
import AssessmentFlow from './pages/AssessmentFlow'
import ResultsDashboard from './pages/ResultsDashboard'
import AboutPage from './pages/AboutPage'

function App() {
    return (
        <AssessmentProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/assessment" element={<AssessmentFlow />} />
                    <Route path="/results" element={<ResultsDashboard />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Router>
        </AssessmentProvider>
    )
}

export default App
