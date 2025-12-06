# AI Model Options for Upscaling 🤖

This document lists alternative AI models you can use for image upscaling.

---

## Current Model (Updated)

### Real-ESRGAN (nightmareai)
```typescript
'nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa'
```

**Features:**
- 4x upscaling
- General purpose
- Good for photos and graphics

**Input parameters:**
```typescript
{
  image: string,        // Base64 or URL
  scale: 4,            // 2 or 4
  face_enhance: false  // true/false
}
```

---

## Alternative Models

### 1. Clarity Upscaler (philz1337x)
```typescript
'philz1337x/clarity-upscaler:dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e'
```

**Best for:** Modern photos, portraits
**Scale:** 2x
**Speed:** Fast

**Usage:**
```typescript
const output = await replicate.run(
  'philz1337x/clarity-upscaler:dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e',
  {
    input: {
      image: image,
      scale: 2
    }
  }
);
```

---

### 2. ESRGAN (xinntao)
```typescript
'xinntao/realesrgan:42fed1c311e539d50910ce796303eb980a05e60f90e51937f5412e68337e2543'
```

**Best for:** Anime, illustrations
**Scale:** 4x
**Speed:** Medium

**Usage:**
```typescript
const output = await replicate.run(
  'xinntao/realesrgan:42fed1c311e539d50910ce796303eb980a05e60f90e51937f5412e68337e2543',
  {
    input: {
      image: image,
      scale: 4
    }
  }
);
```

---

### 3. Stable Diffusion Upscaler
```typescript
'stability-ai/stable-diffusion-x4-upscaler:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3'
```

**Best for:** Creative upscaling with AI enhancement
**Scale:** 4x
**Speed:** Slower but higher quality

**Usage:**
```typescript
const output = await replicate.run(
  'stability-ai/stable-diffusion-x4-upscaler:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3',
  {
    input: {
      image: image,
      noise_level: 20  // 0-100, higher = more creative
    }
  }
);
```

---

## How to Change Models

### Step 1: Update the API Route

Edit `src/app/api/upscale/route.ts`:

```typescript
const output = await replicate.run(
  'MODEL_OWNER/MODEL_NAME:VERSION_HASH',  // Change this line
  {
    input: {
      image: image,
      // ... model-specific parameters
    }
  }
);
```

### Step 2: Test the Model

1. Save the file
2. Restart dev server: `npm run dev`
3. Upload an image and test

---

## Finding New Models

### Method 1: Browse Replicate
1. Visit [replicate.com/explore](https://replicate.com/explore)
2. Search for "upscale" or "super resolution"
3. Click on a model
4. Copy the model identifier from the URL or API tab

### Method 2: Use Replicate API
```bash
curl https://api.replicate.com/v1/models/nightmareai/real-esrgan \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN"
```

---

## Model Comparison

| Model | Speed | Quality | Best For | Scale |
|-------|-------|---------|----------|-------|
| Real-ESRGAN | Fast | Good | General | 4x |
| Clarity Upscaler | Very Fast | Good | Photos | 2x |
| ESRGAN | Medium | Great | Anime | 4x |
| SD Upscaler | Slow | Excellent | Creative | 4x |

---

## Troubleshooting Model Errors

### Error: "Invalid version or not permitted"

**Causes:**
1. Model version is outdated
2. Model is private/requires permission
3. Model has been removed

**Solutions:**

#### Option 1: Get Latest Version
```bash
# Visit the model page on Replicate
https://replicate.com/nightmareai/real-esrgan

# Look for "Latest version" in the API tab
# Copy the full version hash
```

#### Option 2: Use Model Without Version
```typescript
// Instead of specific version:
'nightmareai/real-esrgan:f121d640...'

// Use latest version automatically:
'nightmareai/real-esrgan'
```

#### Option 3: Try Different Model
Use one of the alternative models listed above.

---

## Current Working Configuration

As of the fix, this configuration works:

```typescript
// src/app/api/upscale/route.ts
const output = await replicate.run(
  'nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa',
  {
    input: {
      image: image,
      scale: 4,
      face_enhance: false
    }
  }
);
```

---

## Testing Different Models

### Quick Test Script

Create a test file to try different models:

```typescript
// test-models.ts
const models = [
  'nightmareai/real-esrgan',
  'philz1337x/clarity-upscaler',
  'xinntao/realesrgan'
];

for (const model of models) {
  try {
    console.log(`Testing ${model}...`);
    const output = await replicate.run(model, {
      input: { image: testImage, scale: 4 }
    });
    console.log(`✅ ${model} works!`);
  } catch (error) {
    console.log(`❌ ${model} failed:`, error.message);
  }
}
```

---

## Model Parameters Reference

### Real-ESRGAN
```typescript
{
  image: string,           // Required
  scale: 2 | 4,           // Default: 4
  face_enhance: boolean   // Default: false
}
```

### Clarity Upscaler
```typescript
{
  image: string,          // Required
  scale: 2,              // Fixed at 2x
  dynamic: number        // 0-100, default: 6
}
```

### Stable Diffusion Upscaler
```typescript
{
  image: string,          // Required
  prompt: string,         // Optional enhancement prompt
  noise_level: number    // 0-100, default: 20
}
```

---

## Cost Comparison

| Model | Cost per Image | Speed | Quality |
|-------|---------------|-------|---------|
| Real-ESRGAN | ~$0.005 | Fast | Good |
| Clarity | ~$0.003 | Very Fast | Good |
| ESRGAN | ~$0.005 | Medium | Great |
| SD Upscaler | ~$0.02 | Slow | Excellent |

---

## Recommended Setup

### For Production (Best Balance)
```typescript
'nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa'
```
- Good quality
- Fast processing
- Low cost
- Reliable

### For Best Quality (Slower)
```typescript
'stability-ai/stable-diffusion-x4-upscaler:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3'
```
- Excellent quality
- Creative enhancement
- Higher cost
- Slower processing

### For Speed (Fastest)
```typescript
'philz1337x/clarity-upscaler:dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e'
```
- Very fast
- Good quality
- 2x only
- Low cost

---

## Need Help?

1. Check [Replicate Model Explorer](https://replicate.com/explore)
2. Read model documentation on Replicate
3. Test models with small images first
4. Monitor costs in Replicate dashboard

---

**The model has been updated and should work now! 🚀**

Try uploading an image again to test the new configuration.
