import './Header.css';
import logo from '../../image/memory-match-logo.png';

export const Header = () => {
  return (
    <header className="App-header">
      <a href="index.html">
        <img src={logo} className="App-logo" alt="logo" />
      </a>
    </header>
  )
};
