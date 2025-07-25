import React from 'react';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard'; 
import movieListData from '../assets/data/movieListData.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const MovieSliderContainer = styled.div`
  width: 100%;
  padding: 20px 0; /* 슬라이드 양 옆 여백 */
  /* Swiper의 기본 CSS가 적용되므로 여기서는 최소한의 스타일만 */

  /* Swiper 네비게이션 버튼 (화살표) 커스터마이징 */
  .swiper-button-prev,
  .swiper-button-next {
    color: #f5c518; /* IMDb 색상 */
    &::after {
      font-size: 30px; /* 화살표 크기 */
    }
  }

  /* Swiper 페이지네이션 점 커스터마이징 */
  .swiper-pagination-bullet {
    background-color: #bbb;
    opacity: 0.7;
  }
  .swiper-pagination-bullet-active {
    background-color: #f5c518; /* 활성 점 색상 */
    opacity: 1;
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  width: 100%; /* 전체 너비 차지 */
  color: #718096;
  font-size: 1.2rem;
`;

const HomePageFooter = styled.footer`
  text-align: center;
  margin-top: 60px;
  color: #718096;
  font-size: 0.875rem;
`;


export function HomePage() {
  const movies = movieListData.results;
  return(
    <MovieSliderContainer>
        {movies && movies.length > 0 ? (
          <Swiper
            // Swiper에서 사용할 모듈들 
            modules={[Navigation, Pagination, Scrollbar]}
            // 슬라이드 간 간격 (px)
            spaceBetween={30} // 한 번에 보여줄 슬라이드 개수 (반응형 설정으로)
            slidesPerView={5} //한번에 보여줄 슬라이드 개수
            navigation // 네비게이션 버튼 사용
            pagination={{ clickable: true }} // 페이지네이션 (점) 사용
            scrollbar={{ draggable: true }} // 스크롤바 사용
            // 반응형 브레이크포인트 설정
            breakpoints={{
              // 0px 이상 (모바일)
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // 480px 이상 (작은 태블릿)
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // 768px 이상 (태블릿)
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              // 1024px 이상 (데스크탑)
              1024: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                {/* MovieCard는 SwiperSlide 안에 렌더링 */}
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NoDataMessage>
            영화 데이터를 불러오거나 표시할 수 없습니다.
          </NoDataMessage>
        )}
      </MovieSliderContainer>


/** <Swiper 모듈>
 * Navigation : 슬라이더의 좌우에 이전/다음 슬라이드로 이동할 수 있는 화살표 버튼
 * Pagination : 슬라이더 하단에 현재 슬라이드 위치를 나타내는 점 또는 숫자
 * Scrollbar : 슬라이더 하단에 드래그 가능한 스크롤바를 추가
 */



// const MovieListGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 20px;
//   width: 100%;
//   max-width: 1200px;
//   background-color : black;
//   justify-content: center; 
// `;


  //   <MovieListGrid>
  //     {movies.map((movie) => (
  //       <MovieCard key={movie.id} movie={movie} /> /*`MovieCard` 컴포넌트는 `movie`라는 prop을 받아서 사용 */
  //     ))}
  // </MovieListGrid>
)}

export default MovieCard;