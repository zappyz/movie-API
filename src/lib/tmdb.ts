export const getPopularMovies = async (page: number = 1) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching popular movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const getPopularTVShows = async (page: number = 1) => {
  const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching popular TV shows: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching movie details: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getTVShowDetails = async (tvShowId: number) => {
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching TV show details: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return null;
  }
};
