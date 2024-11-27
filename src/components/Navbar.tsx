import { useState } from "react";
import Link from "next/link";
import BurgerMenuButton from "./BurgerMenuButton";
import MenuItems from "./MenuItems";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-teal-900 text-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold flex items-center text-teal-400"
        >
          <i className="fas fa-wallet mr-2"></i>
          CryptoTrack
        </Link>

        {/* Burger Menu Button */}
        <BurgerMenuButton onClick={toggleMenu} />

        {/* Desktop Links */}
        <MenuItems />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-teal-800 mt-2 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <MenuItems isMobile onClick={() => setIsMenuOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;
