const checkWords = (code, wordsToCheck) => {
    let wordCount = 0;
    // Check if each word exists in the string
    for (let i = 0; i < wordsToCheck.length; i++) {
        let word = wordsToCheck[i];
        let index = code.indexOf(word);
        while (index !== -1) {
            wordCount++;
            index = code.indexOf(word, index + 1);
        }
    }
    return wordCount;
}

const checkCode = (code, input, wordsToCheck,setOutput) => {
    let wordCount = checkWords(code.toLowerCase(), wordsToCheck);
    if (wordCount > 0) {
        if (input.length == 0) {
            setOutput('Please provide input to run the code.');
            return false;
        }
        else if (wordCount > input.length) {
            setOutput(`Please provide ${wordCount} input parameters separated by a new line.`);
            return false;
        }
        else
            return true;
    }
    else {
        return true;
    }
}
const UtilService = {
    CheckCode: checkCode,
}

export default UtilService;