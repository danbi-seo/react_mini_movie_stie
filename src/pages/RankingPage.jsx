import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTrendingMovies, fetchMonthlyMovies } from "../API/tmdbapi";

// 전체 컨테이너
const RankingContainer = styled.div`
  min-height: 100vh;
  width: 90%;
  padding: 0;
  color: #fff;
`;

// 상단 필터바
const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid #275cd6;
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.$active ? "#275cd6" : "transparent")};
  color: ${(props) => (props.$active ? "#fff" : "#999")};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  margin: 0 4px;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.2s ease;
`;

// 영화 목록 컨테이너
const RankingList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 5px;
  margin: 0 auto;
`;

// 개별 영화 항목
const MovieItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 0;
  position: relative;
`;

// 랭킹 순위 번호
const RankNumber = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: #275cd6;
  width: 45px;
  text-align: center;
  flex-shrink: 0;
`;

// 영화 포스터
const Poster = styled.img`
  width: 70px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`;

// 영화 제목과 개봉 연도 정보
const MovieInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #e0e0e0;
`;

const MovieTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
`;

const MovieSubInfo = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0;
`;

// 평점 섹션
const MovieRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  flex-shrink: 0;
  margin-left: auto;
  min-width: 60px;
`;

const RatingScore = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff9800;
  display: flex;
  align-items: baseline;
`;

const PercentSign = styled.span`
  font-size: 0.8rem;
  font-weight: normal;
  color: #ff9800;
`;

const RatingText = styled.span`
  font-size: 0.7rem;
  color: #999;
  margin-top: 2px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #9e9e9e;
  font-size: 1.2rem;
  margin-top: 50px;
`;

export const RankingPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState("week"); // 'week'를 기본값으로 설정

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        let list = [];
        if (sortMode === "month") {
          list = await fetchMonthlyMovies(30, 1); // 최근 30일, 1페이지
        } else {
          // 'day' 또는 'week'
          list = await fetchTrendingMovies(sortMode);
        }
        setMovies(list || []);
      } catch (error) {
        console.error("영화 랭킹 정보를 가져오는 데 실패했습니다.", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [sortMode]);

  if (loading) {
    return <LoadingMessage>영화 랭킹을 불러오는 중...</LoadingMessage>;
  }

  return (
    <RankingContainer>
      <h1 className="flex justify-center text-[20px] mb-[10px]">트렌디 랭킹</h1>
      <FilterBar>
        {/* onClick 핸들러로 sortMode 상태를 변경 */}
        <FilterButton
          $active={sortMode === "day"}
          onClick={() => setSortMode("day")}
        >
          오늘
        </FilterButton>
        <FilterButton
          $active={sortMode === "week"}
          onClick={() => setSortMode("week")}
        >
          주간
        </FilterButton>
        <FilterButton
          $active={sortMode === "month"}
          onClick={() => setSortMode("month")}
        >
          월간
        </FilterButton>
      </FilterBar>
      <RankingList>
        {movies.map((movie, index) => (
          <MovieItem key={movie.id}>
            <RankNumber>{index + 1}</RankNumber>
            <Poster
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieSubInfo>
                {movie.release_date && movie.release_date.substring(0, 4)}
              </MovieSubInfo>
            </MovieInfo>
            <MovieRating>
              <RatingScore>
                {movie.vote_average.toFixed(1)}
                <PercentSign>%</PercentSign>
              </RatingScore>
              <RatingText>평점</RatingText>
            </MovieRating>
          </MovieItem>
        ))}
      </RankingList>
    </RankingContainer>
  );
};
