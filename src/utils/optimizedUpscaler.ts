import Upscaler from 'upscaler';
import x2 from '@upscalerjs/esrgan-slim/2x';
import x4 from '@upscalerjs/esrgan-slim/4x';
import * as tf from '@tensorflow/tfjs';

const MAX_DIMENSION = 512;

const resizeImage = (img: HTMLImageElement): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  let { width, height } = img;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
    width *= ratio;
    height *= ratio;
  }
  
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
};

export const upscaleWithWorker = async (imageData: string, scale: 2 | 4): Promise<string> => {
  const memStart = (performance as any).memory?.usedJSHeapSize || 0;
  console.log(`🔵 Memory Before: ${(memStart / 1024 / 1024).toFixed(2)} MB`);
  
  const img = new Image();
  img.src = imageData;
  await new Promise((resolve) => { img.onload = resolve; });
  
  const resized = resizeImage(img);
  img.src = '';
  
  const model = scale === 2 ? x2 : x4;
  const upscaler = new Upscaler({
    model,
    patchSize: 32,
    padding: 1
  });
  
  const memDuring = (performance as any).memory?.usedJSHeapSize || 0;
  console.log(`🟡 Memory During: ${(memDuring / 1024 / 1024).toFixed(2)} MB (+${((memDuring - memStart) / 1024 / 1024).toFixed(2)} MB)`);
  
  const result = await upscaler.upscale(resized);
  
  resized.width = 0;
  resized.height = 0;
  
  tf.disposeVariables();
  tf.engine().reset();
  
  const gpuMem = tf.memory();
  console.log(`🧹 GPU: ${(gpuMem.numBytes / 1024 / 1024).toFixed(2)} MB, Tensors: ${gpuMem.numTensors}`);
  
  const memAfter = (performance as any).memory?.usedJSHeapSize || 0;
  console.log(`🟢 Memory After: ${(memAfter / 1024 / 1024).toFixed(2)} MB (+${((memAfter - memStart) / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`📊 Peak Memory Used: ${((memAfter - memStart) / 1024 / 1024).toFixed(2)} MB`);
  
  return result;
};
