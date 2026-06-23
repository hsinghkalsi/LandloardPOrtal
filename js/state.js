import { db, collection, addDoc, onSnapshot } from './firebase-config.js';

// Mock Data Fallback
const localState = {
    properties: [
        { id: 'p1', name: 'Sunset Apartments', address: '123 Sunset Blvd, CA 90210', units: 4, value: 1200000, status: 'Active' },
        { id: 'p2', name: 'Downtown Loft', address: '456 Main St, NY 10001', units: 1, value: 850000, status: 'Active' }
    ],
    tenants: [],
    transactions: [
        { id: 'tx1', date: '2026-06-01', description: 'Rent - Alice J.', category: 'Income: Rent', amount: 1500, propertyId: 'p1' },
        { id: 'tx3', date: '2026-06-05', description: 'Plumbing Repair', category: 'Expense: Repairs', amount: -250, propertyId: 'p2' },
        { id: 'tx4', date: '2026-06-15', description: 'Property Tax Q2', category: 'Expense: Taxes', amount: -1200, propertyId: 'p1' }
    ],
    maintenance: [
        { id: 'm1', title: 'Leaking Faucet', description: 'Kitchen sink is dripping constantly', propertyId: 'p1', unit: 'A', status: 'To Do', date: '2026-06-20' },
        { id: 'm2', title: 'Broken AC', description: 'AC unit blowing warm air', propertyId: 'p2', unit: '1', status: 'In Progress', date: '2026-06-22' }
    ],
    documents: [
        { id: 'd1', name: 'Lease Agreement - Alice J.', type: 'PDF', size: '2.4 MB', date: '2026-01-01' },
        { id: 'd2', name: 'Plumbing Invoice', type: 'PDF', size: '1.1 MB', date: '2026-06-05' }
    ]
};

// If Firebase is initialized, we use this reactive state
const cloudState = {
    properties: [],
    tenants: [],
    transactions: []
};

// Determine if we have a valid database connection
const hasDb = db !== undefined;

export const Store = {
    getProperties: () => hasDb && cloudState.properties.length > 0 ? cloudState.properties : localState.properties,
    getTenants: () => hasDb ? cloudState.tenants : localState.tenants,
    getTransactions: () => hasDb && cloudState.transactions.length > 0 ? cloudState.transactions : localState.transactions,
    getMaintenance: () => localState.maintenance,
    getDocuments: () => localState.documents,
    
    getDashboardStats: () => {
        const props = Store.getProperties();
        const tenants = Store.getTenants();
        const txs = Store.getTransactions();

        const totalProperties = props.length;
        const totalUnits = props.reduce((sum, p) => sum + (Number(p.units) || 0), 0);
        const occupiedUnits = tenants.filter(t => t.status !== 'Past').length;
        const occupancyRate = totalUnits ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
        
        const monthlyIncome = txs
            .filter(t => t.amount > 0 && t.date.startsWith('2026-06'))
            .reduce((sum, t) => sum + t.amount, 0);
            
        const monthlyExpenses = txs
            .filter(t => t.amount < 0 && t.date.startsWith('2026-06'))
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        return {
            totalProperties,
            occupancyRate,
            monthlyIncome,
            monthlyExpenses
        };
    },

    addProperty: async (property) => {
        if (hasDb) {
            try {
                await addDoc(collection(db, "properties"), property);
                console.log("Property saved to Firestore!");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            localState.properties.push({
                id: 'p' + Date.now(),
                ...property
            });
            document.dispatchEvent(new Event('stateChanged'));
        }
    },

    initRealtimeListeners: () => {
        if (!hasDb) return;

        console.log("Initializing Firestore listeners...");
        // Listen to properties collection
        onSnapshot(collection(db, "properties"), (snapshot) => {
            cloudState.properties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            document.dispatchEvent(new Event('stateChanged'));
        });

        // Listen to transactions collection
        onSnapshot(collection(db, "transactions"), (snapshot) => {
            cloudState.transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            document.dispatchEvent(new Event('stateChanged'));
        });
    }
};
