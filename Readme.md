# ClarityCare - Clinical-Tech Transparency Platform

A single-page web application that empowers patients and healthcare providers with AI-driven
insights into pricing disparities and policy clarity.a

## 🚀 Features

### 📊 Price Disparity Visualization

- Submit hospital pricing data (Hospital ID, Procedure Code, Final Cost)
- Real-time statistical analysis comparing costs to regional averages
- Automatic flagging of overpriced procedures (beyond 1 standard deviation)
- Interactive Chart.js visualizations showing cost trends
- Data persistence with Firebase Firestore

### 🔍 Policy Trap Deconstructor

- Paste insurance policy clauses for AI analysis
- Extract key information using Gemini AI via RunAnywhere SDK:
    - Room rent limits and restrictions
    - Co-payment requirements and percentages
    - Exclusions and non-covered items
    - Hidden clauses that might trap patients
- No text storage - analysis only displayed
- Structured JSON schema for consistent extraction

## 🎨 Design Theme

**Clinical-Tech Transparency** with a clean, professional aesthetic:

- **Colors**: White primary, Teal (#20B2AA) accents, Blue (#1E90FF) highlights
- **Typography**: Inter font family for modern readability
- **UI**: Glowing teal accents, smooth animations, responsive design
- **Visual Hierarchy**: Clear separation between pricing and policy features

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Custom CSS with CSS Variables, Inter Google Font
- **Database**: Firebase Firestore for price data storage
- **Hosting**: Firebase Hosting
- **Charts**: Chart.js for data visualization
- **AI Integration**: RunAnywhere SDK wrapping Gemini API calls
- **AI Model**: gemini-2.5-flash-preview-09-2025

## 📋 Prerequisites

- Node.js (v16 or higher)
- Firebase CLI
- Firebase project with Firestore enabled
- RunAnywhere SDK API access

## 🚀 Quick Start

### 1. Clone and Setup

```bash
cd claritycare-webapp
npm install
```

### 2. Firebase Setup

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Select:
# - Firestore: Configure security rules and indexes files
# - Hosting: Configure files for Firebase Hosting
```

### 3. Configure Firebase

Update `public/firebase-config.js` with your Firebase project configuration:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com", 
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 4. Configure RunAnywhere SDK

The app includes a demo RunAnywhere SDK integration. For production:

1. Get your RunAnywhere API key from https://api.runanywhere.ai
2. Update the API key in `public/runanywhere-integration.js`:

```javascript
const runAnywhereSDK = new RunAnywhereSDK('your-actual-api-key');
```

### 5. Deploy Firestore Rules and Indexes

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 6. Local Development

```bash
# Serve locally
firebase serve --only hosting

# Or use npm script
npm run dev
```

Visit `http://localhost:5000` to view the app.

### 7. Production Deployment

```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Or use npm script  
npm run deploy
```

## 📁 Project Structure

```
claritycare-webapp/
├── public/
│   ├── index.html              # Main app HTML
│   ├── firebase-config.js      # Firebase initialization
│   ├── runanywhere-integration.js  # RunAnywhere SDK wrapper
│   └── app.js                  # Main application logic
├── package.json                # Dependencies and scripts
├── firebase.json              # Firebase configuration
├── firestore.rules           # Firestore security rules
├── firestore.indexes.json    # Firestore indexes
└── README.md                 # This file
```

## 🔧 Configuration

### Firebase Security Rules

The included `firestore.rules` allows read/write access for demo purposes. For production, implement
proper authentication:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /price_entries/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### RunAnywhere SDK Integration

The app integrates with RunAnywhere SDK to wrap Gemini API calls:

- **Endpoint**: `https://api.runanywhere.ai`
- **Model**: `gemini-2.5-flash-preview-09-2025`
- **Features**: JSON schema validation, structured extraction
- **Privacy**: No policy text is stored, only analysis results displayed

## 🎯 Usage

### Price Disparity Analysis

1. Enter Hospital ID (e.g., "HSP001")
2. Enter Procedure Code (e.g., "CPT-12345")
3. Enter Final Cost in dollars
4. Click "Analyze Pricing"
5. View results showing validation/flagged status
6. Check the real-time chart comparing to regional averages

### Policy Trap Deconstructor

1. Paste insurance policy clause text
2. Click "Analyze Policy"
3. Wait for Gemini AI analysis (2-3 seconds)
4. Review extracted information in organized sections:
    - Room rent limits
    - Co-pay requirements
    - Exclusions
    - Hidden clauses

## 🔐 Privacy & Security

- **Price data**: Stored in Firebase Firestore with configurable access rules
- **Policy text**: Never stored - only processed for analysis
- **AI Processing**: Handled via RunAnywhere SDK for enhanced privacy
- **Client-side**: All processing happens in browser with secure API calls

## 🚨 Demo Mode

The app includes demo/mock functionality when Firebase or RunAnywhere SDK are not available:

- **Mock Database**: Simulates Firestore operations with sample data
- **Mock AI**: Provides realistic policy analysis responses
- **Development**: Enables local testing without full backend setup

## 📈 Analytics & Monitoring

Built-in features for tracking app performance:

- **Price Entries**: Automatic validation statistics
- **Policy Analysis**: Processing time and confidence metrics
- **User Experience**: Loading states and error handling
- **Firebase Analytics**: Can be added for usage insights

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test locally with `firebase serve`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Powered by**: RunAnywhere SDK + Firebase + Gemini AI
- **Design Inspiration**: Modern healthcare tech platforms
- **Charts**: Chart.js for beautiful data visualization
- **Fonts**: Inter typeface for optimal readability

---

**Ready to build transparent healthcare?** Deploy ClarityCare and empower patients with AI-driven
insights! 🏥✨
