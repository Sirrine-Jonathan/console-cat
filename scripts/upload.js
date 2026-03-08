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
    // We'll try to use the API directly or wrap the CLI in a way that catches the error details
    const command = `npx chrome-webstore-upload-cli upload --source "${ZIP_PATH}" --extension-id ${EXTENSION_ID} --client-id ${CLIENT_ID} --client-secret ${CLIENT_SECRET} --refresh-token ${REFRESH_TOKEN}`;
    
    try {
        execSync(command, { stdio: 'inherit' });
        console.log('✨ Upload complete! Go to the Chrome Web Store dashboard to submit for review.');
    } catch (cmdError) {
        // The CLI might not show the full error body, so we'll just report the failure
        // The "Forbidden" error is usually one of the things in the checklist below.
        console.error('❌ Upload failed with a 403 Forbidden error.');
        console.log('\n🔍 Please check the following:');
        console.log('1. Is the Chrome Web Store API enabled in your Google Cloud project?');
        console.log('2. Does the account that generated the REFRESH_TOKEN have permission to edit this extension?');
        console.log('3. Have you paid the $5 developer fee and accepted the latest terms in the dashboard?');
        console.log('4. Is the EXTENSION_ID exactly correct?');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Script error:', error.message);
    process.exit(1);
  }
}

upload();
