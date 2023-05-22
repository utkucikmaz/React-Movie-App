import { useMovies } from "hooks/use-movies";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import { MovieCard, MovieCardProps } from "components/MovieCard";
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/context/useAuth";
import { useFavorites } from "hooks/useFavorites";
import { useEffect } from "react";

type MoviesProps = {
    searchTerm: string;
};
export const Movies = ({ searchTerm }: MoviesProps) => {
    const { FMovies, fetchedMovies } = useFavorites();
    const [movies, loading, notFound] = useMovies(searchTerm);
    const { currentUser } = useAuth();

    // input
    // == movies [{}, {}]
    // == FMovies [{}, {}]

    // const mappedFirstArrayElement = {
    //     ...movies[0],
    //     is_favorite: false,
    // };

    // output
    // == movies [{ is_fav: true }, { is_fav: true }]

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
                    favorite_button: true,
                },
            ]);
        }
    };

    const isFavorite = function (id: Number): boolean {
        const favoriteMovies = fetchedMovies;

        return true;
        // get favorites
        // return true;
    };

    return (
        <div className="movie-container">
            {movies.length === 0 ? (
                <p>
                    We are deeply sorry to inform you that there is no movie
                    under this name...
                </p>
            ) : (
                movies.map((movie) => (
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
                                is_favorite: true,
                                id: movie.id,
                            });
                        }}
                        is_favorite={movie.is_favorite}
                    />
                ))
            )}
        </div>
    );
};
