# Paycom Punch Automator Chrome Extension

A Chrome extension that automates time punch sequences on the Paycom website.

## Features

- **User-friendly Interface**: Clean, modern UI with editable time inputs
- **8-Punch Sequence**: Automates the complete daily punch sequence:
  1. IN DAY
  2. OUT BREAK
  3. IN BREAK
  4. OUT LUNCH
  5. IN LUNCH
  6. OUT BREAK
  7. IN BREAK
  8. OUT DAY
- **Customizable Times**: Users can set their own punch times
- **Real-time Status**: Live updates on automation progress
- **Stop Functionality**: Ability to stop automation at any time
- **Time Persistence**: Saves user's time preferences

## Installation

1. **Download the Extension Files**
   - Download all files from this repository
   - Keep them in a single folder

2. **Load Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the folder containing the extension files

3. **Verify Installation**
   - The extension icon should appear in your Chrome toolbar
   - Click the icon to open the popup interface

## Usage

1. **Navigate to Paycom Website**
   - Go to your Paycom login page
   - Log in to your account

2. **Set Your Punch Times**
   - Click the extension icon to open the popup
   - Edit the time inputs for each punch type
   - Times are automatically saved for future use

3. **Start Automation**
   - Click "Run Punch Sequence" to begin
   - The extension will automatically:
     - Navigate to Time Management → Punch Change Requests
     - Fill in each punch with your specified times
     - Select "Miscellaneous" as the reason
     - Submit each request

4. **Monitor Progress**
   - Watch the status bar for real-time updates
   - Use the "Stop" button if needed

## How It Works

The extension automates the following process for each punch:

1. **Date Field**: Automatically fills with today's date
2. **Punch Type**: Selects the appropriate punch type (IN DAY, OUT BREAK, etc.)
3. **Time**: Enters the user-specified time
4. **Reason**: Selects "Miscellaneous" from the dropdown
5. **Submit**: Clicks "Add Request" to submit the punch

## File Structure

```
PaycomBot2/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── content.js            # Website automation logic
├── background.js         # Background service worker
├── icon16.png           # Extension icon (16x16)
├── icon48.png           # Extension icon (48x48)
├── icon128.png          # Extension icon (128x128)
└── README.md            # This file
```

## Permissions

The extension requires the following permissions:
- `activeTab`: To interact with the current Paycom tab
- `scripting`: To inject automation scripts
- `storage`: To save user time preferences
- `https://*.paycom.com/*`: To access Paycom websites

## Troubleshooting

**Extension not working?**
- Ensure you're on a Paycom website
- Check that the extension is enabled in Chrome
- Try refreshing the page and running again

**Can't find elements?**
- Paycom may have updated their interface
- Check the browser console for error messages
- The extension uses multiple selector strategies to find elements

**Automation stops unexpectedly?**
- Network issues may cause timeouts
- Use the "Stop" button and try again
- Check your internet connection

## Security Notes

- This extension only works on Paycom websites
- No data is sent to external servers
- All time preferences are stored locally in your browser
- The extension only automates actions you would normally do manually

## Disclaimer

This extension is for educational and personal use only. Users are responsible for ensuring compliance with their employer's policies regarding time tracking and automation tools.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure you're using the latest version of Chrome
