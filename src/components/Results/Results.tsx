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
}

export const Results: React.FC<Props> = ({ time, moves, isGameFinished }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [isScoreSavedLocally, setIsScoreSavedLocally] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const resultsString = localStorage.getItem('gameResults');
    const savedResults = resultsString ? JSON.parse(resultsString) : [];
    setResults(savedResults);

    const isScoreSaved = localStorage.getItem('isScoreSaved') === 'true';
    setIsScoreSavedLocally(isScoreSaved);
    if (isScoreSaved) {
      setShowResults(true);
    }
  }, []);

  const saveResult = (moves: number, time: number) => {
    const newResult = { moves, time };
    const updatedResults = [...results, newResult];
  
    localStorage.setItem('gameResults', JSON.stringify(updatedResults));
    setResults(updatedResults); // Aktualizacja stanu
    localStorage.setItem('isScoreSaved', 'true');
  };
  

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    saveResult(moves, time);
    setIsScoreSavedLocally(true);
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
