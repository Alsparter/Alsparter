import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  Clock, 
  MessageSquare,
  Code,
  Send,
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { mockCompanies } from '../data/mockData';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { InterviewSession, Question, Answer } from '../types';

const Interview: React.FC = () => {
  const { companyId, categoryId } = useParams<{ companyId: string; categoryId: string }>();
  const navigate = useNavigate();
  
  const [interviewType, setInterviewType] = useState<'voice-to-text' | 'voice-to-voice'>('voice-to-text');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [session, setSession] = useState<InterviewSession | null>(null);

  const voiceRecognition = useVoiceRecognition();
  const textToSpeech = useTextToSpeech();

  // Find company and category
  const company = mockCompanies.find(c => c.id === companyId);
  const category = company?.categories.find(c => c.id === categoryId);
  const questions = category?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (category && !session) {
      const newSession: InterviewSession = {
        id: Date.now().toString(),
        companyId: companyId!,
        categoryId: categoryId!,
        type: interviewType,
        startTime: new Date(),
        currentQuestionIndex: 0,
        answers: [],
        status: 'in-progress'
      };
      setSession(newSession);
    }
  }, [companyId, categoryId, category, interviewType, session]);

  useEffect(() => {
    if (currentQuestion && isInterviewStarted) {
      setTimeRemaining((currentQuestion.timeLimit || 5) * 60);
      setCurrentAnswer('');
      setShowHints(false);
      
      // Auto-speak question in voice-to-voice mode
      if (interviewType === 'voice-to-voice') {
        setTimeout(() => {
          textToSpeech.speak(currentQuestion.text);
        }, 1000);
      }
    }
  }, [currentQuestionIndex, isInterviewStarted, currentQuestion, interviewType, textToSpeech]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInterviewStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isInterviewStarted) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isInterviewStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startInterview = () => {
    setIsInterviewStarted(true);
    if (currentQuestion) {
      setTimeRemaining((currentQuestion.timeLimit || 5) * 60);
    }
  };

  const handleAnswerSubmit = () => {
    if (!session || !currentQuestion) return;

    const answer: Answer = {
      questionId: currentQuestion.id,
      content: currentAnswer,
      timeSpent: (currentQuestion.timeLimit || 5) * 60 - timeRemaining,
      timestamp: new Date()
    };

    setSession(prev => prev ? {
      ...prev,
      answers: [...prev.answers, answer]
    } : null);

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Interview completed
      if (session) {
        setSession(prev => prev ? {
          ...prev,
          status: 'completed',
          endTime: new Date()
        } : null);
      }
      navigate(`/interview/${companyId}/${categoryId}/results`);
    }
  };

  const handleVoiceAnswer = () => {
    if (voiceRecognition.isListening) {
      voiceRecognition.stopListening();
      setCurrentAnswer(voiceRecognition.transcript);
    } else {
      voiceRecognition.startListening();
    }
  };

  const speakQuestion = () => {
    if (currentQuestion) {
      if (textToSpeech.isSpeaking) {
        textToSpeech.cancel();
      } else {
        textToSpeech.speak(currentQuestion.text);
      }
    }
  };

  if (!company || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Not Found</h2>
          <p className="text-gray-600 mb-4">The requested interview could not be found.</p>
          <button
            onClick={() => navigate('/companies')}
            className="btn-primary"
          >
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  if (!isInterviewStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="card max-w-2xl w-full mx-4"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              {company.name.charAt(0)}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {company.name} Interview
            </h1>
            <h2 className="text-xl text-gray-600 mb-6">
              {category.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{questions.length}</div>
                <div className="text-sm text-gray-500">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{category.duration}</div>
                <div className="text-sm text-gray-500">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{category.difficulty}</div>
                <div className="text-sm text-gray-500">Difficulty</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Interview Type:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setInterviewType('voice-to-text')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    interviewType === 'voice-to-text'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Mic className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                  <div className="font-semibold text-gray-900">Voice-to-Text</div>
                  <div className="text-sm text-gray-600">AI speaks, you type/write</div>
                </button>
                <button
                  onClick={() => setInterviewType('voice-to-voice')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    interviewType === 'voice-to-voice'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                  <div className="font-semibold text-gray-900">Voice-to-Voice</div>
                  <div className="text-sm text-gray-600">Natural conversation</div>
                </button>
              </div>
            </div>

            <button
              onClick={startInterview}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Interview
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white text-lg font-bold mr-3">
                {company.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {company.name} - {category.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className={`font-mono text-lg ${timeRemaining < 60 ? 'text-red-600' : ''}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {interviewType === 'voice-to-text' ? 'Voice-to-Text' : 'Voice-to-Voice'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Panel */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Question {currentQuestionIndex + 1}
                </h2>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentQuestion.type === 'coding' ? 'bg-blue-100 text-blue-800' :
                    currentQuestion.type === 'technical' ? 'bg-green-100 text-green-800' :
                    currentQuestion.type === 'behavioral' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {currentQuestion.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={speakQuestion}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      textToSpeech.isSpeaking
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    }`}
                  >
                    {textToSpeech.isSpeaking ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        Speak Question
                      </>
                    )}
                  </button>
                  {currentQuestion.hints && (
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors duration-200"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHints ? 'Hide' : 'Show'} Hints
                    </button>
                  )}
                </div>
                
                <div className="text-lg text-gray-900 leading-relaxed">
                  {currentQuestion.text}
                </div>

                {showHints && currentQuestion.hints && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <h4 className="font-semibold text-yellow-800 mb-2">Hints:</h4>
                    <ul className="list-disc list-inside text-yellow-700 space-y-1">
                      {currentQuestion.hints.map((hint, index) => (
                        <li key={index} className="text-sm">{hint}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Answer Input */}
              <div className="space-y-4">
                {interviewType === 'voice-to-text' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Answer:
                    </label>
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Answer:
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleVoiceAnswer}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          voiceRecognition.isListening
                            ? 'bg-red-500 text-white hover:bg-red-600 voice-pulse'
                            : 'bg-primary-500 text-white hover:bg-primary-600'
                        }`}
                      >
                        {voiceRecognition.isListening ? (
                          <>
                            <MicOff className="w-5 h-5" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="w-5 h-5" />
                            Start Recording
                          </>
                        )}
                      </button>
                      {voiceRecognition.confidence > 0 && (
                        <div className="text-sm text-gray-600">
                          Confidence: {Math.round(voiceRecognition.confidence * 100)}%
                        </div>
                      )}
                    </div>
                    {voiceRecognition.transcript && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Transcript:</p>
                        <p className="text-gray-900">{voiceRecognition.transcript}</p>
                      </div>
                    )}
                    {voiceRecognition.error && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-600">{voiceRecognition.error}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={!currentAnswer && !voiceRecognition.transcript}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Submit Answer
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    <SkipForward className="w-4 h-4" />
                    Skip Question
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Progress Panel */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Questions</span>
                    <span>{currentQuestionIndex + 1} / {questions.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Time Remaining</span>
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        timeRemaining < 60 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${(timeRemaining / ((currentQuestion?.timeLimit || 5) * 60)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Overview</h3>
              <div className="space-y-2">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      index === currentQuestionIndex
                        ? 'bg-primary-50 border border-primary-200'
                        : index < currentQuestionIndex
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === currentQuestionIndex
                        ? 'bg-primary-500 text-white'
                        : index < currentQuestionIndex
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {question.type}
                      </div>
                      <div className="text-xs text-gray-500">
                        {question.difficulty} • {question.timeLimit || 5} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;