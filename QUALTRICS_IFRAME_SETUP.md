# Qualtrics Iframe Setup Guide

## Quick Setup for Qualtrics

### Step 1: Add the Iframe in Qualtrics

In your Qualtrics survey question, add this HTML code:

```html
<iframe 
    src="https://feed-video-v2.vercel.app/?pid=${e://Field/PROLIFIC_PID}&condition=${e://Field/condition}"
    width="100%" 
    height="900px"
    frameborder="0"
    scrolling="no"
    allow="autoplay; encrypted-media; accelerometer; gyroscope; clipboard-write; picture-in-picture"
    allowfullscreen
    style="border: 1px solid #ddd; border-radius: 8px;">
</iframe>
```

### Step 2: Recommended Iframe Dimensions

For best fit, use these dimensions:
- **Height**: `900px` (recommended) or `800px` (minimum)
- **Width**: `100%` (will fit the Qualtrics question width)

### Step 3: How to Add in Qualtrics

#### Option A: Using HTML View
1. Go to your survey question
2. Click the **"HTML View"** or **"Source"** button in the rich text editor
3. Paste the iframe code above
4. Save the question

#### Option B: Using JavaScript (Advanced)
If you need to add it dynamically:

```javascript
Qualtrics.SurveyEngine.addOnload(function() {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://feed-video-v2.vercel.app/?pid=${e://Field/PROLIFIC_PID}&condition=${e://Field/condition}';
    iframe.width = '100%';
    iframe.height = '900px';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.setAttribute('allow', 'autoplay; encrypted-media; accelerometer; gyroscope; clipboard-write; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.border = '1px solid #ddd';
    iframe.style.borderRadius = '8px';
    
    var container = this.getQuestionContainer();
    var iframeDiv = document.createElement('div');
    iframeDiv.style.textAlign = 'center';
    iframeDiv.style.margin = '20px 0';
    iframeDiv.appendChild(iframe);
    container.appendChild(iframeDiv);
});
```

## Understanding the Permissions

The `allow` attribute grants necessary permissions:
- **autoplay**: Required for video playback (though we use manual play now)
- **encrypted-media**: Required for YouTube videos (DRM content)
- **accelerometer/gyroscope**: Device orientation (usually not critical)
- **clipboard-write**: Clipboard operations (usually not critical)
- **picture-in-picture**: Allows PiP mode

## Troubleshooting

### Content Doesn't Fit
- Increase iframe height to `900px` or `1000px`
- Check that `scrolling="no"` is set
- Ensure `width="100%"` is used

### Video Won't Play
- Verify the `allow` attribute includes `autoplay` and `encrypted-media`
- Check browser console for permission errors
- Users can click the "▶ Play" button to start manually

### PID Not Captured
- Make sure Qualtrics field is set up correctly: `${e://Field/PROLIFIC_PID}`
- Test the URL in a browser first: `https://feed-video-v2.vercel.app/?pid=TEST123`
- Check that the field value is being substituted (not showing as literal `${e://Field/...}`)

### Iframe Too Small/Large
- Adjust the `height` attribute (try `800px`, `900px`, or `1000px`)
- The content will scale to fit the iframe width automatically

## Testing Checklist

- [ ] Iframe displays without scrollbars
- [ ] Video loads and shows "▶ Play" button
- [ ] Clicking play button starts the video
- [ ] PID is captured correctly (check browser console)
- [ ] No permission errors in browser console
- [ ] Content fits within iframe boundaries

## Current App Features

✅ **No autoplay** - Video requires user click to play
✅ **Play button overlay** - Shows "▶ Play" before video starts
✅ **Iframe optimized** - Uses percentage-based sizing
✅ **PID capture** - Reads from URL parameter
✅ **MongoDB tracking** - All events logged to database

## Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify iframe `src` URL is correct
3. Test the app directly: `https://feed-video-v2.vercel.app/?pid=TEST123`
4. Ensure Qualtrics field substitution is working
