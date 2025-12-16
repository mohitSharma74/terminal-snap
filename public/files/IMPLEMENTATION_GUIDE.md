# TerminalSnapshot - Favicon Implementation Guide

All favicon sizes generated from your [TS] logo! 🎨

## 📦 Generated Files

### Browser Favicons
- `favicon.ico` - Multi-resolution (16, 32, 48px) for legacy browsers
- `favicon.svg` - Vector version for modern browsers (recommended)
- `favicon-16x16.png` - 16×16px PNG
- `favicon-32x32.png` - 32×32px PNG
- `favicon-48x48.png` - 48×48px PNG
- `favicon-64x64.png` - 64×64px PNG

### Mobile & PWA
- `apple-touch-icon.png` - 180×180px for iOS
- `android-chrome-192x192.png` - 192×192px for Android
- `android-chrome-512x512.png` - 512×512px for Android PWA

### Social Media Previews
- `og-image.png` - 1200×630px (Open Graph / Twitter / LinkedIn)
- `github-social.png` - 1200×1200px (GitHub repository social preview)

---

## 🚀 Implementation

### 1. Basic HTML (in your `<head>` tag)

```html
<!-- Modern browsers (recommended) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- Fallback for older browsers -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple devices -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

### 2. For Progressive Web App (PWA)

Create a `manifest.json` file:

```json
{
  "name": "TerminalSnapshot",
  "short_name": "TerminalSnap",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "theme_color": "#000000",
  "background_color": "#000000",
  "display": "standalone"
}
```

Then link it in your HTML:
```html
<link rel="manifest" href="/manifest.json">
```

### 3. Social Media Meta Tags

Add these to your `<head>` tag:

```html
<!-- Open Graph (Facebook, LinkedIn, etc.) -->
<meta property="og:title" content="TerminalSnapshot">
<meta property="og:description" content="Beautiful terminal snapshots">
<meta property="og:image" content="https://yourdomain.com/og-image.png">
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="TerminalSnapshot">
<meta name="twitter:description" content="Beautiful terminal snapshots">
<meta name="twitter:image" content="https://yourdomain.com/og-image.png">

<!-- Theme color for mobile browsers -->
<meta name="theme-color" content="#000000">
```

### 4. GitHub Repository Setup

1. **Repository Avatar**: 
   - Use `android-chrome-512x512.png` or `favicon.svg`
   - Upload in Settings → General → Repository avatar

2. **Social Preview Image**:
   - Use `github-social.png`
   - Upload in Settings → General → Social preview
   - This appears when sharing your repo on social media

---

## 📁 File Organization

Recommended folder structure:
```
public/
├── favicon.ico
├── favicon.svg
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── manifest.json
├── og-image.png
└── github-social.png
```

---

## ✅ Testing Your Favicons

1. **Browser tabs**: Check favicon.ico and favicon.svg in different browsers
2. **iOS**: Save to home screen and check apple-touch-icon
3. **Android**: Add to home screen and check android-chrome icons
4. **Social media**: Use these tools:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

---

## 💡 Quick Tips

✅ **DO:**
- Use SVG for the best quality and smallest file size
- Place all favicon files in your root `/public` directory
- Use absolute URLs for social media meta tags
- Test on multiple devices and browsers

❌ **DON'T:**
- Don't use relative paths for og:image (must be absolute)
- Don't forget to update cache when changing favicons
- Don't use JPG for favicons (PNG/SVG only)

---

## 🔄 Cache Busting

If your favicon doesn't update, try:
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Add version parameter: `<link rel="icon" href="/favicon.ico?v=2">`

---

Made with your awesome [TS] logo! 🚀
