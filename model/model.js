document.addEventListener('DOMContentLoaded', () => {
    // Configure charts with cyberpunk theme
    const chartConfig = {
        color: '#ffffff',
        borderColor: '#ff00ff',
        gridColor: 'rgba(255, 255, 255, 0.1)',
        fontFamily: "'Rajdhani', sans-serif",
        tooltipBackground: 'rgba(10, 15, 30, 0.8)'
    };

    // Apply theme to Chart.js
    Chart.defaults.color = chartConfig.color;
    Chart.defaults.font.family = chartConfig.fontFamily;
    Chart.defaults.scale.grid.color = chartConfig.gridColor;
    
    // Create Attack Type Distribution Chart
    const attackTypeCtx = document.getElementById('attackTypeChart').getContext('2d');
    const attackTypeChart = new Chart(attackTypeCtx, {
        type: 'polarArea',
        data: {
            labels: ['SYN Flood', 'UDP Flood', 'HTTP Flood', 'DNS Amplification', 'ICMP Flood'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    'rgba(0, 248, 255, 0.7)',
                    'rgba(255, 0, 255, 0.7)',
                    'rgba(255, 255, 0, 0.7)',
                    'rgba(76, 199, 144, 0.7)',
                    'rgba(255, 76, 76, 0.7)'
                ],
                borderColor: '#0a0a14',
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
                },
                legend: {
                    position: 'right',
                    align: 'center',
                },
                title: {
                    display: false
                }
            },
            scales: {
                r: {
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#ffffff'
                    }
                }
            }
        }
    });

    // Create Response Time Chart
    const responseTimeCtx = document.getElementById('responseTimeChart').getContext('2d');
    const responseTimeChart = new Chart(responseTimeCtx, {
        type: 'bar',
        data: {
            labels: ['Traditional\nSystems', 'Packet Vision'],
            datasets: [{
                label: 'Average Response Time (ms)',
                data: [3500, 350],
                backgroundColor: [
                    'rgba(255, 76, 76, 0.7)',
                    'rgba(76, 199, 144, 0.7)'
                ],
                borderColor: [
                    '#ff4c4c',
                    '#4CC790'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
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
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Time (ms)'
                    }
                }
            }
        }
    });

    // Add new detection items dynamically
    setInterval(() => {
        if (Math.random() > 0.7) {
            addNewDetection();
        }
    }, 8000);

    // Function to add new detection
    function addNewDetection() {
        const detectionList = document.querySelector('.detection-list');
        const attackTypes = ['SYN Flood', 'UDP Flood', 'HTTP Flood', 'DNS Amplification', 'ICMP Flood'];
        const severities = ['warning', 'danger'];
        
        // Generate random values
        const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        const confidence = (90 + Math.random() * 8).toFixed(1);
        
        // Create current time
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Create detection item element
        const newDetection = document.createElement('div');
        newDetection.className = 'detection-item';
        newDetection.innerHTML = `
            <div class="detection-time">${timeString}</div>
            <div class="detection-type ${severity}">${attackType}</div>
            <div class="detection-source">Source: ${Math.floor(Math.random() * 255)}.XX.XX.XX</div>
            <div class="detection-confidence">Confidence: ${confidence}%</div>
            <div class="detection-status">Status: <span class="status-blocked">Blocking...</span></div>
        `;
        
        // Add animation class
        newDetection.classList.add('new-detection');
        
        // Add to the top of the list
        detectionList.insertBefore(newDetection, detectionList.firstChild);
        
        // Remove oldest item if more than 5
        if (detectionList.children.length > 5) {
            detectionList.removeChild(detectionList.lastChild);
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            newDetection.classList.remove('new-detection');
            const statusSpan = newDetection.querySelector('.status-blocked');
            statusSpan.textContent = 'Blocked';
        }, 1000);
    }
});