import Upscaler from 'upscaler';
import x2 from '@upscalerjs/esrgan-slim/2x';
import x4 from '@upscalerjs/esrgan-slim/4x';

self.onmessage = async (e: MessageEvent) => {
  const { imageData, scale } = e.data;
  
  try {
    const model = scale === 2 ? x2 : x4;
    const upscaler = new Upscaler({ model });
    
    const result = await upscaler.upscale(imageData);
    self.postMessage({ success: true, result });
  } catch (error) {
    self.postMessage({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Upscaling failed' 
    });
  }
};
