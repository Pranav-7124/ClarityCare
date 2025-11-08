# ClarityCare India - Healthcare Transparency Platform

A single-page web application that empowers Indian patients and healthcare providers with AI-driven
insights into pricing disparities and insurance policy clarity across different states and regions
of India.

## Indian Healthcare Features

### Currency & Regional Support

- **Indian Rupees (₹)**: All pricing displayed in INR with proper formatting
- **Regional Analysis**: Comprehensive coverage of all 28 states and UTs
- **Zone-Based Pricing**: Metro vs non-metro cost analysis
- **Government vs Private**: Cost comparison across different hospital types

### Regional Coverage

- **North India**: Delhi NCR, Punjab, Haryana, UP, UK, HP, J&K
- **West India**: Maharashtra, Gujarat, Rajasthan, Goa
- **South India**: Karnataka, Tamil Nadu, Kerala, AP, Telangana
- **East India**: West Bengal, Odisha, Jharkhand, Bihar
- **Central India**: Madhya Pradesh, Chhattisgarh
- **Northeast**: All 8 northeastern states including Sikkim

### Insurance Context

- **IRDAI Compliance**: Analysis based on Indian insurance regulations
- **AYUSHMAN BHARAT**: Integration with government healthcare schemes
- **TPA Processing**: Third-party administrator claim analysis
- **Network vs Non-Network**: Hospital network pricing differences

## Key Features

### 1. Price Disparity Visualization

- **Regional Comparison**: Compare costs across Indian states
- **Real-time Analysis**: Statistical comparison with regional averages
- **Smart Flagging**: Automatic detection of overpriced procedures
- **Interactive Charts**: Visualizations showing cost trends vs regional averages
- **AI-Powered Insights**: Gemini AI analysis of pricing irregularities

### 2. Enhanced Policy Trap Deconstructor

- **Prompt-Based Analysis**: Custom analysis based on user queries
- **IRDAI Context**: Analysis considering Indian insurance regulations
- **Structured Extraction**: JSON schema-based information parsing
- **Key Categories**:
    - Room rent limits with city tier variations
    - Co-payment requirements (network vs non-network)
    - Exclusions including AYUSH treatment coverage
    - Hidden clauses including zone-based pricing

### 3. Real-time Anonymized Data

- **Live Updates**: Real-time display of anonymized pricing data
- **Regional Filtering**: Filter by North, South, East, West regions
- **Flagged Entries**: Highlight potentially overpriced procedures
- **Statistics Dashboard**: Track total entries and average savings

### 4. AI-Powered Analysis

- **Custom Prompts**: Analyze specific concerns with Gemini AI
- **Indian Context**: AI trained on Indian healthcare patterns
- **Actionable Insights**: Practical recommendations for patients
- **Compliance Checks**: IRDAI regulation compliance analysis

## Technical Implementation

### Frontend Stack

- **HTML5**: Semantic markup with Indian accessibility considerations
- **CSS3**: Custom properties with Indian flag color scheme
- **Vanilla JavaScript**: ES6+ with rupee formatting utilities
- **Chart.js**: Interactive visualizations with INR formatting

### Backend Services

- **Firebase Firestore**: NoSQL database optimized for Indian regions
- **Firebase Hosting**: CDN with Indian server locations
- **RunAnywhere SDK**: AI model integration with Indian healthcare context
- **Gemini AI**: Enhanced with IRDAI and AYUSHMAN BHARAT knowledge

### Indian Healthcare Intelligence

- **Procedure Mapping**: ICD codes to common Indian procedures
- **Regional Cost Factors**: State-wise cost multipliers
- **Hospital Networks**: Major Indian hospital chains
- **Insurance Providers**: IRDAI-registered companies

## Sample Data & Examples

### Common Procedures (with average costs)

- **Gallstone Surgery**: ₹95,000
- **Coronary Angioplasty**: ₹2,20,000
- **Knee Replacement**: ₹2,80,000
- **Cataract Surgery**: ₹35,000
- **Normal Delivery**: ₹45,000
- **Mental Health Treatment**: ₹35,000

### Regional Hospitals

- **AIIMS Delhi**, **SGPGI Lucknow** (North)
- **KEM Mumbai**, **Fortis Gurgaon** (West)
- **NIMHANS Bangalore**, **Apollo Chennai** (South)
- **Ruby Kolkata**, **AMRI Kolkata** (East)

### Insurance Policy Examples

