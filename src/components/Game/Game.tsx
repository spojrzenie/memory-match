import { useEffect, useState } from 'react';
import { DoubleCards } from '../../types';
import './Game.scss';
import { Header } from '../Header';
import { Results } from '../Results';
import { Board } from '../Board';

type Cards = {
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
  const selectedCards = [...cards].slice(0, 6);

  const doubleCards: DoubleCards[] = selectedCards.reduce<DoubleCards[]>((acc, card) => {
    acc.push({ ...card, uniqueId: `${card.id}-a` }, { ...card, uniqueId: `${card.id}-b` });
    return acc;
  }, []);
  const shuffledCards = doubleCards.sort(() => 0.5 - Math.random());

  return shuffledCards;
}

const doubleCards = getShuffledPairs();

export const Game: React.FC = () => {
  const [canFlip, setCanFlip] = useState(true);
  const [cardsState, setCardsState] = useState(
    doubleCards.map(card => ({ ...card, isFlipped: false, isMatched: false }))
  );
  const [, setFlippedCards] = useState<DoubleCards[]>([]);
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [stoperIsActive, setStoperIsActive] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);


  useEffect(() => {
    let intervalId: number | NodeJS.Timer;

    if (stoperIsActive) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId as number);
      }
    };
  }, [stoperIsActive]);

  useEffect(() => {
    const allCardsMatched = cardsState.every(card => card.isMatched);
    setIsGameFinished(allCardsMatched);
    if (allCardsMatched) {
      setStoperIsActive(false);
    }
  }, [cardsState]);

  const handleStartAgain = () => {
    const newShuffledCards = getShuffledPairs();

    setCardsState(
      newShuffledCards.map(card => ({ ...card, isFlipped: false, isMatched: false }))
    );

    setTime(0);
    setMoves(0);
    setStoperIsActive(false);
    setFlippedCards([]);
    setCanFlip(true);
    setIsGameFinished(false);
  };

  const handleCardClick = (uniqueId: string) => {
    if (!canFlip) return;

    if (!isGameFinished) {
      setMoves(prevCount => prevCount + 1);
    }

    if (!stoperIsActive && cardsState.some(card => !card.isFlipped)) {
      setStoperIsActive(true);
    }

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

  const onNewGameStarted = () => {

  };

  return (
    <div className="App">
      <Header
        time={time}
        moves={moves}
        isGameFinished={isGameFinished}
        handleStartAgain={handleStartAgain}
      />

      <Board
        cardsState={cardsState}
        onCardClick={handleCardClick}
      />

      <Results
        time={time}
        moves={moves}
        isGameFinished={isGameFinished}
        onNewGameStarted={onNewGameStarted}
      />
    </div>
  );
};
