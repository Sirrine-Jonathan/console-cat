import axios from 'axios';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

async function getAccessToken() {
    console.log('🔑 Refreshing access token...');
    const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
    
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            grant_type: 'refresh_token'
        });
        return response.data.access_token;
    } catch (error) {
        console.error('❌ Error refreshing token:', error.response?.data || error.message);
        process.exit(1);
    }
}

async function updateListing() {
    const { EXTENSION_ID } = process.env;
    const metadataPath = path.join(process.cwd(), 'store-listing/metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    console.log('🚀 Updating store listing metadata for:', EXTENSION_ID);
    
    const accessToken = await getAccessToken();

    try {
        const response = await axios.put(
            `https://www.googleapis.com/chromewebstore/v1.1/items/${EXTENSION_ID}`,
            metadata,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'x-goog-api-version': '2'
                },
                validateStatus: (status) => (status >= 200 && status < 300) || status === 304
            }
        );

        if (response.status === 304) {
            console.log('✅ Store listing is already up to date (304 Not Modified).');
        } else {
            console.log('✅ Store listing metadata updated successfully!');
        }
        
    } catch (error) {
        console.error('❌ Request failed:', error.response?.data || error.message);
        process.exit(1);
    }
}

updateListing();
