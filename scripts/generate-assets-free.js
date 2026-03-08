import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/promos");
const ICON_DIR = path.join(__dirname, "../public/icons/generated");

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(ICON_DIR)) fs.mkdirSync(ICON_DIR, { recursive: true });

async function downloadImage(prompt, width, height, filename) {
  // Pollinations.ai uses a simple URL structure
  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;
  
  console.log(`🎨 Requesting: ${filename} (${width}x${height})...`);
  
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 90000 
    });

    const writer = fs.createWriteStream(filename);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ Saved to ${filename}`);
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`❌ Failed to generate ${filename}:`, error.message);
  }
}

const assets = [
  {
    name: "main-icon",
    prompt: "A minimalist geometric cat head silhouette icon for a Chrome extension, dark gray and teal colors, professional developer tool style, flat design, white background",
    width: 1024,
    height: 1024,
    folder: ICON_DIR
  },
  {
    name: "promo-small",
    prompt: "440x280px promotional banner for 'Console Cat' browser extension, showing organized code logs and a tech cat mascot, dark blue theme, professional",
    width: 440,
    height: 280,
    folder: OUTPUT_DIR
  },
  {
    name: "promo-large",
    prompt: "920x680px feature showcase for 'Console Cat', split screen showing messy logs becoming clean logs, tech cat mascot, cyan and charcoal theme",
    width: 920,
    height: 680,
    folder: OUTPUT_DIR
  },
  {
    name: "promo-marquee",
    prompt: "1400x560px cinematic banner for 'Console Cat' developer tool, abstract data streams and geometric cat logo, vibrant teal accents on dark background",
    width: 1400,
    height: 560,
    folder: OUTPUT_DIR
  }
];

async function generate() {
  console.log("🚀 Starting FREE asset generation via Pollinations.ai...");
  
  for (const asset of assets) {
    const filePath = path.join(asset.folder, `${asset.name}.png`);
    await downloadImage(asset.prompt, asset.width, asset.height, filePath);
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\n✨ All free assets generated! Check public/promos and public/icons/generated");
}

generate();
