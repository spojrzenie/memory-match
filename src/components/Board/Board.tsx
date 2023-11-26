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
  isFlipped?: boolean,
  isMatched?: boolean
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
  const selectedCards = [...cards].slice(0, 6);

  const doubleCards: DoubleCards[] = selectedCards.reduce<DoubleCards[]>((acc, card) => {
    acc.push({ ...card, uniqueId: `${card.id}-a` }, { ...card, uniqueId: `${card.id}-b` });
    return acc;
  }, []);
  const shuffledCards = doubleCards.sort(() => 0.5 - Math.random());

  return shuffledCards;
}

const doubleCards = getShuffledPairs();

export const Board: React.FC = () => {
  const [canFlip, setCanFlip] = useState(true);

  const [cardsState, setCardsState] = useState(
    doubleCards.map(card => ({ ...card, isFlipped: false, isMatched: false }))
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flippedCards, setFlippedCards] = useState<DoubleCards[]>([]);

  const handleCardClick = (uniqueId: string) => {
    if (!canFlip) return;

    const foundCard = cardsState.find(card => card.uniqueId === uniqueId);

    if (!foundCard || foundCard.isFlipped || foundCard.isMatched) {
      return;
    }

    setCardsState(prevState =>
      prevState.map(card =>
        card.uniqueId === uniqueId ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );

    setFlippedCards(prev => {
      const foundCard = cardsState.find(card => card.uniqueId === uniqueId);
      const newFlippedCards = foundCard ? [...prev, foundCard] : [...prev];

      if (newFlippedCards.length === 2) {
        if (newFlippedCards[0] && newFlippedCards[1]) {
          checkForMatch(newFlippedCards as DoubleCards[]);
        }
        return [];
      }
      return newFlippedCards;
    });
  };

  const checkForMatch = (flippedCards: DoubleCards[]) => {
    setCanFlip(false);

    if (flippedCards[0].id === flippedCards[1].id) {
      setCardsState(prevState =>
        prevState.map(card =>
          flippedCards.find(fCard => fCard.uniqueId === card.uniqueId) ? { ...card, isFlipped: true, isMatched: true } : card
        )
      );
      setCanFlip(true);
    } else {
      setTimeout(() => {
        setCardsState(prevState =>
          prevState.map(card =>
            flippedCards.find(fCard => fCard.uniqueId === card.uniqueId) ? { ...card, isFlipped: false } : card
          )
        );

        setFlippedCards([]);
        setCanFlip(true);
      }, 1000);
    }
  };

  return (
    <div className='board_container'>
      {cardsState.map((card) => (
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
