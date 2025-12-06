# 🚀 AI Image Upscaler

A modern, AI-powered image upscaling web application built with Next.js, TensorFlow.js, and UpscalerJS. Transform low-resolution images into high-quality 4x enhanced versions using advanced machine learning models.

## ✨ Features

- **AI-Powered Upscaling**: 2x and 4x image enhancement using ESRGAN models
- **Real-time Processing**: Client-side processing with TensorFlow.js
- **Before/After Comparison**: Interactive slider to compare original and upscaled images
- **User Authentication**: Login/Register system with localStorage persistence
- **History Tracking**: Save and manage your last 5 upscaled images
- **Modern UI**: 3D effects, glassmorphism, and smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI/ML**: TensorFlow.js, UpscalerJS, ESRGAN-Slim models
- **UI Components**: Lucide React icons, React Compare Slider
- **State Management**: React Hooks

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-upscaler

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Quick Start

1. **Upload an Image**: Click or drag-and-drop an image (PNG, JPG, JPEG, WebP)
2. **Select Scale**: Choose 2x or 4x upscaling
3. **Process**: Click "Upscale with AI" button
4. **Compare**: Use the slider to see before/after results
5. **Download**: Save your enhanced image

## 📁 Project Structure

```
ai-upscaler/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main application page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── components/
│       ├── Header.tsx        # Navigation header with profile icon
│       ├── Hero.tsx          # Hero section
│       ├── UploadArea.tsx    # Image upload component
│       ├── Sidebar.tsx       # User dashboard sidebar
│       ├── AuthModal.tsx     # Login/Register modal
│       ├── AICapabilities.tsx # AI features section
│       └── Footer.tsx        # Footer component
├── public/               # Static assets
├── package.json         # Dependencies
└── README.md           # Documentation
```

## 🎨 Key Components

### Authentication System
- **Login/Register Modal**: Email and password authentication
- **Token Management**: Secure localStorage-based session handling
- **Auto-login**: Persistent sessions across page refreshes

### Image Processing
- **UpscalerJS Integration**: Client-side AI upscaling
- **ESRGAN Models**: 2x and 4x super-resolution models
- **Blob API**: Efficient image download handling

### User Dashboard
- **History Tracking**: Last 5 processed images with thumbnails
- **Profile Management**: User avatar and account info
- **Quick Actions**: Re-download and clear history

## 🧠 AI Capabilities

1. **Super Resolution (4x)**: Intelligently scales images up to 400% without quality loss
2. **Face Restoration**: Reconstructs facial features in old or grainy photos
3. **Noise Reduction**: Removes digital noise from low-light photography
4. **Artifact Removal**: Cleans up compression artifacts from web images

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any API keys (if using external services):

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Model Configuration
Models are loaded from `@upscalerjs/esrgan-slim`:
- `2x`: Faster processing, moderate quality improvement
- `4x`: Slower processing, maximum quality enhancement

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 🎯 Performance Tips

- **Image Size**: Optimal for images under 2MB
- **Processing Time**: 
  - 2x upscale: 2-5 seconds
  - 4x upscale: 5-10 seconds
- **Memory**: Requires ~500MB RAM for 4x processing

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [UpscalerJS](https://upscalerjs.com/) - AI upscaling library
- [TensorFlow.js](https://www.tensorflow.org/js) - Machine learning framework
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and AI
