import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

interface MenuItemsProps {
  isMobile?: boolean;
  onClick?: () => void; // Optional, für mobiles Menü
}

const MenuItems: React.FC<MenuItemsProps> = ({ isMobile, onClick }) => {
  const linkClass = "hover:text-gray-300 block";
  const containerClass = isMobile
    ? "flex flex-col p-4 space-y-2"
    : "hidden md:flex items-center space-x-4";

  return (
    <ul className={containerClass}>
      <li>
        <Link href="/" className={linkClass} onClick={onClick}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/watchlist" className={linkClass} onClick={onClick}>
          Watchlist
        </Link>
      </li>
      <li>
        <Link href="/about" className={linkClass} onClick={onClick}>
          About
        </Link>
      </li>
      <li>
        <DarkModeToggle />
      </li>
    </ul>
  );
};

export default MenuItems;
