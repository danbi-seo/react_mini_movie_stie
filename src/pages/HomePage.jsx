import React, { useRef } from "react";
import styled from "styled-components";
import MovieCard from "../components/MovieCard";
import { useEffect, useState, useCallback } from "react";
import SwiperMovieCard from "../components/SwiperMovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";
import { NavSearch } from "../components/NavSearch";
import { SearchPage } from "./SearchPage";
import { fetchDiscoverMovies } from "../API/tmdbapi";

const MovieListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  flex-grow: 1;
  margin-bottom: 60px;
`;

const SearchInput = styled.div`
  width: 100%;
  font-size: 16px;
  border: none;
  border-radius: 7px;
  outline: none;
  margin-bottom: 20px;
  background-color: #25304a;
  color: #bbb;
  padding: 12px 20px;
  height: 50px;
  z-index: 1;
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 0;
`;
const SliderWrapper = styled.div`
  width: 100%;
  height: 439px;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  margin-top: -20px;
  .swiper {
    width: 100%;
    height: 100%;
  }
`;
const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
/* ================================================================= */

export function HomePage() {
  const [gridMovies, setGridMovies] = useState([]); // 하단 movies
  const [swiperMovies, setSwiperMovies] = useState([]); // 상단 movies
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 있는지

  const navigate = useNavigate();
  const observer = useRef(); // IntersectionObserver 위한 ref
  const lastMovieElementRef = useRef(null);

  // const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  // 영화 데이터 가져오기
  const fetchMovies = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      const newMovies = await fetchDiscoverMovies("popularity.desc", pageNum);

      if (pageNum === 1) {
        // 첫 페이지일 때만 데이터를 설정
        setGridMovies(newMovies);
        setSwiperMovies(newMovies.slice(0, 5));
      } else {
        // 다음 페이지: 그리드에만 추가
        setGridMovies((prevMovies) => [...prevMovies, ...newMovies]);
      }

      setHasMore(newMovies.length > 0);
    } catch (err) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect를 사용하여 안정화된 fetchMovies 함수를 컴포넌트 마운트 시 한 번 호출.
  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]); // useEffect는 이제 안정화된 fetchMovies 함수만 들어옴 (이때 경고 사라짐) */

  // 마지막 영화 요소가 화면에 보이면 다음 페이지를 불러오는 IntersectionObserver
  useEffect(() => {
    if (loading || !hasMore) return;
    const currentElement = lastMovieElementRef.current;
    if (!currentElement) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // 페이지를 증가시켜 새로운 데이터를 로드
      }
    });
    observer.current.observe(currentElement);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  }; // 영화 클릭시 해당 영화Id로 상세페이지 이동

  return (
    <div className="flex flex-col w-full h-full">
      <MainContainer>
        <Link to={"/search"}>
          <SearchInput>🔍 영화 이름을 검색해 보세요</SearchInput>
        </Link>
        <SliderWrapper>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} // 사용할 모듈 종류
            slidesPerView={1} // 보여질 슬라이드 개수
            navigation={true} // 네비게이션(화살표) 사용
            pagination={{ clickable: true }} // 페이지네이션 사용 및 클릭 가능
            autoplay={{
              delay: 3000,
              disableOnInteraction: false, // 사용자의 다른 작업이여도 자동 재생 계속
              pauseOnMouseEnter: true, // 마우스 올리면 일시정지
            }}
          >
            {loading
              ? [...Array(5)].map((_, index) => (
                  <StyledSwiperSlide key={index}>
                    <SkeletonCard />
                  </StyledSwiperSlide>
                ))
              : swiperMovies.map((movie) => (
                  <StyledSwiperSlide
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <SwiperMovieCard movie={movie} /> {/* movie prop 전달 */}
                  </StyledSwiperSlide>
                ))}
          </Swiper>
        </SliderWrapper>

        <MovieListGrid>
          {gridMovies.map((movie, index) => {
            // 마지막 영화에만 ref를 연결하고 스크롤 감지
            if (gridMovies.length === index + 1) {
              return (
                <MovieCard
                  ref={lastMovieElementRef}
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              );
            }
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />
            );
          })}
          {loading &&
            hasMore &&
            // 로딩 중일 때 추가 스켈레톤 카드
            [...Array(10)].map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
        </MovieListGrid>
      </MainContainer>
    </div>
  );
}

// 사용자 => 이름이 보이는부분
// 네브탑 사용자 변경이 안되는 부분
