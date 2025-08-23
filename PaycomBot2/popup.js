document.addEventListener('DOMContentLoaded', function() {
    const runButton = document.getElementById('runButton');
    const stopButton = document.getElementById('stopButton');
    const statusText = document.getElementById('statusText');
    
    let isRunning = false;

    // Load saved times from storage
    loadSavedTimes();

    // Save times when user changes them
    document.querySelectorAll('.time-input').forEach(input => {
        input.addEventListener('change', function() {
            saveTimes();
        });
    });

    runButton.addEventListener('click', async function() {
        if (isRunning) return;
        
        const times = getTimes();
        if (!validateTimes(times)) {
            updateStatus('Please enter valid times for all punches', 'error');
            return;
        }

        isRunning = true;
        runButton.disabled = true;
        stopButton.disabled = false;
        updateStatus('Starting automation...', 'loading');

        try {
            // Get the active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Check for various Paycom domains
            if (!tab.url.includes('paycom.com') && !tab.url.includes('paycomonline.net')) {
                updateStatus('Please navigate to a Paycom website first', 'error');
                isRunning = false;
                runButton.disabled = false;
                stopButton.disabled = true;
                return;
            }

            // Send message to content script to start automation
            const response = await chrome.tabs.sendMessage(tab.id, {
                action: 'startAutomation',
                times: times
            });

            if (response && response.success) {
                updateStatus('Automation started successfully', 'success');
            } else {
                updateStatus('Failed to start automation', 'error');
                isRunning = false;
                runButton.disabled = false;
                stopButton.disabled = true;
            }
        } catch (error) {
            console.error('Error starting automation:', error);
            if (error.message.includes('Receiving end does not exist')) {
                updateStatus('Please refresh the page and try again. The extension needs to reload.', 'error');
            } else {
                updateStatus('Error: ' + error.message, 'error');
            }
            isRunning = false;
            runButton.disabled = false;
            stopButton.disabled = true;
        }
    });

    stopButton.addEventListener('click', async function() {
        if (!isRunning) return;
        
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.tabs.sendMessage(tab.id, { action: 'stopAutomation' });
            
            isRunning = false;
            runButton.disabled = false;
            stopButton.disabled = true;
            updateStatus('Automation stopped', 'success');
        } catch (error) {
            console.error('Error stopping automation:', error);
            updateStatus('Error stopping automation', 'error');
            isRunning = false;
            runButton.disabled = false;
            stopButton.disabled = true;
        }
    });

    function getTimes() {
        const times = [];
        for (let i = 1; i <= 8; i++) {
            const input = document.getElementById(`punch${i}`);
            times.push(input.value);
        }
        return times;
    }

    function validateTimes(times) {
        return times.every(time => time && time.trim() !== '');
    }

    function updateStatus(message, type = '') {
        statusText.textContent = message;
        statusText.className = type;
    }

    function saveTimes() {
        const times = {};
        for (let i = 1; i <= 8; i++) {
            const input = document.getElementById(`punch${i}`);
            times[`punch${i}`] = input.value;
        }
        chrome.storage.local.set({ savedTimes: times });
    }

    function loadSavedTimes() {
        chrome.storage.local.get(['savedTimes'], function(result) {
            if (result.savedTimes) {
                for (let i = 1; i <= 8; i++) {
                    const input = document.getElementById(`punch${i}`);
                    if (result.savedTimes[`punch${i}`]) {
                        input.value = result.savedTimes[`punch${i}`];
                    }
                }
            }
        });
    }

    // Listen for status updates from content script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'updateStatus') {
            updateStatus(message.status, message.type);
        } else if (message.action === 'automationComplete') {
            isRunning = false;
            runButton.disabled = false;
            stopButton.disabled = true;
            updateStatus(message.status, message.type);
        }
    });
});
