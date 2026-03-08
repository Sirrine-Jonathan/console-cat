import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
require('dotenv').config();

const manifest = require('../build/manifest.json');
const ZIP_PATH = path.join(process.cwd(), 'package', `${manifest.name.replaceAll(' ', '-')}-${manifest.version}.zip`);

async function upload() {
  console.log('🚀 Preparing to upload to Chrome Web Store...');

  const { EXTENSION_ID, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

  if (!EXTENSION_ID || !CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error('❌ Missing required environment variables in .env');
    process.exit(1);
  }

  if (!fs.existsSync(ZIP_PATH)) {
    console.error(`❌ Zip file not found at ${ZIP_PATH}. Run 'npm run zip' first.`);
    process.exit(1);
  }

  try {
    console.log('📦 Uploading...');
    const command = `npx chrome-webstore-upload-cli upload --source "${ZIP_PATH}" --extension-id ${EXTENSION_ID} --client-id ${CLIENT_ID} --client-secret ${CLIENT_SECRET} --refresh-token ${REFRESH_TOKEN}`;
    
    // Using inherit to see the progress
    execSync(command, { stdio: 'inherit' });
    
    console.log('✨ Upload complete! Go to the Chrome Web Store dashboard to submit for review.');
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

upload();
