import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const IMG_API = 'https://image.tmdb.org/t/p/w1280'


export default function MovieCard ({ title, poster_path, overview, vote_average }) {

  const { currentUser } = useContext(AuthContext);

  const setVoteClass = (vote) => {
    
    if (vote >= 8){
      return 'green'
    }
    else if(vote >= 6){
      return 'orange'
    }
    else{
      return 'red'
    }

  }
  return (

    <div className='movie'>
          <img src={IMG_API + poster_path} />
          
        <div className='movie-info'>
            <div className='movie-name'>
            <h3 className='movie-title'>{title}</h3>
            {
              currentUser ? <span className={`tag ${setVoteClass(vote_average)}`}> {vote_average} </span> : ''
            }
            </div>
        </div>
        <div className='movie-over'>
            <h2>Overview</h2>
            <p>{overview}</p>
        </div>
    </div>
  );
}
