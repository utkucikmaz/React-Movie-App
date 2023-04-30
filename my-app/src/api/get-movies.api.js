import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

export const getMovies = async searchTerm => {
  const path = searchTerm ? searchUrl + searchTerm : discoverUrl;
  const movies = await axios.get(path);

  return movies.data;
};
