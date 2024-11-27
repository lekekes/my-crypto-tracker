import { useState } from "react";
import Link from "next/link";
import BurgerMenuButton from "./BurgerMenuButton";
import MenuItems from "./MenuItems";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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

      {/* Mobile Menu with Animation */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)} // Klick auf Overlay schließt das Menü
      ></div>

      {/* Slide-In Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-teal-800 shadow-lg transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MenuItems isMobile onClick={() => setIsMenuOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;
