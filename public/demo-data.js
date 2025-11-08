// Demo Data for ClarityCare India
// This script provides sample data for testing the price disparity visualization

const demoData = {
    priceEntries: [
        {
            id: 'demo1',
            hospitalId: 'AIIMS-DEL-001',
            procedureCode: 'ICD-K80.2',
            procedureName: 'Gallstone Removal Surgery',
            finalCost: 85000,
            region: 'delhi',
            timestamp: new Date('2024-01-15'),
            status: 'validated'
        },
        {
            id: 'demo2',
            hospitalId: 'ASTER-BLR-002',
            procedureCode: 'ICD-K80.2',
            procedureName: 'Gallstone Removal Surgery',
            finalCost: 125000,
            region: 'karnataka',
            timestamp: new Date('2024-01-16'),
            status: 'flagged'
        },
        {
            id: 'demo3',
            hospitalId: 'KEM-MUM-003',
            procedureCode: 'ICD-K80.2',
            procedureName: 'Gallstone Removal Surgery',
            finalCost: 95000,
            region: 'maharashtra',
            timestamp: new Date('2024-01-17'),
            status: 'validated'
        },
        {
            id: 'demo4',
            hospitalId: 'SGPGI-LKO-004',
            procedureCode: 'ICD-I25.1',
            procedureName: 'Coronary Angioplasty',
            finalCost: 180000,
            region: 'uttar-pradesh',
            timestamp: new Date('2024-01-18'),
            status: 'validated'
        },
        {
            id: 'demo5',
            hospitalId: 'NIMHANS-BLR-005',
            procedureCode: 'ICD-F32.9',
            procedureName: 'Mental Health Treatment',
            finalCost: 25000,
            region: 'karnataka',
            timestamp: new Date('2024-01-19'),
            status: 'validated'
        },
        {
            id: 'demo6',
            hospitalId: 'PRIVATE-HYD-006',
            procedureCode: 'ICD-I25.1',
            procedureName: 'Coronary Angioplasty',
            finalCost: 280000,
            region: 'telangana',
            timestamp: new Date('2024-01-20'),
            status: 'flagged'
        },
        {
            id: 'demo7',
            hospitalId: 'FORTIS-CHD-007',
            procedureCode: 'ICD-M17.1',
            procedureName: 'Knee Replacement Surgery',
            finalCost: 320000,
            region: 'haryana',
            timestamp: new Date('2024-01-21'),
            status: 'flagged'
        },
        {
            id: 'demo8',
            hospitalId: 'GOVT-KOCHI-008',
            procedureCode: 'ICD-M17.1',
            procedureName: 'Knee Replacement Surgery',
            finalCost: 180000,
            region: 'kerala',
            timestamp: new Date('2024-01-22'),
            status: 'validated'
        }
    ],
    
    samplePolicyClauses: [
        {
            title: "HDFC ERGO Health Insurance Policy",
            text: `This health insurance policy provides coverage under IRDAI guidelines:
            
            Room Rent: Single AC room up to ₹3,000 per day in metro cities, ₹2,000 per day in Tier-2 cities, ₹1,500 per day in Tier-3 cities. ICU charges up to ₹8,000 per day in metros, ₹6,000 per day in non-metros.
            
            Co-pay: Network hospitals require 10% co-pay for individuals below 60 years, 15% for senior citizens. Non-network hospitals attract 30% co-pay plus claim processing delays.
            
            Exclusions: AYUSH treatments covered up to ₹25,000 per policy year. Cosmetic surgery, fertility treatments, and experimental procedures are excluded. Pre-existing diseases have 3-year waiting period, reduced to 1 year for specific ailments.
            
            Sub-limits: Cataract surgery limited to ₹40,000 per eye. Maternity expenses covered from 2nd policy year onwards with ₹75,000 limit. Mental health coverage limited to ₹1,00,000 per policy year.
            
            Claims must be intimated within 24 hours for cashless and within 30 days for reimbursement. TPA processing may take 15-21 days. Zone-based pricing applicable: Metro rates 20% higher than non-metro.`
        },
        {
            title: "Star Health Insurance Comprehensive Plan",
            text: `Star Health & Allied Insurance Policy (IRDAI Reg No: 129):
            
            Accommodation: Private room rent covered up to ₹4,000 per day in metros (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune). ICU/ICCU charges up to ₹10,000 per day with pre-authorization.
            
            Co-payment Structure: 
            - Below 45 years: Nil co-pay for network hospitals
            - 45-60 years: 5% co-pay for network hospitals  
            - Above 60 years: 10% co-pay for network hospitals
            - Non-network hospitals: 20% co-pay regardless of age
            
            Exclusions and Waiting Periods:
            - AYUSH treatment: Covered up to 10% of sum insured per policy year
            - Dental treatment: Only accident-related dental injuries covered
            - Pre-existing diseases: 48 months waiting period (can be reduced to 12 months with medical examination)
            - Specified diseases: 24 months waiting period for cataract, hernia, piles, etc.
            
            Hidden Clauses:
            - Disease-wise sub-limits override sum insured for specific treatments
            - Consumables may not be covered in standard plans
            - Day care procedures require minimum 6-hour hospitalization for coverage
            - Ambulance charges limited to ₹2,000 per hospitalization
            
            Geographic Restrictions: Some procedures may require treatment in specific cities. Emergency treatment covered anywhere in India.`
        },
        {
            title: "LIC Jeevan Arogya Health Plan",
            text: `Life Insurance Corporation Health Insurance Policy:
            
            Room Rent Provisions: General ward accommodation fully covered. Private room charges up to ₹2,500 per day in Class A+ cities, ₹2,000 in Class A cities, ₹1,500 in Class B cities. ICU charges up to 2% of sum insured per day.
            
            Cost Sharing: 
            - Family floater plans: 10% co-pay for all family members
            - Individual plans: 5% co-pay for claims above ₹50,000
            - Senior citizen discount: Reduced co-pay of 5% for policyholders above 65 years
            
            Coverage Limitations:
            - Alternative medicine (AYUSH): Maximum ₹15,000 per policy year
            - Domiciliary treatment: Covered only if hospitalization exceeds 3 days
            - Mental illness: Covered up to ₹50,000 per policy year from 3rd policy year
            - Organ transplant: Donor expenses covered up to ₹5,00,000
            
            Policy Traps:
            - Proportionate deduction applies if room rent exceeds limits
            - Claims may be rejected if treatment can be done as outpatient
            - Pre-authorization mandatory for treatments above ₹30,000
            - Network hospital benefits lost if admission is through emergency without intimation
            - Cooling period of 15 days from policy commencement for accident claims
            
            Grievance: Insurance Ombudsman details - Mumbai: 022-26708602, Delhi: 011-26965048. Free arbitration available as per IRDAI guidelines.`
        },
        {
            title: "ICICI Lombard Complete Health Guard",
            text: `ICICI Lombard General Insurance Company (IRDAI License No. 115):
            
            Hospitalization Benefits:
            - Room rent: Up to 2% of sum insured per day (no sub-limits in plans above ₹10 lakhs)
            - ICU/ICCU: Up to 4% of sum insured per day
            - Surgeon fees: Up to 15% of sum insured
            - Anesthetist fees: Up to 5% of sum insured
            
            Co-payment Details:
            - Plans up to ₹5 lakhs: 10% co-pay for all claims
            - Plans above ₹5 lakhs: No co-pay for network hospitals
            - Non-network hospitals: 20% co-pay + differential billing allowed
            - Age-based co-pay: Additional 5% for policyholders above 65 years
            
            Exclusions and Sub-limits:
            - AYUSH treatment: Inpatient treatment covered up to ₹25,000 per policy year
            - Maternity: Normal delivery ₹40,000, Cesarean ₹60,000 (after 9 months waiting)
            - Eye treatment: Cataract surgery after 2 years, limit ₹25,000 per eye
            - Joint replacement: Covered after 4 years, maximum ₹3,00,000 per joint
            
            Critical Clauses:
            - Automatic restoration of sum insured only if 50% utilized due to one claim
            - Day care procedures covered only in designated day care centers
            - PED waiting period can be waived with 50% loading on premium
            - Consumables covered only in Super Top-up variants
            - Second opinion mandatory for treatments above ₹2,00,000
            
            Service Limitations: Claim settlement within 30 days if all documents complete. TPA services through Meditrina. Cashless facility available in 6,500+ network hospitals across India.`
        }
    ],

    indianHospitalExamples: [
        'AIIMS-DEL-001', 'SGPGI-LKO-002', 'NIMHANS-BLR-003', 'KEM-MUM-004',
        'ASTER-KOC-005', 'FORTIS-GGN-006', 'APOLLO-HYD-007', 'MAX-DEL-008',
        'MANIPAL-BLR-009', 'SANKARA-CHN-010', 'RUBY-KOL-011', 'MEDANTA-GGN-012'
    ],

    commonProcedures: [
        { code: 'ICD-K80.2', name: 'Gallstone Removal Surgery', avgCost: 95000 },
        { code: 'ICD-I25.1', name: 'Coronary Angioplasty', avgCost: 220000 },
        { code: 'ICD-F32.9', name: 'Mental Health Treatment', avgCost: 35000 },
        { code: 'ICD-M17.1', name: 'Knee Replacement Surgery', avgCost: 280000 },
        { code: 'ICD-C78.0', name: 'Cancer Treatment', avgCost: 450000 },
        { code: 'ICD-N18.6', name: 'Kidney Treatment', avgCost: 180000 },
        { code: 'ICD-H25.9', name: 'Cataract Surgery', avgCost: 35000 },
        { code: 'ICD-O80.9', name: 'Normal Delivery', avgCost: 45000 },
        { code: 'ICD-O82.9', name: 'Cesarean Delivery', avgCost: 75000 },
        { code: 'ICD-J44.1', name: 'COPD Treatment', avgCost: 65000 }
    ],

    regionalData: {
        'North India': {
            states: ['delhi', 'punjab', 'haryana', 'uttar-pradesh', 'uttarakhand', 'himachal-pradesh', 'jammu-kashmir'],
            costMultiplier: 1.2,
            majorHospitals: ['AIIMS Delhi', 'Fortis Gurgaon', 'Max Saket', 'SGPGI Lucknow']
        },
        'West India': {
            states: ['maharashtra', 'gujarat', 'rajasthan', 'goa'],
            costMultiplier: 1.15,
            majorHospitals: ['KEM Mumbai', 'Hinduja Mumbai', 'Sterling Rajkot', 'Manipal Goa']
        },
        'South India': {
            states: ['karnataka', 'tamil-nadu', 'kerala', 'andhra-pradesh', 'telangana'],
            costMultiplier: 1.0,
            majorHospitals: ['NIMHANS Bangalore', 'Apollo Chennai', 'Aster Kochi', 'Yashoda Hyderabad']
        },
        'East India': {
            states: ['west-bengal', 'odisha', 'jharkhand', 'bihar'],
            costMultiplier: 0.8,
            majorHospitals: ['Ruby Kolkata', 'AMRI Kolkata', 'IMS BHU Varanasi', 'RIMS Ranchi']
        }
    }
};

