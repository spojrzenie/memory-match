import { useState } from 'react';
import './Board.scss';

type Cards = {
  id: number,
  name: string,
}

type DoubleCards = {
  uniqueId: string,
  id: number,
  name: string,
}

const cards: Cards[] = [
  { id: 1, name: 'card1' },
  { id: 2, name: 'card2' },
  { id: 3, name: 'card3' },
  { id: 4, name: 'card4' },
  { id: 5, name: 'card5' },
  { id: 6, name: 'card6' },
];

const getShuffledPairs = (): DoubleCards[] => {
  const selectedCards = [...cards].sort(() => 0.5 - Math.random()).slice(0, 6);
  const doubleCards: DoubleCards[] = selectedCards.reduce<DoubleCards[]>((acc, card) => {
    acc.push({ ...card, uniqueId: `${card.id}-a` }, { ...card, uniqueId: `${card.id}-b` });
    return acc;
  }, []);
  const shuffledCards = doubleCards.sort(() => 0.5 - Math.random());
  return shuffledCards;
}

const doubleCards = getShuffledPairs();

export const Board = () => {
  const [cardsState, setCardsState] = useState(
    doubleCards.map(card => ({ ...card, isFlipped: false }))
  );

  const handleCardClick = (uniqueId: string) => {
    setCardsState(prevState =>
      prevState.map(card =>
        card.uniqueId === uniqueId ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  return (
    <div className='board_container'>
      {cardsState.map((card, index) => (
        <div
          className={`card ${!card.isFlipped ? 'is-flipped' : ''}`}
          key={card.uniqueId}
          onClick={() => handleCardClick(card.uniqueId)}
        >
          <div className={`card__face card__face--front card__face--front${card.id}`}>
            {/* Front {card.id} */}
          </div>
          <div className='card__face card__face--back'>
            {/* Back {card.id} */}
          </div>
        </div>
      ))}
    </div>
  );
};
