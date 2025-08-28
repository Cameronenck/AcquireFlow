// Finances Module JavaScript
let currentTab = 'transactions';
let transactions = [];
let cashFlowChart = null;

// Mock transaction data
const mockTransactions = [
    {
        id: 1,
        date: '2024-01-15',
        description: 'Monthly Rent - Maple Street Duplex',
        type: 'income',
        category: 'rent',
        property: 'prop1',
        amount: 2800
    },
    {
        id: 2,
        date: '2024-01-10',
        description: 'Plumbing Repair - Unit A',
        type: 'expense',
        category: 'maintenance',
        property: 'prop1',
        amount: -450
    },
    {
        id: 3,
        date: '2024-01-05',
        description: 'Monthly Rent - Oak Avenue',
        type: 'income',
        category: 'rent',
        property: 'prop2',
        amount: 1800
    },
    {
        id: 4,
        date: '2024-01-03',
        description: 'Property Insurance Premium',
        type: 'expense',
        category: 'insurance',
        property: 'prop1',
        amount: -420
    },
    {
        id: 5,
        date: '2024-01-12',
        description: 'HVAC Maintenance',
        type: 'expense',
        category: 'maintenance',
        property: 'prop2',
        amount: -680
    },
    {
        id: 6,
        date: '2024-01-20',
        description: 'Property Management Fee',
        type: 'expense',
        category: 'management',
        property: 'prop3',
        amount: -320
    },
    {
        id: 7,
        date: '2024-01-25',
        description: 'Monthly Rent - Pine Hill Complex',
        type: 'income',
        category: 'rent',
        property: 'prop3',
        amount: 3200
    },
    {
        id: 8,
        date: '2024-01-28',
        description: 'Utility Bill - Electric',
        type: 'expense',
        category: 'utilities',
        property: 'prop2',
        amount: -180
    }
];

// Property data
const propertyData = [
    {
        id: 'prop1',
        name: 'Maple Street Duplex',
        monthlyIncome: 2800,
        monthlyExpenses: 850,
        roi: 18.5,
        occupancy: 100
    },
    {
        id: 'prop2',
        name: 'Oak Avenue Rental',
        monthlyIncome: 1800,
        monthlyExpenses: 620,
        roi: 15.2,
        occupancy: 100
    },
    {
        id: 'prop3',
        name: 'Pine Hill Complex',
        monthlyIncome: 3200,
        monthlyExpenses: 1100,
        roi: 22.8,
        occupancy: 95
    }
];

// Initialize the finances module
document.addEventListener('DOMContentLoaded', function() {
    transactions = [...mockTransactions];
    initializeFinances();
});

function initializeFinances() {
    renderTransactions();
    initializeCashFlowChart();
    renderPropertyFinances();
    setupEventListeners();
    
    // Set current date for transaction form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transactionDate').value = today;
}

function setupEventListeners() {
    // Filter change listeners
    document.getElementById('dateRange').addEventListener('change', filterTransactions);
    document.getElementById('transactionType').addEventListener('change', filterTransactions);
    document.getElementById('propertyFilter').addEventListener('change', filterTransactions);
    document.getElementById('categoryFilter').addEventListener('change', filterTransactions);
    
    // Form submission
    document.getElementById('addTransactionForm').addEventListener('submit', handleAddTransaction);
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    currentTab = tabName;
    
    // Initialize specific tab content
    if (tabName === 'cashflow' && !cashFlowChart) {
        initializeCashFlowChart();
    }
    if (tabName === 'properties') {
        renderPropertyFinances();
    }
}

