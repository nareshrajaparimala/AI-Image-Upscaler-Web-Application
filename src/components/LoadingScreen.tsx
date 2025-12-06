'use client';

import { Sparkles, Zap } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 z-[100] flex items-center justify-center">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative text-center">
        {/* Logo */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-white rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-2xl">
            <Zap className="w-16 h-16 text-purple-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          AI Upscaler
          <Sparkles className="w-8 h-8 animate-pulse" />
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/90 mb-8">Transform your images with AI magic</p>

        {/* Loading Animation */}
        <div className="flex justify-center gap-2 mb-4">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        <p className="text-white/80 text-sm">Loading your creative workspace...</p>
      </div>
    </div>
  );
}
