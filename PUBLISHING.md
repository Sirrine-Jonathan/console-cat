# Publishing Console Cat to Chrome Web Store

## Package Created
✅ **Console-Cat-1.0.0.zip** is ready in the `package/` directory

## Publishing Steps

### 1. Chrome Web Store Developer Account
- Go to: https://chrome.google.com/webstore/devconsole
- Sign in with your Google account
- **One-time fee**: $5 USD to register as a developer
- Click "Pay this fee now" if you haven't already

### 2. Upload Extension

1. Click **"New Item"** button
2. Click **"Choose file"** and select: `/Users/jsirrine/dev/user-workspace/tools/copy-console/package/Console-Cat-1.0.0.zip`
3. Click **"Upload"**

### 3. Fill Out Store Listing

#### Required Information:

**Product Details:**
- **Name**: Console Cat
- **Summary** (132 chars max):
  ```
  Copy console entries like a copycat. Select, filter, and copy browser console logs with deduplication and tag filtering.
  ```
- **Description**:
  ```
  Console Cat is a Chrome DevTools extension that makes it easy to copy console entries for debugging, documentation, or sharing with AI assistants.

  Features:
  • Select individual or multiple console entries with shift-click
  • Filter by log level (Error, Warning, Info, Log, Verbose)
  • Text search across all messages
  • Automatic tag detection and filtering (e.g., [ComponentName])
  • Smart deduplication - repeated messages are combined with count
  • Copy preview showing exactly what will be copied
  • Timestamps included in copied output
  • Works on all websites, including those with strict CSP

  Perfect for:
  • Debugging complex applications
  • Sharing logs with team members
  • Providing context to AI coding assistants
  • Documentation and bug reports

  The extension adds a "Console Cat" tab to Chrome DevTools where you can view, filter, and selectively copy console messages in a clean, LLM-friendly format.
  ```

**Category**: Developer Tools

**Language**: English (United States)

#### Privacy:

**Single Purpose Description**:
```
Console Cat allows developers to selectively copy browser console messages for debugging and documentation purposes.
```

**Permission Justification**:
- **clipboardWrite**: Required to copy selected console entries to the clipboard

**Privacy Policy**: (You need to host this somewhere or use the template below)

#### Screenshots (Required - at least 1, max 5):
You'll need to take screenshots showing:
1. The Console Cat panel with some log entries
2. The filter and tag features in action
3. The copy preview screen

**Screenshot specs**: 1280x800 or 640x400

#### Promotional Images (Optional but recommended):
- Small tile: 440x280
- Large tile: 920x680  
- Marquee: 1400x560

### 4. Privacy Policy (Required)

You need to host a privacy policy. Here's a simple template:

```markdown
# Console Cat Privacy Policy

Last updated: March 7, 2026

## Data Collection
Console Cat does not collect, store, or transmit any user data. All console messages are processed locally in your browser and are never sent to external servers.

## Permissions
- **clipboardWrite**: Used only to copy selected console entries to your clipboard when you click the "Copy Selected" button.

## Third-Party Services
Console Cat does not use any third-party services or analytics.

## Contact
For questions or concerns, contact: [your-email@example.com]
```

Host this on:
- GitHub Pages (free)
- Your personal website
- Or use a service like https://www.privacypolicies.com/

### 5. Distribution

**Visibility**: Public
**Pricing**: Free

### 6. Submit for Review

1. Click **"Submit for review"**
2. Review process typically takes **1-3 business days**
3. You'll receive an email when it's approved or if changes are needed

## After Publishing

### Update the Extension
When you make changes:
1. Update version in `package.json` (e.g., 1.0.0 → 1.0.1)
2. Run `npm run zip`
3. Upload new zip to Chrome Web Store
4. Submit for review

### Monitor
- Check the Developer Dashboard for reviews and ratings
- Respond to user feedback
- Monitor for any policy violations

## Quick Checklist

- [ ] Pay $5 developer registration fee
- [ ] Upload Console-Cat-1.0.0.zip
- [ ] Fill out store listing details
- [ ] Take 1-3 screenshots
- [ ] Create and host privacy policy
- [ ] Submit for review
- [ ] Wait for approval (1-3 days)

## Need Screenshots?

Run the extension and take screenshots of:
1. Main panel with various log types
2. Tag filtering in action
3. Copy preview screen

Use Cmd+Shift+4 on Mac to capture specific areas.
