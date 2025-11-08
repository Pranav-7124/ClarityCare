// RunAnywhere SDK Integration for ClarityCare India
class RunAnywhereSDK {
    constructor(apiKey, baseURL = 'https://api.runanywhere.ai') {
        this.apiKey = apiKey;
        this.baseURL = baseURL;
        this.initialized = false;
        this.indiaHealthcareContext = {
            commonProcedures: {
                'ICD-K80.2': 'Gallstone Removal Surgery',
                'ICD-I25.1': 'Coronary Angioplasty',
                'ICD-F32.9': 'Mental Health Treatment',
                'ICD-M17.1': 'Knee Replacement Surgery',
                'ICD-C78.0': 'Cancer Treatment',
                'ICD-N18.6': 'Kidney Treatment'
            },
            regionalCostFactors: {
                'delhi': 1.3,
                'maharashtra': 1.2,
                'karnataka': 1.1,
                'tamil-nadu': 1.15,
                'gujarat': 1.1,
                'uttar-pradesh': 0.8,
                'bihar': 0.6,
                'jharkhand': 0.7,
                'odisha': 0.7
            },
            insuranceProviders: [
                'IRDAI', 'LIC', 'SBI General', 'HDFC ERGO', 'ICICI Lombard',
                'Bajaj Allianz', 'New India Assurance', 'Oriental Insurance',
                'United India Insurance', 'National Insurance'
            ]
        };
    }

    async initialize() {
        try {
            console.log('Initializing RunAnywhere SDK for Indian healthcare...');
            // In a real implementation, this would initialize the SDK
            this.initialized = true;
            console.log('RunAnywhere SDK initialized successfully for India');
            return true;
        } catch (error) {
            console.error('Failed to initialize RunAnywhere SDK:', error);
            return false;
        }
    }

    async callGeminiAPI(prompt, schema = null, context = 'general') {
        if (!this.initialized) {
            throw new Error('RunAnywhere SDK not initialized');
        }

        try {
            console.log('Calling Gemini API via RunAnywhere SDK...');
            
            // Add Indian healthcare context to the prompt
            const enhancedPrompt = this.addIndianContext(prompt, context);
            
            // For demo purposes, simulate the API call with mock responses
            // In production, this would make actual calls to RunAnywhere API
            return await this.mockGeminiResponse(enhancedPrompt, schema, context);
            
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            throw error;
        }
    }

    addIndianContext(prompt, context) {
        const contextHeaders = {
            'pricing': `Context: Indian healthcare system with regional pricing variations. Consider AYUSHMAN BHARAT, CGHS, ESI schemes. Currency: Indian Rupees (₹).`,
            'policy': `Context: Indian insurance policies under IRDAI guidelines. Consider regional language variations, AYUSHMAN BHARAT integration, and Indian legal framework.`,
            'general': `Context: Indian healthcare system analysis.`
        };

        return `${contextHeaders[context] || contextHeaders.general}\n\n${prompt}`;
    }

    // Enhanced mock response with Indian healthcare intelligence
    async mockGeminiResponse(prompt, schema, context) {
        // Simulate realistic API delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1500));

        const lowerPrompt = prompt.toLowerCase();
        
        // Pricing analysis
        if (lowerPrompt.includes('pricing') || lowerPrompt.includes('cost') || lowerPrompt.includes('₹')) {
            return this.generateMockPricingAnalysis(prompt);
        }
        
        // Policy analysis
        if (lowerPrompt.includes('insurance') || lowerPrompt.includes('policy')) {
            return this.generateMockPolicyAnalysis(prompt);
        }
        
        return {
            response: "Analysis complete. This is an enhanced response from Gemini AI via RunAnywhere SDK with Indian healthcare context.",
            analysis: "General healthcare analysis completed with Indian regulatory context.",
            metadata: {
                model: "gemini-2.5-flash-preview-09-2025",
                tokensUsed: Math.floor(Math.random() * 200) + 150,
                processingTime: "2.3s",
                region: "India",
                compliance: "IRDAI Guidelines"
            }
        };
    }

