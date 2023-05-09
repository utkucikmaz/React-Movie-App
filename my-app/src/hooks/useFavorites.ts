import { MovieResult } from "api/get-movies.api";
import { useEffect, useState } from "react";
import { useAuth } from "hooks/context/useAuth";
import { supabase } from "supabaseClient";

export const useFavorites = () => {
  const [FMovies, setFMovies] = useState<MovieResult>([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchedMovies = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        const { data: MovieFavorites } = await supabase
          .from("MovieFavorites")
          .select("*")
          .eq("FavUser", currentUser.uid);
        setFMovies(MovieFavorites as MovieResult);
        setLoading(false);
      }
    };
    fetchedMovies();
  }, [currentUser?.uid]);
  return {
    FMovies,
    loading,
  };
};
