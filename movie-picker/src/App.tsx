import { useState } from 'react';
import './App.css';

function App() {
  const [currentTitle, setCurrentTitle] = useState<string>('Replace me...');
  const [movieChoices, setMovieChoices] = useState<string[]>([]);
  const [chosenMovieIndex, setChosenMovieIndex] = useState<number | undefined>();

  function pickARandomMovie() {
    const chosenMovie = Math.floor(Math.random() * movieChoices.length);
    setChosenMovieIndex(chosenMovie);
  }

  const deleteFunction = (index: number) => {
    const newMovieChoices = [...movieChoices];
    newMovieChoices.splice(index, 1);
    setMovieChoices(newMovieChoices);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Picker</h1>
        <div key="new-movie-div" className="inline">
          <input
            key="new-movie-input"
            type="text"
            value={currentTitle}
            onChange={(event) => setCurrentTitle(event.target.value)}
          />
          <button onClick={() => setMovieChoices([...movieChoices, currentTitle])}>Add movie title</button>
          {chosenMovieIndex !== undefined ? <h5>We will be watching {movieChoices[chosenMovieIndex]} today</h5> : null}
          {chosenMovieIndex !== undefined ? (
            <button
              onClick={() => {
                setChosenMovieIndex(undefined);
                deleteFunction(chosenMovieIndex);
              }}
            >
              Accept
            </button>
          ) : null}
        </div>
        <br />
        <h3>Movie List</h3>
        <table>
          <tbody>
            {movieChoices.map((choice, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => deleteFunction(index)}>X</button>
                </td>
                <td>
                  <span>{choice}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <button onClick={pickARandomMovie}>Pick a random movie!</button>
      </header>
      <footer className="App-footer">
        Source:{' '}
        <a className="App-link" href="https://github.com/lucacucchetti/hosted-apps">
          https://github.com/lucacucchetti/hosted-apps
        </a>
      </footer>
    </div>
  );
}

export default App;
