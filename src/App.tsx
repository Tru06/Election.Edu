import React, { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import FlashcardsPage from './pages/FlashcardsPage';
import QuizPage from './pages/QuizPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'chat':
        return <ChatPage />;
      case 'flashcards':
        return <FlashcardsPage />;
      case 'quiz':
        return <QuizPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
};

export default App;
