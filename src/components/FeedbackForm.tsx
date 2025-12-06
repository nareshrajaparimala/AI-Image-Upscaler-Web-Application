'use client';

import { useState } from 'react';
import { Send, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!feedback.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, feedback, email })
      });

      if (!response.ok) throw new Error('Failed to submit');

      const existingFeedback = JSON.parse(localStorage.getItem('feedbackHistory') || '[]');
      existingFeedback.unshift({ rating, feedback, email, timestamp: new Date().toISOString() });
      localStorage.setItem('feedbackHistory', JSON.stringify(existingFeedback.slice(0, 10)));

      toast.success('Thank you for your feedback!');
      setRating(0);
      setFeedback('');
      setEmail('');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              We Value Your Feedback
            </h2>
            <p className="text-gray-600 text-lg">
              Help us improve your AI upscaling experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Rate Your Experience
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                placeholder="Tell us what you think..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
