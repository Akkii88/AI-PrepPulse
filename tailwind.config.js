/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#359EFF",
                "primary-dark": "#5e2bb8",
                "background-light": "#f5f7f8",
                "background-dark": "#0f1923",
                "text-light": "#130e1b",
                "text-dark": "#f9f8fb",
                "accent-blue": "#4485e4"
            },
            fontFamily: {
                display: ["Manrope", "sans-serif"]
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                lg: "1rem",
                xl: "1.5rem",
                full: "9999px"
            }
        }
    },
    plugins: []
}
