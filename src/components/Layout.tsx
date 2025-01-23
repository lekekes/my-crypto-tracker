import Navbar from '@/components/navbar/Navbar';
import PageWrapper from '@/components/PageWrapper';
import { DarkModeProvider } from '@/contexts/DarkModeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <DarkModeProvider>
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <PageWrapper>{children}</PageWrapper>
        </main>
      </div>
    </DarkModeProvider>
  );
};

export default Layout;
