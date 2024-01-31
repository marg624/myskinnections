import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import React, {useState} from 'react';
import utilStyles from '../styles/utils.module.css';
import dictionary from '../resources/skin-words.js';
import Board from '../components/Board';
import logo from '../resources/logo.png';
import refresh from '../resources/refresh.png';
import * as uuid from 'uuid';
import OptionsButton from '../components/options-button'
import StartGame from '../components/start-game'




export default function Index() {
  const [ready, setReady] = useState(false);
  const [gameId, setGameId] = useState("");
  const [winningWord, setWinningWord] = useState("");

  function hitReady() {
      const today = new Date();
      const date = today.getDate();
      const gameIdCreate = date;
      const winningWordCreate = dictionary.words[date];
      setGameId(gameIdCreate.toString())
      setWinningWord(winningWordCreate.toUpperCase())
      setReady(true)
  }

  return (
    <>
      <Layout>
        <Head>
          <title>MySkindle</title>
        </Head>
        <Container>
          <Intro />
          { ready && <Board winningWord={winningWord} gameId={gameId} /> }
          { !ready && <StartGame onClick={hitReady} /> }
          <OptionsButton />
        </Container>
      </Layout>
    </>
    )
}


