# AI Interview App

A comprehensive AI-powered interview preparation platform built with React and TypeScript. This application provides two main interview modes: Voice-to-Text and Voice-to-Voice, helping users practice for technical interviews at top companies.

## Features

### 🎯 Core Features
- **Voice-to-Text AI**: AI speaks interview questions while users type or write their responses
- **Voice-to-Voice AI**: Natural conversation mode where both AI and user communicate verbally
- **Real-time Speech Recognition**: Advanced voice recognition with confidence scoring
- **Text-to-Speech**: Natural AI voice for question delivery
- **AI Scoring & Feedback**: Detailed performance analysis with personalized recommendations

### 🏢 Company Integration
- **Multiple Companies**: Practice with questions from Google, Microsoft, Amazon, Meta, Netflix, Apple, Tesla, and Spotify
- **Interview Categories**: Frontend, Backend, Full-stack, and Behavioral interview types
- **Question Types**: Coding, Technical, Behavioral, and System Design questions
- **Difficulty Levels**: Easy, Medium, and Hard questions with appropriate time limits

### 💰 Subscription Model
- **Free Tier**: 3 interviews per month with basic features
- **Premium**: Unlimited interviews with advanced AI analysis ($29/month)
- **Enterprise**: Custom integrations and team management ($99/month)

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Tailwind CSS**: Beautiful, modern styling with custom design system
- **Accessibility**: Built with accessibility best practices

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### AI & Voice Features
- **Web Speech API** for speech recognition
- **SpeechSynthesis API** for text-to-speech
- **Custom Voice Recognition Hook** with confidence scoring
- **Real-time transcript processing**

### Development Tools
- **TypeScript** for type safety
- **PostCSS** and **Autoprefixer** for CSS processing
- **ESLint** and **Prettier** for code quality

## Project Structure

```
src/
├── components/           # React components
│   ├── Home.tsx         # Landing page
│   ├── Companies.tsx    # Company listing
│   ├── CompanyDetail.tsx # Company details and categories
│   ├── Interview.tsx    # Main interview interface
│   ├── InterviewResults.tsx # Results and scoring
│   ├── Pricing.tsx      # Subscription plans
│   ├── Profile.tsx      # User profile
│   ├── Navbar.tsx       # Navigation bar
│   └── Footer.tsx       # Footer component
├── hooks/               # Custom React hooks
│   ├── useVoiceRecognition.ts # Speech recognition
│   └── useTextToSpeech.ts     # Text-to-speech
├── types/               # TypeScript type definitions
│   └── index.ts         # All interface definitions
├── data/                # Mock data and constants
│   └── mockData.ts      # Companies, questions, plans
└── App.tsx              # Main app component
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with Web Speech API support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-interview-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage Guide

### Starting an Interview

1. **Select a Company**: Choose from available companies on the Companies page
2. **Choose Category**: Select interview type (Frontend, Backend, Full-stack, Behavioral)
3. **Select Mode**: Choose between Voice-to-Text or Voice-to-Voice
4. **Begin Interview**: Start practicing with AI-powered questions

### Voice-to-Text Mode
- AI speaks the question aloud
- User types their response in the text area
- Submit answers to receive AI feedback
- Perfect for coding and technical questions

### Voice-to-Voice Mode
- Natural conversation with AI
- Speak your answers directly
- Real-time speech recognition with confidence scoring
- Ideal for behavioral and discussion-based questions

### Scoring System
- **Overall Score**: Comprehensive performance rating
- **Technical Skills**: Code quality and problem-solving
- **Communication**: Clarity and articulation
- **Problem Solving**: Approach and methodology

## Browser Compatibility

### Speech Recognition Support
- Chrome 25+
- Edge 79+
- Safari 14.1+
- Firefox (limited support)

### Text-to-Speech Support
- Chrome 33+
- Edge 14+
- Safari 7+
- Firefox 49+

## API Integration

The app is designed to integrate with external APIs for:
- **AI Analysis**: Connect to OpenAI or similar services for advanced feedback
- **Payment Processing**: Stripe integration for subscription management
- **User Authentication**: Firebase Auth or Auth0 integration
- **Database**: MongoDB or PostgreSQL for user data persistence

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the build folder to Netlify
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

### Phase 1 (Current)
- ✅ Basic interview functionality
- ✅ Voice recognition and text-to-speech
- ✅ Company and question management
- ✅ Scoring system

### Phase 2 (Next)
- [ ] User authentication and profiles
- [ ] Payment integration
- [ ] Advanced AI feedback
- [ ] Interview history and analytics

### Phase 3 (Future)
- [ ] Live coding environment
- [ ] Video interview simulation
- [ ] Team collaboration features
- [ ] Mobile app development

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@interviewace.com or create an issue in the GitHub repository.

## Acknowledgments

- OpenAI for inspiration on AI-powered applications
- The React community for excellent documentation and resources
- Tailwind CSS for the amazing utility-first CSS framework
- All contributors who help improve this project

---

**Built with ❤️ for aspiring developers worldwide**
