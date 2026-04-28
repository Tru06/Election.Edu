import React, { useState } from 'react';
import { BookOpen, Filter, RotateCcw } from 'lucide-react';
import FlashcardDeck from '../components/Flashcards/FlashcardDeck';

const FlashcardsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Cards', color: 'bg-gray-500', count: 18 },
    { id: 'basic', name: 'Basic Terms', color: 'bg-blue-500', count: 3 },
    { id: 'voting', name: 'Voting Process', color: 'bg-green-500', count: 3 },
    { id: 'registration', name: 'Registration', color: 'bg-purple-500', count: 3 },
    { id: 'elections', name: 'Election Types', color: 'bg-orange-500', count: 3 },
    { id: 'parties', name: 'Political Parties', color: 'bg-red-500', count: 3 },
    { id: 'advanced', name: 'Advanced', color: 'bg-indigo-500', count: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interactive Flashcards</h1>
        <p className="text-gray-600">Master key election terms and concepts through interactive learning</p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Filter size={20} className="mr-2" />
            Choose Category
          </h2>
          <button
            onClick={() => setSelectedCategory('all')}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedCategory === category.id
                  ? 'ring-2 ring-blue-500 shadow-md transform scale-105'
                  : 'hover:shadow-md hover:transform hover:scale-102'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${category.color} mx-auto mb-2 flex items-center justify-center`}>
                <BookOpen size={16} className="text-white" />
              </div>
              <p className="text-sm font-medium text-gray-800">{category.name}</p>
              <p className="text-xs text-gray-500">{category.count} cards</p>
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard Deck */}
      <FlashcardDeck category={selectedCategory} />

      {/* Study Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">📚 Study Tips:</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Click on cards to flip them and reveal definitions</li>
          <li>• Mark cards as mastered when you're confident with the term</li>
          <li>• Focus on one category at a time for better retention</li>
          <li>• Review mastered cards periodically to reinforce learning</li>
          <li>• Use the difficulty indicators to prioritize challenging concepts</li>
        </ul>
      </div>
    </div>
  );
};

export default FlashcardsPage;
