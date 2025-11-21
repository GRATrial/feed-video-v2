# Vercel Deployment Settings for Feed Video

## 📋 Vercel Import Settings

When importing this repository to Vercel, use these settings:

### Project Settings
- **Project Name**: `feed-video` (or your preferred name)
- **Framework Preset**: `Other`
- **Root Directory**: `./` (leave as default)
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: (leave empty)

### Environment Variables

**Required**: Add this in Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://estatedeliuser:estatedeli12345@cluster0.xwvmm93.mongodb.net/instagram_study?retryWrites=true&w=majority
```

## ✅ After Deployment

Your Feed Video study will be available at:
- **Study URL**: `https://your-project.vercel.app/`
- **API Health**: `https://your-project.vercel.app/api/health`
- **Track Events**: `https://your-project.vercel.app/api/track`

## 🎯 What's Included

- ✅ Feed Video study (index.html)
- ✅ MongoDB tracking (auto-detects Vercel/localhost)
- ✅ API functions (serverless)
- ✅ All assets and dependencies

## 📝 Notes

- The tracker automatically uses `/api` URLs on Vercel
- All events are stored in MongoDB Atlas
- No additional configuration needed after setting MONGODB_URI

