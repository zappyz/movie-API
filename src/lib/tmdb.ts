export const getPopularMovies = async () => {
  const url = `${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
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