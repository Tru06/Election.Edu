import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Election Edu</h3>
            <p className="text-gray-300 text-sm">
              An interactive platform to help Indian citizens understand the election process, 
              voter registration, and democratic participation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Election Commission of India</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Voter Registration Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Voting Process</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">
              For support and inquiries:<br />
              Email: support@election-edu.in<br />
              Helpline: 1950 (Election Commission)
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 Election Process Assistant. Educational purpose only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
