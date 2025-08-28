export const apiKey = "48323a7f101a1af03b309c09e85881d7";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (
    type: "popular" | "now_playing" | "upcoming" | "top_rated",
    page = 1,
  ) => `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieSearch: (query: string, page: number) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  getGenreList: () =>
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
  getDiscover: (genre: number) =>
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`,
  imageOriginal: (url: string) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url: string) => `https://image.tmdb.org/t/p/w500/${url}`,
};

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

export async function fetchGenres(): Promise<Genre[]> {
  const response = await fetch(tmdbAPI.getGenreList());
  console.log("console.remove - fetchGenres - response:", response);
  if (!response.ok) throw new Error("Failed to fetch genres");
  const data = await response.json();
  return data.genres;
}

export async function fetchSearchMovies(
  query: string,
  page: number = 1,
): Promise<Movie[]> {
  if (!query) return [];
  const response = await fetch(
    tmdbAPI.getMovieSearch(encodeURIComponent(query), page),
  );
  if (!response.ok) throw new Error("Failed to fetch search results");
  const data = await response.json();
  return data.results;
}

export async function fetchMoviesByGenre(genreId: number): Promise<Movie[]> {
  if (!genreId) return [];
  const response = await fetch(tmdbAPI.getDiscover(genreId));
  if (!response.ok) throw new Error("Failed to fetch movies by genre");
  const data = await response.json();
  return data.results;
}
