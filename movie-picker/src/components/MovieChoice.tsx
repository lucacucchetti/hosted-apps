import { useState } from 'react';

interface MovieChoiceProps {
  movieTitle: string;
}

function MovieChoice(props: MovieChoiceProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [movieTitle, setMovieTitle] = useState<string>(props.movieTitle);
  return (
    <>
      <input
        type="text"
        value={movieTitle}
        disabled={!isEditing}
        className="inline"
        onChange={(event) => setMovieTitle(event.target.value)}
      ></input>
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Confirm' : 'Edit'}</button>
    </>
  );
}

export default MovieChoice;
