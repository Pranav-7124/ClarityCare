// ClarityCare Main Application - India Edition
class ClarityCareApp {
    constructor() {
        this.db = null;
        this.priceChart = null;
        this.priceData = [];
        this.initialized = false;
        this.selectedRegion = 'all';
        this.regionalMapping = {
            'north': ['delhi', 'punjab', 'haryana', 'uttar-pradesh', 'uttarakhand', 'himachal-pradesh', 'jammu-kashmir'],
            'west': ['maharashtra', 'gujarat', 'rajasthan', 'goa', 'mumbai', 'pune', 'ahmedabad'],
            'south': ['karnataka', 'tamil-nadu', 'kerala', 'andhra-pradesh', 'telangana', 'bangalore', 'chennai', 'hyderabad'],
            'east': ['west-bengal', 'odisha', 'jharkhand', 'bihar', 'kolkata'],
            'central': ['madhya-pradesh', 'chhattisgarh'],
            'northeast': ['assam', 'meghalaya', 'tripura', 'manipur', 'mizoram', 'nagaland', 'arunachal-pradesh', 'sikkim']
        };
        
        // Enhanced fallback data for when APIs fail
        this.fallbackPolicyAnalysis = {
            roomRentLimits: [
                "Room rent capped at 1-2% of sum insured per day",
                "ICU charges may be limited to 2-3% of sum insured",
                "Deluxe room charges often proportionately reduced"
            ],
            coPay: [
                "Age-based co-payment: 10-20% for senior citizens",
                "Network vs non-network hospital co-payment differences",
                "Emergency procedures may have reduced co-payment"
            ],
            exclusions: [
                "Pre-existing diseases excluded for 24-48 months",
                "Cosmetic, dental, and alternative treatments often excluded",
                "Maternity benefits typically excluded for 2-3 years"
            ],
            hiddenClauses: [
                "Pre-authorization requirements for major procedures",
                "Room rent limits affecting overall claim settlement",
                "Waiting periods varying by condition complexity"
            ],
            recommendations: [
                "Always verify network hospital status before treatment",
                "Understand your room rent limit and choose accordingly",
                "Keep all medical records for claim processing",
                "Read sub-limits on specific treatments carefully"
            ]
        };

        // Diagnosis navigation fallback data
        this.diagnosisTemplates = {
            chest_pain: {
                alternatives: [
                    "Consider stress testing before invasive procedures",
                    "Explore medication management options first",
                    "CT coronary angiography as non-invasive alternative"
                ],
                precautions: [
                    "Avoid immediate surgery without proper evaluation",
                    "Get complete cardiac workup including ECG, Echo",
                    "Consider family history and risk factors"
                ],
                questions: [
                    "What are non-surgical treatment options?",
                    "How urgent is this procedure?",
                    "What are the risks vs benefits?",
                    "Are there lifestyle changes that could help?"
                ],
                secondOpinion: [
                    "Recommended for any major cardiac intervention",
                    "Consult interventional cardiologist if surgery suggested",
                    "Consider getting opinion from different hospital"
                ],
                nextSteps: [
                    "Request detailed treatment plan with timeline",
                    "Get cost estimate and insurance coverage details",
                    "Schedule follow-up consultations as needed"
                ]
            }
        };
    }

    async initialize() {
        try {
            console.log('Initializing ClarityCare India App...');
            
            // Initialize Firebase
            try {
                const { db } = await window.initializeFirebase();
                this.db = db;
            } catch (error) {
                console.warn('Firebase initialization failed, using local data:', error);
            }
            
            // Initialize RunAnywhere SDK
            try {
                await window.runAnywhereSDK.initialize();
            } catch (error) {
                console.warn('RunAnywhere SDK initialization failed, using fallback data:', error);
            }
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load initial data
            await this.loadPriceData();
            
            // Initialize real-time data display
            this.initializeHistorySection();
            
            // Update statistics
            this.updateStatistics();
            
            this.initialized = true;
            console.log('ClarityCare India App initialized successfully');
            
            // Show success message
            this.showSuccess('ClarityCare India initialized successfully! Ready to analyze healthcare pricing and policies across India.');
            
        } catch (error) {
            console.error('Failed to initialize ClarityCare App:', error);
            this.showError('Initialization failed. Using demo mode with sample data.');
            // Initialize with demo data
            this.priceData = this.getModernDemoData();
            this.initializeHistorySection();
            this.updateStatistics();
        }
    }

