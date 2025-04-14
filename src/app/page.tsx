'use client';

import { useEffect, useState } from 'react';
import { getPopularMovies } from '../lib/tmdb';

interface Movie {
  id: number;
  title: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        if (Array.isArray(popularMovies)) {
          setMovies(popularMovies); 
        } else {
          setMovies([]); 
        }
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setMovies([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))
        ) : (
          <li>No movies found.</li>
        )}
      </ul>
    </div>
  );
};

export default Home;