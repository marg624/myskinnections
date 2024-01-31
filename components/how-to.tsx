import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import howtoGray from '../public/assets/howto/gray.png';
import howtoGreen from '../public/assets/howto/green.png';
import howtoYellow from '../public/assets/howto/yellow.png';


const HowTo = () => {

  return (
           <div>
              <h3 className="text-3xl mb-4 leading-snug">
              How To Play
              </h3>

              <h2 className="text-xl mb-2 leading-snug">
              <br/>Find groups of four items that share something in common.
              </h2>
               1. Select four items <br/>
               2. Tap "SUBMIT" to check if your guess is correct  
              <br/> <br/> <strong>Category examples:</strong>
              <br/>
                Lash Growth Products: GrandeLash, Castor Oil, Revitalash, Latisse
              <br/>
                _____ Acid: Hylauronic, Mandelic, Ferulic, Ascorbic   

          </div>
  )
}

export default HowTo
