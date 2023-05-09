import MovieCard from "components/MovieCard";
import { useFavorites } from "hooks/useFavorites";

export const Favorites = () => {
  const { FMovies, loading } = useFavorites();

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
        />
      ))}
    </div>
  );
};
