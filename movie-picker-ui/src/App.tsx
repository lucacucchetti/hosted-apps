import { useRef, useState } from 'react';
import './App.css';

const localStorageMovies: string[] = JSON.parse(localStorage.getItem('cucchetti-movie-picker-movies') || '[]');

function App() {
  const movieInput = useRef<any>(null);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [movieChoices, setMovieChoices] = useState<string[]>(localStorageMovies);
  const [chosenMovieIndex, setChosenMovieIndex] = useState<number | undefined>();

  function pickARandomMovie() {
    const chosenMovie = Math.floor(Math.random() * movieChoices.length);
    setChosenMovieIndex(chosenMovie);
  }

  const deleteFunction = (index: number) => {
    const newMovieChoices = [...movieChoices];
    newMovieChoices.splice(index, 1);
    setMovieChoices(newMovieChoices);
    localStorage.setItem('cucchetti-movie-picker-movies', JSON.stringify(newMovieChoices));
  };

  const addMovie = () => {
    setMovieChoices([...movieChoices, currentTitle]);
    localStorage.setItem('cucchetti-movie-picker-movies', JSON.stringify([...movieChoices, currentTitle]));
    setCurrentTitle('');
    movieInput.current?.focus();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Picker</h1>
        <div key="new-movie-div" className="inline">
          <input
            ref={movieInput}
            autoFocus
            key="new-movie-input"
            type="text"
            placeholder="Replace me..."
            value={currentTitle}
            onChange={(event) => setCurrentTitle(event.target.value)}
            onKeyUp={(event) => event.code === 'Enter' && addMovie()}
          />
          <button disabled={currentTitle === ''} onClick={addMovie}>
            Add movie title
          </button>
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
