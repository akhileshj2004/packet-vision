// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts
    initBlockingChart();
    initGeoBlockChart();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize IP table with sample data
    populateIpTable();
});

// Initialize the Blocking Statistics Chart
function initBlockingChart() {
    const ctx = document.getElementById('blockingChart').getContext('2d');
    
    const blockingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'IPs Blocked',
                data: [45, 62, 78, 93, 120, 145],
                backgroundColor: 'rgba(255, 255, 0, 0.5)',
                borderColor: 'rgba(255, 255, 0, 1)',
                borderWidth: 1,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 20, 0.8)',
                    titleFont: {
                        family: "'Orbitron', sans-serif"
                    },
                    bodyFont: {
                        family: "'Rajdhani', sans-serif"
                    }
                }
            }
        }
    });
}

// Initialize the Geographic Distribution Chart
function initGeoBlockChart() {
    const ctx = document.getElementById('geoBlockChart').getContext('2d');
    
    const geoBlockChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['North America', 'Europe', 'Asia', 'South America', 'Other'],
            datasets: [{
                label: 'Geographic Distribution',
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    'rgba(255, 255, 0, 0.7)',
                    'rgba(255, 140, 0, 0.7)',
                    'rgba(255, 0, 255, 0.7)',
                    'rgba(0, 248, 255, 0.7)',
                    'rgba(255, 255, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 140, 0, 1)',
                    'rgba(255, 0, 255, 1)',
                    'rgba(0, 248, 255, 1)',
                    'rgba(255, 255, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: "'Rajdhani', sans-serif"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 20, 0.8)',
                    titleFont: {
                        family: "'Orbitron', sans-serif"
                    },
                    bodyFont: {
                        family: "'Rajdhani', sans-serif"
                    }
                }
            }
        }
    });
}

// Sample blocked IP data
const blockedIps = [
    { ip: '192.168.1.1', reason: 'Suspicious Activity', timestamp: '2025-01-15 09:23:15', duration: '24 Hours' },
    { ip: '10.0.0.5', reason: 'DDoS Attack', timestamp: '2025-01-15 10:05:27', duration: '1 Week' },
    { ip: '172.16.0.10', reason: 'Brute Force Attempt', timestamp: '2025-01-15 08:45:52', duration: '3 Days' },
    { ip: '203.0.113.42', reason: 'Spam', timestamp: '2025-01-15 07:12:19', duration: '1 Hour' },
    { ip: '77.88.55.66', reason: 'DDoS Attack', timestamp: '2025-01-15 10:08:43', duration: 'Permanent' }
];

// Populate IP Table with data
function populateIpTable() {
    const tableBody = document.querySelector('.ip-table tbody');
    tableBody.innerHTML = '';
    
    const reason = document.getElementById('filter-reason').value;
    const searchTerm = document.getElementById('ip-search').value.toLowerCase();
    
    const filteredIps = blockedIps.filter(ip => {
        const matchesReason = reason === 'all' || ip.reason.toLowerCase().includes(reason.toLowerCase());
        const matchesSearch = ip.ip.toLowerCase().includes(searchTerm);
        return matchesReason && matchesSearch;
    });
    
    if (filteredIps.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center;">No IPs found matching the filter criteria</td>
            </tr>
        `;
        return;
    }
    
    filteredIps.forEach(ip => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ip.ip}</td>
            <td>${ip.reason}</td>
            <td>${ip.timestamp}</td>
            <td>${ip.duration}</td>
            <td><button class="unblock-btn">Unblock</button></td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add event listeners to unblock buttons
    document.querySelectorAll('.unblock-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            unblockIp(index);
        });
    });
}

// Add new blocked IP
function addBlockedIP() {
    const ipAddress = document.getElementById('ip-address').value;
    const reason = document.getElementById('block-reason').value;
    const duration = document.getElementById('block-duration').value;
    
    // Basic IP validation
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!ipAddress || !ipRegex.test(ipAddress)) {
        alert('Please enter a valid IP address.');
        return;
    }
    
    if (!reason) {
        alert('Please select a reason for blocking.');
        return;
    }
    
    // Format the duration text
    let durationText;
    switch(duration) {
        case 'perm': durationText = 'Permanent'; break;
        case '1': durationText = '1 Hour'; break;
        case '24': durationText = '24 Hours'; break;
        case '72': durationText = '3 Days'; break;
        case '168': durationText = '1 Week'; break;
        case '720': durationText = '1 Month'; break;
        default: durationText = '24 Hours';
    }
    
    // Get current timestamp
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    // Add to the blockedIps array
    blockedIps.unshift({
        ip: ipAddress,
        reason: document.getElementById('block-reason').options[document.getElementById('block-reason').selectedIndex].text,
        timestamp: timestamp,
        duration: durationText
    });
    
    // Update the table
    populateIpTable();
    
    // Reset the form
    document.getElementById('ip-address').value = '';
    document.getElementById('block-reason').value = '';
    
    // Update total blocked count
    document.getElementById('total-blocked').textContent = blockedIps.length;
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'cyber-alert success';
    successMessage.textContent = `IP ${ipAddress} has been successfully blocked.`;
    document.querySelector('.block-form').appendChild(successMessage);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 3000);
}

// Unblock an IP
function unblockIp(index) {
    const ip = blockedIps[index].ip;
    
    // Remove from the array
    blockedIps.splice(index, 1);
    
    // Update the table
    populateIpTable();
    
    // Update total blocked count
    document.getElementById('total-blocked').textContent = blockedIps.length;
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'cyber-alert success';
    successMessage.textContent = `IP ${ip} has been unblocked.`;
    document.querySelector('.block-content').appendChild(successMessage);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 3000);
}

// Set up event listeners
function setupEventListeners() {
    // Filter by IP address search
    document.getElementById('ip-search').addEventListener('input', populateIpTable);
    
    // Filter by reason
    document.getElementById('filter-reason').addEventListener('change', populateIpTable);
    
    // Block IP button
    document.querySelector('.block-btn').addEventListener('click', addBlockedIP);
    
    // Random stats update simulation every 5 seconds
    setInterval(() => {
        // Update traffic filtered percentage with a slight variation
        const currentPercentage = parseFloat(document.getElementById('traffic-filtered').textContent);
        const newPercentage = Math.max(95, Math.min(99.9, currentPercentage + (Math.random() * 0.4 - 0.2))).toFixed(1);
        document.getElementById('traffic-filtered').textContent = newPercentage + '%';
        
        // Update false positives with a slight variation
        const currentFalsePos = parseFloat(document.getElementById('false-positives').textContent);
        const newFalsePos = Math.max(0.1, Math.min(0.5, currentFalsePos + (Math.random() * 0.1 - 0.05))).toFixed(1);
        document.getElementById('false-positives').textContent = newFalsePos + '%';
    }, 5000);
}