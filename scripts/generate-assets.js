import { fal } from "@fal-ai/client";
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

async function downloadImage(url, filename) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  const writer = fs.createWriteStream(filename);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

const assets = [
  {
    name: "main-icon",
    prompt: "Create a 1024x1024px high-quality icon for a Chrome extension called 'Console Cat'. Design: A minimalist, geometric cat head silhouette incorporating a terminal cursor (>_). Modern flat design, primary blue/teal (#4A90E2) with dark gray (#2A2A2A). Transparent background. Professional developer tool aesthetic.",
    size: { width: 1024, height: 1024 },
    folder: ICON_DIR
  },
  {
    name: "promo-small",
    prompt: "440x280px promotional tile for Chrome extension 'Console Cat'. A sleek UI showing browser console logs being captured by a friendly tech-savvy cat silhouette. Text: 'Console Cat - Copy logs like a copycat'. Dark-themed UI with blue accents.",
    size: { width: 440, height: 280 },
    folder: OUTPUT_DIR
  },
  {
    name: "promo-large",
    prompt: "920x680px promotional image for 'Console Cat'. Split-screen: messy browser console on left, clean formatted logs on right. Center: Console Cat mascot. Highlight features: 'Smart Deduplication', 'Tag Filtering', 'LLM-Ready Output'. Professional dev tool style.",
    size: { width: 920, height: 680 },
    folder: OUTPUT_DIR
  },
  {
    name: "promo-marquee",
    prompt: "1400x560px marquee banner for 'Console Cat'. Abstract high-tech data streams being organized. Cinematic and minimalist. Console Cat logo prominent in center. Dark charcoal background with vibrant teal glows.",
    size: { width: 1400, height: 560 },
    folder: OUTPUT_DIR
  }
];

async function generate() {
  if (!process.env.FAL_KEY) {
    console.error("❌ FAL_KEY environment variable is not set.");
    process.exit(1);
  }

  console.log("🚀 Starting asset generation...");

  for (const asset of assets) {
    try {
      console.log(`🎨 Generating ${asset.name}...`);
      
      const result = await fal.subscribe("fal-ai/flux/dev", {
        input: {
          prompt: asset.prompt,
          image_size: {
            width: asset.size.width,
            height: asset.size.height
          }
        },
      });

      const imageUrl = result.images[0].url;
      const filePath = path.join(asset.folder, `${asset.name}.png`);
      
      await downloadImage(imageUrl, filePath);
      console.log(`✅ Saved to ${filePath}`);
    } catch (error) {
      console.error(`❌ Error generating ${asset.name}:`, error.message);
    }
  }

  console.log("\n✨ All generations complete! Check public/promos and public/icons/generated");
}

generate();
