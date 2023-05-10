import MovieCard from "components/MovieCard";
import { useAuth } from "hooks/context/useAuth";
import { useFavorites } from "hooks/useFavorites";
import { supabase } from "supabaseClient";

export const Favorites = () => {
  const { FMovies, fetchedMovies } = useFavorites();

  const { currentUser } = useAuth();

  const handleFav = async (id: number) => {
    if (currentUser?.uid) {
      await supabase.from("MovieFavorites").delete().eq("movie_id", id);
      fetchedMovies();
    }
  };

  return (
    <div className="movie-container">
      {FMovies.map(FMovie => (
        <MovieCard
          key={FMovie.id}
          id={FMovie.id}
          title={FMovie.title}
          poster_path={FMovie.poster_path}
          overview={FMovie.overview}
          vote_average={FMovie.vote_average}
          onClickFavButton={() => {
            handleFav(FMovie.movie_id);
          }}
        />
      ))}
    </div>
  );
};
