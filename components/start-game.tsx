import Link from 'next/link'
import arrow from '../public/assets/arrow-icon.png';
import mainImage from '../public/assets/cover.png';
import customImage from '../public/assets/cover0.png';
import customImage1 from '../public/assets/cover1.png';
import customImage2 from '../public/assets/cover2.png';
import playImage from '../public/assets/play.png';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const StartGame = ({
  onClick,
}: Props) => {

  const router = useRouter();
  const { custom } = router.query;
  var imageSrc = mainImage.src;

  if (custom === '0') {
    imageSrc = customImage.src;
  } else if (custom === '1') {
    imageSrc = customImage1.src;
  } else if (custom === '2') {
    imageSrc = customImage2.src;
  }

  return (
    <div className="flex justify-center" >
      <h1 className="text-7xl mb-4 leading-snug">
        <img src={imageSrc} width="100%" className="opacity-100" /> 
        <div className="bg-white bg-opacity-50" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%'
        }}>
          [ Play! ] <br/>
          <button onClick={onClick} className="hover:scale-110" > 
            <img src={playImage.src} width="100px" /> 
          </button>
        </div>
      </h1>
    </div>    
  )
}

export default StartGame