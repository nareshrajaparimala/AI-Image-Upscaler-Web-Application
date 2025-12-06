# Quick Start Guide 🚀

## Setup in 3 Steps

### 1. Install Dependencies ✅
Already done! The Replicate package has been installed.

### 2. Add Your API Token 🔑

1. Visit [replicate.com/account](https://replicate.com/account)
2. Sign up or log in
3. Copy your API token
4. Open `.env.local` in the project root
5. Replace `r8_your_token_here` with your actual token:
   ```
   REPLICATE_API_TOKEN=r8_abc123xyz...
   ```

### 3. Start the Server 🎯

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## How to Use

1. **Upload** - Drag & drop or click to select an image
2. **Upscale** - Click "Upscale 4x with AI" button
3. **Wait** - AI processing takes 30-60 seconds
4. **Compare** - Drag the slider to see the difference
5. **Download** - Click "Download 4x Image" to save

---

## What's New in Day 3 & 4

### Day 3: API Integration 🤖
- ✅ Secure environment variables (`.env.local`)
- ✅ Backend API route (`/api/upscale`)
- ✅ Real-ESRGAN AI model integration
- ✅ Loading states and error handling

### Day 4: Comparison & Download 🖼️
- ✅ Before/After comparison slider
- ✅ Binary download system
- ✅ Reset functionality
- ✅ Professional UI polish

---

## File Structure

```
ai-upscaler/
├── .env.local                    # 🔑 Your API token (DO NOT COMMIT)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── upscale/
│   │   │       └── route.ts      # 🤖 Backend API handler
│   │   └── page.tsx              # 🎨 Main page with upscale logic
│   └── components/
│       └── UploadArea.tsx        # 📤 Updated upload component
└── DAY_3_4_IMPLEMENTATION.md     # 📚 Detailed documentation
```

---

## Troubleshooting

**Error: "Failed to process"**
→ Check your API token in `.env.local`

**Slow processing**
→ Normal! AI takes 30-60 seconds

**Can't download**
→ Check browser console for errors

---

## Cost Information 💰

Replicate charges per API call:
- Real-ESRGAN: ~$0.005 per image
- Free tier: $5 credit for new accounts
- That's ~1000 free upscales!

---

**Ready to test? Upload an image and watch the AI magic! ✨**
