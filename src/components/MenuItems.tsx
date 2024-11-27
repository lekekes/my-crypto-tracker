import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggle from "./DarkModeToggle";

interface MenuItemsProps {
  isMobile?: boolean;
  onClick?: () => void; // Optional, für mobiles Menü
}

const MenuItems: React.FC<MenuItemsProps> = ({ isMobile, onClick }) => {
  const router = useRouter();

  const linkClass = "block flex items-center space-x-2";
  const containerClass = isMobile
    ? "flex flex-col p-4 space-y-2"
    : "hidden md:flex items-center space-x-4";

  const getActiveClass = (path: string) =>
    router.pathname === path ? "text-blue-400" : "hover:text-gray-300";

  return (
    <ul className={containerClass}>
      <li>
        <Link
          href="/"
          className={`${linkClass} ${getActiveClass("/")}`}
          onClick={onClick}
        >
          <i className="fas fa-home"></i>
          <span className="leading-none">Home</span>
        </Link>
      </li>
      <li>
        <Link
          href="/watchlist"
          className={`${linkClass} ${getActiveClass("/watchlist")}`}
          onClick={onClick}
        >
          <i className="fas fa-star"></i>
          <span className="leading-none">Watchlist</span>
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`${linkClass} ${getActiveClass("/about")}`}
          onClick={onClick}
        >
          <i className="fas fa-info-circle"></i>
          <span className="leading-none">About</span>
        </Link>
      </li>
      <li>
        <DarkModeToggle />
      </li>
    </ul>
  );
};

export default MenuItems;