// Function to get random Indian hospital ID
function getRandomHospitalId() {
    const prefixes = ['AIIMS', 'ASTER', 'APOLLO', 'FORTIS', 'MAX', 'MEDANTA', 'MANIPAL', 'KEM', 'SGPGI', 'NIMHANS'];
    const cities = ['DEL', 'MUM', 'BLR', 'CHN', 'HYD', 'KOL', 'PUN', 'AHM', 'KOC', 'LKO'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const number = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
    return `${prefix}-${city}-${number}`;
}

// Function to generate random pricing entry
function generateRandomPriceEntry() {
    const procedures = demoData.commonProcedures;
    const regions = ['delhi', 'maharashtra', 'karnataka', 'tamil-nadu', 'uttar-pradesh', 'west-bengal', 'gujarat', 'kerala'];
    
    const procedure = procedures[Math.floor(Math.random() * procedures.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const baseVariation = (Math.random() - 0.5) * 0.4; // ±20% variation
    const cost = Math.round(procedure.avgCost * (1 + baseVariation));
    
    return {
        id: 'random_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        hospitalId: getRandomHospitalId(),
        procedureCode: procedure.code,
        procedureName: procedure.name,
        finalCost: cost,
        region: region,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Last 30 days
        status: Math.abs(baseVariation) > 0.15 ? 'flagged' : 'validated'
    };
}

// Function to initialize demo data in the app
async function initializeDemoData() {
    if (window.clarityCareApp && window.clarityCareApp.db) {
        try {
            console.log('Initializing Indian demo data...');
            
            // Add demo price entries
            for (const entry of demoData.priceEntries) {
                await window.clarityCareApp.db.collection('price_entries').add(entry);
            }
            
            // Add some random entries for variety
            for (let i = 0; i < 15; i++) {
                const randomEntry = generateRandomPriceEntry();
                await window.clarityCareApp.db.collection('price_entries').add(randomEntry);
            }
            
            console.log('Indian demo data initialized successfully');
            
            // Reload price data in the app
            await window.clarityCareApp.loadPriceData();
            
        } catch (error) {
            console.error('Error initializing demo data:', error);
        }
    }
}

// Function to populate policy textarea with sample data
function loadSamplePolicy(index = 0) {
    const textarea = document.getElementById('insuranceClause');
    const promptInput = document.getElementById('analysisPrompt');
    
    if (textarea && demoData.samplePolicyClauses[index]) {
        textarea.value = demoData.samplePolicyClauses[index].text;
        
        // Suggest relevant prompts based on policy
        const suggestedPrompts = [
            "Find hidden charges in room rent limits",
            "Analyze co-payment structure for senior citizens",
            "Identify AYUSH treatment coverage limitations", 
            "Check for zone-based pricing discrimination",
            "Find sub-limits that override sum insured"
        ];
        
        if (promptInput) {
            promptInput.placeholder = suggestedPrompts[index] || suggestedPrompts[0];
        }
    }
}

// Create sample policy buttons with enhanced features
function createSamplePolicyButtons() {
    const policyForm = document.getElementById('policyForm');
    if (!policyForm) return;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'sample-buttons';
    buttonContainer.style.marginBottom = '16px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '8px';
    buttonContainer.style.flexWrap = 'wrap';
    
    demoData.samplePolicyClauses.forEach((clause, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn';
        button.style.fontSize = '12px';
        button.style.padding = '8px 12px';
        button.textContent = `${clause.title.split(' ')[0]} Sample`;
        button.title = clause.title;
        button.onclick = () => loadSamplePolicy(index);
        buttonContainer.appendChild(button);
    });
    
    // Add quick prompt buttons
    const quickPrompts = [
        { text: "Room Charges", prompt: "Find hidden charges in room rent limits" },
        { text: "Co-pay Issues", prompt: "Analyze co-payment structure problems" },
        { text: "Zone Pricing", prompt: "Check for zone-based pricing discrimination" },
        { text: "Sub-limits", prompt: "Find sub-limits that override sum insured" }
    ];
    
    const promptContainer = document.createElement('div');
    promptContainer.style.marginTop = '8px';
    promptContainer.style.display = 'flex';
    promptContainer.style.gap = '6px';
    promptContainer.style.flexWrap = 'wrap';
    
    quickPrompts.forEach(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-secondary';
        button.style.fontSize = '11px';
        button.style.padding = '6px 10px';
        button.textContent = item.text;
        button.onclick = () => {
            const promptInput = document.getElementById('analysisPrompt');
            if (promptInput) promptInput.value = item.prompt;
        };
        promptContainer.appendChild(button);
    });
    
    buttonContainer.appendChild(promptContainer);
    
    // Insert before the form
    policyForm.parentNode.insertBefore(buttonContainer, policyForm);
}

// Add procedure code autocomplete
function setupProcedureAutocomplete() {
    const procedureInput = document.getElementById('procedureCode');
    if (!procedureInput) return;
    
    procedureInput.addEventListener('input', function(e) {
        const value = e.target.value.toLowerCase();
        if (value.length < 2) return;
        
        const matches = demoData.commonProcedures.filter(proc => 
            proc.code.toLowerCase().includes(value) || 
            proc.name.toLowerCase().includes(value)
        );
        
        // Simple autocomplete implementation
        if (matches.length > 0 && !this.dataset.isAutocompleting) {
            const firstMatch = matches[0];
            this.dataset.isAutocompleting = 'true';
            
            // Set the full value temporarily to show suggestion
            const originalValue = this.value;
            this.value = `${firstMatch.code} (${firstMatch.name})`;
            this.setSelectionRange(originalValue.length, this.value.length);
            
            setTimeout(() => {
                delete this.dataset.isAutocompleting;
            }, 100);
        }
    });
    
    procedureInput.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'Enter') {
            delete this.dataset.isAutocompleting;
        }
    });
}

