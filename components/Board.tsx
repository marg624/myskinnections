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
import Confetti from 'react-confetti'
import {  evaluations } from '../utils/utils';
import { isMobile } from 'react-device-detect';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import WordBox from './word-box';

interface Props {
  winningMapWordToCats: Map<string, string>,
  winningMapCatToWords: Map<string, Array<string>>,
};


interface GuessState {
  clickedWords: Array<string>,
  categoriesWon: Array<string>,
  gameOverMsg?: string,
  gameOver: boolean,
  win: boolean,
  isCopied: boolean,
  isSubmit: boolean,
  isSubmitMsg: string,
  gameOverText: string,
  winningMapWordToCats: Map<string, string>,
  winningMapCatToWords: Map<string, Array<string>>,
  numGuesses: number,
};

class Board extends React.Component<Props, GuessState>  {

  constructor(props: Props) {
    super(props);
    let winningWord1 = props.winningMapWordToCats;
    let winningWord2 = props.winningMapCatToWords; 

    this.state = {numGuesses: 0, winningMapCatToWords: winningWord2, winningMapWordToCats: winningWord1, isSubmitMsg:"", isSubmit:false, gameOverText:"", isCopied:false, gameOverMsg:null, gameOver:false, win:false, clickedWords: [], categoriesWon: []};
    this.sayCopied = this.sayCopied.bind(this);
    this.clickedWord = this.clickedWord.bind(this);
    this.submit = this.submit.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.saySubmitMsg = this.saySubmitMsg.bind(this);
  }

submit() {
  let resp = this.checkWin()
  let num = this.state.numGuesses + 1
  let newState = Object.assign(this.state, {numGuesses: num})

  if (this.state.categoriesWon.length == 4 ) {
    let trophy = "🏅";
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const date = today.getDate();
    let dateString = `${month} ${date}`;

    let gameOverTextNew0 = "Congrats! You win this weeks MySkinnections in " + num + " guesses";    
    let gameOverTextNew = "MySkinnections " + dateString + "\n" + trophy + this.state.numGuesses + " guesses";
    newState = Object.assign(newState, { win: true }, { gameOver: true }, {gameOverMsg: gameOverTextNew0}, { gameOverText: gameOverTextNew });
  }

  this.setState(newState)

  if (resp) {
      this.saySubmitMsg("Correct!")
  } else {
    this.saySubmitMsg("Incorrect!")
  }

 }

 checkWin() {
//   this.setState(newState);
  let w1 = this.state.winningMapWordToCats.get(this.state.clickedWords[0])
  let w2 = this.state.winningMapWordToCats.get(this.state.clickedWords[1])
  let w3 = this.state.winningMapWordToCats.get(this.state.clickedWords[2])
  let w4 = this.state.winningMapWordToCats.get(this.state.clickedWords[3])

  if (w1 === w2 && w2 === w3 && w3 === w4) {
      const updatedWords = [...this.state.categoriesWon, w1];
    //  const updatedMapWords = this.state.winningMapWordToCats.filter((key, value) => value !== w1);
      const updatedMapWords = new Map(this.state.winningMapWordToCats);
      updatedMapWords.forEach((value, key) => {
          if (value === w1) {
            updatedMapWords.delete(key);
          }
        });
      this.setState(Object.assign(this.state, {winningMapWordToCats:updatedMapWords, clickedWords: [], categoriesWon: updatedWords}))
      return true;
  }
  return false;
 }

clickedWord(word) {
//   this.setState(newState);
    // word is currectly clicked, unclick it
    if (this.state.clickedWords.indexOf(word) > -1) {
      const updatedWords = this.state.clickedWords.filter(word1 => word1 !== word);
      this.setState(Object.assign(this.state, {clickedWords: updatedWords}))
    } else {
      if (this.state.clickedWords.length < 4) {
        const updatedWords = [...this.state.clickedWords, word];
        this.setState(Object.assign(this.state, {clickedWords: updatedWords}))
      }
    }
 }

sayCopied() {
    this.setState(Object.assign(this.state, {isCopied: true}))
    setTimeout(() => {
      this.setState(Object.assign(this.state, {isCopied: false}))
    }, 1000);
  };

  saySubmitMsg(msg) {
    this.setState(Object.assign(this.state, {isSubmit: true, isSubmitMsg: msg}))
    setTimeout(() => {
      this.setState(Object.assign(this.state, {isSubmit: false, isSubmitMsg: ""}))
    }, 1000);
  };


render() {

  const is4clicked = (this.state.clickedWords.length >= 4);
  const defaultBoxStyle = "flex justify-center items-center bg-stone-100 shadow-sm rounded-md";
  const defaultClickedBoxStyle = "flex justify-center items-center bg-neutral-600 shadow-sm rounded-md";
  const gridStyle = isMobile ? "grid grid-cols-4 gap-4 content-stretch break-words text-sm h-80" : "grid grid-cols-4 gap-4 break-words text-md h-80"
  const colStyleDone = isMobile ? "text-white col-span-4 flex justify-center items-center bg-lime-800 shadow-sm rounded-md text-sm" : "text-white col-span-4 flex justify-center items-center bg-lime-800 shadow-sm rounded-md text-md" 


  return (
      <div className={utilStyles.center}> 
        {this.state.win && <Confetti />}
       
        <div className={utilStyles.center}><br/>

  
        <span className={gridStyle}>
        {
          Array.from(this.state.categoriesWon.entries()).map(([key, value], index) => {
                return (
                  <span className={colStyleDone}> 
                 
                    {
                        Array.from(this.state.winningMapCatToWords.entries()).map(([key2, value2], index2) => {
                          let show = key2 == value
                          if (show) {

                          return (
                            <span>
                            <strong>{value}</strong><br/>
                            {value2[0].toUpperCase() + ", " + value2[1].toUpperCase() + ", " + value2[2].toUpperCase() + ", " + value2[3].toUpperCase()}
                            </span>

                          );
                        }
                      })
                    }
             
                  </span> 
                );
            })
        }
          {
              Array.from(this.state.winningMapWordToCats.entries()).map(([key, value], index) => {
                let st = (this.state.clickedWords.indexOf(key) > -1) ? defaultClickedBoxStyle : defaultBoxStyle
                return (
                    <span key={index} className={st} onClick={() => this.clickedWord(key)}>
                      {key}
                    </span>
                );
            })
          }
          </span>

          <br/><br/>
          {this.state.gameOver  &&  <strong><br/>{this.state.gameOverMsg}<br/></strong>}
          {this.state.gameOver && 
            <span>
              <CopyToClipboard text={this.state.gameOverText} onCopy={() => this.sayCopied()}>
                  <i className="fa">Share Results&#x2398;</i>
              </CopyToClipboard> 
              {this.state.isCopied && <span className="text-slate-300 text-right"> Copied! </span>} <br/>
            </span >
          }

          {this.state.isSubmit && <span className="text-slate-300 text-right"> {this.state.isSubmitMsg} </span>} <br/>
          {is4clicked &&
              <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => this.submit()}>
                SUBMIT
              </button>
          }

          {!is4clicked &&
              <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                SUBMIT
              </button>
          }
          <br/><br/>
        </div>  
      </div>
    );
}
}

export default Board;
