// Background service worker for Paycom Punch Automator
chrome.runtime.onInstalled.addListener(() => {
    console.log('Paycom Punch Automator extension installed');
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Forward status updates from content script to popup
    if (message.action === 'updateStatus' || message.action === 'automationComplete') {
        // Broadcast to all tabs that might have the popup open
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, message).catch(() => {
                    // Ignore errors for tabs that don't have the content script
                });
            });
        });
    }
    
    sendResponse({ success: true });
    return true;
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup automatically due to manifest configuration
    console.log('Extension icon clicked');
});
