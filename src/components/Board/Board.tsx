import { DoubleCards } from '../../types';

type BoardProps = {
  cardsState: DoubleCards[];
  onCardClick: (uniqueId: string) => void;
}

export const Board: React.FC<BoardProps> = ({ cardsState, onCardClick }) => {
  return (
    <div className='board_container'>
        {cardsState.map((card) => (
          <div
            className={`card ${!card.isFlipped ? 'is-flipped' : ''}`}
            key={card.uniqueId}
            onClick={() => onCardClick(card.uniqueId)}
          >
            <div className={`card__face card__face--front card__face--front${card.id}`}></div>
            <div className='card__face card__face--back'></div>
          </div>
        ))}
      </div>
  )  
};
