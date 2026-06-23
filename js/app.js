import { Store } from './state.js';
import { Components } from './components.js';

const app = {
    currentView: 'dashboard',
    
    init: () => {
        app.bindEvents();
        app.handleRoute();
        
        // Start Firebase real-time listeners (if configured)
        Store.initRealtimeListeners();
        
        // Listen for hash changes to navigate
        window.addEventListener('hashchange', app.handleRoute);
        // Listen for state changes to re-render the current view
        document.addEventListener('stateChanged', () => app.renderView(app.currentView));
    },

    bindEvents: () => {
        // Global Add Button
        document.getElementById('globalAddBtn').addEventListener('click', () => {
            app.showModal('addProperty');
        });
    },

    handleRoute: () => {
        const hash = window.location.hash.substring(1) || 'dashboard';
        app.currentView = hash;
        
        // Update navigation active state
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.view === hash) {
                el.classList.add('active');
            }
        });

        app.renderView(hash);
    },

    renderView: (viewName) => {
        const container = document.getElementById('view-container');
        
        switch(viewName) {
            case 'dashboard':
                container.innerHTML = Components.renderDashboard();
                break;
            case 'properties':
                container.innerHTML = Components.renderProperties();
                break;
            case 'taxes':
                container.innerHTML = Components.renderTaxes();
                break;
            case 'tenants':
                container.innerHTML = Components.renderTenants();
                break;
            case 'financials':
                container.innerHTML = Components.renderFinancials();
                break;
            case 'maintenance':
                container.innerHTML = Components.renderMaintenance();
                break;
            case 'documents':
                container.innerHTML = Components.renderDocuments();
                break;
            case 'import':
                container.innerHTML = Components.renderImport();
                break;
            default:
                container.innerHTML = Components.renderDashboard();
        }
    },

    showModal: (type) => {
        const modalHtml = `
            <div class="modal-overlay active" id="currentModalOverlay">
                <div class="modal">
                    ${Components.renderModalContent(type)}
                </div>
            </div>
        `;
        document.getElementById('modal-container').innerHTML = modalHtml;
    },

    closeModal: () => {
        const overlay = document.getElementById('currentModalOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                document.getElementById('modal-container').innerHTML = '';
            }, 300); // Wait for transition
        }
    },

    submitProperty: () => {
        const name = document.getElementById('propName').value;
        const address = document.getElementById('propAddress').value;
        const units = parseInt(document.getElementById('propUnits').value, 10);
        const value = parseInt(document.getElementById('propValue').value, 10);

        Store.addProperty({ name, address, units, value, status: 'Active' });
        app.closeModal();
    },

    submitTenant: () => {
        const name = document.getElementById('tenantName').value;
        const email = document.getElementById('tenantEmail').value;
        const phone = document.getElementById('tenantPhone').value;
        const propertyId = document.getElementById('tenantProp').value;
        const unit = document.getElementById('tenantUnit').value;

        Store.addTenant({ name, email, phone, propertyId, unit, status: 'Current' });
        app.closeModal();
    },

    submitTransaction: () => {
        const date = document.getElementById('txDate').value;
        const amount = parseFloat(document.getElementById('txAmount').value);
        const description = document.getElementById('txDesc').value;
        const category = document.getElementById('txCat').value;

        Store.addTransaction({ date, amount, description, category, propertyId: 'p1' });
        app.closeModal();
    },

    handleCSVUpload: (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // In a real app, we'd use PapaParse here. 
        // For now, let's just show an alert and simulate success.
        alert(`Successfully parsed ${file.name}! Check the console for data.`);
        console.log(`Simulating import of ${file.name}`);
        
        // After import completes, redirect to dashboard
        window.location.hash = 'dashboard';
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', app.init);

// Expose to window for inline onclick handlers
window.app = app;
