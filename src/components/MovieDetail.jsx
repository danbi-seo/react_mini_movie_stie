import React from 'react';
import styled from 'styled-components';

const DetailContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: black;
  flex-direction: column;
  align-items: center;
`
const BackdropSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
`
const MovieHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  gap: 10px;
`
const PosterImage = styled.img`
  width: 250px;
  height: auto;
`

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1 `
  font-size: 2rem;
  color: white;
  font-weight: bold;
`

const Tagline = styled.p`
  font-size: 1rem;
  color: #bbb;
`
const RatingAndGenres = styled.div`
  display: flex;
  align-items: center;
  color: #bbb;
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
  gap: 10px;
`

const GenreTag = styled.span`
  background-color: #084430;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
`

const OverviewSection = styled.div`
  width: 100%;
`

const OverviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f5c518;
  margin: 10px;
`

const OverviewText = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 10px;
`

const MovieDetail = ({ movie }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w500";
  const BACKDROP_SIZE = "w1280";

  const backdropUrl = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`;
  const posterUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`;
  return(
    <DetailContainer>
      <BackdropSection $imageUrl={backdropUrl}>
        <MovieHeader>
          <PosterImage src={posterUrl}/>
          <MovieDetails>
            <Title>{movie.title}</Title>
            <Rating>{movie.vote_average.toFixed(1)}</Rating>
            {movie.tagline && <Tagline>{movie.tagline}</Tagline>}
            <RatingAndGenres>
              <GenreList>
                {movie.genres && movie.genres.length > 0 
                ? movie.genres.map(genre => (<GenreTag key={genre.id}>{genre.name}</GenreTag>))
                : (<GenreTag>장르 정보 없음</GenreTag>)}
              </GenreList>
            </RatingAndGenres>
            <OverviewSection>
              <OverviewTitle>줄거리</OverviewTitle>
              <OverviewText>{movie.overview}</OverviewText>
            </OverviewSection>
          </MovieDetails>
        </MovieHeader>
      </BackdropSection>
    </DetailContainer>
  )
}

export default MovieDetail;