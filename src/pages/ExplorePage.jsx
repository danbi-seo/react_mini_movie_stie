import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "../components/MovieCard";
import {
  fetchPopularMovies,
  fetchExploreMovies,
  genreIds,
} from "../API/tmdbapi";

const ExploreContainer = styled.div`
  background: #101322;
  min-height: 100vh;
  color: white;
  padding: 16px 32px;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #374151;
  padding-bottom: 16px;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  transition: all 0.2s;
  font-size: 14px;
  background-color: ${(props) => (props.$active ? "#275cd6" : "#1f2937")};
  color: white;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  &:hover {
    background-color: ${(props) => (props.$active ? "#275cd6" : "#374151")};
  }
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const SortButton = styled.button`
  font-size: 18px;
  transition: all 0.2s;
  color: ${(props) => (props.$active ? "#f59e0b" : "#9ca3af")};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.$active ? "2px solid #f59e0b" : "none")};
  &:hover {
    color: white;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  @media (min-width: 640px) {
    gap: 24px;
  }
`;

const Loader = styled.div`
  text-align: center;
  font-size: 18px;
  color: #9ca3af;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const NoMoviesMessage = styled(Loader)``;

const categories = [
  "전체",
  "액션",
  "애니메이션",
  "SF",
  "미스터리",
  "판타지",
  "드라마",
  "코미디",
  "공포",
  "로맨스",
];

export const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortOrder, setSortOrder] = useState("popularity.desc"); // 기본 정렬: 인기순
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesData = async () => {
      setIsLoading(true);
      let moviesToDisplay = [];

      try {
        if (activeCategory === "전체") {
          // '전체' 카테고리는 인기순 영화를 가져옵니다.
          moviesToDisplay = await fetchPopularMovies();
        } else {
          const genreId = genreIds[activeCategory];
          if (genreId) {
            moviesToDisplay = await fetchExploreMovies({
              genreId,
              sortBy: sortOrder,
            });
          }
        }
        setFilteredMovies(moviesToDisplay);
      } catch (error) {
        console.error("탐색 페이지에서 영화 정보 가져오기 오류 발생:", error);
        setFilteredMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesData();
  }, [activeCategory, sortOrder]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSortOrder("releaseDate"); // 카테고리 변경 시 정렬 기준을 개봉순으로 리셋
  };

  const handleSortClick = (order) => {
    setSortOrder(order);
  };

  const getSortButtonClass = (order) => {
    return sortOrder === order
      ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
      : "text-gray-400 hover:text-white";
  };

  return (
    <ExploreContainer>
      <ContentWrapper>
        <Title>영화 탐색</Title>
        <CategoryList>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              onClick={() => handleCategoryClick(category)}
              $active={activeCategory === category}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryList>

        <SortOptions>
          <SortButton
            onClick={() => handleSortClick("primary_release_date.desc")}
            $active={sortOrder === "primary_release_date.desc"}
          >
            개봉순
          </SortButton>
          <SortButton
            onClick={() => handleSortClick("vote_average.desc")}
            $active={sortOrder === "vote_average.desc"}
          >
            별점순
          </SortButton>
        </SortOptions>

        {isLoading ? (
          <Loader>영화 목록을 불러오는 중...</Loader>
        ) : filteredMovies.length > 0 ? (
          <MovieGrid>
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        ) : (
          <NoMoviesMessage>해당 카테고리에는 영화가 없습니다.</NoMoviesMessage>
        )}
      </ContentWrapper>
    </ExploreContainer>
  );
};

// Top Rated : 이걸로 메인페이지에 카드애니메이션 보여주기
// Now-playing , upcoming ,
// api를 axios로 바꾸기
/**
 * const tmdbapi = axios.create({baseURL: 'http://api.themoviedb.org/3'})
 * const getMovies = (page) => {}
 * Carousel
 * RollingMovieCard
 * 어플리케이션 개발 / 어플리케이션 개발에 필요한 라이브러리를 만드는 일을 하는게 프론트엔드 개발자
 */
