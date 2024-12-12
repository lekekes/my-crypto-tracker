import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import MenuItems from './MenuItems';
import DarkModeToggle from './DarkModeToggle';
import BurgerMenu from './BurgerMenu';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Schließt das Menü, wenn außerhalb geklickt wird
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const containerVariants = {
    hidden: { height: 0, opacity: 0, transition: { duration: 0.5 } },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  return (
    <nav
      ref={navbarRef}
      className="bg-gray-100 px-4 py-2 text-gray-800 shadow-md dark:bg-gray-900 dark:text-gray-100"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <MenuItems />
        <DarkModeToggle />
        <BurgerMenu isOpen={menuOpen} onClick={toggleMenu} />
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            className="overflow-hidden md:hidden"
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <MenuItems isMobile={true} onClick={toggleMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
