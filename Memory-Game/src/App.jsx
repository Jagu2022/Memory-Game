//import Game from './Game.jsx'
import {useState,useEffect} from 'react'
import Card from './Card.jsx'
const cardsImages = [
  {'src': '../public/Images/pic_1.jpeg', matched: false},
  {'src': '../public/Images/pic_2.jpeg', matched: false},
  {'src': '/Images/pic_3.jpeg', matched: false},
  {'src': '/Images/pic_4.jpg', matched: false},
  {'src': '/Images/pic_5.jpeg', matched: false},
  {'src': '/Images/pic_6.jpeg', matched: false}
  ]
 //import pic from '../public/Images/pic_1.jpeg'
export default function App() {
  
  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disable, setDisable] = useState(false)
  
  const shuffleCards = () => {
    const shuffledCards = [...cardsImages,...cardsImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id:Math.random()}))
    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisable(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
         return prevCards.map((card) => {
           if(card.src === choiceOne.src) {
             return {...card, matched: true}
           } else{
             return card
           }
         })
        })
        resetTurns()
      } else{
        
        setTimeout(()=>resetTurns(),1000)
      }
    }
  }, [choiceOne, choiceTwo])
  console.log(cards)
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisable(false)
  }
  
  useEffect(() => {
    shuffleCards()
  },[])
  
  return(
      <div className='App'>
        <h1>Memory Game</h1>
        <button onClick={shuffleCards}>start</button>
        
        <div className='card-grid'>
          {
            cards.map((card) => (
              <Card key={card.id} 
                card={card} 
                handleChoice={handleChoice}
                disable={disable}
                flip={card === choiceOne || card === choiceTwo || card.matched}
                />
            ))
          }
        </div>
        <p>Turns: {turns}</p>
      </div>
    );
}