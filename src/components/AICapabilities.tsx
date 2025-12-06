'use client';

import { Sparkles, Zap, Image, Wand2 } from 'lucide-react';

export default function AICapabilities() {
  const capabilities = [
    {
      icon: Zap,
      title: 'Super Resolution (4x)',
      description: 'Intelligently scales low-resolution images by up to 400% without losing quality. Unlike traditional bilinear upscaling which just blurs pixels, our AI predicts and inserts plausible details.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Face Restoration',
      description: 'Detects human faces in old or grainy photos and reconstructs facial features (eyes, nose, mouth) to look sharp and realistic. Perfect for restoring vintage family albums.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Image,
      title: 'Noise Reduction',
      description: 'Removes the grainy digital noise often found in low-light photography or highly compressed JPEG files, resulting in a cleaner, smoother image.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Wand2,
      title: 'Artifact Removal',
      description: 'Cleans up compression artifacts (blocky pixels) common in images downloaded from the web or social media.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🧠 AI-Powered Capabilities
        </h2>
        <p className="text-lg text-gray-600">
          Advanced machine learning technology that brings your images to life
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {capabilities.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
