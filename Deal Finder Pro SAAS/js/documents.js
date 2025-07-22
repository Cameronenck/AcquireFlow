// Documents Module JavaScript
let documents = [];
let currentFolder = 'all';
let currentView = 'grid';

// Mock document data
const mockDocuments = [
    {
        id: 1,
        name: 'Lease Agreement - Maple Street',
        type: 'pdf',
        folder: 'leases',
        property: 'prop1',
        size: '2.1 MB',
        date: '2024-01-28',
        url: '#'
    },
    {
        id: 2,
        name: 'Purchase Contract - Oak Avenue',
        type: 'docx',
        folder: 'contracts',
        property: 'prop2',
        size: '1.8 MB',
        date: '2024-01-27',
        url: '#'
    },
    {
        id: 3,
        name: 'Property Inspection Report',
        type: 'pdf',
        folder: 'inspections',
        property: 'prop1',
        size: '3.2 MB',
        date: '2024-01-26',
        url: '#'
    },
    {
        id: 4,
        name: 'Insurance Policy - Pine Hill',
        type: 'pdf',
        folder: 'insurance',
        property: 'prop3',
        size: '1.5 MB',
        date: '2024-01-25',
        url: '#'
    },
    {
        id: 5,
        name: 'Monthly Financial Report',
        type: 'xlsx',
        folder: 'financial',
        property: null,
        size: '890 KB',
        date: '2024-01-24',
        url: '#'
    },
    {
        id: 6,
        name: 'Property Photos - Maple Street',
        type: 'zip',
        folder: 'photos',
        property: 'prop1',
        size: '15.3 MB',
        date: '2024-01-23',
        url: '#'
    },
    {
        id: 7,
        name: 'Eviction Notice Template',
        type: 'docx',
        folder: 'legal',
        property: null,
        size: '420 KB',
        date: '2024-01-22',
        url: '#'
    },
    {
        id: 8,
        name: 'Tenant Application Form',
        type: 'pdf',
        folder: 'leases',
        property: 'prop2',
        size: '1.1 MB',
        date: '2024-01-21',
        url: '#'
    },
    {
        id: 9,
        name: 'Property Tax Assessment',
        type: 'pdf',
        folder: 'financial',
        property: 'prop3',
        size: '980 KB',
        date: '2024-01-20',
        url: '#'
    },
    {
        id: 10,
        name: 'Maintenance Request Log',
        type: 'xlsx',
        folder: 'inspections',
        property: 'prop2',
        size: '640 KB',
        date: '2024-01-19',
        url: '#'
    }
];

// Property mapping
const propertyNames = {
    'prop1': 'Maple Street Duplex',
    'prop2': 'Oak Avenue Rental',
    'prop3': 'Pine Hill Complex'
};

// Document templates
const documentTemplates = [
    {
        id: 'lease',
        name: 'Lease Agreement',
        description: 'Standard residential lease agreement',
        icon: 'fas fa-file-contract',
        category: 'leases'
    },
    {
        id: 'purchase',
        name: 'Purchase Agreement',
        description: 'Property purchase contract',
        icon: 'fas fa-home',
        category: 'contracts'
    },
    {
        id: 'inspection',
        name: 'Inspection Report',
        description: 'Property inspection checklist',
        icon: 'fas fa-clipboard-check',
        category: 'inspections'
    },
    {
        id: 'eviction',
        name: 'Eviction Notice',
        description: 'Legal eviction notice template',
        icon: 'fas fa-gavel',
        category: 'legal'
    },
    {
        id: 'rental-application',
        name: 'Rental Application',
        description: 'Tenant rental application form',
        icon: 'fas fa-user-check',
        category: 'leases'
    },
    {
        id: 'maintenance-request',
        name: 'Maintenance Request',
        description: 'Tenant maintenance request form',
        icon: 'fas fa-tools',
        category: 'inspections'
    },
    {
        id: 'move-in-checklist',
        name: 'Move-in Checklist',
        description: 'Property condition checklist',
        icon: 'fas fa-list-check',
        category: 'inspections'
    },
    {
        id: 'notice-to-quit',
        name: 'Notice to Quit',
        description: 'Legal notice to quit premises',
        icon: 'fas fa-exclamation-triangle',
        category: 'legal'
    }
];

// Initialize documents module
document.addEventListener('DOMContentLoaded', function() {
    documents = [...mockDocuments];
    initializeDocuments();
});

function initializeDocuments() {
    renderDocuments();
    setupEventListeners();
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('documentSearch').addEventListener('input', handleSearch);
    
    // Sort functionality
    document.getElementById('sortBy').addEventListener('change', handleSort);
    
    // View type
    document.getElementById('viewType').addEventListener('change', handleViewChange);
    
    // Upload area
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleFileDrop);
    
    fileInput.addEventListener('change', handleFileSelect);
}

function renderDocuments() {
    const container = document.getElementById('documentsContainer');
    const filteredDocs = getFilteredDocuments();
    
    container.innerHTML = '';
    container.className = currentView === 'grid' ? 'documents-grid' : 'documents-list';
    
    filteredDocs.forEach(doc => {
        const docElement = createDocumentElement(doc);
        container.appendChild(docElement);
    });
}

