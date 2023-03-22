import React, { useEffect} from "react";
import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_API_KEY

const UNFILTERED = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const FILTERED = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`



export default function Main() {

        const [ searchTerm, setSearchTerm ] = useState("")
        const[ movies, setMovies ] = useState([])

        const getMovies = (API) => {
            axios.get(API)
            .then((res) => setMovies(res.data.results))
            .catch((err) => console.log(err))
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            getMovies(FILTERED + searchTerm)
            setSearchTerm ('')
        }

        useEffect (() => {
            getMovies(UNFILTERED)
        }, []);

  return (
    <React.Fragment>
        <form className="search" onSubmit={handleSubmit}>

            <input
                type='search'
                placeholder="Search a movie..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
                type='submit'
                value='Search'
                className="btn btn-outline-dark"
            />
        </form>
        <div className="movie-container">
            {
                    movies.map ((movie) => (
                    <MovieCard 
                        key={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        overview={movie.overview}
                        vote_average={movie.vote_average} 
                        /> 
                        ))
            }
        </div> 
    </React.Fragment>

  )

}