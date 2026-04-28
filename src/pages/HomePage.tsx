import React from 'react';
import { BookOpen, MessageCircle, HelpCircle, Users, Calendar, Vote } from 'lucide-react';
import VoterRegistrationGuide from '../components/Guides/VoterRegistrationGuide';
import VotingProcessGuide from '../components/Guides/VotingProcessGuide';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chat Assistant',
      description: 'Get instant answers to your election-related questions through our intelligent chat interface.',
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Interactive Flashcards',
      description: 'Learn key election terms and processes through our engaging flashcard system.',
      color: 'bg-green-500'
    },
    {
      icon: HelpCircle,
      title: 'Knowledge Quiz',
      description: 'Test your understanding of Indian elections with our comprehensive quiz system.',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Voter Registration',
      description: 'Step-by-step guidance for voter registration and eligibility verification.',
      color: 'bg-orange-500'
    },
    {
      icon: Calendar,
      title: 'Election Timeline',
      description: 'Stay updated with important dates and milestones in the election process.',
      color: 'bg-red-500'
    },
    {
      icon: Vote,
      title: 'Voting Process',
      description: 'Complete guide on how to cast your vote and what to expect on election day.',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Election Process Assistant</h1>
        <p className="text-xl mb-6">Your comprehensive guide to understanding Indian elections</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-lg">
            Empowering citizens with knowledge about the democratic process, voter rights, 
            and electoral procedures in India.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Explore Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Indian Elections at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">900+</div>
            <div className="text-gray-600">Million Registered Voters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">543</div>
            <div className="text-gray-600">Lok Sabha Seats</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
            <div className="text-gray-600">Polling Stations</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
        <p className="text-lg mb-6">
          Start exploring our interactive features to become an informed citizen
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Chat Assistant
          </button>
          <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
            Browse Flashcards
          </button>
        </div>
      </div>

      {/* Voter Registration and Voting Guides */}
      <div className="space-y-8">
        <VoterRegistrationGuide />
        <VotingProcessGuide />
      </div>
    </div>
  );
};

export default HomePage;
