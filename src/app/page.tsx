'use client';

import { useEffect, useState } from 'react';
import { getPopularMovies, getMovieDetails, getPopularTVShows, getTVShowDetails } from '../lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

interface TVShow {
  id: number;
  name: string;
  poster_path?: string;
}

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: { name: string }[];
  poster_path?: string;
}

interface TVShowDetail {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  genres: { name: string }[];
  poster_path?: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedMovie, setExpandedMovie] = useState<MovieDetail | null>(null);
  const [expandedTVShow, setExpandedTVShow] = useState<TVShowDetail | null>(null);

  useEffect(() => {
    const fetchMoviesAndTVShows = async () => {
      try {
        const popularMovies = await getPopularMovies();
        const popularTVShows = await getPopularTVShows();
        setMovies(Array.isArray(popularMovies) ? popularMovies : []);
        setTvShows(Array.isArray(popularTVShows) ? popularTVShows : []);
      } catch (error) {
        console.error('Error fetching popular movies and TV shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndTVShows();
  }, []);

  const handleMovieCardClick = async (movieId: number) => {
    if (expandedMovie?.id === movieId) {
      setExpandedMovie(null);
      return;
    }

    const details = await getMovieDetails(movieId);
    if (details) setExpandedMovie(details);
  };

  const handleTVShowCardClick = async (tvShowId: number) => {
    if (expandedTVShow?.id === tvShowId) {
      setExpandedTVShow(null);
      return;
    }

    const details = await getTVShowDetails(tvShowId);
    if (details) setExpandedTVShow(details);
  };

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          🎬 Popular Movies and TV Shows
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-400 text-lg">
            Loading...
          </div>
        ) : (
          <>
            {/* popular movie */}
            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-4">Popular Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
                    onClick={() => handleMovieCardClick(movie.id)}
                  >
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-72 object-cover"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gray-300 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* popular tv */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Popular TV Shows</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {tvShows.map((show) => (
                  <div
                    key={show.id}
                    className="relative bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
                    onClick={() => handleTVShowCardClick(show.id)}
                  >
                    {show.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={show.name}
                        className="w-full h-72 object-cover"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gray-300 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* movie detail modal */}
      {expandedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg overflow-hidden w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12">
            <div className="flex">
              <div className="w-1/3">
                {expandedMovie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${expandedMovie.poster_path}`}
                    alt={expandedMovie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-black">{expandedMovie.title}</h2>
                  <p className="text-sm mb-4 text-gray-600">{expandedMovie.overview}</p>
                  <p className="text-xs text-gray-500">
                    🎬 Runtime: {expandedMovie.runtime} minutes
                  </p>
                  <p className="text-xs text-gray-500">
                    📅 Release: {expandedMovie.release_date}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    🏷️ Genres: {expandedMovie.genres.map((g) => g.name).join(', ')}
                  </p>
                </div>

                <button
                  onClick={() => setExpandedMovie(null)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TV show detail modal */}
      {expandedTVShow && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg overflow-hidden w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12">
            <div className="flex">
              <div className="w-1/3">
                {expandedTVShow.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${expandedTVShow.poster_path}`}
                    alt={expandedTVShow.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-black">{expandedTVShow.name}</h2>
                  <p className="text-sm mb-4 text-gray-600">{expandedTVShow.overview}</p>
                  <p className="text-xs text-gray-500">
                    📅 First Air Date: {expandedTVShow.first_air_date}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    🏷️ Genres: {expandedTVShow.genres.map((g) => g.name).join(', ')}
                  </p>
                </div>

                <button
                  onClick={() => setExpandedTVShow(null)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;