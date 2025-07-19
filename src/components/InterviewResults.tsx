import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, Home, RotateCcw } from 'lucide-react';

const InterviewResults: React.FC = () => {
  const navigate = useNavigate();

  const mockResults = {
    overall: 85,
    technical: 88,
    communication: 82,
    problemSolving: 90,
    feedback: "Great job! You demonstrated strong technical skills and problem-solving abilities. Your communication was clear and concise. Consider practicing more behavioral questions to improve your overall score.",
    strengths: [
      "Excellent problem-solving approach",
      "Clear and concise explanations",
      "Strong technical knowledge",
      "Good time management"
    ],
    weaknesses: [
      "Could improve on behavioral questions",
      "Sometimes rushed through explanations",
      "Consider more detailed examples"
    ],
    recommendations: [
      "Practice the STAR method for behavioral questions",
      "Take more time to explain your thought process",
      "Review system design fundamentals"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview Complete!
          </h1>
          <p className="text-xl text-gray-600">
            Here's your detailed performance analysis
          </p>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card mb-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Score</h2>
          <div className="text-6xl font-bold text-primary-600 mb-2">
            {mockResults.overall}%
          </div>
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(mockResults.overall / 20)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">Excellent performance! You're ready for the real interview.</p>
        </motion.div>

        {/* Detailed Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Technical Skills', score: mockResults.technical, color: 'bg-blue-500' },
              { label: 'Communication', score: mockResults.communication, color: 'bg-green-500' },
              { label: 'Problem Solving', score: mockResults.problemSolving, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">
                  {item.label}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${item.color} transition-all duration-1000`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-bold text-gray-900">
                  {item.score}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">AI Feedback</h3>
          <p className="text-gray-600 leading-relaxed">{mockResults.feedback}</p>
        </motion.div>

        {/* Strengths and Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-green-600 mb-4">Strengths</h3>
            <ul className="space-y-2">
              {mockResults.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-orange-600 mb-4">Areas for Improvement</h3>
            <ul className="space-y-2">
              {mockResults.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mt-0.5 flex-shrink-0"></div>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {mockResults.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/companies')}
            className="btn-primary flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Practice More
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewResults;