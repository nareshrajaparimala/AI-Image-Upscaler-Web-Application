'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { getErrorMessage } from '@/utils/errorMessages';

interface ErrorDisplayProps {
  errorCode: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ errorCode, onRetry }: ErrorDisplayProps) {
  const { title, body } = getErrorMessage(errorCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ x: -10 }}
        animate={{ x: [0, 10, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
        className="bg-red-50 border-l-4 border-red-500 rounded-r-xl shadow-lg p-6"
      >
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-red-800 font-semibold text-lg mb-1">{title}</h4>
            <p className="text-red-700">{body}</p>
            {onRetry && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
