import './Header.scss';
import logo from '../../image/memory-match-logo.png';

type Props = {
  time: number;
  isGameFinished: boolean;
  handleStartAgain: () => void;
}

export const Header: React.FC<Props> = ({ time, isGameFinished, handleStartAgain }) => {
  return (
    <header className="Header">
      <div className='Header__left'>
        Time
        <div className='Header__time'>
          {time}s
        </div>
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
