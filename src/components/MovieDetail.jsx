import React, { useEffect, useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { RiMovieAiFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SkeletonMovieDetail from "./SkeletonMovieDetail";
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

const IconItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
  width: 100%;
`;

// 각 네비게이션 아이템
// .withConfig(): 특정 컴포넌트를 렌더링하고 동작시키는 방식을 설정(configure)할 수 있게 해주는 특별한 메서드
// shouldForwardProp: styled-components가 생성한 컴포넌트에 전달되는 모든 prop들을 검사하는 함수
const IconItem = styled.div`
  display: flex;
  width: 780px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-decoration: none;
  color: ${(props) => (props.$active ? "#275cd6" : "#98a4b7")};
  font-size: 0.75rem;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  transition: color 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;
`;

// 아이콘 자체 스타일
const IconBox = styled.div`
  font-size: 1.5rem;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$active ? "#275cd6" : "#98a4b7")};
  cursor: pointer;
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
/* ================================================================= */

const MovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [creditsData, setCreditsData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w500";
  const BACKDROP_SIZE = "w1280";

  const [likeMovies, setLikeMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("likeMovies")) || []; // 수정된 부분: 로컬스토리지에서 불러오기
  });
  const [disLikeMovies, setDisLikeMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("dislikeMovies")) || []; // 수정된 부분: 로컬스토리지에서 불러오기
  });

  // 좋아요와 별로예요 상태값을 로컬스토리지에 저장
  // const [likeMovies, setLikeMovies] = useState([]);
  // const [disLikeMovies, setDisLikeMovies] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [watchingList, setWatchingList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [bestMovies, setBestMovies] = useState(
    () => JSON.parse(localStorage.getItem("bestMovies")) || []
  );
  const [bestReady, setBestReady] = useState(false);

  // 버튼 클릭 상태 관리
  const [wishListActive, setWishListActive] = useState(false);
  const [watchingActive, setWatchingActive] = useState(false);
  const [watchedActive, setWatchedActive] = useState(false);
  const [bestMoviesActive, setBestMoviesActive] = useState(false);

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
        // 로컬스토리지에서 상태를 불러온 후 movieData와 동기화
        const savedWishList =
          JSON.parse(localStorage.getItem("wishList")) || [];
        const savedWatchingList =
          JSON.parse(localStorage.getItem("watchingList")) || [];
        const savedWatchedList =
          JSON.parse(localStorage.getItem("watchedList")) || [];
        const savedBestMovies =
          JSON.parse(localStorage.getItem("bestMovies")) || [];

        setWishList(savedWishList);
        setWatchingList(savedWatchingList);
        setWatchedList(savedWatchedList);
        setBestMovies(savedBestMovies);
        setBestReady(true);

        setWishListActive(
          savedWishList.some((movie) => movie.id === movieDetail.id)
        );
        setWatchingActive(
          savedWatchingList.some((movie) => movie.id === movieDetail.id)
        );
        setWatchedActive(
          savedWatchedList.some((movie) => movie.id === movieDetail.id)
        );
        setBestMoviesActive(
          (JSON.parse(localStorage.getItem("bestMovies")) || []).some(
            (movie) => movie.id === movieDetail.id
          )
        );
      } catch (error) {
        console.error("영화 정보 가져오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovieData();
  }, [id]);

  useEffect(() => {
    // movieData와 버튼 상태가 초기화된 후, 상태값을 로컬스토리지에 저장
    localStorage.setItem("likeMovies", JSON.stringify(likeMovies));
    localStorage.setItem("dislikeMovies", JSON.stringify(disLikeMovies));
    // 다른 리스트들은 로컬스토리지에 저장하지 않음
  }, [likeMovies, disLikeMovies]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
    localStorage.setItem("watchingList", JSON.stringify(watchingList));
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
    localStorage.setItem("bestMovies", JSON.stringify(bestMovies));
  }, [wishList, watchingList, watchedList, bestMovies]);

  const backdropUrl = movieData?.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movieData.backdrop_path}`
    : null;
  const posterUrl = movieData?.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movieData.poster_path}`
    : null;
  const director = creditsData?.crew.find(
    (member) => member.job === "Director"
  )?.name;

  // 로딩중일때 스켈레톤
  if (loading || !movieData) return <SkeletonMovieDetail />;

  // 공통 함수: 리스트에 추가/삭제 및 로컬스토리지 업데이트
  const handleListActive = (list, setList, movieData) => {
    const updatedList = list.some((movie) => movie.id === movieData.id)
      ? list.filter((movie) => movie.id !== movieData.id) // 영화가 이미 리스트에 있으면 삭제
      : [...list, movieData]; // 영화가 없으면 추가
    setList(updatedList);
    return updatedList;
  };

  // 좋아요 클릭
  const handleLike = () => {
    setLikeMovies((prev) => {
      const updatedMovies = prev.some((movie) => movie.id === movieData.id)
        ? prev.filter((movie) => movie.id !== movieData.id) // 이미 좋아요 상태이면 취소
        : [...prev, movieData]; // 좋아요에 추가

      // 별로예요 상태를 취소
      setDisLikeMovies((prevDislikeMovies) =>
        prevDislikeMovies.filter((movie) => movie.id !== movieData.id)
      );

      // 로컬스토리지에 업데이트
      localStorage.setItem("likeMovies", JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };

  const handleDislike = () => {
    setDisLikeMovies((prev) => {
      const updatedMovies = prev.some((movie) => movie.id === movieData.id)
        ? prev.filter((movie) => movie.id !== movieData.id) // 이미 별로예요 상태이면 취소
        : [...prev, movieData]; // 별로예요에 추가

      // 좋아요 상태를 취소
      setLikeMovies((prevLikeMovies) =>
        prevLikeMovies.filter((movie) => movie.id !== movieData.id)
      );

      // 로컬스토리지에 업데이트
      localStorage.setItem("dislikeMovies", JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };

  // 찜하기 / 보는중 / 봤어요 / 인생작품
  const handleWishListClick = () => {
    setWishListActive(!wishListActive);
    setWishList(handleListActive(wishList, setWishList, movieData));
  };

  const handleWatchingClick = () => {
    setWatchingActive(!watchingActive);
    setWatchingList(handleListActive(watchingList, setWatchingList, movieData));
  };

  const handleWatchedClick = () => {
    setWatchedActive(!watchedActive);
    setWatchedList(handleListActive(watchedList, setWatchedList, movieData));
  };

  const handleBestMoviesClick = () => {
    setBestMoviesActive(!bestMoviesActive);
    setBestMovies(handleListActive(bestMovies, setBestMovies, movieData));
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
            $active={likeMovies.some((movie) => movie.id === movieData.id)}
          >
            💙 좋아요
          </LikeDislikeButton>
          <LikeDislikeButton
            onClick={handleDislike}
            $active={disLikeMovies.some((movie) => movie.id === movieData.id)}
          >
            💔 별로예요
          </LikeDislikeButton>
        </ButtonContainer>

        <IconItemContainer>
          <IconItem $active={wishListActive} onClick={handleWishListClick}>
            <IconBox $active={wishListActive}>
              <IoBookmark />
            </IconBox>
            찜하기
          </IconItem>

          <IconItem $active={watchingActive} onClick={handleWatchingClick}>
            <IconBox $active={watchingActive}>
              <FaEye />
            </IconBox>
            보는중
          </IconItem>

          <IconItem $active={watchedActive} onClick={handleWatchedClick}>
            <IconBox $active={watchedActive}>
              <FaCheck />
            </IconBox>
            봤어요
          </IconItem>

          <IconItem $active={bestMoviesActive} onClick={handleBestMoviesClick}>
            <IconBox $active={bestMoviesActive}>
              <RiMovieAiFill />
            </IconBox>
            인생영화
          </IconItem>
        </IconItemContainer>

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
                    src={`${IMAGE_BASE_URL}w185${cast.profile_path}`}
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
