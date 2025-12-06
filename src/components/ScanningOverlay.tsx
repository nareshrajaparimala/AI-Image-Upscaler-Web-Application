'use client';

import { motion } from 'framer-motion';

interface ScanningOverlayProps {
  imageUrl: string;
}

export default function ScanningOverlay({ imageUrl }: ScanningOverlayProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <img src={imageUrl} alt="Analyzing" className="w-full h-auto" />
        <motion.div
          className="absolute inset-x-0 h-16 bg-gradient-to-b from-white/80 via-blue-400/60 to-transparent"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <p className="text-center mt-4 text-gray-700 font-medium" role="status" aria-live="polite">
        Analyzing image density...
      </p>
    </div>
  );
}
