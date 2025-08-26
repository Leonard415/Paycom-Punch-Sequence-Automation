# Icon Files Required

The Chrome extension requires the following icon files:

- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels) 
- `icon128.png` (128x128 pixels)

## Creating Icons

You can create simple icons using any image editor or online tool:

1. **Option 1: Use an online icon generator**
   - Visit a site like favicon.io or similar
   - Create a simple icon with a target/bullseye design
   - Download in the required sizes

2. **Option 2: Use a simple emoji as icon**
   - Create a 128x128 image with a white background
   - Add a target/bullseye emoji (🎯) or clock emoji (⏰)
   - Save as PNG format
   - Resize to create the other sizes

3. **Option 3: Use placeholder icons**
   - Create simple colored squares or circles
   - Use the extension's purple-blue gradient colors
   - Save in the three required sizes

## Quick Solution

If you want to test the extension immediately, you can:
1. Create a simple 128x128 PNG file with any design
2. Copy it and rename to create the three required files
3. The extension will work even with placeholder icons

## Icon Design Suggestion

For a professional look, consider:
- Target/bullseye symbol (matches the automation theme)
- Clock or time symbol
- Purple-blue gradient background (matching the UI)
- White or light colored symbol
- Clean, simple design that works at small sizes

<!DOCTYPE html>
<html>
<head>
    <title>Quick Icon Generator</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f0f0f0; }
        .icon { 
            width: 128px; height: 128px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            border-radius: 8px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-size: 48px; 
            margin: 10px; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .icon-48 { width: 48px; height: 48px; font-size: 20px; }
        .icon-16 { width: 16px; height: 16px; font-size: 8px; }
        .container { display: flex; flex-wrap: wrap; justify-content: center; }
        .icon-wrapper { text-align: center; margin: 10px; }
        .label { font-size: 12px; margin-top: 5px; color: #333; }
    </style>
</head>
<body>
    <h1>🎯 Quick Icon Generator for Paycom Extension</h1>
    <p><strong>Instructions:</strong> Right-click each icon below and "Save image as..." with the filename shown.</p>
    
    <div class="container">
        <div class="icon-wrapper">
            <div class="icon">🎯</div>
            <div class="label">Save as: icon128.png</div>
        </div>
        <div class="icon-wrapper">
            <div class="icon icon-48">🎯</div>
            <div class="label">Save as: icon48.png</div>
        </div>
        <div class="icon-wrapper">
            <div class="icon icon-16">🎯</div>
            <div class="label">Save as: icon16.png</div>
        </div>
    </div>
    
    <hr style="margin: 30px 0;">
    
    <h2>Quick Alternative Method:</h2>
    <p>If you can't save the icons above, here's a super quick workaround:</p>
    <ol>
        <li><strong>Find any small image</strong> on your computer (any PNG, JPG, etc.)</li>
        <li><strong>Copy it 3 times</strong> and rename to:</li>
        <ul>
            <li><code>icon16.png</code></li>
            <li><code>icon48.png</code></li>
            <li><code>icon128.png</code></li>
        </ul>
        <li><strong>Put all 3 files</strong> in your PaycomBot2 folder</li>
        <li><strong>Load the extension</strong> - it will work with any placeholder icons!</li>
    </ol>
</body>
</html>
