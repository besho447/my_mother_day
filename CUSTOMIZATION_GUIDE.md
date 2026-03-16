# Mother's Day Website - Customization Guide

This is a beautiful, emotional Mother's Day website gift. Here's how to customize it with your personal content.

## Easy Customization

All customizable content is located at the top of `src/App.tsx` in the `CONFIG` object.

### 1. Update Birth Date

Change the birth date to calculate the correct number of days:

```typescript
const CONFIG = {
  birthDate: '1990-01-01',  // Change this to your actual birth date (YYYY-MM-DD)
```

### 2. Replace Photos

Update the photo URLs and captions in the `photos` array:

```typescript
photos: [
  {
    url: 'YOUR_PHOTO_URL_HERE',
    caption: 'Your caption here'
  },
  // Add more photos (3-5 recommended)
],
```

**How to add your own photos:**
- Option 1: Upload to an image hosting service (Imgur, Google Photos, etc.) and use the direct link
- Option 2: Place images in the `public` folder and reference them like: `url: '/my-photo.jpg'`

### 3. Change Video

Replace the video URL with your own video message:

```typescript
videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
```

**How to add your video:**
- Upload to YouTube (can be unlisted)
- Get the embed URL from the "Share" > "Embed" option
- Or use any video hosting platform that provides an embed link

### 4. Customize Messages

The messages in Arabic, English, and Chinese can be edited in the JSX:

**Video Subtitles Section:**
Located around line 200-213 in `src/App.tsx`

**Message Section:**
Located around line 230-246 in `src/App.tsx`

**Final Surprise:**
Located around line 280-285 in `src/App.tsx`

## Design Customization

### Colors

The website uses warm rose, orange, and amber tones. To change colors, search and replace:
- `rose-` with your preferred color (e.g., `pink-`, `red-`)
- `orange-` with another warm color
- `amber-` with another complementary color

### Fonts

The website uses serif fonts for elegance. To change:
- Search for `font-serif` and replace with `font-sans` or custom font classes

## Tips for Best Results

1. **Photos**: Use high-quality images (at least 800x800px)
2. **Video**: Keep it under 5 minutes for best experience
3. **Captions**: Keep them short and meaningful
4. **Testing**: View on both desktop and mobile before sharing

## Viewing the Website

Run `npm run dev` and open the local URL to preview your changes.

---

Made with love for Mother's Day 💗
