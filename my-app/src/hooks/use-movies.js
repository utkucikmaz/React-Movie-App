import { getMovies } from "../api/get-movies.api";
import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export const useMovies = searchTerm => {
  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchedMovies = async searchTerm => {
      setLoading(true);
      const data = await getMovies(searchTerm);
      setLoading(false);
      setMovies(data.results);
    };

    fetchedMovies(searchTerm).catch(err => {
      setLoading(false);
      if (err.status === 404) {
        setNotFound(true);
      }
    });
  }, [searchTerm]);

  return [movies, loading, notFound];
};
