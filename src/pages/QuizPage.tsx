import React from 'react';
import QuizComponent from '../components/Quiz/QuizComponent';

const QuizPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Election Knowledge Quiz</h1>
        <p className="text-gray-600">Test your understanding of Indian elections and democratic processes</p>
      </div>
      
      <QuizComponent />
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">🎯 Quiz Tips:</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Read each question carefully before selecting an answer</li>
          <li>• You have 30 seconds for each question - use your time wisely</li>
          <li>• Review the explanations after each answer to learn more</li>
          <li>• The quiz covers various topics from basic to advanced levels</li>
          <li>• Try to achieve 70% or higher to demonstrate good knowledge</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizPage;
