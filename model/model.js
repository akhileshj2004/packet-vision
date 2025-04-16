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




document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('model-form');
    const inputSummary = document.getElementById('input-summary');
    const analysisResults = document.getElementById('analysis-results');
    const analysisLogs = document.getElementById('analysis-logs');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        analysisResults.innerHTML = `
            <div class="loading-animation">
                <div class="cyber-spinner"></div>
                <p>Analyzing network traffic...</p>
            </div>
        `;
        
        // Get form data
        const formData = {
            flowDuration: parseFloat(document.getElementById('flow-duration').value),
            totalFwdPackets: parseFloat(document.getElementById('total-fwd-packets').value),
            totalBackwardPackets: parseFloat(document.getElementById('total-backward-packets').value),
            fwdPacketLengthMax: parseFloat(document.getElementById('fwd-packet-length-max').value),
            bwdPacketLengthMax: parseFloat(document.getElementById('bwd-packet-length-max').value)
        };
        
        // Display input summary
        inputSummary.innerHTML = `
            <ul class="summary-list">
                <li><strong>Flow Duration:</strong> ${formData.flowDuration}</li>
                <li><strong>Total Fwd Packets:</strong> ${formData.totalFwdPackets}</li>
                <li><strong>Total Backward Packets:</strong> ${formData.totalBackwardPackets}</li>
                <li><strong>Fwd Packet Length Max:</strong> ${formData.fwdPacketLengthMax}</li>
                <li><strong>Bwd Packet Length Max:</strong> ${formData.bwdPacketLengthMax}</li>
            </ul>
        `;
        
        // Add log entry
        addLog('SYSTEM', 'Processing input data...');
        
        // Send data to API
        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Display results
                const confidencePercent = (data.confidence * 100).toFixed(2);
                
                analysisResults.innerHTML = `
                    <div class="result-card ${data.prediction.toLowerCase().includes('attack') ? 'attack' : 'normal'}">
                        <h5>Traffic Classification</h5>
                        <div class="result-value">${data.prediction}</div>
                        <div class="confidence-meter">
                            <div class="confidence-label">Model Confidence: ${confidencePercent}%</div>
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: ${confidencePercent}%"></div>
                            </div>
                        </div>
                        ${data.prediction.toLowerCase().includes('attack') ? 
                            '<div class="alert-banner"><i class="fas fa-exclamation-triangle"></i> POTENTIAL ATTACK DETECTED</div>' : 
                            '<div class="success-banner"><i class="fas fa-check-circle"></i> NORMAL TRAFFIC</div>'}
                    </div>
                `;
                
                addLog('RESULT', `Analysis complete: ${data.prediction} (${confidencePercent}% confidence)`);
            } else {
                analysisResults.innerHTML = `
                    <div class="error-card">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Error processing request: ${data.message}</p>
                    </div>
                `;
                addLog('ERROR', `Analysis failed: ${data.message}`);
            }
        })
        .catch(error => {
            analysisResults.innerHTML = `
                <div class="error-card">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Network error: ${error.message}</p>
                </div>
            `;
            addLog('ERROR', `Network error: ${error.message}`);
        });
    });
    
    function addLog(type, message) {
        const now = new Date();
        const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type.toLowerCase()}`;
        logEntry.innerHTML = `
            <span class="log-timestamp">[${type}] ${timestamp}</span>
            <span class="log-message">${message}</span>
        `;
        
        analysisLogs.prepend(logEntry);
    }
});