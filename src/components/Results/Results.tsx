import React, { useState, useEffect, FormEventHandler } from 'react';
import './Results.scss';

type Result = {
  moves: number;
  time: number;
}

type Props = {
  time: number;
  moves: number;
  isGameFinished: boolean;
  onNewGameStarted: () => void;
}

export const Results: React.FC<Props> = ({ time, moves, isGameFinished, onNewGameStarted }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [isScoreSavedLocally] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isGameFinished) {
      onNewGameStarted();
    }
  }, [isGameFinished, onNewGameStarted]);

  useEffect(() => {
    const resultsString = localStorage.getItem('gameResults');
    const savedResults = resultsString ? JSON.parse(resultsString) : [];
    setResults(savedResults);
  }, [isScoreSavedLocally]);

  const saveResult = (moves: number, time: number) => {
    const newResult = { moves, time };
    const savedResultsString = localStorage.getItem('gameResults');
    const savedResults = savedResultsString ? JSON.parse(savedResultsString) : [];
    const updatedResults = [...savedResults, newResult];

    localStorage.setItem('gameResults', JSON.stringify(updatedResults));
    setResults(updatedResults);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    saveResult(moves, time);
    setShowResults(true);
  };

  return (
    <>
      {isGameFinished && !isScoreSavedLocally && !showResults ? (
        <div className='Results Results--spaced'>
          <div className='Results__form'>
            <span className='Results__title'>
              <span className='Results__title--highlighted'>
                Excellent!
              </span>
              Would you like to save your score?
            </span>
            <form onSubmit={handleSubmit}>
              <button type="submit" className='Results__button'>
                Yes
              </button>
            </form>
          </div>
        </div>
      ) : (
        showResults && (
          <div className='Results Results--spaced'>
            Your great results
            <ol>
              {results.map((result, index) => (
                <li key={index} className='Results__list'>
                  {result.moves} moves /
                  {' '}
                  <span className='Results__highlighted'>{result.time}s</span>
                </li>
              ))}
            </ol>
          </div>
        )
      )}
    </>
  );
};
