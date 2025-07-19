export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  categories: InterviewCategory[];
}

export interface InterviewCategory {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  duration: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Question {
  id: string;
  text: string;
  type: 'coding' | 'technical' | 'behavioral' | 'system-design';
  expectedAnswer?: string;
  hints?: string[];
  timeLimit?: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface InterviewSession {
  id: string;
  companyId: string;
  categoryId: string;
  type: 'voice-to-text' | 'voice-to-voice';
  startTime: Date;
  endTime?: Date;
  currentQuestionIndex: number;
  answers: Answer[];
  score?: InterviewScore;
  status: 'in-progress' | 'completed' | 'paused';
}

export interface Answer {
  questionId: string;
  content: string;
  audioUrl?: string;
  timeSpent: number; // in seconds
  timestamp: Date;
  isCorrect?: boolean;
  aiAnalysis?: string;
}

export interface InterviewScore {
  overall: number;
  technical: number;
  communication: number;
  problemSolving: number;
  feedback: string;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscriptionType: 'free' | 'premium' | 'enterprise';
  interviewHistory: InterviewSession[];
}

export interface VoiceRecognitionState {
  isListening: boolean;
  transcript: string;
  confidence: number;
  error?: string;
}

export interface AIResponse {
  text: string;
  audioUrl?: string;
  confidence: number;
  followUpQuestions?: string[];
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
  maxInterviews: number;
  isPopular?: boolean;
}