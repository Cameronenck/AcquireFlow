console.log('📋 Contacts CRM Module Loading...');

// Global state for contacts module
window.REI_CONTACTS = {
    contacts: [],
    filteredContacts: [],
    currentPage: 1,
    itemsPerPage: 12,
    currentView: 'grid',
    selectedContact: null
};

// Mock contacts data
const mockContacts = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "(555) 123-4567",
        company: "Johnson Real Estate",
        status: "client",
        source: "referral",
        priority: "high",
        estimatedValue: 450000,
        lastContact: "2024-01-15",
        dateAdded: "2023-12-01",
        notes: "Interested in multi-family properties. Budget $400-500k.",
        avatar: "SJ",
        communication: [
            { type: "email", date: "2024-01-15", note: "Sent property listings for downtown area" },
            { type: "call", date: "2024-01-10", note: "Discussed investment goals and timeline" }
        ],
        deals: [
            { id: 1, property: "123 Oak Street", value: 450000, status: "in-progress" }
        ]
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "m.chen@techcorp.com",
        phone: "(555) 234-5678",
        company: "TechCorp Solutions",
        status: "prospect",
        source: "website",
        priority: "high",
        estimatedValue: 650000,
        lastContact: "2024-01-14",
        dateAdded: "2024-01-05",
        notes: "Looking for commercial property for tech startup expansion.",
        avatar: "MC",
        communication: [
            { type: "meeting", date: "2024-01-14", note: "Initial consultation meeting scheduled" },
            { type: "email", date: "2024-01-08", note: "Sent welcome packet and initial questionnaire" }
        ],
        deals: []
    },
    {
        id: 3,
        name: "Lisa Rodriguez",
        email: "lisa.r@gmail.com",
        phone: "(555) 345-6789",
        company: "Independent Investor",
        status: "lead",
        source: "social-media",
        priority: "medium",
        estimatedValue: 275000,
        lastContact: "2024-01-12",
        dateAdded: "2024-01-10",
        notes: "First-time investor interested in rental properties.",
        avatar: "LR",
        communication: [
            { type: "call", date: "2024-01-12", note: "Initial screening call completed" }
        ],
        deals: []
    },
    {
        id: 4,
        name: "David Wilson",
        email: "david.wilson@wilsongroup.com",
        phone: "(555) 456-7890",
        company: "Wilson Investment Group",
        status: "client",
        source: "networking",
        priority: "high",
        estimatedValue: 850000,
        lastContact: "2024-01-13",
        dateAdded: "2023-11-15",
        notes: "Experienced investor with portfolio of 12+ properties.",
        avatar: "DW",
        communication: [
            { type: "email", date: "2024-01-13", note: "Quarterly portfolio review scheduled" },
            { type: "meeting", date: "2024-01-01", note: "New year investment planning session" }
        ],
        deals: [
            { id: 2, property: "456 Pine Avenue", value: 425000, status: "closed" },
            { id: 3, property: "789 Maple Drive", value: 380000, status: "in-progress" }
        ]
    },
    {
        id: 5,
        name: "Emma Thompson",
        email: "emma.thompson@email.com",
        phone: "(555) 567-8901",
        company: "Thompson Holdings",
        status: "prospect",
        source: "cold-call",
        priority: "medium",
        estimatedValue: 320000,
        lastContact: "2024-01-11",
        dateAdded: "2024-01-08",
        notes: "Interested in fix-and-flip opportunities.",
        avatar: "ET",
        communication: [
            { type: "call", date: "2024-01-11", note: "Follow-up call after initial contact" },
            { type: "email", date: "2024-01-09", note: "Sent market analysis report" }
        ],
        deals: []
    },
    {
        id: 6,
        name: "James Miller",
        email: "j.miller@millercorp.com",
        phone: "(555) 678-9012",
        company: "Miller Corporation",
        status: "lead",
        source: "website",
        priority: "low",
        estimatedValue: 180000,
        lastContact: "2024-01-09",
        dateAdded: "2024-01-07",
        notes: "Small budget, looking for starter investment property.",
        avatar: "JM",
        communication: [
            { type: "email", date: "2024-01-09", note: "Sent beginner investor guide" }
        ],
        deals: []
    }
];