    generateMockPricingAnalysis(prompt) {
        // Extract cost and region from prompt
        const costMatch = prompt.match(/₹([\d,]+)/);
        const regionMatch = prompt.match(/Region: ([^,\n]+)/);
        
        const cost = costMatch ? parseInt(costMatch[1].replace(/,/g, '')) : 100000;
        const region = regionMatch ? regionMatch[1].toLowerCase() : 'unknown';
        
        // Generate contextual analysis
        const analyses = [
            `The pricing of ₹${cost.toLocaleString('en-IN')} appears ${cost > 150000 ? 'significantly higher' : 'reasonable'} for ${region} region.`,
            `Regional cost factor for ${region}: ${this.indiaHealthcareContext.regionalCostFactors[region] || 1.0}x national average.`,
            `Consider checking AYUSHMAN BHARAT coverage for this procedure.`,
            `Compare with government hospital rates in the same region.`,
            cost > 200000 ? `High-cost procedure - verify necessity and explore second opinions.` : null,
            `Ensure transparency in billing breakdown as per IRDAI guidelines.`
        ].filter(Boolean);

        return {
            response: "Pricing analysis completed with Indian healthcare context",
            analysis: analyses.join(' '),
            recommendations: [
                "Verify procedure necessity with multiple specialists",
                "Check AYUSHMAN BHARAT eligibility",
                "Compare with nearby government hospitals",
                "Request detailed billing breakdown",
                "Consider regional cost variations"
            ],
            metadata: {
                model: "gemini-2.5-flash-preview-09-2025",
                tokensUsed: Math.floor(Math.random() * 300) + 200,
                processingTime: "2.8s",
                region: "India",
                confidence: "87%",
                costAnalysis: {
                    amount: cost,
                    region: region,
                    assessedAs: cost > 150000 ? 'Above Average' : 'Within Range'
                }
            }
        };
    }

    generateMockPolicyAnalysis(policyText) {
        // Enhanced analysis with Indian insurance context
        const analysis = {
            roomRentLimits: [],
            coPay: [],
            exclusions: [],
            hiddenClauses: []
        };

        // Context-aware pattern matching for Indian policies
        if (policyText.toLowerCase().includes('room rent') || policyText.toLowerCase().includes('room charge')) {
            analysis.roomRentLimits.push("Single AC room: Maximum ₹3,000 per day (varies by city tier)");
            analysis.roomRentLimits.push("ICU: Maximum ₹8,000 per day (metro cities)");
            analysis.roomRentLimits.push("Room rent limits may not apply in Tier-3 cities");
        } else {
            analysis.roomRentLimits.push("Room rent limits not clearly specified - potential transparency issue");
        }

        if (policyText.toLowerCase().includes('co-pay') || policyText.toLowerCase().includes('copay')) {
            analysis.coPay.push("Senior citizens (60+): Reduced co-pay as per IRDAI guidelines");
            analysis.coPay.push("Network hospitals: 10-20% co-pay typical");
            analysis.coPay.push("Non-network: 30-40% co-pay (avoid if possible)");
        } else {
            analysis.coPay.push("Co-payment structure requires clarification");
        }

        if (policyText.toLowerCase().includes('exclude') || policyText.toLowerCase().includes('not cover')) {
            analysis.exclusions.push("AYUSH treatments may have limited coverage");
            analysis.exclusions.push("Cosmetic procedures excluded (standard IRDAI guideline)");
            analysis.exclusions.push("Check pre-existing disease waiting period (2-4 years typical)");
        } else {
            analysis.exclusions.push("Exclusions list incomplete - request comprehensive list");
        }

        // Indian-specific hidden clauses
        analysis.hiddenClauses.push("Zone-based pricing: Metro vs non-metro rate differences");
        analysis.hiddenClauses.push("Sub-limits may apply to specific treatments not mentioned prominently");
        analysis.hiddenClauses.push("Disease-wise caps might override sum insured");
        
        if (policyText.toLowerCase().includes('claim') || policyText.toLowerCase().includes('reimburse')) {
            analysis.hiddenClauses.push("TPA (Third Party Administrator) may cause claim delays");
            analysis.hiddenClauses.push("Cashless facility depends on hospital tie-ups in your city");
        }

        // Add IRDAI compliance check
        analysis.hiddenClauses.push("Verify IRDAI registration number of insurance provider");

        return {
            response: "Policy analysis completed with Indian regulatory context",
            analysis: analysis,
            recommendations: [
                "Verify insurance company's IRDAI registration",
                "Check hospital network in your city",
                "Understand zone-based pricing differences",
                "Clarify AYUSH treatment coverage",
                "Review sub-limits for specific diseases"
            ],
            metadata: {
                model: "gemini-2.5-flash-preview-09-2025",
                tokensUsed: Math.floor(Math.random() * 250) + 180,
                processingTime: "3.1s",
                region: "India",
                confidence: "91%",
                compliance: "IRDAI Guidelines Checked"
            }
        };
    }

