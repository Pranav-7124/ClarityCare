# 🏥 ClarityCare - Quick Start Guide

**Healthcare Transparency Platform with AI-Powered Analysis**

## 🚀 Quick Start (3 Easy Methods)

### **Method 1: Double-Click to Run (Easiest)**

**Windows:**

1. Double-click `run_server.bat`
2. Your browser will open automatically
3. App runs at `http://localhost:8000`

**Mac/Linux:**

1. Double-click `run_server.sh` (or run in terminal)
2. Your browser will open automatically
3. App runs at `http://localhost:8000`

### **Method 2: Command Line**

```bash
# Option A: Use the Python script
python run_server.py

# Option B: Manual Python server
cd public
python -m http.server 8000
```

### **Method 3: Any Web Server**

Simply serve the `public/` folder with any web server (Apache, Nginx, etc.)

---

## 🎯 Features Overview

### **🩺 Medical Protection**

- **Purpose:** Counter diagnosis coercion with AI analysis
- **How to use:**
    1. Click "Get Started" in Medical Protection card
    2. Enter hospital name, region, procedure, and cost
    3. Get instant price analysis and regional comparison
    4. View interactive charts showing price variations

### **💰 Financial Protection**

- **Purpose:** Decode hidden insurance policy clauses
- **How to use:**
    1. Click "Get Started" in Financial Protection card
    2. Select a common issue (Room Rent, Co-pay, etc.) OR paste your policy text
    3. Get AI-powered analysis of hidden terms
    4. Review structured breakdown of limitations and exclusions

### **📈 Market Protection**

- **Purpose:** Compare regional pricing to ensure fair rates
- **How to use:**
    1. Click "Get Started" in Market Protection card
    2. Select region and procedure type
    3. View regional price distribution charts
    4. Identify pricing outliers and fair market rates

---

## 🛠 Technical Requirements

**Minimum Requirements:**

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.6+ (for local server)
- Internet connection (for AI features)

**No Installation Required:**

- No databases to setup
- No complex dependencies
- Works offline with demo data

---

## 🔧 Troubleshooting

### **Port Already in Use**

```bash
# Try a different port
python run_server.py --port 8080
```

### **Python Not Found**

- **Windows:** Download from [python.org](https://python.org)
- **Mac:** `brew install python3` or download from python.org
- **Ubuntu/Debian:** `sudo apt install python3`

### **Browser Doesn't Open**

- Manually navigate to `http://localhost:8000`
- Try `http://127.0.0.1:8000` if localhost doesn't work

### **Forms Not Working**

- Make sure JavaScript is enabled in your browser
- Try refreshing the page
- Check browser console for errors (F12 → Console)

---

## 📊 Demo Data

The app includes realistic demo data:

- **8 Sample Hospitals:** AIIMS, Apollo, Fortis, Max, etc.
- **Multiple Procedures:** Heart surgery, knee replacement, etc.
- **Regional Coverage:** Delhi, Mumbai, Bangalore, Chennai, etc.
- **Price Analysis:** Validated vs flagged cost examples

---

## 🔒 Privacy & Data

- **Local Processing:** All analysis happens in your browser
- **No Data Collection:** Your inputs are not stored on external servers
- **Demo Mode:** Works without any external APIs
- **Fallback Systems:** Graceful degradation when APIs are unavailable

---

## 🎨 Modern Features

- **Responsive Design:** Works on desktop, tablet, and mobile
- **Interactive Charts:** Real-time price comparison visualizations
- **Smart Forms:** Quick-select options for common scenarios
- **AI Fallbacks:** Offline analysis when APIs are unavailable
- **Clean UI:** Modern, professional healthcare platform design

---

## 📞 Support

**Having Issues?**

1. Check this guide first
2. Ensure Python 3 is installed
3. Try different browsers
4. Check firewall/antivirus settings

**Technical Details:**

- **Framework:** Vanilla JavaScript + Chart.js
- **Backend:** Firebase (optional) + RunAnywhere SDK
- **AI Integration:** Gemini AI with fallback analysis
- **Charts:** Chart.js for data visualization

---

## ✅ Success Indicators

You'll know it's working when you see:

- ✅ Server starts at http://localhost:8000
- ✅ Browser opens automatically
- ✅ Three protection cards are visible
- ✅ "Get Started" buttons are clickable
- ✅ Forms appear when clicking buttons
- ✅ Demo data loads in Community Data section

**Ready to start? Just double-click the run script for your system!**