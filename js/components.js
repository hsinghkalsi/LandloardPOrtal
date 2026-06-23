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
                                        <button class="icon-btn" title="Contact"><i class='bx bx-envelope'></i></button>
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
        }
        return '';
    }
};
