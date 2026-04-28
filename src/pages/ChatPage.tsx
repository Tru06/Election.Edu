import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Election Q&A Assistant</h1>
        <p className="text-gray-600">Get instant answers to your questions about Indian elections</p>
      </div>
      
      <ChatInterface />
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Using the Chat Assistant:</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Ask specific questions about voter registration, eligibility, or voting procedures</li>
          <li>• Use the suggested questions for quick answers to common topics</li>
          <li>• The assistant provides information based on official Election Commission guidelines</li>
          <li>• For complex queries, try breaking them into smaller questions</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
