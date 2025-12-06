'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Sparkles, Zap, Download, RotateCcw, Loader2 } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import UploadArea from '@/components/UploadArea';
import Sidebar from '@/components/Sidebar';
import AICapabilities from '@/components/AICapabilities';
import LoadingScreen from '@/components/LoadingScreen';

interface HistoryItem {
  result: string;
  timestamp: string;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<2 | 4>(4);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageSelect = (file: File, dataUrl: string) => {
    setSelectedFile(file);
    setOriginalImage(dataUrl);
    setUpscaledImage(null);
    setError(null);
  };

  const handleUpscale = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/upscale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: originalImage })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setUpscaledImage(data.url);
      
      const newItem: HistoryItem = {
        result: data.url,
        timestamp: new Date().toLocaleString()
      };
      setHistory(prev => [newItem, ...prev].slice(0, 5));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = async (imgUrl: string) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'upscaled-image-4x.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setUpscaledImage(null);
    setError(null);
  };

  if (showLoadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onProfileClick={() => setSidebarOpen(true)} />
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        history={history}
        onClear={() => setHistory([])}
      />
      <main className="flex-1">
        <Hero />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <UploadArea onImageSelect={handleImageSelect} />
          
          {selectedFile && !upscaledImage && (
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
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={() => setScale(2)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${scale === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    2x Upscale
                  </button>
                  <button
                    onClick={() => setScale(4)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${scale === 4 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    4x Upscale
                  </button>
                </div>
                <button
                  onClick={handleUpscale}
                  disabled={isLoading}
                  className="relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Upscale {scale}x with AI
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-12">
                <div className="relative mx-auto w-16 h-16 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin">
                    <div className="absolute inset-2 bg-white rounded-full"></div>
                  </div>
                  <Sparkles className="absolute inset-4 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI is enhancing your image...</h3>
                <p className="text-gray-600">Processing with Cloudinary AI • This may take a few seconds</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-12 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl shadow-lg">
              <h4 className="text-red-800 font-semibold mb-2">Error</h4>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {upscaledImage && originalImage && (
            <div className="mt-12 space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">✨ AI Enhancement Complete!</h3>
                <p className="text-gray-600">Drag the slider to compare</p>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={originalImage} alt="Original Low Res" style={{ objectFit: 'contain' }} />}
                  itemTwo={<ReactCompareSliderImage src={upscaledImage} alt="AI Enhanced" style={{ objectFit: 'contain' }} />}
                />
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => downloadImage(upscaledImage)}
                  className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download {scale}x Image
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-6 py-3 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Upload New Image
                </button>
              </div>
            </div>
          )}
        </div>
        <AICapabilities />
      </main>
      <Footer />
    </div>
  );
}