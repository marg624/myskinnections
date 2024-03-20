import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import React, {useState} from 'react';
import utilStyles from '../styles/utils.module.css';
import categories from '../resources/categories.js';
import customCategories from '../resources/customcategories.js';
import Board from '../components/Board';
import logo from '../resources/logo.png';
import refresh from '../resources/refresh.png';
import * as uuid from 'uuid';
import OptionsButton from '../components/options-button'
import StartGame from '../components/start-game'

export default function Index() {
  const [title, setTitle] = useState("");
  const [ready, setReady] = useState(false);
  const [gameId, setGameId] = useState("");
  const [winningMapCategories, setWinningMapCategories] = useState(null);
  const [winningMapCategoriesKey, setWinningMapCategoriesKey] = useState(null);

  function hitReady() {
      const today = new Date();
      const date = today.getDate();
     // const gameIdCreate = date >= 3 ? Math.floor((date - 3) / 7) : 0;

      const queryParams = new URLSearchParams(window.location.search);

      // Check if a specific query parameter exists and get its value
      const paramValue = queryParams.get('custom');
      const getCustom = paramValue && customCategories.game[paramValue]

      const winningMap = new Map();
      const winningMapCategoriesKey1 = new Map();
      const game1 = getCustom ? customCategories.game[paramValue] : categories.game[date]
      const title = getCustom ? "It's all about " + customCategories.titles[paramValue] + "!" : ""

      const cat1 = Object.keys(game1[0])[0]
      winningMap.set(game1[0][cat1][0].toUpperCase(), cat1.toUpperCase());
      winningMap.set(game1[0][cat1][1].toUpperCase(), cat1.toUpperCase());
      winningMap.set(game1[0][cat1][2].toUpperCase(), cat1.toUpperCase());
      winningMap.set(game1[0][cat1][3].toUpperCase(), cat1.toUpperCase());
      winningMapCategoriesKey1.set(cat1.toUpperCase(), game1[0][cat1]);

      const cat2 = Object.keys(game1[1])[0]
      winningMap.set(game1[1][cat2][0].toUpperCase(), cat2.toUpperCase());
      winningMap.set(game1[1][cat2][1].toUpperCase(), cat2.toUpperCase());
      winningMap.set(game1[1][cat2][2].toUpperCase(), cat2.toUpperCase());
      winningMap.set(game1[1][cat2][3].toUpperCase(), cat2.toUpperCase());
      winningMapCategoriesKey1.set(cat2.toUpperCase(), game1[1][cat2]);


      const cat3 = Object.keys(game1[2])[0]
      winningMap.set(game1[2][cat3][0].toUpperCase(), cat3.toUpperCase());
      winningMap.set(game1[2][cat3][1].toUpperCase(), cat3.toUpperCase());
      winningMap.set(game1[2][cat3][2].toUpperCase(), cat3.toUpperCase());
      winningMap.set(game1[2][cat3][3].toUpperCase(), cat3.toUpperCase());
      winningMapCategoriesKey1.set(cat3.toUpperCase(), game1[2][cat3]);


      const cat4 = Object.keys(game1[3])[0]
      winningMap.set(game1[3][cat4][0].toUpperCase(), cat4.toUpperCase());
      winningMap.set(game1[3][cat4][1].toUpperCase(), cat4.toUpperCase());
      winningMap.set(game1[3][cat4][2].toUpperCase(), cat4.toUpperCase());
      winningMap.set(game1[3][cat4][3].toUpperCase(), cat4.toUpperCase());
      winningMapCategoriesKey1.set(cat4.toUpperCase(), game1[3][cat4]);

        // Convert the Map to an array of key-value pairs
      const arrayFromMap = Array.from(winningMap.entries());
      const shuffledArray = arrayFromMap.sort(() => Math.random() - 0.5);
      const shuffledMap = new Map(shuffledArray);


      setWinningMapCategories(shuffledMap)
      setWinningMapCategoriesKey(winningMapCategoriesKey1)
      setTitle(title)
      setReady(true)
  }

  return (
    <>
      <Layout>
        <Head>
          <title>MySkinnections</title>
        </Head>
        <Container>
          <Intro />
          <div className={utilStyles.center}>
          <h4 className="text-center text-xl font-bold">
            {title}
          </h4>
          <h3>Create four groups of four.</h3>
          </div>
          { ready && <Board winningMapWordToCats={winningMapCategories} winningMapCatToWords={winningMapCategoriesKey}  /> }
          { !ready && <StartGame onClick={hitReady} /> }
          <OptionsButton />
        </Container>
      </Layout>
    </>
    )
}


