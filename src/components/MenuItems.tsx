import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggle from "./DarkModeToggle";

interface MenuItemsProps {
  isMobile?: boolean;
  onClick?: () => void; // Optional, für mobiles Menü
}

const MenuItems: React.FC<MenuItemsProps> = ({ isMobile, onClick }) => {
  const router = useRouter();

  // Definiert die Styling-Klassen für jeden Link
  const linkClass = "flex items-center space-x-2 text-lg hover:text-gray-300"; // Einheitliche Zentrierung
  const containerClass = isMobile
    ? "flex flex-col items-center p-4 space-y-4" // Zentriert für mobile Ansicht
    : "hidden md:flex items-center space-x-6"; // Horizontal für Desktop-Ansicht

  // Dynamische Klasse für aktive Links
  const getActiveClass = (path: string) =>
    router.pathname === path ? "text-blue-400" : "";

  return (
    <ul className={containerClass}>
      {/* Home */}
      <li>
        <Link
          href="/"
          onClick={onClick}
          className={`${linkClass} ${getActiveClass("/")}`}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
      </li>

      {/* Watchlist */}
      <li>
        <Link
          href="/watchlist"
          onClick={onClick}
          className={`${linkClass} ${getActiveClass("/watchlist")}`}
        >
          <i className="fas fa-star"></i>
          <span>Watchlist</span>
        </Link>
      </li>

      {/* About */}
      <li>
        <Link
          href="/about"
          onClick={onClick}
          className={`${linkClass} ${getActiveClass("/about")}`}
        >
          <i className="fas fa-info-circle"></i>
          <span>About</span>
        </Link>
      </li>

      {/* DarkModeToggle */}
      <li>
        <div className="flex justify-center">
          <DarkModeToggle />
        </div>
      </li>
    </ul>
  );
};

export default MenuItems;