- **HDFC ERGO**: Metro vs non-metro pricing analysis
- **Star Health**: Age-based co-payment structure
- **LIC Jeevan Arogya**: Government scheme integration
- **ICICI Lombard**: Sub-limits and exclusions analysis

## Setup & Development

### Prerequisites

- Node.js 16+
- Firebase account with Indian region selection
- RunAnywhere SDK API key (optional for demo mode)

### Quick Start
```bash
# Clone repository
git clone https://github.com/your-repo/claritycare-india.git
cd claritycare-india

# Install dependencies
npm install

# Setup Firebase (follow prompts for Indian region)
firebase init

# Start development server
npm run dev
```

### Configuration for India

1. **Firebase**: Select `asia-south1` (Mumbai) region
2. **Currency**: All amounts automatically formatted in INR
3. **Regional Data**: Pre-loaded with Indian states and major hospitals
4. **Compliance**: IRDAI guidelines built into policy analysis

## Usage Examples

### Price Analysis
```javascript
// Example: Analyze knee replacement surgery in Karnataka
hospitalId: "MANIPAL-BLR-009"
procedureCode: "ICD-M17.1 (Knee Replacement Surgery)"
finalCost: 280000  // ₹2,80,000
region: "karnataka"
```

### Policy Analysis

```javascript
// Example: Analyze room rent hidden charges
analysisPrompt: "Find hidden charges in room rent limits"
policyClause: "Room rent covered up to ₹3,000 per day in metro cities..."
```

### Regional Filtering

- Filter data by **North**, **South**, **East**, **West** regions
- View **flagged entries** across specific states
- Compare **government vs private** hospital costs

## Mobile-First Design

- **Responsive**: Works perfectly on mobile devices
- **Touch-Friendly**: Optimized for Indian mobile users
- **Offline-Ready**: Core functionality works without internet
- **Regional Languages**: UI designed for multi-language support

## Privacy & Security

- **IRDAI Compliant**: Follows Indian insurance data guidelines
- **Anonymized Data**: All patient information removed
- **Regional Privacy**: Respects state-specific privacy laws
- **Secure Processing**: All AI analysis done securely

## Benefits for Indian Healthcare

### For Patients

- **Cost Transparency**: Understand regional price variations
- **Insurance Clarity**: Decode complex Indian policy terms
- **Informed Decisions**: Data-driven healthcare choices
- **Government Schemes**: Integration with AYUSHMAN BHARAT

### For Healthcare Providers

- **Regional Benchmarks**: Compare costs against state averages
- **Insurance Analysis**: Better understanding of policy coverage
- **Transparency Tools**: Build patient trust through open pricing
- **Compliance**: Ensure IRDAI guideline adherence

### For Insurance Companies

- **Market Intelligence**: Understand regional pricing trends
- **Policy Optimization**: Improve coverage based on data
- **Fraud Detection**: Identify pricing irregularities
- **Customer Service**: Better policy explanation tools

## Deployment

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to Firebase (Indian servers)
firebase deploy --only hosting

# Verify deployment
firebase open hosting:site
```

### Environment Variables

```bash
# Firebase Config (India region)
FIREBASE_PROJECT_ID=claritycare-india
FIREBASE_REGION=asia-south1

# RunAnywhere SDK
RUNANYWHERE_API_KEY=your_api_key_here
RUNANYWHERE_REGION=india
```

## Analytics & Insights

- **Regional Usage**: Track adoption across Indian states
- **Cost Trends**: Monitor healthcare pricing patterns
- **Policy Issues**: Identify common insurance problems
- **User Behavior**: Understand patient decision-making

## Contributing

We welcome contributions to improve healthcare transparency in India:

1. **Regional Data**: Add local hospital and pricing information
2. **Language Support**: Translate interface to regional languages
3. **Policy Analysis**: Improve insurance clause detection
4. **Mobile UX**: Enhance mobile user experience

## Support & Contact

- **Email**: support@claritycare-india.com
- **Documentation**: [docs.claritycare-india.com](https://docs.claritycare-india.com)
- **Issues**: GitHub Issues for bug reports
- **Community**: Join our Slack for discussions

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Acknowledgments

- **IRDAI**: For insurance regulation guidelines
- **Ministry of Health**: For AYUSHMAN BHARAT integration
- **Indian Medical Association**: For healthcare data standards
- **Digital India Initiative**: For inspiring healthcare digitization

---

**Made with in India for Indian Healthcare**

*Empowering patients across Bharat with transparent, accessible healthcare information*