function createDocumentElement(doc) {
    const element = document.createElement('div');
    element.className = 'document-card';
    
    const icon = getDocumentIcon(doc.type);
    const propertyName = doc.property ? propertyNames[doc.property] : 'General';
    
    element.innerHTML = `
        <div class="document-icon ${icon.class}">
            <i class="${icon.icon}"></i>
        </div>
        <div class="document-title">${doc.name}</div>
        <div class="document-meta">
            <span class="document-type">${doc.type.toUpperCase()}</span>
            <span class="document-size">${doc.size}</span>
        </div>
        <div class="document-property">${propertyName}</div>
        <div class="document-actions">
            <a href="${doc.url}" class="action-btn" onclick="viewDocument(${doc.id})">
                <i class="fas fa-eye"></i> View
            </a>
            <a href="${doc.url}" class="action-btn" download>
                <i class="fas fa-download"></i> Download
            </a>
            <button class="action-btn" onclick="shareDocument(${doc.id})">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
    `;
    
    return element;
}

function getDocumentIcon(type) {
    const icons = {
        'pdf': { icon: 'fas fa-file-pdf', class: 'doc-pdf' },
        'docx': { icon: 'fas fa-file-word', class: 'doc-word' },
        'xlsx': { icon: 'fas fa-file-excel', class: 'doc-excel' },
        'jpg': { icon: 'fas fa-file-image', class: 'doc-image' },
        'jpeg': { icon: 'fas fa-file-image', class: 'doc-image' },
        'png': { icon: 'fas fa-file-image', class: 'doc-image' },
        'zip': { icon: 'fas fa-file-archive', class: 'doc-other' }
    };
    
    return icons[type] || { icon: 'fas fa-file', class: 'doc-other' };
}

function getFilteredDocuments() {
    let filtered = [...documents];
    
    // Filter by folder
    if (currentFolder !== 'all') {
        filtered = filtered.filter(doc => doc.folder === currentFolder);
    }
    
    // Filter by search
    const searchTerm = document.getElementById('documentSearch').value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(doc => 
            doc.name.toLowerCase().includes(searchTerm) ||
            doc.type.toLowerCase().includes(searchTerm) ||
            (doc.property && propertyNames[doc.property].toLowerCase().includes(searchTerm))
        );
    }
    
    // Sort documents
    const sortBy = document.getElementById('sortBy').value;
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'type':
                return a.type.localeCompare(b.type);
            case 'size':
                return parseFloat(a.size) - parseFloat(b.size);
            case 'date':
            default:
                return new Date(b.date) - new Date(a.date);
        }
    });
    
    return filtered;
}

function filterByFolder(folder) {
    currentFolder = folder;
    
    // Update active folder
    document.querySelectorAll('.folder-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.folder-item').classList.add('active');
    
    renderDocuments();
}

function handleSearch() {
    renderDocuments();
}

function handleSort() {
    renderDocuments();
}

function handleViewChange() {
    currentView = document.getElementById('viewType').value;
    renderDocuments();
}

function showUploadModal() {
    document.getElementById('uploadModal').style.display = 'flex';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

function showTemplatesModal() {
    document.getElementById('templatesModal').style.display = 'flex';
    renderTemplatesModal();
}

function closeTemplatesModal() {
    document.getElementById('templatesModal').style.display = 'none';
}

function renderTemplatesModal() {
    const container = document.querySelector('#templatesModal .templates-grid');
    container.innerHTML = '';
    
    documentTemplates.forEach(template => {
        const element = document.createElement('div');
        element.className = 'template-card';
        element.onclick = () => createFromTemplate(template.id);
        
        element.innerHTML = `
            <div class="template-icon"><i class="${template.icon}"></i></div>
            <div class="template-name">${template.name}</div>
            <div class="template-description">${template.description}</div>
        `;
        
        container.appendChild(element);
    });
}

function createFromTemplate(templateId) {
    const template = documentTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    // Mock template creation
    showNotification(`Creating ${template.name} template...`, 'info');
    
    setTimeout(() => {
        const newDoc = {
            id: documents.length + 1,
            name: `${template.name} - New`,
            type: 'docx',
            folder: template.category,
            property: null,
            size: '120 KB',
            date: new Date().toISOString().split('T')[0],
            url: '#'
        };
        
        documents.unshift(newDoc);
        renderDocuments();
        closeTemplatesModal();
        showNotification(`${template.name} created successfully!`, 'success');
    }, 1000);
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.closest('.upload-area').classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.target.closest('.upload-area').classList.remove('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.target.closest('.upload-area').classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
}

function handleFiles(files) {
    const folder = document.getElementById('documentFolder').value;
    const property = document.getElementById('documentProperty').value;
    
    files.forEach(file => {
        const newDoc = {
            id: documents.length + 1,
            name: file.name.replace(/\.[^/.]+$/, ""),
            type: file.name.split('.').pop().toLowerCase(),
            folder: folder,
            property: property || null,
            size: formatFileSize(file.size),
            date: new Date().toISOString().split('T')[0],
            url: '#'
        };
        
        documents.unshift(newDoc);
    });
    
    renderDocuments();
    closeUploadModal();
    showNotification(`${files.length} file(s) uploaded successfully!`, 'success');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function viewDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
        showNotification(`Opening ${doc.name}...`, 'info');
        // In a real app, this would open the document viewer
    }
}

function shareDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
        // Mock share functionality
        navigator.clipboard.writeText(`Shared link for: ${doc.name}`).then(() => {
            showNotification('Document link copied to clipboard!', 'success');
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = document.querySelector('.theme-toggle i');
    icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}); 