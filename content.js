let lastTime = 0;
let skipSegments = [];
let totalSkipped = 0;
let isInitialized = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initializeTracker() {
    const video = document.querySelector('video');
    
    if (!video || isInitialized) return;
    
    isInitialized = true;
    lastTime = 0;
    skipSegments = [];
    totalSkipped = 0;

    console.log('YouTube Skip Tracker: Initialized (Enhanced Version)');

    video.addEventListener('seeked', () => {
        const currentTime = video.currentTime;
        const timeDiff = Math.abs(currentTime - lastTime);
        
        if (timeDiff > 2) {
            const skipData = {
                from: lastTime,
                to: currentTime,
                skipped: timeDiff,
                fromFormatted: formatTime(lastTime),
                toFormatted: formatTime(currentTime),
                direction: currentTime > lastTime ? 'forward' : 'backward'
            };
            
            skipSegments.push(skipData);
            totalSkipped += timeDiff;
            
            console.log(`Skip detected: ${skipData.fromFormatted} → ${skipData.toFormatted} (${skipData.direction})`);
        }
        
        lastTime = currentTime;
    });

    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;
        if (Math.abs(currentTime - lastTime) <= 2) {
            lastTime = currentTime;
        }
    });

    video.addEventListener('loadedmetadata', () => {
        console.log('YouTube Skip Tracker: New video loaded, resetting data');
        lastTime = 0;
        skipSegments = [];
        totalSkipped = 0;
    });
}

initializeTracker();
setTimeout(initializeTracker, 2000);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSkipData') {
        sendResponse({
            skipSegments: skipSegments,
            totalSkipped: totalSkipped,
            totalSkippedFormatted: formatTime(totalSkipped)
        });
    } else if (request.action === 'clearData') {
        skipSegments = [];
        totalSkipped = 0;
        lastTime = 0;
        sendResponse({success: true});
    }
    return true;
});
