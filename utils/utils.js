import utilStyles from '../styles/utils.module.css';
import dictionary from '../resources/5-letter-words.js';


export const getOccurrences = (letter, word) => {
    var count = (word.split(letter)).length - 1;
    return count;
}

export const evaluation = (index, wordArray, winningWord, winningWordArray) => {
    let letter = wordArray[index].toUpperCase();
    //console.log("compare/evealuate: (input) " + letter + ", (winningWord) " + winningWordArray[index]);

    // if letter is in the right spot - correct
    if (winningWordArray[index] == letter) {
        return utilStyles.wordBoxCorrect;
    }

    // if letter is there but wrong spot - present
    if (winningWord.includes(letter)) {
        var letterOccur = getOccurrences(letter, winningWord);
        var wordCut = wordArray.slice(0, index).join("");
        var letterSeen = getOccurrences(letter, wordCut);
        if (letterSeen < letterOccur) {
         return utilStyles.wordBoxPresent;
     }
 }

    // if letter is not there - absent
 return utilStyles.wordBoxAbsent;
}

export const evaluations = (wordArray, winningWord, winningWordArray) => {
    let evals = ['','','','',''];
    const word = wordArray.join("").toUpperCase();

    let i = 0;
    const state = evals.map((c, index) => {
        if (i === index) {
            let a = evaluation(i, wordArray, winningWord, winningWordArray);
            i++;
            return a;
        } else {
            i++;
            return c;
        }
    });

 //   console.log("evaluations: ");
 //   console.log(state);
    return state;
}

export const isWord = (word) => {
    return dictionary.words.includes(word.toLowerCase()) || dictionary.words.includes(word.toUpperCase());
}

export const currTurn = (boardStateGuesses) => {
    for (let i=0; i < 6; i++) {
        if(boardStateGuesses[i].guess=="" || boardStateGuesses[i].guess==null) {
            return i;
        }
    }
    return null;
}



