import { useState, useEffect } from "react";
import "./Dark_Mode.css";

export default function Dark_Mode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark-mode");
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
            return newMode;
        });
    };

    return (
        <button className={`hex-button ${isDarkMode ? "dark" : "light"}`} onClick={toggleDarkMode}>
            {isDarkMode ? "🌙" : "☀️"}
        </button>
    );
}