document.getElementById('showReport').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        
        if (!currentTab.url.includes('youtube.com/watch')) {
            document.getElementById('report').innerHTML = 
                '<div class="no-data"><div class="no-data-icon">⚠</div><p>Please open a YouTube video first!</p></div>';
            return;
        }
        
        chrome.tabs.sendMessage(currentTab.id, {action: 'getSkipData'}, function(response) {
            if (chrome.runtime.lastError) {
                document.getElementById('report').innerHTML = 
                    '<div class="no-data"><div class="no-data-icon">🔄</div><p>Please refresh the YouTube page and try again.</p></div>';
                return;
            }
            
            const {skipSegments, totalSkipped, totalSkippedFormatted} = response;
            
            if (skipSegments.length === 0) {
                document.getElementById('report').innerHTML = 
                    '<div class="no-data"><div class="no-data-icon">🎬</div><p>No skips detected yet!</p><p style="font-size:12px; margin-top:10px;">Start watching and skip around to see data.</p></div>';
                return;
            }
            
            // Calculate statistics
            const forwardSkips = skipSegments.filter(s => s.to > s.from).length;
            const backwardSkips = skipSegments.filter(s => s.to < s.from).length;
            
            // Build report HTML
            let report = `
                <div class="stats-summary">
                    <div class="stat-card">
                        <div class="stat-number">${skipSegments.length}</div>
                        <div class="stat-label">Total Skips</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${totalSkippedFormatted}</div>
                        <div class="stat-label">Time Skipped</div>
                    </div>
                </div>
                
                <div class="skip-types">
                    <strong>Skip Types:</strong> 
                    <span class="forward-count">Forward: ${forwardSkips}</span> | 
                    <span class="backward-count">Backward: ${backwardSkips}</span>
                </div>
            `;
            
            // Add each skip
            skipSegments.forEach((segment, index) => {
                const isForward = segment.to > segment.from;
                const direction = isForward ? 'Forward' : 'Backward';
                const skipClass = isForward ? 'skip-forward' : 'skip-backward';
                const badgeClass = isForward ? 'badge-forward' : 'badge-backward';
                
                report += `
                    <div class="skip-item ${skipClass}">
                        <div class="skip-header">
                            <span class="skip-number">Skip #${index + 1}</span>
                            <span class="skip-badge ${badgeClass}">${direction}</span>
                        </div>
                        <div class="skip-time">
                            ${segment.fromFormatted} → ${segment.toFormatted}
                        </div>
                        <div class="skip-duration">
                            Duration: ${segment.skipped.toFixed(1)} seconds
                        </div>
                    </div>
                `;
            });
            
            // Add total summary
            report += `
                <div class="total-summary">
                    <div class="total-label">TOTAL TIME SKIPPED</div>
                    <div class="total-time">${totalSkippedFormatted}</div>
                    <div class="total-label">(${totalSkipped.toFixed(1)} seconds)</div>
                </div>
            `;
            
            document.getElementById('report').innerHTML = report;
        });
    });
});
