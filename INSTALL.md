# Installation Instructions

## Quick Start

1. **Load the Extension**
   - Open Chrome
   - Go to `chrome://extensions/`
   - Toggle "Developer mode" ON (top right)
   - Click "Load unpacked"
   - Select: `/Users/jsirrine/dev/user-workspace/tools/copy-console/build`

2. **Test It**
   - Go to https://www.ancestrystage.com (or any site)
   - Open DevTools (F12 or Cmd+Option+I)
   - Look for "Copy Console" tab
   - Run some console commands:
     ```javascript
     console.log('Test log');
     console.error('Test error');
     console.warn('Test warning');
     ```
   - Switch to "Copy Console" tab
   - Click entries to select them
   - Click "Copy Selected"

## Development Mode (Hot Reload)

For active development with hot reload:

```bash
cd /Users/jsirrine/dev/user-workspace/tools/copy-console
npm run dev
```

Then load the `build/` directory as an unpacked extension. Changes will reload automatically.

## Troubleshooting

- **Tab not showing?** Check the >> overflow menu in DevTools
- **No messages?** Make sure you're on the Copy Console tab when console messages fire
- **Build errors?** Run `npm install` first

## Next Steps

Once working, we can add:
- Better cat mascot icon
- Analytics sidebar
- Keyboard shortcuts
- Export functionality
