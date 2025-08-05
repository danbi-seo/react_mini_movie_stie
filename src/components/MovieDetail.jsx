import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SkeletonMovieDetail from "./SkeletonMovieDetail";
import { FaYoutube } from "react-icons/fa";
import {
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieVideos,
} from "../API/tmdbapi";

const DetailContainer = styled.div`
  width: 100%;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #101322;
  /* overflow-x: hidden; */
  padding-top: 50px;
`;

const BackdropSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  /* position: absolute; */
  top: 0;
  width: 100%;
  height: 400px;
  /* height: 50%;  */
  /* width: 780px; */
  background-size: cover;
  background-position: center top;
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  z-index: 1;
  /* overflow: hidden; */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        180deg,
        rgba(16, 19, 34, 0) 60%,
        rgba(16, 19, 34, 0.76) 80%,
        #101322 100%
      ),
      linear-gradient(
        0deg,
        rgba(16, 19, 34, 0) 60%,
        rgba(16, 19, 34, 0.76) 80%,
        #101322 100%
      ),
      linear-gradient(
        90deg,
        rgba(16, 19, 34, 0) 60%,
        rgba(16, 19, 34, 0.76) 80%,
        #101322 100%
      ),
      linear-gradient(
        270deg,
        rgba(16, 19, 34, 0) 60%,
        rgba(16, 19, 34, 0.76) 80%,
        #101322 100%
      );
    z-index: 2; /* 오버레이가 배경 이미지 위에 오도록 */
  }
`;
const ContentSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  top: -100px;
  z-index: 3;
`;

const MovieHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  margin-bottom: 20px;
`;

const MovieDetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 3;
  margin-top: 100px;
  margin-bottom: 5px;
  padding: 5px;
  position: relative;
  width: 100%;
`;

const MovieDetailsMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-top: 30px;
  text-align: left;
  position: absolute;
`;

const PosterImage = styled.img`
  position: absolute;
  top: 0%;
  right: 0;
  width: 170px;
  height: auto;
  z-index: 2;
  border-radius: 10px;
  transform: translateY(-50%);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  font-weight: bold;
`;

const Tagline = styled.p`
  font-size: 1rem;
  color: #bbb;
  margin: 5px 0;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #f5c518;
  &::before {
    content: "⭐";
    margin-right: 5px;
  }
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #bbb;
  white-space: nowrap;
`;

const GenreTag = styled.span`
  color: #bbb;
  white-space: nowrap;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
  height: 50px;
  gap: 10px;
`;

// $ 접두사를 추가하면 DOM에 직접적으로 전달하지 않음
const LikeDislikeButton = styled.button`
  display: flex;
  border-style: none;
  background-color: ${(props) => (props.$active ? "#275cd6" : "#25304a")};
  color: ${(props) => (props.$active ? "white" : "#98a4b7")};
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
    background-color: "#98a4b7";
    color: white;
  }
  &:active {
    background-color: "#275cd6";
    color: white;
  }
`;

const OverviewSection = styled.div`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f5c518;
  border-bottom: 1px solid #374151;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const OverviewText = styled.p`
  font-size: 1rem;
  color: #ccc;
  line-height: 1.6;
`;

const CastAndCrewSection = styled.div`
  margin-top: 40px;
`;

const CastList = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #275cd6;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #1f2937;
  }
`;

const CastMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
  width: 100px;
`;

const CastImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
`;

const CastName = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  white-space: normal;
`;

const CastRole = styled.p`
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 2px;
  white-space: normal;
`;

const TrailerSection = styled.div`
  margin-top: 40px;
`;

const TrailerFrame = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const TrailerIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const NoTrailerMessage = styled.p`
  font-size: 1rem;
  color: #aaa;
  text-align: center;
  margin-top: 20px;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [creditsData, setCreditsData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeStatus, setLikeStatus] = useState(null);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w500";
  const BACKDROP_SIZE = "w1280";

  useEffect(() => {
    const fetchAllMovieData = async () => {
      setLoading(true);
      try {
        const [movieDetail, credits, videos] = await Promise.all([
          fetchMovieDetail(id),
          fetchMovieCredits(id),
          fetchMovieVideos(id),
        ]);

        setMovieData(movieDetail);
        setCreditsData(credits);

        // 예고편 영상
        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("영화 정보 가져오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovieData();
  }, [id]);

  if (loading || !movieData) return <SkeletonMovieDetail />;

  const backdropUrl = movieData.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movieData.backdrop_path}`
    : null;
  const posterUrl = movieData.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movieData.poster_path}`
    : null;
  const director = creditsData?.crew.find(
    (member) => member.job === "Director"
  )?.name;

  const handleLike = () => {
    setLikeStatus((prev) => (prev === "좋아요" ? null : "좋아요"));
  };
  const handleDislike = () => {
    setLikeStatus((prev) => (prev === "별로예요" ? null : "별로예요"));
  };

  return (
    <DetailContainer>
      {backdropUrl && <BackdropSection $backgroundImage={backdropUrl} />}

      <ContentSection>
        <MovieHeader>
          {posterUrl && <PosterImage src={posterUrl} />}
          <Title>{movieData.title}</Title>
          <Tagline>{movieData.tagline}</Tagline>
          <GenreList>
            {movieData.genres && movieData.genres.length > 0 ? (
              movieData.genres.map((genre) => (
                <GenreTag key={genre.id}>{genre.name}</GenreTag>
              ))
            ) : (
              <GenreTag>장르 정보 없음</GenreTag>
            )}
          </GenreList>
          {movieData.vote_average > 0 && (
            <Rating>{movieData.vote_average.toFixed(1)}</Rating>
          )}
        </MovieHeader>

        <ButtonContainer>
          <LikeDislikeButton
            onClick={handleLike}
            $active={likeStatus === "좋아요"}
          >
            💙 좋아요
          </LikeDislikeButton>
          <LikeDislikeButton
            onClick={handleDislike}
            $active={likeStatus === "별로예요"}
          >
            💔 별로예요
          </LikeDislikeButton>
        </ButtonContainer>

        <OverviewSection>
          <SectionTitle>줄거리</SectionTitle>
          <OverviewText>{movieData.overview}</OverviewText>
        </OverviewSection>

        {creditsData && creditsData.cast.length > 0 && (
          <CastAndCrewSection>
            <SectionTitle>출연진/제작진</SectionTitle>
            {director && (
              <OverviewText style={{ marginBottom: "20px" }}>
                감독: {director}
              </OverviewText>
            )}
            <CastList>
              {creditsData.cast.slice(0, 10).map((cast) => (
                <CastMember key={cast.id}>
                  <CastImage
                    src={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w185${cast.profile_path}`
                        : "https://via.placeholder.com/100x100.png?text=No+Image"
                    }
                    alt={cast.name}
                  />
                  <CastName>{cast.name}</CastName>
                  <CastRole>{cast.character}</CastRole>
                </CastMember>
              ))}
            </CastList>
          </CastAndCrewSection>
        )}

        <TrailerSection>
          <SectionTitle>예고편</SectionTitle>
          {trailerKey ? (
            <TrailerFrame>
              <TrailerIframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="영화 예고편"
              ></TrailerIframe>
            </TrailerFrame>
          ) : (
            <NoTrailerMessage>예고편 정보가 없습니다.</NoTrailerMessage>
          )}
        </TrailerSection>
      </ContentSection>
    </DetailContainer>
  );
};

export default MovieDetail;
