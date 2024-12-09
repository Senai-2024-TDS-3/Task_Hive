import { useState, useEffect } from "react";
import "./Dark_Mode.css";

export default function Dark_Mode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

// useEffect que será executado uma vez após a montagem do componente.
useEffect(() => {
    // Verifica se existe uma preferência de tema salva.
    const savedTheme = localStorage.getItem("theme");

    // Se a preferência salva for "dark", ativa o modo escuro.
    if (savedTheme === "dark") {
        setIsDarkMode(true);  // Atualiza o estado para refletir o modo escuro.
        document.documentElement.classList.add("dark-mode");  // Adiciona a classe 'dark-mode'.
    }
}, []); 

// Função para alternar entre o modo escuro e claro.
const toggleDarkMode = () => {
    // Atualiza o estado isDarkMode.
    setIsDarkMode((prevMode) => {
        const newMode = !prevMode;  // Inverte o valor.

        // Se o novo modo for verdadeiro (modo escuro), realiza as ações para ativar o modo escuro.
        if (newMode) {
            document.documentElement.classList.add("dark-mode");  // Adiciona a classe 'dark-mode'.
            localStorage.setItem("theme", "dark");  // Salva a preferência "dark".
        } else {
            // Caso contrário (modo claro), realiza as ações para desativar o modo escuro.
            document.documentElement.classList.remove("dark-mode");  // Remove a classe 'dark-mode'.
            localStorage.setItem("theme", "light");  // Salva a preferência "light.
        }

        return newMode;  // Retorna o novo valor de isDarkMode.
    });
};


    return (
        <button className={`hex-button ${isDarkMode ? "dark" : "light"}`} onClick={toggleDarkMode}>
            {isDarkMode ? "🌙" : "☀️"}
        </button>
    );
}