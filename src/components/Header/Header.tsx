import './Header.scss';
import logo from '../../image/memory-match-logo.png';
import { Time } from './Time';
import { Moves } from './Moves';

type Props = {
  time: number;
  moves: number;
  isGameFinished: boolean;
  handleStartAgain: () => void;
}

export const Header: React.FC<Props> = ({ time, moves, isGameFinished, handleStartAgain }) => {
  return (
    <header className="Header">
      <div className='Header__left'>
        <Time time={time} />
        <Moves moves={moves} />
      </div>
      <div>
        <img src={logo} className="HeaderLogo" alt="logo" />
      </div>
      <div className='Header__right'>
        {isGameFinished && (
          <button className='Header__button' onClick={handleStartAgain}>Play again</button>
        )}
      </div>
    </header>
  )
};
