// Paycom Punch Automator Content Script
let isAutomationRunning = false;
let currentPunchIndex = 0;
let punchTimes = [];
let stopAutomation = false;

// Punch types in order
const punchTypes = [
    'IN DAY',
    'OUT BREAK', 
    'IN BREAK',
    'OUT LUNCH',
    'IN LUNCH',
    'OUT BREAK',
    'IN BREAK',
    'OUT DAY'
];

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startAutomation') {
        startAutomation(message.times);
        sendResponse({ success: true });
    } else if (message.action === 'stopAutomation') {
        stopAutomation = true;
        isAutomationRunning = false;
        sendResponse({ success: true });
    }
    return true;
});

async function startAutomation(times) {
    if (isAutomationRunning) return;
    
    isAutomationRunning = true;
    stopAutomation = false;
    currentPunchIndex = 0;
    punchTimes = times;
    
    updateStatus('Starting automation...', 'loading');
    
    try {
        // Since we're already on the Punch Change Requests page, start directly
        updateStatus('Already on Punch Change Requests page. Starting automation...', 'loading');
        
        // Process each punch
        for (let i = 0; i < punchTypes.length && !stopAutomation; i++) {
            currentPunchIndex = i;
            await processPunch(i);
            
            if (stopAutomation) break;
            
            // Wait between punches
            await sleep(2000);
        }
        
        if (!stopAutomation) {
            updateStatus('All punches completed successfully!', 'success');
        } else {
            updateStatus('Automation stopped by user', 'error');
        }
    } catch (error) {
        console.error('Automation error:', error);
        updateStatus('Error: ' + (error.message || 'Unknown error occurred'), 'error');
    }
    
    isAutomationRunning = false;
    chrome.runtime.sendMessage({
        action: 'automationComplete',
        status: stopAutomation ? 'Automation stopped' : 'Automation completed',
        type: stopAutomation ? 'error' : 'success'
    });
}

async function processPunch(punchIndex) {
    const punchType = punchTypes[punchIndex];
    const punchTime = punchTimes[punchIndex];
    
    updateStatus(`Processing ${punchType} at ${punchTime}...`, 'loading');
    
    try {
        // Step 1: Find and click "Add Request" button
        await findAndClickAddButton();
        
        // Step 2: Fill in the date
        await fillDate();
        
        // Step 3: Select punch type
        await selectPunchType(punchType);
        
        // Step 4: Fill in time
        await fillTime(punchTime);
        
        // Step 5: Select reason (Miscellaneous)
        await selectReason();
        
        // Step 6: Click Add Request to submit
        await clickSubmitButton();
        
        updateStatus(`Completed ${punchType} at ${punchTime}`, 'success');
        
    } catch (error) {
        console.error(`Error processing punch ${punchType}:`, error);
        updateStatus(`Error processing ${punchType}: ${error.message || 'Unknown error'}`, 'error');
        throw error;
    }
}

async function findAndClickAddButton() {
    updateStatus('Looking for Add Request button...', 'loading');
    
    // Try multiple ways to find the Add Request button
    const buttonSelectors = [
        'button',
        'input[type="button"]',
        'input[type="submit"]',
        'a',
        '.btn',
        '[class*="btn"]'
    ];
    
    for (let selector of buttonSelectors) {
        const elements = document.querySelectorAll(selector);
        for (let element of elements) {
            const text = element.textContent || element.value || '';
            if (text.toLowerCase().includes('add') || 
                text.toLowerCase().includes('new') || 
                text.toLowerCase().includes('create')) {
                console.log('Found potential button:', text);
                try {
                    await clickElement(element);
                    await sleep(1000);
                    return;
                } catch (e) {
                    console.log('Failed to click button:', e);
                }
            }
        }
    }
    
    throw new Error('Could not find Add Request button');
}

async function fillDate() {
    updateStatus('Filling date...', 'loading');
    
    // Look for date input fields
    const dateInputs = document.querySelectorAll('input[type="date"], input[name*="date"], input[name*="Date"]');
    
    for (let input of dateInputs) {
        if (!input.value) {
            const today = new Date().toISOString().split('T')[0];
            await setInputValue(input, today);
            return;
        }
    }
}

