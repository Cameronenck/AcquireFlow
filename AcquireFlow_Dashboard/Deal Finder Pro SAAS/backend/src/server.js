const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../')));

// Mock database (in production, use PostgreSQL/MySQL)
let properties = [
    {
        id: 1,
        address: "123 Oak Street",
        city: "Chicago",
        state: "IL",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1850,
        listPrice: 300000,
        offerAmount: 245000,
        status: "accepted",
        roi: 22.3,
        dateSent: "2024-01-15",
        responseTime: 2
    },
    {
        id: 2,
        address: "456 Pine Avenue",
        city: "Austin",
        state: "TX",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2250,
        listPrice: 400000,
        offerAmount: 320000,
        status: "pending",
        roi: 18.7,
        dateSent: "2024-01-12",
        responseTime: 5
    }
];

let automationSettings = {
    isActive: true,
    maxDailyOffers: 25,
    minROI: 15,
    maxOfferAmount: 500000,
    targetMarkets: ["Chicago", "Austin", "Denver", "Phoenix", "Tampa"],
    autoFollowUpDays: 3
};

let stats = {
    totalOffersSent: 247,
    todaysOffers: 24,
    acceptanceRate: 18.5,
    pendingOffers: 2300000,
    timeSaved: 89.2,
    acceptedValue: 4200000
};

// API Routes

// Get all properties/offers
app.get('/api/properties', (req, res) => {
    const { status, type, location, roi } = req.query;
    let filteredProperties = [...properties];

    if (status) {
        filteredProperties = filteredProperties.filter(p => p.status === status);
    }
    if (location) {
        filteredProperties = filteredProperties.filter(p => 
            p.city.toLowerCase().includes(location.toLowerCase()) ||
            p.state.toLowerCase().includes(location.toLowerCase())
        );
    }
    if (roi) {
        const [min, max] = roi.split('-').map(Number);
        filteredProperties = filteredProperties.filter(p => {
            if (max) return p.roi >= min && p.roi <= max;
            return p.roi >= min;
        });
    }

    res.json(filteredProperties);
});

// Create new offer
app.post('/api/properties', (req, res) => {
    const { address, listPrice, offerAmount, expectedROI } = req.body;
    
    const newProperty = {
        id: properties.length + 1,
        address,
        city: "Unknown",
        state: "Unknown",
        bedrooms: 0,
        bathrooms: 0,
        sqft: 0,
        listPrice: parseInt(listPrice),
        offerAmount: parseInt(offerAmount),
        status: "sent",
        roi: parseFloat(expectedROI),
        dateSent: new Date().toISOString().split('T')[0],
        responseTime: null
    };

    properties.push(newProperty);
    stats.totalOffersSent++;
    stats.todaysOffers++;

    res.status(201).json(newProperty);
});

// Update property status
app.put('/api/properties/:id', (req, res) => {
    const propertyId = parseInt(req.params.id);
    const { status } = req.body;
    
    const property = properties.find(p => p.id === propertyId);
    if (!property) {
        return res.status(404).json({ error: 'Property not found' });
    }

    property.status = status;
    res.json(property);
});

// Delete property
app.delete('/api/properties/:id', (req, res) => {
    const propertyId = parseInt(req.params.id);
    const index = properties.findIndex(p => p.id === propertyId);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Property not found' });
    }

    properties.splice(index, 1);
    res.json({ message: 'Property deleted successfully' });
});

// Get automation settings
app.get('/api/settings', (req, res) => {
    res.json(automationSettings);
});

// Update automation settings
app.put('/api/settings', (req, res) => {
    automationSettings = { ...automationSettings, ...req.body };
    res.json(automationSettings);
});

// Toggle automation
app.post('/api/automation/toggle', (req, res) => {
    automationSettings.isActive = !automationSettings.isActive;
    res.json({ isActive: automationSettings.isActive });
});

// Get dashboard stats
app.get('/api/stats', (req, res) => {
    res.json(stats);
});

// Send LOI email (mock)
app.post('/api/loi/send', (req, res) => {
    const { propertyId, agentEmail } = req.body;
    
    // Mock email sending
    setTimeout(() => {
        res.json({ 
            success: true, 
            message: `LOI sent to ${agentEmail} for property ${propertyId}`,
            timestamp: new Date().toISOString()
        });
    }, 1000);
});

// Export data
app.get('/api/export', (req, res) => {
    const csvData = properties.map(p => 
        `${p.address},${p.city},${p.state},$${p.offerAmount},${p.status},${p.roi}%,${p.dateSent}`
    ).join('\n');
    
    const csvHeader = 'Address,City,State,Offer Amount,Status,ROI,Date Sent\n';
    const fullCsv = csvHeader + csvData;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="rei-offers.csv"');
    res.send(fullCsv);
});

// Dashboard data endpoint
app.get('/api/dashboard', (req, res) => {
    const dashboardData = {
        overview: {
            revenue: {
                total: 847650,
                growth: 23.5,
                properties: 12,
                average: 70638
            },
            roi: {
                average: 24.7,
                growth: 4.2,
                target: 20,
                best: 35.2
            },
            deals: {
                closed: 45,
                growth: 18.9,
                successRate: 18.5,
                totalOffers: 243
            },
            pipeline: {
                value: 2300000,
                growth: 12.3,
                active: 28,
                average: 82143
            }
        },
        performance: {
            conversion: {
                acceptanceRate: 18.5,
                closureRate: 12.3,
                avgResponseTime: 3.2
            },
            financial: {
                cashFlow: 124580,
                portfolioValue: 4200000,
                debtToEquity: 0.62
            },
            market: {
                propertiesAnalyzed: 1247,
                offersSubmitted: 243,
                marketCoverage: 5
            }
        },
        charts: {
            revenue: [65000, 78000, 92000, 85000, 105000, 120000, 98000, 110000, 125000, 135000, 128000, 147000],
            offers: [45, 28, 78, 15], // accepted, pending, rejected, negotiating
            markets: {
                cities: ['Chicago', 'Austin', 'Denver', 'Phoenix', 'Tampa'],
                offers: [65, 48, 52, 38, 42],
                accepted: [12, 9, 11, 7, 8],
                revenue: [185, 142, 167, 123, 134]
            }
        },
        recentActivity: [
            {
                type: 'accepted',
                title: 'Offer Accepted - 123 Oak Street',
                description: '$245,000 offer accepted • ROI: 22.3% • Chicago, IL',
                time: '2 hours ago'
            },
            {
                type: 'offer',
                title: 'New Offer Sent - 789 Pine Avenue',
                description: '$180,000 offer sent • ROI: 25.1% • Denver, CO',
                time: '4 hours ago'
            },
            {
                type: 'negotiation',
                title: 'Counter Offer Received - 456 Maple Drive',
                description: 'Counter at $215,000 • Original: $195,000 • Austin, TX',
                time: '6 hours ago'
            },
            {
                type: 'rejected',
                title: 'Offer Rejected - 321 Elm Street',
                description: '$280,000 offer rejected • ROI: 19.8% • Phoenix, AZ',
                time: '8 hours ago'
            },
            {
                type: 'offer',
                title: 'Bulk Offers Sent - 12 Properties',
                description: 'Automated batch processing • Tampa, FL market',
                time: '1 day ago'
            }
        ]
    };

    res.json(dashboardData);
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

// Serve the dashboard HTML file
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 REI Pro Backend running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard available at http://localhost:${PORT}`);
});

module.exports = app; 