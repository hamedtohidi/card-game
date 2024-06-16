
import './Singelcard.css'

import coverImg from '../img/cover.png'

export default function Singelcard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className='card' >
      <div className={flipped ? "flipped" : ""} >
        <img className='front' src={card.src} alt="card front" />
        <img className='back' src={coverImg} onClick={handleClick} alt="card back" />

      </div>
    </div>
  )
}
