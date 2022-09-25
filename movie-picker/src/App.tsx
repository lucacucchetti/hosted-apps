import { useState } from 'react';
import './App.css';

function App() {
  const [currentTitle, setCurrentTitle] = useState<string>('Replace me');
  const [movieChoices, setMovieChoices] = useState<string[]>([]);

  function pickARandomMovie() {
    const randomMovie = Math.floor(Math.random() * movieChoices.length);
    alert(movieChoices[randomMovie]);
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
        <div key="new-movie-div">
          <input
            key="new-movie-input"
            type="text"
            value={currentTitle}
            onChange={(event) => setCurrentTitle(event.target.value)}
          />
          <button onClick={() => setMovieChoices([...movieChoices, currentTitle])}>Add movie title</button>
        </div>
        <br />
        <table>
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
        </table>

        <br />
        <button onClick={pickARandomMovie}>Pick a random movie!</button>
      </header>
    </div>
  );
}

export default App;
