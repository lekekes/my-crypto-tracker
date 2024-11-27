import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      /*className="p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 focus:outline-none" */
      className="p-2 bg-gray-800 text-white rounded-full shadow-md focus:outline-none"
    >
      <i
        className={`fas ${
          darkMode
            ? "fa-sun hover:text-yellow-400 hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]"
            : "fa-moon hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(0,0,255,0.8)]"
        } text-white h-6 w-6 flex justify-center items-center transition duration-300`}
      ></i>
    </button>
  );
};

export default DarkModeToggle;
