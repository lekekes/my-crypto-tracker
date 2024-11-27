interface BurgerMenuButtonProps {
  onClick: () => void;
}

const BurgerMenuButton: React.FC<BurgerMenuButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 focus:outline-none"
      aria-label="Toggle Menu"
    >
      <i className="fas fa-bars text-xl"></i>
    </button>
  );
};

export default BurgerMenuButton;
