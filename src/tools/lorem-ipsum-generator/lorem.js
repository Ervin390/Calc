(function () {
    'use strict';

    const WORDS = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
        'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
        'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
        'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
        'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
        'est', 'laborum', 'perspiciatis', 'unde', 'omnis', 'iste', 'natus', 'error',
        'sit', 'voluptatem', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
        'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
        'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo',
        'nemo', 'enim', 'ipsam', 'voluptatem', 'quia', 'voluptas', 'sit', 'aspernatur',
        'aut', 'odit', 'aut', 'fugit', 'sed', 'quia', 'consequuntur', 'magni', 'dolores',
        'eos', 'qui', 'ratione', 'voluptatem', 'sequi', 'nesciunt', 'neque', 'porro',
        'quisquam', 'est', 'qui', 'dolorem', 'ipsum', 'quia', 'dolor', 'sit', 'amet'
    ];

    const STANDARD_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    const countInput = document.getElementById('lig-count');
    const unitSelect = document.getElementById('lig-unit');
    const formatSelect = document.getElementById('lig-format');
    const startLoremCheck = document.getElementById('lig-start-lorem');
    const outputTextarea = document.getElementById('lig-output');
    const copyBtn = document.getElementById('lig-btn-copy');
    const copyMsg = document.getElementById('lig-copy-msg');

    const statWordsSpan = document.getElementById('lig-stat-words');
    const statCharsSpan = document.getElementById('lig-stat-chars');
    const statParagraphsSpan = document.getElementById('lig-stat-paragraphs');

    function getRandomWord() {
        return WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateSentence(wordCount) {
        const len = wordCount || Math.floor(Math.random() * 8) + 5;
        const sentenceWords = [];
        for (let i = 0; i < len; i++) {
            sentenceWords.push(getRandomWord());
        }
        return capitalize(sentenceWords.join(' ')) + '.';
    }

    function generateParagraph(sentenceCount) {
        const len = sentenceCount || Math.floor(Math.random() * 4) + 3;
        const sentences = [];
        for (let i = 0; i < len; i++) {
            sentences.push(generateSentence());
        }
        return sentences.join(' ');
    }

    function generate() {
        const count = Math.max(1, parseInt(countInput.value) || 1);
        const unit = unitSelect ? unitSelect.value : 'paragraphs';
        const format = formatSelect ? formatSelect.value : 'text';
        const startLorem = startLoremCheck ? startLoremCheck.checked : true;

        let paragraphs = [];

        if (unit === 'paragraphs') {
            for (let i = 0; i < count; i++) {
                if (i === 0 && startLorem) {
                    const extraSentences = generateParagraph(3);
                    paragraphs.push(STANDARD_START + ' ' + extraSentences);
                } else {
                    paragraphs.push(generateParagraph());
                }
            }
        } else if (unit === 'sentences') {
            const sentences = [];
            for (let i = 0; i < count; i++) {
                if (i === 0 && startLorem) {
                    sentences.push(STANDARD_START);
                } else {
                    sentences.push(generateSentence());
                }
            }
            // group sentences into paragraphs of ~4
            for (let i = 0; i < sentences.length; i += 4) {
                paragraphs.push(sentences.slice(i, i + 4).join(' '));
            }
        } else if (unit === 'words') {
            const words = [];
            if (startLorem) {
                const stdWords = STANDARD_START.replace(/[.,]/g, '').split(' ');
                for (let i = 0; i < Math.min(count, stdWords.length); i++) {
                    words.push(stdWords[i]);
                }
            }
            while (words.length < count) {
                words.push(getRandomWord());
            }
            paragraphs.push(capitalize(words.join(' ')) + '.');
        } else if (unit === 'bytes') {
            let str = startLorem ? STANDARD_START : generateParagraph(5);
            while (str.length < count) {
                str += ' ' + generateParagraph(3);
            }
            paragraphs.push(str.substring(0, count));
        } else if (unit === 'list') {
            const items = [];
            for (let i = 0; i < count; i++) {
                items.push(generateSentence(Math.floor(Math.random() * 5) + 4));
            }
            if (format === 'html') {
                outputTextarea.value = '<ul>\n' + items.map(item => `  <li>${item}</li>`).join('\n') + '\n</ul>';
                updateStats(outputTextarea.value, 1);
                return;
            } else if (format === 'markdown') {
                outputTextarea.value = items.map(item => `* ${item}`).join('\n');
                updateStats(outputTextarea.value, 1);
                return;
            } else {
                outputTextarea.value = items.map(item => `• ${item}`).join('\n');
                updateStats(outputTextarea.value, 1);
                return;
            }
        }

        // Format Output for Paragraphs/Sentences/Words/Bytes
        let result = '';
        if (format === 'html') {
            result = paragraphs.map(p => `<p>${p}</p>`).join('\n\n');
        } else if (format === 'markdown') {
            result = paragraphs.map((p, idx) => (idx === 0 ? `## Heading\n\n${p}` : p)).join('\n\n');
        } else {
            result = paragraphs.join('\n\n');
        }

        outputTextarea.value = result;
        updateStats(result, paragraphs.length);
    }

    function updateStats(text, pCount) {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;

        if (statWordsSpan) statWordsSpan.textContent = words.toLocaleString();
        if (statCharsSpan) statCharsSpan.textContent = chars.toLocaleString();
        if (statParagraphsSpan) statParagraphsSpan.textContent = pCount;
    }

    function copyToClipboard() {
        if (!outputTextarea.value) return;
        outputTextarea.select();
        navigator.clipboard.writeText(outputTextarea.value).then(() => {
            if (copyMsg) {
                copyMsg.textContent = 'Copied to clipboard!';
                setTimeout(() => { copyMsg.textContent = ''; }, 2500);
            }
        }).catch(() => {
            if (copyMsg) copyMsg.textContent = 'Failed to copy.';
        });
    }

    [countInput, unitSelect, formatSelect, startLoremCheck].forEach(elem => {
        if (elem) elem.addEventListener('change', generate);
        if (elem && elem.tagName === 'INPUT') elem.addEventListener('input', generate);
    });

    if (copyBtn) copyBtn.addEventListener('click', copyToClipboard);

    generate();
})();
