import React, { useState } from "react";

import MovieList from "./Components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);


  async function fetchMoviesHandler() {
    setIsLoading(true);
  const response =  await fetch('https://swapi.dev/api/films/')
   const data = await response.json()
     
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MovieList movies={movies} />}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;