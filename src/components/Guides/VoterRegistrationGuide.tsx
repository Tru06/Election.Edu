import React, { useState } from 'react';
import { CheckCircle, FileText, Upload, Calendar, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';

const VoterRegistrationGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Check Eligibility',
      icon: CheckCircle,
      description: 'Verify you meet the basic requirements for voter registration',
      details: [
        'Must be a citizen of India',
        'Must be 18 years or older on qualifying date (January 1st)',
        'Must be ordinarily resident of the constituency',
        'Must not be disqualified by law'
      ]
    },
    {
      id: 2,
      title: 'Gather Documents',
      icon: FileText,
      description: 'Collect required documents for registration',
      details: [
        'Age Proof: Birth certificate, school certificate, passport',
        'Address Proof: Aadhaar, passport, utility bills, bank statement',
        'Recent passport-size photograph',
        'Optional: Disability certificate (if applicable)'
      ]
    },
    {
      id: 3,
      title: 'Fill Application Form',
      icon: Upload,
      description: 'Complete Form 6 for new voter registration',
      details: [
        'Visit nvsp.in or use Voter Helpline app',
        'Fill Form 6 online or download PDF',
        'Provide accurate personal details',
        'Upload scanned copies of documents',
        'Submit form online or at ERO office'
      ]
    },
    {
      id: 4,
      title: 'Verification Process',
      icon: Calendar,
      description: 'Wait for verification by electoral authorities',
      details: [
        'BLO (Booth Level Officer) will visit your address',
        'Documents will be verified',
        'Verification takes 2-4 weeks',
        'Check application status online'
      ]
    },
    {
      id: 5,
      title: 'Receive Voter ID',
      icon: CheckCircle,
      description: 'Get your Electors Photo Identity Card (EPIC)',
      details: [
        'Voter ID card delivered by post',
        'Name appears in electoral roll',
        'Download e-EPIC from Voter Portal',
        'Keep card safe for voting day'
      ]
    }
  ];

  const forms = [
    {
      formNumber: 'Form 6',
      purpose: 'Inclusion of name in electoral roll',
      for: 'New voters and those moving to new constituency',
      link: '#'
    },
    {
      formNumber: 'Form 7',
      purpose: 'Objection to inclusion of name',
      for: 'Challenging improper inclusions in electoral roll',
      link: '#'
    },
    {
      formNumber: 'Form 8',
      purpose: 'Correction of entries',
      for: 'Updating details in electoral roll',
      link: '#'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Voter Registration Guide</h2>
        <p className="text-gray-600">Complete step-by-step process to register as a voter in India</p>
      </div>

      {/* Step-by-Step Process */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Registration Process</h3>
        
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  activeStep === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activeStep === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">
                        Step {index + 1}: {step.title}
                      </h4>
                      <span className="text-sm text-gray-500">Click to expand</span>
                    </div>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    
                    {activeStep === index && (
                      <div className="space-y-2 mt-4">
                        {step.details.map((detail, detailIndex) => (
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

      {/* Important Forms */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Important Forms</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forms.map((form) => (
            <div key={form.formNumber} className="border rounded-lg p-4">
              <h4 className="font-semibold text-blue-600 mb-2">{form.formNumber}</h4>
              <p className="text-sm text-gray-600 mb-2">{form.purpose}</p>
              <p className="text-xs text-gray-500 mb-3">{form.for}</p>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                Download Form →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-600" size={20} />
            <div>
              <p className="font-medium text-blue-800">Voter Helpline</p>
              <p className="text-blue-600">1950 (Toll-free)</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-600" size={20} />
            <div>
              <p className="font-medium text-blue-800">Email Support</p>
              <p className="text-blue-600">help@eci.gov.in</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="text-blue-600" size={20} />
            <div>
              <p className="font-medium text-blue-800">Find ERO Office</p>
              <p className="text-blue-600">Visit your nearest Electoral Registration Office</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-blue-600" size={20} />
            <div>
              <p className="font-medium text-blue-800">Important Note</p>
              <p className="text-blue-600">Registration is free of cost</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterRegistrationGuide;
