import React from 'react';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard'; 
import { useEffect, useState, useCallback } from 'react';
import SwiperMovieCard from '../components/SwiperMovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { useNavigate } from 'react-router-dom';
import SkeletonCard from '../components/SkeletonCard'; 
import { NavSearch } from '../components/NavSearch';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  /* height: 50%; */
  /* height: 439px; */
  margin: 0;
  padding: 0;
`
const SliderWrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  height: 439px;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  .swiper{
    width: 100%;
    height: 100%;
  }
`
const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const MovieListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  flex-grow: 1;
  margin-bottom: 60px
`;

export function HomePage() {
  const [gridMovies, setGridMovies] = useState([]); // 하단 movies
  const [swiperMovies, setSwiperMovies] = useState([]); // 상단 movies
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  //useEffect를 사용하면 fetchMovies같은 데이터를 가져올때 불필요하게 여러번 실행되는 것을 방지
  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko', {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
          accept: 'application/json;charset=utf-8'
        }
      });

      const data = await response.json();
      console.log("API 응답 데이터:", data);

      // 상단 슬라이드에 보일 영화를 성인영화를 제외 필터링
      const allMovies = data.results.filter(movie => movie.adult === false);
      
      // 평점 기준으로 내림차순 정렬
      const sortedMovies = [...allMovies].sort((a, b) => b.vote_average - a.vote_average); 

      // 상단 슬라이드 영화카드용 (상위 10개)
      const top5Movies = sortedMovies.slice(0, 5);
      setSwiperMovies(top5Movies); // swiperMovies 상태에 저장

      // 하단 영화카드용 (성인 영화 제외)
      const filteredGridMovie = data.results.filter(movie => movie.adult === false);
      setGridMovies(filteredGridMovie); // gridMovies 상태에 저장
      setLoading(false);
      console.log("Top 10 Movies for Swiper:", top5Movies);
    } catch(err) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", err);
      setLoading(false);
    }
    // useEffect 에서 fetchMovies를 의존성배열에 넣은 이유는 fetchMovies 함수가 useEffect내부에 실행도리때마다 최신상태의 fetchMovies를 호출하기 위해서
  }, [TMDB_API_TOKEN, setSwiperMovies, setGridMovies, setLoading]); 

  // useEffect를 사용하여 안정화된 fetchMovies 함수를 컴포넌트 마운트 시 한 번 호출.
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); // useEffect는 이제 안정화된 fetchMovies 함수만 들어옴 (이때 경고 사라짐)

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); 
    }; // 영화 클릭시 해당 영화Id로 상세페이지 이동

  return(
    <div className='flex flex-col w-full h-full'>
      <MainContainer>
        <NavSearch />
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
            {loading ? [...Array(5)].map((_, index) => (
              <StyledSwiperSlide key={index}><SkeletonCard /></StyledSwiperSlide>))
            : swiperMovies.map((movie) => (
              <StyledSwiperSlide key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                <SwiperMovieCard movie={movie} /> {/* movie prop 전달 */}
              </StyledSwiperSlide>
            ))}
          </Swiper>
        </SliderWrapper>
        
        <MovieListGrid>
          {loading
            ? [...Array(10)].map((_, index) => <SkeletonCard key={index} />)
            : gridMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie.id)} />
              ))}
        </MovieListGrid>
      </MainContainer>
    </div>
  );
}