'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import UploadArea from '@/components/UploadArea';
import Sidebar from '@/components/Sidebar';
import AICapabilities from '@/components/AICapabilities';
import LoadingScreen from '@/components/LoadingScreen';
import ScanningOverlay from '@/components/ScanningOverlay';
import GridProgressMap from '@/components/GridProgressMap';
import StitchingLoader from '@/components/StitchingLoader';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ErrorDisplay from '@/components/ErrorDisplay';
import WorkflowSection from '@/components/WorkflowSection';
import FeedbackForm from '@/components/FeedbackForm';
import { getErrorMessage } from '@/utils/errorMessages';

interface HistoryItem {
  result: string;
  timestamp: string;
}

type ProcessingStage = 'idle' | 'scanning' | 'tiling' | 'stitching' | 'complete';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [scale, setScale] = useState<2 | 4>(4);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle');
  const [currentTile, setCurrentTile] = useState(0);
  const [totalTiles] = useState(64);

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
    setErrorCode(null);
    setProcessingStage('idle');
  };

  const handleUpscale = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setErrorCode(null);
    setProcessingStage('scanning');

    try {
      // Stage 2: Scanning
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Stage 3: Tiling
      setProcessingStage('tiling');
      for (let i = 1; i <= totalTiles; i++) {
        setCurrentTile(i);
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      // Stage 4: Stitching
      setProcessingStage('stitching');
      
      const response = await fetch('/api/upscale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: originalImage })
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMsg = getErrorMessage(data.error || 'UNKNOWN_ERROR');
        toast.error(`${errorMsg.title}: ${errorMsg.body}`);
        throw new Error(data.error || 'UNKNOWN_ERROR');
      }

      await new Promise(resolve => setTimeout(resolve, 800));

      setUpscaledImage(data.url);
      setProcessingStage('complete');
      
      const newItem: HistoryItem = {
        result: data.url,
        timestamp: new Date().toLocaleString()
      };
      setHistory(prev => [newItem, ...prev].slice(0, 5));
    } catch (err) {
      const code = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
      setErrorCode(code);
      setProcessingStage('idle');
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
      link.download = `upscaled-image-${scale}x.png`;
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
    setErrorCode(null);
    setProcessingStage('idle');
    setCurrentTile(0);
  };

  if (showLoadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Toaster position="top-right" />
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
          
          {selectedFile && !isLoading && !upscaledImage && (
            <div className="mt-12 text-center animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 shadow-xl">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur opacity-75 animate-pulse"></div>
                    <div className="relative bg-green-500 p-3 rounded-full">
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
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
                  className="relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Upscale {scale}x with AI
                </button>
              </div>
            </div>
          )}

          {isLoading && processingStage === 'scanning' && originalImage && (
            <div className="mt-12">
              <ScanningOverlay imageUrl={originalImage} />
            </div>
          )}

          {isLoading && processingStage === 'tiling' && originalImage && (
            <div className="mt-12">
              <GridProgressMap 
                imageUrl={originalImage} 
                totalTiles={totalTiles} 
                currentTile={currentTile} 
              />
            </div>
          )}

          {isLoading && processingStage === 'stitching' && (
            <div className="mt-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-12">
                <StitchingLoader />
              </div>
            </div>
          )}

          {errorCode && (
            <ErrorDisplay errorCode={errorCode} onRetry={handleUpscale} />
          )}

          {upscaledImage && originalImage && processingStage === 'complete' && (
            <div className="mt-12">
              <BeforeAfterSlider
                originalImage={originalImage}
                upscaledImage={upscaledImage}
                scale={scale}
                onDownload={() => downloadImage(upscaledImage)}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
        <AICapabilities />
        <WorkflowSection />
      </main>
      <FeedbackForm />
      <Footer />
    </div>
  );
}
