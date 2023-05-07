import { useAuth } from "hooks/context/useAuth";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

type TypeMovieCard = {
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
};
export const MovieCard = ({
  title,
  poster_path,
  overview,
  vote_average,
}: TypeMovieCard) => {
  const { currentUser } = useAuth();

  const setVoteClass = (vote: number) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  return (
    <div className="movie">
      <img alt="poster" src={IMG_API + poster_path} />

      <div className="movie-info">
        <div className="movie-name">
          <h3 className="movie-title">{title}</h3>
          {currentUser ? (
            <span className={`tag ${setVoteClass(vote_average)}`}>
              {" "}
              {vote_average}{" "}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
