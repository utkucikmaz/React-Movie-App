import React, { useEffect} from "react";
import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";

const API_KEY = process.env.REACT_APP_API_KEY

const UNFILTERED = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const FILTERED = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`



export default function Main() {

        const [ searchTerm, setSearchTerm ] = useState("")
        const[ movies, setMovies ] = useState([])
        const [ loading, setLoading ] = useState(false)
        const [ notFound, setNotFound] = useState(false)
        
        let content;
        const getMovies = (API) => {
            setLoading(true)
            axios.get(API)
            .then((res) => {
                setMovies(res.data.results)
                setLoading(false)
                if(res.data.results.length == 0){
                    setNotFound(true)
                }
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            getMovies(FILTERED + searchTerm)
            setSearchTerm ('')
        }
        
        if(loading) {
            content = <Loading />
        }else if(notFound){
            content = <NotFound />
        }else{
            content = <div className="movie-container">
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
        {
            content       
        }
    </React.Fragment>

  )

}