# Installation Guide for Paycom Punch Automator

## Step-by-Step Installation

### 1. Prepare the Extension Files
- Ensure all files are in a single folder named `PaycomBot2`
- The folder should contain:
  - `manifest.json`
  - `popup.html`
  - `popup.css`
  - `popup.js`
  - `content.js`
  - `background.js`
  - `README.md`
  - Icon files (see ICONS_README.md)

### 2. Create Icon Files (Required)
Before installing, you need to create the icon files:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

See `ICONS_README.md` for detailed instructions on creating these icons.

### 3. Install in Chrome

1. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Type `chrome://extensions/` in the address bar
   - Press Enter

2. **Enable Developer Mode**
   - Look for the "Developer mode" toggle in the top-right corner
   - Click to enable it (toggle should be blue)

3. **Load the Extension**
   - Click the "Load unpacked" button
   - Navigate to your `PaycomBot2` folder
   - Select the folder and click "Select Folder"

4. **Verify Installation**
   - The extension should appear in your extensions list
   - You should see "Paycom Punch Automator" with version 1.0
   - The extension icon should appear in your Chrome toolbar

### 4. Test the Extension

1. **Open the Popup**
   - Click the extension icon in your toolbar
   - You should see the purple-blue interface with time inputs

2. **Navigate to Paycom**
   - Go to your Paycom login page
   - Log in to your account

3. **Set Your Times**
   - Click the extension icon
   - Edit the time inputs for each punch
   - Times will be saved automatically

4. **Test Automation**
   - Click "Run Punch Sequence"
   - Watch the status updates
   - Use "Stop" if needed

## Troubleshooting Installation

**Extension won't load?**
- Check that all files are present in the folder
- Ensure `manifest.json` is valid JSON
- Look for error messages in the extensions page

**Icon not showing?**
- Create the required icon files (see ICONS_README.md)
- Ensure icon files are named exactly: `icon16.png`, `icon48.png`, `icon128.png`

**Extension not working on Paycom?**
- Make sure you're on a Paycom website (URL contains paycom.com)
- Check that the extension is enabled
- Try refreshing the page

**Permission errors?**
- The extension needs permissions to work on Paycom sites
- Click "Details" on the extension to review permissions
- Ensure you're comfortable with the required permissions

## Uninstalling

To remove the extension:
1. Go to `chrome://extensions/`
2. Find "Paycom Punch Automator"
3. Click "Remove"
4. Confirm the removal

## Updating

To update the extension:
1. Replace the files in your `PaycomBot2` folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Paycom Punch Automator extension
4. The extension will reload with the new version
