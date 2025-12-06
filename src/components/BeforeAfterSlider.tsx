'use client';

import { motion } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Download, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BeforeAfterSliderProps {
  originalImage: string;
  upscaledImage: string;
  scale: number;
  onDownload: () => void;
  onReset: () => void;
}

export default function BeforeAfterSlider({ 
  originalImage, 
  upscaledImage, 
  scale, 
  onDownload, 
  onReset 
}: BeforeAfterSliderProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)]
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360],
                opacity: [1, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}

      <div className="text-center">
        <motion.h3
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          ✨ Upscale Complete! ({scale}x Resolution)
        </motion.h3>
        <p className="text-gray-600">Drag the slider to compare</p>
      </div>

      <div className="w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
        <ReactCompareSlider
          itemOne={<ReactCompareSliderImage src={originalImage} alt="Original" style={{ objectFit: 'contain' }} />}
          itemTwo={<ReactCompareSliderImage src={upscaledImage} alt="Upscaled" style={{ objectFit: 'contain' }} />}
        />
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownload}
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          autoFocus
        >
          <Download className="w-5 h-5 mr-2" />
          Download {scale}x Image
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Another
        </motion.button>
      </div>
    </motion.div>
  );
}
