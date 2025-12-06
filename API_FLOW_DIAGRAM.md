# API Flow Diagram 🔄

## Complete Request/Response Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                          │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 1. Uploads image
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                    UploadArea Component                           │
│  • Validates file (type, size)                                   │
│  • Converts to Base64 (FileReader)                               │
│  • Calls: onImageSelect(file, dataUrl)                           │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 2. Passes data to parent
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                      Main Page (page.tsx)                         │
│  • Stores: originalImage (Base64)                                │
│  • Displays: Preview + "Upscale" button                          │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 3. User clicks "Upscale 4x"
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                    handleUpscale() Function                       │
│  • Sets: isLoading = true                                        │
│  • Prepares: JSON payload { image: base64 }                      │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 4. POST /api/upscale
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                  Next.js API Route (Server)                       │
│  File: src/app/api/upscale/route.ts                              │
│                                                                   │
│  export async function POST(req: Request) {                      │
│    const { image } = await req.json();                           │
│    ↓                                                              │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 5. Authenticates with token
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Replicate Client Init                          │
│  const replicate = new Replicate({                               │
│    auth: process.env.REPLICATE_API_TOKEN  ← From .env.local      │
│  });                                                              │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 6. Triggers AI model
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                      Replicate API Call                           │
│  const output = await replicate.run(                             │
│    'nightmareai/real-esrgan:42fed...',                           │
│    {                                                              │
│      input: {                                                     │
│        image: image,        ← Base64 from frontend               │
│        scale: 4,            ← 4x upscaling                       │
│        face_enhance: true   ← Better portraits                   │
│      }                                                            │
│    }                                                              │
│  );                                                               │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 7. AI Processing (30-60s)
                                 │    • Loads model
                                 │    • Enhances image
                                 │    • Uploads to CDN
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                      Replicate Response                           │
│  Returns: "https://replicate.delivery/pbxt/..."                  │
│  (Public CDN URL of upscaled image)                              │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 8. Returns to API route
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                    API Route Response                             │
│  return NextResponse.json({                                      │
│    url: output  ← Image URL                                      │
│  });                                                              │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 9. JSON response to frontend
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Frontend Receives Data                         │
│  const data = await response.json();                             │
│  setUpscaledImage(data.url);                                     │
│  setIsLoading(false);                                            │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 10. Updates UI
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Comparison Slider Renders                      │
│  <ReactCompareSlider                                             │
│    itemOne={originalImage}   ← Base64 from upload               │
│    itemTwo={upscaledImage}   ← URL from Replicate               │
│  />                                                               │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 11. User drags slider
                                 │     Compares quality
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                    User Clicks Download                           │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 12. Triggers downloadImage()
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Download Function Flow                         │
│  1. fetch(upscaledImage)           ← Get from CDN                │
│  2. response.blob()                ← Convert to binary           │
│  3. URL.createObjectURL(blob)     ← Create temp link             │
│  4. link.download = 'filename'    ← Set name                     │
│  5. link.click()                  ← Trigger download             │
│  6. URL.revokeObjectURL(url)      ← Cleanup memory               │
└──────────────────────────────────────────────────────────────────┘
                                 │
                                 │ 13. File saved to disk
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                         SUCCESS! 🎉                               │
│  User has: upscaled-image-4x.png                                 │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Summary

### Upload Phase
```
User File → FileReader → Base64 String → React State
```

### Processing Phase
```
Base64 → API Route → Replicate → AI Model → CDN URL → React State
```

### Download Phase
```
CDN URL → Fetch → Blob → Object URL → Download → Cleanup
```

---

## Security Layers

```
┌─────────────────────────────────────────┐
│         Browser (Public)                │
│  • Can see: Image previews              │
│  • Cannot see: API tokens               │
└─────────────────────────────────────────┘
                  │
                  │ HTTPS
                  ▼
┌─────────────────────────────────────────┐
│      Next.js Server (Private)           │
│  • Has access to: .env.local            │
│  • Validates: Requests                  │
│  • Proxies: API calls                   │
└─────────────────────────────────────────┘
                  │
                  │ Authenticated Request
                  ▼
┌─────────────────────────────────────────┐
│       Replicate API (External)          │
│  • Requires: Valid API token            │
│  • Returns: Public CDN URLs             │
└─────────────────────────────────────────┘
```

---

## Error Handling Flow

```
┌─────────────────────────────────────────┐
│         Any Step Fails                  │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│      try/catch Block Catches            │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│   setError(message)                     │
│   setIsLoading(false)                   │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│   Red Alert Box Displayed               │
│   User can retry                        │
└─────────────────────────────────────────┘
```

---

## State Management Timeline

```
Initial State:
  selectedFile: null
  originalImage: null
  upscaledImage: null
  isLoading: false
  error: null

After Upload:
  selectedFile: File object
  originalImage: "data:image/png;base64,..."
  upscaledImage: null
  isLoading: false
  error: null

During Processing:
  selectedFile: File object
  originalImage: "data:image/png;base64,..."
  upscaledImage: null
  isLoading: true ← Shows spinner
  error: null

After Success:
  selectedFile: File object
  originalImage: "data:image/png;base64,..."
  upscaledImage: "https://replicate.delivery/..."
  isLoading: false
  error: null

After Reset:
  selectedFile: null
  originalImage: null
  upscaledImage: null
  isLoading: false
  error: null
```

---

## Performance Optimization

1. **Base64 Encoding:** Done once on upload
2. **Lazy Loading:** Comparison slider only renders when needed
3. **Memory Cleanup:** Blob URLs revoked after download
4. **Error Boundaries:** Prevents app crashes
5. **Loading States:** Prevents duplicate requests

---

This diagram shows the complete journey from upload to download! 🚀
