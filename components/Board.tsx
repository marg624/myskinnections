import utilStyles from '../styles/utils.module.css';
import React from 'react';
import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  forwardRef
} from 'react';
import Row from './Row';
import Confetti from 'react-confetti'
import {  evaluations } from '../utils/utils';
import { isMobile } from 'react-device-detect';
import {CopyToClipboard} from 'react-copy-to-clipboard';

interface Props {
  winningWord: string,
  gameId: string,
};

interface BoardState {
  [key: number]: {
    readOnly: boolean;
    guess: any;
    evaluation: any;
  };
};

interface GuessState {
  boardState: BoardState,
  alphabetState: any,
  gameOverMsg?: string,
  gameOver: boolean,
  win: boolean,
  winningWord: string,
  gameId: string,
  isCopied: boolean,
  gameOverText: string
};

class Board extends React.Component<Props, GuessState>  {

  constructor(props: Props) {
    super(props);
    const boardState1 = {
      0: {readOnly: false, guess: null, evaluation: null},
      1: {readOnly: true, guess: null, evaluation: null},
      2: {readOnly: true, guess: null, evaluation: null},
      3: {readOnly: true, guess: null, evaluation: null},
      4: {readOnly: true, guess: null, evaluation: null},
      5: {readOnly: true, guess: null, evaluation: null}
    };
    let alphabetState1 = {"A": "", "B":"", "C":"", "D":"", "E":"", "F":"", "G":"", "H":"", "I":"", "J":"", "K":"", "L":"", "M":"", "N":"", "O":"", "P":"", "Q":"", "R":"", "S":"", "T":"", "U":"", "V":"", "W":"", "X":"", "Y":"", "Z":""};
    let win1 = false
    let winningWord1 = props.winningWord;
    let gameId1 = props.gameId;

    this.state = {boardState: boardState1, gameOverText:"", isCopied:false, alphabetState:alphabetState1, gameId:gameId1, gameOverMsg:null, gameOver:false, win:win1, winningWord: winningWord1};
    this.focusNext = this.focusNext.bind(this);
    this.alphaHelper = this.alphaHelper.bind(this);
    this.sayCopied = this.sayCopied.bind(this);
  }


