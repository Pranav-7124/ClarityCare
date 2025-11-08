# ClarityCare Deployment Guide

This guide walks you through deploying ClarityCare to Firebase Hosting with full functionality.

## 🚀 Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [Firebase CLI](https://firebase.google.com/docs/cli) installed globally
- Firebase project with Firestore enabled
- RunAnywhere API key (optional for demo mode)

## 📋 Step-by-Step Deployment

### 1. Initial Setup

**Windows (PowerShell):**

```powershell
.\setup.ps1
```

**Unix/Linux/macOS:**

```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup:**

```bash
npm install -g firebase-tools
npm install
```

### 2. Firebase Project Setup

```bash
# Login to Firebase
firebase login

# Initialize Firebase in the project
firebase init
```

**Select the following options:**

- ✅ **Firestore**: Configure security rules and indexes files
- ✅ **Hosting**: Configure files for Firebase Hosting

**Configuration choices:**

- **Firestore Rules**: Use existing `firestore.rules`
- **Firestore Indexes**: Use existing `firestore.indexes.json`
- **Public Directory**: `public`
- **Single-page app**: **Yes**
- **GitHub setup**: Optional

### 3. Configure Firebase Settings

Update `public/firebase-config.js` with your project configuration:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-actual-app-id"
};
```

**Where to find these values:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click ⚙️ Settings → Project settings
4. Scroll down to "Your apps" → Web app → Config

### 4. Configure RunAnywhere SDK (Optional)

For production AI features, update `public/runanywhere-integration.js`:

```javascript
// Replace the demo API key
const runAnywhereSDK = new RunAnywhereSDK('your-actual-runanywhere-api-key');
```

**Get your API key from:** https://api.runanywhere.ai

### 5. Deploy Firestore Rules and Indexes

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 6. Test Locally

```bash
# Start local development server
npm run dev

# Or directly with Firebase CLI
firebase serve --only hosting
```

Visit `http://localhost:5000` to test the application.

### 7. Deploy to Production

```bash
# Deploy to Firebase Hosting
npm run deploy

# Or directly with Firebase CLI
firebase deploy --only hosting
```

## 🔧 Environment-Specific Configuration

### Development Environment

- Uses mock data when Firebase is not configured
- Includes demo data loading functionality
- Local testing at `localhost:5000`

### Production Environment

- Full Firebase Firestore integration
- RunAnywhere SDK with real API calls
- Custom domain available through Firebase Hosting

## 📊 Testing the Deployment

### Price Disparity Visualization

1. Visit your Firebase Hosting URL
2. Fill out the "Price Disparity Analysis" form:
    - Hospital ID: `HSP001`
    - Procedure Code: `CPT-12345`
    - Final Cost: `2500`
3. Click "Analyze Pricing"
4. Verify results show validation/flagged status
5. Check that the chart appears with cost visualization

### Policy Trap Deconstructor

1. Click "Load Sample 1" button (if in development)
2. Or paste any insurance policy text
3. Click "Analyze Policy"
4. Wait for Gemini AI analysis (2-3 seconds)
5. Verify structured results appear in four categories

## 🔐 Security Configuration

### Production Firestore Rules

Replace the demo rules with proper authentication:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Require authentication for price entries
    match /price_entries/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Public read access for statistics (optional)
    match /statistics/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Deploy updated rules:

```bash
firebase deploy --only firestore:rules
```

## 🚨 Troubleshooting

### Common Issues

**Firebase initialization fails:**

- Check project ID in `firebase-config.js`
- Verify Firebase project exists and is active
- Ensure billing is enabled for Firestore

**RunAnywhere SDK errors:**

- Verify API key is correct
- Check network connectivity
- Review browser console for detailed errors

**Chart.js not loading:**

- Check CDN connection
- Verify Chart.js version compatibility
- Clear browser cache

**Deployment fails:**

- Check Firebase CLI authentication: `firebase login`
- Verify project selection: `firebase use --add`
- Ensure proper permissions on Firebase project

### Debug Mode

Add debug logging by updating `firebase-config.js`:

```javascript
// Enable Firebase debug mode
window.FIREBASE_DEBUG = true;
```

## 📈 Analytics and Monitoring

### Firebase Analytics (Optional)

Add to `index.html` before closing `</head>`:

```html
<!-- Firebase Analytics -->
<script>
  // Analytics configuration
  import { getAnalytics } from "firebase/analytics";
  const analytics = getAnalytics(app);
</script>
```

### Performance Monitoring

Monitor app performance through Firebase Console:

1. Go to Firebase Console → Performance
2. View page load times, API response times
3. Track user interactions and errors

## 🔄 Updates and Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull origin main

# Redeploy
npm run deploy
```

### Backing Up Data

```bash
# Export Firestore data
gcloud firestore export gs://your-project-backup-bucket
```

## 🎯 Custom Domain Setup

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. SSL certificate auto-provisioned

---

**🏥 Your ClarityCare platform is now live!** Start empowering healthcare transparency with AI-driven
insights.