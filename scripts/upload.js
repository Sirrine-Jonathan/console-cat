import { createRequire } from 'module';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

const require = createRequire(import.meta.url);
const manifest = require('../build/manifest.json');
const ZIP_PATH = path.join(process.cwd(), 'package', `${manifest.name.replaceAll(' ', '-')}-${manifest.version}.zip`);

async function upload() {
  console.log('🚀 Preparing to upload to Chrome Web Store...');

  const { EXTENSION_ID, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

  if (!EXTENSION_ID || !CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error('❌ Missing required environment variables. Ensure they are in .env or GitHub Secrets.');
    process.exit(1);
  }

  if (!fs.existsSync(ZIP_PATH)) {
    console.error(`❌ Zip file not found at ${ZIP_PATH}. Run 'npm run zip' first.`);
    process.exit(1);
  }

  try {
    console.log('📦 Uploading...');
    // In CI, we want to hide the secrets from the log, so we pass them via env variables directly to the CLI if it supports it, 
    // or we use the command and rely on the CI's secret masking.
    const command = `npx chrome-webstore-upload-cli upload --source "${ZIP_PATH}" --extension-id ${EXTENSION_ID} --client-id ${CLIENT_ID} --client-secret ${CLIENT_SECRET} --refresh-token ${REFRESH_TOKEN}`;
    
    execSync(command, { stdio: 'inherit' });
    
    console.log('✨ Upload complete! Go to the Chrome Web Store dashboard to submit for review.');
  } catch (error) {
    console.error('❌ Upload failed.');
    process.exit(1);
  }
}

upload();