async function selectPunchType(punchType) {
    updateStatus(`Selecting punch type: ${punchType}`, 'loading');
    
    // Try dropdown first
    const selects = document.querySelectorAll('select');
    for (let select of selects) {
        for (let option of select.options) {
            if (option.text.includes(punchType) || option.value.includes(punchType)) {
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                await sleep(500);
                return;
            }
        }
    }
    
    // Try radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    for (let radio of radios) {
        if (radio.value.includes(punchType) || radio.name.includes('punch')) {
            await clickElement(radio);
            await sleep(500);
            return;
        }
    }
    
    // Try clicking on text elements
    const elements = document.querySelectorAll('*');
    for (let element of elements) {
        if (element.textContent && element.textContent.includes(punchType)) {
            try {
                await clickElement(element);
                await sleep(500);
                return;
            } catch (e) {
                // Continue to next element
            }
        }
    }
    
    throw new Error(`Could not find punch type selector for ${punchType}`);
}

async function fillTime(time) {
    updateStatus(`Filling time: ${time}`, 'loading');
    
    // Look for time input fields
    const timeInputs = document.querySelectorAll('input[type="time"], input[name*="time"], input[name*="Time"]');
    
    for (let input of timeInputs) {
        await setInputValue(input, time);
        await sleep(500);
        return;
    }
    
    throw new Error('Could not find time input field');
}

async function selectReason() {
    updateStatus('Selecting reason: Miscellaneous', 'loading');
    
    // Try dropdown first
    const selects = document.querySelectorAll('select');
    for (let select of selects) {
        for (let option of select.options) {
            if (option.text.includes('Miscellaneous') || option.value.includes('misc')) {
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                await sleep(500);
                return;
            }
        }
    }
    
    // Try radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    for (let radio of radios) {
        if (radio.value.includes('Miscellaneous') || radio.value.includes('misc')) {
            await clickElement(radio);
            await sleep(500);
            return;
        }
    }
    
    // Try clicking on text elements
    const elements = document.querySelectorAll('*');
    for (let element of elements) {
        if (element.textContent && element.textContent.includes('Miscellaneous')) {
            try {
                await clickElement(element);
                await sleep(500);
                return;
            } catch (e) {
                // Continue to next element
            }
        }
    }
}

async function clickSubmitButton() {
    updateStatus('Submitting request...', 'loading');
    
    // Try multiple ways to find the submit button
    const buttonSelectors = [
        'button',
        'input[type="submit"]',
        'input[type="button"]',
        'a',
        '.btn',
        '[class*="btn"]'
    ];
    
    for (let selector of buttonSelectors) {
        const elements = document.querySelectorAll(selector);
        for (let element of elements) {
            const text = element.textContent || element.value || '';
            if (text.toLowerCase().includes('submit') || 
                text.toLowerCase().includes('save') || 
                text.toLowerCase().includes('add request')) {
                console.log('Found submit button:', text);
                try {
                    await clickElement(element);
                    await sleep(2000);
                    return;
                } catch (e) {
                    console.log('Failed to click submit button:', e);
                }
            }
        }
    }
    
    throw new Error('Could not find submit button');
}

// Utility functions
async function clickElement(element) {
    if (!element) return;
    
    try {
        element.click();
    } catch (e) {
        try {
            element.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            }));
        } catch (e2) {
            console.error('Failed to click element:', e2);
            throw new Error('Could not click element');
        }
    }
}

async function setInputValue(input, value) {
    if (!input) return;
    
    try {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (e) {
        console.error('Failed to set input value:', e);
        throw new Error('Could not set input value');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateStatus(message, type) {
    try {
        chrome.runtime.sendMessage({
            action: 'updateStatus',
            status: message,
            type: type
        });
    } catch (e) {
        console.log('Status update failed:', e);
    }
}