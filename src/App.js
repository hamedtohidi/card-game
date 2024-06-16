
import './App.css';
import { useEffect, useState } from 'react';
import Singelcard from './Components/Singelcard';

import helmetImg from './img/helmet-1.png'
import potionImg from "./img/potion-1.png"
import ringImg from "./img/ring-1.png"
import scrollImg from "./img/scroll-1.png"
import shieldImg from "./img/shield-1.png"
import swordImg from "./img/sword-1.png"

const cardImages = [
  { "src": helmetImg, matched: false },
  { "src": potionImg, matched: false },
  { "src": ringImg, matched: false },
  { "src": scrollImg, matched: false },
  { "src": shieldImg, matched: false },
  { "src": swordImg, matched: false },
]
function App() {
  const [cards, setCareds] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  const shufflecards = () => {
    const shuffledcards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    // console.log(shuffledcards);
    setChoiceOne(null)
    setChoiceTwo(null)
    setCareds(shuffledcards)
    setTurns(0)
  }

  // console.log(cards, turns);
  //handleChoice
  const handleChoice = (card) => {
    // console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //compar 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        // console.log("match")
        setCareds(prevcards => {
          return prevcards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        // console.log("notmatch")
        // resetTurn()
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])
  // console.log(cards)


  //reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }
  useEffect(() => {
    shufflecards()
  }, [])
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shufflecards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <Singelcard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
