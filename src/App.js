import React, { useState,useEffect,useCallback } from "react";

import MovieList from "./Components/MovieList";
import "./App.css";

function App() {


  const [movies, setMovies] = useState([]);
  // useState for loading
  const [isLoading,setIsLoading] = useState(false);
  // Http error handling
  const [error,setError] = useState(null);


   const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{
      const response =  await fetch('https://swapi.dev/api/films/')

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
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  
  let content = <p>Found no movies</p>;

  if(error){
    content = <p>{error}</p>
  }
  if(isLoading){
    content = <p>Loading...</p>
  }
  if(movies.length > 0){
    content = <MovieList movies={movies} />
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {content}
      </section>
    </React.Fragment>
  );
}

export default App;
