# Console Cat - Image Generation Prompts

## Strategy
Generate the 128x128 base icon first, then scale down for smaller sizes.

---

## Prompt 1: Base Icon (128x128)

```
Create a 128x128px icon for a Chrome browser extension called "Console Cat".

Design requirements:
- A minimalist, geometric cat head silhouette
- Incorporate console/terminal elements (like square brackets [] or a terminal cursor >_)
- Modern, flat design style
- Use a tech-forward color palette: primary blue/teal (#4A90E2) with dark gray (#2A2A2A)
- Transparent background (PNG)
- Must remain recognizable when scaled down to 16x16 pixels
- Professional and clean aesthetic
- The cat should look friendly but tech-savvy

Style inspiration: Modern developer tools, VS Code icons, GitHub icons
The icon should convey: copying, console/terminal, developer tool

Output: 128x128px PNG with transparency
```

---

## Prompt 2: Verify Small Size (16x16)

After generating the 128x128 version, use this prompt to test/generate the 16x16:

```
Take the Console Cat icon design and create a 16x16px version optimized for small display.

Requirements:
- Simplify details that don't scale well
- Maintain the same color palette and overall shape
- Ensure the icon is still recognizable as a cat
- Keep high contrast for visibility
- Transparent background (PNG)
- Must be crisp and clear at this tiny size

This will be used as a browser toolbar icon, so clarity at small size is critical.

Output: 16x16px PNG with transparency
```

---

## Prompt 3: Medium Sizes (32x32 and 48x48)

```
Create 32x32px and 48x48px versions of the Console Cat icon.

Use the same design as the 128x128 base icon but optimized for these medium sizes:
- Maintain all design elements from the base icon
- Ensure crisp edges and clear details
- Same color palette: blue/teal (#4A90E2) and dark gray (#2A2A2A)
- Transparent background (PNG)
- Should look identical to the base icon, just scaled appropriately

Output: Two files - 32x32px and 48x48px PNGs with transparency
```

---

## Alternative: Single Comprehensive Prompt

If the image model can generate multiple sizes at once:

```
Create a complete icon set for a Chrome extension called "Console Cat" in 4 sizes: 16x16, 32x32, 48x48, and 128x128 pixels.

Design concept:
- Minimalist, geometric cat head silhouette
- Incorporate console/terminal elements (square brackets [] or terminal cursor >_)
- Modern flat design style
- Color palette: primary blue/teal (#4A90E2), dark gray (#2A2A2A)
- Transparent background on all sizes
- Professional, developer-tool aesthetic

Critical requirements:
- The 16x16 version must be simplified and highly recognizable
- All sizes should maintain consistent branding
- The icon should convey: copying, console/terminal, developer tool
- Must work on both light and dark backgrounds

Style inspiration: VS Code, GitHub, modern developer tools

Output: 4 PNG files with transparency (16x16, 32x32, 48x48, 128x128)
```

---

## Design Variations to Try

If the first attempt doesn't work well, try these variations:

### Variation A: Cat + Brackets
```
A simple cat face silhouette enclosed in square brackets [🐱] style, minimalist geometric design, blue/teal and dark gray colors, transparent background, 128x128px
```

### Variation B: Cat + Terminal Cursor
```
A geometric cat head with a terminal cursor (>_) integrated into the design, modern flat style, tech blue and dark gray, transparent background, 128x128px
```

### Variation C: Abstract Cat Console
```
An abstract geometric representation of a cat merged with console window elements, minimalist, professional developer tool aesthetic, blue/teal accent color, transparent background, 128x128px
```

---

## Post-Generation Checklist

After generating icons:
1. ✅ Check 16x16 is recognizable
2. ✅ Verify transparency works on light and dark backgrounds
3. ✅ Ensure consistent branding across all sizes
4. ✅ Test in Chrome toolbar (16x16)
5. ✅ Test in chrome://extensions/ page (48x48, 128x128)
