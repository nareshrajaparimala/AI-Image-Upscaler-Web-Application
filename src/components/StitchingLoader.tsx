'use client';

import { motion } from 'framer-motion';

export default function StitchingLoader() {
  return (
    <div className="text-center py-12">
      <motion.div
        className="relative mx-auto w-20 h-20 mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 border-4 border-blue-200 rounded-lg" />
        <div className="absolute inset-2 border-4 border-purple-400 rounded-lg" />
        <motion.div
          className="absolute inset-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
      <p className="text-gray-700 font-medium" role="status" aria-live="polite">
        Stitching final high-res image...
      </p>
    </div>
  );
}
