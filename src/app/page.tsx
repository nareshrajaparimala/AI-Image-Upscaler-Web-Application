'use client';

import { useState } from 'react';
import { CheckCircle2, Sparkles, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import UploadArea from '@/components/UploadArea';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <UploadArea onImageSelect={handleImageSelect} />
          {selectedFile && (
            <div className="mt-12 text-center animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 shadow-xl">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur opacity-75 animate-pulse"></div>
                    <div className="relative bg-green-500 p-3 rounded-full">
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Upload Successful!
                </h3>
                <p className="text-green-600 font-semibold text-lg mb-2">
                  📁 {selectedFile.name}
                </p>
                <p className="text-gray-600 mb-6">
                  Your image is ready for AI enhancement
                </p>
                <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
                  <Sparkles className="h-4 w-4 text-purple-500 animate-spin" />
                  <span>AI upscaling will be implemented in Day 3</span>
                  <Zap className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}