function renderTransactions() {
    const tableBody = document.getElementById('transactionsTableBody');
    const filteredTransactions = getFilteredTransactions();
    
    tableBody.innerHTML = '';
    
    filteredTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td><span class="transaction-type type-${transaction.type}">${capitalizeFirst(transaction.type)}</span></td>
            <td>${capitalizeFirst(transaction.category)}</td>
            <td>${getPropertyName(transaction.property)}</td>
            <td class="transaction-amount ${transaction.type}">
                ${transaction.amount > 0 ? '+' : ''}${formatCurrency(transaction.amount)}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function getFilteredTransactions() {
    const dateRange = document.getElementById('dateRange').value;
    const type = document.getElementById('transactionType').value;
    const property = document.getElementById('propertyFilter').value;
    const category = document.getElementById('categoryFilter').value;
    
    let filtered = [...transactions];
    
    // Date range filter
    if (dateRange !== 'all') {
        const days = parseInt(dateRange);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        filtered = filtered.filter(t => new Date(t.date) >= cutoffDate);
    }
    
    // Type filter
    if (type !== 'all') {
        filtered = filtered.filter(t => t.type === type);
    }
    
    // Property filter
    if (property !== 'all') {
        filtered = filtered.filter(t => t.property === property);
    }
    
    // Category filter
    if (category !== 'all') {
        filtered = filtered.filter(t => t.category === category);
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return filtered;
}

function filterTransactions() {
    renderTransactions();
}

function initializeCashFlowChart() {
    const ctx = document.getElementById('cashFlowChart');
    if (!ctx) return;
    
    const chartData = generateCashFlowData();
    
    if (cashFlowChart) {
        cashFlowChart.destroy();
    }
    
    cashFlowChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'Income',
                    data: chartData.income,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Expenses',
                    data: chartData.expenses,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Net Cash Flow',
                    data: chartData.netFlow,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.raw);
                        }
                    }
                }
            }
        }
    });
}

function generateCashFlowData() {
    // Generate mock data for the last 6 months
    const months = [];
    const income = [];
    const expenses = [];
    const netFlow = [];
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        months.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
        
        const monthIncome = 28000 + (Math.random() * 4000 - 2000); // 26k-30k range
        const monthExpenses = 8000 + (Math.random() * 2000 - 1000); // 7k-9k range
        
        income.push(Math.round(monthIncome));
        expenses.push(Math.round(monthExpenses));
        netFlow.push(Math.round(monthIncome - monthExpenses));
    }
    
    return { labels: months, income, expenses, netFlow };
}

function updateCashFlowPeriod(period) {
    // Remove active class from all period buttons
    document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Update chart with new period data
    initializeCashFlowChart();
}

function renderPropertyFinances() {
    const container = document.querySelector('.property-finances');
    if (!container) return;
    
    container.innerHTML = '';
    
    propertyData.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <div class="property-header">
                <div class="property-name">${property.name}</div>
                <div class="property-roi">${property.roi}% ROI</div>
            </div>
            <div class="property-metrics">
                <div class="metric">
                    <div class="metric-label">Monthly Income</div>
                    <div class="metric-value positive">${formatCurrency(property.monthlyIncome)}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Monthly Expenses</div>
                    <div class="metric-value negative">${formatCurrency(property.monthlyExpenses)}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Net Cash Flow</div>
                    <div class="metric-value positive">${formatCurrency(property.monthlyIncome - property.monthlyExpenses)}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Occupancy</div>
                    <div class="metric-value">${property.occupancy}%</div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openAddTransactionModal() {
    document.getElementById('addTransactionModal').style.display = 'flex';
}

function closeAddTransactionModal() {
    document.getElementById('addTransactionModal').style.display = 'none';
    document.getElementById('addTransactionForm').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transactionDate').value = today;
}

function handleAddTransaction(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newTransaction = {
        id: transactions.length + 1,
        date: document.getElementById('transactionDate').value,
        description: document.getElementById('transactionDescription').value,
        type: document.getElementById('transactionTypeSelect').value,
        category: document.getElementById('transactionCategory').value,
        property: document.getElementById('transactionProperty').value,
        amount: parseFloat(document.getElementById('transactionAmount').value) * 
               (document.getElementById('transactionTypeSelect').value === 'expense' ? -1 : 1)
    };
    
    transactions.unshift(newTransaction);
    renderTransactions();
    closeAddTransactionModal();
    
    showNotification('Transaction added successfully!', 'success');
}

function exportFinancials() {
    // Mock export functionality
    showNotification('Financial report exported successfully!', 'success');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Math.abs(amount));
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPropertyName(propertyId) {
    const property = propertyData.find(p => p.id === propertyId);
    return property ? property.name : 'Unknown Property';
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