document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('char-input');
    const outChars = document.getElementById('out-chars');
    const outCharsNoSpace = document.getElementById('out-chars-nospace');
    const outWords = document.getElementById('out-words');
    const outSentences = document.getElementById('out-sentences');
    const outParagraphs = document.getElementById('out-paragraphs');

    function analyzeText() {
        const text = inputArea.value;
        const length = text.length;
        
        // Chars without spaces
        const noSpaceStr = text.replace(/\s+/g, '');
        const noSpaceLen = noSpaceStr.length;

        // Words
        const wordsArr = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = wordsArr.length;

        // Sentences (basic regex splitting on end punctuation)
        const sentArr = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const sentCount = sentArr.length;

        // Paragraphs (splitting on double newline or newline)
        const paraArr = text.split(/\n+/).filter(para => para.trim().length > 0);
        const paraCount = paraArr.length;

        outChars.textContent = length;
        outCharsNoSpace.textContent = noSpaceLen;
        outWords.textContent = wordCount;
        outSentences.textContent = sentCount;
        outParagraphs.textContent = paraCount;
    }

    inputArea.addEventListener('input', analyzeText);
    
    // Initial run
    analyzeText();
});
