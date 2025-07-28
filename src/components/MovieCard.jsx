import React from 'react';
import styled from 'styled-components'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';


const MovieCardContainer = styled.div`
  width: 160px;
  height: 300px;
  /* height: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #172036;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin: 10px;
  /* flex-grow: 1; */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
`

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`

const MovieInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 13px;
  margin-top: 5px;
  flex-grow: 1;
`

const MovieInfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 15px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 800;
`

const PlusButton = styled.button`
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: #172036;
  border-radius: 50%;
  font-size: 14px;
  padding-bottom: 3px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  background-color: ${(props) => (props.$active ? '#275cd6' : '#25304a')};
  color: ${(props) => (props.$active ? 'white' : '#98a4b7')};
`


const MovieCard = ({ movie }) => {
  const [isActive, setIsActive] = useState(false);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const PlusButtonActive = (e) => {
    e.stopPropagation(); // 상위요소에 클릭 이벤트가 발생하지 않게 함
    setIsActive(prev => !prev);
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
  }

  return (
    // Link컴포넌트로 MovieCardContainer를 감싸서 클릭할때 이동할 수 있게
    <Link to={`/movie/${movie.id}`}>
      <MovieCardContainer>
        <img className='h-[300px]'
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
        <MovieInfo>
          <p className='font-[700]'>{movie.title}</p>
          <MovieInfoBottom>
            <span>⭐️ {movie.vote_average.toFixed(1)}</span>
            <PlusButton $active={isActive} onClick={PlusButtonActive}>+</PlusButton>
          </MovieInfoBottom>
        </MovieInfo>
      </MovieCardContainer>
    </Link>
  )
}

export default MovieCard;