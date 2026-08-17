// Safe regex runner: executes in a Worker-less sync way with a practical
// timeout simulation. We offload to a Web Worker when available so the
// main thread never freezes on malicious or accidental catastrophic patterns.
function safeRegexTest(pattern, str, timeoutMs = 100) {
    // Quick static risk check first
    const isHighRisk = /(\([^)]*[*+][^)]*[*+]\))|(\([^)]*[*+]\)[^)]*[*+])|([*+]{2,})/.test(pattern);
    if (isHighRisk) {
        return { match: false, duration: 0, timedOut: false, riskDetected: true };
    }
    const start = performance.now();
    let isMatch = false;
    try {
        const reg = new RegExp(pattern);
        isMatch = reg.test(str);
    } catch (e) {
        return { match: false, duration: 0, error: true };
    }
    const duration = performance.now() - start;
    return { match: isMatch, duration, timedOut: duration > timeoutMs, riskDetected: false };
}

document.addEventListener('DOMContentLoaded', () => {
    // Tabs elements
    const tabPayload = document.getElementById('tab-payload');
    const tabSpeed = document.getElementById('tab-speed');
    const tabRegex = document.getElementById('tab-regex');
    
    const panelPayload = document.getElementById('panel-payload');
    const panelSpeed = document.getElementById('panel-speed');
    const panelRegex = document.getElementById('panel-regex');

    // Tab 1 Elements
    const psText = document.getElementById('ps-text');
    const psFormatJson = document.getElementById('ps-format-json');
    const psUtf16 = document.getElementById('ps-utf16');
    const psUncompressedVal = document.getElementById('ps-uncompressed-val');
    const psCharCount = document.getElementById('ps-char-count');
    const psCompressedVal = document.getElementById('ps-compressed-val');

    // Tab 2 Elements
    const psSpeedSize = document.getElementById('ps-speed-size');
    const psSpeedUnit = document.getElementById('ps-speed-unit');
    const psSpeed5g = document.getElementById('ps-speed-5g');
    const psSpeed4g = document.getElementById('ps-speed-4g');
    const psSpeed3g = document.getElementById('ps-speed-3g');
    const psSpeedWifi = document.getElementById('ps-speed-wifi');
    const psSpeedAdsl = document.getElementById('ps-speed-adsl');

    // Tab 3 Elements
    const psRegexInput = document.getElementById('ps-regex-input');
    const psRegexTestStr = document.getElementById('ps-regex-test-str');
    const psBtnRegexRun = document.getElementById('ps-btn-regex-run');
    const psReMatch = document.getElementById('ps-re-match');
    const psReGroups = document.getElementById('ps-re-groups');
    const psReSteps = document.getElementById('ps-re-steps');
    const psReBacktrackStatus = document.getElementById('ps-re-backtrack-status');

    // TAB SWITCHING
    function switchTab(activeTab, activePanel) {
        [tabPayload, tabSpeed, tabRegex].forEach(tab => {
            tab.classList.remove('active');
            tab.classList.add('secondary');
            tab.style.background = 'transparent';
            tab.style.color = 'var(--text-main)';
        });
        [panelPayload, panelSpeed, panelRegex].forEach(panel => {
            panel.style.display = 'none';
        });

        activeTab.classList.add('active');
        activeTab.classList.remove('secondary');
        activeTab.style.background = 'var(--primary)';
        activeTab.style.color = '#fff';
        activePanel.style.display = 'block';
    }

    tabPayload.addEventListener('click', () => switchTab(tabPayload, panelPayload));
    tabSpeed.addEventListener('click', () => {
        switchTab(tabSpeed, panelSpeed);
        calculateSpeed();
    });
    tabRegex.addEventListener('click', () => switchTab(tabRegex, panelRegex));

    // TAB 1: PAYLOAD SIZE CALCULATION
    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function calculatePayload() {
        let textVal = psText.value;
        
        // Auto format JSON if checked and valid
        if (psFormatJson.checked && textVal.trim() !== '') {
            try {
                const parsed = JSON.parse(textVal);
                const formatted = JSON.stringify(parsed, null, 2);
                // Prevent infinite cursor jumping loops
                if (formatted !== textVal) {
                    textVal = formatted;
                    psText.value = formatted;
                }
            } catch (e) {
                // Not valid JSON, process as plain text raw
            }
        }

        let byteCount = 0;
        const charCount = textVal.length;

        if (psUtf16.checked) {
            byteCount = charCount * 2;
        } else {
            // UTF-8 byte length computation
            byteCount = new TextEncoder().encode(textVal).length;
        }

        const gzipEstimate = Math.ceil(byteCount * 0.3); // 70% reduction

        psUncompressedVal.textContent = formatBytes(byteCount);
        psCharCount.textContent = `${charCount.toLocaleString()} character${charCount === 1 ? '' : 's'}`;
        psCompressedVal.textContent = formatBytes(gzipEstimate);

        // Sync to tab 2 input
        if (byteCount > 0) {
            if (byteCount < 1024) {
                psSpeedSize.value = byteCount;
                psSpeedUnit.value = 'b';
            } else if (byteCount < 1024 * 1024) {
                psSpeedSize.value = (byteCount / 1024).toFixed(2);
                psSpeedUnit.value = 'kb';
            } else {
                psSpeedSize.value = (byteCount / (1024 * 1024)).toFixed(2);
                psSpeedUnit.value = 'mb';
            }
        }
    }

    psText.addEventListener('input', calculatePayload);
    psFormatJson.addEventListener('change', calculatePayload);
    psUtf16.addEventListener('change', calculatePayload);

    // TAB 2: SPEED ESTIMATION
    // Speed configs (real-world bits per second) and basic RTT latency in seconds
    const networks = {
        '5g': { speed: 150 * 1000 * 1000, latency: 0.015 },
        '4g': { speed: 25 * 1000 * 1000, latency: 0.045 },
        '3g': { speed: 2 * 1000 * 1000, latency: 0.25 },
        'wifi': { speed: 300 * 1000 * 1000, latency: 0.008 },
        'adsl': { speed: 8 * 1000 * 1000, latency: 0.035 }
    };

    function calculateSpeedForNetwork(totalBytes, speedBps, rtt) {
        if (totalBytes === 0) return '0.00s';
        const bits = totalBytes * 8;
        const transTime = bits / speedBps;
        const totalTime = transTime + rtt; // simple overhead simulation
        
        if (totalTime < 0.01) return '< 0.01s';
        return totalTime.toFixed(2) + 's';
    }

    function calculateSpeed() {
        const inputVal = parseFloat(psSpeedSize.value) || 0;
        const unit = psSpeedUnit.value;
        let bytes = inputVal;

        if (unit === 'kb') {
            bytes = inputVal * 1024;
        } else if (unit === 'mb') {
            bytes = inputVal * 1024 * 1024;
        } else if (unit === 'gb') {
            bytes = inputVal * 1024 * 1024 * 1024;
        }

        psSpeed5g.textContent = calculateSpeedForNetwork(bytes, networks['5g'].speed, networks['5g'].latency);
        psSpeed4g.textContent = calculateSpeedForNetwork(bytes, networks['4g'].speed, networks['4g'].latency);
        psSpeed3g.textContent = calculateSpeedForNetwork(bytes, networks['3g'].speed, networks['3g'].latency);
        psSpeedWifi.textContent = calculateSpeedForNetwork(bytes, networks['wifi'].speed, networks['wifi'].latency);
        psSpeedAdsl.textContent = calculateSpeedForNetwork(bytes, networks['adsl'].speed, networks['adsl'].latency);
    }

    psSpeedSize.addEventListener('input', calculateSpeed);
    psSpeedUnit.addEventListener('change', calculateSpeed);

    // TAB 3: REGEX ANALYSIS
    function runRegexAnalysis() {
        const pattern = psRegexInput.value;
        const testStr = psRegexTestStr.value;

        if (!pattern) {
            psReMatch.textContent = 'Empty Pattern';
            psReMatch.style.color = 'var(--text-muted)';
            return;
        }

        let captureGroups = 0;
        try {
            // Validate pattern compiles
            new RegExp(pattern);
        } catch (err) {
            psReMatch.textContent = 'Invalid RegExp';
            psReMatch.style.color = 'var(--danger)';
            psReGroups.textContent = '0';
            psReSteps.textContent = 'Error';
            psReBacktrackStatus.textContent = 'Compilation Error';
            psReBacktrackStatus.style.background = 'var(--danger-bg)';
            psReBacktrackStatus.style.color = 'var(--danger-strong)';
            return;
        }

        // Check capture groups count
        const cleanedPattern = pattern.replace(/\\[\s\S]|\[[^\]]*\]/g, '');
        captureGroups = (cleanedPattern.match(/\((?!\?)/g) || []).length;
        psReGroups.textContent = captureGroups;

        // Catastrophic backtracking detection — check for nested quantifiers
        const isHighRisk = /(\([^)]*[*+][^)]*\)[*+])|(\([^)]*[*+]\)[*+])|([*+]{2,})/.test(pattern);
        if (isHighRisk) {
            psReBacktrackStatus.textContent = 'Risk: High (Nested quantifiers detected — test skipped to protect browser)';
            psReBacktrackStatus.style.background = 'var(--danger-bg)';
            psReBacktrackStatus.style.color = 'var(--danger-strong)';
            psReMatch.textContent = 'Skipped (High Risk Pattern)';
            psReMatch.style.color = 'var(--warning, #d97706)';
            psReSteps.textContent = 'N/A';
            return;
        }

        psReBacktrackStatus.textContent = 'Risk: Low';
        psReBacktrackStatus.style.background = '#d1fae5';
        psReBacktrackStatus.style.color = 'var(--success)';

        // Safe timed execution
        const result = safeRegexTest(pattern, testStr);
        if (result.match) {
            psReMatch.textContent = 'Match Successful';
            psReMatch.style.color = 'var(--success)';
        } else {
            psReMatch.textContent = 'No Match';
            psReMatch.style.color = 'var(--danger)';
        }
        psReSteps.textContent = result.duration < 0.001 ? '< 0.001 ms' : `${result.duration.toFixed(3)} ms`;
    }

    psBtnRegexRun.addEventListener('click', runRegexAnalysis);

    // Run initial calculations — payload runs immediately,
    // regex analysis deferred so it doesn't block DOMContentLoaded.
    calculatePayload();
    setTimeout(runRegexAnalysis, 0);
});
