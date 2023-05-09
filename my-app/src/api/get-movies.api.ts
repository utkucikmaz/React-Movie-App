import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

export type MovieResult = Array<{
  title: string;
  id: number;
  poster_path: string;
  overview: string;
  vote_average: number;
}>;

export const getMovies = async (searchTerm: string) => {
  const path = searchTerm ? searchUrl + searchTerm : discoverUrl;
  const movies = await axios.get<{
    results: MovieResult;
  }>(path);

  return movies.data;
};
