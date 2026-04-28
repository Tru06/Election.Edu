import React, { useState } from 'react';
import { Vote, Clock, MapPin, FileText, CheckCircle, AlertTriangle, Users, Shield } from 'lucide-react';

const VotingProcessGuide: React.FC = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      id: 1,
      title: 'Before Election Day',
      icon: Clock,
      description: 'Preparation steps before you vote',
      details: [
        'Check your name in electoral roll',
        'Locate your polling station',
        'Prepare required documents',
        'Know your candidates and symbols',
        'Understand EVM and VVPAT process'
      ]
    },
    {
      id: 2,
      title: 'On Election Day',
      icon: Vote,
      description: 'Step-by-step voting process at polling station',
      details: [
        'Reach polling station on time',
        'Join the queue patiently',
        'Present your ID documents',
        'Get inked and receive voter slip',
        'Cast your vote using EVM'
      ]
    },
    {
      id: 3,
      title: 'After Voting',
      icon: CheckCircle,
      description: 'Post-voting procedures and verification',
      details: [
        'Check VVPAT slip verification',
        'Ensure finger is properly inked',
        'Keep voter slip as proof',
        'Follow exit procedures',
        'Wait for results announcement'
      ]
    }
  ];

  const doDonts = [
    {
      title: 'Do\'s',
      items: [
        'Carry valid ID proof (Voter ID, Aadhaar, etc.)',
        'Reach polling station early to avoid crowds',
        'Follow instructions from polling officials',
        'Verify your details on voter slip',
        'Check VVPAT slip for 7 seconds',
        'Maintain peace and order at polling station',
        'Help elderly and disabled voters',
        'Report any irregularities to authorities'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Don\'ts',
      items: [
        'Carry mobile phones inside voting booth',
        'Take photographs of voting process',
        'Disclose your vote to others',
        'Wear party symbols or campaign materials',
        'Create disturbances at polling station',
        'Try to influence other voters',
        'Vote multiple times',
        'Damage any election property'
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const documents = [
    { name: 'Voter ID Card (EPIC)', required: 'Primary ID', description: 'Electors Photo Identity Card issued by Election Commission' },
    { name: 'Aadhaar Card', required: 'Alternative ID', description: 'UIDAI issued unique identity card' },
    { name: 'Passport', required: 'Alternative ID', description: 'Government issued passport' },
    { name: 'Driving License', required: 'Alternative ID', description: 'Valid driving license with photo' },
    { name: 'PAN Card', required: 'Alternative ID', description: 'Permanent Account Number card' },
    { name: 'MNREGA Job Card', required: 'Alternative ID', description: 'Mahatma Gandhi National Rural Employment Guarantee Act card' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Voting Process Guide</h2>
        <p className="text-gray-600">Complete guide on how to cast your vote in Indian elections</p>
      </div>

      {/* Voting Phases */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Voting Process Phases</h3>
        
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  activePhase === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActivePhase(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activePhase === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {phase.title}
                      </h4>
                      <span className="text-sm text-gray-500">Click to expand</span>
                    </div>
                    <p className="text-gray-600 mb-3">{phase.description}</p>
                    
                    {activePhase === index && (
                      <div className="space-y-2 mt-4">
                        {phase.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-2">
                            <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Required Documents */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Required Documents</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{doc.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  doc.required === 'Primary ID' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {doc.required}
                </span>
              </div>
              <p className="text-sm text-gray-600">{doc.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doDonts.map((section, index) => (
          <div key={index} className={`${section.bgColor} border rounded-lg p-6`}>
            <h3 className={`text-lg font-semibold ${section.color} mb-4`}>{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-2">
                  {section.title === 'Do\'s' ? (
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${section.color}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* EVM and VVPAT Process */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">EVM & VVPAT Process</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Vote className="mr-2" size={20} />
              EVM (Electronic Voting Machine)
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Press the button next to your candidate's symbol</li>
              <li>• A beep sound confirms your vote is recorded</li>
              <li>• The machine locks after one vote is cast</li>
              <li>• Battery operated, works without electricity</li>
              <li>• Can store up to 2,000 votes</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <FileText className="mr-2" size={20} />
              VVPAT (Voter Verifiable Paper Audit Trail)
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Prints a paper slip showing your vote</li>
              <li>• Slip is visible for 7 seconds through glass window</li>
              <li>• Paper slip automatically drops into sealed box</li>
              <li>• Provides paper trail for verification</li>
              <li>• Used for random verification of EVM results</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Important Information</h3>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• Voting is your constitutional right and duty</li>
              <li>• Voting hours are typically 7:00 AM to 6:00 PM</li>
              <li>• COVID-19 protocols may be followed during voting</li>
              <li>• Special provisions for elderly and disabled voters</li>
              <li>• Report any irregularities to election officials immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingProcessGuide;
