# Deployment Guide

This guide covers how to deploy the Interactive CV Game to various static hosting platforms.

## 🏗️ Build Process

The project uses Vite for building and bundling. The build process creates optimized static files ready for deployment.

```bash
# Install dependencies
yarn install

# Create production build
yarn build

# Preview the build locally (optional)
yarn preview
```

After building, you'll find the deployable files in the `dist/` directory.

## 🚀 Deployment Options

### 1. Netlify (Recommended)

**Option A: Drag & Drop**
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deploy area
4. Your site will be live with a random URL

**Option B: Git Integration**
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build settings:
   - Build command: `yarn build`
   - Publish directory: `dist`
4. Deploy automatically on git push

**Custom Domain Setup:**
1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS records as instructed

### 2. Vercel

**Git Integration:**
1. Push code to GitHub/GitLab
2. Import project on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite config
4. Deploy automatically

**Custom Domain:**
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS as instructed

### 3. GitHub Pages

**Using GitHub Actions:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

**Manual Deploy:**
1. Run `npm run build`
2. Push `dist` contents to `gh-pages` branch
3. Enable GitHub Pages in repo settings

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Configure:
# - Public directory: dist
# - Single-page app: Yes
# - Set up automatic builds: No

# Build and deploy
npm run build
firebase deploy
```

### 5. AWS S3 + CloudFront

**S3 Setup:**
1. Create S3 bucket with public access
2. Enable static website hosting
3. Upload `dist` contents
4. Set bucket policy for public read

**CloudFront (CDN):**
1. Create CloudFront distribution
2. Point origin to S3 bucket
3. Configure custom domain (optional)

### 6. DigitalOcean App Platform

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

## ⚙️ Build Configuration

### Environment Variables

Create `.env` file for environment-specific configs:

```bash
# Analytics (optional)
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID

# API endpoints (if needed)
VITE_API_URL=https://api.yourdomain.com

# Feature flags
VITE_ENABLE_DEBUG=false
```

### Vite Configuration

The `vite.config.js` is pre-configured for deployment:

```javascript
export default defineConfig({
  base: './', // Relative paths for any hosting
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1500,
  },
});
```

### Custom Domain Setup

**DNS Configuration:**
For `nihad.dev`:
- A record: `@` → `192.168.1.1` (your hosting IP)
- CNAME record: `www` → `nihad.dev`

**SSL Certificate:**
Most platforms (Netlify, Vercel, etc.) provide automatic SSL.

## 🔧 Optimization Tips

### Performance
- Enable gzip compression (most platforms do this automatically)
- Use CDN for global distribution
- Optimize images before deploying
- Enable caching headers

### SEO & Social
The `index.html` includes basic meta tags. Enhance with:

```html
<meta property="og:title" content="Nihad's Interactive CV" />
<meta property="og:description" content="Explore my professional journey through an interactive game!" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://nihad.dev" />
<meta name="twitter:card" content="summary_large_image" />
```

### Analytics

Add Google Analytics to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔍 Testing Deployment

### Local Testing
```bash
# Test production build locally
yarn build
yarn preview

# Test on local network (mobile testing)
yarn preview --host
```

### Pre-deployment Checklist
- [ ] All assets load correctly
- [ ] Mobile responsiveness works
- [ ] All interactive elements function
- [ ] Audio works (if implemented)
- [ ] No console errors
- [ ] Fast loading times
- [ ] SEO meta tags present

### Cross-browser Testing
Test on:
- Chrome/Chromium (desktop & mobile)
- Firefox (desktop & mobile)  
- Safari (desktop & mobile)
- Edge (desktop)

## 📊 Monitoring

### Performance Monitoring
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Set up uptime monitoring

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage metrics

## 🆘 Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (18+ required)
- Clear yarn cache: `yarn cache clean`
- Delete `node_modules` and reinstall: `rm -rf node_modules yarn.lock && yarn install`

**Assets Not Loading:**
- Verify `base` path in `vite.config.js`
- Check case sensitivity in file paths
- Ensure all assets are in `public/` or imported correctly

**Mobile Issues:**
- Test viewport meta tag
- Verify touch events work
- Check responsive breakpoints

**Performance Issues:**
- Optimize images and audio files
- Enable compression on hosting platform
- Use CDN for assets

### Support
If you encounter deployment issues:
- Check platform-specific documentation
- Review build logs for errors
- Test locally first with `yarn preview`

---

*Happy deploying! 🚀*
