import { useEffect, useReducer } from "react";
import { getMovies, MovieResult } from "../api/get-movies.api";

type State = {
  movies: MovieResult;
  notFound: boolean;
  loading: boolean;
};

type Action =
  | { type: "setMovies"; payload: MovieResult }
  | { type: "setNotFound"; payload: boolean }
  | { type: "setLoading"; payload: boolean };

const initialState: State = {
  movies: [],
  notFound: false,
  loading: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setMovies":
      return { ...state, movies: action.payload };
    case "setNotFound":
      return { ...state, notFound: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const useMovies = (searchTerm: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch({ type: "setLoading", payload: true });
        const data = await getMovies(searchTerm);
        dispatch({ type: "setMovies", payload: data.results });
        dispatch({ type: "setNotFound", payload: false });
      } catch (error: any) {
        dispatch({ type: "setMovies", payload: [] });
        dispatch({ type: "setNotFound", payload: error.status === 404 });
      } finally {
        dispatch({ type: "setLoading", payload: false });
      }
    };

    fetchMovies();
  }, [searchTerm, dispatch]);

  return [state.movies, state.loading, state.notFound] as const;
};
