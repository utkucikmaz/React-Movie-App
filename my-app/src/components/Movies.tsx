import { useMovies } from "hooks/use-movies";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import MovieCard from "components/MovieCard";

type MoviesProps = {
  searchTerm: string;
};
export const Movies = ({ searchTerm }: MoviesProps) => {
  const [movies, loading, notFound] = useMovies(searchTerm);

  if (loading) {
    return <Loading />;
  }

  if (notFound) {
    return <NotFound />;
  }

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
        />
      ))}
    </div>
  );
};