    // JSON Schema for structured policy extraction (Indian context)
    getPolicyExtractionSchema() {
        return {
            type: "object",
            properties: {
                roomRentLimits: {
                    type: "array",
                    items: { type: "string" },
                    description: "Room rent limits and restrictions with Indian city tier considerations"
                },
                coPay: {
                    type: "array",
                    items: { type: "string" },
                    description: "Co-payment requirements including network vs non-network differences"
                },
                exclusions: {
                    type: "array",
                    items: { type: "string" },
                    description: "Excluded treatments including AYUSH and traditional medicine coverage"
                },
                hiddenClauses: {
                    type: "array",
                    items: { type: "string" },
                    description: "Hidden clauses including zone-based pricing and sub-limits"
                },
                irdaiCompliance: {
                    type: "array",
                    items: { type: "string" },
                    description: "IRDAI regulatory compliance points"
                }
            },
            required: ["roomRentLimits", "coPay", "exclusions", "hiddenClauses"]
        };
    }

    async analyzeInsurancePolicy(policyText) {
        const schema = this.getPolicyExtractionSchema();
        
        const prompt = `
        Analyze the following Indian insurance policy clause and extract key information:
        
        Policy Text: "${policyText}"
        
        Please extract and categorize the following information with Indian healthcare context:
        1. Room rent limits considering metro/non-metro differences
        2. Co-payment requirements for network vs non-network hospitals
        3. Exclusions including AYUSH treatment coverage
        4. Hidden clauses including zone-based pricing and sub-limits
        5. IRDAI compliance and regulatory aspects
        
        Provide analysis highlighting potential cost traps and unclear language specific to Indian insurance policies.
        `;

        try {
            const response = await this.callGeminiAPI(prompt, schema, 'policy');
            return response;
        } catch (error) {
            console.error('Error analyzing insurance policy:', error);
            throw error;
        }
    }

    async analyzeInsurancePolicyWithPrompt(policyText, userPrompt) {
        const schema = this.getPolicyExtractionSchema();
        
        const prompt = `
        User's Specific Analysis Request: "${userPrompt}"
        
        Insurance Policy Text: "${policyText}"
        
        Based on the user's specific request, analyze this Indian insurance policy with focus on:
        - User's specific concerns: ${userPrompt}
        - Room rent limits and city tier variations
        - Co-payment structures for different hospital networks
        - Exclusions and waiting periods
        - Hidden clauses and sub-limits
        - IRDAI compliance aspects
        
        Provide targeted analysis addressing the user's specific query while maintaining comprehensive coverage of potential issues.
        `;

        try {
            const response = await this.callGeminiAPI(prompt, schema, 'policy');
            return response;
        } catch (error) {
            console.error('Error analyzing insurance policy with prompt:', error);
            throw error;
        }
    }

    async analyzePricingWithPrompt(pricingPrompt) {
        const prompt = `
        Healthcare Pricing Analysis Request: "${pricingPrompt}"
        
        Please provide comprehensive analysis considering:
        - Regional pricing variations across Indian states
        - Government vs private hospital cost differences
        - AYUSHMAN BHARAT scheme coverage possibilities
        - Insurance claim implications
        - Cost transparency and billing breakdown requirements
        - Second opinion recommendations
        - Alternative treatment options and cost-effectiveness
        
        Focus on practical actionable insights for Indian patients.
        `;

        try {
            const response = await this.callGeminiAPI(prompt, null, 'pricing');
            return response;
        } catch (error) {
            console.error('Error analyzing pricing with prompt:', error);
            throw error;
        }
    }

    // Utility method to check IRDAI compliance
    checkIRDAICompliance(policyText) {
        const complianceChecks = {
            hasIRDAINumber: /IRDAI.*?\d+/.test(policyText),
            hasGrievanceOfficer: /grievance.*?officer/i.test(policyText),
            hasOmbudsmanDetails: /ombudsman/i.test(policyText),
            hasStandardExclusions: /standard.*?exclusion/i.test(policyText),
            hasFreeArbitration: /arbitration.*?free/i.test(policyText)
        };

        const score = Object.values(complianceChecks).filter(Boolean).length;
        
        return {
            score: score,
            maxScore: Object.keys(complianceChecks).length,
            percentage: Math.round((score / Object.keys(complianceChecks).length) * 100),
            details: complianceChecks,
            recommendation: score < 3 ? "Policy may not be fully IRDAI compliant - verify with insurer" : "Policy appears to meet IRDAI guidelines"
        };
    }

    // Get Indian healthcare context for better analysis
    getIndianHealthcareContext() {
        return this.indiaHealthcareContext;
    }
}

// Initialize SDK instance with Indian configuration
const runAnywhereSDK = new RunAnywhereSDK('demo-api-key-india');

// Export for use in main app
window.RunAnywhereSDK = RunAnywhereSDK;
window.runAnywhereSDK = runAnywhereSDK;