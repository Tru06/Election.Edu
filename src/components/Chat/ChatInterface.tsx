import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Clock, CheckCircle } from 'lucide-react';
import { databaseService } from '../../utils/database';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  category?: string;
}

interface SuggestedQuestion {
  text: string;
  category: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = databaseService.getChatHistory();
    if (savedMessages.length === 0) {
      return [
        {
          id: '1',
          text: 'Hello! I\'m your Election Process Assistant. I can help you understand Indian elections, voter registration, voting procedures, and more. What would you like to know?',
          sender: 'bot',
          timestamp: new Date(),
          category: 'greeting'
        }
      ];
    }
    return savedMessages;
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions: SuggestedQuestion[] = [
    { text: 'How do I register to vote?', category: 'registration' },
    { text: 'What are the eligibility criteria for voting?', category: 'eligibility' },
    { text: 'How do I find my polling station?', category: 'polling' },
    { text: 'What documents do I need for voting?', category: 'documents' },
    { text: 'How is EVM used in elections?', category: 'evm' },
    { text: 'What is the election process timeline?', category: 'timeline' }
  ];

  const knowledgeBase: Record<string, string> = {
    greeting: 'Hello! I\'m here to help you understand the Indian election process. Feel free to ask me about voter registration, voting procedures, eligibility criteria, or any other election-related topic.',
    
    registration: 'To register to vote in India:\n\n1. Visit the official Election Commission website (nvsp.in)\n2. Fill Form 6 for new voter registration\n3. Upload required documents (age proof, address proof)\n4. Submit the form online or at your nearest Electoral Registration Office\n5. Wait for verification - you\'ll receive your Voter ID card\n\nRequired documents:\n- Age proof (Birth certificate, school certificate, etc.)\n- Address proof (Aadhaar, passport, utility bills)\n- Recent passport-size photograph',
    
    eligibility: 'To be eligible to vote in India, you must:\n\n✓ Be a citizen of India\n✓ Be 18 years or older on the qualifying date\n✓ Be ordinarily resident of the constituency where you want to vote\n✓ Not be disqualified by law (criminal conviction, unsound mind, etc.)\n\nThe qualifying date is January 1st of the year in which the electoral roll is prepared.',
    
    polling: 'To find your polling station:\n\n1. Visit the Voter Helpline app or website\n2. Enter your Voter ID number or personal details\n3. The system will show your assigned polling station\n4. You can also call the voter helpline at 1950\n5. SMS EPIC <VoterID> to 9211728082\n\nOn election day, go to your assigned polling station with your Voter ID card and a photo ID.',
    
    documents: 'For voting in India, you need:\n\nPrimary ID (any one):\n- Voter ID Card (EPIC)\n- Aadhaar Card\n- MNREGA Job Card\n- PASS (Photos ID card issued by Central/State Govt)\n- PAN Card\n- Passport\n- Driving License\n\nAddress proof (if address has changed):\n- Current utility bill\n- Bank statement\n- Ration card\n- Latest rent agreement',
    
    evm: 'Electronic Voting Machine (EVM) in Indian elections:\n\n🔹 Features:\n- Electronic device for recording votes\n- Can store up to 2,000 votes\n- Battery-operated, works without electricity\n- Tamper-proof with seals\n\n🔹 How it works:\n1. Press the button next to your candidate\'s symbol\n2. A beep sound confirms your vote\n3. The VVPAT machine prints a slip for verification\n4. The slip is visible for 7 seconds then drops into a box\n\n🔹 Security:\n- EVMs are stored securely after elections\n- Mock polls conducted to verify functionality\n- VVPAT ensures paper trail for verification',
    
    timeline: 'Indian General Election Process Timeline:\n\n📅 Phase 1: Announcement\n- Election Commission announces dates\n- Model Code of Conduct comes into effect\n\n📅 Phase 2: Nominations (1 week)\n- Parties file nominations\n- Scrutiny of nominations\n- Withdrawal period\n\n📅 Phase 3: Campaign (2-3 weeks)\n- Political parties campaign\n- Public meetings and rallies\n- Media coverage\n\n📅 Phase 4: Voting (Multiple phases)\n- Polling conducted in phases\n- Usually takes 1-2 months for general elections\n\n📅 Phase 5: Counting & Results\n- Counting begins after voting ends\n- Results declared within 24-48 hours\n- Formation of new government'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords and return appropriate response
    if (lowerMessage.includes('register') || lowerMessage.includes('registration')) {
      return knowledgeBase.registration;
    } else if (lowerMessage.includes('eligible') || lowerMessage.includes('eligibility') || lowerMessage.includes('age')) {
      return knowledgeBase.eligibility;
    } else if (lowerMessage.includes('polling') || lowerMessage.includes('station') || lowerMessage.includes('where')) {
      return knowledgeBase.polling;
    } else if (lowerMessage.includes('document') || lowerMessage.includes('id') || lowerMessage.includes('proof')) {
      return knowledgeBase.documents;
    } else if (lowerMessage.includes('evm') || lowerMessage.includes('machine') || lowerMessage.includes('electronic')) {
      return knowledgeBase.evm;
    } else if (lowerMessage.includes('timeline') || lowerMessage.includes('process') || lowerMessage.includes('schedule')) {
      return knowledgeBase.timeline;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return knowledgeBase.greeting;
    } else {
      return 'I can help you with information about voter registration, eligibility criteria, polling stations, required documents, EVMs, and election timelines. Could you be more specific about what you\'d like to know?';
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    databaseService.saveChatMessage({
      text: userMessage.text,
      sender: userMessage.sender,
      timestamp: userMessage.timestamp
    });
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      databaseService.saveChatMessage({
        text: botMessage.text,
        sender: botMessage.sender,
        timestamp: botMessage.timestamp
      });
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <Bot size={24} />
          <div>
            <h2 className="text-lg font-semibold">Election Assistant</h2>
            <p className="text-sm text-blue-100">Ask me anything about Indian elections</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                {message.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>
              <div>
                <div className={`rounded-lg p-3 ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
                <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${
                  message.sender === 'user' ? 'justify-end' : ''
                }`}>
                  <Clock size={12} />
                  <span>{formatTime(message.timestamp)}</span>
                  {message.sender === 'user' && <CheckCircle size={12} className="text-blue-500" />}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="border-t p-4 bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question.text)}
              className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              {question.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your question about Indian elections..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === ''}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
