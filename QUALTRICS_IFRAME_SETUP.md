# Qualtrics Iframe Setup Guide

## Understanding the Permissions Policy Violations

The browser warnings you're seeing are because the page is embedded in an iframe (Qualtrics) without the necessary permissions. These permissions are required for:

- **autoplay**: YouTube videos need this to autoplay
- **encrypted-media**: YouTube videos use DRM/encrypted content
- **accelerometer/gyroscope**: Device orientation (usually not critical)
- **clipboard-write**: Clipboard operations (usually not critical)

## Solution: Add Permissions to Qualtrics Iframe

When embedding the feed-video app in Qualtrics, you need to add the `allow` attribute to the iframe element.

### In Qualtrics HTML/JavaScript:

```html
<iframe 
    src="https://feed-video-v2.vercel.app/?pid=${e://Field/PROLIFIC_PID}&condition=${e://Field/condition}"
    width="100%" 
    height="800px"
    allow="autoplay; encrypted-media; accelerometer; gyroscope; clipboard-write; picture-in-picture"
    allowfullscreen>
</iframe>
```

### Or using Qualtrics' Rich Text Editor:

1. Go to the question where you want to embed the video
2. Click "HTML View" or "Source" button
3. Add the iframe with the `allow` attribute as shown above

### Alternative: Using Qualtrics JavaScript

If you're adding the iframe dynamically via JavaScript:

```javascript
var iframe = document.createElement('iframe');
iframe.src = 'https://feed-video-v2.vercel.app/?pid=${e://Field/PROLIFIC_PID}&condition=${e://Field/condition}';
iframe.width = '100%';
iframe.height = '800px';
iframe.setAttribute('allow', 'autoplay; encrypted-media; accelerometer; gyroscope; clipboard-write; picture-in-picture');
iframe.setAttribute('allowfullscreen', '');
document.getElementById('your-container').appendChild(iframe);
```

## What We've Already Fixed

✅ Added `Permissions-Policy` meta tag to the HTML (requests permissions)
✅ YouTube iframe already has `allow` attribute set correctly

## What You Need to Do

⚠️ **Add the `allow` attribute to the Qualtrics iframe** - This is the most important step!

## Testing

After adding the `allow` attribute in Qualtrics:
1. Open the survey in a browser
2. Open Developer Tools (F12)
3. Check the Console tab
4. The permission violations should be gone or reduced

## Notes

- The warnings are **non-blocking** - the video should still work, but autoplay might be restricted
- If autoplay doesn't work, users can click the play button manually
- The `encrypted-media` permission is required for YouTube videos to play properly

