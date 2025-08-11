import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import styled from "styled-components";
import { fetchSearchMovies, fetchUpcomingMovies } from "../API/tmdbapi";
import MovieCard from "../components/MovieCard";
import { useDebounce } from "../components/useDebounce";
import { memo } from "react";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 10px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  border-radius: 7px;
  outline: none;
  margin-bottom: 20px;
  background-color: #25304a;
  color: white;
  padding: 12px 20px;
  height: 50px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  &::placeholder {
    color: #bbb;
  }
  &:focus-within {
    border: 1px solid white;
  }
`;

const MovieList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 750px;
`;

const MovieItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #333;
  color: #e0e0e0;
  cursor: pointer;
  text-decoration: none;
  &:last-child {
    border-bottom: none;
  }
`;

const Poster = styled.img`
  width: 120px;
  height: auto;
  border-radius: 5px;
  margin-right: 15px;
  object-fit: cover;
`;

const MovieDetails = styled.div`
  flex-grow: 1;
`;

const MovieTitle = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1rem;
`;

const MovieYear = styled.p`
  margin: 5px 0 0;
  font-size: 0.8rem;
  color: #888;
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

const SectionTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 20px 0 15px;
  width: 100%;
  max-width: 750px;
  display: flex;
  padding-left: 300px;
  justify-content: space-between;
  align-items: center;
`;

const ViewMoreButton = styled(Link)`
  color: #275cd6;
  font-size: 0.9rem;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const ExpectedMoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 70%;
  max-width: 750px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

// 키워드값을 받아서 api 로 호출 / 키워드가 없으면 네브
// query setQuery = useState() 초기값을 설정
// 주소창 그대로 접근
export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // 쿼리 파라미터에서 검색어를 가져옴
  const [keyword, setKeyword] = useState(query);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const debounced = useDebounce(keyword, 500);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // 영화 검색 처리
  useEffect(() => {
    setIsLoading(true);
    const getSearchMovies = async () => {
      try {
        if (debounced) {
          // 검색어가 있을 때만 검색 API 호출
          const data = await fetchSearchMovies(debounced);
          setMovies(data);
          setUpcomingMovies([]);
        } else {
          // 검색어가 없을 때 개봉 예정작 API 호출
          const data = await fetchUpcomingMovies();
          setUpcomingMovies(data.filter((movie) => !movie.adult));
          setMovies([]);
        }
      } catch (err) {
        console.error("검색 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchMovies();
  }, [debounced]);

  useEffect(() => {
    if (debounced.trim()) {
      setSearchParams({ query: debounced }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [debounced, setSearchParams]);

  //입력창을 관리하고 입력값으로 호출한다
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  console.log(movies);
  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <SearchWrapper>
      <SearchInput
        onChange={handleSearch}
        type="text"
        value={keyword}
        placeholder="🔍 영화 이름을 검색해 보세요"
      />
      {debounced && movies.length > 0 ? (
        // 검색어가 있고 결과가 있을 때
        <SearchResults movies={movies} />
      ) : debounced && movies.length === 0 ? (
        // 검색어는 있지만 결과가 없을 때
        <div
          style={{
            color: "white",
            textAlign: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          검색 결과가 없습니다.
        </div>
      ) : (
        // 검색어가 없을 때 (초기 상태)
        <>
          <SectionTitle>
            기대되는 개봉 예정작
            <ViewMoreButton to="/upcoming">더보기 &gt;</ViewMoreButton>
          </SectionTitle>
          <ExpectedMoviesGrid>
            {upcomingMovies.length > 0 ? (
              upcomingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  gridColumn: "1 / -1",
                }}
              >
                개봉 예정작을 불러오는 중이거나 없습니다.
              </div>
            )}
          </ExpectedMoviesGrid>
        </>
      )}
    </SearchWrapper>
  );
}

export const SearchResults = memo(({ movies }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    console.log("렌더링됨요");
  });

  return (
    <MovieList>
      {movies && movies.length > 0 ? (
        movies.map((movie) => {
          const [isActive, setIsActive] = useState(false);

          const handlePlusButtonClick = (e) => {
            e.stopPropagation(); // Link로 이벤트 전파 방지
            e.preventDefault(); // 기본 동작 방지
            setIsActive((prev) => !prev);
          };

          return (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MovieItem>
                <Poster
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieDetails>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieYear>{movie.release_date.substring(0, 4)}</MovieYear>
                </MovieDetails>
                <PlusButton $active={isActive} onClick={handlePlusButtonClick}>
                  +
                </PlusButton>
              </MovieItem>
            </Link>
          );
        })
      ) : (
        <div
          style={{
            color: "white",
            textAlign: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          검색 결과가 없습니다.
        </div>
      )}
    </MovieList>
  );
});
