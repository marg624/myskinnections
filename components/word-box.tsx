import utilStyles from '../styles/utils.module.css';

type Props = {
  word: string
  style: string
}

const WordBox = ({ word, style }: Props) => {
  return (
    <>
      <span className={utilStyles.box}>
        {word}
      </span>
    </>
  )
}

export default WordBox
