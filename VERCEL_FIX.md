# Vercel 404 Fix

## The Issue
Vercel was returning 404 errors because the routing configuration was too complex.

## The Fix
Simplified `vercel.json` to use Vercel's automatic routing. Vercel automatically detects:
- `/api/*.js` files → Serverless functions
- `index.html` → Static file serving

## What to Do

1. **Redeploy** - The updated `vercel.json` has been pushed to GitHub
2. **Vercel will auto-redeploy** - Or trigger a redeploy manually
3. **Test the URLs**:
   - Study: `https://your-project.vercel.app/`
   - Health: `https://your-project.vercel.app/api/health`
   - Track: `https://your-project.vercel.app/api/track`

## If Still Getting 404

1. Check Vercel deployment logs
2. Verify `MONGODB_URI` environment variable is set
3. Check that all files are in the repo (especially `api/` folder)
4. Try accessing `/api/health` first to test API

## File Structure Should Be:
```
feed-video/
├── api/
│   ├── track.js
│   ├── track/batch.js
│   ├── events.js
│   ├── events/by-participant.js
│   ├── events/participant/[participantId].js
│   ├── health.js
│   └── mongodb.js
├── index.html
├── js/
├── assets/
├── vercel.json
└── package.json
```


