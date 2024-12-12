import Link from 'next/link';
import { useRouter } from 'next/router';

interface MenuItemsProps {
  isMobile?: boolean;
  onClick?: () => void;
}

const MenuItems = ({ isMobile, onClick }: MenuItemsProps) => {
  const router = useRouter();

  const linkClass =
    'transition-colors duration-200 hover:text-light-hover dark:hover:text-dark-hover';
  const getActiveClass = (path: string) => {
    if (path === '/') {
      return router.pathname === '/'
        ? 'text-light-primary dark:text-dark-primary underline underline-offset-4'
        : 'text-foreground dark:text-dark-foreground';
    }
    return router.pathname.startsWith(path)
      ? 'text-light-primary dark:text-dark-primary underline underline-offset-4'
      : 'text-foreground dark:text-dark-foreground';
  };

  const menuLinks = [
    { href: '/', label: 'Startseite' },
    { href: '/all-coins', label: 'Coins' },
    { href: '/coin-details', label: 'Detailseite' },
    { href: '/news', label: 'Crypto-News' },
    { href: '/contact', label: 'Kontakt' },
    { href: '/watchlist', label: 'Merkliste' },
  ];

  return (
    <ul
      className={`${
        isMobile
          ? 'flex flex-col items-center space-y-4'
          : 'hidden items-center space-x-6 md:flex'
      }`}
    >
      {menuLinks.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={`${linkClass} ${getActiveClass(href)}`}
            onClick={onClick}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
