'use client';

import { X, Mail, Lock, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, token: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState<'login' | 'register'>('login');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (isLogin) {
      const stored = localStorage.getItem('user_' + email);
      if (!stored) {
        setError('Account not found. Please register.');
        return;
      }
      const userData = JSON.parse(stored);
      if (userData.password !== password) {
        setError('Invalid password');
        return;
      }
      const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour
      localStorage.setItem('auth_token', userData.token);
      localStorage.setItem('user_email', email);
      localStorage.setItem('auth_expiry', expiryTime.toString());
      setSuccessType('login');
      setShowSuccess(true);
      setTimeout(() => {
        onLogin(email, userData.token);
        onClose();
        setShowSuccess(false);
      }, 2000);
    } else {
      // Check if account already exists
      const existing = localStorage.getItem('user_' + email);
      if (existing) {
        setError('Account already exists! Please login instead.');
        return;
      }
      const token = 'tok_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('user_' + email, JSON.stringify({ password, token }));
      setSuccessType('register');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsLogin(true);
        setEmail('');
        setPassword('');
      }, 2500);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl w-full max-w-md shadow-2xl transform animate-scale-in border border-gray-200 p-12 text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-full shadow-2xl">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            {successType === 'login' ? 'Welcome Back!' : 'Account Created!'}
          </h2>
          <p className="text-gray-600 mb-2">
            {successType === 'login' 
              ? '🎉 Successfully logged in! Redirecting to your dashboard...' 
              : '✨ Registration successful! Please login to continue...'}
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl w-full max-w-md shadow-2xl transform transition-all animate-scale-in border border-gray-200">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
        
        <div className="relative">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back!' : 'Join Us Today'}
              </h2>
            </div>
            <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-full transition-all hover:scale-110">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Welcome Message */}
          <div className="px-6 pt-4 pb-2">
            <p className="text-sm text-gray-600 text-center">
              {isLogin 
                ? '🎨 Continue your creative journey with AI-powered image enhancement' 
                : '✨ Create your account and unlock unlimited AI upscaling capabilities'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="relative w-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-2 py-3 text-white font-semibold">
                {isLogin ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Sign In to Your Account
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Create Free Account
                  </>
                )}
              </div>
            </button>

            {/* Toggle Login/Register */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setEmail('');
                    setPassword('');
                  }}
                  className="text-blue-600 font-bold hover:text-purple-600 transition-colors hover:underline"
                >
                  {isLogin ? 'Sign Up Free' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Benefits */}
            {!isLogin && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-2">What you'll get:</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Unlimited AI image upscaling</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Save your upscaling history</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Access to premium features</span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
