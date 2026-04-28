import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, Play } from 'lucide-react';
import { databaseService } from '../../utils/database';

interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizResult {
  questionId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  timeTaken: number;
}

const QuizComponent: React.FC = () => {
  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the minimum age required to vote in Indian elections?',
      type: 'multiple-choice',
      options: ['16 years', '18 years', '21 years', '25 years'],
      correctAnswer: 1,
      explanation: 'According to the Indian Constitution, the minimum voting age was reduced from 21 to 18 years through the 61st Constitutional Amendment Act in 1989.',
      category: 'basic',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'The Election Commission of India was established in which year?',
      type: 'multiple-choice',
      options: ['1947', '1950', '1952', '1956'],
      correctAnswer: 1,
      explanation: 'The Election Commission of India was established on January 25, 1950, a day before India became a republic.',
      category: 'basic',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'Electronic Voting Machines (EVMs) were first used in Indian elections in 1998.',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'EVMs were first used on an experimental basis in 1998 in selected constituencies of Madhya Pradesh, Rajasthan, and Delhi.',
      category: 'voting',
      difficulty: 'medium'
    },
    {
      id: '4',
      question: 'How many seats are there in the Lok Sabha (House of the People)?',
      type: 'multiple-choice',
      options: ['445', '543', '545', '550'],
      correctAnswer: 1,
      explanation: 'The Lok Sabha has a maximum strength of 552 members, but currently has 543 elected seats. 2 seats are reserved for Anglo-Indian community (nominated by President if needed).',
      category: 'elections',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'VVPAT stands for Voter Verifiable Paper Audit Trail.',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'VVPAT (Voter Verifiable Paper Audit Trail) is an independent verification system attached to EVMs that allows voters to verify their vote through a paper slip.',
      category: 'voting',
      difficulty: 'easy'
    },
    {
      id: '6',
      question: 'Form 6 is used for what purpose in voter registration?',
      type: 'multiple-choice',
      options: [
        'Correction of entries in electoral roll',
        'Inclusion of name in electoral roll',
        'Deletion of name from electoral roll',
        'Transposition of name within constituency'
      ],
      correctAnswer: 1,
      explanation: 'Form 6 is used for inclusion of name in the electoral roll for new voters who have attained the age of 18 years or have shifted to a new constituency.',
      category: 'registration',
      difficulty: 'medium'
    },
    {
      id: '7',
      question: 'The Model Code of Conduct comes into effect from the date of announcement of elections.',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'The Model Code of Conduct comes into force immediately from the date of announcement of elections by the Election Commission and remains in force till the completion of elections.',
      category: 'advanced',
      difficulty: 'hard'
    },
    {
      id: '8',
      question: 'NOTA (None of the Above) option was introduced in Indian elections in which year?',
      type: 'multiple-choice',
      options: ['2009', '2013', '2014', '2019'],
      correctAnswer: 1,
      explanation: 'The NOTA option was introduced by the Supreme Court in 2013 and was first used in the 2014 general elections.',
      category: 'voting',
      difficulty: 'hard'
    },
    {
      id: '9',
      question: 'How many Lok Sabha seats are reserved for Scheduled Castes?',
      type: 'multiple-choice',
      options: ['79', '84', '89', '94'],
      correctAnswer: 1,
      explanation: 'As per constitutional provisions, 84 Lok Sabha seats are reserved for Scheduled Castes to ensure their representation in the lower house of Parliament.',
      category: 'advanced',
      difficulty: 'hard'
    },
    {
      id: '10',
      question: 'A political party must secure at least 6% of total votes in how many states to be recognized as a national party?',
      type: 'multiple-choice',
      options: ['2 states', '3 states', '4 states', '5 states'],
      correctAnswer: 2,
      explanation: 'To be recognized as a national party, a political party must secure at least 6% of total votes in 4 or more states, in addition to winning 4 Lok Sabha seats or 2% of total seats.',
      category: 'parties',
      difficulty: 'hard'
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, quizCompleted, showExplanation]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setResults([]);
    setTimeLeft(30);
    setQuestionStartTime(Date.now());
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answer: string | number) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const result: QuizResult = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      isCorrect,
      timeTaken
    };

    setResults([...results, result]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setQuestionStartTime(Date.now());
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    const correctAnswers = results.filter(result => result.isCorrect).length;
    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100)
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'voting': return 'bg-green-100 text-green-800';
      case 'registration': return 'bg-purple-100 text-purple-800';
      case 'elections': return 'bg-orange-100 text-orange-800';
      case 'parties': return 'bg-red-100 text-red-800';
      case 'advanced': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Election Knowledge Quiz</h2>
          <p className="text-gray-600 mb-6">
            Test your knowledge about Indian elections, voting procedures, and democratic processes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Questions</h3>
              <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Time per Question</h3>
              <p className="text-2xl font-bold text-green-600">30 seconds</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Topics</h3>
              <p className="text-2xl font-bold text-purple-600">6 Categories</p>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="flex items-center justify-center space-x-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play size={20} />
            <span>Start Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <Trophy size={64} className={`mx-auto mb-4 ${
              score.percentage >= 70 ? 'text-yellow-500' : 
              score.percentage >= 50 ? 'text-gray-400' : 'text-red-400'
            }`} />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
            <div className="text-5xl font-bold text-blue-600 mb-2">{score.percentage}%</div>
            <p className="text-gray-600">You got {score.correct} out of {score.total} questions correct</p>
          </div>

          <div className="space-y-4 mb-6">
            {results.map((result, index) => {
              const question = questions.find(q => q.id === result.questionId);
              return (
                <div key={result.questionId} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-1">Q{index + 1}: {question?.question}</p>
                      <div className="flex items-center space-x-2 text-sm">
                        {result.isCorrect ? (
                          <>
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-green-600">Correct</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} className="text-red-500" />
                            <span className="text-red-600">Incorrect</span>
                          </>
                        )}
                        <span className="text-gray-500">• {result.timeTaken}s</span>
                      </div>
                    </div>
                  </div>
                  {!result.isCorrect && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                      <strong>Correct Answer:</strong> {question?.type === 'multiple-choice' || question?.type === 'true-false' 
                        ? question?.options?.[question?.correctAnswer as number]
                        : question?.correctAnswer
                      }
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>Explanation:</strong> {question?.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={startQuiz}
            className="flex items-center justify-center space-x-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw size={20} />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="flex items-center">
            <Clock size={16} className="mr-1" />
            {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentQuestion.category)}`}>
            {currentQuestion.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h3>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                showExplanation
                  ? index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                  : selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showExplanation && (
                  <div>
                    {index === currentQuestion.correctAnswer ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : index === selectedAnswer ? (
                      <XCircle size={20} className="text-red-500" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
