# Troubleshooting Guide 🔧

Common issues and their solutions for Day 3 & 4 implementation.

---

## Installation Issues

### Issue: "Module not found: Can't resolve 'replicate'"

**Cause:** Package not installed

**Solution:**
```bash
npm install replicate
```

**Verify:**
```bash
npm list replicate
# Should show: replicate@x.x.x
```

---

### Issue: "Module not found: Can't resolve 'react-compare-slider'"

**Cause:** Package not installed

**Solution:**
```bash
npm install react-compare-slider
```

**Verify:**
```bash
npm list react-compare-slider
# Should show: react-compare-slider@x.x.x
```

---

## Environment Variable Issues

### Issue: "Failed to process" or "Unauthorized"

**Cause:** Missing or invalid API token

**Solution:**
1. Check if `.env.local` exists in project root
2. Verify token format: `REPLICATE_API_TOKEN=r8_...`
3. Get new token from [replicate.com/account](https://replicate.com/account)
4. Restart dev server: `npm run dev`

**Verify:**
```bash
# Check file exists
ls -la .env.local

# Check content (don't share this!)
cat .env.local
```

---

### Issue: Environment variable is undefined

**Cause:** Server not restarted after adding `.env.local`

**Solution:**
1. Stop the dev server (Ctrl+C)
2. Start again: `npm run dev`
3. Environment variables are loaded on server start

---

## API Route Issues

### Issue: 404 Not Found on /api/upscale

**Cause:** API route file not in correct location

**Solution:**
Verify file structure:
```
src/
└── app/
    └── api/
        └── upscale/
            └── route.ts  ← Must be here
```

**Create if missing:**
```bash
mkdir -p src/app/api/upscale
# Then create route.ts file
```

---

### Issue: "Cannot find module 'replicate'"

**Cause:** Import error in API route

**Solution:**
Check `src/app/api/upscale/route.ts` has:
```typescript
import Replicate from 'replicate';
```

Not:
```typescript
import { Replicate } from 'replicate'; // ❌ Wrong
```

---

## Processing Issues

### Issue: Processing takes forever (>5 minutes)

**Possible causes:**
1. Replicate API is slow/down
2. Network issues
3. Large image file

**Solutions:**
1. Check [Replicate status page](https://status.replicate.com/)
2. Check your internet connection
3. Try smaller image (<2MB)
4. Check Replicate dashboard for job status

---

### Issue: "Error: Request timeout"

**Cause:** Replicate API timeout

**Solution:**
1. Try again (sometimes servers are busy)
2. Use smaller image
3. Check Replicate account status
4. Verify you have credits remaining

---

## UI/Display Issues

### Issue: Comparison slider not showing

**Possible causes:**
1. Both images not loaded
2. Component not rendering
3. CSS issue

**Debug steps:**
```typescript
// Add console logs in page.tsx
console.log('Original:', originalImage);
console.log('Upscaled:', upscaledImage);
```

**Solution:**
- Verify both `originalImage` and `upscaledImage` are set
- Check browser console for errors
- Verify `react-compare-slider` is installed

---

### Issue: Images not displaying

**Cause:** Invalid image URLs or Base64

**Debug:**
```typescript
// Check if Base64 is valid
console.log(originalImage?.substring(0, 50));
// Should start with: "data:image/png;base64,..."

// Check if URL is valid
console.log(upscaledImage);
// Should be: "https://replicate.delivery/..."
```

**Solution:**
- Verify file upload worked
- Check network tab for failed requests
- Try different image file

---

## Download Issues

### Issue: Download button doesn't work

**Possible causes:**
1. CORS issue
2. Invalid URL
3. Browser blocking download

**Debug:**
```typescript
// Add console log in downloadImage()
console.log('Downloading:', imgUrl);
```

**Solutions:**
1. Check browser console for CORS errors
2. Verify image URL is accessible (open in new tab)
3. Try different browser
4. Check browser download settings

---

### Issue: Downloaded file is corrupted

**Cause:** Incomplete blob download

**Solution:**
```typescript
// Verify blob is valid
const blob = await response.blob();
console.log('Blob size:', blob.size);
console.log('Blob type:', blob.type);
```

---

## State Management Issues

### Issue: State not updating

**Cause:** Async state updates

**Debug:**
```typescript
// Use useEffect to log state changes
useEffect(() => {
  console.log('State updated:', { originalImage, upscaledImage });
}, [originalImage, upscaledImage]);
```

**Solution:**
- Ensure you're using `setState` correctly
- Check for typos in state variable names
- Verify async operations complete

---

### Issue: Reset button doesn't clear everything

**Cause:** Missing state reset

**Solution:**
Verify `handleReset()` clears all state:
```typescript
const handleReset = () => {
  setSelectedFile(null);
  setOriginalImage(null);
  setUpscaledImage(null);
  setError(null);
  setIsLoading(false);
};
```

---

## TypeScript Issues

### Issue: Type errors in components

**Cause:** Interface mismatch

**Solution:**
Verify `UploadArea` interface:
```typescript
interface UploadAreaProps {
  onImageSelect: (file: File, dataUrl: string) => void;
}
```

And parent component:
```typescript
const handleImageSelect = (file: File, dataUrl: string) => {
  // ...
};
```

---

## Build/Compilation Issues

### Issue: "Type error: Cannot find module"

**Cause:** Missing type definitions

**Solution:**
```bash
npm install --save-dev @types/node
```

---

### Issue: Next.js build fails

**Cause:** Various compilation errors

**Solution:**
1. Check for TypeScript errors: `npm run build`
2. Fix any type errors
3. Verify all imports are correct
4. Check for unused variables

---

## Performance Issues

### Issue: App is slow/laggy

**Possible causes:**
1. Large images
2. Memory leaks
3. Too many re-renders

**Solutions:**
1. Compress images before upload
2. Verify blob cleanup in download function
3. Use React DevTools to check re-renders
4. Add `useCallback` for event handlers

---

## Browser-Specific Issues

### Issue: Works in Chrome but not Safari

**Cause:** Browser compatibility

**Solution:**
1. Check browser console for errors
2. Verify all APIs are supported
3. Test with latest browser version
4. Add polyfills if needed

---

## Network Issues

### Issue: "Network request failed"

**Possible causes:**
1. No internet connection
2. Firewall blocking
3. VPN issues

**Solutions:**
1. Check internet connection
2. Disable VPN temporarily
3. Check firewall settings
4. Try different network

---

## Debugging Tools

### Browser DevTools
```
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Check Application tab for storage
```

### React DevTools
```
1. Install React DevTools extension
2. Check Components tab for state
3. Verify props are passed correctly
```

### Next.js Debug Mode
```bash
# Run with debug logging
NODE_OPTIONS='--inspect' npm run dev
```

---

## Common Error Messages

### "ENOENT: no such file or directory"
→ File path is wrong, check file structure

### "Cannot read property 'result' of null"
→ FileReader failed, check file validation

### "Failed to fetch"
→ Network error, check internet connection

### "Unexpected token < in JSON"
→ API returned HTML instead of JSON, check API route

### "Maximum update depth exceeded"
→ Infinite re-render, check useEffect dependencies

---

## Getting Help

### Before asking for help:
1. ✅ Check browser console for errors
2. ✅ Verify `.env.local` is configured
3. ✅ Restart dev server
4. ✅ Try different image file
5. ✅ Check this troubleshooting guide

### Information to provide:
- Error message (full text)
- Browser and version
- Steps to reproduce
- Console logs
- Network tab screenshot

---

## Quick Fixes Checklist

- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] Check `.env.local` exists and has token
- [ ] Verify all packages installed: `npm install`
- [ ] Check file structure matches documentation
- [ ] Try different image file
- [ ] Check browser console for errors
- [ ] Verify internet connection
- [ ] Check Replicate account has credits
- [ ] Try different browser

---

## Still Having Issues?

1. Review [DAY_3_4_IMPLEMENTATION.md](./DAY_3_4_IMPLEMENTATION.md)
2. Check [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
3. Review [CODE_SNIPPETS.md](./CODE_SNIPPETS.md)
4. Compare your code with the examples
5. Check Replicate documentation

---

## Prevention Tips

✅ Always restart server after changing `.env.local`
✅ Keep packages up to date
✅ Use TypeScript for type safety
✅ Add error boundaries
✅ Log important state changes
✅ Test with different image types
✅ Monitor Replicate usage/credits

---

**Most issues are solved by restarting the dev server! 🔄**