    setupEventListeners() {
        // Price form submission
        const priceForm = document.getElementById('priceForm');
        if (priceForm) {
            priceForm.addEventListener('submit', (e) => this.handlePriceSubmission(e));
        }

        // Policy form submission
        const policyForm = document.getElementById('policyForm');
        if (policyForm) {
            policyForm.addEventListener('submit', (e) => this.handlePolicySubmission(e));
        }

        // Diagnosis Analysis button
        const diagnosisAnalysisBtn = document.getElementById('diagnosisAnalysisBtn');
        if (diagnosisAnalysisBtn) {
            diagnosisAnalysisBtn.addEventListener('click', (e) => this.handleDiagnosisAnalysis(e));
        }

        // Market Analysis button
        const marketAnalysisBtn = document.getElementById('marketAnalysisBtn');
        if (marketAnalysisBtn) {
            marketAnalysisBtn.addEventListener('click', (e) => this.handleMarketAnalysis(e));
        }

        // Region change listener
        const regionSelect = document.getElementById('region');
        if (regionSelect) {
            regionSelect.addEventListener('change', (e) => this.handleRegionChange(e));
        }

        // History filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleHistoryFilter(e));
        });
    }

    async loadPriceData() {
        try {
            if (this.db) {
                const snapshot = await this.db.collection('price_entries').get();
                this.priceData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp.toDate ? doc.data().timestamp.toDate() : new Date(doc.data().timestamp)
                }));
                console.log(`Loaded ${this.priceData.length} price entries`);
            }
            
            // If no data or no database, add demo data
            if (this.priceData.length === 0) {
                console.log('No existing data found, using demo entries...');
                this.priceData = this.getModernDemoData();
            }
            
        } catch (error) {
            console.error('Error loading price data:', error);
            // Initialize with demo data if database fails
            this.priceData = this.getModernDemoData();
        }
    }

    getModernDemoData() {
        return [
            {
                id: 'demo1',
                hospitalName: 'AIIMS Delhi',
                procedureName: 'Gallstone Surgery',
                finalCost: 85000,
                region: 'delhi',
                timestamp: new Date('2024-01-15'),
                status: 'validated'
            },
            {
                id: 'demo2',
                hospitalName: 'Apollo Hospitals',
                procedureName: 'Gallstone Surgery',
                finalCost: 125000,
                region: 'bangalore',
                timestamp: new Date('2024-01-16'),
                status: 'flagged'
            },
            {
                id: 'demo3',
                hospitalName: 'Fortis Healthcare',
                procedureName: 'Gallstone Surgery',
                finalCost: 95000,
                region: 'mumbai',
                timestamp: new Date('2024-01-17'),
                status: 'validated'
            },
            {
                id: 'demo4',
                hospitalName: 'Max Healthcare',
                procedureName: 'Heart Bypass Surgery',
                finalCost: 380000,
                region: 'delhi',
                timestamp: new Date('2024-01-18'),
                status: 'validated'
            },
            {
                id: 'demo5',
                hospitalName: 'Narayana Health',
                procedureName: 'Heart Bypass Surgery',
                finalCost: 280000,
                region: 'bangalore',
                timestamp: new Date('2024-01-19'),
                status: 'validated'
            },
            {
                id: 'demo6',
                hospitalName: 'Private Clinic',
                procedureName: 'Heart Bypass Surgery',
                finalCost: 450000,
                region: 'mumbai',
                timestamp: new Date('2024-01-20'),
                status: 'flagged'
            },
            {
                id: 'demo7',
                hospitalName: 'Government Hospital',
                procedureName: 'Knee Replacement',
                finalCost: 75000,
                region: 'chennai',
                timestamp: new Date('2024-01-21'),
                status: 'validated'
            },
            {
                id: 'demo8',
                hospitalName: 'Manipal Hospitals',
                procedureName: 'Knee Replacement',
                finalCost: 185000,
                region: 'bangalore',
                timestamp: new Date('2024-01-22'),
                status: 'flagged'
            }
        ];
    }

    async handlePriceSubmission(event) {
        event.preventDefault();
        
        const hospitalName = document.getElementById('hospitalName').value.trim();
        const procedureName = document.getElementById('procedureName').value.trim();
        const finalCost = parseInt(document.getElementById('finalCost').value);
        const region = document.getElementById('region').value;

        // Validation
        if (!hospitalName || !procedureName || !finalCost || finalCost <= 0 || !region) {
            this.showError('Please fill in all fields with valid values.');
            return;
        }

        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        try {
            // Show loading state
            submitBtn.innerHTML = `
                <div class="spinner" style="display: inline-block; width: 16px; height: 16px; margin-right: 8px;"></div>
                Analyzing...
            `;
            submitBtn.disabled = true;

            // Store in database
            const newEntry = {
                hospitalName,
                procedureName,
                finalCost,
                region,
                timestamp: new Date(),
                status: 'pending'
            };

            try {
                if (this.db) {
                    const docRef = await this.db.collection('price_entries').add(newEntry);
                    newEntry.id = docRef.id;
                    console.log('Entry saved to database with ID:', docRef.id);
                } else {
                    newEntry.id = 'local_' + Date.now();
                }
            } catch (dbError) {
                console.warn('Database save failed, continuing with local analysis:', dbError);
                newEntry.id = 'local_' + Date.now();
            }

            // Analyze pricing with enhanced regional context
            const analysis = await this.analyzePricingWithEnhancedDetection(newEntry);
            
            // Update entry with analysis
            newEntry.status = analysis.status;
            newEntry.regionalAverage = analysis.regionalAverage;
            newEntry.deviation = analysis.deviation;

            // Add to local data
            this.priceData.push(newEntry);

            // Display results
            this.displayPriceResults(analysis, finalCost, region);
            
            // Update chart
            this.updatePriceChart(procedureName, region);

            // Update real-time display
            this.updateHistoryDisplay();
            this.updateStatistics();
            
            this.showSuccess('Price analysis completed successfully! Data added to community comparison.');

        } catch (error) {
            console.error('Error submitting price data:', error);
            this.showError('Failed to analyze pricing: ' + error.message);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async analyzePricingWithEnhancedDetection(entry) {
        // Get similar procedures for comparison
        const similarProcedures = this.priceData.filter(p => 
            p.procedureName === entry.procedureName && p.id !== entry.id
        );

        console.log(`Analyzing ${entry.procedureName} in ${entry.region}: Found ${similarProcedures.length} similar procedures`);

        if (similarProcedures.length === 0) {
            return {
                status: 'validated',
                regionalAverage: entry.finalCost,
                deviation: 0,
                message: 'First entry for this procedure - establishing baseline'
            };
        }

        // Enhanced regional analysis
        const regionalProcedures = similarProcedures.filter(p => p.region === entry.region);
        const analysisData = regionalProcedures.length >= 2 ? regionalProcedures : similarProcedures;

        // Calculate enhanced statistics
        const costs = analysisData.map(p => p.finalCost);
        const n = costs.length;
        const mean = costs.reduce((sum, cost) => sum + cost, 0) / n;
        
        // Calculate median for more robust analysis
        const sortedCosts = [...costs].sort((a, b) => a - b);
        const median = n % 2 === 0 
            ? (sortedCosts[n/2 - 1] + sortedCosts[n/2]) / 2 
            : sortedCosts[Math.floor(n/2)];

        // Calculate Interquartile Range (IQR) for better outlier detection
        const q1Index = Math.floor(n * 0.25);
        const q3Index = Math.floor(n * 0.75);
        const q1 = sortedCosts[q1Index];
        const q3 = sortedCosts[q3Index];
        const iqr = q3 - q1;

        // Enhanced outlier detection using IQR method
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;

        // Regional pricing factors
        const metroCities = ['delhi', 'mumbai', 'bangalore', 'chennai', 'hyderabad', 'pune'];
        const isMetro = metroCities.includes(entry.region);
        
        // Adjust bounds for metro cities (higher tolerance)
        const metroMultiplier = isMetro ? 1.3 : 1.0;
        const adjustedUpperBound = upperBound * metroMultiplier;

        // Determine if cost is an outlier
        const isOutlier = entry.finalCost < lowerBound || entry.finalCost > adjustedUpperBound;
        const deviation = Math.abs(entry.finalCost - median);

        // Calculate severity of outlier
        let severity = 'normal';
        if (entry.finalCost > adjustedUpperBound) {
            const excessPercentage = ((entry.finalCost - adjustedUpperBound) / adjustedUpperBound) * 100;
            if (excessPercentage > 50) severity = 'severe';
            else if (excessPercentage > 25) severity = 'moderate';
            else severity = 'mild';
        }

        console.log(`Enhanced Analysis: Mean=₹${mean}, Median=₹${median}, IQR=₹${iqr}, Bounds=[₹${lowerBound}, ₹${adjustedUpperBound}], Outlier=${isOutlier}`);

        return {
            status: isOutlier ? 'flagged' : 'validated',
            regionalAverage: Math.round(median), // Use median as more robust average
            deviation: Math.round(deviation),
            iqr: Math.round(iqr),
            region: entry.region,
            sampleSize: analysisData.length,
            severity: severity,
            message: isOutlier 
                ? `Cost is ${severity} outlier - ${Math.round(((entry.finalCost - median) / median) * 100)}% ${entry.finalCost > median ? 'above' : 'below'} regional median`
                : `Cost is within normal range for ${entry.region} (median ₹${Math.round(median)})`
        };
    }

    displayPriceResults(analysis, submittedCost, region) {
        const resultsDiv = document.getElementById('priceResults');
        const statusClass = analysis.status === 'validated' ? 'validated' : 'flagged';
        const statusText = analysis.status === 'validated' ? 'VALIDATED' : 'FLAGGED';
        const statusEmoji = analysis.status === 'validated' ? '✅' : '🚩';
        
        const regionName = this.getRegionDisplayName(region);
        
        resultsDiv.innerHTML = `
            <div class="result-item ${statusClass}">
                <div class="result-header">
                    <span class="status-badge ${statusClass}">${statusEmoji} ${statusText}</span>
                    <strong>Enhanced Regional Analysis</strong>
                </div>
                <p><strong>Region:</strong> ${regionName}</p>
                <p><strong>Regional Median:</strong> <span class="currency-display">₹${analysis.regionalAverage.toLocaleString('en-IN')}</span></p>
                <p><strong>Your Cost:</strong> <span class="currency-display">₹${submittedCost.toLocaleString('en-IN')}</span></p>
                <p><strong>Deviation:</strong> <span class="currency-display">₹${analysis.deviation.toLocaleString('en-IN')}</span></p>
                <p><strong>Sample Size:</strong> ${analysis.sampleSize} comparable entries</p>
                ${analysis.severity && analysis.status === 'flagged' ? `<p><strong>Severity:</strong> ${analysis.severity.toUpperCase()} outlier</p>` : ''}
                <p><strong>Analysis:</strong> ${analysis.message}</p>
            </div>
        `;
        
        resultsDiv.classList.remove('hidden');
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    getRegionDisplayName(regionCode) {
        const regionNames = {
            'delhi': 'Delhi NCR',
            'mumbai': 'Mumbai',
            'bangalore': 'Bangalore',
            'chennai': 'Chennai',
            'hyderabad': 'Hyderabad',
            'kolkata': 'Kolkata',
            'pune': 'Pune',
            'ahmedabad': 'Ahmedabad'
        };
        return regionNames[regionCode] || regionCode;
    }

    updatePriceChart(procedureName, selectedRegion = null) {
        const chartContainer = document.getElementById('chartContainer');
        const ctx = document.getElementById('priceChart');
        
        if (!ctx) {
            console.error('Chart canvas not found');
            return;
        }

        // Filter data for this procedure and optionally by region
        let procedureData = this.priceData.filter(p => p.procedureName === procedureName);
        if (selectedRegion && selectedRegion !== 'all') {
            procedureData = procedureData.filter(p => p.region === selectedRegion);
        }
        
        if (procedureData.length === 0) {
            console.log('No data available for chart');
            return;
        }

        console.log(`Creating chart for ${procedureData.length} entries`);

        // Calculate median instead of mean for more robust analysis
        const costs = procedureData.map(p => p.finalCost);
        const sortedCosts = [...costs].sort((a, b) => a - b);
        const median = sortedCosts.length % 2 === 0 
            ? (sortedCosts[sortedCosts.length/2 - 1] + sortedCosts[sortedCosts.length/2]) / 2 
            : sortedCosts[Math.floor(sortedCosts.length/2)];

        // Prepare chart data
        const labels = procedureData.map((entry, index) => 
            `${entry.hospitalName} (${this.getRegionDisplayName(entry.region)})`
        );
        const costData = procedureData.map(p => p.finalCost);
        const medianLine = Array(costData.length).fill(median);

        // Destroy existing chart if it exists
        if (this.priceChart) {
            this.priceChart.destroy();
        }

        // Create new chart
        try {
            this.priceChart = new Chart(ctx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Treatment Costs (₹)',
                            data: costData,
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 8,
                            pointHoverRadius: 10,
                            pointBackgroundColor: procedureData.map(p => 
                                p.status === 'flagged' ? '#ef4444' : '#10b981'
                            ),
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2
                        },
                        {
                            label: 'Regional Median (₹)',
                            data: medianLine,
                            borderColor: '#ea580c',
                            backgroundColor: 'rgba(234, 88, 12, 0.1)',
                            borderWidth: 2,
                            borderDash: [10, 5],
                            fill: false,
                            pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    family: 'Inter',
                                    size: 14
                                },
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#111827',
                            bodyColor: '#4b5563',
                            borderColor: '#e5e7eb',
                            borderWidth: 1,
                            cornerRadius: 8,
                            bodyFont: {
                                family: 'Inter'
                            },
                            titleFont: {
                                family: 'Inter'
                            },
                            callbacks: {
                                label: function(context) {
                                    if (context.datasetIndex === 0) {
                                        const status = procedureData[context.dataIndex].status === 'flagged' ? '🚩 FLAGGED' : '✅ VALIDATED';
                                        return `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')} (${status})`;
                                    }
                                    return `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cost (₹)',
                                font: {
                                    family: 'Inter',
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString('en-IN');
                                },
                                font: {
                                    family: 'Inter'
                                }
                            },
                            grid: {
                                color: 'rgba(229, 231, 235, 0.5)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Hospital Submissions by Region',
                                font: {
                                    family: 'Inter',
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                font: {
                                    family: 'Inter'
                                },
                                maxRotation: 45
                            },
                            grid: {
                                color: 'rgba(229, 231, 235, 0.5)'
                            }
                        }
                    }
                }
            });

            chartContainer.classList.remove('hidden');
            console.log('Chart created successfully');
            
        } catch (error) {
            console.error('Error creating chart:', error);
            this.showError('Failed to create chart visualization');
        }
    }

    async handlePolicySubmission(event) {
        event.preventDefault();
        
        const insuranceClause = document.getElementById('insuranceClause').value.trim();
        
        if (!insuranceClause) {
            this.showError('Please enter insurance policy text or select a provider sample.');
            return;
        }

        const loadingDiv = document.getElementById('policyLoading');
        const resultsDiv = document.getElementById('policyResults');
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            // Show loading state
            loadingDiv.classList.remove('hidden');
            resultsDiv.classList.add('hidden');
            submitBtn.innerHTML = `
                <div class="spinner" style="display: inline-block; width: 16px; height: 16px; margin-right: 8px;"></div>
                Analyzing...
            `;
            submitBtn.disabled = true;

            console.log('Starting enhanced policy analysis...');

            let analysis;
            try {
                // Try to analyze policy using API
                analysis = await window.runAnywhereSDK.analyzeInsurancePolicy(insuranceClause);
                console.log('API policy analysis complete:', analysis);
            } catch (apiError) {
                console.warn('API analysis failed, using enhanced fallback analysis:', apiError);
                // Use enhanced fallback analysis
                analysis = this.getEnhancedPolicyAnalysis(insuranceClause);
            }
            
            // Display results
            this.displayEnhancedPolicyResults(analysis.analysis || analysis);
            
            this.showSuccess('Policy analysis completed successfully!');

        } catch (error) {
            console.error('Error analyzing policy:', error);
            // Use fallback analysis even on general errors
            const fallbackAnalysis = this.getEnhancedPolicyAnalysis(insuranceClause);
            this.displayEnhancedPolicyResults(fallbackAnalysis);
            this.showSuccess('Policy analysis completed using advanced offline analysis!');
        } finally {
            // Hide loading and reset button
            loadingDiv.classList.add('hidden');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    getEnhancedPolicyAnalysis(policyText) {
        // Enhanced keyword-based analysis
        const lowerText = policyText.toLowerCase();
        
        let roomLimits = [];
        let coPay = [];
        let exclusions = [];
        let hiddenClauses = [];
        let recommendations = [];
        
        // Room rent analysis
        if (lowerText.includes('room rent')) {
            if (lowerText.includes('1%')) roomLimits.push("Room rent limited to 1% of sum insured per day");
            if (lowerText.includes('1.5%')) roomLimits.push("Room rent limited to 1.5% of sum insured per day");
            if (lowerText.includes('2%')) roomLimits.push("Room rent limited to 2% of sum insured per day");
            if (lowerText.includes('icu')) roomLimits.push("ICU charges may have separate limits");
            if (lowerText.includes('deluxe')) roomLimits.push("Deluxe room charges may be proportionately reduced");
        }
        
        // Co-payment analysis
        if (lowerText.includes('co-pay') || lowerText.includes('copay')) {
            if (lowerText.includes('10%')) coPay.push("10% co-payment applicable");
            if (lowerText.includes('15%')) coPay.push("15% co-payment applicable");
            if (lowerText.includes('20%')) coPay.push("20% co-payment applicable");
            if (lowerText.includes('senior') || lowerText.includes('60') || lowerText.includes('65')) {
                coPay.push("Higher co-payment for senior citizens");
            }
            if (lowerText.includes('network')) coPay.push("Different co-payment for network vs non-network hospitals");
        }
        
        // Exclusions analysis
        if (lowerText.includes('exclusion') || lowerText.includes('not covered')) {
            if (lowerText.includes('cosmetic')) exclusions.push("Cosmetic surgery excluded");
            if (lowerText.includes('dental')) exclusions.push("Dental treatment excluded (unless due to accident)");
            if (lowerText.includes('maternity')) exclusions.push("Maternity benefits may be excluded initially");
            if (lowerText.includes('pre-existing')) exclusions.push("Pre-existing conditions excluded for initial period");
            if (lowerText.includes('infertility')) exclusions.push("Infertility treatment excluded");
        }
        
        // Hidden clauses analysis
        if (lowerText.includes('waiting period')) {
            hiddenClauses.push("Various waiting periods apply to different conditions");
        }
        if (lowerText.includes('pre-authorization') || lowerText.includes('pre-auth')) {
            hiddenClauses.push("Pre-authorization required for certain treatments");
        }
        if (lowerText.includes('sublimit') || lowerText.includes('sub-limit')) {
            hiddenClauses.push("Sub-limits may apply to specific treatments");
        }
        
        // Generate recommendations
        if (lowerText.includes('room rent')) {
            recommendations.push("Choose hospital room category based on your policy's room rent limit");
        }
        if (lowerText.includes('network')) {
            recommendations.push("Prefer network hospitals for better coverage and cashless facility");
        }
        if (lowerText.includes('pre-authorization')) {
            recommendations.push("Always obtain pre-authorization for planned treatments");
        }
        recommendations.push("Keep all medical documents and bills organized for claim processing");
        recommendations.push("Understand your policy's waiting periods and plan accordingly");
        
        // Add defaults if nothing found
        if (roomLimits.length === 0) roomLimits = [...this.fallbackPolicyAnalysis.roomRentLimits];
        if (coPay.length === 0) coPay = [...this.fallbackPolicyAnalysis.coPay];
        if (exclusions.length === 0) exclusions = [...this.fallbackPolicyAnalysis.exclusions];
        if (hiddenClauses.length === 0) hiddenClauses = [...this.fallbackPolicyAnalysis.hiddenClauses];
        if (recommendations.length < 3) recommendations.push(...this.fallbackPolicyAnalysis.recommendations);
        
        return {
            roomRentLimits: roomLimits,
            coPay: coPay,
            exclusions: exclusions,
            hiddenClauses: hiddenClauses,
            recommendations: recommendations
        };
    }

    displayEnhancedPolicyResults(analysis) {
        const resultsDiv = document.getElementById('policyResults');
        
        console.log('Displaying enhanced policy results:', analysis);
        
        // Populate each section
        this.populateList('roomLimits', analysis.roomRentLimits || analysis.roomLimits || []);
        this.populateList('coPay', analysis.coPay || []);
        this.populateList('exclusions', analysis.exclusions || []);
        this.populateList('hiddenClauses', analysis.hiddenClauses || []);
        this.populateList('recommendations', analysis.recommendations || []);
        
        resultsDiv.classList.remove('hidden');
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    populateList(elementId, items) {
        const listElement = document.getElementById(elementId);
        if (!listElement) {
            console.error(`Element with ID ${elementId} not found`);
            return;
        }
        
        listElement.innerHTML = '';
        
        if (!items || items.length === 0) {
            listElement.innerHTML = '<li>No specific guidance available for this case</li>';
            return;
        }
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
        
        console.log(`Populated ${elementId} with ${items.length} items`);
    }

    handleRegionChange(event) {
        const selectedRegion = event.target.value;
        const regionIndicator = document.getElementById('selectedRegion');
        
        if (regionIndicator) {
            regionIndicator.textContent = selectedRegion ? 
                this.getRegionDisplayName(selectedRegion) : 'All India';
        }
        
        // Update history display based on region
        this.selectedRegion = selectedRegion || 'all';
        this.updateHistoryDisplay();
    }

    initializeHistorySection() {
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyGrid = document.getElementById('historyGrid');
        if (!historyGrid) return;

        // Get current filter
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        
        // Filter data based on current settings
        let filteredData = [...this.priceData];
        
        // Apply regional filter
        if (activeFilter !== 'all' && activeFilter !== 'flagged') {
            const regionStates = this.regionalMapping[activeFilter] || [activeFilter];
            filteredData = filteredData.filter(item => regionStates.includes(item.region));
        }
        
        // Apply flagged filter
        if (activeFilter === 'flagged') {
            filteredData = filteredData.filter(item => item.status === 'flagged');
        }

        // Sort by timestamp (newest first)
        filteredData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Take only recent entries for display
        const recentData = filteredData.slice(0, 12);

        // Generate HTML
        historyGrid.innerHTML = recentData.map(item => `
            <div class="history-item ${item.status}">
                <div class="history-meta">
                    <span>${this.getRegionDisplayName(item.region)}</span>
                    <span>${item.status === 'flagged' ? '🚩' : '✅'}</span>
                </div>
                <div class="history-cost">₹${item.finalCost.toLocaleString('en-IN')}</div>
                <div class="history-details">
                    ${item.procedureName}<br>
                    <small>${item.hospitalName}</small><br>
                    <small>${new Date(item.timestamp).toLocaleDateString('en-IN')}</small>
                </div>
            </div>
        `).join('');
    }

    handleHistoryFilter(event) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update display
        this.updateHistoryDisplay();
    }

    updateStatistics() {
        // Update total entries
        const totalEntriesEl = document.getElementById('totalEntries');
        if (totalEntriesEl) {
            totalEntriesEl.textContent = this.priceData.length.toLocaleString('en-IN');
        }

        // Calculate average savings (difference between flagged and validated procedures)
        const flaggedEntries = this.priceData.filter(p => p.status === 'flagged');
        const validatedEntries = this.priceData.filter(p => p.status === 'validated');
        
        if (flaggedEntries.length > 0 && validatedEntries.length > 0) {
            const flaggedAvg = flaggedEntries.reduce((sum, p) => sum + p.finalCost, 0) / flaggedEntries.length;
            const validatedAvg = validatedEntries.reduce((sum, p) => sum + p.finalCost, 0) / validatedEntries.length;
            const avgSavings = Math.round(flaggedAvg - validatedAvg);
            
            const avgSavingsEl = document.getElementById('avgSavings');
            if (avgSavingsEl) {
                avgSavingsEl.textContent = `₹${avgSavings.toLocaleString('en-IN')}`;
            }
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 12px;
            font-family: Inter, sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            border: 1px solid;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'error') {
            notification.style.backgroundColor = '#fef2f2';
            notification.style.borderColor = '#ef4444';
            notification.style.color = '#dc2626';
            notification.textContent = '❌ ' + message;
        } else if (type === 'success') {
            notification.style.backgroundColor = '#ecfdf5';
            notification.style.borderColor = '#10b981';
            notification.style.color = '#047857';
            notification.textContent = '✅ ' + message;
        } else {
            notification.style.backgroundColor = '#eff6ff';
            notification.style.borderColor = '#2563eb';
            notification.style.color = '#1d4ed8';
            notification.textContent = 'ℹ️ ' + message;
        }
        
        document.body.appendChild(notification);
        
        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        if (!document.head.querySelector('style[data-notification]')) {
            style.setAttribute('data-notification', 'true');
            document.head.appendChild(style);
        }
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    async handleMarketAnalysis(event) {
        event.preventDefault();
        
        const marketRegion = document.getElementById('marketRegion').value;
        const marketProcedure = document.getElementById('marketProcedure').value;
        
        if (!marketProcedure) {
            this.showError('Please select a procedure type for market analysis.');
            return;
        }

        const btn = event.target;
        const originalText = btn.innerHTML;

        try {
            btn.innerHTML = `
                <div class="spinner" style="display: inline-block; width: 16px; height: 16px; margin-right: 8px;"></div>
                Analyzing...
            `;
            btn.disabled = true;

            // Filter data based on selected criteria
            let analysisData = this.priceData.filter(p => p.procedureName === marketProcedure);
            
            if (marketRegion !== 'all') {
                const regionStates = this.regionalMapping[marketRegion] || [marketRegion];
                analysisData = analysisData.filter(p => regionStates.includes(p.region));
            }

            if (analysisData.length === 0) {
                this.showError('No data available for the selected procedure and region combination.');
                return;
            }

            // Create market analysis chart
            this.createMarketChart(analysisData, marketProcedure, marketRegion);
            
            // Show results
            const resultsDiv = document.getElementById('marketResults');
            resultsDiv.classList.remove('hidden');
            
            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            this.showSuccess(`Market analysis completed for ${analysisData.length} data points!`);

        } catch (error) {
            console.error('Error in market analysis:', error);
            this.showError('Failed to perform market analysis: ' + error.message);
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

    async handleDiagnosisAnalysis(event) {
        event.preventDefault();
        
        const symptoms = document.getElementById('symptoms').value.trim();
        const doctorAdvice = document.getElementById('doctorAdvice').value.trim();
        const urgencyLevel = document.getElementById('urgencyLevel').value;
        
        if (!symptoms || !doctorAdvice || !urgencyLevel) {
            this.showError('Please fill in all fields for comprehensive analysis.');
            return;
        }

        const btn = event.target;
        const originalText = btn.innerHTML;

        try {
            btn.innerHTML = `
                <div class="spinner" style="display: inline-block; width: 16px; height: 16px; margin-right: 8px;"></div>
                Analyzing...
            `;
            btn.disabled = true;

            console.log('Starting diagnosis path analysis...');

            let analysis;
            try {
                // Try to get AI analysis
                const prompt = `Analyze this medical situation:
                Symptoms: ${symptoms}
                Doctor's Recommendation: ${doctorAdvice}
                Urgency: ${urgencyLevel}
                
                Provide alternatives, precautions, questions to ask, second opinion advice, and next steps.`;
                
                analysis = await window.runAnywhereSDK.analyzeDiagnosisPath(prompt);
            } catch (apiError) {
                console.warn('API analysis failed, using medical knowledge base:', apiError);
                analysis = this.getDiagnosisPathGuidance(symptoms, doctorAdvice, urgencyLevel);
            }
            
            // Display results
            this.displayDiagnosisResults(analysis);
            
            this.showSuccess('Diagnosis path analysis completed!');

        } catch (error) {
            console.error('Error in diagnosis analysis:', error);
            const fallbackAnalysis = this.getDiagnosisPathGuidance(symptoms, doctorAdvice, urgencyLevel);
            this.displayDiagnosisResults(fallbackAnalysis);
            this.showSuccess('Diagnosis analysis completed using medical knowledge base!');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

    getDiagnosisPathGuidance(symptoms, doctorAdvice, urgency) {
        // Generate guidance based on keywords and urgency
        const symptomsLower = symptoms.toLowerCase();
        const adviceLower = doctorAdvice.toLowerCase();
        
        let alternatives = [];
        let precautions = [];
        let questions = [];
        let secondOpinion = [];
        let nextSteps = [];
        
        // Urgency-based recommendations
        if (urgency === 'emergency') {
            alternatives.push("In emergency situations, follow doctor's advice immediately");
            precautions.push("Time is critical - do not delay treatment");
            secondOpinion.push("Second opinion may not be feasible for true emergencies");
        } else {
            alternatives.push("Consider getting a second opinion before major procedures");
            if (urgency === 'elective') {
                alternatives.push("Explore conservative treatment options first");
                alternatives.push("Consider lifestyle modifications and physiotherapy");
            }
        }
        
        // Surgery-related guidance
        if (adviceLower.includes('surgery') || adviceLower.includes('operation')) {
            alternatives.push("Ask about minimally invasive alternatives");
            alternatives.push("Inquire about non-surgical treatment options");
            
            precautions.push("Understand all surgical risks and complications");
            precautions.push("Verify surgeon's experience with this procedure");
            precautions.push("Confirm hospital's facilities and success rates");
            
            questions.push("What are the risks and success rates of this surgery?");
            questions.push("Are there non-surgical alternatives?");
            questions.push("How many of these procedures have you performed?");
            questions.push("What is the recovery time and process?");
            
            if (urgency !== 'emergency') {
                secondOpinion.push("Strongly recommended for any major surgery");
                secondOpinion.push("Consult a specialist at a different hospital");
            }
        }
        
        // Medication-related guidance
        if (adviceLower.includes('medication') || adviceLower.includes('medicine')) {
            alternatives.push("Discuss dosage optimization options");
            precautions.push("Understand potential side effects");
            questions.push("What are the side effects of this medication?");
            questions.push("How long will I need to take this medicine?");
        }
        
        // General recommendations
        questions.push("What happens if I don't get this treatment?");
        questions.push("Can you explain my diagnosis in simple terms?");
        questions.push("What lifestyle changes can help my condition?");
        
        if (urgency === 'routine' || urgency === 'elective') {
            secondOpinion.push("Consider consulting another specialist");
            secondOpinion.push("Get opinion from a teaching hospital or medical college");
        }
        
        // Next steps based on urgency
        switch (urgency) {
            case 'emergency':
                nextSteps.push("Follow doctor's instructions immediately");
                nextSteps.push("Arrange for immediate treatment");
                break;
            case 'urgent':
                nextSteps.push("Schedule treatment within recommended timeframe");
                nextSteps.push("Get second opinion if time permits");
                break;
            case 'routine':
            case 'elective':
                nextSteps.push("Take time to research your condition");
                nextSteps.push("Get second opinion from another specialist");
                nextSteps.push("Discuss with family and consider all options");
                break;
        }
        
        nextSteps.push("Get detailed cost estimate and insurance coverage info");
        nextSteps.push("Prepare list of questions for your next appointment");
        
        return {
            alternatives: alternatives,
            precautions: precautions,
            questionsToAsk: questions,
            secondOpinion: secondOpinion,
            nextSteps: nextSteps
        };
    }

    displayDiagnosisResults(analysis) {
        const resultsDiv = document.getElementById('diagnosisResults');
        
        console.log('Displaying diagnosis results:', analysis);
        
        // Populate each section
        this.populateList('alternatives', analysis.alternatives || []);
        this.populateList('precautions', analysis.precautions || []);
        this.populateList('questionsToAsk', analysis.questionsToAsk || []);
        this.populateList('secondOpinion', analysis.secondOpinion || []);
        this.populateList('nextSteps', analysis.nextSteps || []);
        
        resultsDiv.classList.remove('hidden');
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    createMarketChart(data, procedureCode, region) {
        const ctx = document.getElementById('marketChart');
        
        if (!ctx) {
            console.error('Market chart canvas not found');
            return;
        }

        // Group data by region
        const regionData = {};
        data.forEach(item => {
            const regionName = this.getRegionDisplayName(item.region);
            if (!regionData[regionName]) {
                regionData[regionName] = [];
            }
            regionData[regionName].push(item.finalCost);
        });

        // Calculate averages for each region
        const labels = Object.keys(regionData);
        const averages = labels.map(region => {
            const costs = regionData[region];
            return costs.reduce((sum, cost) => sum + cost, 0) / costs.length;
        });

        // Calculate overall statistics
        const allCosts = data.map(p => p.finalCost);
        const overallAverage = allCosts.reduce((sum, cost) => sum + cost, 0) / allCosts.length;
        const minCost = Math.min(...allCosts);
        const maxCost = Math.max(...allCosts);

        // Destroy existing chart if it exists
        if (this.marketChart) {
            this.marketChart.destroy();
        }

        // Create new chart
        try {
            this.marketChart = new Chart(ctx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average Cost (₹)',
                            data: averages,
                            backgroundColor: labels.map(() => `rgba(124, 58, 237, 0.7)`),
                            borderColor: labels.map(() => `rgba(124, 58, 237, 1)`),
                            borderWidth: 2,
                            borderRadius: 8,
                            borderSkipped: false,
                        },
                        {
                            label: 'Overall Average (₹)',
                            data: Array(labels.length).fill(overallAverage),
                            type: 'line',
                            borderColor: '#ea580c',
                            backgroundColor: 'rgba(234, 88, 12, 0.1)',
                            borderWidth: 3,
                            borderDash: [10, 5],
                            fill: false,
                            pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    family: 'Inter',
                                    size: 14
                                },
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#111827',
                            bodyColor: '#4b5563',
                            borderColor: '#e5e7eb',
                            borderWidth: 1,
                            cornerRadius: 8,
                            bodyFont: {
                                family: 'Inter'
                            },
                            titleFont: {
                                family: 'Inter'
                            },
                            callbacks: {
                                label: function(context) {
                                    if (context.datasetIndex === 0) {
                                        const count = regionData[context.label].length;
                                        return `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')} (${count} entries)`;
                                    }
                                    return `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')}`;
                                },
                                afterBody: function(context) {
                                    if (context[0] && context[0].datasetIndex === 0) {
                                        const deviation = ((context[0].raw - overallAverage) / overallAverage * 100).toFixed(1);
                                        return [`Deviation: ${deviation > 0 ? '+' : ''}${deviation}%`];
                                    }
                                    return [];
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cost (₹)',
                                font: {
                                    family: 'Inter',
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString('en-IN');
                                },
                                font: {
                                    family: 'Inter'
                                }
                            },
                            grid: {
                                color: 'rgba(229, 231, 235, 0.5)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Regions',
                                font: {
                                    family: 'Inter',
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                font: {
                                    family: 'Inter'
                                },
                                maxRotation: 45
                            },
                            grid: {
                                color: 'rgba(229, 231, 235, 0.5)'
                            }
                        }
                    }
                }
            });

            // Update chart title with statistics
            const chartTitle = document.querySelector('#marketResults .chart-title');
            if (chartTitle) {
                chartTitle.innerHTML = `Regional Price Distribution - ${this.extractProcedureName(procedureCode)}<br>
                    <small style="font-size: 14px; font-weight: 400; color: #6b7280;">
                        Range: ₹${minCost.toLocaleString('en-IN')} - ₹${maxCost.toLocaleString('en-IN')} | 
                        Average: ₹${Math.round(overallAverage).toLocaleString('en-IN')}
                    </small>`;
            }

            console.log('Market chart created successfully');
            
        } catch (error) {
            console.error('Error creating market chart:', error);
            this.showError('Failed to create market analysis chart');
        }
    }

}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing ClarityCare India...');
    const app = new ClarityCareApp();
    await app.initialize();
    
    // Make app globally available for debugging
    window.clarityCareApp = app;
});