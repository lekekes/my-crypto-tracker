import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

interface BurgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerMenu = ({ isOpen, onClick }: BurgerMenuProps) => (
  <button
    onClick={onClick}
    className="bg-light-background dark:bg-dark-background hover:bg-light-hover dark:hover:bg-dark-hover flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:shadow-lg focus:outline-none md:hidden"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
  </button>
);

export default BurgerMenu;
