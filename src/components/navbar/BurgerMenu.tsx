import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

interface BurgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerMenu = ({ isOpen, onClick }: BurgerMenuProps) => (
  <button
    onClick={onClick}
    className="bg-light-background dark:bg-dark-background flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-light-hover hover:shadow-lg focus:outline-none dark:hover:bg-dark-hover md:hidden"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
  </button>
);

export default BurgerMenu;
