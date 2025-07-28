import React from 'react';
import styled from 'styled-components';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SwiperSlideImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover; /* 이미지가 컨테이너를 꽉 채우도록 설정 */
    object-position: center; /* 이미지를 중앙에 맞춰 자름 */
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
    pointer-events: none; /* 오버레이가 클릭을 방해하지 않도록 */
  }
`;


const IMG_BASE_URL = "https://image.tmdb.org/t/p/w780"; 

function SwiperMovieCard({ movie }) {

  return (
    <div className=''>
      <SwiperSlideImageContainer>
        <img src={`${IMG_BASE_URL}${movie.backdrop_path}`} />
      </SwiperSlideImageContainer>
    </div>
  );
}

export default SwiperMovieCard;

