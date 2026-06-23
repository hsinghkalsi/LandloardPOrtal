import { Store } from './state.js';

export const Components = {
    renderDashboard: () => {
        const stats = Store.getDashboardStats();
        const recentTx = Store.getTransactions().slice(0, 5);

        return `
            <div class="view-header">
                <div class="view-title">
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's what's happening with your properties.</p>
                </div>
                <button class="btn btn-primary" onclick="app.showModal('addTransaction')">
                    <i class='bx bx-plus'></i> Log Transaction
                </button>
            </div>

            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class='bx bx-buildings'></i></div>
                    <div class="stat-details">
                        <div class="stat-title">Total Properties</div>
                        <div class="stat-value">${stats.totalProperties}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class='bx bx-home-smile'></i></div>
                    <div class="stat-details">
                        <div class="stat-title">Occupancy Rate</div>
                        <div class="stat-value">${stats.occupancyRate}%</div>
                        <div class="stat-trend positive"><i class='bx bx-up-arrow-alt'></i> 2% from last month</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class='bx bx-trending-up'></i></div>
                    <div class="stat-details">
                        <div class="stat-title">Monthly Income</div>
                        <div class="stat-value">$${stats.monthlyIncome.toLocaleString()}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: var(--danger)"><i class='bx bx-trending-down'></i></div>
                    <div class="stat-details">
                        <div class="stat-title">Monthly Expenses</div>
                        <div class="stat-value">$${stats.monthlyExpenses.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <div class="content-grid">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Recent Transactions</div>
                        <a href="#financials">View All</a>
                    </div>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${recentTx.map(tx => `
                                    <tr>
                                        <td>${tx.date}</td>
                                        <td>${tx.description}</td>
                                        <td><span class="badge ${tx.amount > 0 ? 'success' : 'warning'}">${tx.category}</span></td>
                                        <td style="color: ${tx.amount > 0 ? 'var(--success)' : 'var(--text-primary)'}; font-weight: 600;">
                                            ${tx.amount > 0 ? '+' : ''}$${tx.amount.toLocaleString()}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Quick Actions</div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <button class="btn btn-secondary" style="width: 100%; justify-content: flex-start;" onclick="app.showModal('addProperty')">
                            <i class='bx bx-building-house'></i> Add New Property
                        </button>
                        <button class="btn btn-secondary" style="width: 100%; justify-content: flex-start;">
                            <i class='bx bx-user-plus'></i> Add New Tenant
                        </button>
                        <button class="btn btn-secondary" style="width: 100%; justify-content: flex-start;">
                            <i class='bx bx-receipt'></i> Upload Receipt
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderProperties: () => {
        const properties = Store.getProperties();
        return `
            <div class="view-header">
                <div class="view-title">
                    <h1>Properties</h1>
                    <p>Manage your real estate portfolio.</p>
                </div>
                <button class="btn btn-primary" onclick="app.showModal('addProperty')">
                    <i class='bx bx-plus'></i> Add Property
                </button>
            </div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Name / Address</th>
                                <th>Units</th>
                                <th>Est. Value</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${properties.map(p => `
                                <tr>
                                    <td>
                                        <div style="font-weight: 500">${p.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-tertiary)">${p.address}</div>
                                    </td>
                                    <td>${p.units}</td>
                                    <td>$${p.value.toLocaleString()}</td>
                                    <td><span class="badge ${p.status === 'Active' ? 'success' : 'warning'}">${p.status}</span></td>
                                    <td>
                                        <button class="icon-btn" title="Edit"><i class='bx bx-edit-alt'></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderTaxes: () => {
        // Simple Schedule E mock calculation
        const transactions = Store.getTransactions();
        const rents = transactions.filter(t => t.category.includes('Rent')).reduce((sum, t) => sum + t.amount, 0);
        const repairs = transactions.filter(t => t.category.includes('Repairs')).reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const taxes = transactions.filter(t => t.category.includes('Taxes')).reduce((sum, t) => sum + Math.abs(t.amount), 0);

        return `
            <div class="view-header">
                <div class="view-title">
                    <h1>End of Year Tax Report</h1>
                    <p>Schedule E Categorization for your accountant.</p>
                </div>
                <button class="btn btn-primary">
                    <i class='bx bxs-file-export'></i> Export CSV
                </button>
            </div>
            
            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-icon" style="background: var(--success-bg); color: var(--success)"><i class='bx bx-money'></i></div>
                    <div class="stat-details">
                        <div class="stat-title">Total Rental Income</div>
                        <div class="stat-value">$${rents.toLocaleString()}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: var(--danger-bg); color: var(--danger)"><i class='bx bx-calculator'></i></div>
                    <div class="stat-details">
                        <div class="stat-title">Total Deductible Expenses</div>
                        <div class="stat-value">$${(repairs + taxes).toLocaleString()}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: var(--info-bg); color: var(--info)"><i class='bx bx-wallet'></i></div>
                    <div class="stat-details">
                        <div class="stat-title">Net Cash Flow</div>
                        <div class="stat-value">$${(rents - repairs - taxes).toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Schedule E Breakdown (2026)</div>
                </div>
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>IRS Category</th>
                                <th>Amount</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>3. Rents received</td>
                                <td style="color: var(--success); font-weight: 600">$${rents.toLocaleString()}</td>
                                <td><a href="#financials">View transactions</a></td>
                            </tr>
                            <tr>
                                <td>14. Repairs</td>
                                <td>$${repairs.toLocaleString()}</td>
                                <td><a href="#financials">View receipts</a></td>
                            </tr>
                            <tr>
                                <td>16. Taxes</td>
                                <td>$${taxes.toLocaleString()}</td>
                                <td><a href="#financials">View receipts</a></td>
                            </tr>
                            <tr style="border-top: 2px solid var(--border-color)">
                                <td><strong>26. Total Rental Real Estate Income</strong></td>
                                <td><strong>$${(rents - repairs - taxes).toLocaleString()}</strong></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderTenants: () => {
        const tenants = Store.getTenants();
        const properties = Store.getProperties();
        
        // Map property names to tenants
        const enrichedTenants = tenants.map(t => {
            const prop = properties.find(p => p.id === t.propertyId);
            return { ...t, propertyName: prop ? prop.name : 'Unknown' };
        });

        return `
            <div class="view-header">
                <div class="view-title">
                    <h1>Tenants</h1>
                    <p>Manage your renters and their contact information.</p>
                </div>
                <button class="btn btn-primary" onclick="app.showModal('addTenant')">
                    <i class='bx bx-user-plus'></i> Add Tenant
                </button>
            </div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Name / Contact</th>
                                <th>Property & Unit</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${enrichedTenants.map(t => `
                                <tr>
                                    <td>
                                        <div style="font-weight: 500">${t.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-tertiary)">${t.email} • ${t.phone}</div>
                                    </td>
                                    <td>
                                        <div>${t.propertyName}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-tertiary)">Unit ${t.unit}</div>
                                    </td>
                                    <td><span class="badge ${t.status === 'Current' ? 'success' : t.status === 'Late' ? 'danger' : 'warning'}">${t.status}</span></td>
                                    <td>
                                        <a href="mailto:${t.email}?subject=Update regarding ${t.propertyName} - Unit ${t.unit}" class="icon-btn" title="Email via Gmail" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">
                                            <i class='bx bx-envelope'></i>
                                        </a>
                                        <button class="icon-btn" title="Edit"><i class='bx bx-edit-alt'></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderFinancials: () => {
        const transactions = Store.getTransactions();
        
        return `
            <div class="view-header">
                <div class="view-title">
                    <h1>Financial Ledger</h1>
                    <p>Track all income and expenses across your portfolio.</p>
                </div>
                <button class="btn btn-primary" onclick="app.showModal('addTransaction')">
                    <i class='bx bx-plus'></i> Log Transaction
                </button>
            </div>
            
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${transactions.sort((a,b) => new Date(b.date) - new Date(a.date)).map(tx => `
                                <tr>
                                    <td>${tx.date}</td>
                                    <td>${tx.description}</td>
                                    <td><span class="badge ${tx.amount > 0 ? 'success' : 'warning'}">${tx.category}</span></td>
                                    <td style="color: ${tx.amount > 0 ? 'var(--success)' : 'var(--text-primary)'}; font-weight: 600;">
                                        ${tx.amount > 0 ? '+' : ''}$${tx.amount.toLocaleString()}
                                    </td>
                                    <td>
                                        <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                                            <i class='bx bx-paperclip'></i> View
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderModalContent: (type) => {
        if (type === 'addProperty') {
            return `
                <div class="modal-header">
                    <h2 class="modal-title">Add New Property</h2>
                    <button class="modal-close" onclick="app.closeModal()"><i class='bx bx-x'></i></button>
                </div>
                <div class="modal-body">
                    <form id="propertyForm" onsubmit="event.preventDefault(); app.submitProperty();">
                        <div class="form-group">
                            <label class="form-label">Property Name</label>
                            <input type="text" class="form-control" id="propName" required placeholder="e.g. Sunset Apartments">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Address</label>
                            <input type="text" class="form-control" id="propAddress" required placeholder="123 Main St...">
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <div class="form-group" style="flex: 1">
                                <label class="form-label">Number of Units</label>
                                <input type="number" class="form-control" id="propUnits" required min="1" value="1">
                            </div>
                            <div class="form-group" style="flex: 1">
                                <label class="form-label">Est. Value ($)</label>
                                <input type="number" class="form-control" id="propValue" required value="0">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="document.getElementById('propertyForm').requestSubmit()">Save Property</button>
                </div>
            `;
        } else if (type === 'addTenant') {
            return `
                <div class="modal-header">
                    <h2 class="modal-title">Add New Tenant</h2>
                    <button class="modal-close" onclick="app.closeModal()"><i class='bx bx-x'></i></button>
                </div>
                <div class="modal-body">
                    <form id="tenantForm" onsubmit="event.preventDefault(); app.submitTenant();">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="tenantName" required>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <div class="form-group" style="flex: 1">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" id="tenantEmail" required>
                            </div>
                            <div class="form-group" style="flex: 1">
                                <label class="form-label">Phone</label>
                                <input type="text" class="form-control" id="tenantPhone" required>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <div class="form-group" style="flex: 2">
                                <label class="form-label">Property ID</label>
                                <input type="text" class="form-control" id="tenantProp" required placeholder="e.g. p1">
                            </div>
                            <div class="form-group" style="flex: 1">
                                <label class="form-label">Unit</label>
                                <input type="text" class="form-control" id="tenantUnit" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="document.getElementById('tenantForm').requestSubmit()">Save Tenant</button>
                </div>
            `;
        } else if (type === 'addTransaction') {
            return `
                <div class="modal-header">
                    <h2 class="modal-title">Log Transaction</h2>
                    <button class="modal-close" onclick="app.closeModal()"><i class='bx bx-x'></i></button>
                </div>
                <div class="modal-body">
                    <form id="txForm" onsubmit="event.preventDefault(); app.submitTransaction();">
                        <div style="display: flex; gap: 1rem;">
                            <div class="form-group" style="flex: 1">
                                <label class="form-label">Date</label>
                                <input type="date" class="form-control" id="txDate" required>
                            </div>
                            <div class="form-group" style="flex: 1">
                                <label class="form-label">Amount ($)</label>
                                <input type="number" class="form-control" id="txAmount" required step="0.01">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <input type="text" class="form-control" id="txDesc" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Category</label>
                            <select class="form-control" id="txCat" required>
                                <option value="Income: Rent">Income: Rent</option>
                                <option value="Expense: Repairs">Expense: Repairs</option>
                                <option value="Expense: Taxes">Expense: Taxes</option>
                                <option value="Expense: Insurance">Expense: Insurance</option>
                                <option value="Expense: Utilities">Expense: Utilities</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="document.getElementById('txForm').requestSubmit()">Log Transaction</button>
                </div>
            `;
        }
        return '';
    },

    renderMaintenance: () => {
        const issues = Store.getMaintenance();
        const properties = Store.getProperties();

        const enrichedIssues = issues.map(i => {
            const prop = properties.find(p => p.id === i.propertyId);
            return { ...i, propertyName: prop ? prop.name : 'Unknown' };
        });

        return `
            <div class="view-header">
                <div class="view-title">
                    <h1>Maintenance Requests</h1>
                    <p>Track repairs and tenant service requests.</p>
                </div>
                <button class="btn btn-primary">
                    <i class='bx bx-plus'></i> New Request
                </button>
            </div>
            
            <div class="dashboard-grid">
                ${['To Do', 'In Progress', 'Done'].map(status => `
                    <div class="card" style="background: var(--bg-elevated)">
                        <div class="card-header">
                            <div class="card-title">${status}</div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            ${enrichedIssues.filter(i => i.status === status).map(i => `
                                <div style="background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color)">
                                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${i.title}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 0.5rem;">${i.propertyName} - Unit ${i.unit}</div>
                                    <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">${i.description}</div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 0.75rem; color: var(--text-tertiary)">${i.date}</span>
                                        <div style="display: flex; gap: 0.5rem;">
                                            <a href="mailto:?subject=Maintenance Update: ${i.title} (${i.propertyName} - Unit ${i.unit})" class="icon-btn" title="Email Tenant" style="width: 28px; height: 28px; font-size: 1rem; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">
                                                <i class='bx bx-envelope'></i>
                                            </a>
                                            <button class="icon-btn" title="Move Status" style="width: 28px; height: 28px; font-size: 1rem;"><i class='bx bx-right-arrow-alt'></i></button>
                                        </div>
                                    </div>
                                </div>
                            `).join('') || '<div style="color: var(--text-tertiary); font-size: 0.875rem; text-align: center; padding: 1rem 0;">No issues</div>'}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    renderDocuments: () => {
        const docs = Store.getDocuments();
        
        return `
            <div class="view-header">
                <div class="view-title">
                    <h1>Document Storage</h1>
                    <p>Leases, receipts, and important property files.</p>
                </div>
                <button class="btn btn-primary">
                    <i class='bx bx-upload'></i> Upload File
                </button>
            </div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Date Added</th>
                                <th>Size</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${docs.map(d => `
                                <tr>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <i class='bx bxs-file-pdf' style="color: var(--danger); font-size: 1.5rem;"></i>
                                            <span style="font-weight: 500">${d.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="badge" style="background: var(--bg-elevated); color: var(--text-primary)">${d.type}</span></td>
                                    <td>${d.date}</td>
                                    <td>${d.size}</td>
                                    <td>
                                        <button class="icon-btn" title="Download"><i class='bx bx-download'></i></button>
                                        <button class="icon-btn" title="Delete"><i class='bx bx-trash'></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderImport: () => {
        return `
            <div class="view-header">
                <div class="view-title">
                    <h1>Data Importer (TurboTenant)</h1>
                    <p>Migrate your data from TurboTenant to your new system.</p>
                </div>
            </div>
            <div class="card" style="max-width: 600px;">
                <div style="text-align: center; padding: 3rem 1rem;">
                    <i class='bx bx-cloud-upload' style="font-size: 4rem; color: var(--accent-primary); margin-bottom: 1rem;"></i>
                    <h3>Upload TurboTenant CSV</h3>
                    <p style="margin-bottom: 2rem;">Drag and drop your exported Properties, Tenants, or Transactions CSV file here.</p>
                    
                    <input type="file" id="csvUpload" accept=".csv" style="display: none;" onchange="app.handleCSVUpload(event)">
                    <button class="btn btn-primary" onclick="document.getElementById('csvUpload').click()">
                        Select CSV File
                    </button>
                </div>
                <div style="padding: 1.5rem; background: var(--bg-elevated); border-top: 1px solid var(--border-light);">
                    <h4>Supported Formats</h4>
                    <ul style="margin-top: 0.5rem; margin-left: 1.5rem; color: var(--text-secondary); font-size: 0.875rem;">
                        <li>TurboTenant Properties Export</li>
                        <li>TurboTenant Tenants Export</li>
                        <li>TurboTenant Accounting Ledger Export</li>
                    </ul>
                </div>
            </div>
        `;
    }
};
