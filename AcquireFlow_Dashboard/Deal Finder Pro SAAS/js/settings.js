// Settings Module JavaScript
let currentSection = 'account';

// Initialize settings module
document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
});

function initializeSettings() {
    setupEventListeners();
    loadUserSettings();
}

function setupEventListeners() {
    // Navigation clicks
    document.querySelectorAll('.settings-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('onclick').match(/'(.+)'/)[1];
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.settings-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.settings-nav a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    currentSection = sectionName;
}

function loadUserSettings() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    const darkModeToggle = document.querySelector('#account-section .toggle-switch');
    if (savedTheme === 'dark' && darkModeToggle) {
        darkModeToggle.classList.add('active');
    }
}

function toggleSetting(toggle) {
    toggle.classList.toggle('active');
    
    // Add haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Show save indicator
    showSaveIndicator();
}

function toggleDarkMode(toggle) {
    toggle.classList.toggle('active');
    
    const newTheme = toggle.classList.contains('active') ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update main theme toggle icon
    const mainThemeToggle = document.querySelector('.theme-toggle i');
    if (mainThemeToggle) {
        mainThemeToggle.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    showNotification('Theme updated successfully!', 'success');
}

function toggleTwoFactor(toggle) {
    if (toggle.classList.contains('active')) {
        // Disable 2FA
        if (confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
            toggle.classList.remove('active');
            showNotification('Two-factor authentication disabled', 'warning');
        }
    } else {
        // Enable 2FA
        toggle.classList.add('active');
        showTwoFactorSetup();
    }
}

function showTwoFactorSetup() {
    showNotification('Two-factor authentication setup initiated. Check your email for instructions.', 'info');
}

function saveAccountSettings() {
    // Collect form data
    const settings = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        companyName: document.getElementById('companyName').value,
        licenseNumber: document.getElementById('licenseNumber').value
    };
    
    // Validate required fields
    if (!settings.firstName || !settings.lastName || !settings.email) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(settings.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Mock save operation
    showNotification('Saving settings...', 'info');
    
    setTimeout(() => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
        showNotification('Account settings saved successfully!', 'success');
    }, 1000);
}

function connectIntegration(service) {
    showNotification(`Connecting to ${service}...`, 'info');
    
    // Mock integration connection
    setTimeout(() => {
        const card = event.target.closest('.integration-card');
        const status = card.querySelector('.integration-status');
        const button = card.querySelector('button');
        
        status.textContent = 'Connected';
        status.className = 'integration-status status-connected';
        button.textContent = 'Configure';
        button.onclick = () => configureIntegration(service);
        
        showNotification(`Successfully connected to ${service}!`, 'success');
    }, 2000);
}

function configureIntegration(service) {
    showNotification(`Opening ${service} configuration...`, 'info');
    // In a real app, this would open a configuration modal or redirect
}

function regenerateApiKey(type) {
    if (confirm('Are you sure you want to regenerate this API key? The old key will stop working immediately.')) {
        showNotification('Regenerating API key...', 'info');
        
        setTimeout(() => {
            const keyElement = document.querySelector(`[onclick="regenerateApiKey('${type}')"]`)
                .closest('.api-key-item')
                .querySelector('.api-key-value');
            
            const prefix = type === 'prod' ? 'rei_live_' : 'rei_test_';
            const newKey = prefix + generateRandomString(32);
            keyElement.textContent = newKey;
            
            showNotification('API key regenerated successfully!', 'success');
        }, 1500);
    }
}

function createApiKey() {
    const keyName = prompt('Enter a name for the new API key:');
    if (keyName) {
        showNotification('Creating new API key...', 'info');
        
        setTimeout(() => {
            const newKey = 'rei_custom_' + generateRandomString(32);
            showNotification(`New API key created: ${newKey}`, 'success');
        }, 1000);
    }
}

function generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function updateBilling() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!cardNumber || !expiryDate || !cvv) {
        showNotification('Please fill in all payment fields', 'error');
        return;
    }
    
    showNotification('Updating payment method...', 'info');
    
    setTimeout(() => {
        showNotification('Payment method updated successfully!', 'success');
    }, 2000);
}

function downloadInvoices() {
    showNotification('Preparing invoice download...', 'info');
    
    setTimeout(() => {
        showNotification('Invoices downloaded successfully!', 'success');
    }, 1500);
}

function inviteTeamMember() {
    const email = prompt('Enter team member email:');
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            showNotification(`Sending invitation to ${email}...`, 'info');
            
            setTimeout(() => {
                showNotification('Team invitation sent successfully!', 'success');
            }, 1500);
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    }
}

function createBackup() {
    showNotification('Creating backup...', 'info');
    
    setTimeout(() => {
        const backupSection = document.querySelector('#backup-section .form-section:last-child');
        const newBackup = document.createElement('div');
        newBackup.className = 'backup-item';
        
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }) + ' - ' + now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        newBackup.innerHTML = `
            <div class="backup-info">
                <div class="backup-date">${dateString}</div>
                <div class="backup-size">248 MB</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="downloadBackup('backup-new')">Download</button>
        `;
        
        const createButton = backupSection.querySelector('.btn-primary');
        backupSection.insertBefore(newBackup, createButton);
        
        showNotification('Backup created successfully!', 'success');
    }, 3000);
}

function downloadBackup(backupId) {
    showNotification('Preparing backup download...', 'info');
    
    setTimeout(() => {
        showNotification('Backup download started!', 'success');
    }, 1000);
}

function exportSettings() {
    const settings = {
        account: {
            firstName: document.getElementById('firstName')?.value || '',
            lastName: document.getElementById('lastName')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            companyName: document.getElementById('companyName')?.value || '',
            licenseNumber: document.getElementById('licenseNumber')?.value || ''
        },
        preferences: {
            darkMode: document.querySelector('#account-section .toggle-switch')?.classList.contains('active') || false
        },
        notifications: {},
        automation: {}
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'rei-pro-settings.json';
    link.click();
    
    showNotification('Settings exported successfully!', 'success');
}

function showSaveIndicator() {
    // Show a subtle save indicator
    const indicator = document.createElement('div');
    indicator.className = 'save-indicator';
    indicator.innerHTML = '<i class="fas fa-check"></i> Saved';
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => indicator.style.opacity = '1', 100);
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => indicator.remove(), 300);
    }, 2000);
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
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

// Theme toggle functionality (for header button)
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = document.querySelector('.theme-toggle i');
    icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Update settings page toggle if on account section
    const accountDarkToggle = document.querySelector('#account-section .toggle-switch');
    if (accountDarkToggle) {
        if (newTheme === 'dark') {
            accountDarkToggle.classList.add('active');
        } else {
            accountDarkToggle.classList.remove('active');
        }
    }
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