import { useMovies } from "hooks/use-movies";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import { MovieCard, MovieCardProps } from "components/MovieCard";
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/context/useAuth";
import { useFavorites } from "hooks/useFavorites";

type MoviesProps = {
    searchTerm: string;
};

export const Movies = ({ searchTerm }: MoviesProps) => {
    const { FMovies } = useFavorites();
    const [movies, loading, notFound] = useMovies(searchTerm);
    const { currentUser } = useAuth();

    const MappedArray = movies.map((movie) => ({
        ...movie,
        is_favorite: false,
    }));
    const FMoviesArray = FMovies.map((fmovie) => ({
        ...fmovie,
        is_favorite: true,
    }));
    const updatedArray = MappedArray.map((movie) => {
        const matchingMovie = FMoviesArray.filter(
            (fmovie) => fmovie.movie_id === movie.id
        );
        if (matchingMovie.length > 0) {
            return { ...movie, is_favorite: true };
        }
        return { ...movie, is_favorite: false };
    });

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
        is_favorite,
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
                    is_favorite,
                },
            ]);
        }
    };

    return (
        <div className="movie-container">
            {updatedArray.length === 0 ? (
                <p>
                    We are deeply sorry to inform you that there is no movie
                    under this name...
                </p>
            ) : (
                updatedArray.map((movie) => (
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
