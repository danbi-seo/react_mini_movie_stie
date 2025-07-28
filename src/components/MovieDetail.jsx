import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SkeletonMovieDetail from './SkeletonMovieDetail'; 

const DetailContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; //자식요소들의 절대 위치 기준
  padding-top: 50px;
`
const BackdropSection = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 400px; */
  height: 50%;
  width: 780px;
  background-size: cover;
  background-position: center top; //이미지 위치를 상단 위쪽에 배치
  background-image: ${(props) => `url(${props.$backgroundImage})`}; //props로 동적으로 URL을 받아와서 url()안에 넣어서 css배경으로 
  z-index: 1;

  &::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      linear-gradient(180deg, rgba(16, 19, 34, 0) 60%, rgba(16, 19, 34, .76) 80%, #101322 100%),
      linear-gradient(0deg, rgba(16, 19, 34, 0) 60%, rgba(16, 19, 34, .76) 80%, #101322 100%),
      linear-gradient(90deg, rgba(16, 19, 34, 0) 60%, rgba(16, 19, 34, .76) 80%, #101322 100%),
      linear-gradient(270deg, rgba(16, 19, 34, 0) 60%, rgba(16, 19, 34, .76) 80%, #101322 100%);
  }
`

const MovieDetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 3;
  margin-top: 100px;
  margin-bottom: 5px;
  padding: 5px;
  position: relative;
  width: 100%;
`

const MovieDetailsMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-top: 30px;
  text-align: left;
  position: absolute;
`

const PosterImage = styled.img`
  position: absolute;
  top: 30%;
  right: 0; 
  width: 170px;
  height: auto;
  z-index: 2;
  border-radius: 10px;
  transform: translateY(-50%);
`

const Title = styled.h1 `
  font-size: 2rem;
  color: white;
  font-weight: bold;
`

const Tagline = styled.p`
  font-size: 1rem;
  color: #bbb;
  margin: 5px 0;
`

const Rating = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #f5c518;

  &::before{
    content: '⭐';
    margin-right: 5px;
  }
`
const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #bbb;
  white-space: nowrap;
`
const GenreTag = styled.span`
  color: #bbb;
  white-space: nowrap;
  margin-right: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
  height: 100%;
  gap: 10px;
`
// $ 접두사를 추가하면 DOM에 직접적으로 전달하지 않음
const LikeDislikeButton = styled.button`
  display: flex;
  border-style: none;
  background-color: ${(props) => (props.$active ? '#275cd6' : '#25304a')};
  color: ${(props) => (props.$active ? 'white' : '#98a4b7')};
  padding: 15px 0;
  width: 50%;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.3s ease;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: '#98a4b7';
    color: white;
  }

  &:active {
    background-color: '#275cd6';
    color: white;
  }
`

const OverviewSection = styled.div`
  width: 100%;
  padding: 0 20px;
  text-align: center;
`

const OverviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f5c518;
  margin: 10px;
`

const OverviewText = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin: 10px;
`

const MovieDetail = ({ movie }) => {
  const { id } = useParams();
  const [ movieData, setMovieData ] = useState({}); // `movie` 이름을 `movieData`로 / null로 했을때 계속 오류남
  const [ loading, setLoading ] = useState(true);
  const [ likeStatus, setLikeStatus ] = useState(null);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w780";
  const BACKDROP_SIZE = "w780";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: 'application/json;charset=utf-8',
          },
        });
        const data = await response.json();
        console.log("Movie Data:", data);
        setMovieData(data); // 영화 데이터를 상태로 저장
        setLoading(false); 
      } catch(error){
        console.error('영화 상세 정보 오류', error);
        setLoading(false); 
      }
    }
    fetchMovieDetail();
  }, [id]);

  if (loading) return <SkeletonMovieDetail />;

  const backdropUrl = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movieData.backdrop_path}`;
  const posterUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${movieData.poster_path}`;

  const handleLike = () => {
    setLikeStatus(prev => prev === '좋아요' ? null : '좋아요');
  }
  const handleDislike = () => {
    setLikeStatus(prev => prev === '별로예요' ? null : '별로예요');
  };

  return(
    <DetailContainer>
      <BackdropSection $backgroundImage={backdropUrl}>
        <MovieDetailsHeader>
          <PosterImage src={posterUrl}/>
          <MovieDetailsMain>
            <Title>{movieData.title}</Title>
            <GenreList>
              {movieData.genres && movieData.genres.length > 0
                ? movieData.genres.map((genre, index) => (
                    <span key={genre.id}>
                      <GenreTag>{genre.name}</GenreTag>
                    </span>
                  ))
                : (<GenreTag>장르 정보 없음</GenreTag>)}
            </GenreList>
            <Rating>{movieData.vote_average.toFixed(1)}</Rating>
            
            <ButtonContainer>
              <LikeDislikeButton onClick={handleLike} $active={likeStatus === '좋아요'}>🙂 좋아요</LikeDislikeButton>
              <LikeDislikeButton onClick={handleDislike} $active={likeStatus === '별로예요'}>🙁 별로예요</LikeDislikeButton>
            </ButtonContainer>

            <OverviewSection>
              <OverviewTitle>줄거리</OverviewTitle>
              <OverviewText>{movieData.overview}</OverviewText>
            </OverviewSection>
            </MovieDetailsMain>
          </MovieDetailsHeader>
      </BackdropSection>
    </DetailContainer>
  )
}

export default MovieDetail;


            {/* <GenreList>
                {movieData.genres && movieData.genres.length > 0 
                ? movieData.genres.map(genre => (<GenreTag key={genre.id}>{genre.name}</GenreTag>))
                : (<GenreTag>장르 정보 없음</GenreTag>)}
              </GenreList> */}
              
            {/* {movieData.tagline && <Tagline>{movieData.tagline}</Tagline>} */}
