# Election Process Assistant

An interactive web application to help Indian citizens understand the election process, timelines, and democratic participation.

## 🎯 Features

- **AI Chat Assistant**: Get instant answers to election-related questions
- **Interactive Flashcards**: Learn key election terms and concepts
- **Knowledge Quiz**: Test your understanding with comprehensive quizzes
- **Voter Registration Guide**: Step-by-step registration process
- **Voting Process Guide**: Complete guide on how to cast your vote
- **Progress Tracking**: Monitor your learning progress
- **Mobile Responsive**: Works seamlessly on all devices
- **Accessibility**: WCAG compliant interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd election-edu
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage

### Chat Assistant
- Navigate to the "Chat Assistant" section
- Ask questions about Indian elections, voter registration, voting procedures
- Use suggested questions for quick answers
- Chat history is saved automatically

### Flashcards
- Go to the "Flashcards" section
- Choose a category or study all cards
- Click cards to flip and reveal definitions
- Mark cards as mastered when confident
- Track your progress in real-time

### Quiz System
- Visit the "Quiz" section
- Answer 10 multiple-choice and true/false questions
- Get immediate feedback with explanations
- View detailed results and performance statistics
- Retake quizzes to improve your score

### Guides
- Access comprehensive voter registration guide
- Learn the complete voting process
- Understand EVM and VVPAT systems
- Get contact information for help

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Data Storage**: LocalStorage (easily migratable to databases)
- **Build Tool**: Create React App
- **Deployment**: Docker with Nginx

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t election-edu .
```

### Run Docker Container

```bash
docker run -p 80:80 election-edu
```

### Deploy to Google Cloud Run

1. Build and tag the image:
```bash
docker build -t gcr.io/PROJECT-ID/election-edu .
```

2. Push to Google Container Registry:
```bash
docker push gcr.io/PROJECT-ID/election-edu
```

3. Deploy to Cloud Run:
```bash
gcloud run deploy election-edu --image gcr.io/PROJECT-ID/election-edu --platform managed
```

## 📊 Data Management

### Local Storage
The application uses browser localStorage to store:
- Chat conversation history
- Quiz results and scores
- Flashcard progress
- Study time tracking

### Data Export/Import
- Export your progress for backup
- Import progress on different devices
- Clear all data if needed

## 🎨 Customization

### Adding New Questions
Edit `src/components/Quiz/QuizComponent.tsx` to add new quiz questions.

### Adding Flashcards
Update `src/components/Flashcards/FlashcardDeck.tsx` to add new flashcards.

### Chat Responses
Modify the knowledge base in `src/components/Chat/ChatInterface.tsx`.

## 🔧 Development

### Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (one-way operation)

### Project Structure

```
src/
├── components/
│   ├── Chat/           # Chat interface components
│   ├── Flashcards/     # Flashcard system
│   ├── Guides/         # Registration and voting guides
│   ├── Layout/         # Header, footer, main layout
│   └── Quiz/           # Quiz system
├── pages/              # Page components
├── utils/              # Database service and utilities
└── App.tsx            # Main application component
```

## 🔒 Security Features

- Input sanitization in chat interface
- XSS protection in content rendering
- Secure data storage practices
- HTTPS ready for production

## 🌐 Accessibility

- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

## 📈 Performance

- Code splitting for faster loading
- Image optimization
- Lazy loading where appropriate
- Gzip compression enabled
- Browser caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and inquiries:
- Email: support@election-edu.in
- Issues: [GitHub Issues](https://github.com/your-repo/issues)
- Documentation: [Project Wiki](https://github.com/your-repo/wiki)

## 🙏 Acknowledgments

- Election Commission of India for official information
- Create React App team for the boilerplate
- Tailwind CSS team for the styling framework
- All contributors and testers

---

**Note**: This is an educational platform. For official election information, always refer to the Election Commission of India website (eci.gov.in).