// Initialize contacts module
function initializeContacts() {
    console.log('🚀 Initializing Contacts CRM Module...');
    
    // Load mock data
    window.REI_CONTACTS.contacts = [...mockContacts];
    window.REI_CONTACTS.filteredContacts = [...mockContacts];
    
    // Initialize theme
    initializeTheme();
    
    // Render contacts
    renderContacts();
    renderPagination();
    
    console.log('✅ Contacts CRM Module Initialized!');
}

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('rei-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('rei-theme', newTheme);
    updateThemeButton(newTheme);
    
    showNotification(`Switched to ${newTheme} theme`, 'success');
}

function updateThemeButton(theme) {
    const themeButton = document.querySelector('.theme-toggle i');
    if (themeButton) {
        themeButton.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Contact rendering functions
function renderContacts() {
    const { filteredContacts, currentPage, itemsPerPage, currentView } = window.REI_CONTACTS;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const contactsToShow = filteredContacts.slice(startIndex, endIndex);
    
    if (currentView === 'grid') {
        renderContactsGrid(contactsToShow);
    } else {
        renderContactsTable(contactsToShow);
    }
}

function renderContactsGrid(contacts) {
    const gridContainer = document.getElementById('contactsGrid');
    
    gridContainer.innerHTML = contacts.map(contact => {
        const statusClass = getStatusClass(contact.status);
        const priorityClass = getPriorityClass(contact.priority);
        
        return `
            <div class="contact-card" data-contact-id="${contact.id}">
                <div class="contact-header">
                    <div class="contact-avatar">
                        <span>${contact.avatar}</span>
                    </div>
                    <div class="contact-priority ${priorityClass}">
                        <i class="fas fa-flag"></i>
                    </div>
                </div>
                
                <div class="contact-info">
                    <h4>${contact.name}</h4>
                    <p class="contact-company">${contact.company}</p>
                    <div class="contact-details">
                        <span class="contact-email">
                            <i class="fas fa-envelope"></i> ${contact.email}
                        </span>
                        <span class="contact-phone">
                            <i class="fas fa-phone"></i> ${contact.phone}
                        </span>
                    </div>
                </div>
                
                <div class="contact-meta">
                    <span class="status-badge ${statusClass}">${contact.status}</span>
                    <span class="contact-value">$${contact.estimatedValue.toLocaleString()}</span>
                    <span class="contact-last-contact">Last: ${formatDate(contact.lastContact)}</span>
                </div>
                
                <div class="contact-actions">
                    <button class="btn btn-sm btn-primary" onclick="viewContactDetails(${contact.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="editContact(${contact.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="logCommunication(${contact.id})">
                        <i class="fas fa-comment"></i> Log
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderContactsTable(contacts) {
    const tableBody = document.getElementById('contactsTableBody');
    
    tableBody.innerHTML = contacts.map(contact => {
        const statusClass = getStatusClass(contact.status);
        const priorityClass = getPriorityClass(contact.priority);
        
        return `
            <tr data-contact-id="${contact.id}">
                <td>
                    <div class="table-contact-info">
                        <div class="contact-avatar small">
                            <span>${contact.avatar}</span>
                        </div>
                        <div>
                            <strong>${contact.name}</strong>
                            <br>
                            <small>${contact.company}</small>
                            <br>
                            <small class="text-muted">${contact.email}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="status-badge ${statusClass}">${contact.status}</span>
                </td>
                <td>${contact.source}</td>
                <td>
                    <span class="priority-indicator ${priorityClass}">
                        <i class="fas fa-flag"></i> ${contact.priority}
                    </span>
                </td>
                <td>${formatDate(contact.lastContact)}</td>
                <td>$${contact.estimatedValue.toLocaleString()}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-primary" onclick="viewContactDetails(${contact.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="editContact(${contact.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline" onclick="deleteContact(${contact.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Utility functions
function getStatusClass(status) {
    const statusClasses = {
        'lead': 'status-lead',
        'prospect': 'status-prospect',
        'client': 'status-client',
        'inactive': 'status-inactive'
    };
    return statusClasses[status] || 'status-default';
}

function getPriorityClass(priority) {
    const priorityClasses = {
        'high': 'priority-high',
        'medium': 'priority-medium',
        'low': 'priority-low'
    };
    return priorityClasses[priority] || 'priority-default';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

// Filtering and search functions
function filterContacts() {
    const searchTerm = document.getElementById('contactSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const sourceFilter = document.getElementById('sourceFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    
    const { contacts } = window.REI_CONTACTS;
    
    window.REI_CONTACTS.filteredContacts = contacts.filter(contact => {
        const matchesSearch = !searchTerm || 
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.company.toLowerCase().includes(searchTerm);
            
        const matchesStatus = !statusFilter || contact.status === statusFilter;
        const matchesSource = !sourceFilter || contact.source === sourceFilter;
        const matchesPriority = !priorityFilter || contact.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesSource && matchesPriority;
    });
    
    window.REI_CONTACTS.currentPage = 1;
    renderContacts();
    renderPagination();
    
    console.log(`🔍 Filtered contacts: ${window.REI_CONTACTS.filteredContacts.length} results`);
}

function clearFilters() {
    document.getElementById('contactSearch').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('sourceFilter').value = '';
    document.getElementById('priorityFilter').value = '';
    
    window.REI_CONTACTS.filteredContacts = [...window.REI_CONTACTS.contacts];
    window.REI_CONTACTS.currentPage = 1;
    
    renderContacts();
    renderPagination();
    
    showNotification('Filters cleared', 'info');
}

// View switching
function switchView(view) {
    window.REI_CONTACTS.currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Show/hide appropriate containers
    const gridContainer = document.getElementById('contactsGrid');
    const tableContainer = document.getElementById('contactsTable');
    
    if (view === 'grid') {
        gridContainer.style.display = 'grid';
        tableContainer.style.display = 'none';
    } else {
        gridContainer.style.display = 'none';
        tableContainer.style.display = 'block';
    }
    
    renderContacts();
    console.log(`📋 Switched to ${view} view`);
}

// Pagination
function renderPagination() {
    const { filteredContacts, currentPage, itemsPerPage } = window.REI_CONTACTS;
    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    
    const pageNumbers = document.getElementById('pageNumbers');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    // Update button states
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    
    // Generate page numbers
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage ? 'active' : '';
        paginationHTML += `
            <button class="page-number ${isActive}" onclick="goToPage(${i})">${i}</button>
        `;
    }
    
    pageNumbers.innerHTML = paginationHTML;
}

function changePage(direction) {
    const { currentPage } = window.REI_CONTACTS;
    const totalPages = Math.ceil(window.REI_CONTACTS.filteredContacts.length / window.REI_CONTACTS.itemsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        window.REI_CONTACTS.currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        window.REI_CONTACTS.currentPage++;
    }
    
    renderContacts();
    renderPagination();
}

function goToPage(page) {
    window.REI_CONTACTS.currentPage = page;
    renderContacts();
    renderPagination();
}

// Modal functions
function showAddContactModal() {
    const modal = document.getElementById('addContactModal');
    modal.style.display = 'flex';
    
    // Reset form
    document.getElementById('addContactForm').reset();
    
    console.log('📝 Add Contact Modal opened');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    
    console.log(`❌ Modal ${modalId} closed`);
}

function addContact(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newContact = {
        id: Date.now(),
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        company: document.getElementById('contactCompany').value,
        status: document.getElementById('contactStatus').value,
        source: document.getElementById('contactSource').value,
        priority: document.getElementById('contactPriority').value,
        estimatedValue: parseInt(document.getElementById('estimatedValue').value) || 0,
        lastContact: new Date().toISOString().split('T')[0],
        dateAdded: new Date().toISOString().split('T')[0],
        notes: document.getElementById('contactNotes').value,
        avatar: getInitials(document.getElementById('contactName').value),
        communication: [],
        deals: []
    };
    
    window.REI_CONTACTS.contacts.unshift(newContact);
    window.REI_CONTACTS.filteredContacts.unshift(newContact);
    
    renderContacts();
    renderPagination();
    closeModal('addContactModal');
    
    showNotification(`Contact ${newContact.name} added successfully!`, 'success');
    
    console.log('✅ New contact added:', newContact);
}

function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
}

// Contact detail functions
function viewContactDetails(contactId) {
    const contact = window.REI_CONTACTS.contacts.find(c => c.id === contactId);
    if (!contact) return;
    
    window.REI_CONTACTS.selectedContact = contact;
    
    // Populate modal with contact data
    document.getElementById('contactDetailsName').innerHTML = `<i class="fas fa-user"></i> ${contact.name}`;
    document.getElementById('detailsContactName').textContent = contact.name;
    document.getElementById('detailsContactCompany').textContent = contact.company;
    document.getElementById('detailsContactEmail').textContent = contact.email;
    document.getElementById('detailsContactPhone').textContent = contact.phone;
    document.getElementById('detailsContactAdded').textContent = `Added: ${formatDate(contact.dateAdded)}`;
    document.getElementById('detailsEstimatedValue').textContent = `$${contact.estimatedValue.toLocaleString()}`;
    
    // Update status and priority badges
    const statusBadge = document.getElementById('detailsContactStatus');
    statusBadge.textContent = contact.status;
    statusBadge.className = `status-badge ${getStatusClass(contact.status)}`;
    
    const priorityBadge = document.getElementById('detailsContactPriority');
    priorityBadge.textContent = contact.priority;
    priorityBadge.className = `priority-badge ${getPriorityClass(contact.priority)}`;
    
    // Render communication history
    renderCommunicationHistory(contact);
    
    // Show modal
    document.getElementById('contactDetailsModal').style.display = 'flex';
    
    console.log('👤 Viewing contact details:', contact.name);
}

function renderCommunicationHistory(contact) {
    const historyContainer = document.getElementById('communicationHistory');
    
    if (!contact.communication.length) {
        historyContainer.innerHTML = '<p class="no-activity">No communication history yet.</p>';
        return;
    }
    
    historyContainer.innerHTML = contact.communication.map(comm => {
        const typeIcon = {
            'email': 'fas fa-envelope',
            'call': 'fas fa-phone',
            'meeting': 'fas fa-handshake',
            'note': 'fas fa-sticky-note'
        }[comm.type] || 'fas fa-comment';
        
        return `
            <div class="communication-item">
                <div class="comm-icon">
                    <i class="${typeIcon}"></i>
                </div>
                <div class="comm-content">
                    <div class="comm-header">
                        <span class="comm-type">${comm.type}</span>
                        <span class="comm-date">${formatDate(comm.date)}</span>
                    </div>
                    <p class="comm-note">${comm.note}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Tab switching in contact details
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Show appropriate tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `${tabName}Tab`);
    });
    
    console.log(`📑 Switched to ${tabName} tab`);
}

// Contact action functions
function editContact(contactId) {
    console.log(`✏️ Editing contact ${contactId}`);
    showNotification('Edit functionality coming soon!', 'info');
}

function deleteContact(contactId) {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    const contactIndex = window.REI_CONTACTS.contacts.findIndex(c => c.id === contactId);
    if (contactIndex === -1) return;
    
    const contact = window.REI_CONTACTS.contacts[contactIndex];
    window.REI_CONTACTS.contacts.splice(contactIndex, 1);
    
    // Update filtered contacts
    const filteredIndex = window.REI_CONTACTS.filteredContacts.findIndex(c => c.id === contactId);
    if (filteredIndex !== -1) {
        window.REI_CONTACTS.filteredContacts.splice(filteredIndex, 1);
    }
    
    renderContacts();
    renderPagination();
    
    showNotification(`Contact ${contact.name} deleted`, 'success');
    console.log('🗑️ Contact deleted:', contact.name);
}

function logCommunication(contactId) {
    console.log(`📞 Logging communication for contact ${contactId}`);
    showNotification('Communication logged!', 'success');
}

function sendEmail() {
    console.log('📧 Opening email composer...');
    showNotification('Email composer opened!', 'info');
}

function scheduleCall() {
    console.log('📅 Opening calendar scheduler...');
    showNotification('Call scheduled!', 'success');
}

function saveNotes() {
    const notes = document.getElementById('contactNotesText').value;
    if (window.REI_CONTACTS.selectedContact) {
        window.REI_CONTACTS.selectedContact.notes = notes;
        showNotification('Notes saved successfully!', 'success');
        console.log('💾 Notes saved for contact:', window.REI_CONTACTS.selectedContact.name);
    }
}

function createDeal() {
    console.log('🤝 Creating new deal...');
    showNotification('Deal creation functionality coming soon!', 'info');
}

// Import functionality
function importContacts() {
    console.log('📥 Import contacts functionality');
    showNotification('Import functionality coming soon!', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Sidebar functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContacts);

// Handle modal clicks outside content
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

console.log('✅ Contacts CRM Module Script Loaded!'); 