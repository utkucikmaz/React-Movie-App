import { MovieType } from "api/get-movies.api";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "hooks/context/useAuth";
import { supabase } from "supabaseClient";

type FavMovieType = MovieType & { movie_id: number };
type FavMovieResult = Array<FavMovieType>;

export const useFavorites = () => {
  const [FMovies, setFMovies] = useState<FavMovieResult>([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  const fetchedMovies = useCallback(async () => {
    if (currentUser?.uid) {
      setLoading(true);
      const { data: MovieFavorites } = await supabase
        .from("MovieFavorites")
        .select("*")
        .eq("FavUser", currentUser.uid);
      setFMovies(MovieFavorites as FavMovieResult);
      setLoading(false);
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    fetchedMovies();
  }, [currentUser?.uid, fetchedMovies]);
  return {
    FMovies,
    loading,
    fetchedMovies,
  };
};
