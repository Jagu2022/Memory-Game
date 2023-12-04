 import './Cart.css'
 export default function Card({card, handleChoice, flip, disable}) {
   
   const handleClick = () => {
     if(!disable){
       handleChoice(card)
     }
   }
   
   return (
     <div className='card'>
      <div className={flip ? 'flip' : ''}>
          <img className='back' src={card.src} alt='back'/>
          <img 
            className='front' 
            onClick={handleClick} 
            src='./Images/cover.jpg' alt='front' />
        </div>
      </div>
     )
 }