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
  const selectedCards = [...cards].sort(() => 0.5 - Math.random()).slice(0,6);
  const doubleCards: DoubleCards[] = selectedCards.reduce<DoubleCards[]>((acc, card) => {
    acc.push({ ...card, uniqueId: `${card.id}-a` }, { ...card, uniqueId: `${card.id}-b` });
    return acc;
  }, []);
  const shuffledCards = doubleCards.sort(() => 0.5 - Math.random());

  return (
    shuffledCards
  )
}

console.table(getShuffledPairs());
const doubleCards = getShuffledPairs();

export const Board = () => {
  return (
    <div className='board_container'>
      {doubleCards.map(card => {
        return (
          <div className='board_container__card' key={card.uniqueId}>
            {card.name}
          </div>
        )
      })}
    </div>
  );
};
