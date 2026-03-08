# Console Cat

A Chrome DevTools extension for copying console entries like a copycat.

## Features

- ✅ Select individual console entries with checkboxes
- ✅ Copy selected entries to clipboard
- ✅ Filter by type (Error, Warning, Info, Log, Verbose)
- ✅ Timestamps for each entry
- ✅ Works on sites with strict CSP (like ancestrystage.com)
- ✅ Clean, minimal UI

## Installation

### Development Mode (with hot reload)
```bash
npm run dev
```

Then:
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `build/` directory

### Production Build
```bash
npm run build
```

Load the `build/` directory as an unpacked extension.

## Usage

1. Open DevTools (F12 or Cmd+Option+I)
2. Look for the "Copy Console" tab
3. Console messages will appear automatically
4. Click entries to select them
5. Click "Copy Selected" to copy to clipboard
6. Use filters to show/hide message types

## Output Format

```
[ERROR] TypeError: Cannot read property 'foo' of undefined

[WARN] Deprecated API usage

[LOG] User action completed
```

## Tech Stack

- React 18 + TypeScript
- Vite + @crxjs/vite-plugin
- Chrome DevTools API
- Manifest V3

## Future Features

- Analytics sidebar with pie charts
- Session/domain-based statistics
- Export to file
- Search/filter by content
- Keyboard shortcuts
- Better cat mascot 🐱

## Development

Built with [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)

```bash
npm install
npm run dev      # Development with hot reload
npm run build    # Production build
npm run fmt      # Format code
npm run zip      # Create distributable zip
```

## License

MIT - Jonathan Sirrine
