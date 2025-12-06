'use client';

import { useState, useCallback } from 'react';
import { Upload, X, AlertCircle, Image, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface UploadAreaProps {
  onImageSelect: (file: File, dataUrl: string) => void;
}

export default function UploadArea({ onImageSelect }: UploadAreaProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      const msg = 'Please upload JPG, PNG, or WebP files only';
      setError(msg);
      toast.error(msg);
      return false;
    }

    if (file.size > maxSize) {
      const msg = 'Image too large for browser processing. Please use an image under 5MB.';
      setError(msg);
      toast.error(msg, { duration: 4000 });
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setTimeout(() => {
          setSelectedImage(dataUrl);
          setIsUploading(false);
          onImageSelect(file, dataUrl);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setError(null);
  };

  if (isUploading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-12 text-center">
          <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin">
              <div className="absolute inset-2 bg-white rounded-full"></div>
            </div>
            <Upload className="absolute inset-4 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing your image...</h3>
          <p className="text-gray-600">Please wait while we prepare your file</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedImage ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`group relative overflow-hidden border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-500 ${
            dragActive
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl scale-[1.02]'
              : 'border-gray-300 bg-gradient-to-br from-gray-50 to-white hover:border-blue-400 hover:shadow-xl'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-4 left-4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-4 left-1/2 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative z-10">
            <motion.div
              animate={{ scale: dragActive ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.6, repeat: dragActive ? Infinity : 0 }}
              className="mx-auto w-20 h-20 mb-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </motion.div>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {dragActive ? 'Drop your image here!' : 'Upload your image'}
            </h3>
            
            <p className="text-lg text-gray-600 mb-8">
              Drag and drop or click to select your photo
            </p>
            
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleInputChange}
              className="hidden"
              id="file-upload"
            />
            
            <label
              htmlFor="file-upload"
              className="group/btn relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover/btn:from-blue-700 group-hover/btn:to-purple-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <Image className="relative w-5 h-5 mr-2" />
              <span className="relative">Choose File</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
            </label>
            
            <div className="mt-6 flex justify-center items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>JPG, PNG, WebP</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Up to 5MB</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>High Quality</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-110 shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-700">Ready for AI enhancement</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ x: -10 }}
          animate={{ x: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl shadow-lg"
        >
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3 animate-pulse" />
            <div>
              <h4 className="text-red-800 font-semibold">Upload Error</h4>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