  focusNext(rowNum, guessedWord, evaluationWord) {
    let currRow = rowNum; 
    rowNum++; 
    let nextRow = rowNum;
    
    let newBoardState = { ... this.state.boardState };
    newBoardState[currRow].readOnly = true;
    newBoardState[currRow].guess = guessedWord;
    newBoardState[currRow].evaluation = evaluationWord;

    let newState = Object.assign(this.state, {boardState: newBoardState})

    this.alphaHelper(guessedWord.toUpperCase(), evaluationWord);

    let correct = utilStyles.wordBoxCorrect;
    if (evaluationWord[0] == correct && evaluationWord[1] == correct && evaluationWord[2] == correct && evaluationWord[3] == correct && evaluationWord[4] == correct) {
       let newGameOverMsg = "Congrats, you win!\nYou guessed " + this.props.winningWord.toUpperCase() + " in " + rowNum + " tries.";
       newState = Object.assign(newState, { win: true }, { gameOver: true }, {gameOverMsg: newGameOverMsg});
    } else if (nextRow < 6) {
       newBoardState[nextRow].readOnly = false;
       newState = Object.assign(newState, {boardState: newBoardState})
    } else {
       let newGameOverMsg =  "You lose! The word was " + this.props.winningWord.toUpperCase();
       newState = Object.assign(newState, { win: false }, { gameOver: true }, {gameOverMsg: newGameOverMsg});
    }

    if (newState.gameOver) {
        let green = "🟩";
        let yellow = "🟨";
        let gray = "⬜";
        let trophy = "🏅";
        let losing = "🫠";
        const today = new Date();
        const month = today.toLocaleString('default', { month: 'long' });
        const year = today.getFullYear();
        const date = today.getDate();
        let dateString = `${month} ${date}`;
        let gameOverTextNew = ""
        if (newState.win) {
           gameOverTextNew = "MySkindle " + dateString + "\n" + trophy + rowNum + "/6";
        } else {
           gameOverTextNew = "MySkindle " + dateString + "\n" + losing + "X/6";
        }

        newState = Object.assign(newState, { gameOverText: gameOverTextNew });
    }

    this.setState(newState);
    
}

alphaHelper(guessedWord, evaluationWord) {
  let newArr2 = { ... this.state.alphabetState };
  let correct = utilStyles.wordBoxCorrect;
  let present = utilStyles.wordBoxPresent;
  let absent = utilStyles.wordBoxAbsent;
  for (let i=0; i < 5; i++) {
    let letter = guessedWord.charAt(i);
    let evaluation = evaluationWord[i];
    let existingEvaluation = this.state.alphabetState[letter];
    if (existingEvaluation != "") {
      if ((existingEvaluation == correct) || (existingEvaluation == present && evaluation == absent)) {
                    // do nothing
      } else {
        newArr2[letter] = evaluation;
      }
    } else {
      newArr2[letter] = evaluation;
    }
  }
  let newState = Object.assign(this.state, {alphabetState: newArr2})
  this.setState(newState);
}

sayCopied() {
    this.setState(Object.assign(this.state, {isCopied: true}))
    setTimeout(() => {
      this.setState(Object.assign(this.state, {isCopied: false}))
    }, 1000);
  };


render() {
  let even = true;
  let odd = true;    

  const Row0 = forwardRef((props, ref) => (
    <Row rowNum={0} ref={ref} gameId={this.props.gameId} winningWord={this.props.winningWord} boardState={this.state.boardState} focusNextFunc={this.focusNext} isWin={this.state.win} /> ));
  const Row1 = forwardRef((props, ref) => (
    <Row rowNum={1} ref={ref} gameId={this.props.gameId} winningWord={this.props.winningWord} boardState={this.state.boardState} focusNextFunc={this.focusNext} isWin={this.state.win} /> ));
  const Row2 = forwardRef((props, ref) => (
    <Row rowNum={2} ref={ref} gameId={this.props.gameId} winningWord={this.props.winningWord} boardState={this.state.boardState} focusNextFunc={this.focusNext} isWin={this.state.win} /> ));
  const Row3 = forwardRef((props, ref) => (
    <Row rowNum={3} ref={ref} gameId={this.props.gameId} winningWord={this.props.winningWord} boardState={this.state.boardState} focusNextFunc={this.focusNext} isWin={this.state.win}  /> ));
  const Row4 = forwardRef((props, ref) => (
    <Row rowNum={4} ref={ref} gameId={this.props.gameId} winningWord={this.props.winningWord} boardState={this.state.boardState} focusNextFunc={this.focusNext} isWin={this.state.win}  /> ));
  const Row5 = forwardRef((props, ref) => (
    <Row rowNum={5} ref={ref} gameId={this.props.gameId} winningWord={this.props.winningWord} boardState={this.state.boardState} focusNextFunc={this.focusNext} isWin={this.state.win}  /> ));   


  let breakNum = isMobile? 9 : 13;

  return (
      <div className={utilStyles.center}> 
        {this.state.win && <Confetti />}
        <Row0 /> 
        <Row1 />
        <Row2 /> 
        <Row3 /> 
        <Row4 />
        <Row5 /> 
        <br/>
        {this.state.gameOver  &&  <strong><br/>{this.state.gameOverMsg}<br/></strong>}
        {this.state.gameOver && 
          <span>
            <CopyToClipboard text={this.state.gameOverText} onCopy={() => this.sayCopied()}>
                <i className="fa">Share Results&#x2398;</i>
            </CopyToClipboard> 
            {this.state.isCopied && <span className="text-slate-300 text-right"> Copied! </span>} <br/>
          </span >
        }
        <br/>
        <div className={utilStyles.center }><br/>
          {Object.keys(this.state.alphabetState).map((key, index) => {
            let addBreak = ((index+1) % breakNum == 0) ? <br/> : ""
            let state1 = this.state.alphabetState[key]
            return ( 
             <span key={key}>
             <span className={utilStyles.alphabetBox + " " + state1}>{key}</span> 
             {addBreak}{addBreak}{addBreak}
             </span>
             );
          })}
        </div>  
      </div>
    );
}
}

export default Board;
