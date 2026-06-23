import { Store } from './state.js';
import { Components, renderLoginScreen, renderUserProfile } from './components.js';
import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from './firebase-config.js';

const app = {
    currentView: 'dashboard',
    currentUser: null,
    
    init: () => {
        app.bindEvents();
        
        // Listen to Auth State
        if (auth) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    app.currentUser = user;
                    document.body.classList.remove('logged-out');
                    // Setup User Profile in Sidebar
                    const sidebar = document.querySelector('.sidebar');
                    let profileSection = document.querySelector('.user-profile-section');
                    if (!profileSection) {
                        sidebar.insertAdjacentHTML('beforeend', renderUserProfile(user));
                        document.getElementById('logout-btn').addEventListener('click', app.handleLogout);
                    }
                    
                    app.handleRoute();
                    Store.initRealtimeListeners();
                } else {
                    app.currentUser = null;
                    document.body.classList.add('logged-out');
                    document.getElementById('view-container').innerHTML = renderLoginScreen();
                    document.getElementById('google-signin-btn')?.addEventListener('click', app.handleLogin);
                    
                    const profileSection = document.querySelector('.user-profile-section');
                    if (profileSection) profileSection.remove();
                }
            });
        } else {
            // Fallback if no firebase config
            app.handleRoute();
            Store.initRealtimeListeners();
        }
        
        // Listen for hash changes to navigate
        window.addEventListener('hashchange', () => {
            if (app.currentUser || !auth) app.handleRoute();
        });
        // Listen for state changes to re-render the current view
        document.addEventListener('stateChanged', () => {
            if (app.currentUser || !auth) app.renderView(app.currentView);
        });
    },

    handleLogin: async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed: " + error.message);
        }
    },

    handleLogout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed", error);
        }
    },

    bindEvents: () => {
        // Global Add Button
        document.getElementById('globalAddBtn').addEventListener('click', () => {
            app.showModal('addProperty');
        });
    },

    handleRoute: () => {
        const fullHash = window.location.hash.substring(1) || 'dashboard';
        const [viewName, queryString] = fullHash.split('?');
        app.currentView = viewName;
        
        // Update navigation active state
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.view === viewName) {
                el.classList.add('active');
            }
        });

        app.renderView(viewName, queryString);
    },

    renderView: (viewName, queryString) => {
        const container = document.getElementById('view-container');
        
        switch(viewName) {
            case 'dashboard':
                container.innerHTML = Components.renderDashboard();
                break;
            case 'properties':
                container.innerHTML = Components.renderProperties();
                break;
            case 'units':
                container.innerHTML = Components.renderUnits(queryString);
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

    showModal: (type, id = null) => {
        const modalHtml = `
            <div class="modal-overlay active" id="currentModalOverlay">
                <div class="modal">
                    ${Components.renderModalContent(type, id)}
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

    submitEditProperty: (id) => {
        const name = document.getElementById('editPropName').value;
        const address = document.getElementById('editPropAddress').value;
        const value = parseInt(document.getElementById('editPropValue').value, 10);
        
        Store.updateProperty(id, { name, address, value });
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

        alert(`Successfully parsed ${file.name}! Check the console for data.`);
        console.log(`Simulating import of ${file.name}`);
        
        window.location.hash = 'dashboard';
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', app.init);

// Expose to window for inline onclick handlers
window.app = app;
