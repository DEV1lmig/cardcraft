'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

const Modal = ({ wonCard, onClose }) => (
  <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold text-green-500">¡ganó la partida!</h2>
      <p className='text-center text-gray-600'>¡{wonCard} es tu carta ganada!</p>
      <Image src={`/images/${wonCard}.webp`} alt={wonCard} width={200} height={200} className="mx-auto my-4" />
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
        Cerrar
      </button>
    </div>
  </div>
);

export default function MemoryGame({ cardType }) {
  const { user, saveCard } = useAuth();
  const router = useRouter();
  const [cards, setCards] = useState(generarDeck(cardType));
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [wonCard, setWonCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };
    if (flipped.length === 2) {
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

  const handleSaveCard = async () => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const cardData = [`/images/${randomCard}.webp`, randomCard];
    saveCard(cardData);
    setWonCard(randomCard);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/profile');
  };

  const gameOver = solved.length === cards.length;

  const resetGame = () => {
    setCards(generarDeck(cardType));
    setFlipped([]);
    setSolved([]);
    setWonCard(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      {gameOver && <h2 className='text-center text-2xl font-bold text-red-500'>¡Has ganado!</h2>}
      {isModalOpen && <Modal wonCard={wonCard} onClose={handleCloseModal} />}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
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
      {gameOver && (
        <button 
          onClick={handleSaveCard} 
          className='mt-4 bg-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300'
        >
          Guardar carta
        </button>
      )}
      <button 
        onClick={resetGame} 
        className='mt-4 bg-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300'
      >
        Reiniciar
      </button>
    </div>
  );
}