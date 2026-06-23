// Mock Data for the Landlord Portal
const state = {
    properties: [
        { id: 'p1', name: 'Sunset Apartments', address: '123 Sunset Blvd, CA 90210', units: 4, value: 1200000, status: 'Active' },
        { id: 'p2', name: 'Downtown Loft', address: '456 Main St, NY 10001', units: 1, value: 850000, status: 'Active' },
        { id: 'p3', name: 'Oakwood Duplex', address: '789 Oak Ave, TX 75001', units: 2, value: 450000, status: 'Maintenance' }
    ],
    tenants: [
        { id: 't1', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', propertyId: 'p1', unit: 'A', status: 'Current' },
        { id: 't2', name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', propertyId: 'p1', unit: 'B', status: 'Current' },
        { id: 't3', name: 'Charlie Davis', email: 'charlie@example.com', phone: '555-0103', propertyId: 'p2', unit: '1', status: 'Late' }
    ],
    transactions: [
        { id: 'tx1', date: '2026-06-01', description: 'Rent - Alice J.', category: 'Income: Rent', amount: 1500, propertyId: 'p1' },
        { id: 'tx2', date: '2026-06-01', description: 'Rent - Bob S.', category: 'Income: Rent', amount: 1500, propertyId: 'p1' },
        { id: 'tx3', date: '2026-06-05', description: 'Plumbing Repair', category: 'Expense: Repairs', amount: -250, propertyId: 'p2' },
        { id: 'tx4', date: '2026-06-15', description: 'Property Tax Q2', category: 'Expense: Taxes', amount: -1200, propertyId: 'p1' }
    ]
};

// State Manager
const Store = {
    getProperties: () => state.properties,
    getTenants: () => state.tenants,
    getTransactions: () => state.transactions,
    
    getDashboardStats: () => {
        const totalProperties = state.properties.length;
        const totalUnits = state.properties.reduce((sum, p) => sum + p.units, 0);
        const occupiedUnits = state.tenants.filter(t => t.status !== 'Past').length;
        const occupancyRate = totalUnits ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
        
        const monthlyIncome = state.transactions
            .filter(t => t.amount > 0 && t.date.startsWith('2026-06'))
            .reduce((sum, t) => sum + t.amount, 0);
            
        const monthlyExpenses = state.transactions
            .filter(t => t.amount < 0 && t.date.startsWith('2026-06'))
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        return {
            totalProperties,
            occupancyRate,
            monthlyIncome,
            monthlyExpenses
        };
    },

    addProperty: (property) => {
        state.properties.push({
            id: 'p' + Date.now(),
            ...property
        });
        // Trigger a re-render or event
        document.dispatchEvent(new Event('stateChanged'));
    }
};
