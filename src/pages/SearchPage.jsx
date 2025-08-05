import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { fetchSearchMovies } from "../API/tmdbapi"; // fetch 함수
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

const MovieListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px 0;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
  }
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
  const debounced = useDebounce(keyword, 500);

  // 영화 검색 처리
  useEffect(() => {
    // if (!keyword.trim()) {
    //   return; // 검색어가 없으면 함수 종료
    // }
    setIsLoading(true);
    const getSearchMovies = async () => {
      try {
        const data = await fetchSearchMovies(debounced);
        console.log(data.results);
        setMovies(data.results);
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
    // navigate(`/search?query=${e.target.value}`)
    // 검색어 입력 시 검색 페이지로 리디렉션
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
        value={keyword} // 쿼리 파라미터 값 입력창에 표시
        // onChange={handleSearch}  // 검색어 입력 시 URL 업데이트
        placeholder="🔍 영화 이름을 검색해 보세요"
      />
      <SearchResults movies={movies} />
    </SearchWrapper>
  );
}

export const SearchResults = memo(({ movies }) => {
  useEffect(() => {
    console.log("렌더링됨요");
  });

  return (
    <div>
      {movies && movies.length > 0 ? (
        <div className="movie-list-wrap">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              // id={movie.id}
              // title={movie.title}
              // poster={movie.poster_path}
              // rating={movie.vote_average}
            />
          ))}
        </div>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
});
