# Code Snippets Reference 📝

Quick reference for key code patterns used in Day 3 & 4.

---

## 1. Environment Variable Access (Server-Side Only)

```typescript
// ✅ CORRECT - Server-side (API Route)
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ❌ WRONG - Never in client components
// Client can't access process.env.REPLICATE_API_TOKEN
```

---

## 2. API Route Pattern (Next.js 16 App Router)

```typescript
// src/app/api/upscale/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse request body
    const { image } = await req.json();
    
    // Process data
    const result = await someAsyncOperation(image);
    
    // Return success response
    return NextResponse.json({ url: result });
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { error: 'Failed to process' },
      { status: 500 }
    );
  }
}
```

---

## 3. Fetch API Call (Client-Side)

```typescript
// Making POST request to API route
const response = await fetch('/api/upscale', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ image: base64String }),
});

// Parse JSON response
const data = await response.json();

// Check for errors
if (!response.ok) {
  throw new Error(data.error || 'Request failed');
}

// Use the data
console.log(data.url);
```

---

## 4. File to Base64 Conversion

```typescript
const handleFile = (file: File) => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const base64String = e.target?.result as string;
    // base64String format: "data:image/png;base64,iVBORw0KG..."
    console.log(base64String);
  };
  
  reader.readAsDataURL(file);
};
```

---

## 5. React State Management Pattern

```typescript
// State declarations
const [originalImage, setOriginalImage] = useState<string | null>(null);
const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Update pattern
const handleUpscale = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    // ... API call
    setUpscaledImage(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

---

## 6. Comparison Slider Implementation

```typescript
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// Usage
<ReactCompareSlider
  itemOne={
    <ReactCompareSliderImage 
      src={originalImage} 
      alt="Original" 
    />
  }
  itemTwo={
    <ReactCompareSliderImage 
      src={upscaledImage} 
      alt="Enhanced" 
    />
  }
  style={{ height: '100%' }}
/>
```

---

## 7. Binary File Download

```typescript
const downloadImage = async (imageUrl: string) => {
  try {
    // 1. Fetch as blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // 2. Create object URL
    const url = window.URL.createObjectURL(blob);
    
    // 3. Create temporary link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'upscaled-image-4x.png';
    
    // 4. Trigger download
    document.body.appendChild(link);
    link.click();
    
    // 5. Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
```

---

## 8. Conditional Rendering Pattern

```typescript
// Show different UI based on state
{!upscaledImage && selectedFile && (
  <button onClick={handleUpscale}>
    Upscale Image
  </button>
)}

{isLoading && (
  <div>Processing...</div>
)}

{error && (
  <div className="error">{error}</div>
)}

{upscaledImage && originalImage && (
  <div>
    {/* Comparison slider */}
  </div>
)}
```

---

## 9. Loading Button Pattern

```typescript
<button
  onClick={handleUpscale}
  disabled={isLoading}
  className="btn"
>
  {isLoading ? (
    <>
      <Loader2 className="animate-spin" />
      Processing...
    </>
  ) : (
    <>
      <Sparkles />
      Upscale 4x
    </>
  )}
</button>
```

---

## 10. Error Handling Pattern

```typescript
try {
  const response = await fetch('/api/upscale', {
    method: 'POST',
    body: JSON.stringify({ image }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Unknown error');
  }
  
  setUpscaledImage(data.url);
} catch (err) {
  const message = err instanceof Error 
    ? err.message 
    : 'An error occurred';
  setError(message);
} finally {
  setIsLoading(false);
}
```

---

## 11. Replicate API Call

```typescript
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
  'nightmareai/real-esrgan:42fed1c311e539d50910ce796303eb980a05e60f90e51937f5412e68337e2543',
  {
    input: {
      image: base64String,
      scale: 4,
      face_enhance: true,
    }
  }
);

// output is a string URL
console.log(output); // "https://replicate.delivery/..."
```

---

## 12. TypeScript Interface Pattern

```typescript
// Component props
interface UploadAreaProps {
  onImageSelect: (file: File, dataUrl: string) => void;
}

// State types
const [image, setImage] = useState<string | null>(null);
const [file, setFile] = useState<File | null>(null);

// Function types
const handleUpscale = async (): Promise<void> => {
  // ...
};

const downloadImage = async (url: string): Promise<void> => {
  // ...
};
```

---

## 13. Async/Await Pattern

```typescript
// ✅ CORRECT - Proper async/await
const handleUpscale = async () => {
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/upscale', {...});
    const data = await response.json();
    setResult(data.url);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

// ❌ WRONG - Missing await
const handleUpscale = async () => {
  const response = fetch('/api/upscale', {...}); // Missing await!
  const data = response.json(); // This will fail!
};
```

---

## 14. Environment File Format

```bash
# .env.local

# Replicate API Token
REPLICATE_API_TOKEN=r8_abc123xyz...

# Note: No quotes needed
# Note: No spaces around =
# Note: This file is git-ignored
```

---

## 15. Reset State Pattern

```typescript
const handleReset = () => {
  // Clear all state
  setSelectedFile(null);
  setOriginalImage(null);
  setUpscaledImage(null);
  setError(null);
  setIsLoading(false);
};
```

---

## 16. Conditional Class Names

```typescript
// Dynamic classes based on state
<div className={`
  base-class
  ${isLoading ? 'loading-class' : ''}
  ${error ? 'error-class' : ''}
  ${success ? 'success-class' : ''}
`}>
  Content
</div>

// Or using template literals
<button 
  className={`btn ${isLoading ? 'opacity-50' : 'hover:scale-105'}`}
  disabled={isLoading}
>
  Click me
</button>
```

---

## 17. File Validation Pattern

```typescript
const validateFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    setError('Invalid file type');
    return false;
  }
  
  if (file.size > maxSize) {
    setError('File too large');
    return false;
  }
  
  return true;
};
```

---

## 18. Drag and Drop Pattern

```typescript
const [dragActive, setDragActive] = useState(false);

const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setDragActive(false);
  
  const file = e.dataTransfer.files[0];
  if (file) {
    handleFile(file);
  }
};

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  setDragActive(true);
};

const handleDragLeave = (e: React.DragEvent) => {
  e.preventDefault();
  setDragActive(false);
};

// Usage
<div
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
>
  Drop files here
</div>
```

---

## 19. Icon with Loading State

```typescript
import { Sparkles, Loader2 } from 'lucide-react';

{isLoading ? (
  <Loader2 className="w-5 h-5 animate-spin" />
) : (
  <Sparkles className="w-5 h-5" />
)}
```

---

## 20. API Response Type

```typescript
// Success response
{
  "url": "https://replicate.delivery/pbxt/abc123.png"
}

// Error response
{
  "error": "Failed to process"
}

// TypeScript types
type SuccessResponse = {
  url: string;
};

type ErrorResponse = {
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;
```

---

## Common Patterns Summary

### Client-Side (React Components)
- ✅ State management with useState
- ✅ Fetch API for HTTP requests
- ✅ Async/await for promises
- ✅ Try/catch for error handling
- ✅ Conditional rendering
- ✅ Event handlers

### Server-Side (API Routes)
- ✅ NextResponse for responses
- ✅ Environment variables
- ✅ External API calls
- ✅ Error handling
- ✅ JSON parsing

### Both
- ✅ TypeScript types
- ✅ Async/await
- ✅ Error handling
- ✅ Clean code practices

---

**Pro Tip:** Copy these snippets when building similar features! 🚀
