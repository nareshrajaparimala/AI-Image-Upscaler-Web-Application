# Setup Checklist ✅

## Pre-Flight Checklist

Use this checklist to ensure everything is configured correctly before testing.

---

## 1. Dependencies Installation

- [x] `replicate` package installed
- [x] `react-compare-slider` package installed
- [ ] Run `npm install` to ensure all packages are installed

```bash
npm install
```

---

## 2. Environment Configuration

- [ ] Created `.env.local` file in project root
- [ ] Obtained API token from [replicate.com/account](https://replicate.com/account)
- [ ] Added token to `.env.local`:
  ```
  REPLICATE_API_TOKEN=r8_your_actual_token_here
  ```
- [ ] Verified `.env.local` is in `.gitignore` (already done)

**Test:** Check if file exists
```bash
ls -la .env.local
```

---

## 3. File Structure Verification

- [x] `src/app/api/upscale/route.ts` created
- [x] `src/app/page.tsx` updated
- [x] `src/components/UploadArea.tsx` updated

**Test:** Verify files exist
```bash
ls -la src/app/api/upscale/route.ts
```

---

## 4. Code Verification

### API Route (`src/app/api/upscale/route.ts`)
- [x] Imports Replicate SDK
- [x] Initializes with environment variable
- [x] Exports POST function
- [x] Handles errors with try/catch
- [x] Returns JSON response

### Main Page (`src/app/page.tsx`)
- [x] Imports comparison slider
- [x] State management for images
- [x] `handleUpscale()` function
- [x] `downloadImage()` function
- [x] `handleReset()` function
- [x] Loading and error states
- [x] Comparison slider component

### Upload Component (`src/components/UploadArea.tsx`)
- [x] Updated interface to pass dataUrl
- [x] Passes Base64 string to parent

---

## 5. Start Development Server

- [ ] Server started successfully
- [ ] No compilation errors
- [ ] Accessible at http://localhost:3000

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.0.7
- Local:        http://localhost:3000
✓ Ready in 2.3s
```

---

## 6. Functional Testing

### Upload Test
- [ ] Can drag and drop image
- [ ] Can click to select image
- [ ] Preview displays correctly
- [ ] File validation works (try invalid file)
- [ ] Size validation works (try >5MB file)

### Upscale Test
- [ ] "Upscale 4x with AI" button appears
- [ ] Button triggers loading state
- [ ] Loading spinner displays
- [ ] Processing takes 30-60 seconds
- [ ] No console errors during processing

### Comparison Test
- [ ] Comparison slider appears after processing
- [ ] Can drag slider left/right
- [ ] Original image on left
- [ ] Upscaled image on right
- [ ] Images are clearly different quality

### Download Test
- [ ] "Download 4x Image" button appears
- [ ] Click triggers download
- [ ] File saves as `upscaled-image-4x.png`
- [ ] Downloaded file opens correctly
- [ ] Resolution is 4x original

### Reset Test
- [ ] "Upload New Image" button appears
- [ ] Click clears all state
- [ ] Returns to upload screen
- [ ] Can upload new image

---

## 7. Error Handling Tests

### Invalid API Token
- [ ] Shows error message
- [ ] Doesn't crash app
- [ ] Can retry after fixing

**Test:** Temporarily use wrong token in `.env.local`

### Network Error
- [ ] Shows error message
- [ ] Loading state stops
- [ ] Can retry

**Test:** Disconnect internet during processing

### Invalid File
- [ ] Shows validation error
- [ ] Prevents upload
- [ ] Clear error message

**Test:** Try uploading a .txt file

---

## 8. Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS)

---

## 9. Performance Checks

- [ ] Upload is instant (<1s)
- [ ] Preview loads quickly
- [ ] Processing takes 30-60s (expected)
- [ ] Comparison slider is smooth
- [ ] Download is instant
- [ ] No memory leaks (check DevTools)

---

## 10. Security Verification

- [ ] `.env.local` not committed to Git
- [ ] API token not visible in browser DevTools
- [ ] API token not in client-side code
- [ ] Network tab shows `/api/upscale` (not direct Replicate URL)

**Test:** Open DevTools → Network → Check request headers

---

## 11. Documentation Review

- [x] `DAY_3_4_IMPLEMENTATION.md` - Detailed guide
- [x] `QUICK_START.md` - Fast setup
- [x] `IMPLEMENTATION_SUMMARY.md` - Overview
- [x] `API_FLOW_DIAGRAM.md` - Visual flow
- [x] `SETUP_CHECKLIST.md` - This file

---

## 12. Common Issues Checklist

### Issue: "Module not found: Can't resolve 'replicate'"
**Solution:**
```bash
npm install replicate
```

### Issue: "Failed to process" error
**Solution:**
- Check API token in `.env.local`
- Restart dev server: `npm run dev`
- Verify token at replicate.com/account

### Issue: Comparison slider not showing
**Solution:**
- Check browser console for errors
- Verify both images are loaded
- Check React DevTools state

### Issue: Download not working
**Solution:**
- Check browser console
- Verify image URL is accessible
- Try different browser

### Issue: Very slow processing
**Solution:**
- This is normal! AI takes 30-60 seconds
- Check Replicate dashboard for status
- Verify internet connection

---

## 13. Production Readiness

Before deploying:
- [ ] Environment variables set on hosting platform
- [ ] API token secured (not in code)
- [ ] Error boundaries implemented
- [ ] Loading states working
- [ ] Mobile responsive (test on phone)
- [ ] SEO meta tags added
- [ ] Analytics configured (optional)

---

## 14. Cost Monitoring

- [ ] Replicate account has credits
- [ ] Understand pricing: ~$0.005 per image
- [ ] Set up billing alerts (optional)
- [ ] Monitor usage in Replicate dashboard

**Free tier:** $5 credit = ~1000 upscales

---

## 15. Final Verification

Run through complete user flow:

1. [ ] Open http://localhost:3000
2. [ ] Upload a low-res image (e.g., 500x500px)
3. [ ] Click "Upscale 4x with AI"
4. [ ] Wait for processing (30-60s)
5. [ ] Drag comparison slider
6. [ ] Verify quality improvement
7. [ ] Download enhanced image
8. [ ] Check downloaded file (should be 2000x2000px)
9. [ ] Click "Upload New Image"
10. [ ] Verify reset works

---

## Success Criteria

✅ All checkboxes above are checked
✅ No console errors
✅ Images upscale correctly
✅ Download works
✅ Reset works
✅ Error handling works

---

## Need Help?

1. Check browser console for errors
2. Review `DAY_3_4_IMPLEMENTATION.md`
3. Check Replicate dashboard for API status
4. Verify `.env.local` configuration
5. Restart dev server

---

## Next Steps After Verification

Once everything works:
1. Test with different image types (portraits, landscapes, screenshots)
2. Test with different sizes (small, medium, large)
3. Experiment with the comparison slider
4. Share with friends for feedback
5. Consider adding enhancements (see IMPLEMENTATION_SUMMARY.md)

---

**Status:** Ready to test! 🚀

*Last updated: Day 3 & 4 Implementation*
