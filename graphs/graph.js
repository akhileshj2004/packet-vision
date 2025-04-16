document.addEventListener('DOMContentLoaded', () => {
    // Configure charts with cyberpunk theme
    const chartConfig = {
        color: '#ffffff',
        borderColor: '#00f8ff',
        gridColor: 'rgba(255, 255, 255, 0.1)',
        fontFamily: "'Rajdhani', sans-serif",
        tooltipBackground: 'rgba(10, 15, 30, 0.8)'
    };

    // Apply theme to Chart.js
    Chart.defaults.color = chartConfig.color;
    Chart.defaults.font.family = chartConfig.fontFamily;
    Chart.defaults.scale.grid.color = chartConfig.gridColor;
    
    // Create Traffic Chart
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    const trafficChart = new Chart(trafficCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            datasets: [{
                label: 'Normal Traffic (Gbps)',
                data: [1.2, 0.8, 1.5, 2.1, 1.8, 2.3, 1.4],
                borderColor: '#00f8ff',
                backgroundColor: 'rgba(0, 248, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }, {
                label: 'Attack Traffic (Gbps)',
                data: [0.1, 0.2, 0.1, 3.2, 0.2, 0.1, 0.2],
                borderColor: '#ff00ff',
                backgroundColor: 'rgba(255, 0, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: chartConfig.tooltipBackground,
                    borderColor: chartConfig.borderColor,
                    borderWidth: 1
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Traffic (Gbps)'
                    }
                }
            }
        }
    });

    // Create Protocol Distribution Chart
    const protocolCtx = document.getElementById('protocolChart').getContext('2d');
    const protocolChart = new Chart(protocolCtx, {
        type: 'doughnut',
        data: {
            labels: ['TCP', 'UDP', 'ICMP', 'DNS', 'HTTP/S'],
            datasets: [{
                data: [45, 30, 10, 8, 7],
                backgroundColor: [
                    '#00f8ff',
                    '#ff00ff',
                    '#ffff00',
                    '#00ff4c',
                    '#ff4c4c'
                ],
                borderColor: '#0a0a14',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: chartConfig.tooltipBackground,
                    borderColor: chartConfig.borderColor,
                    borderWidth: 1
                },
                legend: {
                    position: 'right',
                }
            }
        }
    });

    // Create Anomaly Detection Timeline
    const anomalyCtx = document.getElementById('anomalyChart').getContext('2d');
    const anomalyChart = new Chart(anomalyCtx, {
        type: 'bar',
        data: {
            labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            datasets: [{
                label: 'Detected Anomalies',
                data: [1, 0, 0, 0, 2, 0, 1, 3, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 0, 255, 0.7)',
                borderColor: '#ff00ff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: chartConfig.tooltipBackground,
                    borderColor: chartConfig.borderColor,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Number of Anomalies'
                    }
                }
            }
        }
    });

    // Create Geographic Distribution Chart
    const geoCtx = document.getElementById('geoChart').getContext('2d');
    const geoChart = new Chart(geoCtx, {
        type: 'pie',
        data: {
            labels: ['North America', 'Europe', 'Asia', 'South America', 'Other'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#00f8ff',
                    '#00a2ff',
                    '#ff00ff',
                    '#ffff00',
                    '#00ff4c'
                ],
                borderColor: '#0a0a14',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: chartConfig.tooltipBackground,
                    borderColor: chartConfig.borderColor,
                    borderWidth: 1
                },
                legend: {
                    position: 'bottom',
                }
            }
        }
    });

    // Create Threat Severity Chart
    const severityCtx = document.getElementById('severityChart').getContext('2d');
    const severityChart = new Chart(severityCtx, {
        type: 'radar',
        data: {
            labels: ['SYN Flood', 'UDP Flood', 'HTTP Flood', 'DNS Amplification', 'ICMP Flood'],
            datasets: [{
                label: 'Current Threat Level',
                data: [20, 35, 15, 40, 10],
                backgroundColor: 'rgba(255, 255, 0, 0.2)',
                borderColor: '#ffff00',
                borderWidth: 2,
                pointBackgroundColor: '#ffff00',
                pointBorderColor: '#0a0a14',
                pointHoverBackgroundColor: '#ffff00',
                pointHoverBorderColor: '#ffff00',
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Average Threat Level',
                data: [30, 20, 25, 30, 20],
                backgroundColor: 'rgba(0, 248, 255, 0.2)',
                borderColor: '#00f8ff',
                borderWidth: 2,
                pointBackgroundColor: '#00f8ff',
                pointBorderColor: '#0a0a14',
                pointHoverBackgroundColor: '#00f8ff',
                pointHoverBorderColor: '#00f8ff',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: chartConfig.tooltipBackground,
                    borderColor: chartConfig.borderColor,
                    borderWidth: 1
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#ffffff'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#ffffff'
                    }
                }
            }
        }
    });

    // Update stats every 5 seconds
    setInterval(() => {
        updateNetworkStats();
    }, 5000);

    // Function to update network stats
    function updateNetworkStats() {
        const trafficValue = document.querySelector('.stat-box:nth-child(1) .stat-value');
        const anomalyValue = document.querySelector('.stat-box:nth-child(2) .stat-value');
        
        // Update traffic with random value
        const newTraffic = (1 + Math.random() * 2).toFixed(1);
        trafficValue.innerHTML = `${newTraffic} <span>Gbps</span>`;
        
        // Occasionally change anomaly count
        if (Math.random() > 0.7) {
            const currentAnomalies = parseInt(anomalyValue.textContent);
            const change = Math.random() > 0.5 ? 1 : -1;
            const newCount = Math.max(0, currentAnomalies + change);
            anomalyValue.textContent = newCount;
        }
    }

    // Initialize visualizations container
    initVisualizationContainers();
    
    // Poll for visualization updates - simulating backend integration
    setInterval(checkForVisualizations, 3000);
});

function initVisualizationContainers() {
    // Initialize containers for the Python-generated visualizations
    const containers = [
        'viz-3d-scatter',
        'viz-protocol-barchart',
        'viz-label-piechart',
        'viz-3d-packetlength',
        'viz-3d-radar'
    ];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            // Container is ready for Python-generated content
            console.log(`Visualization container ${containerId} initialized`);
        }
    });
}

function checkForVisualizations() {
    // This function would normally poll the backend for visualization updates
    // For now, it's just a placeholder for the backend integration
    
    // Simulate status changes
    const statusBox = document.querySelector('.stat-value');
    if (statusBox) {
        const statuses = ['RUNNING', 'ANALYZING', 'COMPLETE'];
        const currentStatus = statusBox.textContent;
        const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
        
        statusBox.textContent = nextStatus;
        
        // Change color based on status
        statusBox.className = 'stat-value';
        switch (nextStatus) {
            case 'RUNNING':
                statusBox.classList.add('running');
                break;
            case 'ANALYZING':
                statusBox.classList.add('warning');
                break;
            case 'COMPLETE':
                statusBox.classList.add('good');
                break;
        }
    }
}