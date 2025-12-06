'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GridProgressMapProps {
  imageUrl: string;
  totalTiles: number;
  currentTile: number;
}

export default function GridProgressMap({ imageUrl, totalTiles, currentTile }: GridProgressMapProps) {
  const [completedTiles, setCompletedTiles] = useState<Set<number>>(new Set());
  const gridSize = Math.ceil(Math.sqrt(totalTiles));

  useEffect(() => {
    if (currentTile > 0) {
      setCompletedTiles(prev => new Set([...prev, currentTile - 1]));
    }
  }, [currentTile]);

  const progress = (currentTile / totalTiles) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img src={imageUrl} alt="Processing" className="w-full h-auto opacity-40" />
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {Array.from({ length: totalTiles }).map((_, idx) => (
            <motion.div
              key={idx}
              className="border border-blue-300/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={completedTiles.has(idx) ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.2 }}
            >
              {completedTiles.has(idx) && (
                <div className="w-full h-full bg-gradient-to-br from-green-400/40 to-blue-400/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span role="status" aria-live="polite">Upscaling tile {currentTile} of {totalTiles}...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
}
