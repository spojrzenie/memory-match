import './App.scss';
import { Logo } from './components/Logo';
import { Board } from './components/Board';
import logo from './image/memory-match-logo.png';

function App() {
  return (
    <div className="App">
      <Logo logo={logo} />
      <Board />

      
    </div>
  );
}

export default App;
