import React, { useState } from "react";

import MovieList from "./Components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  // useState for loading
  const [isLoading,setIsLoading] = useState(false);
  // Http error handling
  const [error,setError] = useState(null);


  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try{
      const response =  await fetch('https://swapi.dev/api/film/')

      if(!response.ok){
        throw new Error('Something went Wrong')
      }
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
            
          }catch(error){
            setError(error.message)
          }
          setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>

        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {/* Loading prompt */}
        {!isLoading && movies.length === 0 && !error && <p>No Movies</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
