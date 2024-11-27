import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialen Zustand aus Local Storage laden
    const savedMode = localStorage.getItem("theme");
    const isDark = savedMode === "dark";

    // Klasse setzen und Zustand aktualisieren
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    // Klasse setzen und Local Storage aktualisieren
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="text-white rounded-full focus:outline-none"
    >
      <i
        className={`fas fa-fw fa-lg rounded-full  ${
          darkMode
            ? "fa-sun hover:text-yellow-400 hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]"
            : "fa-moon hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(0,0,255,0.8)]"
        } text-white h-8 w-8 flex justify-center items-center transition duration-300`}
      ></i>
    </button>
  );
};

export default DarkModeToggle;
