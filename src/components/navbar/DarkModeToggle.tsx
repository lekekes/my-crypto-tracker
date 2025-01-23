import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '@/contexts/DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-light-background dark:bg-dark-background flex h-10 w-10 items-center justify-center rounded-full transition duration-300 focus:outline-none"
    >
      {darkMode ? (
        <FontAwesomeIcon
          icon={faSun}
          className="text-yellow-400 transition duration-300 hover:text-yellow-500 hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]"
          size="lg"
        />
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          className="text-blue-400 transition duration-300 hover:text-blue-500 hover:drop-shadow-[0_0_8px_rgba(0,0,255,0.8)]"
          size="lg"
        />
      )}
    </button>
  );
};

export default DarkModeToggle;
