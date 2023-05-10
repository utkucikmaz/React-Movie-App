import { useMovies } from "hooks/use-movies";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import { MovieCard, MovieCardProps } from "components/MovieCard";
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/context/useAuth";

type MoviesProps = {
  searchTerm: string;
};
export const Movies = ({ searchTerm }: MoviesProps) => {
  const [movies, loading, notFound] = useMovies(searchTerm);
  const { currentUser } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (notFound) {
    return <NotFound />;
  }

  const handleFav = async ({
    title,
    poster_path,
    overview,
    vote_average,
    id,
  }: Omit<MovieCardProps, "onClickFavButton">) => {
    if (currentUser?.uid) {
      await supabase.from("MovieFavorites").insert([
        {
          title,
          poster_path,
          overview,
          vote_average,
          movie_id: id,
          FavUser: currentUser.uid,
        },
      ]);
    }
  };

  return (
    <div className="movie-container">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          overview={movie.overview}
          vote_average={movie.vote_average}
          onClickFavButton={() => {
            handleFav({
              title: movie.title,
              poster_path: movie.poster_path,
              overview: movie.overview,
              vote_average: movie.vote_average,
              id: movie.id,
            });
          }}
        />
      ))}
    </div>
  );
};
