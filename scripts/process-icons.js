import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_ICON = path.join(__dirname, '../public/icons/generated/main-icon.png');
const TARGET_DIR = path.join(__dirname, '../public/img');

const SIZES = [16, 32, 48, 128];

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function processIcons() {
    console.log('🖼️ Processing icons...');
    
    if (!fs.existsSync(SOURCE_ICON)) {
        console.error(`❌ Source icon not found at ${SOURCE_ICON}`);
        process.exit(1);
    }

    for (const size of SIZES) {
        try {
            await sharp(SOURCE_ICON)
                .resize(size, size)
                .toFile(path.join(TARGET_DIR, `logo-${size}.png`));
            console.log(`✅ Generated ${size}x${size} icon`);
        } catch (error) {
            console.error(`❌ Error generating ${size}x${size} icon:`, error.message);
        }
    }
    
    console.log('✨ Icon processing complete!');
}

processIcons();
