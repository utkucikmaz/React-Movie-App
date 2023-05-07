import { FormEvent, useState } from "react";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import { useMovies } from "../hooks/use-movies";
import { useAuth } from "hooks/context/useAuth";

export default function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, loading, notFound] = useMovies(searchTerm);

  const { currentUser } = useAuth();

  let content;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUser) {
      setSearchTerm("");
    } else {
      alert("Please login to search a movie");
    }
  };

  if (loading) {
    content = <Loading />;
  } else if (notFound) {
    content = <NotFound />;
  } else {
    content = (
      <div className="movie-container">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="   Search a movie..."
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <input type="submit" value="Search" className="btn btn-outline-dark" />
      </form>
      {content}
    </>
  );
}
