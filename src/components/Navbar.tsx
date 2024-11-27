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
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          CryptoTrack
        </Link>

        {/* Burger Menu Button */}
        <BurgerMenuButton onClick={toggleMenu} />

        {/* Desktop Links */}
        <MenuItems />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 mt-2 rounded-lg shadow-lg">
          <MenuItems isMobile onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
