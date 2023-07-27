import { useAuth } from "hooks/context/useAuth";
import { useState } from "react";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

export type MovieCardProps = {
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    id: number;
    is_favorite: boolean;
    onClickFavButton: () => void;
};
export const MovieCard = ({
    title,
    poster_path,
    overview,
    vote_average,
    onClickFavButton,
    is_favorite,
}: MovieCardProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    const handleOnClick = () => {
        handleClick();
        onClickFavButton();
    };

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
                    <span className={`tag ${setVoteClass(vote_average)}`}>
                        {" "}
                        {vote_average}{" "}
                    </span>
                </div>
            </div>
            <div className="movie-over">
                <h2 className="movie-title">{title}</h2>
                <div>
                    {currentUser ? (
                        <button
                            type="button"
                            id="FavTestId"
                            onClick={handleOnClick}
                            data-cy="FavTest"
                        >
                            {is_favorite || isClicked ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="red"
                                    className="bi bi-heart-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="red"
                                    className="bi bi-heart"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>
                            )}
                        </button>
                    ) : (
                        ""
                    )}
                </div>
                <p>{overview}</p>
            </div>
        </div>
    );
};

export default MovieCard;
//comment line