// Generate real-time updates for history
function startRealTimeUpdates() {
    setInterval(() => {
        if (Math.random() < 0.3 && window.clarityCareApp) { // 30% chance every interval
            const newEntry = generateRandomPriceEntry();
            window.clarityCareApp.priceData.push(newEntry);
            window.clarityCareApp.updateHistoryDisplay();
            window.clarityCareApp.updateStatistics();
        }
    }, 15000); // Every 15 seconds
}

// Initialize demo features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create sample policy buttons
    createSamplePolicyButtons();
    
    // Setup procedure autocomplete
    setupProcedureAutocomplete();
    
    // Start real-time updates after app initialization
    setTimeout(startRealTimeUpdates, 5000);
    
    // Add demo data initialization button (for testing)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const container = document.querySelector('.hero');
        const demoButton = document.createElement('button');
        demoButton.className = 'btn btn-secondary';
        demoButton.style.marginTop = '20px';
        demoButton.textContent = '🇮🇳 Load Indian Demo Data (Dev Only)';
        demoButton.onclick = initializeDemoData;
        container.appendChild(demoButton);
    }
});

// Export for use in other files
window.demoData = demoData;
window.initializeDemoData = initializeDemoData;
window.loadSamplePolicy = loadSamplePolicy;
window.generateRandomPriceEntry = generateRandomPriceEntry;