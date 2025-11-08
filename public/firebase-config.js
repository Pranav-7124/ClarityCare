// Firebase configuration
const firebaseConfig = {
    // Replace with your Firebase project configuration
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
let db;
let app;

async function initializeFirebase() {
    try {
        console.log('Initializing Firebase...');
        
        // Check if we have valid Firebase config
        const hasValidConfig = firebaseConfig.apiKey && 
                               firebaseConfig.apiKey !== "your-api-key-here" &&
                               firebaseConfig.projectId && 
                               firebaseConfig.projectId !== "your-project-id";
        
        if (!hasValidConfig) {
            console.log('No valid Firebase config found, using mock database');
            return initializeMockDB();
        }
        
        // Try to initialize Firebase
        app = window.firebase.initializeApp(firebaseConfig);
        
        // Initialize Firestore with dynamic import
        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js');
        db = getFirestore(app);
        
        console.log('Firebase initialized successfully with project:', firebaseConfig.projectId);
        return { app, db };
        
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        console.log('Falling back to mock database');
        // Fallback to mock database for demo
        return initializeMockDB();
    }
}

// Mock database for demo purposes when Firebase is not available
function initializeMockDB() {
    console.log('Using mock database for demo - all features will work offline');
    
    // Mock data storage
    const mockStorage = {
        price_entries: [
            { 
                id: 'demo1', 
                hospitalId: 'HSP001', 
                procedureCode: 'CPT-12345', 
                finalCost: 2000, 
                timestamp: new Date('2024-01-15'),
                status: 'validated'
            },
            { 
                id: 'demo2', 
                hospitalId: 'HSP002', 
                procedureCode: 'CPT-12345', 
                finalCost: 3500, 
                timestamp: new Date('2024-01-16'),
                status: 'flagged'
            },
            { 
                id: 'demo3', 
                hospitalId: 'HSP003', 
                procedureCode: 'CPT-12345', 
                finalCost: 2200, 
                timestamp: new Date('2024-01-17'),
                status: 'validated'
            }
        ],
        statistics: []
    };
    
    // Mock Firestore-like interface
    const mockDB = {
        collection: (name) => ({
            add: (data) => {
                console.log(`Mock DB: Adding to ${name}:`, data);
                const id = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                const entryWithId = { ...data, id };
                
                if (!mockStorage[name]) {
                    mockStorage[name] = [];
                }
                mockStorage[name].push(entryWithId);
                
                return Promise.resolve({ id });
            },
            get: () => {
                console.log(`Mock DB: Getting from ${name}`);
                const data = mockStorage[name] || [];
                return Promise.resolve({
                    docs: data.map(item => ({
                        id: item.id,
                        data: () => item
                    }))
                });
            },
            where: (field, op, value) => ({
                get: () => {
                    console.log(`Mock DB: Querying ${name} where ${field} ${op} ${value}`);
                    const data = mockStorage[name] || [];
                    let filtered = data;
                    
                    if (op === '==') {
                        filtered = data.filter(item => item[field] === value);
                    } else if (op === '!=') {
                        filtered = data.filter(item => item[field] !== value);
                    }
                    
                    return Promise.resolve({
                        docs: filtered.map(item => ({
                            id: item.id,
                            data: () => item
                        }))
                    });
                }
            }),
            doc: (docId) => ({
                set: (data) => {
                    console.log(`Mock DB: Setting document ${docId} in ${name}:`, data);
                    const items = mockStorage[name] || [];
                    const existingIndex = items.findIndex(item => item.id === docId);
                    
                    if (existingIndex >= 0) {
                        items[existingIndex] = { ...data, id: docId };
                    } else {
                        items.push({ ...data, id: docId });
                    }
                    
                    mockStorage[name] = items;
                    return Promise.resolve();
                },
                update: (data) => {
                    console.log(`Mock DB: Updating document ${docId} in ${name}:`, data);
                    const items = mockStorage[name] || [];
                    const existingIndex = items.findIndex(item => item.id === docId);
                    
                    if (existingIndex >= 0) {
                        items[existingIndex] = { ...items[existingIndex], ...data };
                        mockStorage[name] = items;
                    }
                    
                    return Promise.resolve();
                },
                delete: () => {
                    console.log(`Mock DB: Deleting document ${docId} from ${name}`);
                    const items = mockStorage[name] || [];
                    mockStorage[name] = items.filter(item => item.id !== docId);
                    return Promise.resolve();
                }
            })
        })
    };
    
    return { app: null, db: mockDB };
}

// Export for use in other files
window.initializeFirebase = initializeFirebase;