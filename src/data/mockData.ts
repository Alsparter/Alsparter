import { Company, InterviewCategory, Question, PaymentPlan } from '../types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'Tell me about yourself and your experience with software development.',
    type: 'behavioral',
    difficulty: 'Easy',
    timeLimit: 3,
    hints: ['Focus on relevant experience', 'Mention key achievements', 'Keep it concise']
  },
  {
    id: '2',
    text: 'Write a function to reverse a string without using built-in methods.',
    type: 'coding',
    difficulty: 'Medium',
    timeLimit: 15,
    expectedAnswer: 'function reverseString(str) { let reversed = ""; for (let i = str.length - 1; i >= 0; i--) { reversed += str[i]; } return reversed; }',
    hints: ['Use a loop', 'Start from the end', 'Build the string character by character']
  },
  {
    id: '3',
    text: 'Explain the difference between React functional components and class components.',
    type: 'technical',
    difficulty: 'Medium',
    timeLimit: 5,
    hints: ['Mention hooks', 'Lifecycle methods', 'State management']
  },
  {
    id: '4',
    text: 'Design a scalable chat application architecture.',
    type: 'system-design',
    difficulty: 'Hard',
    timeLimit: 20,
    hints: ['Consider real-time messaging', 'Database design', 'Load balancing', 'WebSocket connections']
  },
  {
    id: '5',
    text: 'How do you handle conflict in a team environment?',
    type: 'behavioral',
    difficulty: 'Easy',
    timeLimit: 4,
    hints: ['Use STAR method', 'Show empathy', 'Focus on resolution']
  },
  {
    id: '6',
    text: 'Implement a binary search algorithm.',
    type: 'coding',
    difficulty: 'Medium',
    timeLimit: 12,
    expectedAnswer: 'function binarySearch(arr, target) { let left = 0, right = arr.length - 1; while (left <= right) { let mid = Math.floor((left + right) / 2); if (arr[mid] === target) return mid; if (arr[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }',
    hints: ['Divide and conquer', 'Compare with middle element', 'Adjust search range']
  }
];

export const mockCategories: InterviewCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    description: 'React, JavaScript, HTML, CSS, and UI/UX focused questions',
    questions: mockQuestions.filter(q => ['1', '2', '3'].includes(q.id)),
    duration: 45,
    difficulty: 'Medium'
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    description: 'Node.js, databases, APIs, and server-side development',
    questions: mockQuestions.filter(q => ['1', '4', '6'].includes(q.id)),
    duration: 60,
    difficulty: 'Hard'
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    description: 'Complete web development stack questions',
    questions: mockQuestions,
    duration: 75,
    difficulty: 'Hard'
  },
  {
    id: 'behavioral',
    name: 'Behavioral Interview',
    description: 'Soft skills, leadership, and cultural fit questions',
    questions: mockQuestions.filter(q => q.type === 'behavioral'),
    duration: 30,
    difficulty: 'Easy'
  }
];

export const mockCompanies: Company[] = [
  {
    id: 'google',
    name: 'Google',
    logo: '/logos/google.png',
    description: 'Search giant focused on innovation and technical excellence',
    categories: mockCategories
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '/logos/microsoft.png',
    description: 'Technology leader in cloud computing and productivity software',
    categories: mockCategories
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '/logos/amazon.png',
    description: 'E-commerce and cloud computing pioneer',
    categories: mockCategories
  },
  {
    id: 'meta',
    name: 'Meta',
    logo: '/logos/meta.png',
    description: 'Social media and metaverse technology company',
    categories: mockCategories.filter(c => ['frontend', 'fullstack', 'behavioral'].includes(c.id))
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo: '/logos/netflix.png',
    description: 'Streaming entertainment service with cutting-edge technology',
    categories: mockCategories
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: '/logos/apple.png',
    description: 'Consumer electronics and software innovation leader',
    categories: mockCategories
  },
  {
    id: 'tesla',
    name: 'Tesla',
    logo: '/logos/tesla.png',
    description: 'Electric vehicle and clean energy technology company',
    categories: mockCategories.filter(c => ['backend', 'fullstack', 'behavioral'].includes(c.id))
  },
  {
    id: 'spotify',
    name: 'Spotify',
    logo: '/logos/spotify.png',
    description: 'Music streaming platform with personalized experiences',
    categories: mockCategories
  }
];

export const paymentPlans: PaymentPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    duration: 'monthly',
    features: [
      '3 interviews per month',
      'Basic AI feedback',
      'Standard question bank',
      'Email support'
    ],
    maxInterviews: 3
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 29,
    duration: 'monthly',
    features: [
      'Unlimited interviews',
      'Advanced AI analysis',
      'Custom question sets',
      'Voice-to-voice interviews',
      'Detailed performance reports',
      'Priority support'
    ],
    maxInterviews: -1,
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    duration: 'monthly',
    features: [
      'Everything in Premium',
      'Custom company integrations',
      'Advanced analytics dashboard',
      'Team management',
      'API access',
      'Dedicated support'
    ],
    maxInterviews: -1
  }
];