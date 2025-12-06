require('dotenv').config({ path: '.env.local' });
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Testing Cloudinary Configuration...\n');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'NOT SET');

// Test with a sample image URL
const testImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/240px-Cat03.jpg';

cloudinary.uploader.upload(testImageUrl, {
  transformation: [
    { effect: 'upscale' },
    { quality: 'auto:best' }
  ]
})
.then(result => {
  console.log('\n✅ SUCCESS! Cloudinary API is working!');
  console.log('Uploaded URL:', result.secure_url);
  console.log('Public ID:', result.public_id);
})
.catch(error => {
  console.error('\n❌ ERROR:', error.message);
  if (error.http_code === 401) {
    console.error('Authentication failed. Please regenerate your API secret.');
  }
});
