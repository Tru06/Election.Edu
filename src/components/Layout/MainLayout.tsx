import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage={currentPage} onPageChange={onPageChange} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
