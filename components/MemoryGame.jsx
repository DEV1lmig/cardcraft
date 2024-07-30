'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

const generarDeck = (cardType) => {
  const memoryCards = [
    `${cardType}1`,
    `${cardType}2`,
    `${cardType}3`,
    `${cardType}4`,
    `${cardType}5`,
    `${cardType}6`,
    `${cardType}7`,
    `${cardType}8`,
  ];
  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MemoryGame({ cardType }) {
  const [cards, setCards] = useState(generarDeck(cardType));
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;
  
      if(cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };

    if(flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 2000);
    }
  }, [cards, flipped, solved]);

  const handleClick = (index) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const gameOver = solved.length === cards.length;

  const resetGame = () => {
    setCards(generarDeck(cardType));
    setFlipped([]);
    setSolved([]);
  };

  return (
    <div>
      <div className='grid grid-cols-4 gap-5'>
        {cards.map((card, index) => (
          <div 
            key={index} 
            onClick={() => handleClick(index)} 
            className={`w-32 h-32 transform bg-slate-600 cursor-pointer rounded-lg relative transition-transform duration-300 ${flipped.includes(index) || solved.includes(index) ? 'scale-110' : ''}`}
          >
            {flipped.includes(index) || solved.includes(index) ? (
              <Image src={`/images/${card}.webp`} alt={card} fill className='w-full h-full object-cover rounded-lg' />
            ) : (
              '?'
            )}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className='flex items-center justify-center w-full mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300'>
        Reiniciar
      </button>
    </div>
  );
}