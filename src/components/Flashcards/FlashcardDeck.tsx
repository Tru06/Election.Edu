import React, { useState, useEffect } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, BookOpen, Check, X, Trophy } from 'lucide-react';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FlashcardDeckProps {
  category?: string;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ category }) => {
  const flashcards: Flashcard[] = [
    // Basic Terms
    { id: '1', term: 'Election Commission of India', definition: 'Constitutional body responsible for conducting free and fair elections in India. Established in 1950, it oversees elections to Parliament, State Legislatures, and offices of President and Vice President.', category: 'basic', difficulty: 'easy' },
    { id: '2', term: 'Universal Adult Suffrage', definition: 'The principle that all adult citizens (18 years and above) have the right to vote regardless of caste, religion, gender, or economic status.', category: 'basic', difficulty: 'easy' },
    { id: '3', term: 'Electoral College', definition: 'A body of electors established to elect the President and Vice President of India, consisting of elected members of both Houses of Parliament and State Legislative Assemblies.', category: 'basic', difficulty: 'medium' },
    
    // Voting Process
    { id: '4', term: 'EVM (Electronic Voting Machine)', definition: 'Electronic device used for recording votes in Indian elections. Introduced in 1998, it replaced paper ballots and provides faster, more accurate counting.', category: 'voting', difficulty: 'easy' },
    { id: '5', term: 'VVPAT (Voter Verifiable Paper Audit Trail)', definition: 'Independent verification system attached to EVMs that prints a paper slip showing the vote cast, visible to the voter for 7 seconds before dropping into a sealed box.', category: 'voting', difficulty: 'medium' },
    { id: '6', term: 'NOTA (None of the Above)', definition: 'Option on EVMs allowing voters to reject all candidates. Introduced in 2013, it enables voters to express dissatisfaction with all contesting candidates.', category: 'voting', difficulty: 'easy' },
    
    // Voter Registration
    { id: '7', term: 'EPIC (Electors Photo Identity Card)', definition: 'Official voter ID card issued by the Election Commission. Contains voter\'s photo, name, address, and unique serial number for identification during voting.', category: 'registration', difficulty: 'easy' },
    { id: '8', term: 'Form 6', definition: 'Application form for inclusion of name in electoral roll for new voters. Can be filed online or submitted to Electoral Registration Officer.', category: 'registration', difficulty: 'medium' },
    { id: '9', term: 'Form 8', definition: 'Application form for correction of entries in electoral roll or transposition of name from one constituency to another.', category: 'registration', difficulty: 'medium' },
    
    // Election Types
    { id: '10', term: 'General Election', definition: 'Election held to elect members to Lok Sabha (House of the People). Conducted every 5 years unless dissolved earlier.', category: 'elections', difficulty: 'easy' },
    { id: '11', term: 'Assembly Election', definition: 'Election held to elect members to State Legislative Assemblies (Vidhan Sabha). Schedule varies by state, typically every 5 years.', category: 'elections', difficulty: 'easy' },
    { id: '12', term: 'By-election', definition: 'Election conducted to fill a vacancy caused by death, resignation, or disqualification of an elected member before the completion of term.', category: 'elections', difficulty: 'medium' },
    
    // Political Parties
    { id: '13', term: 'National Party', definition: 'Political party recognized as national by Election Commission if it meets criteria: wins 2% of seats in Lok Sabha from at least 3 different states, or polls 6% votes in 4 states + 4 Lok Sabha seats.', category: 'parties', difficulty: 'medium' },
    { id: '14', term: 'Regional Party', definition: 'Political party recognized at state level if it meets criteria: wins 3% of seats or 6% of votes in the state, or wins 1 Lok Sabha seat for every 25 seats in that state.', category: 'parties', difficulty: 'medium' },
    { id: '15', term: 'Symbol Allotment', definition: 'Process by which Election Commission allocates election symbols to political parties and independent candidates to help illiterate voters identify their choice.', category: 'parties', difficulty: 'easy' },
    
    // Advanced Concepts
    { id: '16', term: 'Model Code of Conduct', definition: 'Guidelines issued by Election Commission to be followed by political parties and candidates during elections to ensure free and fair polls.', category: 'advanced', difficulty: 'hard' },
    { id: '17', term: 'First-Past-the-Post System', definition: 'Electoral system where candidate with highest number of votes in a constituency wins, regardless of percentage of total votes received.', category: 'advanced', difficulty: 'hard' },
    { id: '18', term: 'Reserved Constituencies', definition: 'Electoral constituencies reserved for Scheduled Castes (84) and Scheduled Tribes (47) in Lok Sabha to ensure representation of marginalized communities.', category: 'advanced', difficulty: 'hard' }
  ];

  const [filteredCards, setFilteredCards] = useState<Flashcard[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set());
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = [
    { id: 'all', name: 'All Cards', color: 'bg-gray-500' },
    { id: 'basic', name: 'Basic Terms', color: 'bg-blue-500' },
    { id: 'voting', name: 'Voting Process', color: 'bg-green-500' },
    { id: 'registration', name: 'Registration', color: 'bg-purple-500' },
    { id: 'elections', name: 'Election Types', color: 'bg-orange-500' },
    { id: 'parties', name: 'Political Parties', color: 'bg-red-500' },
    { id: 'advanced', name: 'Advanced', color: 'bg-indigo-500' }
  ];

  useEffect(() => {
    if (category && category !== 'all') {
      setFilteredCards(flashcards.filter(card => card.category === category));
    } else {
      setFilteredCards(flashcards);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowAnswer(false);
  }, [category]);

  const currentCard = filteredCards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
    if (!studiedCards.has(currentCard.id)) {
      setStudiedCards(new Set(Array.from(studiedCards).concat(currentCard.id)));
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const handleMarkMastered = () => {
    if (masteredCards.has(currentCard.id)) {
      setMasteredCards(new Set(Array.from(masteredCards).filter(id => id !== currentCard.id)));
    } else {
      setMasteredCards(new Set(Array.from(masteredCards).concat(currentCard.id)));
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowAnswer(false);
    setStudiedCards(new Set());
    setMasteredCards(new Set());
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  const progress = filteredCards.length > 0 ? (studiedCards.size / filteredCards.length) * 100 : 0;
  const masteryRate = filteredCards.length > 0 ? (masteredCards.size / filteredCards.length) * 100 : 0;

  if (filteredCards.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No flashcards available for this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cards Studied</p>
              <p className="text-2xl font-bold text-blue-600">{studiedCards.size}/{filteredCards.length}</p>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mastered</p>
              <p className="text-2xl font-bold text-green-600">{masteredCards.size}/{filteredCards.length}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Trophy className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${masteryRate}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Card</p>
              <p className="text-2xl font-bold text-purple-600">{currentIndex + 1}/{filteredCards.length}</p>
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">{currentIndex + 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="max-w-2xl mx-auto">
        <div className="relative h-80">
          <div 
            className={`absolute inset-0 bg-white rounded-xl shadow-lg cursor-pointer transition-all duration-500 transform-gpu preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Front of card */}
            <div className="absolute inset-0 rounded-xl p-8 flex flex-col justify-center items-center text-center backface-hidden"
                 style={{ backfaceVisibility: 'hidden' }}>
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentCard.category)} text-white`}>
                  {categories.find(cat => cat.id === currentCard.category)?.name}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentCard.term}</h3>
              <div className="mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
                  {currentCard.difficulty}
                </span>
              </div>
              <p className="text-gray-500 text-sm">Click to reveal definition</p>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 rounded-xl p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-50 to-purple-50"
                 style={{ 
                   backfaceVisibility: 'hidden',
                   transform: 'rotateY(180deg)'
                 }}>
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentCard.category)} text-white`}>
                  {categories.find(cat => cat.id === currentCard.category)?.name}
                </span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">{currentCard.definition}</p>
              <p className="text-gray-500 text-sm mt-4">Click to see term again</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleMarkMastered}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              masteredCards.has(currentCard.id)
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {masteredCards.has(currentCard.id) ? (
              <><Check size={16} className="inline mr-1" /> Mastered</>
            ) : (
              <><X size={16} className="inline mr-1" /> Mark as Mastered</>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredCards.length - 1}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeck;
