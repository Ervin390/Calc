document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('morse-input');
    const resultArea = document.getElementById('morse-result');
    const btnPlay = document.getElementById('btn-play');
    const btnStop = document.getElementById('btn-stop');
    const btnClear = document.getElementById('btn-clear');
    const btnCopy = document.getElementById('btn-copy');

    // Dictionary
    const morseDict = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
        '!': '-.-.--', '-': '-....-', '/': '-..-.', '@': '.--.-.', '(': '-.--.',
        ')': '-.--.-'
    };

    const reverseDict = {};
    for (let key in morseDict) {
        reverseDict[morseDict[key]] = key;
    }

    let audioContext = null;
    let isPlaying = false;
    let stopPlayback = false;

    // Detection and translation
    function isMorseCode(str) {
        const trimmed = str.trim();
        if (trimmed.length === 0) return false;
        // Count typical morse characters
        const morseChars = (trimmed.match(/[\.\-\/\s]/g) || []).length;
        return morseChars / trimmed.length > 0.8;
    }

    function textToMorse(text) {
        return text.toUpperCase().split('').map(char => {
            if (char === ' ') return '/';
            return morseDict[char] || '#';
        }).join(' ');
    }

    function morseToText(morse) {
        return morse.trim().split(' ').map(code => {
            if (code === '/' || code === '|') return ' ';
            if (code === '') return '';
            return reverseDict[code] || '#';
        }).join('');
    }

    function handleInput() {
        const input = inputArea.value;
        if (!input) {
            resultArea.value = '';
            return;
        }

        if (isMorseCode(input)) {
            resultArea.value = morseToText(input);
        } else {
            resultArea.value = textToMorse(input);
        }
    }

    inputArea.addEventListener('input', handleInput);

    // Audio Playback
    async function playMorse(morseStr) {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        isPlaying = true;
        stopPlayback = false;
        btnPlay.style.display = 'none';
        btnStop.style.display = 'inline-block';

        const dotLen = 80; // ms
        
        for (let i = 0; i < morseStr.length; i++) {
            if (stopPlayback) break;
            
            const char = morseStr[i];
            
            if (char === '.' || char === '-') {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                
                osc.type = 'sine';
                osc.frequency.value = 600;
                
                osc.connect(gain);
                gain.connect(audioContext.destination);
                
                gain.gain.setValueAtTime(0, audioContext.currentTime);
                gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
                
                const dur = char === '.' ? dotLen : dotLen * 3;
                
                osc.start(audioContext.currentTime);
                await new Promise(r => setTimeout(r, dur));
                
                gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.01);
                osc.stop(audioContext.currentTime + 0.02);
                
                // Gap between parts of same letter
                await new Promise(r => setTimeout(r, dotLen));
            } else if (char === ' ') {
                // Gap between letters
                await new Promise(r => setTimeout(r, dotLen * 3));
            } else if (char === '/') {
                // Gap between words
                await new Promise(r => setTimeout(r, dotLen * 7));
            }
        }
        
        isPlaying = false;
        btnStop.style.display = 'none';
        btnPlay.style.display = 'inline-block';
    }

    btnPlay.addEventListener('click', () => {
        if (isPlaying) return;
        const txt = isMorseCode(inputArea.value) ? inputArea.value : resultArea.value;
        if (txt) playMorse(txt);
    });

    btnStop.addEventListener('click', () => {
        stopPlayback = true;
    });

    btnClear.addEventListener('click', () => {
        inputArea.value = '';
        resultArea.value = '';
        stopPlayback = true;
    });

    btnCopy.addEventListener('click', () => {
        if (!resultArea.value) return;
        navigator.clipboard.writeText(resultArea.value).then(() => {
            const originalText = btnCopy.textContent;
            btnCopy.textContent = 'Copied!';
            setTimeout(() => {
                btnCopy.textContent = originalText;
            }, 2000);
        }).catch(() => {
            btnCopy.textContent = 'Press Ctrl+C';
        });
    });
});
