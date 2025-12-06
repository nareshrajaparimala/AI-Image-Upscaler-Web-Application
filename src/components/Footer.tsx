import { Heart, Code, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Upscaler
            </span>
          </div>
          <p className="text-gray-300 mb-4">
            Transform your images with the power of artificial intelligence
          </p>
          <div className="flex justify-center items-center space-x-2 text-gray-400">
            <span>&copy; 2024 AI Upscaler. Built with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>using</span>
            <Code className="h-4 w-4 text-blue-400" />
            <span>Next.js and AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}