import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import React, { forwardRef, useEffect } from "react";

const MovieCardContainer = styled.div`
  width: 160px;
  height: 320px;
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
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

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
`;

const MovieTitle = styled.p`
  font-weight: 700;
  padding: 0 8px; /* 좌우 패딩 추가 */
  /* 조건부 폰트 크기 조절 */
  font-size: ${(props) => (props.$isLongTitle ? "11px" : "13px")};
  line-height: 1.2; /* 줄간격 조절 */
  white-space: normal; /* 자동 줄바꿈 허용 */
  word-break: keep-all; /* 단어 단위로 줄바꿈 시도 */
`;

const MovieInfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 15px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 800;
`;

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
  background-color: ${(props) => (props.$active ? "#275cd6" : "#25304a")};
  color: ${(props) => (props.$active ? "white" : "#98a4b7")};
`;

const MovieCard = forwardRef(({ movie }, ref) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  // 초기에 로컬스토리지에서 한 번만 읽기
  const [wishList, setWishList] = useState(
    () => JSON.parse(localStorage.getItem("wishList") ?? "[]") // ?? : 왼쪽 값이 null undefined 일때 오른쪽값으로 대체
  );

  // movie prop이 없을 경우 렌더링하지 않음s
  if (!movie) {
    return null;
  }

  // 현재 영화가 위시에 있는지 확인
  const isInWish = wishList.some((item) => item?.id === movie.id);
  // 제목 너무 긴 경우
  const isLongTitle = movie?.title && movie.title.length > 13;

  const toggleWish = (e) => {
    e.preventDefault(); // Link 이동 방지
    e.stopPropagation(); // 상위로 전파 방지
    setWishList((prev) => {
      const exists = prev.some((i) => i?.id === movie.id);
      const updatedList = exists
        ? prev.filter((i) => i?.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem("wishList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  // useEffect(() => {
  //   // 로컬스토리지에 wishList 업데이트
  //   if (!Array.isArray(wishList)) {
  //     setWishList([]); // Ensure wishList is an array
  //   }
  //   if (isActive) {
  //     // + 버튼 클릭 시 영화 추가
  //     const updatedWishList = [...wishList, movie];
  //     setWishList(updatedWishList);
  //     localStorage.setItem("wishList", JSON.stringify(updatedWishList));
  //   } else {
  //     // - 버튼 클릭 시 영화 삭제
  //     const updatedWishList = wishList.filter((item) => item.id !== movie.id);
  //     setWishList(updatedWishList);
  //     localStorage.setItem("wishList", JSON.stringify(updatedWishList));
  //   }
  // }, [isActive, movie, wishList]);

  return (
    // Link컴포넌트로 MovieCardContainer를 감싸서 클릭할때 이동할 수 있게
    <Link to={`/movie/${movie?.id}`}>
      {/* ref={ref}를 추가하여 IntersectionObserver가 관찰할 대상을 지정 */}
      <MovieCardContainer ref={ref} onClick={handleCardClick}>
        <img
          className="h-[300px]"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        />
        <MovieInfo>
          <MovieTitle $isLongTitle={isLongTitle}>{movie.title}</MovieTitle>
          <MovieInfoBottom>
            <span>⭐️ {movie.vote_average.toFixed(1)}</span>
            <PlusButton $active={isInWish} onClick={toggleWish}>
              +
            </PlusButton>
          </MovieInfoBottom>
        </MovieInfo>
      </MovieCardContainer>
    </Link>
  );
});

export default MovieCard;
