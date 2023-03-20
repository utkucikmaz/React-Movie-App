import React, { useEffect} from "react";
import { useState } from "react";
import axios from "axios";

const UNFILTERED = 'https://api.themoviedb.org/3/discover/movie?api_key=c4fc804c03fb9b75054c5bb4fd565b9c';

const FILTERED = 'https://api.themoviedb.org/3/search/movie?api_key=c4fc804c03fb9b75054c5bb4fd565b9c&query='

export default function Main() {

        const [ searchTerm, setSearchTerm ] = useState("")

        const getMovies = (API) => {
            axios.get(API).then((res) => console.log(res.data.results))
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(searchTerm)
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

        </div>
    </React.Fragment>

  )

}