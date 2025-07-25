import React from 'react';
import styled from 'styled-components'; 
import { Link } from 'react-router-dom';

const MovieCardContainer = styled.div`
  width: 220px;
  height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  background: rgba(240, 240, 240, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #ffffff;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin: 10px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
`

const MovieCard = ({ movie }) => {

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    // Link컴포넌트로 MovieCardContainer를 감싸서 클릭할때 이동할 수 있게
    <Link to={`/movie/${movie.id}`} >
      <MovieCardContainer>
        <img className='h-[300px]'
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
        <div>
          <p>
            평점 : <span>{movie.vote_average.toFixed(1)}</span>
          </p>
        </div>
        <div>
          <h3>{movie.title}</h3>
        </div>
      </MovieCardContainer>
    </Link>
  )
}

export default MovieCard;