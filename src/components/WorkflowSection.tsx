'use client';

import { Upload, ScanLine, Grid3x3, Layers, Sparkles, Download } from 'lucide-react';

export default function WorkflowSection() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Image',
      description: 'Select your low-resolution image (PNG, JPG, JPEG, WebP)',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ScanLine,
      title: 'AI Scanning',
      description: 'Our AI analyzes your image structure and identifies enhancement areas',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Grid3x3,
      title: 'Smart Tiling',
      description: 'Image is divided into 64 tiles for efficient parallel processing',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Sparkles,
      title: 'AI Enhancement',
      description: 'ESRGAN model upscales each tile using deep learning algorithms',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Layers,
      title: 'Stitching',
      description: 'Enhanced tiles are seamlessly merged into final high-res image',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Download,
      title: 'Download',
      description: 'Get your 2x or 4x upscaled image with enhanced quality',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How AI Image Scaling Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced AI pipeline transforms your images through a sophisticated multi-stage process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-gray-400">
                          STEP {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Powered by ESRGAN Technology
            </h3>
            <p className="text-lg text-blue-100 leading-relaxed">
              Our AI uses Enhanced Super-Resolution Generative Adversarial Networks (ESRGAN), 
              a state-of-the-art deep learning model trained on millions of images. 
              It intelligently reconstructs missing details, removes noise, and enhances textures 
              while preserving the natural look of your photos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
