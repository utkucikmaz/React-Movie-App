import { MovieResult, getMovies } from "../api/get-movies.api";
import { useEffect, useState } from "react";

export const useMovies = (searchTerm: string) => {
  const [movies, setMovies] = useState<MovieResult>([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedMovies = async (searchTerm: string) => {
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
  }, [searchTerm, setLoading]);

  return [movies, loading, notFound] as const;
};
